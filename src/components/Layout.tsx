import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { BottomNav } from "./BottomNav";
import { CookieBanner } from "./CookieBanner";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen min-h-[100dvh] bg-bg text-white">
      <NavBar />
      <main className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom)+0.5rem)] md:pb-0">
        <Outlet />
      </main>
      <CookieBanner />
      <BottomNav />
    </div>
  );
}
