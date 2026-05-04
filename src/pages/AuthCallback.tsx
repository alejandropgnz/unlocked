import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Supabase handles the token exchange from URL hash automatically when
    // detectSessionInUrl is true. We just wait for the session to be set.
    void supabase.auth.getSession().then(() => {
      const next = searchParams.get("next") ?? "/";
      navigate(next, { replace: true });
    });
  }, [navigate, searchParams]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <p className="text-muted text-sm uppercase tracking-widest animate-pulse">
        Redirigiendo...
      </p>
    </div>
  );
}
