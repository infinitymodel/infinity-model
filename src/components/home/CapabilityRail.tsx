import { BadgeCheck, Box, PencilRuler, ScanLine } from "lucide-react";

import Container from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";

const capabilities = [
  {
    icon: PencilRuler,
    ar: { title: "تصميم هندسي", detail: "CAD وتهيئة الملفات" },
    en: { title: "Engineering Design", detail: "CAD & file preparation" },
  },
  {
    icon: Box,
    ar: { title: "نمذجة أولية", detail: "اختبر قبل الإنتاج" },
    en: { title: "Rapid Prototyping", detail: "Validate before production" },
  },
  {
    icon: ScanLine,
    ar: { title: "تصنيع رقمي", detail: "حلول مرنة حسب التطبيق" },
    en: { title: "Digital Fabrication", detail: "Flexible, application-led solutions" },
  },
  {
    icon: BadgeCheck,
    ar: { title: "جودة مدروسة", detail: "فحص قبل التسليم" },
    en: { title: "Quality Focus", detail: "Checks before delivery" },
  },
];

export default function CapabilityRail({ locale }: { locale: Locale }) {
  const contentKey = locale === "ar" ? "ar" : "en";

  return (
    <section className="border-y border-white/10 bg-zinc-950 text-white">
      <Container>
        <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x-0 lg:grid-cols-4 lg:divide-y-0 lg:[&>*:not(:first-child)]:border-s lg:[&>*:not(:first-child)]:border-white/10">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            const content = capability[contentKey];

            return (
              <div key={content.title} className="flex items-center gap-4 px-1 py-6 sm:px-6 lg:px-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#c59b27]/35 bg-[#c59b27]/10 text-[#e3bd50]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-black text-white">{content.title}</p>
                  <p className="mt-1 text-xs text-zinc-400">{content.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
