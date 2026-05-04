"use client";

import { useEffect, useState } from "react";
import {
  captionForUnlock,
  captionForProfile,
  whatsappShare,
  twitterShare,
  instagramStoriesShare,
} from "@/lib/share";
import { trackClient } from "@/lib/track";

type Kind =
  | {
      kind: "unlock";
      unlockId: string;
      title: string;
      rarityPercent: number;
      username: string;
    }
  | {
      kind: "profile";
      username: string;
      total: number;
    };

export function ShareCardModal({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: Kind;
}) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  if (!open) return null;

  const ogImageUrl =
    data.kind === "unlock"
      ? `${origin}/og/unlock/${data.unlockId}`
      : `${origin}/og/profile/${data.username}`;

  const caption =
    data.kind === "unlock"
      ? captionForUnlock(data.title, data.rarityPercent, data.username)
      : captionForProfile(data.username, data.total);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${caption}\n${origin}/u/${data.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = async () => {
    void trackClient("share_card_downloaded", { kind: data.kind, username: data.username });
    const res = await fetch(ogImageUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unlocked-${data.username}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-end md:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-black tracking-tighter mb-4">Compartir</h3>
        {origin && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={ogImageUrl}
            alt=""
            className="w-full aspect-[9/16] bg-bg rounded-xl object-cover"
          />
        )}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={handleDownload}
            className="py-3 bg-white text-bg font-black rounded-full text-xs uppercase tracking-widest hover:bg-gold transition"
          >
            Descargar PNG
          </button>
          <a
            href={instagramStoriesShare(ogImageUrl)}
            onClick={() => void trackClient("share_card_clicked", { platform: "instagram", kind: data.kind })}
            className="py-3 bg-gradient-to-r from-red to-violet text-white font-black rounded-full text-xs uppercase tracking-widest text-center"
          >
            Stories IG
          </a>
          <a
            href={whatsappShare(`${caption}\n${origin}/u/${data.username}`)}
            onClick={() => void trackClient("share_card_clicked", { platform: "whatsapp", kind: data.kind })}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 bg-[#25D366] text-white font-black rounded-full text-xs uppercase tracking-widest text-center"
          >
            WhatsApp
          </a>
          <a
            href={twitterShare(`${caption}\n${origin}/u/${data.username}`)}
            onClick={() => void trackClient("share_card_clicked", { platform: "twitter", kind: data.kind })}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 bg-[#1DA1F2] text-white font-black rounded-full text-xs uppercase tracking-widest text-center"
          >
            Twitter
          </a>
        </div>
        <button
          onClick={handleCopy}
          className="mt-2 w-full py-3 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:border-gold transition"
        >
          {copied ? "✓ Copiado" : "Copiar texto + link"}
        </button>
        <button
          onClick={onClose}
          className="mt-3 w-full py-3 text-muted text-sm hover:text-white transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
