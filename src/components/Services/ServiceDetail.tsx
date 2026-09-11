import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageSquareQuote,
} from "lucide-react";

import Container from "@/components/ui/Container";
import type { Service } from "@/data/services";

interface ServiceDetailProps {
  service: Service;
  locale: string;
}

export default function ServiceDetail({
  service,
  locale,
}: ServiceDetailProps) {
  const isAr = locale === "ar";

  const title = isAr ? service.titleAr : service.title;
  const shortDescription = isAr
    ? service.shortDescriptionAr
    : service.shortDescription;

  const description = isAr
    ? service.descriptionAr
    : service.description;

  const features = isAr
    ? service.featuresAr
    : service.features;

  return (
    <main>
      <section className="bg-zinc-950 py-24 text-white">
        <Container>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            {isAr ? (
              <>
                <ArrowRight className="h-4 w-4" />
                كل الخدمات
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4" />
                All Services
              </>
            )}
          </Link>

          <div className="mt-10 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {service.category}
            </p>

            <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">
              {title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
              {shortDescription}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <div className="flex aspect-[4/3] items-center justify-center rounded-[2rem] border border-zinc-200 bg-zinc-100">
                <span className="text-sm text-zinc-400">
                  {isAr ? "مكان صورة الخدمة" : "Service Image"}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950">
                {isAr ? "عن الخدمة" : "About This Service"}
              </h2>

              <p className="mt-6 text-base leading-8 text-zinc-600 sm:text-lg">
                {description}
              </p>

              <div className="mt-10">
                <h3 className="text-xl font-bold text-zinc-950">
                  {isAr ? "ما نقدمه" : "What We Provide"}
                </h3>

                <div className="mt-5 grid gap-3">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white">
                        <Check className="h-4 w-4" />
                      </span>

                      <span className="font-medium text-zinc-800">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/${locale}/contact`}
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                <MessageSquareQuote className="h-4 w-4" />

                {isAr ? "اطلب هذه الخدمة" : "Request This Service"}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}