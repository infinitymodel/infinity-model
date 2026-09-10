import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import Container from "@/components/ui/Container";
import Navbar from "@/components/layout/Navbar";
import HomeSections from "@/components/home/HomeSections";

import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import { services } from "@/data/services";
import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

const translations: Record<Locale, typeof ar> = {
  ar,
  en,
};

export default async function ServicesPage({
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
        <section className="border-b border-zinc-200 bg-zinc-950 py-24 text-white">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {isAr ? "خدماتنا" : "OUR SERVICES"}
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
              {isAr
                ? "من التصميم إلى التصنيع"
                : "From Design to Manufacturing"}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {isAr
                ? "حلول متكاملة تجمع التصميم والتصنيع الرقمي والنمذجة الأولية والتخصيص."
                : "Integrated solutions combining design, digital manufacturing, rapid prototyping and customization."}
            </p>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const title = isAr
                  ? service.titleAr
                  : service.title;

                const description = isAr
                  ? service.shortDescriptionAr
                  : service.shortDescription;

                return (
                  <Link
                    key={service.slug}
                    href={`/${locale}/services/${service.slug}`}
                    className="group rounded-3xl border border-zinc-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                        {service.category}
                      </span>

                      <ArrowRight
                        className={`h-5 w-5 transition group-hover:translate-x-1 ${
                          isAr ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    <h2 className="mt-8 text-2xl font-bold text-zinc-950">
                      {title}
                    </h2>

                    <p className="mt-4 leading-7 text-zinc-600">
                      {description}
                    </p>

                    <div className="mt-7 space-y-2">
                      {(isAr
                        ? service.featuresAr
                        : service.features
                      )
                        .slice(0, 3)
                        .map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-sm text-zinc-600"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            {feature}
                          </div>
                        ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        <HomeSections locale={locale} />
      </main>
    </>
  );
}