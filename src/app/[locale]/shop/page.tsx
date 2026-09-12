import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Layers3,
  Printer,
  Wrench,
} from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

import { products } from "@/data/products";
import {
  sallaCustomPrintingUrl,
  sallaReadyProductsUrl,
} from "@/data/store";

import { isValidLocale } from "@/i18n/config";

const supplies = [
  {
    key: "printers",
    icon: Printer,
    image: "/images/showcase/printer-x2d.jpg",
    title: "3D Printers",
    titleAr: "الطابعات ثلاثية الأبعاد",
    description: "FDM and resin printing systems for makers, designers and production teams.",
    descriptionAr: "طابعات FDM وريزن للمصممين وصنّاع النماذج وفرق الإنتاج.",
  },
  {
    key: "filaments",
    icon: Layers3,
    image: "/images/showcase/blue-filament-spools.jpg",
    title: "Filaments & Resin",
    titleAr: "الفيلمنتات والريزن",
    description: "Materials selected for prototypes, functional parts, models and display pieces.",
    descriptionAr: "خامات مختارة للنماذج الأولية والقطع الوظيفية والمجسمات وقطع العرض.",
  },
  {
    key: "spares",
    icon: Wrench,
    image: "/images/showcase/printing-nozzle.jpg",
    title: "Spare Parts & Accessories",
    titleAr: "قطع الغيار والإكسسوارات",
    description: "Essential replacements, nozzles, build surfaces and printer care accessories.",
    descriptionAr: "قطع استبدال أساسية وفوهات وأسـطح طباعة وإكسسوارات عناية بالطابعات.",
  },
];

export default async function ShopPage({
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
        eyebrow={isAr ? "المتجر" : "Shop"}
        title={isAr ? "منتجات جاهزة، مصنوعة بدقة." : "Ready-made products, precisely made."}
        description={isAr ? "منتجات جاهزة وقطع مخصصة مصنعة باستخدام تقنيات التصنيع الرقمي." : "Ready-made products and custom pieces created through digital manufacturing."}
      />

        <section className="py-20 sm:py-24">
          <Container>
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#c59b27]">
                {isAr ? "01 — متجر سلة الرسمي" : "01 — Official Salla Store"}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                {isAr ? "منتجات جاهزة وخدمة طباعة حسب الطلب." : "Ready-made products and print-on-demand service."}
              </h2>
              <p className="mt-4 text-base leading-8 text-zinc-600">
                {isAr ? "استعرض المنتجات المتاحة وأسعارها مباشرةً في متجر Infinity Model على سلة. الصور التالية نماذج من أعمالنا وتطبيقات الطباعة التي ننفذها." : "Browse current products and prices in Infinity Model’s Salla store. The images below are examples of the work and print applications we produce."}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={sallaReadyProductsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
                >
                  {isAr ? "تسوّق المنتجات الجاهزة" : "Shop ready-made products"}
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={sallaCustomPrintingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
                >
                  {isAr ? "اطلب طباعة مخصصة" : "Request custom printing"}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => {
                const badge = isAr ? product.badgeAr || product.badge : product.badge;

                return (
                  <a
                    key={product.id}
                  href={sallaReadyProductsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >
                  <div className="relative aspect-square overflow-hidden bg-zinc-100">
                    {badge && (
                      <span className="absolute left-4 top-4 z-10 rounded-full bg-zinc-950 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {badge}
                      </span>
                    )}

                    <Image
                      src={product.image}
                      alt={isAr ? product.nameAr : product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-zinc-400">
                      {product.material}
                    </p>

                    <h2 className="mt-2 font-bold text-zinc-950">
                      {isAr ? product.nameAr : product.name}
                    </h2>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-bold text-zinc-950">
                        {product.price > 0 ? `${product.price} ${product.currency}` : isAr ? "اطلب السعر" : "Request quote"}
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 transition group-hover:bg-zinc-950 group-hover:text-white">
                        <ArrowRight
                          className={`h-4 w-4 ${
                            isAr ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </div>
                  </div>
                  </a>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="border-y border-zinc-200 bg-zinc-50 py-20 sm:py-24">
          <Container>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#c59b27]">
                  {isAr ? "02 — تجهيزات الطباعة" : "02 — Printing Supplies"}
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                  {isAr ? "الطابعات والخامات وقطع الغيار." : "Printers, materials and spare parts."}
                </h2>
                <p className="mt-4 text-base leading-8 text-zinc-600">
                  {isAr ? "نساعدك في اختيار التجهيز المناسب، سواء كنت تبدأ أول طباعة أو توسّع ورشة إنتاجك." : "We help you choose the right setup, whether you are making your first print or expanding a production workshop."}
                </p>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800"
              >
                {isAr ? "اسأل عن التوفر والأسعار" : "Ask about availability"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {supplies.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.key} className="group overflow-hidden rounded-[2rem] border border-zinc-200 bg-white">
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={isAr ? item.titleAr : item.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="im-dark-grid flex h-full items-center justify-center">
                          <Icon className="h-14 w-14 text-[#c59b27]" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent" />
                    </div>
                    <div className="p-7">
                      <div className="flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-black text-zinc-300">0{supplies.indexOf(item) + 1}</span>
                      </div>
                      <h3 className="mt-7 text-xl font-black text-zinc-950">{isAr ? item.titleAr : item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-zinc-600">{isAr ? item.descriptionAr : item.description}</p>
                      <Link href={`/${locale}/contact`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-950">
                        {isAr ? "اطلب التفاصيل" : "Request details"}
                        <ArrowRight className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>
    </main>
  );
}
