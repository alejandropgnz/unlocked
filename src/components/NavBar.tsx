import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/Button";

/**
 * Top nav bar (desktop). Shows brand on the left, auth status on the right.
 * Navigation links live in `<Sidebar />` below this bar.
 */
export function NavBar() {
  const { user, profile, signInWithGoogle } = useAuth();

  return (
    <nav className="hidden md:flex items-center justify-between px-6 lg:px-8 py-4 border-b border-white/5">
      <Link to="/" className="font-black text-lg tracking-tightest">
        UNLOCKED
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {user && profile ? (
          <Link
            to={`/u/${profile.username}`}
            className="hover:text-gold transition font-bold"
          >
            @{profile.username}
          </Link>
        ) : (
          <Button size="sm" onClick={() => void signInWithGoogle()}>
            Entrar con Google
          </Button>
        )}
      </div>
    </nav>
  );
}
