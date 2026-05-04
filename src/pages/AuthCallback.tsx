import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
  const { user, loading } = useAuth();
  const [params] = useSearchParams();
  const next = params.get("next") ?? "/";

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-muted text-sm uppercase tracking-widest animate-pulse">
          Redirigiendo...
        </p>
      </section>
    );
  }

  if (user) {
    return <Navigate to={next} replace />;
  }

  // Not logged in after callback — auth must have failed
  return <Navigate to="/login?error=auth_failed" replace />;
}
