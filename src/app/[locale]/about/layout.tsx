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
    path: "/about",
    title:
      validLocale === "ar"
        ? "من نحن"
        : "About Infinity Model",
    description:
      validLocale === "ar"
        ? "تعرف على Infinity Model ورؤيتنا في التصميم والتصنيع الرقمي والنمذجة الأولية."
        : "Learn about Infinity Model and our approach to design, digital manufacturing and rapid prototyping.",
  });
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}