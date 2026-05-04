import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUserUnlocks } from "@/hooks/useUserUnlocks";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { AchievementGrid } from "@/components/AchievementGrid";
import { AchievementCard } from "@/components/AchievementCard";
import { ShareCardModal } from "@/components/ShareCardModal";
import type { UnlockedItem } from "@/hooks/types";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [shareOpen, setShareOpen] = useState(false);

  const { data: profile, isLoading: profileLoading, isError } = useUserProfile(username);
  const { data: unlocks, isLoading: unlocksLoading } = useUserUnlocks(profile?.id);

  if (profileLoading) {
    return (
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-[260px] rounded-[18px]" />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !profile) {
    return (
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        <p className="text-red">Perfil no encontrado.</p>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          Volver al inicio
        </Link>
      </section>
    );
  }

  const totalUnlocks = unlocks?.length ?? 0;

  // Build top5 items from unlocks by matching profile.top5 IDs
  const top5Items: UnlockedItem[] = [];
  if (profile.top5 && unlocks) {
    for (const id of profile.top5 as string[]) {
      const found = unlocks.find((u) => u.achievementId === id);
      if (found) top5Items.push(found);
    }
  }

  const collectionItems = unlocks ?? [];

  return (
    <section className="px-4 md:px-8 max-w-5xl mx-auto py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 mb-8">
        <Avatar src={profile.avatar_url} size="lg" />
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
            {profile.display_name}
          </h1>
          <p className="text-muted text-sm">@{profile.username}</p>
          {profile.bio && (
            <p className="mt-2 text-sm max-w-sm">{profile.bio}</p>
          )}
          <div className="mt-3 flex items-center gap-4">
            <span className="text-sm font-mono text-muted">
              {totalUnlocks.toLocaleString("es-ES")} logros
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShareOpen(true)}
            >
              Compartir colección
            </Button>
          </div>
        </div>
      </div>

      {/* Top 5 */}
      {top5Items.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-muted mb-3">
            Top 5
          </h2>
          <div className="flex flex-wrap gap-3">
            {top5Items.map((item) => (
              <AchievementCard
                key={item.achievementId}
                slug={item.slug}
                title={item.title}
                emoji={item.emoji}
                rarityPercent={item.rarityPercent}
                unlockCount={item.unlockCount}
                category={item.category}
                size="md"
                href={`/u/${profile.username}/${item.slug}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Full collection */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-muted mb-3">
          Colección completa
        </h2>
        {unlocksLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-[260px] rounded-[18px]" />
            ))}
          </div>
        )}
        {!unlocksLoading && (
          <AchievementGrid
            items={collectionItems.map((u) => ({
              slug: u.slug,
              title: u.title,
              emoji: u.emoji,
              rarityPercent: u.rarityPercent,
              unlockCount: u.unlockCount,
              category: u.category,
            }))}
            emptyMessage="Aún no tiene logros."
          />
        )}
      </div>

      <ShareCardModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        data={{
          kind: "profile",
          username: profile.username,
          total: totalUnlocks,
        }}
      />
    </section>
  );
}
