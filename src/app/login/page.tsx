"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginContent() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/";
  const error = params.get("error");

  useEffect(() => {
    if (error) return; // do not auto-retry if we just came back from a failed exchange
    const supabase = createClient();
    const search = new URLSearchParams();
    if (next) search.set("next", next);
    const redirectTo = `${window.location.origin}/api/auth/callback${search.toString() ? `?${search.toString()}` : ""}`;
    void supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  }, [next, error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center gap-4">
      {error ? (
        <>
          <div className="text-4xl">&#128559;</div>
          <h1 className="text-2xl font-black tracking-tighter">No pudimos completar el login</h1>
          <p className="text-muted text-sm">Intenta de nuevo.</p>
          <a href={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="px-5 py-3 bg-white text-bg font-black rounded-full text-xs tracking-widest uppercase">
            Reintentar
          </a>
        </>
      ) : (
        <p className="text-muted">Redirigiendo a Google...</p>
      )}
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen flex items-center justify-center"><p className="text-muted">Cargando...</p></main>}>
      <LoginContent />
    </Suspense>
  );
}
