import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
          404
        </p>

        <h1 className="mt-4 text-5xl font-black tracking-tight text-zinc-950">
          Page Not Found
        </h1>

        <p className="mt-5 max-w-md text-zinc-600">
          The page you are looking for does not exist.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/ar"
            className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white hover:bg-zinc-800"
          >
            العربية
          </Link>

          <Link
            href="/en"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-zinc-100"
          >
            English
          </Link>
        </div>
      </div>
    </main>
  );
}