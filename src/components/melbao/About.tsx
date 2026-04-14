const About = () => {
  return (
    <section id="about" className="container py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Our Story</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Mel Bao is a Microenterprise Home Kitchen Operation (MEHKO) in Los
            Altos, California, lovingly run by Mel's parents. We craft
            Asian-inspired, baby- and toddler-friendly buns with a focus on
            fresh, organic ingredients and authentic flavors.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Every batch is made by hand in our certified home kitchen, with warm
            hospitality at the heart of everything we do.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-muted rounded-xl p-4">
              <p className="font-display font-semibold text-lg">100%</p>
              <p className="text-sm text-muted-foreground">Organic Ingredients</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <p className="font-display font-semibold text-lg">10 pcs</p>
              <p className="text-sm text-muted-foreground">Per Package</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <p className="font-display font-semibold text-lg">Handmade</p>
              <p className="text-sm text-muted-foreground">Small Batches</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <p className="font-display font-semibold text-lg">Kid-Sized</p>
              <p className="text-sm text-muted-foreground">Perfect for Little Hands</p>
            </div>
          </div>
        </div>

        {/* Package photos */}
        <div className="grid grid-cols-2 gap-3">
          <img
            src="/products/corn-package.jpg"
            alt="Corn Scallion Cheese Bao in branded packaging"
            className="rounded-xl object-cover w-full aspect-[3/4]"
            loading="lazy"
          />
          <img
            src="/products/purple-yam-package.jpg"
            alt="Purple Yam Bao in branded packaging"
            className="rounded-xl object-cover w-full aspect-[3/4] mt-8"
            loading="lazy"
          />
          <img
            src="/products/black-sesame-package.jpg"
            alt="Black Sesame Bao in branded packaging"
            className="rounded-xl object-cover w-full aspect-[3/4] col-span-2"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
