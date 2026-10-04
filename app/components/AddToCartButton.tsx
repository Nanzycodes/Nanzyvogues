// src/components/AddToCartButton.tsx
"use client";

import { useState } from "react";
import type { Product } from "@/app/types/product.ts";
import { useCart } from "@/app/context/cartContext";

// The button now needs the whole product so it can put it in the cart
type Props = { product: Product };

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart(); // reach into the shared cart
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product); // put the product in the real cart
    setAdded(true);   // show "Added ✓" for 2 seconds, as before
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleClick}
      disabled={!product.inStock}
      className="mt-6 rounded bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      {!product.inStock ? "Sold out" : added ? "Added ✓" : "Add to cart"}
    </button>
  );
}