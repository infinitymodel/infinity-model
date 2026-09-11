import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import SiteFooterShell from "@/components/layout/SiteFooterShell";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import {
  isValidLocale,
  localeDirection,
  locales,
  type Locale,
} from "@/i18n/config";

const translations: Record<Locale, typeof ar> = { ar, en };

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  return (
    <div
      lang={validLocale}
      dir={localeDirection[validLocale]}
      className="min-h-screen"
    >
      <SiteFooterShell locale={validLocale}>
        <Navbar locale={validLocale} labels={translations[validLocale].navigation} />
        {children}
        <FloatingWhatsApp locale={validLocale} />
      </SiteFooterShell>
    </div>
  );
}
