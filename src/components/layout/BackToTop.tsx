"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop({ locale }: { locale: "ar" | "en" }) {
  const [visible, setVisible] = useState(false);
  const isArabic = locale === "ar";

  useEffect(() => {
    function updateVisibility() {
      setVisible(window.scrollY > 560);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={isArabic ? "العودة إلى أعلى الصفحة" : "Back to top"}
      className={[
        "fixed bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-950 shadow-[0_12px_30px_rgba(24,24,27,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white focus-visible:outline-zinc-950 sm:bottom-7",
        "left-5 sm:left-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
