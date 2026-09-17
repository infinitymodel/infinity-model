import { ShieldCheck } from "lucide-react";

export function OpsSetup() {
  return <main dir="rtl" className="grid min-h-screen place-items-center bg-[#111212] p-6 text-white"><section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl"><ShieldCheck className="h-10 w-10 text-[#e3bd50]" /><p className="mt-6 text-xs font-black tracking-[0.16em] text-[#e3bd50]">INFINITY OS</p><h1 className="mt-2 text-3xl font-black">يلزم إعداد قاعدة بيانات النظام</h1><p className="mt-4 leading-8 text-zinc-300">تم تجهيز الربط الآمن مع Supabase، لكن مفاتيح المشروع غير مضافة بعد. أضف رابط المشروع والمفتاح العام فقط في <code dir="ltr" className="rounded bg-white/10 px-1.5 py-1 text-white">.env.local</code> ثم نفّذ ملف قاعدة البيانات الموجود في <code dir="ltr" className="rounded bg-white/10 px-1.5 py-1 text-white">supabase/migrations</code>.</p></section></main>;
}

export function OpsAccessPending({ email }: { email: string }) {
  return <main dir="rtl" className="grid min-h-screen place-items-center bg-[#111212] p-6 text-white"><section className="w-full max-w-2xl rounded-3xl border border-[#e3bd50]/30 bg-white/5 p-8 shadow-2xl"><ShieldCheck className="h-10 w-10 text-[#e3bd50]" /><p className="mt-6 text-xs font-black tracking-[0.16em] text-[#e3bd50]">INFINITY OS</p><h1 className="mt-2 text-3xl font-black">بانتظار منح الصلاحية</h1><p className="mt-4 leading-8 text-zinc-300">تم التحقق من حساب <span dir="ltr" className="font-bold text-white">{email}</span>، لكن لم تُمنح له صلاحية تشغيل بعد. يجب أن يضيف مدير النظام دوره من جدول <code dir="ltr" className="rounded bg-white/10 px-1.5 py-1 text-white">profiles</code>.</p></section></main>;
}
