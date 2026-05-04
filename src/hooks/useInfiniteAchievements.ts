import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { AchievementSummary, AchievementWithRarity } from "./types";
import type { Database } from "@/types/database";

const PAGE_SIZE = 24;

type Category = Database["public"]["Enums"]["achievement_category"];

interface PageResult {
  items: AchievementWithRarity[];
  nextPage: number | null;
}

interface InfiniteAchievementsFilters {
  /** Title search — case-insensitive substring match. Empty = no filter. */
  query?: string;
  /** Category enum value. Undefined or null = all categories. */
  category?: Category | null;
}

/**
 * Paginated home grid. Returns achievements approved, sorted by popularity
 * (unlock_count desc) with `id` as stable tiebreaker. Each page = 24 items.
 *
 * Optional filters narrow the result set server-side. The query key includes
 * the filters so changing them naturally restarts pagination from page 0.
 *
 * Use with `useIntersectionObserver` at the bottom of the grid to trigger
 * `fetchNextPage()` as the user scrolls.
 */
export function useInfiniteAchievements(
  filters: InfiniteAchievementsFilters = {},
) {
  const q = filters.query?.trim() ?? "";
  const cat = filters.category ?? null;

  return useInfiniteQuery({
    queryKey: ["achievements", "home", "infinite", { q, cat }],
    initialPageParam: 0,
    queryFn: async ({ pageParam }): Promise<PageResult> => {
      const from = (pageParam as number) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let builder = supabase
        .from("achievements")
        .select("id, slug, title, emoji, category, unlock_count")
        .eq("status", "approved");

      if (q.length > 0) {
        // ILIKE escape: % and _ are wildcards in SQL. Escape them so a literal
        // % in the user's query doesn't behave as a wildcard.
        const escaped = q.replace(/[%_]/g, "\\$&");
        builder = builder.ilike("title", `%${escaped}%`);
      }
      if (cat) {
        builder = builder.eq("category", cat);
      }

      const { data: rows, error } = await builder
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
