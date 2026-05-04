import { useState } from "react";
import { Link } from "react-router-dom";
import { usePropose } from "@/hooks/usePropose";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CategoryPicker } from "@/components/CategoryPicker";
import { isEmojiOnly, emojiCount } from "@/lib/validators";
import { cn } from "@/lib/cn";

export default function Crear() {
  const proposeMut = usePropose();
  const [done, setDone] = useState(false);
  const [emoji, setEmoji] = useState("");

  const trimmed = emoji.trim();
  const onlyEmoji = trimmed.length === 0 || isEmojiOnly(trimmed);
  const count = emojiCount(trimmed);
  const emojiValid = trimmed.length > 0 && onlyEmoji && count >= 1 && count <= 3;

  const emojiHint = (() => {
    if (trimmed.length === 0) return "1 a 3 emojis. Solo emojis, sin letras ni números.";
    if (!onlyEmoji) return "Solo emojis (sin letras, números ni símbolos)";
    if (count > 3) return "Máximo 3 emojis";
    if (count === 0) return "Pon al menos 1 emoji";
    return `${count}/3`;
  })();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    proposeMut.mutate(
      {
        title: String(fd.get("title") ?? ""),
        emoji: String(fd.get("emoji") ?? ""),
        description: String(fd.get("description") ?? ""),
        category: String(fd.get("category") ?? ""),
      },
      { onSuccess: () => setDone(true) },
    );
  };

  if (done) {
    return (
      <section className="px-4 md:px-8 max-w-xl mx-auto py-10 text-center">
        <div className="text-6xl mb-4">📨</div>
        <h1 className="text-3xl font-black tracking-tighter">En revisión</h1>
        <p className="text-muted mt-2 text-sm">
          Si pasa la moderación, te lo desbloqueamos automáticamente.
        </p>
        <Link to="/" className="mt-6 inline-block underline">
          Volver al inicio
        </Link>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-8 max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-black tracking-tighter">Proponer un logro</h1>
      <p className="text-muted mt-2 text-sm">
        Si lo aprobamos, todo el mundo podrá desbloquearlo. Tú lo recibirás automáticamente.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-muted">Título</label>
          <div className="mt-1">
            <Input name="title" maxLength={80} required placeholder="Ej: Me dormí en una boda" />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-muted">Emoji</label>
          <input
            name="emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            maxLength={32}
            required
            placeholder="😴"
            className="mt-1 w-32 bg-bg border border-white/10 rounded-xl p-3 text-2xl text-center focus:border-gold focus:outline-none"
          />
          <p
            className={cn(
              "text-[10px] mt-1",
              trimmed.length === 0
                ? "text-muted"
                : emojiValid
                  ? "text-green-400"
                  : "text-red",
            )}
          >
            {emojiHint}
          </p>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-muted">
            Descripción (opcional)
          </label>
          <div className="mt-1">
            <Textarea
              name="description"
              maxLength={200}
              rows={3}
              placeholder="Una línea explicándolo..."
            />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-muted">Categoría</label>
          <div className="mt-1">
            <CategoryPicker name="category" />
          </div>
        </div>
        <Button
          type="submit"
          size="block"
          disabled={proposeMut.isPending || !emojiValid}
        >
          {proposeMut.isPending ? "..." : "Proponer"}
        </Button>
      </form>
    </section>
  );
}
