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
    id: "sesame-bun",
    name: "Sesame Bun",
    description: "Classic sesame-topped bun with sweet filling",
    price: 1500,
    pieces_per_package: 10,
  },
  {
    id: "yam-bun",
    name: "Yam Bun",
    description: "Purple yam filled bun with creamy texture",
    price: 1500,
    pieces_per_package: 10,
  },
  {
    id: "banana-bun",
    name: "Banana Bun",
    description: "Sweet banana custard filled bun",
    price: 1500,
    pieces_per_package: 10,
  },
  {
    id: "sticky-rice",
    name: "Sticky Rice Bun",
    description: "Traditional sticky rice filled bun",
    price: 1800,
    pieces_per_package: 10,
  },
];
