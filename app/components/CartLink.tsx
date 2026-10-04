// src/components/CartLink.tsx
"use client";

import Link from "next/link";
import { useCart } from "@/app/context/cartContext";

export default function CartLink() {
  const { totalQuantity } = useCart(); // updates automatically when items are added

  return (
    // The /cart page doesn't exist yet, so clicking shows a 404 for now
    <Link href="/cart" className="font-medium hover:underline">
      Cart ({totalQuantity})
    </Link>
  );
}