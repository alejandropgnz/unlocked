import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <div className="text-6xl mb-4">🔒</div>
      <h1 className="text-3xl font-black tracking-tighter">Logro no encontrado</h1>
      <p className="text-muted mt-2">Igual no se ha desbloqueado todavía.</p>
      <Link href="/" className="mt-6 underline text-sm">Volver al inicio</Link>
    </main>
  );
}
