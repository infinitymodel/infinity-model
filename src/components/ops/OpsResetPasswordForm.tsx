"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, KeyRound, LoaderCircle } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

export default function OpsResetPasswordForm() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) setReady(true);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") || "");
    const confirmation = String(data.get("confirmation") || "");
    if (password.length < 12) {
      setError("استخدم كلمة مرور لا تقل عن 12 حرفًا.");
      return;
    }
    if (password !== confirmation) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await createClient().auth.updateUser({ password });
    if (updateError) {
      setError("انتهت صلاحية رابط الاستعادة أو تعذر حفظ كلمة المرور. اطلب رابطًا جديدًا.");
      setLoading(false);
      return;
    }
    setComplete(true);
    setLoading(false);
  }

  return <main dir="rtl" className="grid min-h-screen place-items-center bg-[#111212] p-6 text-white"><section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl sm:p-9"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c59b27] text-[#171717]">{complete ? <CheckCircle2 className="h-6 w-6" /> : <KeyRound className="h-6 w-6" />}</div><p className="mt-6 text-xs font-black tracking-[0.16em] text-[#e3bd50]">INFINITY OS</p>{complete ? <><h1 className="mt-2 text-3xl font-black">تم تغيير كلمة المرور</h1><p className="mt-3 text-sm leading-6 text-zinc-400">يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.</p><Link href="/ops/login" className="mt-7 inline-flex w-full justify-center rounded-xl bg-[#e3bd50] px-5 py-3.5 text-sm font-black text-[#171717] transition hover:bg-white">الذهاب إلى تسجيل الدخول</Link></> : <><h1 className="mt-2 text-3xl font-black">تعيين كلمة مرور جديدة</h1><p className="mt-3 text-sm leading-6 text-zinc-400">اختر كلمة مرور قوية لحساب فريق العمل.</p>{!ready ? <p className="mt-7 rounded-xl bg-amber-400/10 px-4 py-3 text-sm font-bold leading-6 text-amber-100">جارٍ التحقق من رابط الاستعادة… إذا استمر ذلك، اطلب رابطًا جديدًا من مدير النظام.</p> : <form className="mt-7 space-y-4" onSubmit={updatePassword}><label className="grid gap-2 text-sm font-bold text-zinc-200">كلمة المرور الجديدة<input name="password" type="password" autoComplete="new-password" minLength={12} required className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left text-white outline-none transition focus:border-[#e3bd50]" dir="ltr" /></label><label className="grid gap-2 text-sm font-bold text-zinc-200">تأكيد كلمة المرور<input name="confirmation" type="password" autoComplete="new-password" minLength={12} required className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left text-white outline-none transition focus:border-[#e3bd50]" dir="ltr" /></label>{error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">{error}</p>}<button disabled={loading} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e3bd50] px-5 py-3.5 text-sm font-black text-[#171717] transition hover:bg-white disabled:opacity-60">{loading && <LoaderCircle className="h-4 w-4 animate-spin" />}حفظ كلمة المرور</button></form>}</>}</section></main>;
}
