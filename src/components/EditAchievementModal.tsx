import { useEffect, useState } from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { CATEGORIES } from "./CategoryPicker";
import { EmojiPickerInput } from "./EmojiPickerInput";
import { useUpdateAchievement, type CatalogItem, type AchievementUpdate } from "@/hooks/useAdmin";
import type { AchievementCategory, AchievementStatus } from "@/hooks/types";

const STATUS_OPTIONS: { value: AchievementStatus; label: string; hint: string }[] = [
  { value: "approved", label: "Aprobado (visible)", hint: "Aparece en feed, búsqueda y deck" },
  { value: "pending", label: "Pendiente (oculto)", hint: "Solo lo ve el creador y admin" },
  { value: "rejected", label: "Rechazado (oculto)", hint: "Soft-delete, no aparece en ningún sitio" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  item: CatalogItem | null;
}

/**
 * Admin edit modal for a single catalog achievement. All editable
 * fields in one form. Slug, unlock_count and id are read-only — slug
 * lives in URLs (changing it breaks /l/<slug> links and crawler HTML),
 * unlock_count is maintained by the bump_unlock_count trigger.
 *
 * Save only sends the diff (changed fields) to keep the UPDATE
 * payload minimal and the server-side audit trail (if any) cleaner.
 */
export function EditAchievementModal({ open, onClose, item }: Props) {
  const updateMut = useUpdateAchievement();

  // Local form state — initialized from `item` whenever the modal opens
  // with a different one.
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<AchievementCategory>("random");
  const [status, setStatus] = useState<AchievementStatus>("approved");

  useEffect(() => {
    if (!item) return;
    setTitle(item.title);
    setEmoji(item.emoji);
    setDescription(item.description ?? "");
    setCategory(item.category);
    setStatus(item.status);
  }, [item]);

  if (!item) return null;

  const dirty =
    title !== item.title ||
    emoji !== item.emoji ||
    description !== (item.description ?? "") ||
    category !== item.category ||
    status !== item.status;

  const handleSave = () => {
    if (!dirty) {
      onClose();
      return;
    }
    const updates: AchievementUpdate = {};
    if (title !== item.title) updates.title = title.trim();
    if (emoji !== item.emoji) updates.emoji = emoji.trim();
    if (description !== (item.description ?? "")) {
      // Empty string → null in DB, so the column doesn't end up storing
      // "" which would render an empty description block in the UI.
      const trimmed = description.trim();
      updates.description = trimmed.length > 0 ? trimmed : null;
    }
    if (category !== item.category) updates.category = category;
    if (status !== item.status) updates.status = status;

    updateMut.mutate(
      { id: item.id, updates },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-xl font-black tracking-tighter mb-4">Editar logro</h3>

      <div className="space-y-4">
        {/* Read-only metadata header — useful for context (which slug
            you're editing, how many times has been unlocked). */}
        <div className="bg-bg rounded-xl p-3 text-xs text-muted space-y-1 font-mono">
          <div>
            <span className="text-muted/60">slug:</span> {item.slug}
          </div>
          <div>
            <span className="text-muted/60">unlocks:</span>{" "}
            {item.unlock_count.toLocaleString("es-ES")}
          </div>
          <div>
            <span className="text-muted/60">creado:</span>{" "}
            {new Date(item.created_at).toLocaleDateString("es-ES")}
          </div>
        </div>

        {/* Emoji */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-bold">
            Emoji
          </label>
          <EmojiPickerInput value={emoji} onChange={setEmoji} />
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-bold">
            Título <span className="font-mono text-muted/60">{title.length}/80</span>
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-bold">
            Descripción
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={120}
            showCounter
            rows={2}
            placeholder="Frase corta, deadpan. Vacío para no mostrar."
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-bold">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as AchievementCategory)}
            className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2 font-bold">
            Estado
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as AchievementStatus)}
            className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-muted mt-1.5">
            {STATUS_OPTIONS.find((o) => o.value === status)?.hint}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-2">
        <Button
          variant="gold"
          size="block"
          onClick={handleSave}
          disabled={!dirty || updateMut.isPending}
        >
          {updateMut.isPending ? "Guardando..." : dirty ? "Guardar" : "Sin cambios"}
        </Button>
        <Button variant="ghost" size="block" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
