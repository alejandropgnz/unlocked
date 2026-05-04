import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { AchievementSummary, AchievementWithRarity } from "./types";

const PAGE_SIZE = 24;

interface PageResult {
  items: AchievementWithRarity[];
  nextPage: number | null;
}

/**
 * Paginated home grid. Returns achievements approved, sorted by popularity
 * (unlock_count desc) with `id` as stable tiebreaker. Each page = 24 items.
 *
 * Use with `useIntersectionObserver` at the bottom of the grid to trigger
 * `fetchNextPage()` as the user scrolls.
 */
export function useInfiniteAchievements() {
  return useInfiniteQuery({
    queryKey: ["achievements", "home", "infinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }): Promise<PageResult> => {
      const from = (pageParam as number) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data: rows, error } = await supabase
        .from("achievements")
        .select("id, slug, title, emoji, category, unlock_count")
        .eq("status", "approved")
        .order("unlock_count", { ascending: false })
        .order("id", { ascending: false }) // stable tiebreaker so pages don't reshuffle
        .range(from, to);
      if (error) throw error;

      const ids = (rows ?? []).map((r) => r.id);
      const rarityById = new Map<string, number>();
      if (ids.length > 0) {
        const { data: rarityRows } = await supabase
          .from("achievement_rarity")
          .select("id, rarity_percent")
          .in("id", ids);
        for (const r of rarityRows ?? []) {
          if (r.id != null) rarityById.set(r.id, Number(r.rarity_percent ?? 0));
        }
      }

      const items: AchievementWithRarity[] = (rows ?? []).map((r) => ({
        ...(r as AchievementSummary),
        rarityPercent: rarityById.get(r.id) ?? 0,
      }));

      // If we got fewer than PAGE_SIZE rows, this was the last page.
      const nextPage =
        items.length === PAGE_SIZE ? (pageParam as number) + 1 : null;

      return { items, nextPage };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
}
