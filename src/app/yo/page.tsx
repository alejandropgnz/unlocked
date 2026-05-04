import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import { SiteHeader } from "@/components/site-header";
import { Top5Editor, type Top5Item } from "@/components/top5-editor";
import { BioForm } from "@/components/bio-form";
import { DeleteAccountButton } from "@/components/delete-account-button";

export const dynamic = "force-dynamic";

type ProfileRow = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "id" | "username" | "display_name" | "avatar_url" | "bio" | "top5"
>;

type UnlockJoinRow = {
  achievement_id: string;
  achievements: { id: string; emoji: string; title: string } | null;
};

export default async function YoPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/yo");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, bio, top5")
    .eq("id", user.id)
    .returns<ProfileRow[]>()
    .maybeSingle();
  if (!profile) redirect("/");

  const { data: unlocks } = await supabase
    .from("unlocks")
    .select("achievement_id, achievements!inner(id, emoji, title)")
    .eq("user_id", user.id)
    .returns<UnlockJoinRow[]>();

  const items: Top5Item[] = (unlocks ?? [])
    .map((u): Top5Item | null => {
      const a = u.achievements;
      if (!a) return null;
      return { id: a.id, emoji: a.emoji, title: a.title };
    })
    .filter((x): x is Top5Item => x !== null);

  const top5Ids = (profile.top5 ?? []).filter((id): id is string => typeof id === "string");
  const itemsById = new Map(items.map((i) => [i.id, i]));
  const initialTop5 = top5Ids
    .map((id) => itemsById.get(id))
    .filter((x): x is Top5Item => x !== undefined);

  const sp = (await searchParams) ?? {};
  const deleteError = sp.error === "delete_failed";

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        <header className="flex items-center gap-4 pb-6 border-b border-white/10">
          {profile.avatar_url && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-surface flex-shrink-0">
              <Image
                src={profile.avatar_url}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div>
            <div className="text-muted text-sm">@{profile.username}</div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter">{profile.display_name}</h1>
          </div>
          <Link
            href={`/u/${profile.username}`}
            className="ml-auto text-xs underline text-muted hover:text-gold"
          >
            Ver perfil público →
          </Link>
        </header>

        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-muted mb-3">Bio</h2>
          <BioForm initial={profile.bio ?? ""} />
        </section>

        <section className="mt-10">
          <Top5Editor initial={initialTop5} available={items} />
        </section>

        <section className="mt-12 pt-6 border-t border-white/10">
          <h2 className="text-xs uppercase tracking-widest text-muted mb-3">Zona de peligro</h2>
          {deleteError && (
            <p className="text-red text-sm mb-3">No se pudo borrar la cuenta. Inténtalo de nuevo.</p>
          )}
          <DeleteAccountButton />
        </section>
      </section>
    </main>
  );
}
