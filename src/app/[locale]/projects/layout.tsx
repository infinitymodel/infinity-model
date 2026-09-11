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
        ? "مشاريعنا"
        : "Our Projects",
    description:
      validLocale === "ar"
        ? "استكشف مشاريع Infinity Model في التصنيع الرقمي والطباعة ثلاثية الأبعاد والنماذج الهندسية والنماذج الأولية."
        : "Explore Infinity Model projects across digital manufacturing, 3D printing, engineering models and rapid prototyping.",
  });
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}