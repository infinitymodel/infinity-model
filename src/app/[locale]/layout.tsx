import { notFound } from "next/navigation";

import {
  isValidLocale,
  localeDirection,
  locales,
} from "@/i18n/config";

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

  return (
    <div
      lang={locale}
      dir={localeDirection[locale]}
      className="min-h-screen"
    >
      {children}
    </div>
  );
}