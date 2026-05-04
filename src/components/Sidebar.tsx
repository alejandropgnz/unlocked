import { NavLink } from "react-router-dom";
import { Trophy, Flame, Sparkles, User, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/cn";

interface SidebarItem {
  to: string;
  label: string;
  icon: typeof Trophy;
  end?: boolean;
}

export function Sidebar() {
  const { user, profile } = useAuth();

  const items: SidebarItem[] = [
    { to: "/descubrir", label: "Descubrir", icon: Flame },
    { to: "/", label: "Logros", icon: Trophy, end: true },
    { to: "/crear", label: "Crear", icon: Sparkles },
  ];

  if (user && profile?.username) {
    items.push({
      to: `/u/${profile.username}`,
      label: "Mi perfil",
      icon: User,
    });
  }

  if (profile?.is_admin) {
    items.push({ to: "/admin", label: "Admin", icon: Shield });
  }

  return (
    <aside className="hidden md:flex flex-col w-56 lg:w-64 shrink-0 border-r border-white/5 px-4 py-6 gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end ?? false}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition",
                isActive
                  ? "bg-white/10 text-gold font-bold"
                  : "text-white hover:bg-white/5",
              )
            }
          >
            <Icon className="w-4 h-4" strokeWidth={2} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
}
