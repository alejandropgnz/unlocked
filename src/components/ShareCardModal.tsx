import { useEffect, useState } from "react";
import {
  captionForUnlock,
  captionForProfile,
  whatsappShare,
  twitterShare,
  instagramStoriesShare,
} from "@/lib/share";
import { trackEvent } from "@/hooks/useTrack";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Skeleton } from "./ui/Skeleton";

type ShareData =
  | {
      kind: "unlock";
      username: string;
      slug: string;
      title: string;
      rarityPercent: number;
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
  data: ShareData;
}) {
  const [origin, setOrigin] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [imgState, setImgState] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  // Reset image state whenever the modal reopens with new data
  useEffect(() => {
    if (open) setImgState("loading");
  }, [open, data]);

  if (!open) return null;

  const ogImageUrl =
    data.kind === "unlock"
      ? `${origin}/api/og-unlock?username=${encodeURIComponent(data.username)}&slug=${encodeURIComponent(data.slug)}`
      : `${origin}/api/og-profile?username=${encodeURIComponent(data.username)}`;

  const shareUrl =
    data.kind === "unlock"
      ? `${origin}/u/${data.username}/${data.slug}`
      : `${origin}/u/${data.username}`;

  const caption =
    data.kind === "unlock"
      ? captionForUnlock(data.title, data.rarityPercent, data.username)
      : captionForProfile(data.username, data.total);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${caption}\n${shareUrl}`);
    setCopied(true);
    void trackEvent("share_card_clicked", { kind: data.kind, platform: "copy" });
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = async () => {
    void trackEvent("share_card_downloaded", { kind: data.kind });
    const res = await fetch(ogImageUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unlocky-${data.username}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-xl font-black tracking-tighter mb-4">Compartir</h3>
      {/* Preview — width-capped at ~220px so the 9:16 image stays around 390px
          tall, which fits comfortably in the modal alongside the buttons.
          Buttons stay visible without scrolling on standard mobile viewports. */}
      <div className="relative mx-auto bg-bg rounded-xl overflow-hidden w-full max-w-[220px] aspect-[9/16]">
        {imgState === "loading" && (
          <Skeleton className="absolute inset-0 rounded-xl" />
        )}
        {imgState === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="text-3xl mb-2">🖼️</div>
            <p className="text-muted text-xs">
              No se pudo generar la card. Vuelve a intentarlo en un momento.
            </p>
          </div>
        )}
        {origin && (
          <img
            key={ogImageUrl}
            src={ogImageUrl}
            alt=""
            onLoad={() => setImgState("ready")}
            onError={() => setImgState("error")}
            className={
              imgState === "ready"
                ? "absolute inset-0 w-full h-full object-contain"
                : "opacity-0 w-0 h-0"
            }
          />
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button
          variant="primary"
          size="block"
          onClick={handleDownload}
          disabled={imgState !== "ready"}
        >
          Descargar PNG
        </Button>
        <a
          href={instagramStoriesShare(ogImageUrl)}
          onClick={() => void trackEvent("share_card_clicked", { kind: data.kind, platform: "instagram" })}
          className="py-3 bg-gradient-to-r from-red to-violet text-white font-black rounded-full text-xs uppercase tracking-widest text-center"
        >
          Stories IG
        </a>
        <a
          href={whatsappShare(`${caption}\n${shareUrl}`)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => void trackEvent("share_card_clicked", { kind: data.kind, platform: "whatsapp" })}
          className="py-3 bg-[#25D366] text-white font-black rounded-full text-xs uppercase tracking-widest text-center"
        >
          WhatsApp
        </a>
        <a
          href={twitterShare(`${caption}\n${shareUrl}`)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => void trackEvent("share_card_clicked", { kind: data.kind, platform: "twitter" })}
          className="py-3 bg-[#1DA1F2] text-white font-black rounded-full text-xs uppercase tracking-widest text-center"
        >
          Twitter
        </a>
      </div>
      <Button variant="ghost" size="block" className="mt-2" onClick={handleCopy}>
        {copied ? "✓ Copiado" : "Copiar texto + link"}
      </Button>
      <Button variant="ghost" size="block" className="mt-3 border-0" onClick={onClose}>
        Cerrar
      </Button>
    </Modal>
  );
}
