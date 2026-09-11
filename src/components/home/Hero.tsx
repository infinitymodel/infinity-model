import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Box,
  ChevronRight,
  Cpu,
  Layers3,
} from "lucide-react";

interface HeroProps {
  locale: string;
  content: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export default function Hero({
  locale,
  content,
}: HeroProps) {
  const ar = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 im-dark-grid opacity-60" />

      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-white/[0.03] blur-3xl" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#c59b27]/10 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-[13%] top-1/2 h-[760px] w-[760px] -translate-y-1/2 opacity-[0.07] mix-blend-screen sm:h-[920px] sm:w-[920px]">
          <Image
            src="/images/brand/infinity-model-mark.png"
            alt=""
            fill
            sizes="920px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid min-h-[680px] items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          {/* Content */}

          <div className={ar ? "lg:order-2" : ""}>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#c59b27]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">
                {content.eyebrow}
              </span>
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {content.title}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              {content.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200"
              >
                {content.primaryCta}

                {ar ? (
                  <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Link>

              <Link
                href={`/${locale}/shop`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.08]"
              >
                {content.secondaryCta}

                <ChevronRight
                  className={[
                    "h-4 w-4",
                    ar ? "rotate-180" : "",
                  ].join(" ")}
                />
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-white/10 py-5">
              <div>
                <p className="text-2xl font-black">
                  3D
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {ar
                    ? "تصنيع إضافي"
                    : "Additive Manufacturing"}
                </p>
              </div>

              <div className="border-x border-white/10 px-4">
                <p className="text-2xl font-black">
                  CAD
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {ar
                    ? "تصميم هندسي"
                    : "Engineering Design"}
                </p>
              </div>

              <div className={ar ? "pr-4" : "pl-4"}>
                <p className="text-2xl font-black">
                  CNC
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {ar
                    ? "تصنيع رقمي"
                    : "Digital Fabrication"}
                </p>
              </div>
            </div>
          </div>

          {/* Visual */}

          <div
            className={[
              "relative",
              ar ? "lg:order-1" : "",
            ].join(" ")}
          >
            <div className="relative mx-auto aspect-square max-w-[560px]">
              {/* Main frame */}

              <div className="absolute inset-[7%] rounded-[3rem] border border-white/10 bg-white/[0.025] backdrop-blur-sm" />

              <div className="absolute inset-[15%] rounded-[2.5rem] border border-white/10 bg-zinc-900/70" />

              <div className="absolute inset-[16%] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
                <Image
                  src="/images/services/3d-printing/resin-printer.jpg"
                  alt={ar ? "طابعة ريزن ثلاثية الأبعاد" : "Resin 3D printer at Infinity Model"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 text-xs font-bold text-white">
                  <Box className="h-4 w-4 text-[#c59b27]" />
                  {ar ? "طباعة دقيقة، من الفكرة إلى النموذج" : "Precision printing, from idea to prototype"}
                </div>
              </div>

              {/* Floating labels */}

              <div className="absolute left-0 top-[22%] rounded-2xl border border-white/10 bg-zinc-900/90 p-4 shadow-2xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-[#c59b27]" />

                  <div>
                    <p className="text-xs font-bold">
                      CAD / CAM
                    </p>

                    <p className="mt-1 text-[10px] text-zinc-500">
                      {ar
                        ? "Digital Design"
                        : "Digital Design"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[19%] right-0 rounded-2xl border border-white/10 bg-zinc-900/90 p-4 shadow-2xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <Layers3 className="h-5 w-5 text-[#c59b27]" />

                  <div>
                    <p className="text-xs font-bold">
                      3D PRINT
                    </p>

                    <p className="mt-1 text-[10px] text-zinc-500">
                      {ar
                        ? "Physical Reality"
                        : "Physical Reality"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Orbit */}

              <div className="absolute inset-[3%] rounded-full border border-dashed border-white/10" />

              <div className="absolute right-[12%] top-[8%] h-3 w-3 rounded-full bg-[#c59b27] shadow-[0_0_25px_rgba(197,155,39,0.7)]" />

              <div className="absolute bottom-[9%] left-[13%] h-2 w-2 rounded-full bg-white/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
