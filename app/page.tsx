import Link from "next/link";
import { CATEGORIES } from "./lib/categories";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Nanzy Vogues</h1>
      <ul className="flex flex-col gap-3">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <Link href={`/shop/${category}`} className="capitalize underline">
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
