import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSaveTop5 } from "@/hooks/useYo";

interface Top5Item {
  id: string;
  emoji: string;
  title: string;
}

function SortableRow({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
      {...attributes}
      {...listeners}
      className="bg-surface rounded-xl p-3 cursor-grab active:cursor-grabbing flex items-center gap-3 border border-white/10"
    >
      {children}
    </div>
  );
}

export function Top5Editor({
  initial,
  available,
}: {
  initial: Top5Item[];
  available: Top5Item[];
}) {
  const [top5, setTop5] = useState<Top5Item[]>(initial);
  const saveMut = useSaveTop5();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const persist = (next: Top5Item[]) => {
    saveMut.mutate(next.map((i) => i.id));
  };

  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const oldIndex = top5.findIndex((i) => i.id === e.active.id);
    const newIndex = top5.findIndex((i) => i.id === e.over!.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const next = arrayMove(top5, oldIndex, newIndex);
    setTop5(next);
    persist(next);
  };

  const remove = (id: string) => {
    const next = top5.filter((i) => i.id !== id);
    setTop5(next);
    persist(next);
  };

  const add = (item: Top5Item) => {
    if (top5.length >= 5 || top5.some((i) => i.id === item.id)) return;
    const next = [...top5, item];
    setTop5(next);
    persist(next);
  };

  const remaining = available.filter((a) => !top5.some((t) => t.id === a.id));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-muted mb-2">
          Arrastra para reordenar.
        </p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={top5.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {top5.length === 0 && (
                <p className="text-muted text-sm">
                  Aún no has elegido tu Top 5. Añade desde tu colección abajo.
                </p>
              )}
              {top5.map((i) => (
                <SortableRow key={i.id} id={i.id}>
                  <div className="text-2xl">{i.emoji}</div>
                  <div className="flex-1 text-sm font-bold">{i.title}</div>
                  <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(i.id);
                    }}
                    className="text-red text-xs uppercase tracking-widest hover:text-red/70 transition"
                  >
                    Quitar
                  </button>
                </SortableRow>
              ))}
            </div>
          </SortableContext>
        </DndContext>
        {top5.length < 5 && (
          <p className="text-xs text-muted mt-2">
            Quedan {5 - top5.length} {5 - top5.length === 1 ? "hueco" : "huecos"}.
          </p>
        )}
      </div>

      {remaining.length > 0 && top5.length < 5 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted mb-2">
            Añadir desde tu colección
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {remaining.map((i) => (
              <button
                key={i.id}
                type="button"
                onClick={() => add(i)}
                className="bg-surface/50 rounded-xl p-3 text-left hover:bg-surface transition flex items-center gap-2"
              >
                <div className="text-xl">{i.emoji}</div>
                <div className="flex-1 text-xs font-bold leading-tight">{i.title}</div>
                <span className="text-indigo">+</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
