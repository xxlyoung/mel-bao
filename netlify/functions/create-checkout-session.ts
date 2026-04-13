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

    const stripe = new Stripe(secretKey);

    const origin =
      event.headers.origin ||
      event.headers.referer?.replace(/\/$/, "") ||
      process.env.URL ||
      "http://localhost:8888";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: lineItems,
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
