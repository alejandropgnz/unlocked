"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginButton({
  next,
  variant = "primary",
}: {
  next?: string;
  variant?: "primary" | "ghost";
}) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const supabase = createClient();
    const params = new URLSearchParams();
    if (next) params.set("next", next);
    const redirectTo = `${window.location.origin}/api/auth/callback${params.toString() ? `?${params.toString()}` : ""}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) {
      console.error("OAuth start error", error);
      setLoading(false);
    }
  };

  const className =
    variant === "primary"
      ? "px-5 py-3 bg-white text-bg font-black rounded-full text-xs tracking-widest uppercase hover:bg-gold transition disabled:opacity-50"
      : "text-sm underline disabled:opacity-50";

  return (
    <button onClick={handleLogin} disabled={loading} className={className}>
      {loading ? "..." : "Entrar con Google"}
    </button>
  );
}
