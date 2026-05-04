import Link from "next/link";
import { ReactionButtons } from "./reaction-buttons";

export interface ReplyItem {
  id: string;
  body: string;
  score: number;
  createdAt: string;
  user: { username: string; avatarUrl: string | null };
  myReaction: 1 | -1 | 0;
}

export function ReplyList({
  replies,
  isLoggedIn,
}: {
  replies: ReplyItem[];
  isLoggedIn: boolean;
}) {
  if (replies.length === 0) {
    return <p className="text-muted text-sm mt-6">Sé el primero en responder.</p>;
  }
  return (
    <ul className="space-y-3 mt-6">
      {replies.map((r) => (
        <li key={r.id} className="bg-surface rounded-xl p-3">
          <div className="flex items-center gap-2">
            {r.user.avatarUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={r.user.avatarUrl}
                className="w-6 h-6 rounded-full object-cover"
                alt=""
              />
            )}
            <Link
              href={`/u/${r.user.username}`}
              className="text-xs font-bold hover:text-gold"
            >
              @{r.user.username}
            </Link>
            <div className="ml-auto">
              <ReactionButtons
                targetType="reply"
                targetId={r.id}
                initialScore={r.score}
                initialValue={r.myReaction}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </div>
          <p className="mt-2 text-sm whitespace-pre-wrap">{r.body}</p>
        </li>
      ))}
    </ul>
  );
}
