import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";

export default function Login() {
  const { user, signInWithGoogle, loading } = useAuth();
  const [params] = useSearchParams();
  const next = params.get("next") ?? "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(next, { replace: true });
    }
  }, [user, loading, next, navigate]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center gap-4">
      <h1 className="text-4xl md:text-6xl font-black tracking-tightest bg-gradient-to-br from-red via-gold to-violet bg-clip-text text-transparent leading-none">
        UNLOCKED
      </h1>
      <p className="text-muted text-sm">
        Inicia sesión con Google para empezar a coleccionar.
      </p>
      <Button onClick={() => void signInWithGoogle(next)} className="mt-4">
        Entrar con Google
      </Button>
    </section>
  );
}
