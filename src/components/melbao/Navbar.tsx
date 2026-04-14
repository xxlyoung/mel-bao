import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex items-center justify-between h-16">
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a
            href="#menu"
            className="font-display font-medium hover:text-primary transition-colors"
          >
            Menu
          </a>
          <a
            href="#about"
            className="font-display font-medium hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#faq"
            className="font-display font-medium hover:text-primary transition-colors"
          >
            FAQ
          </a>
          <a
            href="#contact"
            className="font-display font-medium hover:text-primary transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center">
          <img
            src="/lovable-uploads/f2262b72-29a0-4801-9c3d-15455386edec.png"
            alt="Mel Bao Logo"
            className="h-12 w-auto"
          />
        </div>

        <div className="flex items-center gap-3">
          <a href="#order" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </a>
          <a href="#order" className="hidden md:block">
            <Button variant="playful">Order Now</Button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
