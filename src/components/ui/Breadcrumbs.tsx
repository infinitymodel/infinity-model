import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

export default function Breadcrumbs({
  items,
  locale,
}: BreadcrumbsProps) {
  const ar = locale === "ar";

  return (
    <nav
      aria-label={ar ? "مسار التنقل" : "Breadcrumb"}
      className="flex flex-wrap items-center gap-2 text-sm text-zinc-500"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href={`/${locale}`}
            className="transition hover:text-zinc-950"
          >
            {ar ? "الرئيسية" : "Home"}
          </Link>
        </li>

      {items.map((item, index) => (
        <li
          key={`${item.label}-${index}`}
          className="flex items-center gap-2"
        >
          {ar ? (
            <ChevronLeft className="h-4 w-4 text-zinc-300" />
          ) : (
            <ChevronRight className="h-4 w-4 text-zinc-300" />
          )}

          {item.href ? (
            <Link
              href={item.href}
              className="transition hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-zinc-800">
              {item.label}
            </span>
          )}
        </li>
      ))}
      </ol>
    </nav>
  );
}
