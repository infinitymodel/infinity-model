"use client";

import { ChangeEvent, FormEvent, useId, useState } from "react";
import { FileUp, MessageCircle, Paperclip, Send } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/data/contact";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/config";

const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
const ACCEPTED_FILES = ".stl,.obj,.3mf,.step,.stp,.zip,.pdf,.png,.jpg,.jpeg";

interface QuoteFormProps {
  locale: Locale;
  initialService?: string;
}

export default function QuoteForm({
  locale,
  initialService,
}: QuoteFormProps) {
  const isArabic = locale === "ar";
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const inquiryId = useId();
  const dimensionsId = useId();
  const materialId = useId();
  const quantityId = useId();
  const dateId = useId();
  const detailsId = useId();
  const attachmentId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachmentName, setAttachmentName] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState("");

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFormError("");

    if (!file) {
      setAttachmentName("");
      return;
    }

    if (file.size > MAX_ATTACHMENT_BYTES) {
      event.target.value = "";
      setAttachmentName("");
      setFormError(isArabic ? "حجم الملف يجب ألا يتجاوز 4 ميجابايت." : "The attachment must be 4 MB or smaller.");
      return;
    }

    setAttachmentName(file.name);
  }

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setFormMessage("");
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const inquiry = String(form.get("inquiry") ?? "").trim();
    const dimensions = String(form.get("dimensions") ?? "").trim();
    const material = String(form.get("material") ?? "").trim();
    const quantity = String(form.get("quantity") ?? "").trim();
    const targetDate = String(form.get("targetDate") ?? "").trim();
    const details = String(form.get("details") ?? "").trim();
    const attachment = form.get("attachment");
    const file = attachment instanceof File && attachment.size > 0 ? attachment : undefined;

    let delivered = false;

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const result: { delivered?: boolean } = await response.json();
        delivered = result.delivered === true;
      }
    } catch {
      // WhatsApp remains a resilient fallback if the quote delivery endpoint is unavailable.
    }

    const attachmentLine = file
      ? isArabic
        ? `الملف: ${file.name}${delivered ? " (تم تسليمه للفريق)" : " — يرجى إرفاقه داخل واتساب أيضاً"}`
        : `File: ${file.name}${delivered ? " (delivered to the team)" : " — please also attach it in WhatsApp"}`
      : isArabic ? "الملف: لا يوجد" : "File: none";

    const message = isArabic
      ? `مرحباً Infinity Model، لدي طلب عرض سعر جديد.\n\nالاسم: ${name}\nالبريد الإلكتروني: ${email}\nرقم الهاتف: ${phone || "غير مضاف"}\nالخدمة: ${inquiry}\nالأبعاد: ${dimensions || "غير محددة"}\nالخامة المطلوبة: ${material || "غير محددة"}\nالكمية: ${quantity || "غير محددة"}\nالموعد المطلوب: ${targetDate || "مرن"}\n${attachmentLine}\n\nتفاصيل المشروع:\n${details}`
      : `Hello Infinity Model, I have a new quote request.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nService: ${inquiry}\nDimensions: ${dimensions || "Not specified"}\nMaterial: ${material || "Not specified"}\nQuantity: ${quantity || "Not specified"}\nTarget date: ${targetDate || "Flexible"}\n${attachmentLine}\n\nProject details:\n${details}`;

    trackEvent("generate_lead", {
      inquiry_type: inquiry,
      has_attachment: Boolean(file),
      quote_delivery_configured: delivered,
    });

    window.open(whatsappUrl(locale, message), "_blank", "noopener,noreferrer");
    setFormMessage(
      delivered
        ? isArabic ? "تم تسليم الطلب للفريق وفتح واتساب للمتابعة." : "The request was delivered to the team and WhatsApp has opened for follow-up."
        : isArabic ? "تم فتح واتساب لإرسال الطلب. أرفق الملف داخل المحادثة إذا اخترته." : "WhatsApp has opened for your request. Attach the selected file in the chat if needed."
    );
    setIsSubmitting(false);
  }

  return (
    <form className="mt-8 grid gap-4" onSubmit={submitQuote}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={isArabic ? "الاسم" : "Name"} htmlFor={nameId}>
          <input id={nameId} name="name" type="text" autoComplete="name" required className="quote-input" placeholder={isArabic ? "الاسم الكامل" : "Full name"} />
        </Field>

        <Field label={isArabic ? "البريد الإلكتروني" : "Email"} htmlFor={emailId}>
          <input id={emailId} name="email" type="email" autoComplete="email" required className="quote-input" placeholder="name@example.com" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={isArabic ? "رقم الهاتف" : "Phone"} htmlFor={phoneId}>
          <input id={phoneId} name="phone" type="tel" autoComplete="tel" dir="ltr" className="quote-input text-left" placeholder="+966 5X XXX XXXX" />
        </Field>

        <Field label={isArabic ? "الخدمة أو نوع الاستفسار" : "Service or inquiry type"} htmlFor={inquiryId}>
          <select id={inquiryId} name="inquiry" required defaultValue={initialService ?? ""} className="quote-input appearance-none">
            <option value="" disabled>{isArabic ? "اختر الخدمة أو نوع الطلب" : "Choose a service or request type"}</option>
            <optgroup label={isArabic ? "نوع الطلب" : "Request type"}>
              <option value={isArabic ? "استفسار عام" : "General inquiry"}>{isArabic ? "استفسار عام" : "General inquiry"}</option>
              <option value={isArabic ? "طلب عرض سعر" : "Request a quote"}>{isArabic ? "طلب عرض سعر" : "Request a quote"}</option>
              <option value={isArabic ? "متابعة طلب قائم" : "Existing order follow-up"}>{isArabic ? "متابعة طلب قائم" : "Existing order follow-up"}</option>
            </optgroup>
            <optgroup label={isArabic ? "الخدمات" : "Services"}>
              {services.map((service) => (
                <option key={service.slug} value={isArabic ? service.titleAr : service.title}>{isArabic ? service.titleAr : service.title}</option>
              ))}
            </optgroup>
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={isArabic ? "الأبعاد التقريبية" : "Approx. dimensions"} htmlFor={dimensionsId}>
          <input id={dimensionsId} name="dimensions" type="text" className="quote-input" placeholder={isArabic ? "ط × ع × ا مم" : "L × W × H mm"} />
        </Field>
        <Field label={isArabic ? "الخامة" : "Material"} htmlFor={materialId}>
          <input id={materialId} name="material" type="text" className="quote-input" placeholder="PLA, PETG, Resin…" />
        </Field>
        <Field label={isArabic ? "الكمية" : "Quantity"} htmlFor={quantityId}>
          <input id={quantityId} name="quantity" type="number" min="1" inputMode="numeric" className="quote-input" placeholder="1" />
        </Field>
      </div>

      <Field label={isArabic ? "الموعد المطلوب" : "Target date"} htmlFor={dateId}>
        <input id={dateId} name="targetDate" type="date" className="quote-input" />
      </Field>

      <Field label={isArabic ? "تفاصيل المشروع" : "Project details"} htmlFor={detailsId}>
        <textarea id={detailsId} name="details" rows={5} required className="quote-input resize-none" placeholder={isArabic ? "الاستخدام المطلوب، اللون، التشطيب وأي متطلبات مهمة…" : "Application, colour, finish and any important requirements…"} />
      </Field>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-800" htmlFor={attachmentId}>
          {isArabic ? "ملف المشروع أو صورة مرجعية" : "Project file or reference image"}
        </label>
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-4 transition hover:border-[#c59b27] hover:bg-[#c59b27]/5" htmlFor={attachmentId}>
          <span className="flex min-w-0 items-center gap-3 text-sm font-semibold text-zinc-700">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-[#e3bd50]"><FileUp className="h-5 w-5" aria-hidden="true" /></span>
            <span className="truncate">{attachmentName || (isArabic ? "STL، OBJ، 3MF، STEP، ZIP، PDF أو صورة" : "STL, OBJ, 3MF, STEP, ZIP, PDF or an image")}</span>
          </span>
          <Paperclip className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
        </label>
        <input id={attachmentId} name="attachment" type="file" accept={ACCEPTED_FILES} className="sr-only" onChange={handleAttachmentChange} />
        <p className="mt-2 text-xs leading-5 text-zinc-500">{isArabic ? "الحد الأقصى 4 ميجابايت. لا نخزن الملف داخل الموقع؛ يُسلّم للفريق فقط عند ضبط قناة الاستقبال." : "Maximum 4 MB. The website does not store the file; it is delivered to the team only when a receiving channel is configured."}</p>
      </div>

      {formError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{formError}</p>}
      {formMessage && <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{formMessage}</p>}

      <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1fb85a] disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? <Send className="h-4 w-4 animate-pulse" aria-hidden="true" /> : <MessageCircle className="h-4 w-4" aria-hidden="true" />}
        {isSubmitting ? (isArabic ? "جارٍ تجهيز الطلب…" : "Preparing request…") : (isArabic ? "إرسال الطلب عبر واتساب" : "Send request on WhatsApp")}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-zinc-800" htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
