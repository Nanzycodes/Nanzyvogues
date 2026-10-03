// src/app/page.tsx
import Link from "next/link";
import { CATEGORIES } from "@/app/lib/categories";
import { getFeaturedProducts } from "@/app/data/products";
import ProductCard from "@/app/components/productCards"; 

export default function HomePage() {
  // Get the featured products once, then use them below
  const featured = getFeaturedProducts();

  return (
    <main className="mx-auto max-w-6xl space-y-12 p-6">
      {/* 1. Hero: the big welcome banner at the top */}
      <section className="rounded-lg bg-gray-100 px-6 py-16 text-center">
        <h1 className="text-4xl font-bold">Trendy Wears</h1>
        <p className="mt-3 text-gray-600">
          Fresh styles for your feet and your wardrobe.
        </p>
        {/* The button sends the visitor to the first category in our shared list */}
        <Link
          href={`/shop/${CATEGORIES[0]}`}
          className="mt-6 inline-block rounded bg-black px-6 py-3 text-white"
        >
          Shop now
        </Link>
      </section>

      {/* 2. Category tiles: one per category, built from the shared list */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Shop by category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/shop/${category}`}
              className="rounded-lg border p-6 text-center font-medium capitalize hover:bg-gray-50"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured products: same ProductCard, same grid classes as the category page */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Featured</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}