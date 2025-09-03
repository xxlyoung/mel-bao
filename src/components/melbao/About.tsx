import hands from "@/assets/about-hands-cooking.jpg";
import packagingBag1 from "@/assets/packaging-bag-1.png";
import packagingBags2 from "@/assets/packaging-bags-2.png";
import packagingBag3 from "@/assets/packaging-bag-3.png";
import packagingWall from "@/assets/packaging-wall-display.png";
const About = () => {
  return <section id="about" className="container py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Our Story</h2>
          <p className="mt-4 text-muted-foreground">
            Mel Bao is a Microenterprise Home Kitchen Operation (MEHKO) in Los Altos, California,
            lovingly run by <strong>Dennis Hou</strong> and <strong>Phoebe Chen</strong> — Mel’s parents.
            We craft Asian-inspired, baby- and toddler-friendly buns with a focus on fresh, organic ingredients and authentic flavors.
          </p>
          <p className="mt-3 text-muted-foreground">
            Every batch is made by hand in our certified home kitchen, with warm hospitality at the heart of everything we do.
          </p>
        </div>
        <div className="space-y-4">
          <figure className="overflow-hidden rounded-lg border">
            <img src={hands} alt="Hands shaping bao dough in a cozy home kitchen" className="w-full h-48 object-cover" loading="lazy" />
          </figure>
          <div className="grid grid-cols-2 gap-4">
            <figure className="overflow-hidden rounded-lg border">
              <img src="/lovable-uploads/a7dd52f5-7f0e-4b98-b910-7313dd2c9b38.png" alt="Colorful Mel Bao logos displayed in vibrant pink, yellow, orange, and blue colors" className="w-full h-32 object-cover" loading="lazy" />
            </figure>
            <figure className="overflow-hidden rounded-lg border">
              <img src="/lovable-uploads/c1501d72-2f33-4a03-9773-b8681d031704.png" alt="Two Mel Bao branded paper bags - one with pink sticker, one with large circular logo" className="w-full h-32 object-cover" loading="lazy" />
            </figure>
          </div>
        </div>
      </div>
    </section>;
};
export default About;