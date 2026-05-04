import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";

export default function Login() {
  const [searchParams] = useSearchParams();
  const { signInWithGoogle } = useAuth();
  const next = searchParams.get("next") ?? undefined;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tightest">UNLOCKED</h1>
        <p className="text-muted mt-2 text-sm">your weird life · achieved</p>
      </div>
      <Button size="lg" onClick={() => void signInWithGoogle(next)}>
        Entrar con Google
      </Button>
    </div>
  );
}
