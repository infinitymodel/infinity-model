import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  Layers3,
} from "lucide-react";

import type { Product } from "@/types/product";
import { sallaStoreUrl } from "@/data/store";

interface ProductCardProps {
  product: Product;
  locale: string;
}

export default function ProductCard({
  product,
  locale,
}: ProductCardProps) {
  const ar = locale === "ar";

  const productName = ar
    ? product.nameAr
    : product.name;

  const productDescription = ar
    ? product.descriptionAr
    : product.description;

  return (
    <article className="group min-w-[285px] overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:min-w-[320px]">
      <a
        href={sallaStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* Image */}

        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          <div className="absolute inset-0 im-grid-bg opacity-60" />

          {product.badge && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-zinc-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white">
              {product.badge}
            </span>
          )}

          <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-700 shadow-sm backdrop-blur">
            <Layers3 className="h-4 w-4" />
          </div>

          <Image
            src={product.image}
            alt={productName}
            fill
            sizes="(max-width: 640px) 285px, 320px"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          {/* View icon */}

          <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-950 shadow-lg transition duration-300 group-hover:scale-110">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Content */}

        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="im-eyebrow text-[10px] font-black uppercase text-zinc-600">
              {product.material}
            </p>

            {product.inStock !== false && (
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {ar ? "متوفر" : "Available"}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-lg font-black tracking-tight text-zinc-950">
            {productName}
          </h3>

          {productDescription && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">
              {productDescription}
            </p>
          )}

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-zinc-100 pt-4">
            <div>
              <p className="im-eyebrow text-[10px] font-bold uppercase text-zinc-500">
                {ar ? "السعر" : "Price"}
              </p>

              <p className="mt-1 text-xl font-black text-zinc-950">
                {product.price > 0 ? (
                  <>{product.price} <span className="text-xs font-bold text-zinc-600">{product.currency}</span></>
                ) : (
                  ar ? "اطلب السعر" : "Request quote"
                )}
              </p>
            </div>

            {product.productionTime && (
              <div className="text-right">
                <p className="im-eyebrow flex items-center justify-end gap-1 text-[10px] font-bold uppercase text-zinc-500">
                  <Clock3 className="h-3 w-3" />

                  {ar ? "الإنتاج" : "Production"}
                </p>

                <p className="mt-1 text-xs font-bold text-zinc-700">
                  {ar
                    ? product.productionTimeAr
                    : product.productionTime}
                </p>
              </div>
            )}
          </div>
        </div>
      </a>
    </article>
  );
}
