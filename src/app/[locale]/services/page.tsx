import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CircuitBoard,
  Cog,
  Cuboid,
  Layers3,
  Printer,
  ScanLine,
  Wrench,
} from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { services } from "@/data/services";

import { isValidLocale } from "@/i18n/config";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const isAr = locale === "ar";
  const serviceIcons = {
    "3d-printing": Printer,
    "cad-design": Cuboid,
    "rapid-prototyping": Box,
    cnc: Cog,
    pcb: CircuitBoard,
    "uv-printing": Layers3,
    "custom-models": ScanLine,
    "printer-maintenance": Wrench,
  };

  return (
    <main>
      <PageHeader
        locale={locale}
        eyebrow={isAr ? "خدماتنا" : "Our Services"}
        title={isAr ? "حلول تصنيع تبدأ من احتياجك." : "Manufacturing solutions built around your needs."}
        description={isAr ? "حلول متكاملة تبدأ من التصميم الرقمي وتنتهي بمنتج حقيقي جاهز للاستخدام." : "Integrated solutions that start with digital design and end with a real product ready for use."}
      />

        <section className="py-24">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = serviceIcons[service.slug as keyof typeof serviceIcons];

                return (
                  <Link
                  key={service.slug}
                  href={`/${locale}/services/${service.slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-zinc-100 transition duration-500 group-hover:scale-125" />
                  <div className="flex items-center justify-between">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-[#e3bd50] shadow-lg">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition group-hover:bg-zinc-950 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="im-eyebrow relative mt-8 text-xs font-bold uppercase text-zinc-500">
                    {service.category}
                  </p>

                  <h2 className="relative mt-3 text-2xl font-bold text-zinc-950">
                    {isAr ? service.titleAr : service.title}
                  </h2>

                  <p className="relative mt-4 leading-7 text-zinc-600">
                    {isAr
                      ? service.shortDescriptionAr
                      : service.shortDescription}
                  </p>

                  <div className="relative mt-8 flex items-center gap-2 text-sm font-semibold">
                    {isAr ? "عرض الخدمة" : "View Service"}

                    <ArrowRight
                      className={`h-4 w-4 ${
                        isAr ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
    </main>
  );
}
