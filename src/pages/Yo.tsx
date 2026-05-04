import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserUnlocks } from "@/hooks/useUserUnlocks";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { BioForm } from "@/components/BioForm";
import { Top5Editor } from "@/components/Top5Editor";
import { DeleteAccountButton } from "@/components/DeleteAccountButton";

export default function Yo() {
  const { user, profile } = useAuth();
  const { data: unlocks, isLoading } = useUserUnlocks(user?.id);

  if (!profile) {
    return (
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        <p className="text-muted animate-pulse">Cargando perfil...</p>
      </section>
    );
  }

  // Build Top5Editor data
  const collectionItems = (unlocks ?? []).map((u) => ({
    id: u.achievementId,
    emoji: u.emoji,
    title: u.title,
  }));

  const top5Ids: string[] = Array.isArray(profile.top5)
    ? (profile.top5 as string[])
    : [];
  const top5Items = top5Ids
    .map((id) => collectionItems.find((c) => c.id === id))
    .filter((x): x is { id: string; emoji: string; title: string } => !!x);

  return (
    <section className="px-4 md:px-8 max-w-3xl mx-auto py-8 space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar src={profile.avatar_url} size="lg" />
        <div>
          <h1 className="text-2xl font-black tracking-tighter">
            {profile.display_name}
          </h1>
          <p className="text-muted text-sm">@{profile.username}</p>
          {profile.username && (
            <Link
              to={`/u/${profile.username}`}
              className="text-xs text-muted underline hover:text-white mt-1 inline-block"
            >
              Ver perfil público →
            </Link>
          )}
        </div>
      </div>

      {/* Bio */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-muted mb-3">Bio</h2>
        <BioForm />
      </div>

      {/* Top 5 */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-muted mb-3">
          Mi Top 5
        </h2>
        {isLoading ? (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        ) : (
          <Top5Editor initial={top5Items} available={collectionItems} />
        )}
      </div>

      {/* Danger zone */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-red mb-3">
          Zona de peligro
        </h2>
        <DeleteAccountButton />
      </div>
    </section>
  );
}
