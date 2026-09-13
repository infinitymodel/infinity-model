import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ExternalLink,
  Box,
  Cuboid,
  FileUp,
  Layers3,
  Palette,
  Wrench,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import Container from "@/components/ui/Container";
import TrackedStoreLink from "@/components/analytics/TrackedStoreLink";
import { sallaStoreUrl } from "@/data/store";
import { customServiceProduct, storeCategoryGroups } from "@/data/store-catalog";
import { getSallaProducts, type SallaProduct } from "@/lib/salla";

interface StoreRailItem {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  cta: string;
  href: string;
  image?: string;
  isLive?: boolean;
}

interface ReadyProductsProps {
  locale: string;
  content: {
    viewAll?: string;
  };
}

export default async function ReadyProducts({
  locale,
  content,
}: ReadyProductsProps) {
  const ar = locale === "ar";

  const categoryIcons = {
    figures: Box,
    decor: Palette,
    custom: Cuboid,
    printer: ShoppingBag,
    filament: Layers3,
    spares: Wrench,
  };

  const collections: StoreRailItem[] = storeCategoryGroups
    .flatMap((group) =>
      group.children.map((category) => ({
        number: "",
        icon: categoryIcons[category.icon],
        title: ar ? category.titleAr : category.titleEn,
        description: ar ? category.descriptionAr : category.descriptionEn,
        details: ar
          ? [group.titleAr, "تصفّح الفئة في متجر سلة"]
          : [group.titleEn, "Browse this category on Salla"],
        cta: ar ? "استعرض الفئة" : "Browse category",
        href: category.href,
        image: category.image,
      }))
    )
    .map((item, index) => ({ ...item, number: String(index + 1).padStart(2, "0") }));

  const liveProducts = (await getSallaProducts(8)).filter(
    (product): product is SallaProduct & { price: number } => product.price !== null
  );
  const railItems: StoreRailItem[] = liveProducts.length > 0
    ? liveProducts.map((product, index) => ({
      number: String(index + 1).padStart(2, "0"),
      icon: ShoppingBag,
      title: product.name,
      description: ar
        ? "منتج متاح من متجر Infinity Model الرسمي على سلة."
        : "A product available from Infinity Model’s official Salla store.",
      details: [
        new Intl.NumberFormat(ar ? "ar-SA" : "en-SA", {
          style: "currency",
          currency: product.currency,
          maximumFractionDigits: 2,
        }).format(product.price),
        ar ? "متاح للطلب" : "Available to order",
      ],
      cta: ar ? "عرض المنتج في سلة" : "View product on Salla",
      href: product.href,
      image: product.image,
      isLive: true,
    }))
    : collections;

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

          <TrackedStoreLink
            href={sallaStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            eventParameters={{ item_category: "store", item_name: "all-products" }}
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            {content.viewAll ||
              (ar
                ? "عرض جميع المنتجات"
                : "View All Products")}

            <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </TrackedStoreLink>
        </div>
      </Container>

      <div className="mt-12 overflow-hidden">
        <div className="im-hide-scrollbar flex gap-5 overflow-x-auto px-5 pb-5 sm:px-6 lg:px-[max(calc((100vw-1280px)/2),32px)]">
          {railItems.map((collection) => {
            const Icon = collection.icon;

            return (
              <TrackedStoreLink
                key={collection.number}
                href={collection.href}
                target="_blank"
                rel="noopener noreferrer"
                eventParameters={{
                  item_category: collection.isLive ? "salla-product" : "salla-category",
                  item_id: collection.number,
                  item_name: collection.title,
                }}
                className="group min-w-[285px] overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_20px_50px_rgba(24,24,27,0.09)] sm:min-w-[340px]"
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-950">
                  <Image
                    src={collection.image ?? "/images/showcase/applications-showcase.jpg"}
                    alt={collection.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/15 to-transparent" />

                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-950/75 px-3 py-1.5 text-[10px] font-black tracking-[0.16em] text-white backdrop-blur">
                    <Icon className="h-3.5 w-3.5 text-[#e3bd50]" aria-hidden="true" />
                    {collection.isLive ? (ar ? "محدّث" : "LIVE") : "SALLA"}
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
              </TrackedStoreLink>
            );
          })}
        </div>
      </div>

      <Container>
        <TrackedStoreLink
          href={customServiceProduct.href}
          target="_blank"
          rel="noopener noreferrer"
          eventParameters={{ item_category: "salla-custom-service", item_name: customServiceProduct.titleEn }}
          className="group mt-2 grid overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-950 text-white sm:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative min-h-56 overflow-hidden">
            <Image
              src={customServiceProduct.image}
              alt={ar ? customServiceProduct.titleAr : customServiceProduct.titleEn}
              fill
              sizes="(max-width: 640px) 100vw, 40vw"
              className="object-cover opacity-65 transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/30 via-zinc-950/10 to-zinc-950 sm:bg-gradient-to-l" />
          </div>
          <div className="relative flex flex-col justify-center p-7 sm:p-9">
            <div className="flex items-center gap-3 text-[#e3bd50]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c59b27]/30 bg-[#c59b27]/10"><FileUp className="h-5 w-5" aria-hidden="true" /></span>
              <p className="im-eyebrow text-xs font-black">{ar ? "خدمة حسب الطلب" : "ON-DEMAND SERVICE"}</p>
            </div>
            <h3 className="mt-5 text-2xl font-black leading-9 text-white">
              {ar ? customServiceProduct.titleAr : customServiceProduct.titleEn}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">
              {ar ? customServiceProduct.descriptionAr : customServiceProduct.descriptionEn}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-white">
              {ar ? "أرسل تفاصيل طلبك" : "Send your request details"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </TrackedStoreLink>

        <div className="mt-1 flex flex-col gap-4 rounded-2xl border border-[#c59b27]/25 bg-[#c59b27]/[0.07] px-5 py-4 text-sm text-zinc-700 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#a67d0b]" aria-hidden="true" />
            {ar ? "الطلب والدفع ومتابعة الشحن تتم عبر متجر سلة الرسمي." : "Ordering, payment and delivery tracking happen through the official Salla store."}
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-xs font-black text-zinc-950">
            {ar ? "متجر Infinity Model" : "Infinity Model Store"}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </Container>
    </section>
  );
}
