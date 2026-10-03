// src/components/Navbar.tsx
import Link from "next/link";
import { CATEGORIES } from "@/app/lib/categories";

export default function Navbar() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 p-4">
        <Link href="/" className="text-xl font-bold">
          Trendy Wears
        </Link>

        <ul className="flex flex-wrap gap-4">
          {CATEGORIES.map((category) => (
            <li key={category}>
              <Link
                href={`/shop/${category}`}
                className="capitalize hover:underline"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}