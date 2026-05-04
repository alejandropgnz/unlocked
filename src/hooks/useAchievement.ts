import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { AchievementDetail, AchievementWithRarity } from "./types";

export function useAchievement(slug: string | undefined) {
  return useQuery({
    queryKey: ["achievement", slug],
    queryFn: async (): Promise<(AchievementWithRarity & { description: string | null }) | null> => {
      const { data, error } = await supabase
        .from("achievements")
        .select("id, slug, title, emoji, description, category, unlock_count")
        .eq("slug", slug!)
        .eq("status", "approved")
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;

      const { data: rarity } = await supabase
        .from("achievement_rarity")
        .select("rarity_percent")
        .eq("id", data.id)
        .maybeSingle();

      return {
        ...(data as AchievementDetail),
        rarityPercent: Number(rarity?.rarity_percent ?? 0),
      };
    },
    enabled: !!slug,
  });
}
