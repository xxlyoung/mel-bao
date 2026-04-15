import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MapPin, CalendarDays, ShoppingBag } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useCart } from "@/contexts/CartContext";

const OrderSuccess = () => {
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderSummary, setOrderSummary] = useState<{
    items: { name: string; quantity: number }[];
    pickupDate: string;
    pickupTime: string;
  } | null>(null);

  useEffect(() => {
    if (sessionId) {
      clearCart();
      const saved = localStorage.getItem("melbao-order-summary");
      if (saved) {
        setOrderSummary(JSON.parse(saved));
        localStorage.removeItem("melbao-order-summary");
      }
    }
  }, [sessionId, clearCart]);

  return (
    <>
      <Helmet>
        <title>Payment Confirmed - Mel Bao</title>
        <meta
          name="description"
          content="Your payment has been confirmed! Thank you for choosing Mel Bao."
        />
      </Helmet>

      <div className="min-h-screen bg-background py-16 flex items-center justify-center">
        <div className="container max-w-lg mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Payment Confirmed!
          </h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your order! You'll receive a confirmation email from
            Stripe with your receipt.
          </p>
          {orderSummary && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4 text-left">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-lg">Order Summary</h2>
              </div>
              <ul className="text-sm space-y-1 mb-3">
                {orderSummary.items.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">× {item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-sm border-t pt-3">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>
                  Pickup:{" "}
                  <strong>
                    {new Date(orderSummary.pickupDate + "T12:00:00").toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </strong>{" "}
                  at <strong>{orderSummary.pickupTime}</strong>
                </span>
              </div>
            </div>
          )}

          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg">Pickup Location</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              <a
                href="https://maps.app.goo.gl/mbbr9Bb2WCbJBsHh8"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Toyon Farm Club House
              </a>
            </p>
            <div className="rounded-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.5!2d-122.0757445!3d37.3411187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb40279a8494d%3A0x3a10e8def3a91cfb!2sToyon%20Farm%20Club%20House!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pickup location - Toyon Farm Club House"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            For any other inquiries, DM us on Instagram:{" "}
            <a
              href="https://www.instagram.com/mel__bao/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary font-medium"
            >
              @mel__bao
            </a>
          </p>
          <Link to="/">
            <Button size="lg">Return to Home</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
