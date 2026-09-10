import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";

import Container from "@/components/ui/Container";
import Navbar from "@/components/layout/Navbar";

import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

const translations: Record<Locale, typeof ar> = {
  ar,
  en,
};

const projects = [
  {
    slug: "engineering",
    title: "Engineering Projects",
    titleAr: "مشاريع هندسية",
    description:
      "Functional parts, fixtures, prototypes and engineering models.",
    descriptionAr:
      "قطع وظيفية وFixtures ونماذج أولية ومجسمات هندسية.",
  },
  {
    slug: "prototypes",
    title: "Rapid Prototypes",
    titleAr: "نماذج أولية سريعة",
    description:
      "Concept development and physical validation.",
    descriptionAr:
      "تطوير الأفكار واختبارها بشكل فعلي.",
  },
  {
    slug: "creative",
    title: "Creative Projects",
    titleAr: "مشاريع إبداعية",
    description:
      "Figures, sculptures, decorative products and collectibles.",
    descriptionAr:
      "مجسمات وتماثيل وقطع ديكور ومقتنيات.",
  },
  {
    slug: "pcb",
    title: "PCB Projects",
    titleAr: "مشاريع PCB",
    description:
      "Digital PCB prototyping and fabrication.",
    descriptionAr:
      "تصنيع النماذج الأولية للدوائر المطبوعة.",
  },
  {
    slug: "custom",
    title: "Custom Manufacturing",
    titleAr: "تصنيع حسب الطلب",
    description:
      "Special products developed around customer requirements.",
    descriptionAr:
      "منتجات خاصة يتم تطويرها حسب متطلبات العميل.",
  },
];

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const t = translations[locale];
  const isAr = locale === "ar";

  return (
    <>
      <Navbar locale={locale} labels={t.navigation} />

      <main>
        <section className="bg-zinc-950 py-24 text-white">
          <Container>
            <FolderKanban className="h-10 w-10 text-zinc-400" />

            <h1 className="mt-7 text-5xl font-bold tracking-tight sm:text-6xl">
              {isAr ? "مشاريعنا" : "Our Projects"}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {isAr
                ? "من النماذج الهندسية إلى المنتجات الإبداعية والتصنيع المخصص."
                : "From engineering models to creative products and custom manufacturing."}
            </p>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/${locale}/projects/${project.slug}`}
                  className="group rounded-3xl border border-zinc-200 p-8 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="text-sm font-semibold text-zinc-400">
                    01
                  </span>

                  <h2 className="mt-7 text-2xl font-bold">
                    {isAr
                      ? project.titleAr
                      : project.title}
                  </h2>

                  <p className="mt-4 leading-7 text-zinc-600">
                    {isAr
                      ? project.descriptionAr
                      : project.description}
                  </p>

                  <div className="mt-7 flex items-center text-sm font-semibold">
                    {isAr ? "استكشف المشروع" : "Explore Project"}
                    <ArrowRight
                      className={`ms-2 h-4 w-4 ${
                        isAr ? "rotate-180" : ""
                      }`}
                    />
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