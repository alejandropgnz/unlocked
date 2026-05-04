import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  rarityTier,
  tierBorderClass,
  tierLabel,
  tierTextColor,
} from "@/lib/rarity";
import { AdjudicateModal } from "@/components/adjudicate-modal";
import { StoryThread, type StoryListItem } from "@/components/story-thread";

export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("achievements")
    .select("title, description")
    .eq("slug", slug)
    .eq("status", "approved")
    .returns<{ title: string; description: string | null }[]>()
    .maybeSingle();

  if (!data) return { title: "Logro no encontrado · Unlocked" };

  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const ogUrl = `${origin}/og/achievement/${slug}`;

  return {
    title: `${data.title} · Unlocked`,
    description: data.description ?? "Colecciona los logros más absurdos de tu vida.",
    openGraph: {
      title: data.title,
      description: data.description ?? undefined,
      images: [{ url: ogUrl, width: 1080, height: 1920 }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      images: [ogUrl],
    },
  };
}

type AchievementRow = Pick<
  Database["public"]["Tables"]["achievements"]["Row"],
  "id" | "slug" | "title" | "emoji" | "description" | "category" | "unlock_count"
>;

type RarityRow = Pick<
  NonNullable<Database["public"]["Views"]["achievement_rarity"]["Row"]>,
  "id" | "rarity_percent"
>;

export default async function AchievementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: achievement, error: achievementError } = await supabase
    .from("achievements")
    .select("id, slug, title, emoji, description, category, unlock_count")
    .eq("slug", slug)
    .eq("status", "approved")
    .returns<AchievementRow[]>()
    .maybeSingle();

  if (achievementError) {
    console.error("achievement detail load error", achievementError);
    return (
      <main className="min-h-screen p-8 max-w-3xl mx-auto">
        <Link href="/" className="text-muted text-sm">← Volver</Link>
        <p className="mt-6 text-red">No se pudo cargar el logro.</p>
      </main>
    );
  }

  if (!achievement) notFound();

  const { data: rarityRow } = await supabase
    .from("achievement_rarity")
    .select("id, rarity_percent")
    .eq("id", achievement.id)
    .returns<RarityRow[]>()
    .maybeSingle();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let alreadyUnlocked = false;
  let currentUsername: string | null = null;
  if (user) {
    const [existingRes, profileRes] = await Promise.all([
      supabase
        .from("unlocks")
        .select("id")
        .eq("user_id", user.id)
        .eq("achievement_id", achievement.id)
        .returns<{ id: string }[]>()
        .maybeSingle(),
      supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .returns<{ username: string }[]>()
        .maybeSingle(),
    ]);
    alreadyUnlocked = !!existingRes.data;
    currentUsername = profileRes.data?.username ?? null;
  }

  type StoryRow = {
    id: string;
    body: string;
    score: number;
    created_at: string;
    user_id: string;
    profiles: { username: string; display_name: string; avatar_url: string | null } | null;
  };

  const { data: storiesRaw } = await supabase
    .from("stories")
    .select(
      "id, body, score, created_at, user_id, profiles!stories_user_id_fkey(username, display_name, avatar_url)",
    )
    .eq("achievement_id", achievement.id)
    .eq("is_hidden", false)
    .order("score", { ascending: false })
    .limit(50)
    .returns<StoryRow[]>();

  const storyIds = (storiesRaw ?? []).map((s) => s.id);
  const myReactionByStoryId = new Map<string, 1 | -1>();
  if (user && storyIds.length > 0) {
    const { data: rs } = await supabase
      .from("reactions")
      .select("target_id, value")
      .eq("user_id", user.id)
      .eq("target_type", "story")
      .in("target_id", storyIds)
      .returns<{ target_id: string; value: number }[]>();
    for (const r of rs ?? []) {
      myReactionByStoryId.set(r.target_id, r.value as 1 | -1);
    }
  }

  const stories: StoryListItem[] = (storiesRaw ?? []).map((s) => ({
    id: s.id,
    body: s.body,
    score: s.score,
    createdAt: s.created_at,
    user: {
      username: s.profiles?.username ?? "",
      displayName: s.profiles?.display_name ?? "",
      avatarUrl: s.profiles?.avatar_url ?? null,
    },
    isOwn: !!user && user.id === s.user_id,
    myReaction: myReactionByStoryId.get(s.id) ?? 0,
  }));

  stories.sort((a, b) => {
    if (a.isOwn !== b.isOwn) return a.isOwn ? -1 : 1;
    return b.score - a.score;
  });

  const rarityPercent = Number(rarityRow?.rarity_percent ?? 0);
  const tier = rarityTier(rarityPercent);
  const tierColor = tierTextColor(tier);

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto">
      <Link href="/" className="text-muted text-sm">← Volver</Link>

      <div className={`mt-6 rounded-[18px] p-[3px] ${tierBorderClass(tier)}`}>
        <div className="bg-surface rounded-[15px] p-8 md:p-12 text-center">
          <div
            className="flex justify-center items-center gap-4 text-[10px] font-bold tracking-[2.5px] mb-6"
            style={{ color: tierColor }}
          >
            <span>★ {tierLabel(tier)}</span>
            <span className="font-mono">{rarityPercent.toFixed(2)}%</span>
          </div>

          <div className="text-8xl md:text-9xl mb-6">{achievement.emoji}</div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
            {achievement.title}
          </h1>

          {achievement.description && (
            <p className="text-muted mt-4 text-sm md:text-base">
              {achievement.description}
            </p>
          )}

          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-muted uppercase tracking-wider">Categoría</div>
              <div className="font-bold mt-1 capitalize">{achievement.category}</div>
            </div>
            <div>
              <div className="text-muted uppercase tracking-wider">Desbloqueado</div>
              <div className="font-mono font-bold mt-1">
                {achievement.unlock_count.toLocaleString("es-ES")}
              </div>
            </div>
          </div>

          <AdjudicateModal
            achievementId={achievement.id}
            slug={slug}
            isLoggedIn={!!user}
            alreadyUnlocked={alreadyUnlocked}
            title={achievement.title}
            rarityPercent={rarityPercent}
            username={currentUsername}
          />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-widest text-muted mb-4">Historias</h2>
        <StoryThread stories={stories} isLoggedIn={!!user} />
      </section>
    </main>
  );
}
