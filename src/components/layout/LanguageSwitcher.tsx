"use client";

import Link from "next/link";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

import {
  defaultLocale,
  locales,
  type Locale,
} from "@/i18n/config";

function replaceLocale(
  pathname: string,
  locale: Locale
) {
  const segments = pathname.split("/");

  if (
    locales.includes(
      segments[1] as Locale
    )
  ) {
    segments[1] = locale;

    return segments.join("/") || `/${locale}`;
  }

  return `/${locale}${pathname}`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocale = locales.includes(
    pathname.split("/")[1] as Locale
  )
    ? (pathname.split("/")[1] as Locale)
    : defaultLocale;

  const nextLocale: Locale =
    currentLocale === "ar"
      ? "en"
      : "ar";

  const localizedPath = replaceLocale(
    pathname,
    nextLocale
  );

  const queryString =
    searchParams.toString();

  const nextPath = queryString
    ? `${localizedPath}?${queryString}`
    : localizedPath;

  return (
    <Link
      href={nextPath}
      className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
      aria-label={
        nextLocale === "ar"
          ? "تغيير اللغة إلى العربية"
          : "Switch language to English"
      }
    >
      {nextLocale === "ar"
        ? "العربية"
        : "English"}
    </Link>
  );
}
