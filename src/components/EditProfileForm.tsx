import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useUsernameAvailability } from "@/hooks/useUsernameAvailability";
import { useChangeUsername } from "@/hooks/useChangeUsername";
import { useSaveBio } from "@/hooks/useYo";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";
import { cn } from "@/lib/cn";

interface EditProfileFormProps {
  currentUsername: string;
}

/**
 * Combined edit-profile form: username + bio in a single form with ONE
 * Guardar button. Button is disabled until at least one field has a valid
 * pending change. Saves both fields atomically (bio first then username,
 * since username change triggers a URL redirect).
 */
export function EditProfileForm({ currentUsername }: EditProfileFormProps) {
  const { profile } = useAuth();
  const savedBio = profile?.bio ?? "";

  const [usernameDraft, setUsernameDraft] = useState(currentUsername);
  const [bioDraft, setBioDraft] = useState(savedBio);

  // Sync local state if the canonical profile changes (e.g. another tab
  // updated something).
  useEffect(() => {
    setBioDraft(savedBio);
  }, [savedBio]);

  const debouncedUsername = useDebounce(
    usernameDraft.trim().toLowerCase(),
    350,
  );
  const { data: usernameCheck } = useUsernameAvailability(
    debouncedUsername,
    currentUsername,
  );
  const status = usernameCheck?.status ?? "idle";
  const usernameMessage = usernameCheck?.message ?? "";

  const changeUsernameMut = useChangeUsername();
  const saveBioMut = useSaveBio();
  const navigate = useNavigate();

  const usernameNormalized = usernameDraft.trim().toLowerCase();
  const usernameChanged =
    usernameNormalized !== currentUsername.toLowerCase();
  const usernameValid =
    !usernameChanged || (status === "available" && usernameNormalized.length > 0);

  const bioChanged = bioDraft.trim() !== savedBio.trim();

  const hasChanges = (usernameChanged && status === "available") || bioChanged;
  const pending = changeUsernameMut.isPending || saveBioMut.isPending;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasChanges || pending) return;

    // Save bio first if changed (cheap, no redirect)
    if (bioChanged) {
      await saveBioMut.mutateAsync(bioDraft);
    }

    // Then username (will redirect to new URL on success)
    if (usernameChanged && status === "available") {
      changeUsernameMut.mutate(usernameNormalized, {
        onSuccess: (saved) => {
          navigate(`/u/${saved}`, { replace: true });
        },
      });
    }
  };

  const dotClass = cn(
    "w-2 h-2 rounded-full transition shrink-0",
    status === "available" && "bg-green-400",
    status === "taken" && "bg-red",
    status === "invalid" && "bg-red/60",
    status === "current" && "bg-muted",
    (status === "idle" || status === "checking") && "bg-muted/50 animate-pulse",
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Username */}
        <div>
          <label className="text-[11px] uppercase tracking-widest text-muted mb-2 block">
            Username
          </label>
          <div className="flex items-center gap-2">
            <span className="text-muted text-sm font-mono select-none">@</span>
            <input
              type="text"
              value={usernameDraft}
              onChange={(e) => setUsernameDraft(e.target.value)}
              maxLength={20}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 bg-bg border border-white/10 rounded-xl p-3 text-sm font-mono lowercase focus:border-indigo focus:outline-none disabled:opacity-50"
              placeholder="tu_username"
            />
          </div>
          {/* Status row — only render when there's something to say. The
              "current" status (= the user's own username, no change pending)
              has no message and no useful dot, so don't take vertical space
              for nothing. */}
          {usernameMessage && (
            <div className="flex items-center gap-2 text-xs mt-2">
              <span className={dotClass} />
              <span
                className={cn(
                  "text-muted",
                  status === "available" && "text-green-400",
                  status === "taken" && "text-red",
                  status === "invalid" && "text-red/80",
                )}
              >
                {usernameMessage}
              </span>
            </div>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="text-[11px] uppercase tracking-widest text-muted mb-2 block">
            Bio
          </label>
          <Textarea
            value={bioDraft}
            onChange={(e) => setBioDraft(e.target.value)}
            maxLength={140}
            rows={2}
            placeholder="Cuenta algo de ti (máx 140)"
            showCounter
          />
        </div>
      </div>

      {/* Single save button — disabled until there's at least one valid change */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="md"
          disabled={!hasChanges || !usernameValid || pending}
        >
          {pending ? "..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
