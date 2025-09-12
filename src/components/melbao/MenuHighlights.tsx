import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [{
  name: "Sesame Bun",
  img: "/lovable-uploads/69437822-4cb1-4629-a80a-b67894698184.png",
  ingredients: ["Organic wheat flour", "Organic whole milk", "Organic sesame powder", "Yeast"]
}, {
  name: "Seasonal Bun",
  img: "/lovable-uploads/54ba5924-1524-47dc-8fc7-825cc28fcd97.png",
  ingredients: ["Organic wheat flour", "Organic whole milk", "Organic tomato", "Organic raisins", "Yeast"]
}];
const MenuHighlights = () => {
  return <section id="menu" className="container py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="font-display text-3xl md:text-4xl">Menu</h2>
        <p className="text-muted-foreground mt-2">
          Freshly made, baby- and toddler-friendly buns from our certified home kitchen.
        </p>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => <Card key={item.name}>
            <CardHeader>
              <CardTitle className="font-display">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <img src={item.img} alt={`${item.name} photo`} className="w-full h-44 sm:h-48 object-cover rounded-md" loading="lazy" />
              <ul className="text-sm list-disc pl-5 text-muted-foreground">
                {item.ingredients.map(ing => <li key={ing}>{ing}</li>)}
              </ul>
            </CardContent>
          </Card>)}
      </div>
    </section>;
};
export default MenuHighlights;