import type { Metadata } from "next";

import type { Locale } from "@/i18n/config";

export const SITE_URL = "https://3dinfinitymodel.com";
export const SITE_NAME = "Infinity Model";

export const DEFAULT_DESCRIPTION =
  "Infinity Model is a digital manufacturing and 3D technology studio in Jizan, Saudi Arabia, specializing in 3D printing, CAD design, rapid prototyping, CNC, PCB prototyping and custom manufacturing.";

export const DEFAULT_DESCRIPTION_AR =
  "إنفينيتي موديل استوديو للتصنيع الرقمي وتقنيات الطباعة ثلاثية الأبعاد في جازان، المملكة العربية السعودية، متخصص في الطباعة ثلاثية الأبعاد والتصميم الهندسي والنمذجة الأولية والتصنيع الرقمي.";

export function localizedUrl(
  locale: Locale,
  path = ""
): string {
  const cleanPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${SITE_URL}/${locale}${cleanPath}`;
}

interface BuildMetadataOptions {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function buildMetadata({
  locale,
  title,
  description,
  path = "",
  image,
}: BuildMetadataOptions): Metadata {
  const canonical = localizedUrl(locale, path);

  const arabicUrl = localizedUrl("ar", path);
  const englishUrl = localizedUrl("en", path);

  const isArabic = locale === "ar";

  const metadata: Metadata = {
    title,
    description,

    alternates: {
      canonical,
      languages: {
        ar: arabicUrl,
        en: englishUrl,
        "x-default": arabicUrl,
      },
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: isArabic ? "ar_SA" : "en_SA",
      alternateLocale: isArabic
        ? ["en_SA"]
        : ["ar_SA"],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };

  if (image) {
    const imageUrl = image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    };

    metadata.twitter = {
      ...metadata.twitter,
      images: [imageUrl],
    };
  }

  return metadata;
}