import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
  const { user, loading } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    const next = params.get("next") ?? "/";
    if (user) {
      navigate(next, { replace: true });
    } else {
      navigate("/login?error=auth_failed", { replace: true });
    }
  }, [user, loading, params, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <p className="text-muted text-sm uppercase tracking-widest animate-pulse">
        Redirigiendo...
      </p>
    </section>
  );
}
