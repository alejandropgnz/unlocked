"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(localStorage.getItem("ck-ack") !== "1");
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 inset-x-4 md:inset-x-auto md:right-4 md:max-w-sm bg-surface border border-white/10 rounded-2xl p-4 z-30 shadow-lg">
      <p className="text-xs">
        Solo usamos cookies necesarias para mantenerte logueado. Sin tracking.
      </p>
      <div className="mt-2 flex gap-2 items-center">
        <button
          onClick={() => {
            localStorage.setItem("ck-ack", "1");
            setShow(false);
          }}
          className="px-3 py-1 bg-white text-bg font-black text-xs uppercase rounded-full tracking-widest hover:bg-gold transition"
        >
          OK
        </button>
        <Link href="/legal" className="text-xs text-muted underline hover:text-white">
          Más info
        </Link>
      </div>
    </div>
  );
}
