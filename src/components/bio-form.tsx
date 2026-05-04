"use client";

import { useState, useTransition } from "react";
import { saveBio } from "@/app/yo/actions";

export function BioForm({ initial }: { initial: string }) {
  const [bio, setBio] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData();
    fd.append("bio", bio);
    startTransition(async () => {
      const r = await saveBio(fd);
      if (!r.ok) setError(r.error);
      else setSavedAt(Date.now());
    });
  };

  const justSaved = savedAt !== null && Date.now() - savedAt < 2500;

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        maxLength={140}
        rows={2}
        placeholder="Cuenta algo de ti (máx 140)"
        className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none resize-none"
      />
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted font-mono">{bio.length}/140</span>
        <div className="flex items-center gap-3">
          {justSaved && <span className="text-gold text-xs">✓ Guardado</span>}
          {error && <span className="text-red text-xs">{error}</span>}
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-white text-bg font-black rounded-full text-xs uppercase tracking-widest hover:bg-gold transition disabled:opacity-50"
          >
            {isPending ? "..." : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
}
