// app/components/SignupForm.tsx
"use client";

import { useState, type FormEvent } from "react";

// One shared style so the three inputs look the same
const inputClass = "mt-1 w-full rounded border px-3 py-2";

export default function SignupForm() {
  // What the visitor has typed so far
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // What the screen should show
  const [error, setError] = useState("");        // an error message, if any
  const [success, setSuccess] = useState(false); // true after the account is created
  const [loading, setLoading] = useState(false); // true while we wait for the server

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page
    setError("");
    setLoading(true);

    try {
      // Send the typed data to the API route
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        // The API sends { error: "..." } when something is wrong
        setError(data.error ?? "Something went wrong");
      } else {
        setSuccess(true);
      }
    } catch {
      // The request never reached the server (network problem)
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false); // always re-enable the button, success or not
    }
  }

  // After success, replace the form with a message
  if (success) {
    return (
      <p className="rounded bg-green-50 p-4 text-green-800">
        Account created! Login is the next thing we build.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        Name
        <input
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)} // update state on every keystroke
          autoComplete="name"
          required
        />
      </label>

      <label className="block">
        Email
        <input
          className={inputClass}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </label>

      <label className="block">
        Password (at least 8 characters)
        <input
          className={inputClass}
          type="password" // hides what is typed
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
      </label>

      {/* Show the error only when there is one */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading} // can't click again while the request is running
        className="w-full rounded bg-black px-6 py-3 text-white disabled:bg-gray-400"
      >
        {loading ? "Creating account..." : "Sign up"}
      </button>
    </form>
  );
}