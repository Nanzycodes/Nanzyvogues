// src/components/AddToCartButton.tsx
"use client"; // here we try to use interact with the server

import { useState } from "react";

// The parent page tells the button whether the product is in stock
type Props = { inStock: boolean };

export default function AddToCartButton({ inStock }: Props) {
  // "added" remembers whether the button was just clicked.
  // false at the start; setAdded changes it, and React re-draws the button
  const [added, setAdded] = useState(false);

  function handleClick() {
    setAdded(true); // show "Added ✓"
    // After 2 seconds (2000 ms), go back to normal
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleClick} // runs handleClick whenever the button is clicked
      disabled={!inStock}   // can't click it if the product is sold out
      className="mt-6 rounded bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      {/* Three possible labels, depending on the situation */}
      {!inStock ? "Sold out" : added ? "Added ✓" : "Add to cart"}
    </button>
  );
}