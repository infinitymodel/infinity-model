import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

import {
  isValidLocale,
  locales,
} from "@/i18n/config";

import { trainingCourses } from "@/data/training";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    trainingCourses.map((course) => ({
      locale,
      slug: course.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const course = trainingCourses.find((item) => item.slug === slug);
  if (!course) return {};

  const ar = locale === "ar";
  return buildMetadata({
    locale,
    path: `/training/${slug}`,
    title: ar ? course.titleAr : course.title,
    description: ar ? course.descriptionAr : course.description,
  });
}

export default async function TrainingDetailPage({
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

  const course = trainingCourses.find(
    (item) => item.slug === slug
  );

  if (!course) {
    notFound();
  }

  const isAr = locale === "ar";

  const title = isAr ? course.titleAr : course.title;
  const description = isAr
    ? course.descriptionAr
    : course.description;

  const topics = isAr
    ? course.topicsAr
    : course.topics;

  return (
    <main>
      <section className="bg-zinc-950 py-24 text-white">
        <Container>
          <Breadcrumbs
            locale={locale}
            items={[
              { label: isAr ? "التدريب" : "Training", href: `/${locale}/training` },
              { label: title },
            ]}
          />
            <Link
              href={`/${locale}/training`}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
            >
              {isAr ? (
                <>
                  <ArrowRight className="h-4 w-4" />
                  كل الدورات
                </>
              ) : (
                <>
                  <ArrowLeft className="h-4 w-4" />
                  All Training
                </>
              )}
            </Link>

            <h1 className="mt-10 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
              {title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
              {description}
            </p>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
              <div>
                <h2 className="text-3xl font-bold">
                  {isAr ? "محتوى الدورة" : "Course Content"}
                </h2>

                <div className="mt-8 grid gap-3">
                  {topics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-4"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white">
                        <Check className="h-4 w-4" />
                      </span>

                      <span className="font-medium">
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="h-fit rounded-3xl border border-zinc-200 bg-zinc-50 p-7">
                <div>
                  <span className="text-sm text-zinc-500">
                    {isAr ? "المستوى" : "Level"}
                  </span>

                  <p className="mt-1 font-bold">
                    {isAr ? course.levelAr : course.level}
                  </p>
                </div>

                <div className="mt-6">
                  <span className="text-sm text-zinc-500">
                    {isAr ? "المدة" : "Duration"}
                  </span>

                  <p className="mt-1 font-bold">
                    {isAr
                      ? course.durationAr
                      : course.duration}
                  </p>
                </div>

                <div className="mt-6">
                  <span className="text-sm text-zinc-500">
                    {isAr ? "طريقة التدريب" : "Mode"}
                  </span>

                  <p className="mt-1 font-bold">
                    {isAr ? course.modeAr : course.mode}
                  </p>
                </div>

                <Link
                  href={`/${locale}/contact`}
                  className="mt-8 flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-4 text-sm font-semibold text-white"
                >
                  {isAr ? "طلب التسجيل" : "Request Registration"}

                  <ArrowRight
                    className={`h-4 w-4 ${
                      isAr ? "rotate-180" : ""
                    }`}
                  />
                </Link>
              </aside>
            </div>
          </Container>
        </section>
    </main>
  );
}
