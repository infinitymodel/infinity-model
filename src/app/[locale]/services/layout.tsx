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
    path: "/services",
    title:
      validLocale === "ar"
        ? "خدمات التصنيع الرقمي"
        : "Digital Manufacturing Services",
    description:
      validLocale === "ar"
        ? "اكتشف خدمات إنفينيتي موديل في الطباعة ثلاثية الأبعاد، التصميم CAD، النمذجة الأولية، CNC، PCB، UV Printing وصيانة الطابعات."
        : "Explore Infinity Model services including 3D printing, CAD design, rapid prototyping, CNC, PCB prototyping, UV printing and 3D printer maintenance.",
  });
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}