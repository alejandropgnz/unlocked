import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/Button";

/**
 * Top nav bar (desktop). Brand on the left, login button on the right (only
 * when not authenticated). Once logged in, profile access lives in the sidebar
 * and there's nothing else needed here — keeps the bar minimal.
 */
export function NavBar() {
  const { user, signInWithGoogle } = useAuth();

  return (
    <nav className="hidden md:flex items-center justify-between px-6 lg:px-8 py-4 border-b border-white/5">
      <Link to="/" className="font-black text-lg tracking-tightest">
        UNLOCKED
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
