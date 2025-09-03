import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const OrderCancelled = () => {
  return (
    <>
      <Helmet>
        <title>Order Cancelled - Mel Bao</title>
        <meta name="description" content="Your order was cancelled. You can try again anytime." />
      </Helmet>

      <div className="min-h-screen bg-background py-16">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <XCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              Order Cancelled
            </h1>
            <p className="text-muted-foreground">
              Your order was cancelled and no payment was processed.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What happened?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You cancelled the payment process or closed the payment window before completing your order. 
                Don't worry - no charges were made to your payment method.
              </p>
              <p className="text-muted-foreground">
                You can return to our order form anytime to place a new order for fresh, delicious buns!
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What's next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-semibold">1</span>
                </div>
                <p className="text-sm">Return to our order form to select your favorite buns</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-semibold">2</span>
                </div>
                <p className="text-sm">Choose your pickup time (Monday-Sunday, 5-7pm)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-semibold">3</span>
                </div>
                <p className="text-sm">Complete your payment and enjoy fresh buns!</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#order">
              <Button size="lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg">
                Return Home
              </Button>
            </Link>
          </div>

          {/* Contact Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                If you're experiencing issues with ordering or have questions about our products, 
                feel free to reach out to us.
              </p>
              <Link to="/#contact">
                <Button variant="outline" size="sm">
                  Contact Us
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderCancelled;