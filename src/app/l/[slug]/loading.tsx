export default function Loading() {
  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto">
      <div className="text-muted text-sm">← Volver</div>
      <div className="mt-6 rounded-[18px] p-[3px] bg-grey">
        <div className="bg-surface rounded-[15px] p-8 md:p-12 text-center animate-pulse">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="h-3 w-20 bg-white/10 rounded" />
            <div className="h-3 w-16 bg-white/10 rounded" />
          </div>
          <div className="text-8xl mb-6 opacity-30">⬛</div>
          <div className="h-8 w-3/4 bg-white/10 rounded mx-auto" />
          <div className="h-4 w-1/2 bg-white/10 rounded mx-auto mt-4" />
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="h-12 w-40 bg-white/10 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </main>
  );
}
