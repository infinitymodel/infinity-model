"use client";

import { FormEvent, useId, useState } from "react";
import { MessageCircle } from "lucide-react";

import { whatsappUrl } from "@/data/contact";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/config";

interface QuoteFormProps {
  locale: Locale;
}

export default function QuoteForm({ locale }: QuoteFormProps) {
  const isArabic = locale === "ar";
  const nameId = useId();
  const emailId = useId();
  const inquiryId = useId();
  const detailsId = useId();
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false);

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsOpeningWhatsApp(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const inquiry = String(form.get("inquiry") ?? "").trim();
    const details = String(form.get("details") ?? "").trim();

    const message = isArabic
      ? `مرحباً Infinity Model، لدي طلب جديد.\n\nالاسم: ${name}\nالبريد الإلكتروني: ${email}\nالخدمة أو نوع الاستفسار: ${inquiry}\nتفاصيل المشروع: ${details}`
      : `Hello Infinity Model, I have a new request.\n\nName: ${name}\nEmail: ${email}\nService or inquiry type: ${inquiry}\nProject details: ${details}`;

    window.open(whatsappUrl(locale, message), "_blank", "noopener,noreferrer");
    setIsOpeningWhatsApp(false);
  }

  return (
    <form className="mt-8 grid gap-4" onSubmit={submitQuote}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-800" htmlFor={nameId}>
          {isArabic ? "الاسم" : "Name"}
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          required
          className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#c59b27] focus:ring-4 focus:ring-[#c59b27]/15"
          placeholder={isArabic ? "الاسم الكامل" : "Full name"}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-800" htmlFor={emailId}>
          {isArabic ? "البريد الإلكتروني" : "Email"}
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#c59b27] focus:ring-4 focus:ring-[#c59b27]/15"
          placeholder="name@example.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-800" htmlFor={inquiryId}>
          {isArabic ? "الخدمة أو نوع الاستفسار" : "Service or inquiry type"}
        </label>
        <select
          id={inquiryId}
          name="inquiry"
          required
          defaultValue=""
          className="w-full appearance-none rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-[#c59b27] focus:ring-4 focus:ring-[#c59b27]/15"
        >
          <option value="" disabled>
            {isArabic ? "اختر الخدمة أو نوع الطلب" : "Choose a service or request type"}
          </option>
          <optgroup label={isArabic ? "نوع الطلب" : "Request type"}>
            <option value={isArabic ? "استفسار عام" : "General inquiry"}>
              {isArabic ? "استفسار عام" : "General inquiry"}
            </option>
            <option value={isArabic ? "طلب عرض سعر" : "Request a quote"}>
              {isArabic ? "طلب عرض سعر" : "Request a quote"}
            </option>
            <option value={isArabic ? "متابعة طلب قائم" : "Existing order follow-up"}>
              {isArabic ? "متابعة طلب قائم" : "Existing order follow-up"}
            </option>
          </optgroup>
          <optgroup label={isArabic ? "الخدمات" : "Services"}>
            {services.map((service) => (
              <option key={service.slug} value={isArabic ? service.titleAr : service.title}>
                {isArabic ? service.titleAr : service.title}
              </option>
            ))}
          </optgroup>
          <option value={isArabic ? "خدمة أو مشروع آخر" : "Other service or project"}>
            {isArabic ? "خدمة أو مشروع آخر" : "Other service or project"}
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-800" htmlFor={detailsId}>
          {isArabic ? "تفاصيل المشروع" : "Project details"}
        </label>
        <textarea
          id={detailsId}
          name="details"
          rows={6}
          required
          className="w-full resize-none rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#c59b27] focus:ring-4 focus:ring-[#c59b27]/15"
          placeholder={isArabic ? "نوع الخدمة، الأبعاد، الكمية والموعد المطلوب…" : "Service, dimensions, quantity and target date…"}
        />
      </div>

      <button
        type="submit"
        disabled={isOpeningWhatsApp}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1fb85a] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {isOpeningWhatsApp
          ? isArabic ? "جارٍ فتح واتساب…" : "Opening WhatsApp…"
          : isArabic ? "إرسال الطلب عبر واتساب" : "Send request on WhatsApp"}
      </button>

      <p className="text-xs leading-5 text-zinc-500">
        {isArabic
          ? "سيُفتح واتساب مع تفاصيل طلبك؛ لن تُرسل البيانات إلى خادم الموقع."
          : "WhatsApp will open with your request details; this website does not store the form data."}
      </p>
    </form>
  );
}
