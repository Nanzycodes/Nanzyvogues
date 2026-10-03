import { notFound } from "next/navigation";
import { isCategory } from "../../lib/categories";
type Props = { params: Promise<{ category: string }> };

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold capitalize">{category}</h1>
    </main>
  );
}