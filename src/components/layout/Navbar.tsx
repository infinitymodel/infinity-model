"use client";

import Link from "next/link";
import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useState, Suspense } from "react";
import { usePathname } from "next/navigation";

import LanguageSwitcher from "./LanguageSwitcher";
import { sallaStoreUrl } from "@/data/store";

interface NavbarProps {
  locale: string;
  labels: {
    home: string;
    services: string;
    shop: string;
    training: string;
    projects: string;
    about: string;
    contact: string;
    quote: string;
  };
}

export default function Navbar({
  locale,
  labels,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      label: labels.home,
      href: `/${locale}`,
    },
    {
      label: labels.services,
      href: `/${locale}/services`,
    },
    {
      label: labels.shop,
      href: sallaStoreUrl,
      external: true,
    },
    {
      label: labels.training,
      href: `/${locale}/training`,
    },
    {
      label: labels.projects,
      href: `/${locale}/projects`,
    },
    {
      label: labels.about,
      href: `/${locale}/about`,
    },
    {
      label: labels.contact,
      href: `/${locale}/contact`,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between gap-5">
          {/* Logo */}

          <Link
            href={`/${locale}`}
            className="group shrink-0"
            onClick={() => setOpen(false)}
          >
            <div className="text-lg font-black tracking-[-0.04em] text-zinc-950 sm:text-xl">
              INFINITY
              <span className="text-zinc-400">
                MODEL
              </span>
            </div>

            <div className="mt-0.5 hidden text-[8px] font-bold tracking-[0.16em] text-zinc-400 sm:block">
              DIGITAL MANUFACTURING
            </div>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-1 xl:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={!link.external && pathname === link.href ? "page" : undefined}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`rounded-full px-3 py-2 text-[13px] font-semibold transition hover:bg-zinc-100 hover:text-zinc-950 ${
                  !link.external && pathname === link.href
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}

          <div className="hidden items-center gap-2 lg:flex">
            <Suspense fallback={<div className="h-9 w-16 animate-pulse rounded-full bg-zinc-100" />}>
              <LanguageSwitcher />
            </Suspense>

            <Link
              href={`/${locale}/contact`}
              className="im-cta-dark inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-xs font-bold transition hover:bg-zinc-800"
            >
              {labels.quote}

              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile */}

          <div className="flex items-center gap-2 lg:hidden">
            <Suspense fallback={<div className="h-9 w-16 animate-pulse rounded-full bg-zinc-100" />}>
              <LanguageSwitcher />
            </Suspense>

            <button
              type="button"
              aria-label={
                open
                  ? locale === "ar"
                    ? "إغلاق القائمة"
                    : "Close menu"
                  : locale === "ar"
                    ? "فتح القائمة"
                    : "Open menu"
              }
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() =>
                setOpen((value) => !value)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}

        {open && (
          <div className="border-t border-zinc-200 py-5 lg:hidden">
            <nav id="mobile-navigation" className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={!link.external && pathname === link.href ? "page" : undefined}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`rounded-2xl px-4 py-3.5 text-sm font-semibold transition hover:bg-zinc-100 hover:text-zinc-950 ${
                    !link.external && pathname === link.href
                      ? "bg-zinc-100 text-zinc-950"
                      : "text-zinc-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href={`/${locale}/contact`}
              onClick={() => setOpen(false)}
              className="im-cta-dark mt-4 flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 py-4 text-sm font-bold"
            >
              {labels.quote}

              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
