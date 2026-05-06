import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSaveBio } from "@/hooks/useYo";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";

export function BioForm() {
  const { profile } = useAuth();
  const savedBio = profile?.bio ?? "";
  const [bio, setBio] = useState(savedBio);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const saveMut = useSaveBio();

  useEffect(() => {
    setBio(savedBio);
  }, [savedBio]);

  useEffect(() => {
    if (savedAt === null) return;
    const id = setTimeout(() => setSavedAt(null), 2500);
    return () => clearTimeout(id);
  }, [savedAt]);

  const justSaved = savedAt !== null;
  const hasChanges = bio.trim() !== savedBio.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasChanges) return;
    saveMut.mutate(bio, { onSuccess: () => setSavedAt(Date.now()) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        maxLength={140}
        rows={2}
        placeholder="Cuenta algo de ti (máx 140)"
        showCounter
      />
      <div className="flex justify-end items-center gap-3 min-h-[40px]">
        {justSaved && <span className="text-indigo text-xs">✓ Guardado</span>}
        {/* Show button only when bio differs from saved value */}
        {hasChanges && (
          <Button type="submit" size="sm" disabled={saveMut.isPending}>
            {saveMut.isPending ? "..." : "Guardar"}
          </Button>
        )}
      </div>
    </form>
  );
}
