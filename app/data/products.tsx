// src/data/products.ts
import type { Product } from "@/app//types/product";
import type { Category } from "@/app/lib/categories";

// Temporary fake data. Later this comes from our own API and database
export const products: Product[] = [
  {
    id: "1",
    slug: "classic-leather-slides",
    name: "Classic Leather Slides",
    category: "slides",
    price: 12000,
    description: "Soft leather slides for everyday wear.",
    image: "https://placehold.co/600x600/png?text=Slides",
    inStock: true,
  },
  {
    id: "2",
    slug: "street-runner-sneakers",
    name: "Street Runner Sneakers",
    category: "sneakers",
    price: 35000,
    description: "Lightweight sneakers with a cushioned sole.",
    image: "https://placehold.co/600x600/png?text=Sneakers",
    inStock: true,
  },
  {
    id: "3",
    slug: "ankara-print-shirt",
    name: "Ankara Print Shirt",
    category: "clothes",
    price: 18000,
    description: "Bold Ankara print, tailored fit.",
    image: "https://placehold.co/600x600/png?text=Shirt",
    inStock: true,
  },
  {
    id: "4",
    slug: "slim-fit-chinos",
    name: "Slim Fit Chinos",
    category: "trousers",
    price: 22000,
    description: "Stretch cotton chinos that work for office and weekends.",
    image: "https://placehold.co/600x600/png?text=Chinos",
    inStock: false, // sold out, useful for testing later
  },
  {
    id: "5",
    slug: "cotton-joggers",
    name: "Cotton Joggers",
    category: "trousers",
    price: 15000,
    description: "Comfortable joggers with an elastic waist.",
    image: "https://placehold.co/600x600/png?text=Joggers",
    inStock: true,
  },
  {
    id: "6",
    slug: "canvas-tote-bag",
    name: "Canvas Tote Bag",
    category: "general",
    price: 8000,
    description: "Strong canvas tote for daily use.",
    image: "https://placehold.co/600x600/png?text=Tote",
    inStock: true,
  },
];

// Returns only the products that belong to the given category
export function getProductsByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category);
}
// Finds one product by its slug. Returns undefined if nothing matches,
// which is why the return type says "Product | undefined"
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}