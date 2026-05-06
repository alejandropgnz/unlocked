import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactionButtons } from "./ReactionButtons";
import { ReportButton } from "./ReportButton";
import { Avatar } from "./ui/Avatar";
import type { ReplyListItem } from "@/hooks/types";

export function RepliesList({ replies }: { replies: ReplyListItem[] }) {
  const { user } = useAuth();
  if (replies.length === 0) {
    return <p className="text-muted text-sm mt-6">Sé el primero en responder.</p>;
  }
  return (
    <ul className="space-y-3 mt-6">
      {replies.map((r) => (
        <li key={r.id} className="bg-surface rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Avatar src={r.user.avatar_url} size="sm" className="w-6 h-6" />
            <Link
              to={`/u/${r.user.username}`}
              className="text-xs font-bold hover:text-indigo"
            >
              @{r.user.username}
            </Link>
            <div className="ml-auto">
              <ReactionButtons
                targetType="reply"
                targetId={r.id}
                initialScore={r.score}
                initialValue={r.myReaction}
              />
            </div>
          </div>
          <p className="mt-2 text-sm whitespace-pre-wrap">{r.body}</p>
          {user && (
            <div className="mt-2 flex justify-end">
              <ReportButton targetType="reply" targetId={r.id} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
