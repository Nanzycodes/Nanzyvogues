// src/app/cart/page.tsx
// This stays a Server Component. Only CartView inside it is a Client Component
import CartView from "@/app/components/CartView";

// The text shown in the browser tab for this page
export const metadata = { title: "Your cart | Trendy Wears" };

export default function CartPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Your cart</h1>
      <CartView />
    </main>
  );
}
