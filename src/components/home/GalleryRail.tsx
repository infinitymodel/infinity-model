"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import type { GalleryItem } from "@/data/gallery";

interface GalleryRailProps {
  locale: string;
  items: GalleryItem[];
}

export default function GalleryRail({ locale, items }: GalleryRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const isArabic = locale === "ar";

  function moveRail(direction: "previous" | "next") {
    const rail = railRef.current;
    if (!rail) return;

    const distance = Math.max(rail.clientWidth * 0.78, 320);
    const isNext = direction === "next";

    rail.scrollBy({
      left: (isNext ? 1 : -1) * distance,
      behavior: "smooth",
    });
  }

  const previousLabel = isArabic ? "عرض الأعمال السابقة" : "Previous work";
  const nextLabel = isArabic ? "عرض أعمال إضافية" : "More work";

  return (
    <div className="mt-12">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-zinc-500">
          {isArabic
            ? `${items.length} صورة من أعمالنا وورشتنا`
            : `${items.length} images from our work and workshop`}
        </p>

        <div className="flex items-center gap-2" dir="ltr">
          <button
            type="button"
            onClick={() => moveRail("previous")}
            aria-label={previousLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-950 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => moveRail("next")}
            aria-label={nextLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-950 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="im-hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {items.map((item, index) => {
          const title = isArabic ? item.titleAr : item.titleEn;
          const category = isArabic ? item.categoryAr : item.categoryEn;

          return (
            <Link
              key={item.id}
              href={`/${locale}/projects#gallery-${item.id}`}
              className="group relative w-[min(82vw,22rem)] shrink-0 snap-start overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-4 sm:w-[22rem]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 82vw, 352px"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.15em] text-white/65">
                      {category}
                    </p>
                    <h3 className="mt-1 text-lg font-black leading-7">{title}</h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950 transition duration-300 group-hover:scale-110">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
