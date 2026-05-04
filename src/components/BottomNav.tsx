import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/cn";

interface Tab {
  href: string;
  label: string;
  emoji: string;
  matches: (path: string) => boolean;
}

export function BottomNav() {
  const { user, profile } = useAuth();
  const path = useLocation().pathname;

  const tabs: Tab[] = [
    { href: "/", label: "Logros", emoji: "🏆", matches: (p) => p === "/" },
    { href: "/descubrir", label: "Descubrir", emoji: "🔥", matches: (p) => p.startsWith("/descubrir") },
    { href: "/crear", label: "Crear", emoji: "✨", matches: (p) => p.startsWith("/crear") },
    {
      href: user && profile?.username ? `/u/${profile.username}` : "/login",
      label: user && profile?.username ? "Yo" : "Entrar",
      emoji: "👤",
      matches: (p) =>
        (user && profile && p === `/u/${profile.username}`) ||
        p.startsWith("/login"),
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-md border-t border-white/10 flex justify-around py-2 h-14"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map((t) => {
        const active = t.matches(path);
        return (
          <Link
            key={t.href}
            to={t.href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1 transition",
              active ? "text-gold" : "text-muted hover:text-white",
            )}
          >
            <span className="text-lg leading-none">{t.emoji}</span>
            <span className="text-[10px] uppercase tracking-widest">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
