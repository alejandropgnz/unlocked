import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ProfilePublic } from "./types";

export function useUserProfile(username: string | undefined) {
  return useQuery({
    queryKey: ["profile", "by-username", username],
    queryFn: async (): Promise<ProfilePublic | null> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url, bio, top5")
        .eq("username", username!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!username,
  });
}
