import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Layers3,
  Ruler,
  Settings,
  ShieldCheck,
  Zap,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

import {
  getService,
  services,
} from "@/data/services";

import { isValidLocale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.flatMap((service) =>
    ["ar", "en"].map((locale) => ({
      locale,
      slug: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) return {};

  const service = getService(slug);
  if (!service) return {};

  const ar = locale === "ar";

  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: ar ? service.titleAr : service.title,
    description: ar ? service.shortDescriptionAr : service.shortDescription,
    image: service.image,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const isAr = locale === "ar";

  const title = isAr
    ? service.titleAr
    : service.title;

  const description = isAr
    ? service.descriptionAr
    : service.description;

  const features = isAr
    ? service.featuresAr
    : service.features;

  const projectBrief = [
    {
      icon: FileText,
      title: isAr ? "الفكرة أو الملف" : "Idea or file",
      description: isAr ? "شارك الملف أو الصورة أو شرحاً مبسطاً للاستخدام المطلوب." : "Share a file, reference image or a short description of the intended use.",
    },
    {
      icon: Ruler,
      title: isAr ? "الأبعاد والكمية" : "Dimensions and quantity",
      description: isAr ? "حدد المقاسات التقريبية والكمية المطلوبة لنعطيك مساراً أدق." : "Provide approximate dimensions and quantity for a more accurate route.",
    },
    {
      icon: CheckCircle2,
      title: isAr ? "النتيجة المطلوبة" : "Desired outcome",
      description: isAr ? "أخبرنا بالاستخدام والخامة والتشطيب أو الموعد المهم للمشروع." : "Tell us about use, material, finish or the project deadline that matters.",
    },
  ];

  const faqs = [
    {
      question: isAr ? "هل أحتاج إلى ملف جاهز؟" : "Do I need a ready file?",
      answer: isAr ? "ليس بالضرورة؛ يمكن أن نبدأ من فكرة أو رسم أو أبعاد بحسب الخدمة." : "Not necessarily; depending on the service, we can start from an idea, sketch or dimensions.",
    },
    {
      question: isAr ? "كيف تحددون الخامة والتقنية؟" : "How do you select material and process?",
      answer: isAr ? "نربط الاختيار بالاستخدام النهائي والمظهر المطلوب والكمية والبيئة التشغيلية." : "We relate the choice to the final use, desired finish, quantity and operating environment.",
    },
    {
      question: isAr ? "هل يمكن البدء بنموذج أولي؟" : "Can we start with a prototype?",
      answer: isAr ? "نعم، ويمكن اعتماد النموذج قبل الانتقال إلى الإنتاج أو الكميات عند الحاجة." : "Yes. A prototype can be reviewed before moving to production or quantity when needed.",
    },
  ];

  return (
    <main>
        <section className="bg-zinc-950 py-24 text-white">
          <Container>
            <Breadcrumbs
              locale={locale}
              items={[
                { label: isAr ? "الخدمات" : "Services", href: `/${locale}/services` },
                { label: title },
              ]}
            />
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {isAr ? "الخدمة" : "SERVICE"}
              </p>

              <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">
                {title}
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
                {description}
              </p>

              <div className="relative mt-10 aspect-[16/7] max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl">
                <Image
                  src={service.image}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-transparent to-transparent" />
              </div>

              <div className="mt-9">
                <Button href={`/${locale}/contact?service=${service.slug}`}>
                  {isAr
                    ? "اطلب عرض سعر"
                    : "Request a Quote"}
                  <ArrowRight
                    className={`ms-2 h-4 w-4 ${
                      isAr ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {isAr ? "ما نقدمه" : "WHAT WE PROVIDE"}
                </p>

                <h2 className="mt-4 text-4xl font-bold text-zinc-950">
                  {isAr
                    ? "حل عملي مصمم حسب احتياج المشروع"
                    : "A practical solution built around your project"}
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
                  {isAr
                    ? "نراجع المتطلبات ونحدد التقنية والخامة وطريقة التصنيع المناسبة قبل التنفيذ."
                    : "We review the requirements and select the appropriate technology, material and production method before execution."}
                </p>
              </div>

              <div className="rounded-3xl bg-zinc-950 p-7 text-white">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6" />
                  <h3 className="font-bold">
                    {isAr ? "الجودة" : "Quality"}
                  </h3>
                </div>

                <p className="mt-5 text-sm leading-7 text-zinc-400">
                  {isAr
                  ? "فحص بصري ووظيفي قبل التسليم مع إمكانية اعتماد النموذج قبل الإنتاج."
                    : "Visual and functional checks before delivery, with customer approval before batch production when required."}
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-zinc-50 py-24">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const icons = [
                  Layers3,
                  Settings,
                  ShieldCheck,
                  Zap,
                  CheckCircle2,
                  Layers3,
                ];

                const Icon = icons[index % icons.length];

                return (
                  <div
                    key={feature}
                    className="rounded-3xl border border-zinc-200 bg-white p-7"
                  >
                    <Icon className="h-6 w-6 text-zinc-800" />

                    <h3 className="mt-5 font-bold text-zinc-950">
                      {feature}
                    </h3>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="im-eyebrow text-xs font-black text-[#a67d0b]">{isAr ? "لتسريع عرض السعر" : "For a faster quote"}</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">{isAr ? "ثلاث معلومات تكفي لنبدأ." : "Three details are enough to begin."}</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {projectBrief.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.title} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-[#e3bd50]"><Icon className="h-5 w-5" /></span>
                        <h3 className="mt-5 font-black text-zinc-950">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-7 sm:p-8">
                <h2 className="text-2xl font-black text-zinc-950">{isAr ? "أسئلة سريعة" : "Quick questions"}</h2>
                <div className="mt-5 divide-y divide-zinc-200">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="group py-4">
                      <summary className="cursor-pointer list-none text-sm font-black text-zinc-950 marker:hidden">{faq.question}</summary>
                      <p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="rounded-[2rem] bg-zinc-950 p-10 text-white sm:p-14">
              <h2 className="text-3xl font-bold sm:text-4xl">
                {isAr
                  ? "لديك مشروع؟ دعنا نبدأ."
                  : "Have a project? Let's start."}
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
                {isAr
                  ? "أرسل فكرتك أو ملفك وسنراجع المتطلبات معك."
                  : "Send us your idea or file and we will review the requirements with you."}
              </p>

              <div className="mt-8">
                <Button href={`/${locale}/contact?service=${service.slug}`}>
                  {isAr ? "تواصل معنا" : "Contact Us"}
                </Button>
              </div>
            </div>
          </Container>
        </section>
    </main>
  );
}
