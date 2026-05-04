import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSaveBio } from "@/hooks/useYo";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";

export function BioForm() {
  const { profile } = useAuth();
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const saveMut = useSaveBio();

  useEffect(() => {
    setBio(profile?.bio ?? "");
  }, [profile?.bio]);

  useEffect(() => {
    if (savedAt === null) return;
    const id = setTimeout(() => setSavedAt(null), 2500);
    return () => clearTimeout(id);
  }, [savedAt]);

  const justSaved = savedAt !== null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <div className="flex justify-end items-center gap-3">
        {justSaved && <span className="text-gold text-xs">✓ Guardado</span>}
        <Button type="submit" disabled={saveMut.isPending}>
          {saveMut.isPending ? "..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
