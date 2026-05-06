import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAchievement } from "@/hooks/useAchievement";
import { useStories } from "@/hooks/useStories";
import { useUserUnlocks } from "@/hooks/useUserUnlocks";
import { useAuth } from "@/contexts/AuthContext";
import { AdjudicateModal } from "@/components/AdjudicateModal";
import { AddStoryModal } from "@/components/AddStoryModal";
import { StoriesList } from "@/components/StoriesList";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { rarityTier, tierBorderClass, tierTextColor } from "@/lib/rarity";

export default function AchievementDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [storyOpen, setStoryOpen] = useState(false);

  const { data: achievement, isLoading, isError } = useAchievement(slug);
  const { data: stories, isLoading: storiesLoading } = useStories(
    achievement?.id,
    user?.id ?? null,
  );
  const { data: myUnlocks } = useUserUnlocks(user?.id);

  if (isLoading) {
    return (
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-[300px] w-full rounded-3xl" />
      </section>
    );
  }

  if (isError || !achievement) {
    return (
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        <p className="text-red">Logro no encontrado.</p>
      </section>
    );
  }

  const tier = rarityTier(achievement.rarityPercent);
  const tierColor = tierTextColor(tier);
  const alreadyUnlocked = !!myUnlocks?.some(
    (u) => u.achievementId === achievement.id,
  );
  // True only once stories have loaded and we know for sure the user has none
  const ownStoryExists = !!stories?.some((s) => s.isOwn);

  return (
    <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
      {/* Card */}
      <div className={`rounded-[20px] p-[3px] ${tierBorderClass(tier)}`}>
        <div className="bg-surface rounded-[18px] p-6 md:p-10 flex flex-col items-center text-center">
          <div
            className="text-[10px] font-bold tracking-[3px] uppercase"
            style={{ color: tierColor }}
          >
            <span className="font-mono">{achievement.rarityPercent.toFixed(2)}%</span> lo tienen
          </div>
          <div className="text-7xl md:text-8xl mt-4">{achievement.emoji}</div>
          <h1 className="mt-4 text-2xl md:text-4xl font-black tracking-tighter">
            {achievement.title}
          </h1>
          {/* Short witty tagline below the title — nullable: only the
              200 originally-curated logros have descriptions, the
              rest stay clean without it. Render nothing if null
              instead of an empty box. */}
          {achievement.description && (
            <p className="mt-3 text-sm md:text-base text-muted italic max-w-md">
              {achievement.description}
            </p>
          )}
<div className="mt-4 flex gap-4 text-xs text-muted font-mono uppercase tracking-widest">
            <span>{achievement.category}</span>
            <span>·</span>
            <span>{achievement.unlock_count.toLocaleString("es-ES")} desbloqueados</span>
          </div>
          <AdjudicateModal
            achievementId={achievement.id}
            slug={achievement.slug}
            title={achievement.title}
            rarityPercent={achievement.rarityPercent}
            alreadyUnlocked={alreadyUnlocked}
          />
          {/* CTA to add a story for users who adjudicated via swipe (no story yet) */}
          {alreadyUnlocked && !storiesLoading && !ownStoryExists && (
            <div className="mt-3">
              <Button variant="ghost" size="md" onClick={() => setStoryOpen(true)}>
                Cuenta tu historia
              </Button>
            </div>
          )}
          {achievement && (
            <AddStoryModal
              open={storyOpen}
              onClose={() => setStoryOpen(false)}
              achievementId={achievement.id}
            />
          )}
        </div>
      </div>

      {/* Stories */}
      <div className="mt-10">
        <h2 className="text-lg font-black tracking-tighter mb-4">Historias</h2>
        {storiesLoading && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        )}
        {!storiesLoading && stories && <StoriesList stories={stories} />}
      </div>
    </section>
  );
}
