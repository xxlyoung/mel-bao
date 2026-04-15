import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingBag, Lock, ArrowRight } from "lucide-react";
import { products } from "@/config/products";
import { useCart } from "@/contexts/CartContext";

const OrderForm = () => {
  const {
    items,
    addItem,
    removeItem,
    getTotalItems,
    getTotalPrice,
    getDiscount,
  } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const discount = getDiscount();
  const finalPrice = totalPrice - discount;

  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const handleCheckout = async () => {
    if (!customerName || !customerEmail || !customerPhone || !pickupDate || !pickupTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (totalItems === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items from the menu first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          customerName,
          customerEmail,
          customerPhone,
          pickupDate: `${pickupDate} at ${pickupTime}`,
          specialInstructions,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          "Checkout is not available in this environment. Please run with `netlify dev` instead of `npm run dev`."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Save order summary for confirmation page
      localStorage.setItem("melbao-order-summary", JSON.stringify({
        items: items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return { name: product?.name || item.productId, quantity: item.quantity };
        }),
        pickupDate,
        pickupTime,
      }));

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  // Empty cart state
  if (totalItems === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <ShoppingBag className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
        <h3 className="font-display text-xl mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6">
          Browse our menu and add some buns to get started.
        </p>
        <a href="#menu">
          <Button variant="playful">
            Browse Menu
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Your Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => {
                  const product = products.find(
                    (p) => p.id === item.productId
                  );
                  if (!product) return null;
                  return (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${(product.price / 100).toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeItem(item.productId)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-6 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => addItem(item.productId)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <span className="w-16 text-right font-medium text-sm">
                          ${((product.price * item.quantity) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal ({totalItems} packs)</span>
                    <span>${(totalPrice / 100).toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Bulk Discount</span>
                      <span>-${(discount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(finalPrice / 100).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">+ 3% processing fee at checkout</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Information & Pickup */}
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-xl mb-4">Your Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
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
                  onChange={(e) => setCustomerEmail(e.target.value)}
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
                  onChange={(e) => setCustomerPhone(e.target.value)}
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
                <Select value={pickupDate} onValueChange={(val) => { setPickupDate(val); setPickupTime(""); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup date" />
                  </SelectTrigger>
                  <SelectContent>
                    {getNextSevenDays().map((date) => (
                      <SelectItem key={date} value={date}>
                        {new Date(date + "T12:00:00").toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {pickupDate && (
                <div>
                  <Label htmlFor="pickupTime">Pickup Time *</Label>
                  <Select value={pickupTime} onValueChange={setPickupTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                      <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                      <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Los Altos, CA — exact address provided after payment
                  </p>
                </div>
              )}
              <div>
                <Label htmlFor="specialInstructions">
                  Special Instructions (Optional)
                </Label>
                <Textarea
                  id="specialInstructions"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full"
            variant="hero"
            size="lg"
          >
            {isProcessing
              ? "Redirecting to Stripe..."
              : `Pay $${(finalPrice / 100).toFixed(2)} with Stripe`}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>Secure payment powered by Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
