import Link from "next/link";
import { ArrowRight, Box, Sparkles } from "lucide-react";

interface HeroProps {
  locale: string;
  content: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
}

export default function Hero({
  locale,
  content,
}: HeroProps) {
  const ar = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-zinc-100 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className={ar ? "lg:order-2" : ""}>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600 shadow-sm">
            <Sparkles className="h-4 w-4" />
            {content.eyebrow}
          </div>

          <h1 className="mt-7 max-w-3xl text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
            {content.description}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              {content.primary}

              <ArrowRight
                className={`ms-2 h-4 w-4 ${
                  ar ? "rotate-180" : ""
                }`}
              />
            </Link>

            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-7 py-4 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
            >
              {content.secondary}
            </Link>
          </div>
        </div>

        <div className={ar ? "lg:order-1" : ""}>
          <div className="relative mx-auto max-w-xl">
            <div className="absolute -inset-5 rounded-[3rem] bg-zinc-100 blur-2xl" />

            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-zinc-950 p-6 shadow-2xl sm:p-8">
              <div className="absolute right-8 top-8 h-32 w-32 rounded-full border border-zinc-800" />
              <div className="absolute bottom-8 left-8 h-20 w-20 rounded-full border border-zinc-800" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
                    INFINITY MODEL
                  </span>

                  <Box className="h-6 w-6 text-zinc-400" />
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative flex h-56 w-56 items-center justify-center rounded-[3rem] border border-zinc-700 bg-zinc-900 shadow-2xl">
                    <div className="h-36 w-36 rotate-45 rounded-[2rem] border border-zinc-600 bg-zinc-800 shadow-xl" />

                    <div className="absolute h-20 w-20 rotate-45 rounded-xl border border-zinc-500 bg-zinc-700" />
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Design • Prototype • Manufacture
                  </p>

                  <div className="mt-4 h-px bg-zinc-800" />
                  <p className="mt-4 text-sm leading-6 text-zinc-400">
                    {ar
                      ? "من النموذج الرقمي إلى المنتج الحقيقي."
                      : "From digital model to physical product."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}