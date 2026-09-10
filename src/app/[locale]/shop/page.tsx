import React from "react";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/home/ProductCard";
import { products } from "@/data/products";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ShopPage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <main className="py-16">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {isAr ? "المتجر" : "Shop"}
        </h1>
        <p className="mt-2 text-slate-600">
          {isAr
            ? "استعرض جميع المنتجات والمعدات المتاحة"
            : "Browse all available products and equipment"}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </Container>
    </main>
  );
}