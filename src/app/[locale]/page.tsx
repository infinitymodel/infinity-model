import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Hero from "@/components/home/Hero";
import CapabilityRail from "@/components/home/CapabilityRail";
import ReadyProducts from "@/components/home/ReadyProducts";
import HomeSections from "@/components/home/HomeSections";

import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import {
  buildMetadata,
} from "@/lib/seo";

import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

const translations: Record<
  Locale,
  typeof ar
> = {
  ar,
  en,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const validLocale = locale as Locale;

  return buildMetadata({
    locale: validLocale,
    path: "",
    title:
      validLocale === "ar"
        ? "Infinity Model | التصنيع الرقمي والطباعة ثلاثية الأبعاد"
        : "Infinity Model | Digital Manufacturing & 3D Printing",
    description:
      validLocale === "ar"
        ? "Infinity Model في جازان: تصميم وتصنيع رقمي، طباعة ثلاثية الأبعاد، نمذجة أولية، CNC، PCB وصيانة الطابعات."
        : "Infinity Model in Jizan: digital design and manufacturing, 3D printing, rapid prototyping, CNC, PCB and printer maintenance.",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = translations[locale];

  return (
    <main>
        <Hero
          locale={locale}
          content={t.hero}
        />

        <CapabilityRail locale={locale} />

        <ReadyProducts
          locale={locale}
          content={t.products}
        />

        <HomeSections
          locale={locale}
        />
    </main>
  );
}
