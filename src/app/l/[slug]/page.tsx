import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  rarityTier,
  tierBorderClass,
  tierLabel,
  tierTextColor,
} from "@/lib/rarity";

export const revalidate = 60;

type AchievementRow = Pick<
  Database["public"]["Tables"]["achievements"]["Row"],
  "id" | "slug" | "title" | "emoji" | "description" | "category" | "unlock_count"
>;

type RarityRow = Pick<
  NonNullable<Database["public"]["Views"]["achievement_rarity"]["Row"]>,
  "id" | "rarity_percent"
>;

export default async function AchievementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: achievement, error: achievementError } = await supabase
    .from("achievements")
    .select("id, slug, title, emoji, description, category, unlock_count")
    .eq("slug", slug)
    .eq("status", "approved")
    .returns<AchievementRow[]>()
    .maybeSingle();

  if (achievementError) {
    console.error("achievement detail load error", achievementError);
    return (
      <main className="min-h-screen p-8 max-w-3xl mx-auto">
        <Link href="/" className="text-muted text-sm">← Volver</Link>
        <p className="mt-6 text-red">No se pudo cargar el logro.</p>
      </main>
    );
  }

  if (!achievement) notFound();

  const { data: rarityRow } = await supabase
    .from("achievement_rarity")
    .select("id, rarity_percent")
    .eq("id", achievement.id)
    .returns<RarityRow[]>()
    .maybeSingle();

  const rarityPercent = Number(rarityRow?.rarity_percent ?? 0);
  const tier = rarityTier(rarityPercent);
  const tierColor = tierTextColor(tier);

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto">
      <Link href="/" className="text-muted text-sm">← Volver</Link>

      <div className={`mt-6 rounded-[18px] p-[3px] ${tierBorderClass(tier)}`}>
        <div className="bg-surface rounded-[15px] p-8 md:p-12 text-center">
          <div
            className="flex justify-center items-center gap-4 text-[10px] font-bold tracking-[2.5px] mb-6"
            style={{ color: tierColor }}
          >
            <span>★ {tierLabel(tier)}</span>
            <span className="font-mono">{rarityPercent.toFixed(2)}%</span>
          </div>

          <div className="text-8xl md:text-9xl mb-6">{achievement.emoji}</div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
            {achievement.title}
          </h1>

          {achievement.description && (
            <p className="text-muted mt-4 text-sm md:text-base">
              {achievement.description}
            </p>
          )}

          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-muted uppercase tracking-wider">Categoría</div>
              <div className="font-bold mt-1 capitalize">{achievement.category}</div>
            </div>
            <div>
              <div className="text-muted uppercase tracking-wider">Desbloqueado</div>
              <div className="font-mono font-bold mt-1">
                {achievement.unlock_count.toLocaleString("es-ES")}
              </div>
            </div>
          </div>

          <button
            disabled
            className="mt-8 w-full md:w-auto md:px-12 py-4 bg-white text-bg font-black rounded-full text-sm tracking-widest uppercase opacity-50 cursor-not-allowed"
          >
            Adjudicar (próximamente)
          </button>
        </div>
      </div>
    </main>
  );
}
