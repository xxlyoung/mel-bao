import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex items-center justify-between h-16">
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:opacity-80 transition">About</a>
        </div>
        
        <div className="flex items-center">
          <img src="/lovable-uploads/f2262b72-29a0-4801-9c3d-15455386edec.png" alt="Mel Bao Logo" className="h-18 w-auto" />
        </div>
        
        <div className="hidden md:block">
          <a href="#order">
            <Button variant="hero">Order Now</Button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;