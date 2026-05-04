"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import confetti from "canvas-confetti";
import { adjudicateAction } from "@/app/l/[slug]/actions";

interface Props {
  achievementId: string;
  slug: string;
  isLoggedIn: boolean;
  alreadyUnlocked: boolean;
}

export function AdjudicateModal({
  achievementId,
  slug,
  isLoggedIn,
  alreadyUnlocked,
}: Props) {
  const [open, setOpen] = useState(false);
  const [story, setStory] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    const nextUrl = encodeURIComponent(`/l/${slug}`);
    return (
      <Link
        href={`/login?next=${nextUrl}`}
        className="mt-8 w-full md:w-auto md:px-12 py-4 bg-white text-bg font-black rounded-full text-sm tracking-widest uppercase inline-block text-center hover:bg-gold transition"
      >
        Adjudicar
      </Link>
    );
  }

  if (alreadyUnlocked && !done) {
    return (
      <button
        disabled
        className="mt-8 w-full md:w-auto md:px-12 py-4 bg-gold/20 text-gold font-black rounded-full text-sm tracking-widest uppercase cursor-not-allowed"
      >
        ✓ Ya lo tienes
      </button>
    );
  }

  const handleSubmit = () => {
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.append("achievementId", achievementId);
      fd.append("slug", slug);
      fd.append("story", story);
      const result = await adjudicateAction(fd);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setDone(true);
      setOpen(false);
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch {
        // confetti is best-effort, ignore failures (server-side / older browsers)
      }
    });
  };

  if (done) {
    return (
      <div className="mt-8 p-6 bg-surface rounded-2xl border border-gold/30">
        <div className="text-2xl font-black tracking-tighter">¡Desbloqueado! 🎉</div>
        <p className="text-muted mt-2 text-sm">Ya forma parte de tu colección.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/u/me`}
            prefetch={false}
            onClick={(e) => {
              // Best-effort jump to the user's own profile via SiteHeader's @username link.
              // Falls back to home — the SiteHeader links to /u/[username] on next page load.
              e.preventDefault();
              window.location.href = "/";
            }}
            className="px-4 py-2 border border-white/20 rounded-full text-sm hover:border-gold transition"
          >
            Ver mi perfil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-8 w-full md:w-auto md:px-12 py-4 bg-white text-bg font-black rounded-full text-sm tracking-widest uppercase hover:bg-gold transition"
      >
        Adjudicar
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-end md:items-center justify-center p-4"
          onClick={() => !isPending && setOpen(false)}
        >
          <div
            className="bg-surface rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-black tracking-tighter">Adjudicar logro</h3>
            <p className="text-muted text-sm mt-2">
              ¿Quieres contar la historia? (opcional)
            </p>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              maxLength={1000}
              rows={5}
              placeholder="Cuenta cómo pasó..."
              className="mt-3 w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none resize-none"
            />
            <div className="text-right text-xs text-muted mt-1 font-mono">
              {story.length}/1000
            </div>
            {error && <div className="text-red text-sm mt-2">{error}</div>}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="flex-1 py-3 border border-white/20 rounded-full text-sm hover:border-white/40 transition disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="flex-1 py-3 bg-white text-bg font-black rounded-full text-sm uppercase tracking-widest hover:bg-gold transition disabled:opacity-50"
              >
                {isPending ? "..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
