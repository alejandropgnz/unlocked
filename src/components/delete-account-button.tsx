"use client";

import { useState, useTransition } from "react";
import { deleteAccount } from "@/app/yo/actions";

export function DeleteAccountButton() {
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="px-4 py-2 bg-red/20 text-red font-black rounded-full text-xs uppercase tracking-widest hover:bg-red/30 transition"
      >
        Borrar mi cuenta
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 bg-surface rounded-xl p-4 border border-red/30">
      <p className="text-sm">
        ¿Seguro? Se borrarán todos tus logros, historias y respuestas. No se puede deshacer.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:border-white/40 transition disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => {
            startTransition(async () => {
              await deleteAccount();
            });
          }}
          disabled={isPending}
          className="px-4 py-2 bg-red text-white font-black rounded-full text-xs uppercase tracking-widest hover:bg-red/80 transition disabled:opacity-50"
        >
          {isPending ? "..." : "Sí, borrar todo"}
        </button>
      </div>
    </div>
  );
}
