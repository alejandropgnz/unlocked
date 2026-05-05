import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { rarityTier, tierTextColor } from "@/lib/rarity";

/**
 * Minimal SwipeDeck variant for /proximamente. Same gestures + fly-off
 * animation as the real one, but no DB writes (visitors aren't logged in).
 * Renders an "end state" message once the stack is empty.
 *
 * Kept separate from the real SwipeDeck because the real one couples to
 * useAdjudicate / usePass, both of which require an authenticated user.
 */

export interface MiniCard {
  id: string;
  emoji: string;
  title: string;
  rarityPercent: number;
  category: string;
}

const SWIPE_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 600;
const EXIT_DISTANCE = 1200;

const PEEK_PRESETS = [
  { rotate: -3.5, x: -8, y: 8, scale: 0.95, opacity: 0.7 },
  { rotate: 5, x: 10, y: 16, scale: 0.91, opacity: 0.45 },
] as const;

export function LandingMiniSwipe({ cards }: { cards: MiniCard[] }) {
  const [stack, setStack] = useState<MiniCard[]>(cards);

  if (stack.length === 0) {
    return (
      <div className="text-center px-4">
        <div className="text-6xl mb-4">👆</div>
        <p className="text-white text-base font-bold">
          ¿Te ha sonado alguno?
        </p>
        <p className="text-muted text-sm mt-2 max-w-xs mx-auto">
          Apúntate arriba y te avisamos cuando salgan los 1.875 que tenemos preparados.
        </p>
      </div>
    );
  }

  const top = stack[0];
  const peek = stack.slice(1, 3);

  return (
    <div className="relative w-full max-w-sm mx-auto h-[440px] sm:h-[480px]">
      {peek
        .slice()
        .reverse()
        .map((item, idx) => (
          <PeekCard key={item.id} item={item} depth={peek.length - idx} />
        ))}
      <TopCard
        key={top.id}
        item={top}
        onSwipe={() => setStack((s) => s.slice(1))}
      />
    </div>
  );
}

function PeekCard({ item, depth }: { item: MiniCard; depth: number }) {
  const preset = PEEK_PRESETS[depth - 1] ?? PEEK_PRESETS[PEEK_PRESETS.length - 1];
  return (
    <motion.div
      style={{
        scale: preset.scale,
        x: preset.x,
        y: preset.y,
        rotate: preset.rotate,
        opacity: preset.opacity,
      }}
      className="absolute inset-0 bg-surface border border-white/10 rounded-3xl p-8"
    >
      <div className="flex flex-col items-center justify-center text-center pointer-events-none h-full">
        <div className="text-7xl">{item.emoji}</div>
      </div>
    </motion.div>
  );
}

function TopCard({
  item,
  onSwipe,
}: {
  item: MiniCard;
  onSwipe: (dir: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const tier = rarityTier(item.rarityPercent);
  const tierColor = tierTextColor(tier);
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);

  const handleDragEnd = (
    _e: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    if (exiting) return;
    const dx = info.offset.x;
    const vx = info.velocity.x;
    if (dx > SWIPE_THRESHOLD || vx > VELOCITY_THRESHOLD) setExiting("right");
    else if (dx < -SWIPE_THRESHOLD || vx < -VELOCITY_THRESHOLD) setExiting("left");
  };

  return (
    <motion.div
      drag={exiting ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={
        exiting
          ? {
              x: exiting === "right" ? EXIT_DISTANCE : -EXIT_DISTANCE,
              opacity: 0,
              rotate: exiting === "right" ? 25 : -25,
            }
          : undefined
      }
      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
      onAnimationComplete={() => {
        if (exiting) onSwipe(exiting);
      }}
      style={{ x, rotate }}
      whileTap={{ cursor: "grabbing" }}
      className="absolute inset-0 bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 select-none cursor-grab active:cursor-grabbing"
    >
      <div className="absolute top-6 sm:top-8 inset-x-6 sm:inset-x-8 text-center leading-tight">
        <div
          className="font-mono font-black tabular-nums text-2xl sm:text-3xl"
          style={{ color: tierColor }}
        >
          {item.rarityPercent.toFixed(2)}%
        </div>
        <div className="text-muted text-xs sm:text-sm mt-1">
          de las personas tienen este logro
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 inset-x-6 sm:inset-x-8 flex justify-between items-center font-black text-sm uppercase tracking-widest">
        <span className="text-red">← Pasar</span>
        <span className="text-gold">Soy yo →</span>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6 sm:px-8">
        <div className="text-7xl sm:text-8xl">{item.emoji}</div>
        <div className="mt-5 sm:mt-6 text-2xl sm:text-3xl font-black tracking-tighter">
          {item.title}
        </div>
        <div className="mt-3 text-[10px] text-muted font-mono uppercase tracking-widest">
          {item.category}
        </div>
      </div>
    </motion.div>
  );
}
