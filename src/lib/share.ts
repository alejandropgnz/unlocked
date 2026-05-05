export function captionForUnlock(
  title: string,
  rarityPercent: number,
  username: string,
): string {
  return `Acabo de desbloquear: ${title} (solo el ${rarityPercent.toFixed(2)}% lo tiene 💀) — descubre los tuyos en unlocky.app/u/${username}`;
}

export function captionForProfile(username: string, total: number): string {
  return `Mi colección de ${total} ${total === 1 ? "logro" : "logros"} absurdos en Unlocky. Ven a por los tuyos: unlocky.app/u/${username}`;
}

export function whatsappShare(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function twitterShare(text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function instagramStoriesShare(imageUrl: string, appId = "0"): string {
  return `instagram-stories://share?source_application=${appId}&background_image=${encodeURIComponent(imageUrl)}`;
}

export function siteOrigin(): string {
  return import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:5173";
}
