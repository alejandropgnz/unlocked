import { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useAdjudicate } from "@/hooks/useAdjudicate";
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

  const handleDragEnd = (
    _e: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    const dx = info.offset.x;
    if (dx > SWIPE_THRESHOLD) onSwipe("right");
    else if (dx < -SWIPE_THRESHOLD) onSwipe("left");
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      whileTap={{ cursor: "grabbing" }}
      className="absolute inset-0 bg-surface border border-white/10 rounded-3xl p-8 flex flex-col select-none cursor-grab active:cursor-grabbing"
    >
      <div
        className="flex justify-end items-center text-[10px] font-bold tracking-[2.5px]"
        style={{ color: tierColor }}
      >
        <span className="font-mono">{item.rarityPercent.toFixed(2)}%</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-8xl">{item.emoji}</div>
        <div className="mt-6 text-2xl md:text-3xl font-black tracking-tighter">
          {item.title}
        </div>
        <div className="mt-3 text-xs text-muted font-mono uppercase tracking-widest">
          {item.category} · {item.unlockCount.toLocaleString("es-ES")} desbloqueados
        </div>
      </div>
      <div className="flex justify-between text-xs text-muted">
        <span>← Pasar</span>
        <span>Adjudicar →</span>
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

export function SwipeDeck({ items: initial }: { items: SwipeItem[] }) {
  const adjudicateMut = useAdjudicate();
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
    }
  };

  if (stack.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-2xl font-black tracking-tighter">Has visto todo</h2>
        <p className="text-muted mt-2 text-sm">
          {stats.kept} adjudicados · {stats.passed} pasados
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
    <div className="relative w-full max-w-sm mx-auto h-[520px]">
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
