import type { Metadata } from "next";

import {
  buildMetadata,
} from "@/lib/seo";

import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const validLocale = locale as Locale;

  return buildMetadata({
    locale: validLocale,
    path: "/contact",
    title:
      validLocale === "ar"
        ? "تواصل معنا"
        : "Contact Infinity Model",
    description:
      validLocale === "ar"
        ? "تواصل مع Infinity Model في جازان لطلب عرض سعر أو بدء مشروع تصميم وتصنيع رقمي."
        : "Contact Infinity Model in Jizan to request a quote or start a digital manufacturing project.",
  });
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}