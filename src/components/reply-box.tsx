"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { postReply } from "@/app/h/[id]/actions";

export function ReplyBox({
  storyId,
  isLoggedIn,
}: {
  storyId: string;
  isLoggedIn: boolean;
}) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <Link
        href={`/login?next=${encodeURIComponent(`/h/${storyId}`)}`}
        className="text-sm underline hover:text-gold"
      >
        Inicia sesión para responder
      </Link>
    );
  }

  const handleSubmit = () => {
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.append("storyId", storyId);
      fd.append("body", body);
      const r = await postReply(fd);
      if (!r.ok) {
        setError(r.error);
      } else {
        setBody("");
      }
    });
  };

  return (
    <div className="mt-4">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={500}
        rows={3}
        placeholder="Tu respuesta..."
        className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none resize-none"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-muted font-mono">{body.length}/500</span>
        <button
          onClick={handleSubmit}
          disabled={isPending || body.trim().length === 0}
          className="px-5 py-2 bg-white text-bg font-black rounded-full text-xs uppercase tracking-widest disabled:opacity-50 hover:bg-gold transition"
        >
          {isPending ? "..." : "Responder"}
        </button>
      </div>
      {error && <p className="text-red text-sm mt-2">{error}</p>}
    </div>
  );
}
