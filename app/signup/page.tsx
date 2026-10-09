// app/signup/page.tsx
import SignupForm from "@/app/components/SignupForm";

// The text shown in the browser tab
export const metadata = { title: "Sign up | Trendy Wears" };

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">Create your account</h1>
      <SignupForm />
    </main>
  );
}