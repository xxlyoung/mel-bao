import heroImage1 from "@/assets/hero-image-1.jpg";
import heroImage2 from "@/assets/hero-image-2.jpg";
import { Button } from "@/components/ui/button";
const Hero = () => {
  return <section id="home" className="relative min-h-[80vh] w-full flex items-center">
      <div className="absolute inset-0 w-full h-full grid grid-cols-2 gap-0">
        <img src={heroImage1} alt="Mel Bao artisan bao buns" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
        <img src={heroImage2} alt="Mel Bao branded packaging and products" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/90" />
      <div className="container relative py-32 md:py-40">
        <div className="max-w-2xl space-y-6 animate-enter">
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Freshly Made, Lovingly Crafted – From Our Home Kitchen to Your Table
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">Handcrafted baby- and toddler-friendly buns with simple, organic ingredients. Made fresh daily in a certified home kitchen in Los Altos, CA.</p>
          <div className="flex flex-wrap gap-3">
            <a href="#menu"><Button variant="hero">View Menu</Button></a>
            <a href="#contact"><Button variant="secondary">Order Now</Button></a>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;