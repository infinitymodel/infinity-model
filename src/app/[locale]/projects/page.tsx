import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

import { isValidLocale } from "@/i18n/config";
import { galleryItems } from "@/data/gallery";

const categories = [
  {
    key: "engineering",
    title: "Engineering",
    titleAr: "الهندسة",
    image: "/images/showcase/functional-bracket.jpg",
  },
  {
    key: "prototypes",
    title: "Prototypes",
    titleAr: "النماذج الأولية",
    image: "/images/showcase/pcb-holder.jpg",
  },
  {
    key: "figures",
    title: "Figures",
    titleAr: "المجسمات",
    image: "/images/showcase/black-panther.jpg",
  },
  {
    key: "creative",
    title: "Creative",
    titleAr: "الإبداعي",
    image: "/images/showcase/pink-character-bust.jpg",
  },
  {
    key: "pcb",
    title: "PCB",
    titleAr: "PCB",
    image: "/images/showcase/pcb-holder.jpg",
  },
  {
    key: "custom",
    title: "Custom",
    titleAr: "مخصص",
    image: "/images/showcase/applications-showcase.jpg",
  },
];

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const isAr = locale === "ar";

  return (
    <main>
      <PageHeader
        locale={locale}
        eyebrow={isAr ? "المعرض" : "Gallery"}
        title={isAr ? "أعمال رقمية، نتائج ملموسة." : "Digital work, tangible results."}
        description={isAr ? "تصفح أعمال Infinity Model وصور الورشة والخامات وتقنيات التنفيذ في مكان واحد." : "Browse Infinity Model work, workshop images, materials and production technology in one place."}
      />

      <section id="gallery" className="scroll-mt-28 py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.16em] text-zinc-500">
              {isAr ? "جميع الصور" : "ALL IMAGES"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              {isAr ? "معرض الأعمال والورشة" : "Work & Workshop Gallery"}
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              {isAr
                ? "كل صورة في الشريط المنزلق تظهر هنا كاملة لتتمكن من استكشاف تفاصيل أعمالنا وتجهيزاتنا."
                : "Every image from the carousel is collected here so you can explore our work and setup in detail."}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => {
              const title = isAr ? item.titleAr : item.titleEn;
              const category = isAr ? item.categoryAr : item.categoryEn;

              return (
                <article
                  id={`gallery-${item.id}`}
                  key={item.id}
                  className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white transition-shadow hover:shadow-xl hover:shadow-zinc-950/5"
                >
                  <div className="relative h-72 overflow-hidden bg-zinc-100 p-3">
                    <Image
                      src={item.image}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-3"
                      priority={index < 3}
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-zinc-100 p-5">
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.14em] text-zinc-500">
                        {category}
                      </p>
                      <h3 className="mt-1 text-base font-black text-zinc-950">{title}</h3>
                    </div>
                    <span className="text-sm font-bold text-zinc-400">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="categories" className="scroll-mt-28 bg-zinc-50 py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.16em] text-zinc-500">
              {isAr ? "حسب التخصص" : "BY DISCIPLINE"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              {isAr ? "استكشف الأعمال حسب نوعها" : "Explore work by type"}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.key}
                href={`/${locale}/projects/${category.key}`}
                className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <Image
                    src={category.image}
                    alt={isAr ? category.titleAr : category.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/35 to-transparent" />
                </div>

                <div className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-400">
                      {category.key}
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      {isAr
                        ? category.titleAr
                        : category.title}
                    </h2>
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition group-hover:bg-zinc-950 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
