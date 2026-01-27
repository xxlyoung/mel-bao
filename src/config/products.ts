export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  pieces_per_package: number;
  image_url: string;
}

export const products: Product[] = [
  {
    id: "sesame-bun",
    name: "Sesame Bun",
    description: "Classic sesame-topped bun with sweet filling",
    price: 1500, // $15.00
    pieces_per_package: 10,
    image_url: "/src/assets/menu-sesame-bun.jpg"
  },
  {
    id: "yam-bun",
    name: "Yam Bun", 
    description: "Purple yam filled bun with creamy texture",
    price: 1500,
    pieces_per_package: 10,
    image_url: "/src/assets/menu-yam-bun.jpg"
  },
  {
    id: "banana-bun",
    name: "Banana Bun",
    description: "Sweet banana custard filled bun",
    price: 1500,
    pieces_per_package: 10,
    image_url: "/src/assets/menu-banana-bun.jpg"
  },
  {
    id: "sticky-rice",
    name: "Sticky Rice Bun",
    description: "Traditional sticky rice filled bun",
    price: 1800, // $18.00
    pieces_per_package: 10,
    image_url: "/src/assets/menu-sticky-rice.jpg"
  }
];
