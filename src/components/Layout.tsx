import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Sidebar } from "./Sidebar";
import { MobileTopBar } from "./MobileTopBar";
import { BottomNav } from "./BottomNav";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen min-h-[100dvh] bg-bg text-white">
      <NavBar />
      <MobileTopBar />
      <div className="flex-1 flex">
        <Sidebar />
        <div
          className="flex-1 min-w-0 flex flex-col
            pt-[calc(3.5rem+env(safe-area-inset-top))] md:pt-0
            pb-[calc(3.5rem+env(safe-area-inset-bottom)+0.5rem)] md:pb-0"
        >
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      <CookieBanner />
      <BottomNav />
    </div>
  );
}
