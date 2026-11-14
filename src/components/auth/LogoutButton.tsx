"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const { error: authError } =
        await supabase.auth.signOut();

      if (authError) {
        setError("Unable to sign out. Please retry.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setError("Unable to sign out. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fm-logout-control">
      <button
        type="button"
        disabled={loading}
        onClick={logout}
      >
        {loading ? "Signing out..." : "Sign out"}
      </button>

      {error && <p role="alert">{error}</p>}
    </div>
  );
}
