import Container from "./Container";
import Breadcrumbs from "./Breadcrumbs";

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
    <section className={dark ? "im-dark-grid border-b border-zinc-800 bg-zinc-950 text-white" : "border-b border-zinc-200 bg-zinc-50 text-zinc-950"}>
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl">
          {breadcrumbs && <Breadcrumbs locale={locale} items={breadcrumbs} />}
          <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${breadcrumbs ? "mt-7" : ""} ${dark ? "text-[#c59b27]" : "text-zinc-500"}`}>
            {eyebrow}
          </p>

          <h1 className={`mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-zinc-950"}`}>
            {title}
          </h1>

          {description && (
            <p className={`mt-6 max-w-3xl text-base leading-8 sm:text-lg ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
