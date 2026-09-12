"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const isArabic = params.locale !== "en";

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="flex min-h-[70vh] items-center justify-center px-5">
      <section className="max-w-xl rounded-[2rem] border border-zinc-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c59b27]/15 text-[#927118]">
          <AlertTriangle className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-black tracking-tight text-zinc-950">
          {isArabic ? "حدث خطأ غير متوقع" : "Something went wrong"}
        </h1>
        <p className="mt-4 leading-7 text-zinc-600">
          {isArabic
            ? "لم نتمكن من عرض هذه الصفحة الآن. يمكنك المحاولة مرة أخرى، أو التواصل معنا إذا استمرت المشكلة."
            : "We could not display this page right now. Please try again, or contact us if the problem persists."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {isArabic ? "حاول مرة أخرى" : "Try again"}
        </button>
      </section>
    </main>
  );
}
