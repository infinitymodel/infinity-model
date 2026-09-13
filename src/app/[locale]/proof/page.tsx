import Image from "next/image";
import { ArrowUpRight, ExternalLink, ShieldCheck, Star } from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { sallaStoreUrl } from "@/data/store";
import { isValidLocale } from "@/i18n/config";

const reviews = [
  {
    name: "ندى الحسيني",
    quote: "وصلتني اليوم وطلعت جميلة متحمسة أجربها ❤️",
  },
  {
    name: "خالد الأحمد",
    quote: "اشتريت من هنا لعيالي وصراحة شئ لا يعلى عليه 👏",
  },
  {
    name: "خالد المسعودي",
    quote: "رهيبين يفكون أزمة. 👌",
  },
  {
    name: "عبدالعزيز اليامي",
    quote: "أحب هذا المتجر وتعاملهم الراقي مع العملاء ❤️",
  },
];

export default async function ProofPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const isAr = locale === "ar";
  const journey = [
    {
      number: "01",
      title: isAr ? "متطلبات واضحة" : "Clear requirements",
      description: isAr ? "نراجع الاستخدام والملف والأبعاد والخامة قبل التنفيذ." : "We review use case, file, dimensions and material before production.",
      image: "/images/showcase/applications-showcase.jpg",
    },
    {
      number: "02",
      title: isAr ? "تصنيع مضبوط" : "Controlled production",
      description: isAr ? "نختار التقنية ونضبط الإعدادات بما يناسب نتيجة المشروع." : "We select the process and settings to suit the project outcome.",
      image: "/images/showcase/printing-nozzle.jpg",
    },
    {
      number: "03",
      title: isAr ? "فحص قبل التسليم" : "Check before delivery",
      description: isAr ? "نراجع الشكل والوظيفة والأبعاد المطلوبة قبل التسليم." : "We review finish, function and required dimensions before delivery.",
      image: "/images/showcase/functional-bracket.jpg",
    },
  ];

  return (
    <main>
      <PageHeader
        locale={locale}
        tone="dark"
        eyebrow={isAr ? "الثقة والجودة" : "Trust & Quality"}
        title={isAr ? "وضوح في التنفيذ، وثقة في النتيجة." : "Clarity in execution, confidence in the result."}
        description={isAr ? "من أول متطلب حتى تسليم النتيجة، نبني كل مشروع على مراجعة واضحة وفحص مناسب لطبيعة الاستخدام." : "From the first requirement to delivery, every project is built on clear review and checks suited to its intended use."}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="im-eyebrow text-xs font-black text-[#a67d0b]">{isAr ? "مراجعات المتجر" : "Store reviews"}</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">{isAr ? "ماذا يقول عملاؤنا." : "What customers are saying."}</h2>
              <p className="mt-5 leading-8 text-zinc-600">{isAr ? "مراجعات منشورة في متجر Infinity Model الرسمي على سلة." : "Reviews published in Infinity Model’s official Salla store."}</p>
            </div>

            <a href={sallaStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-300 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white">
              {isAr ? "عرض المتجر والمراجعات" : "View store and reviews"}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((review) => (
              <blockquote key={review.name} className="im-premium-card rounded-[1.75rem] p-6">
                <div className="flex gap-1 text-[#c59b27]" aria-label={isAr ? "تقييم عميل" : "Customer review"}>
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />)}
                </div>
                <p className="mt-6 text-sm leading-7 text-zinc-700">“{review.quote}”</p>
                <footer className="mt-6 text-sm font-black text-zinc-950">{review.name}</footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="im-eyebrow text-xs font-black text-[#a67d0b]">{isAr ? "من الفكرة إلى القطعة" : "From idea to part"}</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">{isAr ? "رحلة تنفيذ قابلة للمراجعة." : "A reviewable production journey."}</h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {journey.map((item) => (
              <article key={item.number} className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                  <span className="absolute left-5 top-5 rounded-full bg-zinc-950 px-3 py-1.5 text-[10px] font-black tracking-[0.15em] text-[#e3bd50]">{item.number}</span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-black text-zinc-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-950 py-20 text-white sm:py-24">
        <Container>
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-zinc-950"><ShieldCheck className="h-5 w-5" /></div>
              <h2 className="mt-6 text-3xl font-black sm:text-4xl">{isAr ? "ابدأ بطلب واضح." : "Start with a clear request."}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-zinc-300">{isAr ? "أرسل الفكرة أو الملف والمقاسات والكمية المطلوبة لنساعدك في اختيار المسار الأنسب للمشروع." : "Send your idea or file, dimensions and required quantity so we can help select the right path for your project."}</p>
            </div>
            <a href={`/${locale}/contact`} className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-zinc-950 transition hover:bg-zinc-200">
              {isAr ? "اطلب عرض سعر" : "Request a quote"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
