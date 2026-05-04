"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  href: string;
  label: string;
  emoji: string;
  matches: (path: string) => boolean;
}

export function TabBar({ username }: { username: string | null }) {
  const path = usePathname();
  const tabs: Tab[] = [
    { href: "/", label: "Home", emoji: "🏠", matches: (p) => p === "/" },
    { href: "/descubrir", label: "Descubrir", emoji: "🔥", matches: (p) => p.startsWith("/descubrir") },
    { href: "/crear", label: "Crear", emoji: "✨", matches: (p) => p.startsWith("/crear") },
    {
      href: username ? "/yo" : "/login",
      label: username ? "Yo" : "Entrar",
      emoji: "👤",
      matches: (p) => p.startsWith("/yo") || p.startsWith("/login"),
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-bg border-t border-white/10 flex justify-around py-2 z-40">
      {tabs.map((t) => {
        const active = t.matches(path);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 transition ${active ? "text-gold" : "text-muted hover:text-white"}`}
          >
            <span className="text-lg">{t.emoji}</span>
            <span className="text-[10px] uppercase tracking-widest">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
