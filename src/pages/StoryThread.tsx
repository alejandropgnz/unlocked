import { useParams } from "react-router-dom";

export default function StoryThread() {
  const { id } = useParams<{ id: string }>();
  return (
    <section className="px-4 md:px-8 py-10">
      <h1 className="text-3xl font-black tracking-tightest">Historia</h1>
      <p className="text-muted mt-2 text-sm">ID: {id}</p>
      <p className="mt-6 text-muted">Placeholder — se implementa en Phase 3.</p>
    </section>
  );
}
