"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LocaleNotFound() {
  const pathname = usePathname();

  const locale =
    pathname.startsWith("/en")
      ? "en"
      : "ar";

  const ar = locale === "ar";

  return (
    <main
      dir={ar ? "rtl" : "ltr"}
      className="flex min-h-[70vh] items-center justify-center px-5"
    >
      <div className="max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
          404
        </p>

        <h1 className="mt-4 text-5xl font-black tracking-tight text-zinc-950 sm:text-6xl">
          {ar
            ? "الصفحة غير موجودة"
            : "Page Not Found"}
        </h1>

        <p className="mt-5 text-base leading-7 text-zinc-600">
          {ar
            ? "يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            : "The page you are looking for does not exist or may have been moved."}
        </p>

        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex rounded-full bg-zinc-950 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800"
        >
          {ar
            ? "العودة للرئيسية"
            : "Back to Home"}
        </Link>
      </div>
    </main>
  );
}