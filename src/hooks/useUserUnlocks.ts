import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { UnlockedItem } from "./types";

interface UnlockJoinRow {
  id: string;
  achievement_id: string;
  created_at: string;
  achievements: {
    id: string;
    slug: string;
    title: string;
    emoji: string;
    category: string;
    unlock_count: number;
  } | null;
}

export function useUserUnlocks(userId: string | undefined) {
  return useQuery({
    queryKey: ["unlocks", "by-user", userId],
    queryFn: async (): Promise<UnlockedItem[]> => {
      const { data: rows, error } = await supabase
        .from("unlocks")
        .select(
          "id, achievement_id, created_at, achievements!inner(id, slug, title, emoji, category, unlock_count)",
        )
        .eq("user_id", userId!)
        .order("created_at", { ascending: false });
      if (error) throw error;

      const items = (rows as unknown as UnlockJoinRow[] | null) ?? [];
      const ids = items.map((u) => u.achievement_id);

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

      return items
        .map((u): UnlockedItem | null => {
          if (!u.achievements) return null;
          return {
            unlockId: u.id,
            achievementId: u.achievement_id,
            slug: u.achievements.slug,
            title: u.achievements.title,
            emoji: u.achievements.emoji,
            category: u.achievements.category,
            unlockCount: u.achievements.unlock_count,
            rarityPercent: rarityById.get(u.achievement_id) ?? 0,
            createdAt: u.created_at,
          };
        })
        .filter((x): x is UnlockedItem => x !== null);
    },
    enabled: !!userId,
  });
}
