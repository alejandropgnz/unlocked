import { useState } from "react";
import { useAddStory } from "@/hooks/useAddStory";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";

interface Props {
  open: boolean;
  onClose: () => void;
  achievementId: string;
}

export function AddStoryModal({ open, onClose, achievementId }: Props) {
  const [body, setBody] = useState("");
  const addMut = useAddStory();

  const handleSubmit = () => {
    addMut.mutate(
      { achievementId, story: body },
      {
        onSuccess: () => {
          setBody("");
          onClose();
        },
      },
    );
  };

  return (
    <Modal open={open} onClose={() => !addMut.isPending && onClose()}>
      <h3 className="text-xl font-black tracking-tighter">Cuenta tu historia</h3>
      <p className="text-muted text-sm mt-2">
        Sube tu historia al foro. Solo una por logro.
      </p>
      <div className="mt-3">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={1000}
          rows={5}
          placeholder="¿Cómo pasó?"
          showCounter
        />
      </div>
      <div className="mt-4 flex gap-3">
        <Button
          variant="ghost"
          size="block"
          onClick={onClose}
          disabled={addMut.isPending}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          size="block"
          onClick={handleSubmit}
          disabled={addMut.isPending || body.trim().length === 0}
        >
          {addMut.isPending ? "..." : "Publicar"}
        </Button>
      </div>
    </Modal>
  );
}
