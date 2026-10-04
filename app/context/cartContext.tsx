// src/context/CartContext.tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/app/types/product.ts";

export type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void; // NEW: remove a whole line
  totalQuantity: number;
  subtotal: number; // NEW: total price of everything in the cart
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(product: Product) {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }

  // NEW: keep every line EXCEPT the one with this product id.
  // filter() builds a brand new array and leaves the old one untouched
  function removeItem(productId: string) {
    setItems((current) =>
      current.filter((item) => item.product.id !== productId)
    );
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  // NEW: price x quantity for each line, added together
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, totalQuantity, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
}