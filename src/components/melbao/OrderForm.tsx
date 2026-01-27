import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart, CheckCircle } from "lucide-react";
import { products, type Product } from "@/config/products";
import { GOOGLE_SHEETS_URL, SHEETS_ENABLED } from "@/config/sheets";

interface OrderItem {
  product_id: string;
  quantity: number;
}

const OrderForm = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    products.map(product => ({ product_id: product.id, quantity: 0 }))
  );
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const { toast } = useToast();

  const updateQuantity = (productId: string, change: number) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.product_id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const getQuantity = (productId: string) => {
    return orderItems.find(item => item.product_id === productId)?.quantity || 0;
  };

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.product_id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getTotalPackages = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const handleSubmitOrder = async () => {
    if (!customerName || !customerEmail || !customerPhone || !pickupDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const activeItems = orderItems.filter(item => item.quantity > 0);
    if (activeItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please select at least one item.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        customerName,
        customerEmail,
        customerPhone,
        pickupDate,
        specialInstructions,
        total: getTotalAmount(),
        items: activeItems.map(item => {
          const product = products.find(p => p.id === item.product_id);
          return {
            id: item.product_id,
            name: product?.name || item.product_id,
            quantity: item.quantity,
            price: product?.price || 0
          };
        })
      };

      if (SHEETS_ENABLED) {
        // Submit to Google Sheets via popup window
        const encodedData = encodeURIComponent(JSON.stringify(orderData));
        const url = `${GOOGLE_SHEETS_URL}?data=${encodedData}`;
        
        // Open popup, wait for it to load, then close
        const popup = window.open(url, 'orderSubmit', 'width=1,height=1,left=-1000,top=-1000');
        
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            if (popup) {
              try { popup.close(); } catch (e) { /* ignore */ }
            }
            resolve();
          }, 2000);
        });

        setOrderSuccess(`Thank you, ${customerName}!`);
        toast({
          title: "Order Submitted!",
          description: "We'll contact you to confirm your order.",
        });
      } else {
        // Demo mode - just show success
        console.log("Order data (demo mode):", orderData);
        setOrderSuccess(`Thank you, ${customerName}!`);
        toast({
          title: "Order Received (Demo)",
          description: "Google Sheets not configured. Check console for order data.",
        });
      }

      // Reset form
      setOrderItems(products.map(product => ({ product_id: product.id, quantity: 0 })));
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setPickupDate("");
      setSpecialInstructions("");

    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Submission Error",
        description: "Failed to submit order. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Show success state
  if (orderSuccess) {
    return (
      <section id="order" className="container py-16 md:py-24">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="font-display text-3xl mb-2">{orderSuccess}</h2>
          <p className="text-muted-foreground mb-6">
            Your order has been submitted. We'll send you a confirmation email shortly with pickup details.
          </p>
          <Button onClick={() => setOrderSuccess(null)}>
            Place Another Order
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-3xl md:text-4xl">Order Your Buns</h2>
          <p className="text-muted-foreground mt-2">
            Fresh buns made to order. Each package contains 10 buns. Pickup available 5-7pm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Selection */}
          <div className="space-y-6">
            <h3 className="font-display text-xl">Select Your Buns</h3>
            {products.map(product => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-display font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${(product.price / 100).toFixed(2)} per package
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.pieces_per_package} pieces per package
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(product.id, -1)}
                        disabled={getQuantity(product.id) === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {getQuantity(product.id)}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Order Summary */}
            {getTotalPackages() > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {orderItems
                      .filter(item => item.quantity > 0)
                      .map(item => {
                        const product = products.find(p => p.id === item.product_id);
                        return (
                          <div key={item.product_id} className="flex justify-between text-sm">
                            <span>{product?.name} x{item.quantity}</span>
                            <span>${((product?.price || 0) * item.quantity / 100).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>${(getTotalAmount() / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Customer Information & Pickup */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl mb-4">Customer Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl mb-4">Pickup Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pickupDate">Pickup Date *</Label>
                  <Select value={pickupDate} onValueChange={setPickupDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup date" />
                    </SelectTrigger>
                    <SelectContent>
                      {getNextSevenDays().map(date => (
                        <SelectItem key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pickup Time</Label>
                  <div className="p-3 border rounded-md bg-muted/50">
                    <p className="text-sm">Available daily: 5:00 PM - 7:00 PM</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                  <Textarea
                    id="specialInstructions"
                    value={specialInstructions}
                    onChange={e => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests or instructions..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmitOrder}
              disabled={isProcessing || getTotalPackages() === 0}
              className="w-full"
              size="lg"
            >
              {isProcessing ? "Submitting..." : `Submit Order - $${(getTotalAmount() / 100).toFixed(2)}`}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Payment will be collected at pickup. We'll contact you to confirm your order.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
