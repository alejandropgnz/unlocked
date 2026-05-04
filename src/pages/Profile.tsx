import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUserUnlocks } from "@/hooks/useUserUnlocks";
import { useUpdateAvatar } from "@/hooks/useUpdateAvatar";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { AchievementCard } from "@/components/AchievementCard";
import { ShareCardModal } from "@/components/ShareCardModal";
import { AvatarUploader } from "@/components/AvatarUploader";
import { EditProfileForm } from "@/components/EditProfileForm";
import { Top5Editor } from "@/components/Top5Editor";
import { DeleteAccountButton } from "@/components/DeleteAccountButton";
import type { UnlockedItem } from "@/hooks/types";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [shareOpen, setShareOpen] = useState(false);

  const { user, profile: authProfile } = useAuth();
  const { data: profile, isLoading: profileLoading, isError } = useUserProfile(username);
  const { data: unlocks, isLoading: unlocksLoading } = useUserUnlocks(profile?.id);
  const updateAvatarMut = useUpdateAvatar();

  const isOwner =
    !!user && !!authProfile && !!username && authProfile.username === username;

  if (profileLoading) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-6 md:py-8">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="flex-1 space-y-2 w-full">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !profile) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-8">
        <p className="text-red">Perfil no encontrado.</p>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          Volver al inicio
        </Link>
      </section>
    );
  }

  const totalUnlocks = unlocks?.length ?? 0;

  const top5Items: UnlockedItem[] = [];
  if (profile.top5 && unlocks) {
    for (const id of profile.top5 as string[]) {
      const found = unlocks.find((u) => u.achievementId === id);
      if (found) top5Items.push(found);
    }
  }

  const collectionItems = unlocks ?? [];

  const collectionForEditor = collectionItems.map((u) => ({
    id: u.achievementId,
    emoji: u.emoji,
    title: u.title,
  }));
  const top5Ids: string[] = Array.isArray(profile.top5)
    ? (profile.top5 as string[])
    : [];
  const top5ForEditor = top5Ids
    .map((id) => collectionForEditor.find((c) => c.id === id))
    .filter((x): x is { id: string; emoji: string; title: string } => !!x);

  const initials = (profile.display_name ?? profile.username ?? "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-6 md:py-8 space-y-10 md:space-y-12">
      {/* ===== Header — Wisheem-style: always horizontal, bio + actions below ===== */}
      <header>
        <div className="flex flex-row items-start gap-4 sm:gap-6">
          <div className="shrink-0">
            {isOwner ? (
              <AvatarUploader
                userId={user.id}
                value={authProfile.avatar_url ?? null}
                onChange={(url) => updateAvatarMut.mutate(url)}
                initials={initials}
                size="lg"
              />
            ) : (
              <Avatar src={profile.avatar_url} size="lg" />
            )}
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <h1 className="text-[26px] sm:text-3xl md:text-4xl font-black tracking-tightest leading-[1.05] truncate">
              {profile.display_name}
            </h1>
            <p className="text-[13px] text-muted font-mono mt-1 truncate">
              @{profile.username}
            </p>

            {/* Stats row — flex-nowrap so it doesn't break on small screens */}
            <div className="mt-3 flex items-baseline gap-x-3 text-[13px] sm:text-sm whitespace-nowrap">
              <span className="inline-flex items-baseline gap-1">
                <span className="font-bold text-white tabular-nums font-mono">
                  {totalUnlocks}
                </span>
                <span className="text-muted">
                  {totalUnlocks === 1 ? "logro" : "logros"}
                </span>
              </span>
            </div>
          </div>

          {/* Action buttons inline on desktop */}
          <div className="hidden md:flex items-center gap-2 shrink-0 pt-1">
            <Button variant="ghost" size="sm" onClick={() => setShareOpen(true)}>
              Compartir
            </Button>
          </div>
        </div>

        {/* Bio below the header row */}
        {profile.bio && !isOwner && (
          <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed mt-4 sm:mt-5 max-w-[620px]">
            {profile.bio}
          </p>
        )}

        {/* Action buttons row — mobile only (full width) */}
        <div className="md:hidden mt-5">
          <Button variant="ghost" size="block" onClick={() => setShareOpen(true)}>
            Compartir colección
          </Button>
        </div>
      </header>

      {/* ===== Edit (owner only): unified form with single Guardar button ===== */}
      {isOwner && (
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-muted">Editar perfil</h2>
          <EditProfileForm currentUsername={profile.username} />
        </section>
      )}

      {/* ===== Top 5 ===== */}
      {(isOwner || top5Items.length > 0) && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted mb-3">
            {isOwner ? "Mi Top 5" : "Top 5"}
          </h2>
          {isOwner ? (
            unlocksLoading ? (
              <div className="space-y-2">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-xl" />
                ))}
              </div>
            ) : (
              <Top5Editor initial={top5ForEditor} available={collectionForEditor} />
            )
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 justify-items-start">
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
          )}
        </section>
      )}

      {/* ===== Full collection ===== */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-muted mb-3">
          Colección {totalUnlocks > 0 && `(${totalUnlocks})`}
        </h2>
        {unlocksLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-[260px] rounded-[18px]" />
            ))}
          </div>
        ) : collectionItems.length === 0 ? (
          <p className="text-muted text-sm">
            {isOwner
              ? "Aún no has desbloqueado nada. Empieza explorando la home."
              : "Aún no tiene logros."}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 justify-items-start">
            {collectionItems.map((u) => (
              <AchievementCard
                key={u.achievementId}
                slug={u.slug}
                title={u.title}
                emoji={u.emoji}
                rarityPercent={u.rarityPercent}
                unlockCount={u.unlockCount}
                category={u.category}
                size="md"
                href={`/u/${profile.username}/${u.slug}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ===== Danger zone (owner only) ===== */}
      {isOwner && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-red mb-3">
            Zona de peligro
          </h2>
          <DeleteAccountButton />
        </section>
      )}

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
