import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { NavBar } from "@/components/nav-bar";
import { TabBar } from "@/components/tab-bar";
import { CookieBanner } from "@/components/cookie-banner";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unlocked — your weird life · achieved",
  description: "Colecciona los logros más absurdos de tu vida.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
      .returns<{ username: string }[]>()
      .maybeSingle();
    username = data?.username ?? null;
  }

  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-white antialiased">
        <Script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "unlocked-rgcv.vercel.app"}
          src="https://plausible.io/js/script.js"
        />
        <NavBar />
        {children}
        <TabBar username={username} />
        <CookieBanner />
      </body>
    </html>
  );
}
