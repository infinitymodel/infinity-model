import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

import { isValidLocale } from "@/i18n/config";

const categories = [
  {
    key: "engineering",
    title: "Engineering",
    titleAr: "الهندسة",
    image: "/images/services/3d-printing/resin-printer.jpg",
  },
  {
    key: "prototypes",
    title: "Prototypes",
    titleAr: "النماذج الأولية",
    image: "/images/projects/prototypes/dragon-display.jpg",
  },
  {
    key: "figures",
    title: "Figures",
    titleAr: "المجسمات",
    image: "/images/products/figures/black-panther.jpg",
  },
  {
    key: "creative",
    title: "Creative",
    titleAr: "الإبداعي",
    image: "/images/projects/creative/jizan-relief.jpg",
  },
  {
    key: "pcb",
    title: "PCB",
    titleAr: "PCB",
    image: "/images/products/decor/incense-holder.jpg",
  },
  {
    key: "custom",
    title: "Custom",
    titleAr: "مخصص",
    image: "/images/projects/custom/saudi-cup-holder.jpg",
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
        eyebrow={isAr ? "المشاريع" : "Projects"}
        title={isAr ? "أعمال رقمية، نتائج ملموسة." : "Digital work, tangible results."}
        description={isAr ? "نماذج من أعمال Infinity Model في التصميم والتصنيع الرقمي والنمذجة الأولية." : "Selected Infinity Model work across design, digital manufacturing and rapid prototyping."}
      />

        <section className="py-24">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
