import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Package,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";

import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import { products } from "@/data/products";

import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

const translations: Record<Locale, typeof ar> = {
  ar,
  en,
};

export function generateStaticParams() {
  return products.flatMap((product) =>
    ["ar", "en"].map((locale) => ({
      locale,
      id: product.id,
    }))
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}) {
  const { locale, id } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    notFound();
  }

  const t = translations[locale];
  const isAr = locale === "ar";

  return (
    <>
      <Navbar locale={locale} labels={t.navigation} />

      <main>
        <section className="py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="aspect-square rounded-[2rem] bg-zinc-100">
                <div className="flex h-full items-center justify-center text-zinc-400">
                  {isAr
                    ? "مكان صورة المنتج"
                    : "Product Image Placeholder"}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  {product.material}
                </p>

                <h1 className="mt-4 text-5xl font-bold tracking-tight">
                  {isAr
                    ? product.nameAr
                    : product.name}
                </h1>

                <p className="mt-6 text-3xl font-bold">
                  {product.price} {product.currency}
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5" />
                    {isAr
                      ? "مصنوع حسب مواصفات المنتج"
                      : "Manufactured according to product specifications"}
                  </div>

                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5" />
                    {isAr
                      ? "تجهيز وشحن حسب الطلب"
                      : "Prepared and shipped to order"}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href={`/${locale}/contact`}>
                    {isAr
                      ? "اطلب المنتج"
                      : "Request Product"}

                    <ArrowRight
                      className={`ms-2 h-4 w-4 ${
                        isAr ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-zinc-200 bg-zinc-50 py-20">
          <Container>
            <h2 className="text-3xl font-bold">
              {isAr
                ? "تفاصيل المنتج"
                : "Product Details"}
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-6">
                <p className="text-xs uppercase text-zinc-400">
                  {isAr ? "الخامة" : "Material"}
                </p>

                <p className="mt-2 font-bold">
                  {product.material}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6">
                <p className="text-xs uppercase text-zinc-400">
                  {isAr ? "التصنيف" : "Category"}
                </p>

                <p className="mt-2 font-bold">
                  {product.category}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6">
                <p className="text-xs uppercase text-zinc-400">
                  {isAr ? "الحالة" : "Status"}
                </p>

                <p className="mt-2 font-bold">
                  {product.badge ?? "Available"}
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}