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
    path: "/projects",
    title:
      validLocale === "ar"
        ? "معرض الأعمال"
        : "Work Gallery",
    description:
      validLocale === "ar"
        ? "استكشف معرض Infinity Model الذي يضم الأعمال المنفذة والمجسمات والقطع الهندسية وخامات وتقنيات التصنيع الرقمي."
        : "Explore the Infinity Model gallery of completed work, figures, engineering parts, materials and digital manufacturing technology.",
  });
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
