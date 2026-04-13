import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useCart } from "@/contexts/CartContext";

const OrderSuccess = () => {
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      clearCart();
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
        <div className="container max-w-md mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Payment Confirmed!
          </h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your order! You'll receive a confirmation email from
            Stripe with your receipt.
          </p>
          <p className="text-muted-foreground mb-6">
            We'll reach out with your pickup address and final details.
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
