import { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useAdjudicate } from "@/hooks/useAdjudicate";
import { usePass } from "@/hooks/usePass";
import { trackEvent } from "@/hooks/useTrack";
import { rarityTier, tierTextColor } from "@/lib/rarity";

export interface SwipeItem {
  id: string;
  slug: string;
  emoji: string;
  title: string;
  rarityPercent: number;
  unlockCount: number;
  category: string;
}

const SWIPE_THRESHOLD = 100;
// Flick velocity (px/sec) that counts as a swipe even if the drag didn't
// travel far. Matches the "fast flick" feel from Tinder/Hinge.
const VELOCITY_THRESHOLD = 600;
// How far the card flies off-screen during the exit animation. Has to clear
// the viewport on big monitors so it doesn't pop back into view mid-fade.
const EXIT_DISTANCE = 1200;

function TopCard({
  item,
  onSwipe,
}: {
  item: SwipeItem;
  onSwipe: (dir: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const acceptOpacity = useTransform(x, [50, 150], [0, 1]);
  const passOpacity = useTransform(x, [-150, -50], [1, 0]);
  const tier = rarityTier(item.rarityPercent);
  const tierColor = tierTextColor(tier);

  // null = idle/draggable. Once set, the card animates off-screen and the
  // parent is notified after the exit completes (so the next card slides in
  // only after the old one is fully gone — no instant pop).
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);

  const handleDragEnd = (
    _e: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    if (exiting) return;
    const dx = info.offset.x;
    const vx = info.velocity.x;
    // Either crossed the position threshold OR was a fast flick.
    if (dx > SWIPE_THRESHOLD || vx > VELOCITY_THRESHOLD) setExiting("right");
    else if (dx < -SWIPE_THRESHOLD || vx < -VELOCITY_THRESHOLD) setExiting("left");
    // else: dragConstraints + dragElastic snap it back to center.
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
      {/* Top row — rarity. Pinned to the top padding. */}
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

      {/* Bottom row — pasar / desbloquear hints. Pinned to bottom padding. */}
      <div className="absolute bottom-6 sm:bottom-8 inset-x-6 sm:inset-x-8 flex justify-between items-center font-black text-sm sm:text-base uppercase tracking-widest">
        <span className="text-red">← Pasar</span>
        <span className="text-gold">Desbloquear →</span>
      </div>

      {/* Middle cluster — emoji + title + meta. Absolutely centered on the
          ENTIRE card (not on the gap between top/bottom rows), so it sits
          on the geometric center regardless of how big the rarity block
          is vs the action hints. pointer-events-none so the drag still
          works on the card body. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6 sm:px-8">
        <div className="text-7xl sm:text-8xl">{item.emoji}</div>
        <div className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
          {item.title}
        </div>
        <div className="mt-3 text-[11px] text-muted font-mono uppercase tracking-widest">
          {item.category} · {item.unlockCount.toLocaleString("es-ES")} desbloqueados
        </div>
      </div>
      <motion.div
        style={{ opacity: acceptOpacity }}
        className="absolute top-8 right-8 px-4 py-2 border-4 border-gold text-gold font-black rounded-xl text-sm uppercase tracking-widest -rotate-6 pointer-events-none"
      >
        Mío
      </motion.div>
      <motion.div
        style={{ opacity: passOpacity }}
        className="absolute top-8 left-8 px-4 py-2 border-4 border-red text-red font-black rounded-xl text-sm uppercase tracking-widest rotate-6 pointer-events-none"
      >
        Paso
      </motion.div>
    </motion.div>
  );
}

// Per-depth presets so the stack underneath feels like a casually shuffled
// pile rather than a perfectly nested set. depth 1 is the card right behind
// the active one, depth 2 is one layer further back, etc. Stable values
// (not random per render) so cards don't twitch when other state updates.
const PEEK_PRESETS = [
  { rotate: -3.5, x: -8, y: 8, scale: 0.95, opacity: 0.7 },
  { rotate: 5, x: 10, y: 16, scale: 0.91, opacity: 0.45 },
  { rotate: -2.5, x: -4, y: 24, scale: 0.87, opacity: 0.25 },
] as const;

function StaticCard({ item, depth }: { item: SwipeItem; depth: number }) {
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
      <div className="flex-1 flex flex-col items-center justify-center text-center pointer-events-none h-full">
        <div className="text-7xl">{item.emoji}</div>
      </div>
    </motion.div>
  );
}

export function SwipeDeck({ items: initial }: { items: SwipeItem[] }) {
  const adjudicateMut = useAdjudicate();
  const passMut = usePass();
  const [stack, setStack] = useState<SwipeItem[]>(initial);
  const [stats, setStats] = useState({ kept: 0, passed: 0 });

  const handleSwipe = (dir: "left" | "right") => {
    const top = stack[0];
    if (!top) return;
    setStack((s) => s.slice(1));
    if (dir === "right") {
      setStats((s) => ({ ...s, kept: s.kept + 1 }));
      adjudicateMut.mutate({ achievementId: top.id });
      void trackEvent("achievement_unlocked", { achievementId: top.id, source: "swipe" });
    } else {
      setStats((s) => ({ ...s, passed: s.passed + 1 }));
      // Persist the pass so this card doesn't come back after reload.
      passMut.mutate(top.id);
    }
  };

  if (stack.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-2xl font-black tracking-tighter">Has visto todo</h2>
        <p className="text-muted mt-2 text-sm">
          {stats.kept} desbloqueados · {stats.passed} pasados
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-5 py-3 bg-white text-bg font-black rounded-full text-xs tracking-widest uppercase hover:bg-gold transition"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const top = stack[0];
  // 3 peek cards behind the active one — gives the casual "deck of cards"
  // look in conjunction with PEEK_PRESETS.
  const peek = stack.slice(1, 4);

  return (
    <div className="relative w-full max-w-sm mx-auto h-full">
      {peek
        .slice()
        .reverse()
        .map((item, idx) => (
          <StaticCard key={item.id} item={item} depth={peek.length - idx} />
        ))}
      <TopCard key={top.id} item={top} onSwipe={handleSwipe} />
    </div>
  );
}
