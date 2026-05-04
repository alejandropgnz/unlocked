import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/Button";

export function NavBar() {
  const { user, profile, signInWithGoogle } = useAuth();

  return (
    <nav className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/5">
      <Link to="/" className="font-black text-lg tracking-tightest">
        UNLOCKED
      </Link>
      <div className="flex items-center gap-6 text-sm">
        <Link to="/" className="hover:text-gold transition">Home</Link>
        <Link to="/descubrir" className="hover:text-gold transition">Descubrir</Link>
        <Link to="/crear" className="hover:text-gold transition">Crear</Link>
        {profile?.is_admin && (
          <Link to="/admin" className="hover:text-gold transition">Admin</Link>
        )}
        {user && profile ? (
          <Link to="/yo" className="hover:text-gold transition font-bold">
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
