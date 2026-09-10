import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import Navbar from "@/components/layout/Navbar";

import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import { products } from "@/data/products";
import { Product } from "@/types/product"; // <-- أضف هذا السطر


import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

const translations: Record<Locale, typeof ar> = {
  ar,
  en,
};

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = translations[locale];
  const isAr = locale === "ar";

  return (
    <>
      <Navbar locale={locale} labels={t.navigation} />

      <main>
        {/* Page Hero */}
        <section className="bg-zinc-950 py-24 text-white">
          <Container>
            <ShoppingBag className="h-10 w-10 text-zinc-400" />

            <h1 className="mt-7 text-5xl font-bold tracking-tight sm:text-6xl">
              {isAr ? "المتجر" : "Shop"}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {isAr
                ? "منتجات جاهزة وقطع مخصصة مصنعة باستخدام تقنيات التصنيع الرقمي."
                : "Ready-made products and custom pieces created through digital manufacturing."}
            </p>
          </Container>
        </section>

        {/* Products */}
        <section className="py-24">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/shop/${product.id}`}
                  className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Product Image Placeholder */}
                  <div className="relative aspect-square overflow-hidden bg-zinc-100">
                    {product.badge && (
                      <span className="absolute left-4 top-4 z-10 rounded-full bg-zinc-950 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {product.badge}
                      </span>
                    )}

                    <div className="flex h-full items-center justify-center">
                      <div className="relative h-32 w-32 rounded-[2rem] border border-zinc-300 bg-zinc-200 shadow-inner transition duration-500 group-hover:scale-105">
                        <div className="absolute inset-5 rounded-2xl border border-zinc-300 bg-zinc-100" />
                      </div>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-zinc-400">
                      {product.material}
                    </p>

                    <h2 className="mt-2 font-bold text-zinc-950">
                      {isAr ? product.nameAr : product.name}
                    </h2>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-bold text-zinc-950">
                        {product.price} {product.currency}
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 transition group-hover:bg-zinc-950 group-hover:text-white">
                        <ArrowRight
                          className={`h-4 w-4 ${
                            isAr ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}