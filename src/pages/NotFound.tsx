import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <div className="text-6xl mb-4">🔒</div>
      <h1 className="text-3xl font-black tracking-tighter">No encontrado</h1>
      <p className="text-muted mt-2">No existe esa página.</p>
      <Link to="/" className="mt-6 underline text-sm">
        Volver al inicio
      </Link>
    </section>
  );
}
