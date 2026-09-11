import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

import { trainingCourses } from "@/data/training";

import { isValidLocale } from "@/i18n/config";

export default async function TrainingPage({
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
        eyebrow={isAr ? "التدريب" : "Training"}
        title={isAr ? "تعلّم المهارات التي تصنع الفكرة." : "Learn the skills that make ideas real."}
        description={isAr ? "تعلم التصميم والطباعة والصيانة من خلال تدريب عملي مرتبط بالتصنيع الرقمي." : "Learn design, printing and maintenance through practical training connected to digital manufacturing."}
      />

        <section className="py-24">
          <Container>
            <div className="grid gap-6 md:grid-cols-2">
              {trainingCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/${locale}/training/${course.slug}`}
                  className="group rounded-3xl border border-zinc-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                      {isAr ? course.levelAr : course.level}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition group-hover:bg-zinc-950 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <h2 className="mt-8 text-2xl font-bold text-zinc-950">
                    {isAr ? course.titleAr : course.title}
                  </h2>

                  <p className="mt-4 leading-7 text-zinc-600">
                    {isAr
                      ? course.descriptionAr
                      : course.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3 text-xs text-zinc-500">
                    <span className="rounded-full bg-zinc-100 px-3 py-2">
                      {isAr
                        ? course.durationAr
                        : course.duration}
                    </span>

                    <span className="rounded-full bg-zinc-100 px-3 py-2">
                      {isAr ? course.modeAr : course.mode}
                    </span>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold">
                    {isAr ? "تفاصيل الدورة" : "Course Details"}

                    <ArrowRight
                      className={`h-4 w-4 ${
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
  );
}
