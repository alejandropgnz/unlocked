import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactionButtons } from "./ReactionButtons";
import { ReportButton } from "./ReportButton";
import { Avatar } from "./ui/Avatar";
import type { StoryListItem } from "@/hooks/types";

export function StoriesList({ stories }: { stories: StoryListItem[] }) {
  const { user } = useAuth();
  if (stories.length === 0) {
    return (
      <p className="text-muted text-sm">
        Aún no hay historias. Adjudícate el logro y sé el primero.
      </p>
    );
  }
  return (
    <ul className="space-y-4">
      {stories.map((s) => (
        <li key={s.id} className="bg-surface rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Avatar src={s.user.avatar_url} size="sm" />
            <Link
              to={`/u/${s.user.username}`}
              className="text-sm font-bold hover:text-gold"
            >
              @{s.user.username}
            </Link>
            {s.isOwn && (
              <span className="text-[10px] uppercase tracking-widest bg-gold/20 text-gold px-2 py-0.5 rounded-full">
                Tu historia
              </span>
            )}
            <div className="ml-auto">
              <ReactionButtons
                targetType="story"
                targetId={s.id}
                initialScore={s.score}
                initialValue={s.myReaction}
              />
            </div>
          </div>
          <p className="mt-3 text-sm whitespace-pre-wrap">{s.body}</p>
          <div className="mt-3 flex items-center justify-between">
            <Link
              to={`/h/${s.id}`}
              className="text-xs text-muted hover:text-white"
            >
              Ver respuestas →
            </Link>
            {user && !s.isOwn && (
              <ReportButton targetType="story" targetId={s.id} />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
