import { Link, useLocation } from "react-router-dom";
import { Flame, Trophy, Sparkles, User, type LucideIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/cn";

interface Tab {
  href: string;
  label: string;
  icon: LucideIcon;
  matches: (path: string) => boolean;
}

export function BottomNav() {
  const { user, profile } = useAuth();
  const path = useLocation().pathname;

  // Same lucide icons as the desktop Sidebar so the visual language is
  // consistent across breakpoints. Order matches Sidebar too: Descubrir
  // first (headline experience), then catalog, create, profile.
  const tabs: Tab[] = [
    { href: "/descubrir", label: "Descubrir", icon: Flame, matches: (p) => p.startsWith("/descubrir") },
    { href: "/", label: "Logros", icon: Trophy, matches: (p) => p === "/" },
    { href: "/crear", label: "Crear", icon: Sparkles, matches: (p) => p.startsWith("/crear") },
    {
      href: user && profile?.username ? `/u/${profile.username}` : "/login",
      label: user && profile?.username ? "Yo" : "Entrar",
      icon: User,
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
        const Icon = t.icon;
        const active = t.matches(path);
        return (
          <Link
            key={t.href}
            to={t.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 transition",
              active ? "text-gold" : "text-muted hover:text-white",
            )}
          >
            <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} aria-hidden />
            <span className="text-[10px] uppercase tracking-widest">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
