import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LoginButton } from "./login-button";
import type { Database } from "@/types/database";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username: string | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .returns<Pick<ProfileRow, "username">[]>()
      .maybeSingle();
    username = data?.username ?? null;
  }

  return (
    <header className="px-4 md:px-8 pt-10 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
      <div>
        <Link href="/" className="block">
          <h1 className="text-5xl md:text-7xl font-black tracking-tightest bg-gradient-to-br from-red via-gold to-violet bg-clip-text text-transparent leading-none">
            UNLOCKED
          </h1>
        </Link>
        <p className="text-muted mt-2 text-sm md:text-base">
          Colecciona los logros más absurdos de tu vida.
        </p>
      </div>
      <div className="flex items-center gap-4 text-sm">
        {username ? (
          <Link href={`/u/${username}`} className="font-bold hover:text-gold">
            @{username}
          </Link>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
