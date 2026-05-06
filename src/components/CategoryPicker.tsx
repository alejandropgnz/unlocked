import type { AchievementCategory } from "@/hooks/types";

// Exported so the admin catalog filter and edit modal can reuse the same
// list (single source of truth for category labels + emojis across the app).
export const CATEGORIES: { value: AchievementCategory; label: string; emoji: string }[] = [
  { value: "familia", label: "Familia", emoji: "👨‍👩‍👧" },
  { value: "amigos", label: "Amigos", emoji: "👯" },
  { value: "amor", label: "Amor", emoji: "💔" },
  { value: "relaciones", label: "Relaciones", emoji: "💑" },
  { value: "trabajo", label: "Trabajo", emoji: "💼" },
  { value: "viajes", label: "Viajes", emoji: "✈️" },
  { value: "verguenza", label: "Vergüenza", emoji: "😬" },
  { value: "resaca", label: "Resaca", emoji: "🍻" },
  { value: "salud", label: "Salud", emoji: "🤕" },
  { value: "random", label: "Random", emoji: "🎲" },
];

export function CategoryPicker({
  id,
  name,
  defaultValue,
}: {
  id?: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <select
      id={id}
      name={name}
      defaultValue={defaultValue ?? ""}
      required
      className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-indigo focus:outline-none"
    >
      <option value="">Elige una categoría...</option>
      {CATEGORIES.map((c) => (
        <option key={c.value} value={c.value}>
          {c.emoji} {c.label}
        </option>
      ))}
    </select>
  );
}
