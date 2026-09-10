import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  Settings,
  ShieldCheck,
  Zap,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";

import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import {
  getService,
  services,
} from "@/data/services";

import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

const translations: Record<Locale, typeof ar> = {
  ar,
  en,
};

export function generateStaticParams() {
  return services.flatMap((service) =>
    ["ar", "en"].map((locale) => ({
      locale,
      slug: service.slug,
    }))
  );
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

  const t = translations[locale];
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

  return (
    <>
      <Navbar locale={locale} labels={t.navigation} />

      <main>
        <section className="bg-zinc-950 py-24 text-white">
          <Container>
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

              <div className="mt-9">
                <Button href={`/${locale}/contact`}>
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
                <Button href={`/${locale}/contact`}>
                  {isAr ? "تواصل معنا" : "Contact Us"}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}