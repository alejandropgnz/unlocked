import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import type { Database } from "@/types/database";

type Profile = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "id" | "username" | "display_name" | "avatar_url" | "bio" | "top5" | "is_admin"
>;

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  profileLoading: boolean;
  signInWithGoogle: (next?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth provider — mirrors Wisheem's pattern:
 * - `loading` becomes false IMMEDIATELY after the initial getSession resolves.
 *   It's NOT blocked by the profile fetch.
 * - `profileLoading` is independent and managed by a separate effect that
 *   reacts to `user.id` changes. If the profile fetch hangs or fails, the
 *   rest of the app keeps working.
 *
 * This prevents the "stuck loading forever" bug we saw when profile fetch
 * stalled (HMR, network blips, etc.) — auth state always settles fast.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Auth state — never blocks on profile.
  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    }).catch((e) => {
      logger.error("getSession failed", e);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Profile fetch — independent effect that reacts to user.id changes.
  useEffect(() => {
    let cancelled = false;

    const fetchAndSet = async () => {
      if (!user) {
        setProfile(null);
        setProfileLoading(false);
        return;
      }
      setProfileLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, username, display_name, avatar_url, bio, top5, is_admin")
          .eq("id", user.id)
          .maybeSingle();
        if (cancelled) return;
        if (error) {
          logger.error("auth: profile load failed", error);
          setProfile(null);
        } else {
          setProfile(data ?? null);
        }
      } catch (e) {
        if (!cancelled) {
          logger.error("auth: profile fetch threw", e);
          setProfile(null);
        }
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    };
    void fetchAndSet();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const signInWithGoogle = async (next?: string) => {
    const redirectTo = `${window.location.origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ""}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) {
      logger.error("oauth signIn failed", error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error && error.name !== "AuthSessionMissingError") {
      logger.error("signOut failed", error);
      throw error;
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url, bio, top5, is_admin")
      .eq("id", user.id)
      .maybeSingle();
    if (error) {
      logger.error("refreshProfile failed", error);
      return;
    }
    setProfile(data ?? null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        profileLoading,
        signInWithGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
