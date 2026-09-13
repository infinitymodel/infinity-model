import Container from "./Container";
import Breadcrumbs from "./Breadcrumbs";
import { Sparkles } from "lucide-react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  locale: "ar" | "en";
  breadcrumbs?: { label: string; href?: string }[];
  tone?: "light" | "dark";
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  locale,
  breadcrumbs,
  tone = "dark",
}: PageHeaderProps) {
  const dark = tone === "dark";
  return (
    <section className={`relative isolate overflow-hidden ${dark ? "im-dark-grid border-b border-zinc-800 bg-zinc-950 text-white" : "border-b border-zinc-200 bg-zinc-50 text-zinc-950"}`}>
      <div aria-hidden="true" className={`pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full blur-3xl ${dark ? "bg-[#c59b27]/10" : "bg-[#c59b27]/15"}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute -left-20 -top-28 h-56 w-56 rounded-full blur-3xl ${dark ? "bg-white/[0.035]" : "bg-zinc-950/[0.04]"}`} />
      <div aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-px ${dark ? "bg-gradient-to-r from-transparent via-[#c59b27]/70 to-transparent" : "bg-gradient-to-r from-transparent via-[#c59b27]/55 to-transparent"}`} />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl">
          {breadcrumbs && <Breadcrumbs locale={locale} items={breadcrumbs} />}
          <div className={`im-eyebrow flex items-center gap-2 text-sm font-bold uppercase ${breadcrumbs ? "mt-7" : ""} ${dark ? "text-[#e3bd50]" : "text-zinc-600"}`}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${dark ? "border-[#c59b27]/30 bg-[#c59b27]/10" : "border-[#c59b27]/25 bg-[#c59b27]/10"}`}>
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </span>
            <p>{eyebrow}</p>
          </div>

          <h1 className={`mt-5 text-4xl font-black leading-[1.12] tracking-[-0.045em] sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-zinc-950"}`}>
            {title}
          </h1>

          {description && (
            <p className={`mt-6 max-w-3xl text-base leading-8 sm:text-lg ${dark ? "text-zinc-300" : "text-zinc-700"}`}>
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
