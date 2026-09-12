import { MessageCircle } from "lucide-react";

import { whatsappUrl } from "@/data/contact";

interface FloatingWhatsAppProps {
  locale: string;
}

export default function FloatingWhatsApp({
  locale,
}: FloatingWhatsAppProps) {
  const ar = locale === "ar";

  return (
    <a
      href={whatsappUrl(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ar ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_36px_rgba(37,211,102,0.35)] transition hover:-translate-y-1 hover:bg-[#1fb85a] focus-visible:outline-white sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}
