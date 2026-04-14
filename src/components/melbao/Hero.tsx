import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative w-full flex items-center">
      {/* Content */}
      <div className="container pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col items-center text-center">
        <img
          src="/branding/header.png"
          alt="Mel Bao logo"
          className="w-40 h-auto md:w-56 mb-8"
        />
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight max-w-3xl">
          For little tummies ❤️
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-4">
          Small-batch, handmade bao crafted with organic ingredients in our certified home kitchen in Los Altos. No added sugar, salt, or egg.
        </p>
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <a href="#menu">
            <Button variant="playful" size="lg" className="font-display text-lg px-8">
              See Our Menu
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>

        <div className="flex flex-wrap gap-3 mt-10 justify-center">
          <span className="px-4 py-1.5 rounded-full border bg-muted text-foreground text-sm font-medium">
            100% Organic
          </span>
          <span className="px-4 py-1.5 rounded-full border bg-muted text-foreground text-sm font-medium">
            No Sugar Added
          </span>
          <span className="px-4 py-1.5 rounded-full border bg-muted text-foreground text-sm font-medium">
            Handmade Fresh
          </span>
          <span className="px-4 py-1.5 rounded-full border bg-muted text-foreground text-sm font-medium">
            10 Pcs per Pack
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
