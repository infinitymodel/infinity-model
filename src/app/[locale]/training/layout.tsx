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
    path: "/training",
    title:
      validLocale === "ar"
        ? "التدريب والدورات"
        : "3D Technology Training",
    description:
      validLocale === "ar"
        ? "دورات عملية في التصميم ثلاثي الأبعاد، Slicing، الطباعة ثلاثية الأبعاد وصيانة الطابعات."
        : "Practical training in 3D design, slicing, 3D printing and 3D printer maintenance.",
  });
}

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}