// src/context/CartContext.tsx
"use client";

// NEW: we now also import useEffect
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/app/types/product.ts";

export type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  totalQuantity: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

// NEW: the name under which the cart is saved in the browser
const STORAGE_KEY = "trendy-wears-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  // NEW: becomes true once we've tried to load the saved cart
  const [loaded, setLoaded] = useState(false);

  // NEW: LOAD. Runs once, right after the first render, in the browser only
  useEffect(() => {
    try {
      // localStorage only stores text, so we turn the text back into data
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // If the saved text is broken, ignore it and start with an empty cart
    }
    setLoaded(true); // loading is finished, saving may begin
  }, []); // the empty [] means "run this only once"

  // NEW: SAVE. Runs every time "items" changes
  useEffect(() => {
    // Don't save before loading finishes, or the empty starting cart
    // would overwrite the real saved cart
    if (!loaded) return;
    // localStorage only stores text, so we turn the data into text
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]); // [items, loaded] means "re-run when either changes"

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

  function removeItem(productId: string) {
    setItems((current) =>
      current.filter((item) => item.product.id !== productId)
    );
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
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