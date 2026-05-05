import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { AchievementSummary, AchievementWithRarity } from "./types";

/**
 * Fetch ALL approved achievements. Used by /descubrir to build the swipe
 * deck (after filtering out the user's unlocks + passes).
 *
 * Previously this had `.limit(50)` which caused a "Has visto todo" empty
 * state once the user had interacted with all 50 most-unlocked achievements,
 * even though hundreds more existed in the catalog. Removed.
 *
 * Performance: rarity_percent is computed client-side from unlock_count and
 * the cached total profiles count, mirroring useInfiniteAchievements. This
 * avoids a second query against achievement_rarity for every fetch.
 */
export function useAchievements() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["achievements", "all"],
    queryFn: async (): Promise<AchievementWithRarity[]> => {
      const { data: rows, error } = await supabase
        .from("achievements")
        .select("id, slug, title, emoji, category, unlock_count")
        .eq("status", "approved");
      if (error) throw error;

      const cached = queryClient.getQueryData<number>([
        "profiles",
        "total-count",
      ]);
      const totalUsers: number =
        cached ??
        (await queryClient.fetchQuery<number>({
          queryKey: ["profiles", "total-count"],
          queryFn: async () => {
            const { count } = await supabase
              .from("profiles")
              .select("*", { count: "exact", head: true });
            return count ?? 0;
          },
          staleTime: 60_000,
        }));

      return (rows ?? []).map((r) => {
        const summary = r as AchievementSummary;
        const pct =
          totalUsers > 0
            ? Math.round((summary.unlock_count / totalUsers) * 100 * 10000) /
              10000
            : 0;
        return { ...summary, rarityPercent: pct };
      });
    },
  });
}
