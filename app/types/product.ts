// src/types/product.ts
// Reuse the Category type from our shared list, so a product can only
// belong to one of our five real categories
import type { Category } from "@/app/lib/categories";

// A "type" describes the shape every product object must have
export type Product = {
  id: string;          // unique id, will also be used as the React key
  slug: string;        // URL-friendly name, e.g. "classic-leather-slides"
  name: string;        // what the customer sees
  category: Category;  // must be one of: slides, sneakers, clothes, trousers, general
  price: number;       // price in naira (whole number)
  description: string;
  image: string;       // image URL (we'll connect real image uploads later)
  inStock: boolean;    // false = show "Sold out" later
};