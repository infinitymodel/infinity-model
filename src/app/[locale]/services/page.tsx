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

        <section className="bg-zinc-50 py-20 sm:py-24">
          <Container>
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-2xl text-base leading-8 text-zinc-600">
                {isAr ? "اختر الخدمة الأقرب إلى احتياجك، أو أرسل لنا تفاصيل الفكرة وسنساعدك في تحديد المسار المناسب." : "Choose the service closest to your need, or send us the idea and we will help identify the right path."}
              </p>
              <span className="w-fit rounded-full border border-[#c59b27]/30 bg-[#c59b27]/10 px-4 py-2 text-xs font-black text-[#946f12]">
                {isAr ? `${services.length} خدمات متخصصة` : `${services.length} specialist services`}
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = serviceIcons[service.slug as keyof typeof serviceIcons];

                return (
                  <Link
                  key={service.slug}
                  href={`/${locale}/services/${service.slug}`}
                  className="im-premium-card group relative rounded-[2rem] p-7 transition duration-500 hover:-translate-y-1.5 hover:border-[#c59b27]/45 hover:shadow-[0_28px_80px_rgba(24,24,27,0.12)]"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#c59b27]/10 transition duration-500 group-hover:scale-125" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-[#e3bd50] shadow-lg">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition group-hover:bg-zinc-950 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="im-eyebrow relative z-10 mt-8 text-xs font-bold uppercase text-zinc-500">
                    {service.category}
                  </p>

                  <h2 className="relative z-10 mt-3 text-2xl font-black tracking-tight text-zinc-950">
                    {isAr ? service.titleAr : service.title}
                  </h2>

                  <p className="relative z-10 mt-4 leading-7 text-zinc-600">
                    {isAr
                      ? service.shortDescriptionAr
                      : service.shortDescription}
                  </p>

                  <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-black">
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

            <div className="mt-10 flex flex-col gap-5 rounded-[1.75rem] border border-zinc-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-lg font-black text-zinc-950">
                  {isAr ? "غير متأكد من الخدمة الأنسب؟" : "Not sure which service fits?"}
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-600">
                  {isAr ? "أرسل وصفًا مختصرًا أو صورة مرجعية، وسنرشدك إلى نقطة البداية." : "Send a short description or reference image and we will guide you to the right starting point."}
                </p>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white transition hover:bg-zinc-800"
              >
                {isAr ? "تواصل معنا" : "Talk to us"}
                <ArrowRight className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </Container>
        </section>
    </main>
  );
}
