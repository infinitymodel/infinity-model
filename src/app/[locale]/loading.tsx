export default function LocaleLoading() {
  return (
    <main
      className="min-h-[70vh] animate-pulse bg-white"
      aria-label="Loading page"
      aria-busy="true"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="h-4 w-28 rounded-full bg-zinc-200" />
        <div className="mt-6 h-14 max-w-2xl rounded-2xl bg-zinc-200" />
        <div className="mt-4 h-5 max-w-xl rounded-full bg-zinc-100" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-72 rounded-3xl border border-zinc-100 bg-zinc-50"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
