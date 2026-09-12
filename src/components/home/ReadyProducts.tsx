import { ArrowRight, Sparkles } from "lucide-react";

import Container from "@/components/ui/Container";
import ProductCard from "./ProductCard";

import { products } from "@/data/products";
import { sallaStoreUrl } from "@/data/store";

interface ReadyProductsProps {
  locale: string;
  content: {
    eyebrow?: string;
    title: string;
    description?: string;
    viewAll?: string;
  };
}

export default function ReadyProducts({
  locale,
  content,
}: ReadyProductsProps) {
  const ar = locale === "ar";

  return (
    <section className="overflow-hidden border-b border-zinc-200 bg-white py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c59b27]/70" />

              <Sparkles className="h-3.5 w-3.5 text-[#c59b27]" aria-hidden="true" />

              <p className="im-eyebrow text-xs font-black uppercase text-zinc-600">
                {content.eyebrow ||
                  (ar
                    ? "منتجات مختارة"
                    : "Featured Products")}
              </p>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>

            {content.description && (
              <p className="mt-5 text-base leading-8 text-zinc-700">
                {content.description}
              </p>
            )}
          </div>

          <a
            href={sallaStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-zinc-950"
          >
            {content.viewAll ||
              (ar
                ? "عرض جميع المنتجات"
                : "View All Products")}

            <ArrowRight
              className={[
                "h-4 w-4 transition-transform group-hover:translate-x-1",
                ar ? "rotate-180 group-hover:-translate-x-1" : "",
              ].join(" ")}
            />
          </a>
        </div>
      </Container>

      <div className="mt-12 overflow-hidden">
        <div className="im-hide-scrollbar flex gap-5 overflow-x-auto px-5 pb-5 sm:px-6 lg:px-[max(calc((100vw-1280px)/2),32px)]">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
