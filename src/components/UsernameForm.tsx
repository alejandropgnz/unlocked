import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useUsernameAvailability } from "@/hooks/useUsernameAvailability";
import { useChangeUsername } from "@/hooks/useChangeUsername";
import { Button } from "./ui/Button";
import { cn } from "@/lib/cn";

interface UsernameFormProps {
  currentUsername: string;
}

export function UsernameForm({ currentUsername }: UsernameFormProps) {
  const [draft, setDraft] = useState(currentUsername);
  const debounced = useDebounce(draft.trim().toLowerCase(), 350);
  const { data: check } = useUsernameAvailability(debounced, currentUsername);
  const changeMut = useChangeUsername();
  const navigate = useNavigate();

  const status = check?.status ?? "idle";
  const message = check?.message ?? "";

  const canSubmit =
    status === "available" && draft.trim().toLowerCase() !== currentUsername.toLowerCase();

  const dotClass = cn(
    "w-2 h-2 rounded-full transition",
    status === "available" && "bg-green-400",
    status === "taken" && "bg-red",
    status === "invalid" && "bg-red/60",
    status === "current" && "bg-muted",
    (status === "idle" || status === "checking") && "bg-muted/50 animate-pulse",
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    changeMut.mutate(debounced, {
      onSuccess: (saved) => {
        navigate(`/u/${saved}`, { replace: true });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-muted text-sm font-mono select-none">@</span>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={20}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="flex-1 bg-bg border border-white/10 rounded-xl p-3 text-sm font-mono lowercase focus:border-gold focus:outline-none disabled:opacity-50"
          placeholder="tu_username"
        />
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className={dotClass} />
          <span
            className={cn(
              "text-muted",
              status === "available" && "text-green-400",
              status === "taken" && "text-red",
              status === "invalid" && "text-red/80",
            )}
          >
            {message || " "}
          </span>
        </div>
        <Button type="submit" size="sm" disabled={!canSubmit || changeMut.isPending}>
          {changeMut.isPending ? "..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
