import Navbar from "@/components/melbao/Navbar";
import Hero from "@/components/melbao/Hero";
import Gallery from "@/components/melbao/Gallery";
import MenuHighlights from "@/components/melbao/MenuHighlights";
import About from "@/components/melbao/About";
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
      "Microenterprise Home Kitchen Operation in Los Altos crafting artisan buns and steamed sticky rice.",
    areaServed: "Los Altos, CA",
    founders: [
      { "@type": "Person", name: "Dennis Hou" },
      { "@type": "Person", name: "Phoebe Chen" }
    ],
    servesCuisine: "Asian",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "08:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday"], opens: "08:00", closes: "12:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "20:00" }
    ]
  };

  return (
    <div>
      <Helmet>
        <title>Mel Bao | Artisan Buns & Sticky Rice in Los Altos</title>
        <meta name="description" content="Photo-first MEHKO bakery in Los Altos by Dennis Hou & Phoebe Chen — handcrafted buns and steamed sticky rice, made fresh daily." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <MenuHighlights />
        <Gallery />
        <About />
        <OrderingInfo />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;
