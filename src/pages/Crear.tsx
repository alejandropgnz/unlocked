import { useState } from "react";
import { Link } from "react-router-dom";
import { usePropose } from "@/hooks/usePropose";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CategoryPicker } from "@/components/CategoryPicker";
import { EmojiPickerInput } from "@/components/EmojiPickerInput";
import { isEmojiOnly, emojiCount } from "@/lib/validators";

export default function Crear() {
  const proposeMut = usePropose();
  const [done, setDone] = useState(false);
  const [emoji, setEmoji] = useState("");

  const trimmed = emoji.trim();
  const onlyEmoji = trimmed.length === 0 || isEmojiOnly(trimmed);
  const count = emojiCount(trimmed);
  const emojiValid = trimmed.length > 0 && onlyEmoji && count >= 1 && count <= 3;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    proposeMut.mutate(
      {
        title: String(fd.get("title") ?? ""),
        emoji: String(fd.get("emoji") ?? ""),
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
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-xs uppercase tracking-widest text-muted mb-1.5"
          >
            Título
          </label>
          <Input
            id="title"
            name="title"
            maxLength={80}
            required
            placeholder="Ej: Me dormí en una boda"
          />
        </div>

        <div>
          {/* Hint moved next to the label so the field below stays clean.
              The label is the contract for the field, the hint is short
              guidance — both fit on one line on phone screens. */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <label
              htmlFor="emoji"
              className="text-xs uppercase tracking-widest text-muted"
            >
              Emoji
            </label>
            <span className="text-[10px] text-muted/80 normal-case tracking-normal">
              Resume el logro con 1-3 emojis
            </span>
          </div>
          {/* Hidden input so FormData picks up the value on submit. The
              picker component drives the controlled state. */}
          <input type="hidden" name="emoji" value={emoji} />
          <EmojiPickerInput value={emoji} onChange={setEmoji} />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-xs uppercase tracking-widest text-muted mb-1.5"
          >
            Categoría
          </label>
          <CategoryPicker id="category" name="category" />
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
