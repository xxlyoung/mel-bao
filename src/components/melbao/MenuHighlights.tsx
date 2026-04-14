import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { products } from "@/config/products";
import { useCart } from "@/contexts/CartContext";

const MenuHighlights = () => {
  const { addItem, removeItem, getItemQuantity } = useCart();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="menu" className="container py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="font-display text-3xl md:text-4xl mb-2">Our Menu</h2>
        <p className="text-muted-foreground">
          Each pack includes 10 kid-sized baos — all organic, no added sugar, salt, or egg.
        </p>
      </div>

      <div className="mb-8 rounded-lg border border-green-200 bg-green-50 px-5 py-4">
        <p className="font-display font-semibold text-green-800">
          Bulk Discount: Save $5 for every 5 packs!
        </p>
        <p className="text-sm text-green-700 mt-1">
          Order 5 packs and get $5 off, 10 packs for $10 off, 15 packs for $15 off, and so on.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const qty = getItemQuantity(product.id);
          const isExpanded = expandedId === product.id;

          return (
            <Card
              key={product.id}
              className="overflow-hidden group flex flex-col"
            >
              {/* Product image */}
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur rounded-full px-3 py-1">
                  <span className="font-display font-semibold text-primary">
                    ${(product.price / 100).toFixed(0)}
                  </span>
                </div>
              </div>

              <CardContent className="p-5 flex flex-col flex-1">
                {/* Name and Chinese name */}
                <div className="mb-1">
                  <h3 className="font-display text-lg font-semibold leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.nameChinese}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground mt-1 flex-1">
                  {product.description}
                </p>

                {/* Expandable ingredients */}
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : product.id)
                  }
                  className="flex items-center gap-1 text-xs text-primary font-medium mt-3 hover:underline"
                >
                  Ingredients & Allergens
                  {isExpanded ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
                {isExpanded && (
                  <div className="text-xs text-muted-foreground mt-2 space-y-1 bg-muted/50 rounded-lg p-3">
                    <p>{product.ingredients}</p>
                    <p className="font-medium text-foreground/70">
                      {product.allergens}
                    </p>
                  </div>
                )}

                {/* Add to cart */}
                <div className="mt-4 pt-3 border-t">
                  {qty === 0 ? (
                    <Button
                      variant="playful"
                      size="sm"
                      onClick={() => addItem(product.id)}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
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
