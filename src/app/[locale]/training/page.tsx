import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import Container from "@/components/ui/Container";
import Navbar from "@/components/layout/Navbar";

import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import { trainingCourses } from "@/data/training";

import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

const translations: Record<Locale, typeof ar> = {
  ar,
  en,
};

export default async function TrainingPage({
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
            <GraduationCap className="h-10 w-10 text-zinc-400" />

            <h1 className="mt-7 text-5xl font-bold tracking-tight sm:text-6xl">
              {isAr
                ? "تعلّم. اصنع. أتقن."
                : "Learn. Build. Master."}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {isAr
                ? "برامج تدريبية عملية في التصميم والطباعة وتجهيز الملفات وصيانة الطابعات."
                : "Practical training in design, printing, slicing and 3D printer maintenance."}
            </p>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-6 md:grid-cols-2">
              {trainingCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/${locale}/training/${course.slug}`}
                  className="group rounded-3xl border border-zinc-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold">
                      {isAr ? course.levelAr : course.level}
                    </span>

                    <ArrowRight
                      className={`h-5 w-5 ${
                        isAr ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <h2 className="mt-8 text-3xl font-bold text-zinc-950">
                    {isAr ? course.titleAr : course.title}
                  </h2>

                  <p className="mt-4 leading-7 text-zinc-600">
                    {isAr
                      ? course.descriptionAr
                      : course.description}
                  </p>

                  <p className="mt-6 text-sm font-semibold text-zinc-500">
                    {isAr
                      ? `المدة: ${course.durationAr}`
                      : `Duration: ${course.duration}`}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}