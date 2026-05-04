import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserUnlock } from "@/hooks/useUserUnlock";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ShareCardModal } from "@/components/ShareCardModal";
import { rarityTier, tierBorderClass, tierTextColor } from "@/lib/rarity";

export default function UserUnlock() {
  const { username, slug } = useParams<{ username: string; slug: string }>();
  const [shareOpen, setShareOpen] = useState(false);

  const { data, isLoading, isError } = useUserUnlock(username, slug);

  if (isLoading) {
    return (
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        <Skeleton className="h-[400px] rounded-3xl" />
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-black tracking-tighter">No encontrado</h1>
        <p className="text-muted mt-2 text-sm">
          Este logro no está en la colección de @{username}.
        </p>
        <Link to={`/u/${username}`} className="mt-4 inline-block text-sm underline">
          Ver perfil de @{username}
        </Link>
      </section>
    );
  }

  const { achievement, user: profileUser, story, rarityPercent, unlockedAt } = data;
  const tier = rarityTier(rarityPercent);
  const tierColor = tierTextColor(tier);

  const unlockedDate = new Date(unlockedAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-muted mb-6">
        <Link to={`/u/${profileUser.username}`} className="hover:text-white">
          @{profileUser.username}
        </Link>
        <span>/</span>
        <Link to={`/l/${achievement.slug}`} className="hover:text-white">
          {achievement.title}
        </Link>
      </div>

      {/* Achievement card */}
      <div className={`rounded-[20px] p-[3px] ${tierBorderClass(tier)}`}>
        <div className="bg-surface rounded-[18px] p-6 md:p-10 flex flex-col items-center text-center">
          <div
            className="text-[10px] font-bold tracking-[3px] uppercase"
            style={{ color: tierColor }}
          >
            <span className="font-mono">{rarityPercent.toFixed(2)}%</span> lo tienen
          </div>
          <div className="text-7xl md:text-8xl mt-4">{achievement.emoji}</div>
          <h1 className="mt-4 text-2xl md:text-4xl font-black tracking-tighter">
            {achievement.title}
          </h1>
<div className="mt-4 flex gap-4 text-xs text-muted font-mono uppercase tracking-widest">
            <span>{achievement.category}</span>
            <span>·</span>
            <span>{achievement.unlock_count.toLocaleString("es-ES")} desbloqueados</span>
          </div>
        </div>
      </div>

      {/* Unlocked by */}
      <div className="mt-6 bg-surface rounded-2xl p-4 flex items-center gap-3">
        <Avatar src={profileUser.avatar_url} size="md" />
        <div>
          <Link
            to={`/u/${profileUser.username}`}
            className="font-bold hover:text-gold text-sm"
          >
            @{profileUser.username}
          </Link>
          <p className="text-muted text-xs">desbloqueado el {unlockedDate}</p>
        </div>
        <div className="ml-auto">
          <Button variant="ghost" size="sm" onClick={() => setShareOpen(true)}>
            Compartir
          </Button>
        </div>
      </div>

      {/* Story */}
      {story && (
        <div className="mt-6 bg-surface rounded-2xl p-5">
          <p className="text-xs uppercase tracking-widest text-muted mb-3">Historia</p>
          <p className="text-sm whitespace-pre-wrap">{story.body}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-muted">
            <Link to={`/h/${story.id}`} className="hover:text-white">
              Ver respuestas →
            </Link>
            <span className="font-mono">{story.score} puntos</span>
          </div>
        </div>
      )}

      {/* Links */}
      <div className="mt-6 flex gap-3 text-sm">
        <Link
          to={`/l/${achievement.slug}`}
          className="underline text-muted hover:text-white"
        >
          Ver página del logro
        </Link>
        <span className="text-muted">·</span>
        <Link
          to={`/u/${profileUser.username}`}
          className="underline text-muted hover:text-white"
        >
          Ver perfil completo
        </Link>
      </div>

      <ShareCardModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        data={{
          kind: "unlock",
          username: profileUser.username,
          slug: achievement.slug,
          title: achievement.title,
          rarityPercent,
        }}
      />
    </section>
  );
}
