import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Camera,
  Link as LinkIcon,
  MapPin,
  Music2,
} from "lucide-react";

import { contactDetails } from "@/data/contact";
import { sallaStoreUrl } from "@/data/store";

interface FooterProps {
  locale: string;
}

export default function Footer({
  locale,
}: FooterProps) {
  const ar = locale === "ar";

  const links = [
    {
      label: ar ? "الرئيسية" : "Home",
      href: `/${locale}`,
    },
    {
      label: ar ? "الخدمات" : "Services",
      href: `/${locale}/services`,
    },
    {
      label: ar ? "المتجر" : "Shop",
      href: sallaStoreUrl,
      external: true,
    },
    {
      label: ar ? "التدريب" : "Training",
      href: `/${locale}/training`,
    },
    {
      label: ar ? "المعرض" : "Gallery",
      href: `/${locale}/projects`,
    },
    {
      label: ar ? "من نحن" : "About",
      href: `/${locale}/about`,
    },
    {
      label: ar ? "الثقة والجودة" : "Trust & Quality",
      href: `/${locale}/proof`,
    },
    {
      label: ar ? "تواصل معنا" : "Contact",
      href: `/${locale}/contact`,
    },
  ];

  const services = [
    {
      label: ar
        ? "الطباعة ثلاثية الأبعاد"
        : "3D Printing",
      href: `/${locale}/services/3d-printing`,
    },
    {
      label: ar
        ? "التصميم ثلاثي الأبعاد"
        : "CAD & 3D Design",
      href: `/${locale}/services/cad-design`,
    },
    {
      label: ar
        ? "النمذجة الأولية"
        : "Rapid Prototyping",
      href: `/${locale}/services/rapid-prototyping`,
    },
    {
      label: ar
        ? "صيانة الطابعات"
        : "Printer Maintenance",
      href: `/${locale}/services/printer-maintenance`,
    },
  ];

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
    <footer className="border-t border-zinc-200 bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href={`/${locale}`} className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                <Image
                  src="/images/brand/infinity-model-mark.png"
                  alt="Infinity Model"
                  fill
                  sizes="56px"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight">INFINITY MODEL</div>
                <div className="mt-1 text-[10px] font-medium tracking-[0.16em] text-zinc-400">
                  DESIGN • DIGITAL MANUFACTURING • RAPID PROTOTYPING
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-zinc-300">
              {ar
                ? "نحوّل الأفكار والملفات الرقمية إلى منتجات ونماذج واقعية من خلال التصميم والتصنيع الرقمي والطباعة ثلاثية الأبعاد."
                : "We transform ideas and digital files into physical products through design, digital manufacturing and 3D technology."}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-zinc-300">
              <MapPin className="h-4 w-4" />

              <span>
                {ar
                  ? "جازان، المملكة العربية السعودية"
                  : "Jizan, Saudi Arabia"}
              </span>
            </div>

            <div className="mt-7 flex items-center gap-3" aria-label={ar ? "وسائل التواصل الاجتماعي" : "Social media"}>
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-zinc-200 transition hover:-translate-y-0.5 hover:border-[#e3bd50]/70 hover:bg-[#c59b27] hover:text-zinc-950"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold">
              {ar ? "روابط سريعة" : "Quick Links"}
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-zinc-300 transition hover:text-[#e3bd50]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-bold">
              {ar ? "خدماتنا" : "Our Services"}
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="text-sm text-zinc-300 transition hover:text-[#e3bd50]"
                >
                  {service.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-bold">
              {ar ? "ابدأ مشروعك" : "Start Your Project"}
            </h3>

            <p className="mt-5 text-sm leading-6 text-zinc-300">
              {ar
                ? "لديك فكرة أو ملف CAD؟ دعنا نحوله إلى نموذج أو منتج حقيقي."
                : "Have an idea or CAD file? Let us turn it into a real prototype or product."}
            </p>

            <Link
              href={`/${locale}/contact`}
              className="im-cta-light mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold transition hover:bg-zinc-200"
            >
              {ar ? "اطلب عرض سعر" : "Request a Quote"}

              <ArrowUpRight className="h-4 w-4" />
            </Link>

          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-800 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Infinity Model.{" "}
            {ar
              ? "جميع الحقوق محفوظة."
              : "All rights reserved."}
          </p>

          <p>
            {ar
              ? "من الفكرة إلى الواقع الملموس"
              : "From idea to physical reality"}
          </p>
        </div>
      </div>
    </footer>
  );
}
