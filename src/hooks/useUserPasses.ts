import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/**
 * Fetch the set of achievement IDs this user has already swiped LEFT on.
 * Used by /descubrir to filter the deck so passed cards don't reappear after
 * a reload.
 */
export function useUserPasses(userId: string | undefined) {
  return useQuery({
    queryKey: ["passes", "by-user", userId],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from("passes")
        .select("achievement_id")
        .eq("user_id", userId!);
      if (error) throw error;
      return (data ?? []).map((r) => r.achievement_id as string);
    },
    enabled: !!userId,
  });
}
