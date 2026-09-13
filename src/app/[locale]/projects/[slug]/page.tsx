import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

import { isValidLocale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";

const projects = {
  engineering: {
    title: "Engineering Projects",
    titleAr: "مشاريع هندسية",
    description:
      "Functional components, fixtures, prototypes and engineering models.",
    descriptionAr:
      "قطع وظيفية وFixtures ونماذج أولية ومجسمات هندسية.",
  },
  prototypes: {
    title: "Rapid Prototypes",
    titleAr: "نماذج أولية سريعة",
    description:
      "Physical prototypes for testing concepts before production.",
    descriptionAr:
      "نماذج أولية فعلية لاختبار الأفكار قبل الإنتاج.",
  },
  figures: {
    title: "Figures & Collectibles",
    titleAr: "مجسمات ومقتنيات",
    description: "Custom figures, collectibles and display pieces created through digital manufacturing.",
    descriptionAr: "مجسمات ومقتنيات وقطع عرض مخصصة مصنعة بتقنيات التصنيع الرقمي.",
  },
  creative: {
    title: "Creative Projects",
    titleAr: "مشاريع إبداعية",
    description:
      "Figures, sculptures, collectibles and decorative products.",
    descriptionAr:
      "مجسمات وتماثيل ومقتنيات ومنتجات ديكورية.",
  },
  pcb: {
    title: "PCB Projects",
    titleAr: "مشاريع PCB",
    description:
      "Digital PCB prototyping and fabrication.",
    descriptionAr:
      "تصنيع النماذج الأولية للدوائر المطبوعة.",
  },
  custom: {
    title: "Custom Manufacturing",
    titleAr: "تصنيع حسب الطلب",
    description:
      "Products and components developed around customer requirements.",
    descriptionAr:
      "منتجات وقطع يتم تطويرها حسب متطلبات العميل.",
  },
};

const projectImages: Record<keyof typeof projects, string[]> = {
  engineering: ["/images/showcase/functional-bracket.jpg", "/images/showcase/applications-showcase.jpg", "/images/showcase/printing-nozzle.jpg"],
  prototypes: ["/images/showcase/pcb-holder.jpg", "/images/showcase/functional-bracket.jpg", "/images/showcase/printing-nozzle.jpg"],
  figures: ["/images/showcase/black-panther.jpg", "/images/showcase/dragon-winged.jpg", "/images/showcase/turquoise-character-bust.jpg", "/images/showcase/pink-character-bust.jpg", "/images/showcase/collectible-figures.jpg"],
  creative: ["/images/showcase/pink-character-bust.jpg", "/images/showcase/grim-cat-figure.jpg", "/images/showcase/collectible-figures.jpg", "/images/showcase/saudi-figure.jpg", "/images/showcase/dragon-winged-alt.jpg"],
  pcb: ["/images/showcase/pcb-holder.jpg", "/images/showcase/functional-bracket.jpg"],
  custom: ["/images/showcase/applications-showcase.jpg", "/images/showcase/saudi-figure.jpg", "/images/showcase/dragon-winged-alt.jpg"],
};

export function generateStaticParams() {
  return Object.keys(projects).flatMap((slug) =>
    ["ar", "en"].map((locale) => ({
      locale,
      slug,
    }))
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const project =
    projects[slug as keyof typeof projects];

  if (!project) {
    notFound();
  }

  const isAr = locale === "ar";
  const images = projectImages[slug as keyof typeof projectImages];

  return (
    <main>
      <section className="bg-zinc-950 py-24 text-white">
        <Container>
          <Breadcrumbs
            locale={locale}
            items={[
              { label: isAr ? "المعرض" : "Gallery", href: `/${locale}/projects` },
              { label: isAr ? project.titleAr : project.title },
            ]}
          />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {isAr ? "مشروع" : "PROJECT"}
            </p>

            <h1 className="mt-5 text-5xl font-bold sm:text-6xl">
              {isAr ? project.titleAr : project.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
              {isAr
                ? project.descriptionAr
                : project.description}
            </p>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={image}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100"
                >
                  <Image
                    src={image}
                    alt={`${isAr ? project.titleAr : project.title} ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-zinc-50 py-24">
          <Container>
            <h2 className="text-4xl font-bold">
              {isAr
                ? "من الفكرة إلى النتيجة"
                : "From Idea to Result"}
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                isAr ? "المتطلبات" : "Requirements",
                isAr ? "التنفيذ" : "Production",
                isAr ? "الفحص والتسليم" : "QC & Delivery",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-3xl border border-zinc-200 bg-white p-7"
                >
                  <CheckCircle2 className="h-6 w-6" />

                  <h3 className="mt-5 font-bold">
                    {step}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {isAr
                      ? "يتم تنفيذ المرحلة وفق متطلبات المشروع."
                      : "The stage is completed according to project requirements."}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Button href={`/${locale}/contact`}>
                {isAr
                  ? "ابدأ مشروعك"
                  : "Start Your Project"}
                <ArrowRight
                  className={`ms-2 h-4 w-4 ${
                    isAr ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
          </Container>
        </section>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const project = projects[slug as keyof typeof projects];
  if (!project) return {};
  const ar = locale === "ar";
  return buildMetadata({
    locale,
    path: `/projects/${slug}`,
    title: ar ? project.titleAr : project.title,
    description: ar ? project.descriptionAr : project.description,
  });
}
