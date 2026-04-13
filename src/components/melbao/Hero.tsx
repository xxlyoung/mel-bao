import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative h-full w-full flex items-center">
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <img
          src="/lovable-uploads/471bacc7-5249-4498-868b-58fab331450b.png"
          alt="Mel Bao branded packaging bags"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/90" />
      <div className="container relative py-32 md:py-40">
        <div className="max-w-2xl space-y-6 animate-enter">
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Buns for little tummies
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
            Small batch, baby-friendly buns made fresh in our certified home
            kitchen in Los Altos. No added sugar, salt, or egg.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#menu">
              <Button variant="hero" size="lg" className="font-display">
                Order Now
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
