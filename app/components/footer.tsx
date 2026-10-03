// src/components/Footer.tsx
import Link from "next/link";
// Same shared list the navbar uses.
import { CATEGORIES } from "@/app/lib/categories";

export default function Footer() {
  return (
    // <footer> is the HTML tag for the bottom section of a page
    <footer className="mt-12 border-t">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 p-4">
        {/* Brand name and copyright. new Date().getFullYear() keeps the year current */}
        <p className="text-sm">
          © {new Date().getFullYear()} Trendy Wears. All rights reserved.
        </p>

        {/* Loop through the categories and make one link for each */}
        <ul className="flex flex-wrap gap-4 text-sm">
          {CATEGORIES.map((category) => (
            // "key" helps React track each item in the list
            <li key={category}>
              <Link href={`/shop/${category}`} className="capitalize hover:underline">
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}