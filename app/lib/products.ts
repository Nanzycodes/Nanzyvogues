// lib/products.ts
import { prisma } from "@/app/lib/Prisma";
// IMPORTANT: use the same import path as category page a

import type { Category } from "@/app/lib/categories";

// All products in one category, oldest first
export async function getProductsByCategory(category: Category) {
  return prisma.product.findMany({
    where: { category },
    orderBy: { createdAt: "asc" },
  });
}

// One product by its slug. findUnique returns null if nothing matches
export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

// Up to 4 in-stock products for the home page
export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { inStock: true },
    orderBy: { createdAt: "asc" },
    take: 4, // the database-side version of slice(0, 4)
  });
}