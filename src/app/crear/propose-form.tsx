"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CategoryPicker } from "@/components/category-picker";
import { proposeAchievement } from "./actions";

export function ProposeForm() {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (done) {
    return (
      <div className="mt-6 p-6 bg-surface rounded-2xl border border-gold/30">
        <div className="text-2xl font-black tracking-tighter">📨 En revisión</div>
        <p className="text-muted mt-2 text-sm">
          Si pasa la moderación, te lo adjudicamos automáticamente.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href="/"
            className="px-4 py-2 border border-white/20 rounded-full text-sm hover:border-gold transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const r = await proposeAchievement(fd);
      if (!r.ok) {
        setError(r.error);
        return;
      }
      setDone(true);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label className="text-xs uppercase tracking-widest text-muted">
          Título
        </label>
        <input
          name="title"
          maxLength={80}
          required
          placeholder="Ej: Me dormí en una boda"
          className="mt-1 w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-widest text-muted">
          Emoji
        </label>
        <input
          name="emoji"
          maxLength={8}
          required
          placeholder="😴"
          className="mt-1 w-24 bg-bg border border-white/10 rounded-xl p-3 text-2xl text-center focus:border-gold focus:outline-none"
        />
        <p className="text-[10px] text-muted mt-1">Hasta 8 caracteres (emoji compuestos OK).</p>
      </div>
      <div>
        <label className="text-xs uppercase tracking-widest text-muted">
          Descripción (opcional)
        </label>
        <textarea
          name="description"
          maxLength={200}
          rows={3}
          placeholder="Una línea explicándolo..."
          className="mt-1 w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none resize-none"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-widest text-muted">
          Categoría
        </label>
        <div className="mt-1">
          <CategoryPicker name="category" />
        </div>
      </div>
      {error && <p className="text-red text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-white text-bg font-black rounded-full text-sm uppercase tracking-widest disabled:opacity-50 hover:bg-gold transition"
      >
        {isPending ? "..." : "Proponer"}
      </button>
    </form>
  );
}
