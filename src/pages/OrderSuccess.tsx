import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const OrderSuccess = () => {
  return (
    <>
      <Helmet>
        <title>Order Confirmation - Mel Bao</title>
        <meta name="description" content="Your order has been confirmed! Thank you for choosing Mel Bao." />
      </Helmet>

      <div className="min-h-screen bg-background py-16 flex items-center justify-center">
        <div className="container max-w-md mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Order Submitted!
          </h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. We'll contact you shortly to confirm the details and arrange pickup.
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
