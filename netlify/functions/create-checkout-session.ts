import type { Handler } from "@netlify/functions";
import Stripe from "stripe";
import { products } from "./_products";

export const handler: Handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Stripe is not configured" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { items, customerName, customerEmail, customerPhone, pickupDate, specialInstructions } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Cart is empty" }),
      };
    }
    if (!customerName || !customerEmail || !customerPhone || !pickupDate) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required customer information" }),
      };
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Invalid product: ${item.productId}` }),
        };
      }
      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Invalid quantity for ${product.name}` }),
        };
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: `${product.description} (${product.pieces_per_package} pieces per package)`,
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      });
    }

    const subtotal = lineItems.reduce(
      (sum, item) => sum + (item.price_data!.unit_amount as number) * (item.quantity as number),
      0,
    );
    const surcharge = Math.round(subtotal * 0.03);

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Processing Fee",
          description: "3% payment processing surcharge",
        },
        unit_amount: surcharge,
      },
      quantity: 1,
    });

    const stripe = new Stripe(secretKey);

    const totalQuantity = items.reduce(
      (sum: number, item: { quantity: number }) => sum + item.quantity,
      0,
    );
    const discountMultiplier = Math.floor(totalQuantity / 5);

    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
    if (discountMultiplier > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: discountMultiplier * 500,
        currency: "usd",
        name: `Bulk Discount ($${discountMultiplier * 5} off for ${totalQuantity} packs)`,
        duration: "once",
        max_redemptions: 1,
      });
      discounts = [{ coupon: coupon.id }];
    }

    const origin =
      event.headers.origin ||
      event.headers.referer?.replace(/\/$/, "") ||
      process.env.URL ||
      "http://localhost:8888";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: lineItems,
      ...(discounts ? { discounts } : {}),
      metadata: {
        customerName,
        customerPhone,
        pickupDate,
        specialInstructions: specialInstructions || "",
      },
      payment_intent_data: {
        metadata: {
          customerName,
          customerPhone,
          pickupDate,
          specialInstructions: specialInstructions || "",
        },
      },
      success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order-cancelled`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to create checkout session" }),
    };
  }
};
