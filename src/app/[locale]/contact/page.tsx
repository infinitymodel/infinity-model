import Link from "next/link";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

import { isValidLocale } from "@/i18n/config";

export default async function ContactPage({
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
        eyebrow={isAr ? "تواصل معنا" : "Contact"}
        title={isAr ? "لنبدأ مشروعك التالي." : "Let’s start your next project."}
        description={isAr ? "أخبرنا عن فكرتك أو مشروعك وسنساعدك في اختيار الحل المناسب." : "Tell us about your idea or project and we will help you choose the right solution."}
      />

        <section className="py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold">
                  {isAr ? "ابدأ مشروعك" : "Start Your Project"}
                </h2>

                <p className="mt-5 max-w-xl leading-8 text-zinc-600">
                  {isAr
                    ? "يمكنك التواصل معنا للاستفسار عن الطباعة والتصميم والنمذجة الأولية والصيانة والتدريب."
                    : "Contact us about 3D printing, design, prototyping, maintenance or training."}
                </p>

                <div className="mt-10 grid gap-4">
                  <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 p-5">
                    <Phone className="h-5 w-5" />
                    <span>{isAr ? "الهاتف" : "Phone"}</span>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 p-5">
                    <Mail className="h-5 w-5" />
                    <span>{isAr ? "البريد الإلكتروني" : "Email"}</span>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 p-5">
                    <MapPin className="h-5 w-5" />
                    <span>
                      {isAr
                        ? "جازان، المملكة العربية السعودية"
                        : "Jizan, Saudi Arabia"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
                <h2 className="text-2xl font-bold">
                  {isAr ? "اطلب عرض سعر" : "Request a Quote"}
                </h2>

                <div className="mt-8 grid gap-4">
                  <input
                    type="text"
                    placeholder={isAr ? "الاسم" : "Name"}
                    className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 outline-none focus:border-zinc-500"
                  />

                  <input
                    type="email"
                    placeholder={isAr ? "البريد الإلكتروني" : "Email"}
                    className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 outline-none focus:border-zinc-500"
                  />

                  <textarea
                    rows={6}
                    placeholder={
                      isAr
                        ? "اكتب تفاصيل مشروعك..."
                        : "Tell us about your project..."
                    }
                    className="resize-none rounded-2xl border border-zinc-200 bg-white px-5 py-4 outline-none focus:border-zinc-500"
                  />

                  <Link
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white"
                  >
                    <MessageCircle className="h-4 w-4" />

                    {isAr
                      ? "إرسال طلب"
                      : "Send Request"}
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
    </main>
  );
}
