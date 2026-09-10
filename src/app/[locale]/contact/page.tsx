"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import Container from "@/components/ui/Container";
import Navbar from "@/components/layout/Navbar";

import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

import { usePathname } from "next/navigation";

export default function ContactPage() {
  const pathname = usePathname();

  const locale =
    pathname.split("/")[1] === "en" ? "en" : "ar";

  const isAr = locale === "ar";

  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar
        locale={locale}
        labels={(isAr ? ar : en).navigation}
      />

      <main>
        <section className="bg-zinc-950 py-24 text-white">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {isAr ? "تواصل معنا" : "CONTACT"}
            </p>

            <h1 className="mt-5 text-5xl font-bold sm:text-6xl">
              {isAr
                ? "ابدأ مشروعك معنا"
                : "Start Your Project With Us"}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {isAr
                ? "أرسل فكرتك أو متطلباتك وسنراجعها معك."
                : "Send us your idea or requirements and we will review them with you."}
            </p>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="space-y-5">
                <div className="rounded-3xl border border-zinc-200 p-6">
                  <MapPin className="h-6 w-6" />

                  <h2 className="mt-4 font-bold">
                    {isAr ? "الموقع" : "Location"}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-600">
                    {isAr
                      ? "جازان، المملكة العربية السعودية"
                      : "Jizan, Saudi Arabia"}
                  </p>
                </div>

                <div className="rounded-3xl border border-zinc-200 p-6">
                  <MessageCircle className="h-6 w-6" />

                  <h2 className="mt-4 font-bold">
                    WhatsApp
                  </h2>

                  <p className="mt-2 text-sm text-zinc-600">
                    {isAr
                      ? "تواصل معنا مباشرة"
                      : "Contact us directly"}
                  </p>
                </div>

                <div className="rounded-3xl border border-zinc-200 p-6">
                  <Mail className="h-6 w-6" />

                  <h2 className="mt-4 font-bold">
                    Email
                  </h2>

                  <p className="mt-2 text-sm text-zinc-600">
                    {isAr
                      ? "البريد الإلكتروني"
                      : "Email address"}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                  }}
                  className="rounded-3xl border border-zinc-200 p-7 sm:p-10"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-semibold">
                        {isAr ? "الاسم" : "Name"}
                      </label>

                      <input
                        required
                        type="text"
                        className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-950"
                        placeholder={
                          isAr ? "اسمك" : "Your name"
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold">
                        {isAr ? "البريد" : "Email"}
                      </label>

                      <input
                        required
                        type="email"
                        className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-950"
                        placeholder={
                          isAr
                            ? "البريد الإلكتروني"
                            : "Email address"
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-semibold">
                      {isAr ? "الخدمة" : "Service"}
                    </label>

                    <select className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none">
                      <option>
                        {isAr
                          ? "الطباعة ثلاثية الأبعاد"
                          : "3D Printing"}
                      </option>

                      <option>
                        {isAr
                          ? "التصميم"
                          : "CAD & Design"}
                      </option>

                      <option>
                        {isAr
                          ? "النمذجة الأولية"
                          : "Rapid Prototyping"}
                      </option>

                      <option>
                        {isAr ? "CNC" : "CNC"}
                      </option>

                      <option>
                        {isAr ? "PCB" : "PCB"}
                      </option>

                      <option>
                        {isAr
                          ? "صيانة الطابعة"
                          : "Printer Maintenance"}
                      </option>
                    </select>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-semibold">
                      {isAr ? "تفاصيل المشروع" : "Project Details"}
                    </label>

                    <textarea
                      required
                      rows={6}
                      className="mt-2 w-full resize-none rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-950"
                      placeholder={
                        isAr
                          ? "اكتب تفاصيل المشروع..."
                          : "Tell us about your project..."
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-7 rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
                  >
                    {isAr
                      ? "إرسال الطلب"
                      : "Send Request"}
                  </button>

                  {submitted && (
                    <p className="mt-5 text-sm font-semibold text-zinc-700">
                      {isAr
                        ? "تم استلام الطلب. سيتم ربط النموذج بنظام التواصل في المرحلة القادمة."
                        : "Request received. The form backend will be connected in the next stage."}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}