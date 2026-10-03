// src/app/store/[category]/page.tsx
import { notFound } from "next/navigation";
import { isCategory } from "@/app/lib/categories";
// The helper we just wrote
import { getProductsByCategory } from "@/app/data/products";
import ProductCard from "@/app/components/productCards";

type Props = { params: Promise<{ category: string }> };

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // Unknown category -> show the 404 page
  if (!isCategory(category)) notFound();

  // After the check above, TypeScript knows "category" is a valid Category
  const items = getProductsByCategory(category);

  return (
     <main className="mx-auto max-w-6xl p-6">
    <h1 className="text-2xl font-bold capitalize">{category}</h1>

    {/* Responsive grid: 2 columns on phones, 3 from "sm" up, 4 from "lg" up */}
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((product) => (
        // key={product.id}: the unique id we talked about earlier
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </main>
  );
}