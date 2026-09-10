import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ReadyProducts from "@/components/home/ReadyProducts";
import HomeSections from "@/components/home/HomeSections";

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = translations[locale];

  return (
    <>
      <Navbar
        locale={locale}
        labels={t.navigation}
      />

      <main>
        <Hero
          locale={locale}
          content={t.hero}
        />

        <ReadyProducts
          locale={locale}
          content={t.products}
        />

        <HomeSections locale={locale} />
      </main>
    </>
  );
}