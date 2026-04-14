import Navbar from "@/components/melbao/Navbar";
import Hero from "@/components/melbao/Hero";
import MenuHighlights from "@/components/melbao/MenuHighlights";
import About from "@/components/melbao/About";
import FAQ from "@/components/melbao/FAQ";
import InstagramFeed from "@/components/melbao/InstagramFeed";
import OrderingInfo from "@/components/melbao/OrderingInfo";
import Contact from "@/components/melbao/Contact";
import Footer from "@/components/melbao/Footer";
import StickyCTA from "@/components/melbao/StickyCTA";
import { Helmet } from "react-helmet-async";
import { useMemo } from "react";

const Index = () => {
  const canonical = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.origin + window.location.pathname;
    }
    return "https://melbao.lovable.app/";
  }, []);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Mel Bao",
    description:
      "Microenterprise Home Kitchen Operation in Los Altos crafting baby- and toddler-friendly artisan buns.",
    areaServed: "Los Altos, CA",
    founders: [
      { "@type": "Person", name: "Dennis Hou" },
      { "@type": "Person", name: "Phoebe Chen" },
    ],
    servesCuisine: "Asian",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "08:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday"], opens: "08:00", closes: "12:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "20:00" },
    ],
  };

  return (
    <div>
      <Helmet>
        <title>Mel Bao | Organic Baby-Friendly Bao in Los Altos</title>
        <meta
          name="description"
          content="Mel Bao is a MEHKO bakery in Los Altos by Dennis Hou & Phoebe Chen — handmade organic bao for babies and toddlers. No added sugar, salt, or egg."
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <MenuHighlights />
        <About />
        <OrderingInfo />
        <FAQ />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;
