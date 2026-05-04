export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          bio: string | null;
          top5: string[] | null;
          is_admin: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name: string;
          avatar_url?: string | null;
          bio?: string | null;
          top5?: string[] | null;
          is_admin?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          top5?: string[] | null;
          is_admin?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      achievements: {
        Row: {
          id: string;
          slug: string;
          title: string;
          emoji: string;
          category: Database["public"]["Enums"]["achievement_category"];
          created_by: string | null;
          status: Database["public"]["Enums"]["achievement_status"];
          unlock_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          emoji: string;
          category: Database["public"]["Enums"]["achievement_category"];
          created_by?: string | null;
          status?: Database["public"]["Enums"]["achievement_status"];
          unlock_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          emoji?: string;
          category?: Database["public"]["Enums"]["achievement_category"];
          created_by?: string | null;
          status?: Database["public"]["Enums"]["achievement_status"];
          unlock_count?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      unlocks: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      stories: {
        Row: {
          id: string;
          unlock_id: string;
          user_id: string;
          achievement_id: string;
          body: string;
          score: number;
          is_hidden: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          unlock_id: string;
          user_id: string;
          achievement_id: string;
          body: string;
          score?: number;
          is_hidden?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          unlock_id?: string;
          user_id?: string;
          achievement_id?: string;
          body?: string;
          score?: number;
          is_hidden?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      replies: {
        Row: {
          id: string;
          story_id: string;
          user_id: string;
          body: string;
          score: number;
          is_hidden: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          story_id: string;
          user_id: string;
          body: string;
          score?: number;
          is_hidden?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          story_id?: string;
          user_id?: string;
          body?: string;
          score?: number;
          is_hidden?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      reactions: {
        Row: {
          user_id: string;
          target_type: Database["public"]["Enums"]["reaction_target_type"];
          target_id: string;
          value: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          target_type: Database["public"]["Enums"]["reaction_target_type"];
          target_id: string;
          value: number;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          target_type?: Database["public"]["Enums"]["reaction_target_type"];
          target_id?: string;
          value?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      reports: {
        Row: {
          id: string;
          target_type: Database["public"]["Enums"]["report_target_type"];
          target_id: string;
          reporter_id: string | null;
          reason: Database["public"]["Enums"]["report_reason"];
          notes: string | null;
          status: Database["public"]["Enums"]["report_status"];
          created_at: string;
        };
        Insert: {
          id?: string;
          target_type: Database["public"]["Enums"]["report_target_type"];
          target_id: string;
          reporter_id?: string | null;
          reason: Database["public"]["Enums"]["report_reason"];
          notes?: string | null;
          status?: Database["public"]["Enums"]["report_status"];
          created_at?: string;
        };
        Update: {
          id?: string;
          target_type?: Database["public"]["Enums"]["report_target_type"];
          target_id?: string;
          reporter_id?: string | null;
          reason?: Database["public"]["Enums"]["report_reason"];
          notes?: string | null;
          status?: Database["public"]["Enums"]["report_status"];
          created_at?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          properties: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          properties?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          properties?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      passes: {
        Row: {
          user_id: string;
          achievement_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          achievement_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          achievement_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      achievement_rarity: {
        Row: {
          id: string | null;
          slug: string | null;
          unlock_count: number | null;
          total_users: number | null;
          rarity_percent: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      find_similar_achievement: {
        Args: { query_title: string; min_similarity?: number };
        Returns: { id: string; slug: string; title: string; sim: number }[];
      };
    };
    Enums: {
      achievement_category:
        | "familia"
        | "verguenza"
        | "resaca"
        | "amor"
        | "trabajo"
        | "random"
        | "salud"
        | "viajes"
        | "amigos"
        | "relaciones";
      achievement_status: "pending" | "approved" | "rejected";
      report_target_type: "achievement" | "story" | "reply" | "profile";
      report_reason: "spam" | "ofensivo" | "datos_personales" | "otro";
      report_status: "open" | "resolved" | "dismissed";
      reaction_target_type: "story" | "reply";
    };
    CompositeTypes: Record<string, never>;
  };
};
