import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-7xl font-black tracking-tightest text-muted">404</p>
      <h1 className="text-2xl font-black tracking-tighter">Página no encontrada</h1>
      <p className="text-muted text-sm">Esta ruta no existe (o la borramos).</p>
      <Link to="/" className="text-gold underline text-sm mt-2">Ir al inicio →</Link>
    </div>
  );
}
