import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * Auth guard. Mirrors Wisheem's pattern — only blocks on `loading` (auth resolution),
 * NOT on `profileLoading`. The page itself can show partial content while the profile
 * keeps loading in the background.
 *
 * For admin routes we additionally wait on `profileLoading` because we need to know
 * `is_admin` before deciding whether to redirect non-admins.
 */
export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, profile, loading, profileLoading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted text-sm uppercase tracking-widest animate-pulse">
          Cargando...
        </p>
      </div>
    );
  }

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  // Admin gate needs profile.is_admin — wait on profile load only here.
  if (requireAdmin) {
    if (profileLoading) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-muted text-sm uppercase tracking-widest animate-pulse">
            Cargando...
          </p>
        </div>
      );
    }
    if (!profile?.is_admin) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
