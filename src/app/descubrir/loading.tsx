export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-6 md:py-10">
      <div className="h-8 w-32 bg-white/10 rounded mx-auto mb-6 md:mb-8 animate-pulse" />
      <div className="relative w-full max-w-sm mx-auto h-[520px]">
        <div className="absolute inset-0 bg-surface border border-white/10 rounded-3xl animate-pulse" />
      </div>
    </main>
  );
}
