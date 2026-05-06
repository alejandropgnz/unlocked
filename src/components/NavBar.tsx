import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/Button";
import { Wordmark } from "./Wordmark";

/**
 * Top nav bar (desktop). Brand on the left, login button on the right (only
 * when not authenticated). Once logged in, profile access lives in the sidebar
 * and there's nothing else needed here — keeps the bar minimal.
 */
export function NavBar() {
  const { user, signInWithGoogle } = useAuth();

  return (
    // Horizontal padding chosen to align the wordmark's logo edge with
    // the Sidebar items' icon edge: Sidebar uses `px-4` (16px) container
    // + per-item `px-3` (12px) = 28px from screen edge. Matching with
    // `px-7` (28px) here keeps the padlock and menu icons in the same
    // vertical column.
    <nav className="hidden md:flex items-center justify-between px-7 py-4 border-b border-white/5">
      <Link to="/" aria-label="Unlocky — Inicio">
        <Wordmark size="md" />
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {!user && (
          <Button size="sm" onClick={() => void signInWithGoogle()}>
            Entrar con Google
          </Button>
        )}
      </div>
    </nav>
  );
}
