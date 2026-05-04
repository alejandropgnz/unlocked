import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, profile, loading, profileLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || profileLoading) return;
    if (!user) {
      const next = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?next=${next}`, { replace: true });
      return;
    }
    if (requireAdmin && !profile?.is_admin) {
      navigate("/", { replace: true });
    }
  }, [user, profile, loading, profileLoading, requireAdmin, location, navigate]);

  if (loading || profileLoading || !user || (requireAdmin && !profile?.is_admin)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted text-sm uppercase tracking-widest animate-pulse">
          Cargando...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
