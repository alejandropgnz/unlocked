import type { AchievementCategory } from "@/hooks/types";

const CATEGORIES: { value: AchievementCategory; label: string; emoji: string }[] = [
  { value: "familia", label: "Familia", emoji: "👨‍👩‍👧" },
  { value: "verguenza", label: "Vergüenza", emoji: "😬" },
  { value: "resaca", label: "Resaca", emoji: "🍻" },
  { value: "amor", label: "Amor", emoji: "💔" },
  { value: "trabajo", label: "Trabajo", emoji: "💼" },
  { value: "random", label: "Random", emoji: "🎲" },
  { value: "salud", label: "Salud", emoji: "🤕" },
  { value: "viajes", label: "Viajes", emoji: "✈️" },
];

export function CategoryPicker({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue ?? ""}
      required
      className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none"
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
