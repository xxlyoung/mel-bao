import { Button } from "@/components/ui/button";
const Hero = () => {
  return <section id="home" className="relative min-h-[80vh] w-full flex items-center">
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <img src="/lovable-uploads/471bacc7-5249-4498-868b-58fab331450b.png" alt="Mel Bao branded packaging bags" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/90" />
      <div className="container relative py-32 md:py-40">
        <div className="max-w-2xl space-y-6 animate-enter">
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Freshly Made, Lovingly Crafted – From Our Home Kitchen to Your Table
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">Handcrafted baby- and toddler-friendly buns with simple, organic ingredients. Made fresh daily in a certified home kitchen in Los Altos, California.</p>
          <div className="flex flex-wrap gap-3">
            <a href="#menu"><Button variant="mel-yellow">View Menu</Button></a>
            
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;