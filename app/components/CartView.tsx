// src/components/CartView.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/cartContext";

export default function CartView() {
  // Pull only what this screen needs out of the shared cart
  const { items, removeItem, subtotal } = useCart();

  // If there is nothing in the cart, show a friendly message and stop here
  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">Your cart is empty.</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded bg-black px-6 py-3 text-white"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y">
        {/* One row per cart line. We pull product and quantity out of each item */}
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-center gap-4 py-4">
            {/* Small square product image */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            {/* Name and "price x quantity". flex-1 makes this part take the free space */}
            <div className="flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-600">
                ₦{product.price.toLocaleString()} × {quantity}
              </p>
            </div>

            {/* Line total for this product */}
            <p className="font-medium">
              ₦{(product.price * quantity).toLocaleString()}
            </p>

            {/* Clicking calls removeItem with THIS product's id */}
            <button
              onClick={() => removeItem(product.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Total of everything in the cart */}
      <div className="mt-6 flex justify-between border-t pt-4 text-lg font-bold">
        <span>Subtotal</span>
        <span>₦{subtotal.toLocaleString()}</span>
      </div>

      {/* Not wired up yet. Payment comes later in the project */}
      <button
        disabled
        className="mt-6 w-full rounded bg-gray-400 px-6 py-3 text-white"
      >
        Checkout (coming soon)
      </button>
    </div>
  );
}