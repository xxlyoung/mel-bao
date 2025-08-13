import heroImage from "@/assets/hero-bao.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[80vh] w-full flex items-center">
      <img
        src={heroImage}
        alt="Freshly steamed artisan bao buns in a bamboo steamer"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/90" />
      <div className="container relative py-32 md:py-40">
        <div className="max-w-2xl space-y-6 animate-enter">
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Freshly Made, Lovingly Crafted – From Our Home Kitchen to Your Table
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Handcrafted Asian-inspired buns and traditional steamed sticky rice.
            Made fresh daily by Dennis Hou and Phoebe Chen in a certified home kitchen in Los Altos, CA.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#menu"><Button variant="hero">View Menu</Button></a>
            <a href="#contact"><Button variant="secondary">Order Now</Button></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
