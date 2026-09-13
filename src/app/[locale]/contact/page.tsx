import {
  Camera,
  Link as LinkIcon,
  Mail,
  MapPin,
  Music2,
  Phone,
} from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import QuoteForm from "@/components/contact/QuoteForm";
import { contactDetails } from "@/data/contact";
import { services } from "@/data/services";

import { isValidLocale } from "@/i18n/config";

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  const { service: serviceSlug } = await searchParams;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const isAr = locale === "ar";
  const selectedService = services.find((service) => service.slug === serviceSlug);
  const initialService = selectedService
    ? isAr ? selectedService.titleAr : selectedService.title
    : undefined;
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

        <section className="bg-zinc-50/70 py-20 sm:py-24">
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
                  <a href={contactDetails.phoneHref} className="im-premium-card flex items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-[#c59b27]/45 hover:shadow-lg">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-[#e3bd50]">
                      <Phone className="h-5 w-5" />
                    </span>
                    <span dir="ltr" className="font-semibold text-left [unicode-bidi:isolate]">
                      {contactDetails.phoneDisplay}
                    </span>
                  </a>

                  <a href={contactDetails.emailHref} className="im-premium-card flex items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-[#c59b27]/45 hover:shadow-lg">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-[#e3bd50]">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span className="font-semibold">{contactDetails.email}</span>
                  </a>

                  <div className="im-premium-card rounded-2xl p-5">
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
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-0.5 hover:border-[#c59b27] hover:bg-[#c59b27] hover:text-zinc-950"
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  <div className="im-premium-card flex items-center gap-4 rounded-2xl p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-[#e3bd50]">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span>
                      {isAr
                        ? "جازان، المملكة العربية السعودية"
                        : "Jizan, Saudi Arabia"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="im-premium-card rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(24,24,27,0.08)] sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#c59b27] shadow-[0_0_0_5px_rgba(197,155,39,0.12)]" />
                  <p className="im-eyebrow text-[11px] font-black text-zinc-500">
                    {isAr ? "خطوتك الأولى نحو التنفيذ" : "Your first step to production"}
                  </p>
                </div>
                <h2 className="text-2xl font-bold">
                  {isAr ? "اطلب عرض سعر" : "Request a Quote"}
                </h2>

                <QuoteForm locale={locale} initialService={initialService} />
              </div>
            </div>
          </Container>
        </section>
    </main>
  );
}
