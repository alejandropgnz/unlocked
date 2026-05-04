import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import { AchievementCard } from "@/components/achievement-card";
import { ProfileShareButton } from "@/components/profile-share-button";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const ogUrl = `${origin}/og/profile/${username}`;
  return {
    title: `@${username} · Unlocked`,
    openGraph: {
      title: `@${username} en Unlocked`,
      images: [{ url: ogUrl, width: 1080, height: 1920 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `@${username} en Unlocked`,
      images: [ogUrl],
    },
  };
}

type ProfileRow = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "id" | "username" | "display_name" | "avatar_url" | "bio" | "top5"
>;

type UnlockJoinRow = {
  achievement_id: string;
  created_at: string;
  achievements: {
    id: string;
    slug: string;
    title: string;
    emoji: string;
    category: Database["public"]["Tables"]["achievements"]["Row"]["category"];
    unlock_count: number;
  } | null;
};

type RarityRow = Pick<
  NonNullable<Database["public"]["Views"]["achievement_rarity"]["Row"]>,
  "id" | "rarity_percent"
>;

interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  category: string;
  unlockCount: number;
  rarityPercent: number;
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, bio, top5")
    .eq("username", username)
    .returns<ProfileRow[]>()
    .maybeSingle();

  if (profileError) {
    console.error("profile load error", profileError);
    return (
      <main className="min-h-screen">
        <div className="px-4 md:px-8">
          <p className="text-red">No se pudo cargar el perfil.</p>
        </div>
      </main>
    );
  }

  if (!profile) notFound();

  // Load unlocks (with achievement details) + all rarities, in parallel.
  const [unlocksRes, rarityRes] = await Promise.all([
    supabase
      .from("unlocks")
      .select(
        "achievement_id, created_at, achievements!inner(id, slug, title, emoji, category, unlock_count)",
      )
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false })
      .returns<UnlockJoinRow[]>(),
    supabase
      .from("achievement_rarity")
      .select("id, rarity_percent")
      .returns<RarityRow[]>(),
  ]);

  if (unlocksRes.error || rarityRes.error) {
    console.error("profile collection load error", {
      unlocks: unlocksRes.error,
      rarity: rarityRes.error,
    });
  }

  const rarityById = new Map<string, number>();
  for (const r of rarityRes.data ?? []) {
    if (r.id != null) rarityById.set(r.id, Number(r.rarity_percent ?? 0));
  }

  const items: CollectionItem[] = (unlocksRes.data ?? [])
    .map((u): CollectionItem | null => {
      const a = u.achievements;
      if (!a) return null;
      return {
        id: a.id,
        slug: a.slug,
        title: a.title,
        emoji: a.emoji,
        category: a.category,
        unlockCount: a.unlock_count,
        rarityPercent: rarityById.get(a.id) ?? 0,
      };
    })
    .filter((x): x is CollectionItem => x !== null);

  const top5Ids = (profile.top5 ?? []).filter((id): id is string => typeof id === "string");
  const itemsById = new Map(items.map((i) => [i.id, i]));
  const top5Items = top5Ids
    .map((id) => itemsById.get(id))
    .filter((x): x is CollectionItem => x !== undefined);

  return (
    <main className="min-h-screen">
      <section className="px-4 md:px-8 max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 pb-8 border-b border-white/10">
          {profile.avatar_url && (
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-surface flex-shrink-0">
              <Image
                src={profile.avatar_url}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div>
            <div className="text-muted text-sm">@{profile.username}</div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
              {profile.display_name}
            </h1>
            {profile.bio && <p className="text-muted mt-2 text-sm">{profile.bio}</p>}
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="font-mono font-bold">{items.length}</span>
              <span className="text-muted">
                {items.length === 1 ? "logro" : "logros"} desbloqueados
              </span>
              <ProfileShareButton username={profile.username} total={items.length} />
            </div>
          </div>
        </header>

        {top5Items.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xs uppercase tracking-widest text-muted mb-4">Top 5</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 justify-items-center">
              {top5Items.map((a) => (
                <AchievementCard
                  key={a.id}
                  slug={a.slug}
                  title={a.title}
                  emoji={a.emoji}
                  rarityPercent={a.rarityPercent}
                  unlockCount={a.unlockCount}
                  category={a.category}
                  size="md"
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 pb-12">
          <h2 className="text-xs uppercase tracking-widest text-muted mb-4">
            Colección ({items.length})
          </h2>
          {items.length === 0 ? (
            <p className="text-muted">
              Aún no ha desbloqueado nada. Cuando lo haga, aparecerá aquí.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-items-center">
              {items.map((a) => (
                <AchievementCard
                  key={a.id}
                  slug={a.slug}
                  title={a.title}
                  emoji={a.emoji}
                  rarityPercent={a.rarityPercent}
                  unlockCount={a.unlockCount}
                  category={a.category}
                  size="sm"
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
