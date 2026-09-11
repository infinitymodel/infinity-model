import { Target, Eye, Factory } from "lucide-react";
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

        <section className="py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-3">
              <article className="rounded-3xl border border-zinc-200 p-8">
                <Eye className="h-8 w-8" />

                <h2 className="mt-7 text-2xl font-bold">
                  {isAr ? "رؤيتنا" : "Our Vision"}
                </h2>

                <p className="mt-5 leading-8 text-zinc-600">
                  {isAr
                    ? "بناء منصة مترابطة تجمع التصميم والنمذجة والتخصيص والتصنيع في تجربة واحدة."
                    : "To build a connected platform where design, prototyping, customization and manufacturing work together."}
                </p>
              </article>

              <article className="rounded-3xl border border-zinc-200 p-8">
                <Target className="h-8 w-8" />

                <h2 className="mt-7 text-2xl font-bold">
                  {isAr ? "مهمتنا" : "Our Mission"}
                </h2>

                <p className="mt-5 leading-8 text-zinc-600">
                  {isAr
                    ? "تقديم تصنيع رقمي عملي ومتاح يختصر المسافة بين الفكرة والنموذج والمنتج الحقيقي."
                    : "To provide practical and accessible digital manufacturing that reduces the distance between an idea, prototype and finished product."}
                </p>
              </article>

              <article className="rounded-3xl border border-zinc-200 p-8">
                <Factory className="h-8 w-8" />

                <h2 className="mt-7 text-2xl font-bold">
                  {isAr ? "ما نقوم به" : "What We Do"}
                </h2>

                <p className="mt-5 leading-8 text-zinc-600">
                  {isAr
                    ? "نربط التصميم الرقمي بالتصنيع الحقيقي من خلال الطباعة ثلاثية الأبعاد وCAD والنمذجة الأولية والتصنيع الرقمي."
                    : "We connect digital design with physical manufacturing through 3D printing, CAD, prototyping and digital fabrication."}
                </p>
              </article>
            </div>
          </Container>
        </section>
    </main>
  );
}
