"use client";

import { useState, useTransition } from "react";

export function ReactionButtons({
  targetType,
  targetId,
  initialScore,
  initialValue,
  isLoggedIn,
}: {
  targetType: "story" | "reply";
  targetId: string;
  initialScore: number;
  initialValue: 1 | -1 | 0;
  isLoggedIn: boolean;
}) {
  const [score, setScore] = useState(initialScore);
  const [value, setValue] = useState<1 | -1 | 0>(initialValue);
  const [isPending, startTransition] = useTransition();

  const send = (newValue: 1 | -1 | 0) => {
    if (!isLoggedIn) {
      window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    const delta = newValue - value;
    setScore((s) => s + delta);
    setValue(newValue);
    startTransition(async () => {
      const res = await fetch("/api/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType, targetId, value: newValue }),
      });
      if (!res.ok) {
        // revert optimistic change
        setScore((s) => s - delta);
        setValue((v) => (v === newValue ? value : v));
      }
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => send(value === 1 ? 0 : 1)}
        disabled={isPending}
        aria-label="Upvote"
        className={`text-base font-mono leading-none px-1 hover:text-gold transition ${value === 1 ? "text-gold" : "text-muted"}`}
      >
        ▲
      </button>
      <span className="text-xs font-mono w-8 text-center">{score}</span>
      <button
        onClick={() => send(value === -1 ? 0 : -1)}
        disabled={isPending}
        aria-label="Downvote"
        className={`text-base font-mono leading-none px-1 hover:text-red transition ${value === -1 ? "text-red" : "text-muted"}`}
      >
        ▼
      </button>
    </div>
  );
}
