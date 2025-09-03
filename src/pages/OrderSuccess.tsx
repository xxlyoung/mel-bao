import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface OrderDetails {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_date: string;
  pickup_time_start: string;
  pickup_time_end: string;
  special_instructions?: string;
  total_amount: number;
  payment_status: string;
  order_status: string;
  created_at: string;
  order_items: Array<{
    quantity: number;
    unit_price: number;
    total_price: number;
    products: {
      name: string;
      description: string;
      pieces_per_package: number;
    };
  }>;
}

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId]);

  const fetchOrderDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            quantity,
            unit_price,
            total_price,
            products (
              name,
              description,
              pieces_per_package
            )
          )
        `)
        .eq("stripe_session_id", sessionId)
        .single();

      if (error) {
        console.error("Error fetching order:", error);
        return;
      }

      setOrderDetails(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-4">
            We couldn't find your order. Please check your email for confirmation details.
          </p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order Confirmation - Mel Bao</title>
        <meta name="description" content="Your order has been confirmed! Thank you for choosing Mel Bao." />
      </Helmet>

      <div className="min-h-screen bg-background py-16">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your order. We'll have your fresh buns ready for pickup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <p className="text-sm text-muted-foreground">Order #{orderDetails.id.slice(-8)}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderDetails.order_items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.products.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × ${(item.unit_price / 100).toFixed(2)} 
                        ({item.products.pieces_per_package} pieces each)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.total_price / 100).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity * item.products.pieces_per_package} pieces
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(orderDetails.total_amount / 100).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pickup Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="font-semibold">Date & Time</span>
                  </div>
                  <p>{formatDate(orderDetails.pickup_date)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(orderDetails.pickup_time_start)} - {formatTime(orderDetails.pickup_time_end)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold">Customer Info</span>
                  </div>
                  <p>{orderDetails.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{orderDetails.customer_email}</p>
                  <p className="text-sm text-muted-foreground">{orderDetails.customer_phone}</p>
                </div>

                {orderDetails.special_instructions && (
                  <div>
                    <p className="font-semibold mb-2">Special Instructions</p>
                    <p className="text-sm text-muted-foreground">
                      {orderDetails.special_instructions}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Badge variant="secondary">
                    {orderDetails.payment_status === 'paid' ? 'Payment Complete' : 'Payment Pending'}
                  </Badge>
                  <Badge variant="outline">
                    {orderDetails.order_status === 'pending' ? 'Order Received' : orderDetails.order_status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Please arrive during your scheduled pickup window: 5:00 PM - 7:00 PM</li>
                <li>• A confirmation email has been sent to {orderDetails.customer_email}</li>
                <li>• Your buns will be freshly prepared on your pickup day</li>
                <li>• If you need to modify your order, please contact us as soon as possible</li>
                <li>• Pickup location details will be provided in your confirmation email</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/">
              <Button size="lg">Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;