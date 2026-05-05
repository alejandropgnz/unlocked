import { useLocation, Navigate } from "react-router-dom";
import { showLanding } from "@/lib/launch";

/**
 * Top-level route gate. Pre-launch (and not in preview mode) every route
 * except /proximamente is rerouted to the landing. Post-launch /proximamente
 * itself redirects to /, so the path stops working after the product is
 * public.
 *
 * Mounted just inside <BrowserRouter> so it sees every navigation. Pure
 * function — `showLanding()` reads env + window state synchronously.
 */
export function LaunchGate({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const landing = showLanding();
  const onLanding = location.pathname === "/proximamente";

  if (landing && !onLanding) {
    return <Navigate to="/proximamente" replace />;
  }
  if (!landing && onLanding) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
