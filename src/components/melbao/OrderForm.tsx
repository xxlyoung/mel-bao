import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart } from "lucide-react";
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  pieces_per_package: number;
  image_url: string;
}
interface OrderItem {
  product_id: string;
  quantity: number;
}
const OrderForm = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const {
      data,
      error
    } = await supabase.from("products").select("*").eq("active", true);
    if (error) {
      console.error("Error fetching products:", error);
      return;
    }
    setProducts(data || []);
    // Initialize order items for each product with quantity 0
    setOrderItems(data?.map(product => ({
      product_id: product.id,
      quantity: 0
    })) || []);
  };
  const updateQuantity = (productId: string, change: number) => {
    setOrderItems(prev => prev.map(item => item.product_id === productId ? {
      ...item,
      quantity: Math.max(0, item.quantity + change)
    } : item));
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
  const generateTimeSlots = () => {
    return ["5:00 PM - 7:00 PM"];
  };
  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };
  const handleCheckout = async () => {
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
      const orderData = {
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        pickup_date: pickupDate,
        pickup_time_start: "17:00:00",
        pickup_time_end: "19:00:00",
        special_instructions: specialInstructions,
        order_items: activeItems,
        total_amount: getTotalAmount(),
        create_account: createAccount
      };
      const {
        data,
        error
      } = await supabase.functions.invoke('create-order-checkout', {
        body: orderData
      });
      if (error) {
        console.error("Checkout error:", error);
        toast({
          title: "Checkout Error",
          description: error.message || "Failed to create checkout session.",
          variant: "destructive"
        });
        return;
      }

      // Open Stripe checkout in a new tab
      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to Payment",
          description: "Opening payment page in a new tab."
        });
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast({
        title: "Checkout Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  if (products.length === 0) {
    return <div className="container py-16 text-center">
        <p>Loading products...</p>
      </div>;
  }
  return <section id="order" className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-3xl md:text-4xl">Order Your Buns</h2>
          <p className="text-muted-foreground mt-2">Fresh buns made to order. Each package contains 10 pieces for $8. Pickup Wednesday or Sunday, 5-7pm.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Selection */}
          <div className="space-y-6">
            <h3 className="font-display text-xl">Select Your Buns</h3>
            {products.map(product => <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <h4 className="font-display font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">${(product.price / 100).toFixed(2)} per package</p>
                      <p className="text-xs text-muted-foreground">15 pieces per package</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, -1)} disabled={getQuantity(product.id) === 0}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {getQuantity(product.id)}
                      </span>
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}

            {/* Order Summary */}
            {getTotalPackages() > 0 && <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Packages:</span>
                      <span className="font-semibold">{getTotalPackages()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Pieces:</span>
                      <span className="font-semibold">{getTotalPackages() * 15}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total Amount:</span>
                      <span>${(getTotalAmount() / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>}
          </div>

          {/* Customer Information & Pickup */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl mb-4">Customer Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input id="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Your full name" required />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email *</Label>
                  <Input id="customerEmail" type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="your@email.com" required />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input id="customerPhone" type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="(555) 123-4567" required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="createAccount" checked={createAccount} onCheckedChange={checked => setCreateAccount(checked as boolean)} />
                  <Label htmlFor="createAccount" className="text-sm">
                    Create an account to track future orders
                  </Label>
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
                      {getNextSevenDays().map(date => <SelectItem key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                        </SelectItem>)}
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
                  <Textarea id="specialInstructions" value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)} placeholder="Any special requests or instructions..." rows={3} />
                </div>
              </div>
            </div>

            <Button onClick={handleCheckout} disabled={isProcessing || getTotalPackages() === 0} className="w-full" size="lg">
              {isProcessing ? "Processing..." : `Proceed to Payment - $${(getTotalAmount() / 100).toFixed(2)}`}
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default OrderForm;