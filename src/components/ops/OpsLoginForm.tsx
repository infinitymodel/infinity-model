"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, LoaderCircle, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function OpsLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(data.get("email") || "").trim(),
      password: String(data.get("password") || ""),
    });

    if (signInError) {
      setError("تعذر تسجيل الدخول. تحقق من البريد الإلكتروني وكلمة المرور.");
      setLoading(false);
      return;
    }

    router.push("/ops");
    router.refresh();
  }

  return <main dir="rtl" className="grid min-h-screen place-items-center bg-[#111212] p-6 text-white"><section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl sm:p-9"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c59b27] text-[#171717]"><LockKeyhole className="h-6 w-6" /></div><p className="mt-6 text-xs font-black tracking-[0.16em] text-[#e3bd50]">INFINITY OS</p><h1 className="mt-2 text-3xl font-black">دخول فريق العمل</h1><p className="mt-3 text-sm leading-6 text-zinc-400">هذه المساحة مخصصة للموظفين المخولين فقط.</p><form className="mt-7 space-y-4" onSubmit={signIn}><label className="grid gap-2 text-sm font-bold text-zinc-200">البريد الإلكتروني<input name="email" type="email" autoComplete="email" required className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left text-white outline-none transition focus:border-[#e3bd50]" dir="ltr" /></label><label className="grid gap-2 text-sm font-bold text-zinc-200">كلمة المرور<input name="password" type="password" autoComplete="current-password" required className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left text-white outline-none transition focus:border-[#e3bd50]" dir="ltr" /></label>{error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">{error}</p>}<button disabled={loading} type="submit" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e3bd50] px-5 py-3.5 text-sm font-black text-[#171717] transition hover:bg-white disabled:opacity-60">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <>دخول النظام <ArrowLeft className="h-4 w-4" /></>}</button></form></section></main>;
}
