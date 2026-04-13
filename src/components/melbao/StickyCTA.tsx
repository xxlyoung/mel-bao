import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const StickyCTA = () => {
  const { getTotalItems, getTotalPrice } = useCart();
  const [isOrderVisible, setIsOrderVisible] = useState(false);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    const orderSection = document.getElementById("order");
    if (!orderSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOrderVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(orderSection);
    return () => observer.disconnect();
  }, []);

  if (totalItems === 0 || isOrderVisible) return null;

  return (
    <>
      {/* Mobile: full-width bottom bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden p-3 bg-background/95 backdrop-blur border-t shadow-lg">
        <a href="#order" className="block">
          <Button variant="hero" className="w-full h-12 text-base font-display">
            <ShoppingBag className="w-5 h-5 mr-2" />
            View Cart ({totalItems}) — ${(totalPrice / 100).toFixed(2)}
          </Button>
        </a>
      </div>

      {/* Desktop: floating button */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block animate-fade-in">
        <a href="#order">
          <Button variant="hero" size="lg" className="shadow-colorful font-display">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Cart ({totalItems}) — ${(totalPrice / 100).toFixed(2)}
          </Button>
        </a>
      </div>
    </>
  );
};

export default StickyCTA;
