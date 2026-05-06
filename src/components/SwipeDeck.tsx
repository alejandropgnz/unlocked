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
import { Emoji } from "./Emoji";
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

// Per-depth presets for the stack underneath the active card. depth 1 sits
// right behind the top, depth 2 one further, etc. Stable values (not random
// per render) so cards don't twitch when other state updates.
const PEEK_PRESETS = [
  { rotate: -3.5, x: -8, y: 8, scale: 0.95, opacity: 0.7 },
  { rotate: 5, x: 10, y: 16, scale: 0.91, opacity: 0.45 },
  { rotate: -2.5, x: -4, y: 24, scale: 0.87, opacity: 0.25 },
] as const;

const ANIM_TRANSITION = { duration: 0.32, ease: [0.22, 0.61, 0.36, 1] as const };

/**
 * Single card component for both the top (active, draggable) and the
 * stacked peek cards underneath. Crucially this renders the FULL content
 * (rarity %, emoji, title, meta) at every depth — at depth>0 it's just
 * scaled down and dimmed, but the content is already there. So when a
 * swipe completes and a peek card gets promoted to top, no content
 * "pops in" — only the scale/opacity/position smoothly animate.
 *
 * Stable React key (item.id) on the parent map ensures the same component
 * instance survives a depth change, which lets framer-motion's `animate`
 * prop drive a tween between the old and new depth presets instead of
 * remounting at the new position instantly.
 */
function Card({
  item,
  depth,
  onSwipe,
}: {
  item: SwipeItem;
  depth: number;
  onSwipe?: (dir: "left" | "right") => void;
}) {
  const isTop = depth === 0 && !!onSwipe;

  // Drag motion values — only meaningful when isTop, but we always create
  // them so React's hook order stays stable as the card transitions
  // between depths.
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const acceptOpacity = useTransform(x, [50, 150], [0, 1]);
  const passOpacity = useTransform(x, [-150, -50], [1, 0]);

  const [exiting, setExiting] = useState<"left" | "right" | null>(null);

  const tier = rarityTier(item.rarityPercent);
  const tierColor = tierTextColor(tier);

  // Build the target animation. Three states:
  //   1. Exiting: fly to off-screen + rotate dramatically
  //   2. Top + idle: full size, identity transform (drag controls runtime
  //      x via the motion value applied through `style`)
  //   3. Peek: depth preset (smaller, dimmer, offset)
  const targetAnimate = exiting
    ? {
        x: exiting === "right" ? EXIT_DISTANCE : -EXIT_DISTANCE,
        opacity: 0,
        rotate: exiting === "right" ? 25 : -25,
      }
    : isTop
      ? { scale: 1, x: 0, y: 0, rotate: 0, opacity: 1 }
      : (() => {
          const preset =
            PEEK_PRESETS[depth - 1] ?? PEEK_PRESETS[PEEK_PRESETS.length - 1];
          return {
            scale: preset.scale,
            x: preset.x,
            y: preset.y,
            rotate: preset.rotate,
            opacity: preset.opacity,
          };
        })();

  const handleDragEnd = (
    _e: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    if (exiting || !isTop) return;
    const dx = info.offset.x;
    const vx = info.velocity.x;
    if (dx > SWIPE_THRESHOLD || vx > VELOCITY_THRESHOLD) setExiting("right");
    else if (dx < -SWIPE_THRESHOLD || vx < -VELOCITY_THRESHOLD)
      setExiting("left");
  };

  return (
    <motion.div
      drag={isTop && !exiting ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={targetAnimate}
      // Style overrides animate for the matching properties — used only
      // on the top card while idle so the live drag motion value drives
      // x and rotate (otherwise we'd fight the animate target).
      style={isTop && !exiting ? { x, rotate } : undefined}
      transition={ANIM_TRANSITION}
      whileTap={isTop ? { cursor: "grabbing" } : undefined}
      onAnimationComplete={() => {
        if (exiting && isTop && onSwipe) onSwipe(exiting);
      }}
      className={
        "absolute inset-0 bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 select-none " +
        (isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none")
      }
    >
      {/* Top row — rarity. Always rendered so peek→top transition has no
          content pop. */}
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

      {/* Bottom row — pasar / desbloquear. Only rendered on the top card
          since peek cards aren't interactive. */}
      {isTop && (
        <div className="absolute bottom-6 sm:bottom-8 inset-x-6 sm:inset-x-8 flex justify-between items-center font-black text-sm sm:text-base uppercase tracking-widest z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!exiting) setExiting("left");
            }}
            disabled={!!exiting}
            className="text-red hover:text-white transition disabled:opacity-50 cursor-pointer"
          >
            ← Pasar
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!exiting) setExiting("right");
            }}
            disabled={!!exiting}
            className="text-indigo hover:text-white transition disabled:opacity-50 cursor-pointer"
          >
            Desbloquear →
          </button>
        </div>
      )}

      {/* Middle cluster — emoji + title + meta. Centered on the entire
          card so it sits on the geometric center regardless of how big
          the rarity row is vs the actions row. pointer-events-none so
          drag still works on the card body. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6 sm:px-8">
        <Emoji className="text-7xl sm:text-8xl">{item.emoji}</Emoji>
        <div className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
          {item.title}
        </div>
        <div className="mt-3 text-[11px] text-muted font-mono uppercase tracking-widest">
          {item.category} · {item.unlockCount.toLocaleString("es-ES")} desbloqueados
        </div>
      </div>

      {/* Drag overlays — appear when the user has dragged past the
          midway threshold but hasn't released yet. Only on top. */}
      {isTop && (
        <>
          <motion.div
            style={{ opacity: acceptOpacity }}
            className="absolute top-8 right-8 px-4 py-2 border-4 border-indigo text-indigo font-black rounded-xl text-sm uppercase tracking-widest -rotate-6 pointer-events-none"
          >
            Mío
          </motion.div>
          <motion.div
            style={{ opacity: passOpacity }}
            className="absolute top-8 left-8 px-4 py-2 border-4 border-red text-red font-black rounded-xl text-sm uppercase tracking-widest rotate-6 pointer-events-none"
          >
            Paso
          </motion.div>
        </>
      )}
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
      void trackEvent("achievement_unlocked", {
        achievementId: top.id,
        source: "swipe",
      });
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
          className="mt-6 inline-block px-5 py-3 bg-white text-bg font-black rounded-full text-xs tracking-widest uppercase hover:bg-indigo transition"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Render the top 4 cards. Reverse-iterate so the deepest card paints
  // first (DOM bottom = visual back) and the active top card paints last
  // (DOM top = visual front).
  const visible = stack.slice(0, 4);

  return (
    <div className="relative w-full max-w-sm mx-auto h-full">
      {visible
        .slice()
        .reverse()
        .map((item, idxFromBottom) => {
          const depth = visible.length - 1 - idxFromBottom;
          return (
            <Card
              key={item.id}
              item={item}
              depth={depth}
              onSwipe={depth === 0 ? handleSwipe : undefined}
            />
          );
        })}
    </div>
  );
}
