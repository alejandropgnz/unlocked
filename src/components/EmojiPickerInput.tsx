import { useEffect, useRef, useState } from "react";
import EmojiPicker, {
  EmojiStyle,
  Theme,
  type EmojiClickData,
} from "emoji-picker-react";
import { X } from "lucide-react";
import { emojiCount } from "@/lib/validators";

/**
 * Controlled emoji picker input. Replaces the raw text field for the
 * "1 to 3 emojis" requirement on /crear — clicks build the buffer up to
 * MAX_EMOJIS, then auto-close. There's no reliable way to force an
 * emoji-only system keyboard on mobile, so a custom picker is the
 * sensible alternative.
 */
const MAX_EMOJIS = 3;

interface Props {
  value: string;
  onChange: (next: string) => void;
}

export function EmojiPickerInput({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = emojiCount(value);
  const atMax = count >= MAX_EMOJIS;

  // Click outside closes the popover.
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handlePick = (data: EmojiClickData) => {
    const next = value + data.emoji;
    onChange(next);
    if (emojiCount(next) >= MAX_EMOJIS) setOpen(false);
  };

  const handleClear = () => {
    onChange("");
  };

  const handleRemoveLast = () => {
    // Strip the last grapheme — Intl.Segmenter handles compound emojis
    // (👨‍👩‍👧, 🇪🇸) as single units.
    if (value.length === 0) return;
    const segs = Array.from(
      new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(value),
    );
    if (segs.length === 0) return;
    onChange(segs.slice(0, -1).map((s) => s.segment).join(""));
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full bg-bg border border-white/10 rounded-xl p-4 text-3xl min-h-[68px] flex items-center justify-center hover:border-white/30 focus:border-indigo focus:outline-none transition"
        aria-label="Seleccionar emojis"
      >
        {value || (
          <span className="text-muted text-sm font-normal tracking-wide">
            Toca para elegir emojis
          </span>
        )}
      </button>

      {/* Action row: only when something is selected */}
      {value && (
        <div className="absolute right-2 top-2 flex gap-1">
          <button
            type="button"
            onClick={handleRemoveLast}
            className="text-muted hover:text-white text-xs px-2 py-1 rounded-md"
            aria-label="Quitar último"
          >
            ⌫
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="text-muted hover:text-white p-1 rounded-md"
            aria-label="Limpiar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl overflow-hidden shadow-lg border border-white/10 bg-bg">
          <EmojiPicker
            onEmojiClick={handlePick}
            theme={Theme.DARK}
            emojiStyle={EmojiStyle.NATIVE}
            width="100%"
            height={360}
            searchPlaceHolder="Buscar emoji…"
            lazyLoadEmojis
            previewConfig={{ showPreview: false }}
            skinTonesDisabled
          />
          {atMax && (
            <div className="bg-surface text-muted text-xs px-3 py-2 text-center border-t border-white/10">
              Máximo 3 emojis. Quita alguno con ⌫ para añadir más.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
