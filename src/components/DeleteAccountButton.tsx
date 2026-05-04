import { useState } from "react";
import { useDeleteAccount } from "@/hooks/useYo";
import { Button } from "./ui/Button";

export function DeleteAccountButton() {
  const deleteMut = useDeleteAccount();
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <Button variant="dangerSoft" onClick={() => setConfirming(true)}>
        Borrar mi cuenta
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-3 bg-surface rounded-xl p-4 border border-red/30">
      <p className="text-sm">
        ¿Seguro? Se borrarán todos tus logros, historias y respuestas. No se puede deshacer.
      </p>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() => setConfirming(false)}
          disabled={deleteMut.isPending}
        >
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={() => deleteMut.mutate()}
          disabled={deleteMut.isPending}
        >
          {deleteMut.isPending ? "..." : "Sí, borrar todo"}
        </Button>
      </div>
    </div>
  );
}
