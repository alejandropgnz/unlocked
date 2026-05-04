import Link from "next/link";
import { ReactionButtons } from "./reaction-buttons";

export interface StoryListItem {
  id: string;
  body: string;
  score: number;
  createdAt: string;
  user: { username: string; displayName: string; avatarUrl: string | null };
  isOwn: boolean;
  myReaction: 1 | -1 | 0;
}

export function StoryThread({
  stories,
  isLoggedIn,
}: {
  stories: StoryListItem[];
  isLoggedIn: boolean;
}) {
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
            {s.user.avatarUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={s.user.avatarUrl}
                className="w-8 h-8 rounded-full object-cover"
                alt=""
              />
            )}
            <Link
              href={`/u/${s.user.username}`}
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
                isLoggedIn={isLoggedIn}
              />
            </div>
          </div>
          <p className="mt-3 text-sm whitespace-pre-wrap">{s.body}</p>
          <Link
            href={`/h/${s.id}`}
            className="mt-3 inline-block text-xs text-muted hover:text-white"
          >
            Ver respuestas →
          </Link>
        </li>
      ))}
    </ul>
  );
}
