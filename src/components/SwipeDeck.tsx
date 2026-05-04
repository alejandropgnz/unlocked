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
      className="absolute inset-0 bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col select-none cursor-grab active:cursor-grabbing"
    >
      <div className="text-center shrink-0 leading-tight">
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
      <div className="flex-1 flex flex-col items-center justify-center text-center min-h-0">
        <div className="text-7xl sm:text-8xl">{item.emoji}</div>
        <div className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
          {item.title}
        </div>
        <div className="mt-3 text-[11px] text-muted font-mono uppercase tracking-widest">
          {item.category} · {item.unlockCount.toLocaleString("es-ES")} desbloqueados
        </div>
      </div>
      <div className="flex justify-between items-center font-black text-sm sm:text-base uppercase tracking-widest">
        <span className="text-red">← Pasar</span>
        <span className="text-gold">Desbloquear →</span>
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

function StaticCard({ item, depth }: { item: SwipeItem; depth: number }) {
  return (
    <motion.div
      style={{ scale: 1 - depth * 0.05, y: depth * 8 }}
      className="absolute inset-0 bg-surface border border-white/10 rounded-3xl p-8 opacity-60"
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center pointer-events-none h-full">
        <div className="text-7xl">{item.emoji}</div>
      </div>
    </motion.div>
  );
}

/**
 * Side peek shown on desktop (lg+) — flanks the active card with the
 * previously-swiped item on the left and the upcoming one on the right.
 * Heavy dark overlay + reduced opacity so it reads as "locked / inactive"
 * and never competes with the active card for attention.
 */
function SidePeekCard({ item, label }: { item: SwipeItem; label: string }) {
  return (
    <div className="relative h-full bg-surface border border-white/10 rounded-3xl p-4 flex flex-col select-none pointer-events-none overflow-hidden opacity-70">
      <div className="text-center text-[10px] uppercase tracking-widest text-muted shrink-0">
        {label}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center min-h-0">
        <div className="text-5xl">{item.emoji}</div>
        <div className="mt-3 text-sm font-black tracking-tighter leading-tight line-clamp-3">
          {item.title}
        </div>
      </div>
      {/* "Locked" overlay — sits above the content but lets the emoji + title
          show through dimly. */}
      <div className="absolute inset-0 rounded-3xl bg-black/55" />
    </div>
  );
}

export function SwipeDeck({ items: initial }: { items: SwipeItem[] }) {
  const adjudicateMut = useAdjudicate();
  const passMut = usePass();
  const [stack, setStack] = useState<SwipeItem[]>(initial);
  const [lastSwiped, setLastSwiped] = useState<SwipeItem | null>(null);
  const [stats, setStats] = useState({ kept: 0, passed: 0 });

  const handleSwipe = (dir: "left" | "right") => {
    const top = stack[0];
    if (!top) return;
    setLastSwiped(top); // remember it for the desktop "Anterior" preview
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
  const peek = stack.slice(1, 3);

  return (
    <div className="relative w-full h-full flex items-stretch justify-center gap-4">
      {/* Left peek — desktop only (lg+). Shows the previously-swiped card,
          dimmed/locked, so the user has spatial context of "what just was". */}
      <div className="hidden lg:block w-32 xl:w-40 h-full flex-shrink-0">
        {lastSwiped && <SidePeekCard item={lastSwiped} label="Anterior" />}
      </div>

      {/* Center deck — the active card stack. */}
      <div className="relative w-full max-w-sm h-full flex-shrink-0">
        {/* Decorative stacked-behind cards. Hidden at lg+ because the side
            peek to the right already shows what's coming, so the layered
            stack would be visually redundant on desktop. */}
        <div className="lg:hidden">
          {peek
            .slice()
            .reverse()
            .map((item, idx) => (
              <StaticCard key={item.id} item={item} depth={peek.length - idx} />
            ))}
        </div>
        <TopCard key={top.id} item={top} onSwipe={handleSwipe} />
      </div>

      {/* Right peek — desktop only. Shows the next card up, dimmed/locked. */}
      <div className="hidden lg:block w-32 xl:w-40 h-full flex-shrink-0">
        {peek[0] && <SidePeekCard item={peek[0]} label="Siguiente" />}
      </div>
    </div>
  );
}
