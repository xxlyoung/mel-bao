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
        
      </div>
    </section>;
};
export default About;