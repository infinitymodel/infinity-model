import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ExternalLink,
  Printer,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import Container from "@/components/ui/Container";
import {
  sallaCustomPrintingUrl,
  sallaReadyProductsUrl,
  sallaStoreUrl,
} from "@/data/store";

interface ReadyProductsProps {
  locale: string;
  content: {
    viewAll?: string;
  };
}

export default function ReadyProducts({
  locale,
  content,
}: ReadyProductsProps) {
  const ar = locale === "ar";

  const collections = [
    {
      number: "01",
      icon: ShoppingBag,
      title: ar ? "منتجات جاهزة" : "Ready-made products",
      description: ar
        ? "تسوّق المنتجات المعروضة حالياً في متجر Infinity Model الرسمي على سلة."
        : "Shop the products currently featured in Infinity Model’s official Salla store.",
      details: ar
        ? ["منتجات متاحة", "طلب آمن عبر سلة"]
        : ["Available products", "Secure ordering via Salla"],
      cta: ar ? "تسوّق المنتجات الجاهزة" : "Shop ready-made products",
      href: sallaReadyProductsUrl,
      image: "/images/showcase/applications-showcase.jpg",
    },
    {
      number: "02",
      icon: ShoppingBag,
      title: ar ? "منظمات مكتبية" : "Desk organisers",
      description: ar
        ? "حلول عملية وأنيقة لترتيب الأدوات والمستندات والإكسسوارات المكتبية."
        : "Practical, refined solutions for organising desk tools, documents and accessories.",
      details: ar
        ? ["تصميم عملي", "ضمن المنتجات الجاهزة"]
        : ["Practical design", "Part of ready-made products"],
      cta: ar ? "استعرض الفئة في سلة" : "Browse category on Salla",
      href: sallaReadyProductsUrl,
      image: "/images/showcase/functional-bracket.jpg",
    },
    {
      number: "03",
      icon: Sparkles,
      title: ar ? "فازات عصرية" : "Modern vases",
      description: ar
        ? "قطع ديكورية مطبوعة تضيف لمسة عصرية للمكتب أو المنزل."
        : "Printed decorative pieces that add a contemporary touch to home or office spaces.",
      details: ar
        ? ["قطع ديكورية", "ضمن المنتجات الجاهزة"]
        : ["Decorative pieces", "Part of ready-made products"],
      cta: ar ? "استعرض الفئة في سلة" : "Browse category on Salla",
      href: sallaReadyProductsUrl,
      image: "/images/showcase/pink-character-bust.jpg",
    },
    {
      number: "04",
      icon: Printer,
      title: ar ? "طباعة حسب الطلب" : "Print on demand",
      description: ar
        ? "أرسل فكرتك أو ملفك واطلب خدمة الطباعة حسب الطلب مباشرةً عبر متجر سلة."
        : "Send your idea or file and request on-demand printing directly through Salla.",
      details: ar
        ? ["خدمة طباعة مخصصة", "طلب ومتابعة عبر سلة"]
        : ["Custom printing service", "Order and follow-up via Salla"],
      cta: ar ? "اطلب طباعة مخصصة" : "Request custom printing",
      href: sallaCustomPrintingUrl,
      image: "/images/showcase/printing-nozzle.jpg",
    },
  ];

  return (
    <section className="overflow-hidden border-b border-zinc-200 bg-white py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c59b27]/70" />

              <Sparkles className="h-3.5 w-3.5 text-[#c59b27]" aria-hidden="true" />

              <p className="im-eyebrow text-xs font-black uppercase text-zinc-600">
                {ar ? "المتجر الرسمي" : "Official Store"}
              </p>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              {ar ? "تسوّق مباشرةً عبر متجرنا في سلة." : "Shop directly through our Salla store."}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-700">
              {ar
                ? "الأسعار والمخزون وطلبات الشراء تُدار من متجر Infinity Model الرسمي على سلة، لتكون تجربة الطلب والدفع والمتابعة واضحة وآمنة."
                : "Prices, stock and purchases are managed through Infinity Model’s official Salla store for a clear, secure ordering experience."}
            </p>
          </div>

          <a
            href={sallaStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            {content.viewAll ||
              (ar
                ? "عرض جميع المنتجات"
                : "View All Products")}

            <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Container>

      <div className="mt-12 overflow-hidden">
        <div className="im-hide-scrollbar flex gap-5 overflow-x-auto px-5 pb-5 sm:px-6 lg:px-[max(calc((100vw-1280px)/2),32px)]">
          {collections.map((collection) => {
            const Icon = collection.icon;

            return (
              <a
                key={collection.number}
                href={collection.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-w-[285px] overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_20px_50px_rgba(24,24,27,0.09)] sm:min-w-[340px]"
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-950">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/15 to-transparent" />

                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-950/75 px-3 py-1.5 text-[10px] font-black tracking-[0.16em] text-white backdrop-blur">
                    <Icon className="h-3.5 w-3.5 text-[#e3bd50]" aria-hidden="true" />
                    SALLA
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                    <div>
                      <p className="text-[10px] font-black tracking-[0.18em] text-[#e3bd50]">{collection.number}</p>
                      <h3 className="mt-2 text-xl font-black">{collection.title}</h3>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950 shadow-lg transition group-hover:scale-110">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-7 text-zinc-600">{collection.description}</p>

                  <div className="mt-5 grid gap-2">
                    {collection.details.map((detail) => (
                      <span key={detail} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-bold text-zinc-700">
                        <BadgeCheck className="h-4 w-4 shrink-0 text-[#c59b27]" aria-hidden="true" />
                        {detail}
                      </span>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-zinc-950">
                    {collection.cta}
                    <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${ar ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#c59b27]/25 bg-[#c59b27]/[0.07] px-5 py-4 text-sm text-zinc-700 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#a67d0b]" aria-hidden="true" />
            {ar ? "الطلب والدفع ومتابعة الشحن تتم عبر متجر سلة الرسمي." : "Ordering, payment and delivery tracking happen through the official Salla store."}
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-xs font-black text-zinc-950">
            {ar ? "متجر Infinity Model" : "Infinity Model Store"}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
    </section>
  );
}
