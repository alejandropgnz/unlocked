export default function Loading() {
  return (
    <main className="min-h-screen">
      <section className="px-4 md:px-8 max-w-5xl mx-auto py-8">
        <div className="flex items-center gap-4 pb-6 border-b border-white/10 animate-pulse">
          <div className="w-24 h-24 rounded-full bg-white/10 flex-shrink-0" />
          <div className="flex-1">
            <div className="h-3 w-24 bg-white/10 rounded" />
            <div className="h-8 w-48 bg-white/10 rounded mt-2" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-surface rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    </main>
  );
}
