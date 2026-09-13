import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  FileUp,
  Layers3,
  Palette,
  Printer,
  ShoppingBag,
  Wrench,
} from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { sallaStoreUrl } from "@/data/store";
import {
  customServiceProduct,
  storeCategoryGroups,
  type StoreCategoryIcon,
} from "@/data/store-catalog";
import { isValidLocale } from "@/i18n/config";
import { getSallaProducts, type SallaProduct } from "@/lib/salla";

const categoryIcons: Record<StoreCategoryIcon, typeof Box> = {
  figures: Box,
  decor: Palette,
  custom: Box,
  printer: Printer,
  filament: Layers3,
  spares: Wrench,
};

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const isAr = locale === "ar";
  const liveProducts = (await getSallaProducts(12)).filter(
    (product): product is SallaProduct & { price: number } => product.price !== null
  );

  return (
    <main>
      <PageHeader
        locale={locale}
        eyebrow={isAr ? "المتجر" : "Shop"}
        title={isAr ? "متجر مرتب لتجربة شراء واضحة." : "A clear, well-organised shopping experience."}
        description={isAr ? "تسوّق التصاميم الجاهزة وتجهيزات الطباعة، أو أرسل طلب تصميم وطباعة مخصص من مكان واحد." : "Shop ready designs and printing equipment, or send a custom design and print request from one place."}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-[#946f12]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c59b27]/25 bg-[#c59b27]/10"><ShoppingBag className="h-5 w-5" aria-hidden="true" /></span>
                <p className="im-eyebrow text-xs font-black">{isAr ? "متجر سلة الرسمي" : "OFFICIAL SALLA STORE"}</p>
              </div>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-zinc-950 sm:text-4xl">
                {isAr ? "تسعير واضح، فئات سهلة، وطلب مخصص عند الحاجة." : "Clear pricing, simple categories and custom requests when needed."}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600">
                {isAr ? "تُدار الأسعار والمخزون وعمليات الدفع والشحن من متجر Infinity Model الرسمي على سلة. نعرض هنا الفئات فقط عندما لا تكون بيانات المنتجات الحية متاحة." : "Prices, inventory, payment and shipping are managed by Infinity Model’s official Salla store. We show categories here whenever live product data is not available."}
              </p>
            </div>
            <a href={sallaStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-zinc-800">
              {isAr ? "فتح المتجر" : "Open store"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <a href={customServiceProduct.href} target="_blank" rel="noopener noreferrer" className="group mt-8 grid overflow-hidden rounded-[2rem] bg-zinc-950 text-white lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative min-h-60 overflow-hidden">
              <Image src={customServiceProduct.image} alt={isAr ? customServiceProduct.titleAr : customServiceProduct.titleEn} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover opacity-60 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/25 to-zinc-950/70" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="flex items-center gap-3 text-[#e3bd50]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c59b27]/30 bg-[#c59b27]/10"><FileUp className="h-5 w-5" aria-hidden="true" /></span>
                <p className="im-eyebrow text-xs font-black">{isAr ? "خدمة حسب الطلب" : "ON-DEMAND SERVICE"}</p>
              </div>
              <h2 className="mt-5 text-2xl font-black leading-9 sm:text-3xl">{isAr ? customServiceProduct.titleAr : customServiceProduct.titleEn}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-zinc-300">{isAr ? customServiceProduct.descriptionAr : customServiceProduct.descriptionEn}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-black">
                {isAr ? "ابدأ الطلب المخصص" : "Start a custom request"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        </Container>
      </section>

      {liveProducts.length > 0 && (
        <section className="border-y border-zinc-200 bg-zinc-50 py-20 sm:py-24">
          <Container>
            <div className="max-w-3xl">
              <p className="im-eyebrow text-xs font-black text-[#946f12]">{isAr ? "منتجات محدثة" : "LIVE PRODUCTS"}</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">{isAr ? "منتجات بأسعار ظاهرة من سلة." : "Products with visible Salla prices."}</h2>
              <p className="mt-4 leading-8 text-zinc-600">{isAr ? "نُظهر فقط المنتجات التي تحتوي على سعر منشور في المتجر." : "Only products with a published store price are shown here."}</p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {liveProducts.map((product) => (
                <a key={product.id} href={product.href} target="_blank" rel="noopener noreferrer" className="im-interactive-card group overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white">
                  <div className="relative aspect-square bg-zinc-100">
                    <Image src={product.image ?? "/images/showcase/applications-showcase.jpg"} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-zinc-950">{product.name}</h3>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-sm font-black text-zinc-950">
                        {new Intl.NumberFormat(isAr ? "ar-SA" : "en-SA", { style: "currency", currency: product.currency, maximumFractionDigits: 2 }).format(product.price)}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 transition group-hover:text-zinc-950" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="im-eyebrow text-xs font-black text-[#946f12]">{isAr ? "تصفّح حسب الفئة" : "BROWSE BY CATEGORY"}</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">{isAr ? "فئتان رئيسيتان. ست فئات واضحة." : "Two main groups. Six clear categories."}</h2>
          </div>

          <div className="mt-12 space-y-14">
            {storeCategoryGroups.map((group, groupIndex) => (
              <section key={group.id} aria-labelledby={`category-group-${group.id}`}>
                <div className="flex flex-col gap-3 border-b border-zinc-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-black tracking-[0.16em] text-[#946f12]">{String(groupIndex + 1).padStart(2, "0")}</p>
                    <h3 id={`category-group-${group.id}`} className="mt-2 text-2xl font-black text-zinc-950">{isAr ? group.titleAr : group.titleEn}</h3>
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-zinc-600">{isAr ? group.descriptionAr : group.descriptionEn}</p>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-3">
                  {group.children.map((category) => {
                    const Icon = categoryIcons[category.icon];
                    return (
                      <a key={category.id} href={category.href} target="_blank" rel="noopener noreferrer" className="im-interactive-card group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50">
                        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                          <Image src={category.image} alt={isAr ? category.titleAr : category.titleEn} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/55 to-transparent" />
                          <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-zinc-950/80 text-[#e3bd50] backdrop-blur"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                        </div>
                        <div className="p-6">
                          <h4 className="text-xl font-black text-zinc-950">{isAr ? category.titleAr : category.titleEn}</h4>
                          <p className="mt-3 text-sm leading-7 text-zinc-600">{isAr ? category.descriptionAr : category.descriptionEn}</p>
                          <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-zinc-950">
                            {isAr ? "استعرض الفئة" : "Browse category"}
                            <ArrowRight className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`} />
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
