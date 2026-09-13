import Image from "next/image";
import { Target, Eye, Factory, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

import { isValidLocale } from "@/i18n/config";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const isAr = locale === "ar";

  return (
    <main>
      <PageHeader
        locale={locale}
        eyebrow={isAr ? "من نحن" : "About"}
        title={isAr ? "نبني الجسر بين الفكرة والواقع." : "Bridging ideas and physical reality."}
        description={isAr ? "استوديو للتصنيع الرقمي يجمع بين التصميم والتصنيع بالإضافة والنمذجة الأولية." : "A digital manufacturing studio combining design, additive manufacturing and rapid prototyping."}
      />

        <section className="bg-zinc-50 py-20 sm:py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
              <article className="relative min-h-[25rem] overflow-hidden rounded-[2rem] bg-zinc-950 p-8 text-white sm:p-10">
                <Image
                  src="/images/showcase/printer-x2d-workshop.jpg"
                  alt={isAr ? "ورشة Infinity Model" : "Infinity Model workshop"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/10" />
                <div className="relative flex h-full flex-col justify-end">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-[#e3bd50]">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="im-eyebrow mt-7 text-xs font-black text-[#e3bd50]">
                    {isAr ? "INFINITY MODEL" : "INFINITY MODEL"}
                  </p>
                  <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                    {isAr ? "تصميم واضح. تنفيذ ملموس." : "Clear design. Tangible execution."}
                  </h2>
                  <p className="mt-4 max-w-md leading-8 text-zinc-300">
                    {isAr ? "نربط الفكرة والملف الرقمي بالتقنية المناسبة للوصول إلى نتيجة قابلة للاستخدام والعرض." : "We connect an idea or digital file to the right process for a result that can be used and presented."}
                  </p>
                </div>
              </article>

              <div className="grid gap-5 sm:grid-cols-2 sm:content-start">
                <article className="im-surface im-interactive-card rounded-[1.75rem] p-7 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-[#e3bd50]"><Eye className="h-5 w-5" aria-hidden="true" /></span>

                <h2 className="mt-6 text-2xl font-black text-zinc-950">
                  {isAr ? "رؤيتنا" : "Our Vision"}
                </h2>

                <p className="mt-5 leading-8 text-zinc-600">
                  {isAr
                    ? "بناء منصة مترابطة تجمع التصميم والنمذجة والتخصيص والتصنيع في تجربة واحدة."
                    : "To build a connected platform where design, prototyping, customization and manufacturing work together."}
                </p>
                </article>

                <article className="im-surface im-interactive-card rounded-[1.75rem] p-7 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-[#e3bd50]"><Target className="h-5 w-5" aria-hidden="true" /></span>

                <h2 className="mt-6 text-2xl font-black text-zinc-950">
                  {isAr ? "مهمتنا" : "Our Mission"}
                </h2>

                <p className="mt-5 leading-8 text-zinc-600">
                  {isAr
                    ? "تقديم تصنيع رقمي عملي ومتاح يختصر المسافة بين الفكرة والنموذج والمنتج الحقيقي."
                    : "To provide practical and accessible digital manufacturing that reduces the distance between an idea, prototype and finished product."}
                </p>
                </article>

                <article className="im-surface im-interactive-card rounded-[1.75rem] p-7 sm:col-span-2 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-[#e3bd50]"><Factory className="h-5 w-5" aria-hidden="true" /></span>

                <h2 className="mt-6 text-2xl font-black text-zinc-950">
                  {isAr ? "ما نقوم به" : "What We Do"}
                </h2>

                <p className="mt-5 leading-8 text-zinc-600">
                  {isAr
                    ? "نربط التصميم الرقمي بالتصنيع الحقيقي من خلال الطباعة ثلاثية الأبعاد وCAD والنمذجة الأولية والتصنيع الرقمي."
                    : "We connect digital design with physical manufacturing through 3D printing, CAD, prototyping and digital fabrication."}
                </p>
                </article>
              </div>
            </div>
          </Container>
        </section>
    </main>
  );
}
