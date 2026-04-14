// Server-side product definitions for Netlify functions.
// Keep in sync with src/config/products.ts (without Vite asset paths).

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  pieces_per_package: number;
}

export const products: Product[] = [
  {
    id: "sweet-potato",
    name: "Organic Sweet Potato Bao",
    description: "Golden sweet potato bao with a naturally sweet, vibrant flavor",
    price: 1200,
    pieces_per_package: 10,
  },
  {
    id: "purple-yam",
    name: "Organic Purple Yam Bao",
    description: "Beautiful purple yam bao with a creamy, earthy sweetness",
    price: 1200,
    pieces_per_package: 10,
  },
  {
    id: "corn-scallion-cheese",
    name: "Organic Corn Scallion Cheese Bao",
    description: "Savory bao loaded with corn, scallion, and a trio of organic cheeses",
    price: 1200,
    pieces_per_package: 10,
  },
  {
    id: "black-sesame",
    name: "Organic Black Sesame Bao",
    description: "Rich, nutty black sesame bao with a beautiful dark color",
    price: 1200,
    pieces_per_package: 10,
  },
  {
    id: "tomato-raisin",
    name: "Organic Tomato & Raisin Bao",
    description: "A unique sweet-savory bao with tomato and plump organic raisins",
    price: 1200,
    pieces_per_package: 10,
  },
];
