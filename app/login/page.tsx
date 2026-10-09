// app/login/page.tsx
import LoginForm from "@/app/components/LoginForm";

// The text shown in the browser tab
export const metadata = { title: "Log in | Trendy Wears" };

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">Log in</h1>
      <LoginForm />
    </main>
  );
}