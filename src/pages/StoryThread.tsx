import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useStory } from "@/hooks/useStory";
import { useReplies } from "@/hooks/useReplies";
import { ReactionButtons } from "@/components/ReactionButtons";
import { RepliesList } from "@/components/RepliesList";
import { ReplyBox } from "@/components/ReplyBox";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";

export default function StoryThread() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const { data: story, isLoading, isError } = useStory(id, user?.id ?? null);
  const { data: replies, isLoading: repliesLoading } = useReplies(
    id,
    user?.id ?? null,
  );

  if (isLoading) {
    return (
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-40 rounded-2xl" />
      </section>
    );
  }

  if (isError || !story) {
    return (
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        <p className="text-red">Historia no encontrada.</p>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          Volver al inicio
        </Link>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted mb-6">
        <Link to={`/l/${story.achievement.slug}`} className="hover:text-white">
          {story.achievement.emoji} {story.achievement.title}
        </Link>
        <span>/</span>
        <span>Historia</span>
      </div>

      {/* Story card */}
      <div className="bg-surface rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <Avatar src={story.user.avatar_url} size="sm" />
          <Link to={`/u/${story.user.username}`} className="text-sm font-bold hover:text-gold">
            @{story.user.username}
          </Link>
          <div className="ml-auto">
            <ReactionButtons
              targetType="story"
              targetId={story.id}
              initialScore={story.score}
              initialValue={story.myReaction}
            />
          </div>
        </div>
        <p className="mt-4 text-sm whitespace-pre-wrap">{story.body}</p>
      </div>

      {/* Replies */}
      <div className="mt-8">
        <h2 className="text-sm font-black tracking-tighter uppercase text-muted">
          Respuestas
        </h2>
        {repliesLoading && (
          <div className="space-y-3 mt-4">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        )}
        {!repliesLoading && replies && <RepliesList replies={replies} />}
      </div>

      <ReplyBox storyId={story.id} />
    </section>
  );
}
