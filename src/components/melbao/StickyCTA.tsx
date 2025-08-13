import { Button } from "@/components/ui/button";

const StickyCTA = () => {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <a href="#contact"><Button variant="hero" className="shadow-lg animate-slide-in-right">Order Now</Button></a>
    </div>
  );
};

export default StickyCTA;
