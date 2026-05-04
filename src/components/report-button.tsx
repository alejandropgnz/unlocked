"use client";

import { useState, useTransition } from "react";

type Reason = "spam" | "ofensivo" | "datos_personales" | "otro";

const REASON_LABELS: Record<Reason, string> = {
  spam: "Spam",
  ofensivo: "Ofensivo",
  datos_personales: "Datos personales",
  otro: "Otro",
};

export function ReportButton({
  targetType,
  targetId,
}: {
  targetType: "achievement" | "story" | "reply" | "profile";
  targetId: string;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<Reason>("ofensivo");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          targetId,
          reason,
          notes: notes.trim() || undefined,
        }),
      });
      if (res.status === 401) {
        window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
        return;
      }
      if (!res.ok) {
        setError("No se pudo enviar el report.");
        return;
      }
      setDone(true);
      setTimeout(() => {
        setOpen(false);
        // Defer reset slightly so the success message is seen.
        setTimeout(() => {
          setDone(false);
          setNotes("");
          setReason("ofensivo");
        }, 200);
      }, 1500);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-muted hover:text-red transition"
      >
        Reportar
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => !isPending && setOpen(false)}
        >
          <div
            className="bg-surface rounded-2xl p-5 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {done ? (
              <p className="text-sm">Gracias por reportar. Lo revisaremos.</p>
            ) : (
              <>
                <h3 className="font-black mb-3">Reportar</h3>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as Reason)}
                  className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none"
                >
                  {(Object.keys(REASON_LABELS) as Reason[]).map((r) => (
                    <option key={r} value={r}>{REASON_LABELS[r]}</option>
                  ))}
                </select>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="(opcional) Detalles"
                  maxLength={500}
                  rows={2}
                  className="mt-2 w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none resize-none"
                />
                <div className="text-right text-xs text-muted font-mono mt-1">
                  {notes.length}/500
                </div>
                {error && <p className="text-red text-sm mt-2">{error}</p>}
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={isPending}
                    className="flex-1 py-3 border border-white/20 rounded-full text-sm hover:border-white/40 transition disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={submit}
                    disabled={isPending}
                    className="flex-1 py-3 bg-red text-white font-black rounded-full text-xs uppercase tracking-widest hover:bg-red/80 transition disabled:opacity-50"
                  >
                    {isPending ? "..." : "Enviar"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
