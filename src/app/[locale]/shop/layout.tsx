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
    path: "/shop",
    title:
      validLocale === "ar"
        ? "متجر Infinity Model"
        : "Infinity Model Shop",
    description:
      validLocale === "ar"
        ? "اكتشف الطابعات ثلاثية الأبعاد والمواد وقطع الغيار والمنتجات والمجسمات الجاهزة من Infinity Model."
        : "Explore 3D printers, materials, spare parts, ready-made designs and custom products from Infinity Model.",
  });
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}