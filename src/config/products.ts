export interface Product {
  id: string;
  name: string;
  nameChinese: string;
  description: string;
  ingredients: string;
  allergens: string;
  price: number; // in cents
  pieces_per_package: number;
  image_url: string;
}

export const products: Product[] = [
  {
    id: "sweet-potato",
    name: "Organic Sweet Potato Bao",
    nameChinese: "有機地瓜饅頭",
    description: "Golden sweet potato bao with a naturally sweet, vibrant flavor",
    ingredients: "Organic unbleached all-purpose flour, organic sweet potato, organic olive oil, yeast",
    allergens: "Contains: Wheat. Made in a facility that also processes Milk and Sesame.",
    price: 1200,
    pieces_per_package: 10,
    image_url: "/products/sweet-potato.jpg",
  },
  {
    id: "purple-yam",
    name: "Organic Purple Yam Bao",
    nameChinese: "有機紫薯饅頭",
    description: "Beautiful purple yam bao with a creamy, earthy sweetness",
    ingredients: "Organic unbleached all-purpose flour, organic purple yam, organic olive oil, yeast",
    allergens: "Contains: Wheat. Made in a facility that also processes Milk and Sesame.",
    price: 1200,
    pieces_per_package: 10,
    image_url: "/products/purple-yam.jpg",
  },
  {
    id: "corn-scallion-cheese",
    name: "Organic Corn Scallion Cheese Bao",
    nameChinese: "有機玉米香蔥起司饅頭",
    description: "Savory bao loaded with corn, scallion, and a trio of organic cheeses",
    ingredients: "Organic unbleached all-purpose flour, organic mozzarella cheese, organic Monterey Jack cheese, organic cheddar cheese, organic corn, organic scallion, organic olive oil, yeast",
    allergens: "Contains: Wheat, Milk. Made in a facility that also processes Sesame.",
    price: 1200,
    pieces_per_package: 10,
    image_url: "/products/corn-scallion-cheese.jpg",
  },
  {
    id: "black-sesame",
    name: "Organic Black Sesame Bao",
    nameChinese: "有機黑芝麻饅頭",
    description: "Rich, nutty black sesame bao with a beautiful dark color",
    ingredients: "Organic unbleached all-purpose flour, organic black sesame powder, organic whole milk, organic olive oil, yeast",
    allergens: "Contains: Wheat, Milk, Sesame.",
    price: 1200,
    pieces_per_package: 10,
    image_url: "/products/black-sesame.jpg",
  },
  {
    id: "tomato-raisin",
    name: "Organic Tomato & Raisin Bao",
    nameChinese: "有機番茄葡萄乾饅頭",
    description: "A unique sweet-savory bao with tomato and plump organic raisins",
    ingredients: "Organic unbleached all-purpose flour, organic tomato, organic raisin, organic olive oil, yeast",
    allergens: "Contains: Wheat. Made in a facility that also processes Milk and Sesame.",
    price: 1200,
    pieces_per_package: 10,
    image_url: "/products/tomato-raisin.jpg",
  },
];
