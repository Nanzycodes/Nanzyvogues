// app/components/AuthLinks.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type SessionUser = { id: string; name: string; email: string };

export default function AuthLinks() {
  const pathname = usePathname(); // the current page's address, e.g. "/login"
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checked, setChecked] = useState(false); // true once the server has answered

  // Ask the server who is logged in. Because "pathname" is in the list below,
  // this runs again every time the visitor moves to another page. That is how
  // the navbar notices a fresh login (the navbar itself never reloads)
  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setChecked(true));
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  // Show nothing until we know, so "Log in" doesn't flash for a logged-in visitor
  if (!checked) return null;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {/* First name only, to keep the navbar short */}
        <span className="text-sm">Hi, {user.name.split(" ")[0]}</span>
        <button onClick={handleLogout} className="text-sm hover:underline">
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <Link href="/login" className="hover:underline">Log in</Link>
      <Link href="/signup" className="rounded bg-black px-3 py-1 text-white">
        Sign up
      </Link>
    </div>
  );
}