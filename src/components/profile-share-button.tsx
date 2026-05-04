"use client";

import { useState } from "react";
import { ShareCardModal } from "./share-card-modal";

export function ProfileShareButton({
  username,
  total,
}: {
  username: string;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-gold/20 text-gold font-black rounded-full text-xs uppercase tracking-widest hover:bg-gold/30 transition"
      >
        Compartir colección
      </button>
      <ShareCardModal
        open={open}
        onClose={() => setOpen(false)}
        data={{ kind: "profile", username, total }}
      />
    </>
  );
}
