"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const { error: authError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (authError) {
        setError(
          "Unable to sign in. Check your credentials or contact the centre administrator."
        );
        return;
      }

      router.replace("/portal");
      router.refresh();
    } catch {
      setError(
        "Authentication is temporarily unavailable."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="fm-login-form"
      onSubmit={handleLogin}
    >
      <label htmlFor="fm-login-email">
        Email address
      </label>

      <input
        id="fm-login-email"
        type="email"
        autoComplete="username"
        placeholder="name@example.com"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
        maxLength={254}
        required
      />

      <label htmlFor="fm-login-password">
        Password
      </label>

      <input
        id="fm-login-password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
        required
      />

      {error && (
        <p role="alert" className="fm-login-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
        <span aria-hidden="true">→</span>
      </button>

      <p className="fm-login-note">
        Access is restricted to authorised
        Future Minds accounts.
      </p>
    </form>
  );
}
