import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useReact } from "@/hooks/useReact";
import { cn } from "@/lib/cn";
import type { ReactionTargetType } from "@/hooks/types";

export function ReactionButtons({
  targetType,
  targetId,
  initialScore,
  initialValue,
}: {
  targetType: ReactionTargetType;
  targetId: string;
  initialScore: number;
  initialValue: 1 | -1 | 0;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const reactMut = useReact();

  const [score, setScore] = useState(initialScore);
  const [value, setValue] = useState<1 | -1 | 0>(initialValue);

  const handleClick = (newValue: 1 | -1 | 0) => {
    if (!user) {
      const next = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?next=${next}`);
      return;
    }
    const prevScore = score;
    const prevValue = value;
    const delta = newValue - prevValue;
    setScore(prevScore + delta);
    setValue(newValue);

    reactMut.mutate(
      { targetType, targetId, value: newValue },
      {
        onError: () => {
          setScore(prevScore);
          setValue(prevValue);
        },
      },
    );
  };

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => handleClick(value === 1 ? 0 : 1)}
        aria-label="Upvote"
        className={cn(
          "text-base font-mono leading-none px-1 transition",
          value === 1 ? "text-gold" : "text-muted hover:text-gold",
        )}
      >
        ▲
      </button>
      <span className="text-xs font-mono w-8 text-center">{score}</span>
      <button
        type="button"
        onClick={() => handleClick(value === -1 ? 0 : -1)}
        aria-label="Downvote"
        className={cn(
          "text-base font-mono leading-none px-1 transition",
          value === -1 ? "text-red" : "text-muted hover:text-red",
        )}
      >
        ▼
      </button>
    </div>
  );
}
