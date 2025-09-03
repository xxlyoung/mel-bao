import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  product_id: string;
  quantity: number;
}

interface OrderRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_date: string;
  pickup_time_start: string;
  pickup_time_end: string;
  special_instructions?: string;
  order_items: OrderItem[];
  total_amount: number;
  create_account: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use service role key for database operations
  const supabaseService = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    console.log("Order checkout function started");
    
    const orderData: OrderRequest = await req.json();
    console.log("Received order data:", { 
      customer: orderData.customer_name,
      email: orderData.customer_email,
      total: orderData.total_amount,
      items: orderData.order_items.length
    });

    // Validate required fields
    if (!orderData.customer_name || !orderData.customer_email || !orderData.customer_phone) {
      throw new Error("Missing required customer information");
    }

    if (!orderData.order_items || orderData.order_items.length === 0) {
      throw new Error("No items in order");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    console.log("Stripe initialized");

    // Get products for line items
    const { data: products, error: productsError } = await supabaseService
      .from("products")
      .select("*")
      .in("id", orderData.order_items.map(item => item.product_id));

    if (productsError) {
      console.error("Error fetching products:", productsError);
      throw new Error("Failed to fetch product information");
    }

    console.log("Fetched products:", products?.length);

    // Create line items for Stripe
    const lineItems = orderData.order_items
      .filter(item => item.quantity > 0)
      .map(item => {
        const product = products?.find(p => p.id === item.product_id);
        if (!product) {
          throw new Error(`Product not found: ${item.product_id}`);
        }
        
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: `${product.description} (${product.pieces_per_package} pieces per package)`,
              images: product.image_url ? [product.image_url] : [],
            },
            unit_amount: product.price,
          },
          quantity: item.quantity,
        };
      });

    console.log("Created line items:", lineItems.length);

    // Create order record in database
    const { data: orderRecord, error: orderError } = await supabaseService
      .from("orders")
      .insert({
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        pickup_date: orderData.pickup_date,
        pickup_time_start: orderData.pickup_time_start,
        pickup_time_end: orderData.pickup_time_end,
        special_instructions: orderData.special_instructions,
        total_amount: orderData.total_amount,
        payment_status: "pending",
        order_status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      throw new Error("Failed to create order record");
    }

    console.log("Created order record:", orderRecord.id);

    // Create order items
    const orderItems = orderData.order_items
      .filter(item => item.quantity > 0)
      .map(item => {
        const product = products?.find(p => p.id === item.product_id);
        return {
          order_id: orderRecord.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: product?.price || 0,
          total_price: (product?.price || 0) * item.quantity,
        };
      });

    const { error: itemsError } = await supabaseService
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      throw new Error("Failed to create order items");
    }

    console.log("Created order items:", orderItems.length);

    // Check if customer exists in Stripe
    const customers = await stripe.customers.list({ 
      email: orderData.customer_email, 
      limit: 1 
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing customer:", customerId);
    } else if (orderData.create_account) {
      // Create new Stripe customer if they want an account
      const customer = await stripe.customers.create({
        email: orderData.customer_email,
        name: orderData.customer_name,
        phone: orderData.customer_phone,
      });
      customerId = customer.id;
      console.log("Created new customer:", customerId);
    }

    // Create Stripe checkout session
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : orderData.customer_email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#order`,
      metadata: {
        order_id: orderRecord.id,
        customer_name: orderData.customer_name,
        pickup_date: orderData.pickup_date,
      },
    });

    console.log("Created Stripe session:", session.id);

    // Update order with Stripe session ID
    const { error: updateError } = await supabaseService
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", orderRecord.id);

    if (updateError) {
      console.error("Error updating order with session ID:", updateError);
    }

    return new Response(JSON.stringify({ 
      url: session.url,
      order_id: orderRecord.id,
      session_id: session.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in create-order-checkout:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});