import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";

import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import {
  getTrainingCourse,
  trainingCourses,
} from "@/data/training";

import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

const translations: Record<Locale, typeof ar> = {
  ar,
  en,
};

export function generateStaticParams() {
  return trainingCourses.flatMap((course) =>
    ["ar", "en"].map((locale) => ({
      locale,
      slug: course.slug,
    }))
  );
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

  const course = getTrainingCourse(slug);

  if (!course) {
    notFound();
  }

  const t = translations[locale];
  const isAr = locale === "ar";

  const title = isAr
    ? course.titleAr
    : course.title;

  const description = isAr
    ? course.descriptionAr
    : course.description;

  const topics = isAr
    ? course.topicsAr
    : course.topics;

  return (
    <>
      <Navbar locale={locale} labels={t.navigation} />

      <main>
        <section className="bg-zinc-950 py-24 text-white">
          <Container>
            <GraduationCap className="h-10 w-10 text-zinc-400" />

            <h1 className="mt-7 text-5xl font-bold tracking-tight sm:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-300">
                <Clock className="h-4 w-4" />
                {isAr
                  ? course.durationAr
                  : course.duration}
              </div>

              <div className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-300">
                {isAr ? course.levelAr : course.level}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-4xl font-bold text-zinc-950">
                  {isAr ? "محتوى الدورة" : "Course Content"}
                </h2>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {topics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-5"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                      <span className="font-medium">
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-fit rounded-3xl bg-zinc-950 p-8 text-white">
                <h3 className="text-2xl font-bold">
                  {isAr
                    ? "هل تريد التسجيل؟"
                    : "Want to register?"}
                </h3>

                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  {isAr
                    ? "تواصل معنا لمعرفة المواعيد والتفاصيل."
                    : "Contact us for schedules and registration details."}
                </p>

                <div className="mt-7">
                  <Button href={`/${locale}/contact`}>
                    {isAr ? "التسجيل" : "Register"}
                    <ArrowRight
                      className={`ms-2 h-4 w-4 ${
                        isAr ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}