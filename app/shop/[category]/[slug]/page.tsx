// src/app/store/[category]/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { isCategory } from "@/app/lib/categories";
import { getProductBySlug } from "@/app/data/products";

// This page receives TWO values from the URL: category and slug
type Props = { params: Promise<{ category: string; slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;

  // Look up the product using the slug from the URL
  const product = getProductBySlug(slug);

  // Show the 404 page if ANY of these is true:
  // 1. the category isn't one of our five
  // 2. no product has this slug
  // 3. the product exists but belongs to a different category
  if (!isCategory(category) || !product || product.category !== category) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* One column on phones, two columns (image | details) from "md" (768px) up */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left side: the product image in a square box */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority // this is the main image on the page, so load it first
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Right side: product details */}
        <div>
          <p className="text-sm capitalize text-gray-500">{product.category}</p>
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-2xl">₦{product.price.toLocaleString()}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* The button is disabled when the product is sold out.
              It does nothing yet; we wire it up when we build the cart */}
          <button
            disabled={!product.inStock}
            className="mt-6 rounded bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {product.inStock ? "Add to cart" : "Sold out"}
          </button>
        </div>
      </div>
    </main>
  );
}