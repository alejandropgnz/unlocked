import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LoginButton } from "./login-button";

export async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username: string | null = null;
  let isAdmin = false;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("username, is_admin")
      .eq("id", user.id)
      .returns<{ username: string; is_admin: boolean }[]>()
      .maybeSingle();
    username = data?.username ?? null;
    isAdmin = data?.is_admin ?? false;
  }

  return (
    <nav className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/5">
      <Link href="/" className="font-black text-lg tracking-tightest">
        UNLOCKED
      </Link>
      <div className="flex items-center gap-6 text-sm">
        <Link href="/" className="hover:text-gold">Home</Link>
        <Link href="/descubrir" className="hover:text-gold">Descubrir</Link>
        <Link href="/crear" className="hover:text-gold">Crear</Link>
        {isAdmin && (
          <Link href="/admin" className="hover:text-gold">Admin</Link>
        )}
        {username ? (
          <Link href="/yo" className="hover:text-gold">@{username}</Link>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}
