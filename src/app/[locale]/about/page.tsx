import {
  CheckCircle2,
  Factory,
  Lightbulb,
  Target,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Navbar from "@/components/layout/Navbar";

import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

const translations: Record<Locale, typeof ar> = {
  ar,
  en,
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const t = translations[locale];
  const isAr = locale === "ar";

  return (
    <>
      <Navbar locale={locale} labels={t.navigation} />

      <main>
        <section className="bg-zinc-950 py-24 text-white">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {isAr ? "عن Infinity Model" : "ABOUT INFINITY MODEL"}
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
              {isAr
                ? "نربط بين الأفكار والواقع"
                : "Bridging Ideas and Reality"}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
              {isAr
                ? "Infinity Model هو استوديو للتصنيع الرقمي يجمع التصميم والتصنيع بالإضافة والنمذجة الأولية والتصنيع الرقمي."
                : "Infinity Model is a digital manufacturing studio combining design, additive manufacturing, prototyping and digital fabrication."}
            </p>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-zinc-200 p-8">
                <Lightbulb className="h-7 w-7" />

                <h2 className="mt-6 text-2xl font-bold">
                  {isAr ? "التصميم" : "Design"}
                </h2>

                <p className="mt-4 leading-7 text-zinc-600">
                  {isAr
                    ? "تحويل الأفكار إلى نماذج قابلة للتصنيع."
                    : "Convert ideas into manufacturable digital models."}
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-200 p-8">
                <Target className="h-7 w-7" />

                <h2 className="mt-6 text-2xl font-bold">
                  {isAr ? "النموذج الأولي" : "Prototype"}
                </h2>

                <p className="mt-4 leading-7 text-zinc-600">
                  {isAr
                    ? "اختبار الأفكار بسرعة قبل الإنتاج الأكبر."
                    : "Test ideas quickly before larger production."}
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-200 p-8">
                <Factory className="h-7 w-7" />

                <h2 className="mt-6 text-2xl font-bold">
                  {isAr ? "التصنيع" : "Manufacture"}
                </h2>

                <p className="mt-4 leading-7 text-zinc-600">
                  {isAr
                    ? "إنتاج منتجات مخصصة وكميات صغيرة."
                    : "Produce customized products and small batches."}
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-zinc-50 py-24">
          <Container>
            <div className="max-w-4xl">
              <h2 className="text-4xl font-bold">
                {isAr ? "مهمتنا" : "Our Mission"}
              </h2>

              <p className="mt-6 text-lg leading-8 text-zinc-600">
                {isAr
                  ? "جعل التصنيع الرقمي المتقدم عملياً ومتاحاً ومتمحوراً حول العميل، مع استخدام التقنية المناسبة لكل تطبيق."
                  : "Make advanced digital manufacturing accessible, practical and customer-focused, using the right technology for the right application."}
              </p>

              <div className="mt-10 space-y-4">
                {[
                  isAr
                    ? "نتائج احترافية من خلال workflows منضبطة."
                    : "Professional results through disciplined workflows.",
                  isAr
                    ? "تقليل المسافة بين الفكرة والنموذج والمنتج."
                    : "Reduce the distance between idea, prototype and product.",
                  isAr
                    ? "تحسين مستمر للماكينات والخامات والعمليات."
                    : "Continuously improve machines, materials and processes.",
                  isAr
                    ? "بناء علاقات طويلة الأمد من خلال الجودة والشفافية."
                    : "Build long-term relationships through quality and transparency.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" />
                    <span className="text-zinc-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}