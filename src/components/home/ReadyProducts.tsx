import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/home/ProductCard";

import { products } from "@/data/products";

interface ReadyProductsProps {
  locale: string;
  content: {
    title: string;
    description: string;
    viewAll: string;
  };
}

export default function ReadyProducts({
  locale,
  content,
}: ReadyProductsProps) {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="SHOP"
            title={content.title}
            description={content.description}
          />

          <Link
            href={`/${locale}/shop`}
            className="inline-flex shrink-0 items-center text-sm font-semibold text-zinc-900"
          >
            {content.viewAll}

            <ArrowRight
              className={`ms-2 h-4 w-4 ${
                locale === "ar" ? "rotate-180" : ""
              }`}
            />
          </Link>
        </div>

        <div className="mt-12 flex gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="w-[280px] shrink-0 sm:w-[310px]"
            >
              <ProductCard
                product={product}
                locale={locale}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}