import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { AchievementSummary, AchievementWithRarity } from "./types";

export function useAchievements() {
  return useQuery({
    queryKey: ["achievements", "home"],
    queryFn: async (): Promise<AchievementWithRarity[]> => {
      const { data: rows, error } = await supabase
        .from("achievements")
        .select("id, slug, title, emoji, category, unlock_count")
        .eq("status", "approved")
        .order("unlock_count", { ascending: false })
        .limit(50);
      if (error) throw error;

      const ids = (rows ?? []).map((r) => r.id);
      let rarityById = new Map<string, number>();
      if (ids.length > 0) {
        const { data: rarityRows } = await supabase
          .from("achievement_rarity")
          .select("id, rarity_percent")
          .in("id", ids);
        for (const r of rarityRows ?? []) {
          if (r.id != null) rarityById.set(r.id, Number(r.rarity_percent ?? 0));
        }
      }

      return (rows ?? []).map((r) => ({
        ...(r as AchievementSummary),
        rarityPercent: rarityById.get(r.id) ?? 0,
      }));
    },
  });
}
