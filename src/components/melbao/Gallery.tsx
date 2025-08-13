import img1 from "@/assets/menu-sesame-bun.jpg";
import img2 from "@/assets/menu-banana-bun.jpg";
import img3 from "@/assets/menu-yam-bun.jpg";

import img5 from "@/assets/gallery-bamboo-steamer.jpg";
import img6 from "@/assets/gallery-sesame-macro.jpg";

const images = [
  { src: img1, alt: "Sesame bun close-up with sesame seeds", caption: "Sesame Bun" },
  { src: img2, alt: "Banana bun with fluffy interior", caption: "Banana Bun" },
  { src: img3, alt: "Yam bun with light purple yam filling", caption: "Yam Bun" },
  
  { src: img5, alt: "Bamboo steamer filled with buns", caption: "Fresh from the steamer" },
  { src: img6, alt: "Macro sesame seeds on wooden board", caption: "Toasted sesame detail" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="container py-16 md:py-24">
      <div className="max-w-2xl mb-10">
        <h2 className="font-display text-3xl md:text-4xl">Gallery</h2>
        <p className="text-muted-foreground mt-2">A photo-first look at our fresh, handcrafted favorites.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((img) => (
          <figure key={img.alt} className="overflow-hidden rounded-lg border bg-card">
            <img src={img.src} alt={img.alt} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            <figcaption className="p-3 text-sm text-muted-foreground">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
