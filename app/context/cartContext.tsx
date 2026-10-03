// src/context/CartContext.tsx
"use client"; // the cart reacts to clicks, so it must be a Client Component

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/app/types/product.ts";

// One line in the cart: which product, and how many of it
export type CartItem = { product: Product; quantity: number };

// What any component can get from the cart
type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  totalQuantity: number; // total number of pieces, for the navbar badge
};

// The shared "box". It starts empty (null) until the provider fills it
const CartContext = createContext<CartContextValue | null>(null);

// The provider holds the real cart data and wraps the whole app
export function CartProvider({ children }: { children: ReactNode }) {
  // items = the cart contents; setItems = the way to change them
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(product: Product) {
    setItems((current) => {
      // Is this product already in the cart?
      const existing = current.find((item) => item.product.id === product.id);

      if (existing) {
        // Yes: keep everything the same but add 1 to this product's quantity
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // No: add it as a new line with quantity 1
      return [...current, { product, quantity: 1 }];
    });
  }

  // Add up the quantities of all lines: 2 joggers + 1 shirt = 3
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

// A shortcut any component uses to reach the cart: const { addItem } = useCart();
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // Helpful error if we ever forget to wrap the app in <CartProvider>
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
}