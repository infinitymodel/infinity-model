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

        <section className="bg-zinc-50 py-20 sm:py-24">
          <Container>
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-2xl text-base leading-8 text-zinc-600">
                {isAr ? "مسارات عملية تجمع المعرفة والتطبيق، وتناسب من يبدأ رحلته أو يرغب في تطوير مهارة محددة." : "Practical tracks that combine knowledge with application, for beginners and those developing a specific skill."}
              </p>
              <span className="w-fit rounded-full border border-[#c59b27]/30 bg-[#c59b27]/10 px-4 py-2 text-xs font-black text-[#946f12]">
                {isAr ? `${trainingCourses.length} مسارات تدريبية` : `${trainingCourses.length} training tracks`}
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {trainingCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/${locale}/training/${course.slug}`}
                  className="im-surface im-interactive-card group rounded-[1.75rem] p-7 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-zinc-500">
                      {isAr ? course.levelAr : course.level}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white transition group-hover:bg-zinc-950 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <h2 className="mt-8 text-2xl font-black tracking-tight text-zinc-950">
                    {isAr ? course.titleAr : course.title}
                  </h2>

                  <p className="mt-4 leading-7 text-zinc-600">
                    {isAr
                      ? course.descriptionAr
                      : course.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3 text-xs text-zinc-500">
                    <span className="rounded-full bg-zinc-100 px-3 py-2 font-semibold">
                      {isAr
                        ? course.durationAr
                        : course.duration}
                    </span>

                    <span className="rounded-full bg-zinc-100 px-3 py-2 font-semibold">
                      {isAr ? course.modeAr : course.mode}
                    </span>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-sm font-black text-zinc-950">
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
