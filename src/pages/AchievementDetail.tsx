import { useParams } from "react-router-dom";

export default function AchievementDetail() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <section className="px-4 md:px-8 py-10">
      <h1 className="text-3xl font-black tracking-tightest">Detalle de logro</h1>
      <p className="text-muted mt-2 text-sm">Slug: {slug}</p>
      <p className="mt-6 text-muted">Placeholder — se implementa en Phase 3.</p>
    </section>
  );
}
