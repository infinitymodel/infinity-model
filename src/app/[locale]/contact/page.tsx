import {
  Camera,
  Link as LinkIcon,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
} from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { contactDetails, whatsappUrl } from "@/data/contact";

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
  const socialLinks = [
    {
      label: "Instagram",
      href: contactDetails.socialLinks.instagram,
      icon: Camera,
    },
    {
      label: "TikTok",
      href: contactDetails.socialLinks.tiktok,
      icon: Music2,
    },
    {
      label: "Linktree",
      href: contactDetails.socialLinks.linktree,
      icon: LinkIcon,
    },
  ];

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
                  <a href={contactDetails.phoneHref} className="flex items-center gap-4 rounded-2xl border border-zinc-200 p-5 transition hover:border-zinc-400 hover:bg-zinc-50">
                    <Phone className="h-5 w-5" />
                    <span className="font-semibold">{contactDetails.phoneDisplay}</span>
                  </a>

                  <a href={contactDetails.emailHref} className="flex items-center gap-4 rounded-2xl border border-zinc-200 p-5 transition hover:border-zinc-400 hover:bg-zinc-50">
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">{contactDetails.email}</span>
                  </a>

                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                    <p className="text-sm font-bold text-zinc-950">
                      {isAr ? "تابعنا" : "Follow us"}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;

                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={social.label}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-0.5 hover:border-[#c59b27] hover:bg-[#c59b27] hover:text-zinc-950"
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
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

                  <a
                    href={whatsappUrl(locale, isAr ? "مرحباً Infinity Model، أود طلب عرض سعر لمشروعي." : "Hello Infinity Model, I would like to request a quote for my project.")}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1fb85a]"
                  >
                    <MessageCircle className="h-4 w-4" />

                    {isAr
                      ? "إرسال طلب"
                      : "Send Request"}
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
    </main>
  );
}
