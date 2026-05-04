import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { useAuth } from "@/contexts/AuthContext";

export interface PendingItem {
  id: string;
  title: string;
  emoji: string;
  category: string;
  proposerUsername: string | null;
}

export interface OpenReportItem {
  id: string;
  targetType: string;
  targetId: string;
  reason: string;
  notes: string | null;
  createdAt: string;
  reporterUsername: string | null;
}

interface PendingRow {
  id: string;
  title: string;
  emoji: string;
  category: string;
  profiles: { username: string } | null;
}

interface ReportRow {
  id: string;
  target_type: string;
  target_id: string;
  reason: string;
  notes: string | null;
  created_at: string;
  profiles: { username: string } | null;
}

export function useAdminPending() {
  const { profile } = useAuth();
  return useQuery({
    queryKey: ["admin", "pending"],
    queryFn: async (): Promise<PendingItem[]> => {
      const { data, error } = await supabase
        .from("achievements")
        .select(
          "id, title, emoji, category, profiles!achievements_created_by_fkey(username)",
        )
        .eq("status", "pending")
        .order("created_at", { ascending: true });
      if (error) throw error;
      const rows = (data as unknown as PendingRow[] | null) ?? [];
      return rows.map((p) => ({
        id: p.id,
        title: p.title,
        emoji: p.emoji,
        category: p.category,
        proposerUsername: p.profiles?.username ?? null,
      }));
    },
    enabled: !!profile?.is_admin,
  });
}

export function useAdminReports() {
  const { profile } = useAuth();
  return useQuery({
    queryKey: ["admin", "reports"],
    queryFn: async (): Promise<OpenReportItem[]> => {
      const { data, error } = await supabase
        .from("reports")
        .select(
          "id, target_type, target_id, reason, notes, created_at, profiles!reports_reporter_id_fkey(username)",
        )
        .eq("status", "open")
        .order("created_at", { ascending: true });
      if (error) throw error;
      const rows = (data as unknown as ReportRow[] | null) ?? [];
      return rows.map((r) => ({
        id: r.id,
        targetType: r.target_type,
        targetId: r.target_id,
        reason: r.reason,
        notes: r.notes,
        createdAt: r.created_at,
        reporterUsername: r.profiles?.username ?? null,
      }));
    },
    enabled: !!profile?.is_admin,
  });
}

export function useApproveAchievement() {
  const queryClient = useQueryClient();
  const { user, profile } = useAuth();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!user || !profile?.is_admin) throw new Error("No autorizado");

      // Look up proposer first (for auto-unlock incentive)
      const { data: ach } = await supabase
        .from("achievements")
        .select("created_by")
        .eq("id", id)
        .maybeSingle();

      const { error: updErr } = await supabase
        .from("achievements")
        .update({ status: "approved" })
        .eq("id", id);
      if (updErr) {
        logger.error("approve update", updErr);
        throw new Error("No se pudo aprobar");
      }

      if (ach?.created_by) {
        const { error: unlockErr } = await supabase
          .from("unlocks")
          .insert({ user_id: ach.created_by, achievement_id: id });
        if (unlockErr && unlockErr.code !== "23505") {
          logger.error("approve auto-unlock", unlockErr);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      toast.success("Logro aprobado");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useRejectAchievement() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!profile?.is_admin) throw new Error("No autorizado");
      const { error } = await supabase
        .from("achievements")
        .update({ status: "rejected" })
        .eq("id", id);
      if (error) {
        logger.error("reject update", error);
        throw new Error("No se pudo rechazar");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pending"] });
      toast.success("Rechazado");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useResolveReport() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!profile?.is_admin) throw new Error("No autorizado");
      const { error } = await supabase
        .from("reports")
        .update({ status: "resolved" })
        .eq("id", id);
      if (error) throw new Error("No se pudo resolver");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDismissReport() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!profile?.is_admin) throw new Error("No autorizado");
      const { error } = await supabase
        .from("reports")
        .update({ status: "dismissed" })
        .eq("id", id);
      if (error) throw new Error("No se pudo descartar");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
