import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { products } from "@/config/products";
import { useCart } from "@/contexts/CartContext";

import sesameBun from "@/assets/menu-sesame-bun.jpg";
import yamBun from "@/assets/menu-yam-bun.jpg";
import bananaBun from "@/assets/menu-banana-bun.jpg";
import stickyRice from "@/assets/menu-sticky-rice.jpg";

const imageMap: Record<string, string> = {
  "sesame-bun": sesameBun,
  "yam-bun": yamBun,
  "banana-bun": bananaBun,
  "sticky-rice": stickyRice,
};

const MenuHighlights = () => {
  const { addItem, removeItem, getItemQuantity } = useCart();

  return (
    <section id="menu" className="container py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="font-display text-3xl md:text-4xl mb-2">Our Menu</h2>
        <p className="text-muted-foreground">
          Each package contains 10 pieces — no added sugar, salt, or egg.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => {
          const qty = getItemQuantity(product.id);
          return (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={imageMap[product.id]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="font-display text-lg font-semibold text-primary">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      / {product.pieces_per_package} pcs
                    </span>
                  </div>

                  {qty === 0 ? (
                    <Button
                      variant="playful"
                      size="sm"
                      onClick={() => addItem(product.id)}
                      className="min-w-[120px]"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => removeItem(product.id)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-display text-lg font-semibold w-6 text-center">
                        {qty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => addItem(product.id)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default MenuHighlights;
