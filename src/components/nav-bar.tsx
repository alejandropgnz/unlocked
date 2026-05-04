import Link from "next/link";
import { LoginButton } from "./login-button";
import { getCurrentProfileSummary } from "@/lib/auth-helpers";

export async function NavBar() {
  const profile = await getCurrentProfileSummary();
  const username = profile?.username ?? null;
  const isAdmin = profile?.isAdmin ?? false;

  return (
    <nav className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/5">
      <Link href="/" className="font-black text-lg tracking-tightest" prefetch>
        UNLOCKED
      </Link>
      <div className="flex items-center gap-6 text-sm">
        <Link href="/" className="hover:text-gold" prefetch>Home</Link>
        <Link href="/descubrir" className="hover:text-gold" prefetch>Descubrir</Link>
        <Link href="/crear" className="hover:text-gold" prefetch>Crear</Link>
        {isAdmin && (
          <Link href="/admin" className="hover:text-gold">Admin</Link>
        )}
        {username ? (
          <Link href={`/yo`} className="hover:text-gold" prefetch>@{username}</Link>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}
