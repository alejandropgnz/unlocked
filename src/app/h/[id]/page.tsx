import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ReplyList, type ReplyItem } from "@/components/reply-list";
import { ReplyBox } from "@/components/reply-box";
import { ReactionButtons } from "@/components/reaction-buttons";

export const revalidate = 30;

type StoryRow = {
  id: string;
  body: string;
  score: number;
  created_at: string;
  user_id: string;
  achievement_id: string;
  profiles: { username: string; display_name: string; avatar_url: string | null } | null;
  achievements: { slug: string; title: string; emoji: string } | null;
};

type ReplyRow = {
  id: string;
  body: string;
  score: number;
  created_at: string;
  user_id: string;
  profiles: { username: string; avatar_url: string | null } | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("stories")
    .select("body, achievements!inner(title)")
    .eq("id", id)
    .eq("is_hidden", false)
    .returns<{ body: string; achievements: { title: string } | null }[]>()
    .maybeSingle();
  if (!data) return { title: "Historia · Unlocked" };
  const title = data.achievements?.title ?? "Historia";
  const snippet = data.body.length > 90 ? `${data.body.slice(0, 90)}…` : data.body;
  return { title: `${title} · Unlocked`, description: snippet };
}

export default async function StoryThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: story, error } = await supabase
    .from("stories")
    .select(
      "id, body, score, created_at, user_id, achievement_id, profiles!stories_user_id_fkey(username, display_name, avatar_url), achievements!inner(slug, title, emoji)",
    )
    .eq("id", id)
    .eq("is_hidden", false)
    .returns<StoryRow[]>()
    .maybeSingle();

  if (error || !story) notFound();

  const { data: repliesRaw } = await supabase
    .from("replies")
    .select(
      "id, body, score, created_at, user_id, profiles!replies_user_id_fkey(username, avatar_url)",
    )
    .eq("story_id", id)
    .eq("is_hidden", false)
    .order("score", { ascending: false })
    .returns<ReplyRow[]>();

  const replyIds = (repliesRaw ?? []).map((r) => r.id);
  const myReactionByReplyId = new Map<string, 1 | -1>();
  let myStoryReaction: 1 | -1 | 0 = 0;
  if (user) {
    if (replyIds.length > 0) {
      const { data: rs } = await supabase
        .from("reactions")
        .select("target_id, value")
        .eq("user_id", user.id)
        .eq("target_type", "reply")
        .in("target_id", replyIds)
        .returns<{ target_id: string; value: number }[]>();
      for (const r of rs ?? []) {
        myReactionByReplyId.set(r.target_id, r.value as 1 | -1);
      }
    }
    const { data: storyReactionRow } = await supabase
      .from("reactions")
      .select("value")
      .eq("user_id", user.id)
      .eq("target_type", "story")
      .eq("target_id", id)
      .returns<{ value: number }[]>()
      .maybeSingle();
    if (storyReactionRow?.value === 1 || storyReactionRow?.value === -1) {
      myStoryReaction = storyReactionRow.value;
    }
  }

  const replies: ReplyItem[] = (repliesRaw ?? []).map((r) => ({
    id: r.id,
    body: r.body,
    score: r.score,
    createdAt: r.created_at,
    user: {
      username: r.profiles?.username ?? "",
      avatarUrl: r.profiles?.avatar_url ?? null,
    },
    myReaction: myReactionByReplyId.get(r.id) ?? 0,
  }));

  return (
    <main className="min-h-screen">
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        {story.achievements && (
          <Link
            href={`/l/${story.achievements.slug}`}
            className="text-muted text-sm hover:text-gold"
          >
            ← {story.achievements.emoji} {story.achievements.title}
          </Link>
        )}

        <article className="mt-6 bg-surface rounded-2xl p-5">
          <div className="flex items-center gap-3">
            {story.profiles?.avatar_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={story.profiles.avatar_url}
                className="w-9 h-9 rounded-full object-cover"
                alt=""
              />
            )}
            <Link
              href={`/u/${story.profiles?.username ?? ""}`}
              className="font-bold hover:text-gold"
            >
              @{story.profiles?.username ?? ""}
            </Link>
            <div className="ml-auto">
              <ReactionButtons
                targetType="story"
                targetId={story.id}
                initialScore={story.score}
                initialValue={myStoryReaction}
                isLoggedIn={!!user}
              />
            </div>
          </div>
          <p className="mt-3 whitespace-pre-wrap">{story.body}</p>
        </article>

        <h2 className="mt-8 text-xs uppercase tracking-widest text-muted">Respuestas</h2>
        <ReplyList replies={replies} isLoggedIn={!!user} />
        <ReplyBox storyId={id} isLoggedIn={!!user} />
      </section>
    </main>
  );
}
