"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Bell,
  Boxes,
  ChevronLeft,
  ClipboardList,
  Factory,
  FilePlus2,
  Gauge,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  PackageSearch,
  Plus,
  Search,
  Settings,
  Sparkles,
  Calculator,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";

import {
  defaultCustomers,
  stageMeta,
  stageOrder,
  type InventoryItem,
  type OpsOrder,
  type OpsPriority,
  type OpsStage,
} from "@/data/ops";
import type { OpsRole } from "@/lib/ops/access";
import type { PricingResult } from "@/lib/ops/pricing";

type View = "dashboard" | "orders" | "production" | "inventory" | "customers" | "pricing";

const priorityMeta: Record<OpsPriority, { label: string; className: string }> = {
  high: { label: "عاجل", className: "bg-red-50 text-red-700 ring-red-100" },
  medium: { label: "متوسط", className: "bg-amber-50 text-amber-700 ring-amber-100" },
  low: { label: "منخفض", className: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
};

const stageClasses: Record<OpsStage, string> = {
  brief: "border-zinc-200 bg-zinc-100 text-zinc-700",
  design: "border-violet-200 bg-violet-50 text-violet-700",
  quote: "border-sky-200 bg-sky-50 text-sky-700",
  production: "border-amber-200 bg-amber-50 text-amber-800",
  quality: "border-cyan-200 bg-cyan-50 text-cyan-800",
  delivery: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

function currency(value: number) {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(value);
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("ar-SA", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "short" }).format(new Date(`${value}T12:00:00`));
}

function stageNext(stage: OpsStage) {
  const current = stageOrder.indexOf(stage);
  return stageOrder[Math.min(current + 1, stageOrder.length - 1)];
}

function stagePrevious(stage: OpsStage) {
  const current = stageOrder.indexOf(stage);
  return stageOrder[Math.max(current - 1, 0)];
}

export default function InfinityOps({ operator, initialOrders, initialInventory }: { operator: { name: string; role: OpsRole }; initialOrders: OpsOrder[]; initialInventory: InventoryItem[] }) {
  const [view, setView] = useState<View>("dashboard");
  const [orders, setOrders] = useState<OpsOrder[]>(initialOrders);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [query, setQuery] = useState("");
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [today] = useState(() => Date.now());

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const filteredOrders = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ar");
    if (!normalized) return orders;
    return orders.filter((order) => [order.id, order.customer, order.company, order.title, order.service, order.material]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("ar")
      .includes(normalized));
  }, [orders, query]);

  const activeOrders = orders.filter((order) => order.stage !== "delivery");
  const productionOrders = orders.filter((order) => order.stage === "production" || order.stage === "quality");
  const lowStock = inventory.filter((item) => item.available <= item.reorderPoint);
  const activeValue = activeOrders.reduce((total, order) => total + order.value, 0);

  async function changeStage(order: OpsOrder, stage: OpsStage) {
    if (!order.databaseId) return;
    const response = await fetch(`/api/ops/orders/${order.databaseId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ stage }) });
    if (!response.ok) {
      setNotice("تعذر تحديث مرحلة الطلب. راجع صلاحيات الحساب.");
      return;
    }
    setOrders((current) => current.map((item) => item.databaseId === order.databaseId ? { ...item, stage } : item));
    setNotice(`تم نقل الطلب إلى مرحلة ${stageMeta[stage].label}`);
  }

  async function updateInventory(id: string, change: number) {
    const response = await fetch(`/api/ops/inventory/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ change }) });
    const payload = await response.json().catch(() => null) as { item?: InventoryItem; error?: string } | null;
    if (!response.ok || !payload?.item) {
      setNotice(payload?.error || "تعذر تحديث المخزون.");
      return;
    }
    setInventory((current) => current.map((item) => item.id === id ? payload.item! : item));
  }

  async function addOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/ops/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) });
    const payload = await response.json().catch(() => null) as { order?: OpsOrder; error?: string } | null;
    if (!response.ok || !payload?.order) {
      setNotice(payload?.error || "تعذر إضافة الطلب.");
      return;
    }
    setOrders((current) => [payload.order!, ...current]);
    setShowNewOrder(false);
    setView("orders");
    setNotice(`تمت إضافة ${payload.order.id} إلى الطلبات الجديدة`);
  }

  const navigation: Array<{ id: View; label: string; icon: typeof LayoutDashboard }> = [
    { id: "dashboard", label: "الرئيسية", icon: LayoutDashboard },
    { id: "orders", label: "الطلبات", icon: ClipboardList },
    { id: "production", label: "الإنتاج", icon: Factory },
    { id: "inventory", label: "المخزون", icon: Boxes },
    { id: "pricing", label: "التسعير", icon: Calculator },
    { id: "customers", label: "العملاء", icon: UsersRound },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f5f2] text-[#171717]">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        <aside className={`fixed inset-y-0 right-0 z-40 flex w-[18rem] flex-col border-l border-white/10 bg-[#101111] px-4 py-6 text-white shadow-2xl transition-transform lg:sticky lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between px-3">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-[#e3bd50]">INFINITY OS</p>
              <p className="mt-1 text-xs text-zinc-400">نظام التشغيل الداخلي</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white lg:hidden" aria-label="إغلاق القائمة"><X className="h-5 w-5" /></button>
          </div>

          <div className="mt-10 px-2">
            <p className="mb-3 text-[11px] font-bold tracking-[0.14em] text-zinc-500">التشغيل</p>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = view === item.id;
                return <button key={item.id} onClick={() => { setView(item.id); setSidebarOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-sm font-bold transition ${active ? "bg-[#c59b27] text-[#111111] shadow-lg shadow-[#c59b27]/20" : "text-zinc-300 hover:bg-white/8 hover:text-white"}`}>
                  <Icon className="h-5 w-5" />{item.label}
                </button>;
              })}
            </nav>
          </div>

          <div className="mt-7 border-t border-white/10 px-2 pt-6">
            <p className="mb-3 text-[11px] font-bold tracking-[0.14em] text-zinc-500">إعدادات النظام</p>
            <button onClick={() => setNotice(`صلاحية الحساب الحالية: ${roleLabel(operator.role)}.`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-sm font-bold text-zinc-300 transition hover:bg-white/8 hover:text-white"><Settings className="h-5 w-5" />الصلاحيات والحساب</button>
          </div>

          <div className="mt-auto rounded-2xl border border-[#e3bd50]/20 bg-[#e3bd50]/10 p-4">
            <div className="flex items-center gap-2 text-[#efd486]"><Sparkles className="h-4 w-4" /><p className="text-xs font-bold">حساب موثّق</p></div>
            <p className="mt-2 text-xs leading-5 text-zinc-300">{operator.name}<br />{roleLabel(operator.role)}</p>
          </div>
        </aside>

        {sidebarOpen && <button className="fixed inset-0 z-30 bg-black/45 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="إغلاق القائمة" />}

        <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-10 lg:py-7">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="rounded-xl border border-zinc-200 bg-white p-2.5 text-zinc-700 shadow-sm lg:hidden" aria-label="فتح القائمة"><Menu className="h-5 w-5" /></button>
              <div>
                <p className="text-xs font-bold text-[#a7801a]">مرحبًا بك، {operator.name}</p>
                <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{navigation.find((item) => item.id === view)?.label}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-500 shadow-sm md:flex"><Search className="h-4 w-4" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن طلب أو عميل…" className="w-48 border-0 bg-transparent p-0 text-sm text-zinc-900 outline-none placeholder:text-zinc-400" /></div>
              <button onClick={() => setNotice("لا توجد تنبيهات جديدة. الطلب IM-2408 يحتاج مراجعة قبل موعده.")} className="relative rounded-xl border border-zinc-200 bg-white p-2.5 text-zinc-600 shadow-sm" aria-label="التنبيهات"><Bell className="h-5 w-5" /><span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" /></button>
              <button onClick={() => setShowNewOrder(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-zinc-900/10 transition hover:bg-[#c59b27] hover:text-[#171717]"><Plus className="h-4 w-4" />طلب جديد</button>
            </div>
          </header>

          {view === "dashboard" && <Dashboard orders={orders} activeOrders={activeOrders} activeValue={activeValue} productionOrders={productionOrders} lowStock={lowStock} onView={setView} onStageChange={changeStage} today={today} />}
          {view === "orders" && <OrdersView orders={filteredOrders} onStageChange={changeStage} onCreate={() => setShowNewOrder(true)} />}
          {view === "production" && <ProductionView orders={orders} onStageChange={changeStage} />}
          {view === "inventory" && <InventoryView inventory={inventory} onAdjust={updateInventory} />}
          {view === "customers" && <CustomersView orders={orders} />}
          {view === "pricing" && <PricingView />}
        </main>
      </div>

      {notice && <div role="status" className="fixed bottom-6 left-1/2 z-50 w-[min(92vw,32rem)] -translate-x-1/2 rounded-2xl bg-[#171717] px-5 py-4 text-center text-sm font-bold text-white shadow-2xl">{notice}</div>}
      {showNewOrder && <NewOrderModal onClose={() => setShowNewOrder(false)} onSubmit={addOrder} />}
    </div>
  );
}

function Dashboard({ orders, activeOrders, activeValue, productionOrders, lowStock, onView, onStageChange, today }: { orders: OpsOrder[]; activeOrders: OpsOrder[]; activeValue: number; productionOrders: OpsOrder[]; lowStock: InventoryItem[]; onView: (view: View) => void; onStageChange: (order: OpsOrder, stage: OpsStage) => void; today: number }) {
  const dueSoon = activeOrders.filter((order) => new Date(`${order.dueDate}T23:59:59`).getTime() - today < 4 * 24 * 60 * 60 * 1000).length;
  const cards = [
    { label: "طلبات نشطة", value: activeOrders.length.toString(), detail: `${dueSoon} تحتاج متابعة قريبة`, icon: ClipboardList, tone: "bg-[#171717] text-white", action: () => onView("orders") },
    { label: "قيمة قيد التنفيذ", value: currency(activeValue), detail: "من الطلبات غير المسلّمة", icon: WalletCards, tone: "bg-[#c59b27] text-[#171717]", action: () => onView("orders") },
    { label: "على خط الإنتاج", value: productionOrders.length.toString(), detail: "إنتاج وفحص جودة", icon: Factory, tone: "bg-white text-[#171717]", action: () => onView("production") },
    { label: "تنبيه مخزون", value: lowStock.length.toString(), detail: "أصناف عند حد إعادة الطلب", icon: PackageSearch, tone: "bg-white text-[#171717]", action: () => onView("inventory") },
  ];

  return <div className="py-7">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => { const Icon = card.icon; return <button key={card.label} onClick={card.action} className={`group rounded-2xl border border-zinc-200 p-5 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${card.tone}`}><div className="flex items-start justify-between"><span className="rounded-xl bg-white/15 p-3"><Icon className="h-5 w-5" /></span><ArrowUpLeft className="h-4 w-4 opacity-50 transition group-hover:-translate-y-1 group-hover:translate-x-1" /></div><p className="mt-7 text-sm font-bold opacity-70">{card.label}</p><p className="mt-1 text-3xl font-black tracking-tight">{card.value}</p><p className="mt-2 text-xs font-medium opacity-65">{card.detail}</p></button>; })}
    </div>

    <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(18rem,.8fr)]">
      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3"><div><p className="text-sm font-black">مسار الطلبات</p><p className="mt-1 text-xs text-zinc-500">أولوية اليوم حسب المرحلة والموعد</p></div><button onClick={() => onView("orders")} className="inline-flex items-center gap-1 text-sm font-bold text-[#a7801a] hover:text-[#171717]">كل الطلبات <ChevronLeft className="h-4 w-4" /></button></div>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[650px] text-right"><thead className="border-b border-zinc-100 text-xs text-zinc-500"><tr><th className="pb-3 font-semibold">الطلب</th><th className="pb-3 font-semibold">العميل</th><th className="pb-3 font-semibold">المرحلة</th><th className="pb-3 font-semibold">الموعد</th><th className="pb-3 font-semibold">الإجراء</th></tr></thead><tbody>{orders.slice(0, 5).map((order) => <tr key={order.id} className="border-b border-zinc-100 last:border-0"><td className="py-4"><p className="font-bold text-zinc-900">{order.title}</p><p className="mt-1 text-xs font-semibold text-[#a7801a]" dir="ltr">{order.id}</p></td><td className="py-4 text-sm font-semibold">{order.customer}</td><td className="py-4"><StageBadge stage={order.stage} /></td><td className="py-4 text-sm font-semibold text-zinc-600">{formatDate(order.dueDate)}</td><td className="py-4"><button disabled={order.stage === "delivery"} onClick={() => onStageChange(order, stageNext(order.stage))} className="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-700 transition hover:border-[#c59b27] hover:bg-[#c59b27]/10 disabled:cursor-not-allowed disabled:opacity-40">نقل للمرحلة التالية</button></td></tr>)}</tbody></table></div>
      </section>

      <section className="rounded-3xl bg-[#171717] p-6 text-white shadow-xl shadow-zinc-900/10"><div className="flex items-center justify-between"><div><p className="text-sm font-black">تشغيل اليوم</p><p className="mt-1 text-xs text-zinc-400">نظرة سريعة على ورشة العمل</p></div><Gauge className="h-6 w-6 text-[#e3bd50]" /></div><div className="mt-6 space-y-5"><Metric label="إشغال الطابعات" value="72%" progress={72} /><Metric label="طلبات ضمن الموعد" value="92%" progress={92} /><Metric label="جاهزة للفحص" value={`${orders.filter((order) => order.stage === "quality").length} طلبات`} progress={40} /></div><div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs font-bold text-[#e3bd50]">أولوية مقترحة</p><p className="mt-2 text-sm font-semibold leading-6">راجع طلب حامل لوحة التحكم قبل بدء دفعة الإنتاج التالية.</p></div></section>
    </div>

    <section className="mt-7 grid gap-6 lg:grid-cols-2"><div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm font-black">تنبيهات المخزون</p><p className="mt-1 text-xs text-zinc-500">أصناف تتطلب قرار شراء</p></div><button onClick={() => onView("inventory")} className="text-xs font-bold text-[#a7801a]">عرض المخزون</button></div><div className="mt-5 space-y-3">{lowStock.map((item) => <div key={item.id} className="flex items-center justify-between rounded-2xl bg-red-50 px-4 py-3"><div><p className="text-sm font-bold">{item.name} <span className="font-medium text-zinc-500">— {item.brand}</span></p><p className="mt-1 text-xs text-red-700">{item.location}</p></div><span className="rounded-lg bg-white px-3 py-1.5 text-sm font-black text-red-700">{item.available} {item.unit}</span></div>)}</div></div><div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm font-black">عملاء نشطون</p><p className="mt-1 text-xs text-zinc-500">أحدث العلاقات التجارية</p></div><button onClick={() => onView("customers")} className="text-xs font-bold text-[#a7801a]">ملف العملاء</button></div><div className="mt-5 space-y-3">{defaultCustomers.slice(0, 3).map((customer) => <div key={customer.id} className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3"><div><p className="text-sm font-bold">{customer.name}</p><p className="mt-1 text-xs text-zinc-500">{customer.totalOrders} طلبات • آخر طلب {formatDate(customer.lastOrder)}</p></div><p className="text-sm font-black text-[#a7801a]">{currency(customer.totalValue)}</p></div>)}</div></div></section>
  </div>;
}

function OrdersView({ orders, onStageChange, onCreate }: { orders: OpsOrder[]; onStageChange: (order: OpsOrder, stage: OpsStage) => void; onCreate: () => void }) {
  return <div className="py-7"><section className="rounded-3xl border border-zinc-200 bg-white shadow-sm"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 p-5 sm:p-6"><div><p className="text-lg font-black">سجل الطلبات</p><p className="mt-1 text-sm text-zinc-500">تابع حالة الطلب من الاستلام حتى التسليم.</p></div><button onClick={onCreate} className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-4 py-3 text-sm font-bold text-white hover:bg-[#c59b27] hover:text-[#171717]"><FilePlus2 className="h-4 w-4" />إضافة طلب مخصص</button></div><div className="overflow-x-auto"><table className="w-full min-w-[950px] text-right"><thead className="bg-zinc-50 text-xs text-zinc-500"><tr><th className="px-6 py-4 font-bold">رقم الطلب</th><th className="px-6 py-4 font-bold">العميل والمشروع</th><th className="px-6 py-4 font-bold">الخامة / الكمية</th><th className="px-6 py-4 font-bold">القيمة</th><th className="px-6 py-4 font-bold">الحالة</th><th className="px-6 py-4 font-bold">الموعد</th><th className="px-6 py-4 font-bold">تحريك</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-t border-zinc-100 transition hover:bg-[#c59b27]/[0.035]"><td className="px-6 py-5 font-black text-[#a7801a]" dir="ltr">{order.id}</td><td className="px-6 py-5"><p className="font-bold">{order.title}</p><p className="mt-1 text-xs text-zinc-500">{order.customer} • {order.service}</p></td><td className="px-6 py-5 text-sm font-semibold text-zinc-600">{order.material}<span className="mr-2 text-zinc-400">×</span>{order.quantity}</td><td className="px-6 py-5 text-sm font-black">{currency(order.value)}</td><td className="px-6 py-5"><div className="flex items-center gap-2"><StageBadge stage={order.stage} /><PriorityBadge priority={order.priority} /></div></td><td className="px-6 py-5 text-sm font-semibold text-zinc-600">{formatDate(order.dueDate)}</td><td className="px-6 py-5"><div className="flex gap-1"><button disabled={order.stage === "brief"} onClick={() => onStageChange(order, stagePrevious(order.stage))} className="rounded-lg border border-zinc-200 p-2 text-zinc-600 disabled:opacity-30" aria-label="المرحلة السابقة"><ArrowLeft className="h-4 w-4" /></button><button disabled={order.stage === "delivery"} onClick={() => onStageChange(order, stageNext(order.stage))} className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:border-[#c59b27] hover:text-[#a7801a] disabled:opacity-30" aria-label="المرحلة التالية"><ChevronLeft className="h-4 w-4" /></button></div></td></tr>)}</tbody></table>{orders.length === 0 && <p className="p-10 text-center text-sm font-semibold text-zinc-500">لا توجد نتائج مطابقة.</p>}</div></section></div>;
}

function ProductionView({ orders, onStageChange }: { orders: OpsOrder[]; onStageChange: (order: OpsOrder, stage: OpsStage) => void }) {
  const stages: OpsStage[] = ["brief", "design", "quote", "production", "quality", "delivery"];
  return <div className="py-7"><div className="mb-5"><p className="text-lg font-black">لوحة الإنتاج</p><p className="mt-1 text-sm text-zinc-500">حرّك كل طلب عبر المراحل باستخدام الأسهم داخل البطاقة.</p></div><div className="grid gap-4 2xl:grid-cols-6 xl:grid-cols-3 md:grid-cols-2">{stages.map((stage) => { const items = orders.filter((order) => order.stage === stage); return <section key={stage} className="min-h-64 rounded-3xl border border-zinc-200 bg-white/70 p-3"><div className="mb-3 flex items-center justify-between px-2 pt-1"><p className="text-sm font-black">{stageMeta[stage].shortLabel}</p><span className="rounded-lg bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-600">{items.length}</span></div><div className="space-y-3">{items.map((order) => <article key={order.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-2"><div><p className="text-sm font-black leading-5">{order.title}</p><p className="mt-1 text-xs font-bold text-[#a7801a]" dir="ltr">{order.id}</p></div><PriorityBadge priority={order.priority} /></div><div className="mt-4 space-y-2 text-xs font-semibold text-zinc-500"><p>{order.customer}</p><p>{order.material} × {order.quantity}</p><p>موعد: {formatDate(order.dueDate)}</p></div><div className="mt-4 flex gap-2"><button disabled={stage === "brief"} onClick={() => onStageChange(order, stagePrevious(stage))} className="flex-1 rounded-lg border border-zinc-200 px-2 py-2 text-xs font-bold text-zinc-600 disabled:opacity-30">سابق</button><button disabled={stage === "delivery"} onClick={() => onStageChange(order, stageNext(stage))} className="flex-1 rounded-lg bg-[#171717] px-2 py-2 text-xs font-bold text-white transition hover:bg-[#c59b27] hover:text-[#171717] disabled:opacity-30">التالي</button></div></article>)}</div></section>; })}</div></div>;
}

function InventoryView({ inventory, onAdjust }: { inventory: InventoryItem[]; onAdjust: (id: string, change: number) => void }) {
  const typeLabel = { filament: "فيلمنت", resin: "ريزن", spare: "قطع غيار" };
  return <div className="py-7"><div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-lg font-black">مخزون الورشة</p><p className="mt-1 text-sm text-zinc-500">تعديل الكميات محفوظ على هذا الجهاز في هذه النسخة.</p></div><div className="rounded-xl bg-[#c59b27]/15 px-4 py-3 text-sm font-bold text-[#765600]">{inventory.filter((item) => item.available <= item.reorderPoint).length} أصناف تحتاج إعادة طلب</div></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{inventory.map((item) => { const isLow = item.available <= item.reorderPoint; return <article key={item.id} className={`rounded-3xl border bg-white p-5 shadow-sm ${isLow ? "border-red-200" : "border-zinc-200"}`}><div className="flex items-start justify-between"><div><span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">{typeLabel[item.type]}</span><p className="mt-4 text-lg font-black">{item.name}</p><p className="mt-1 text-sm font-semibold text-zinc-500">{item.brand} • {item.color}</p></div><button className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100" aria-label="خيارات المخزون"><MoreHorizontal className="h-5 w-5" /></button></div><div className="mt-6 flex items-end justify-between"><div><p className="text-xs font-bold text-zinc-500">المتاح الآن</p><p className={`mt-1 text-3xl font-black ${isLow ? "text-red-600" : "text-zinc-900"}`}>{item.available}<span className="mr-1 text-sm">{item.unit}</span></p></div><p className="text-xs font-semibold text-zinc-500">حد الطلب: {item.reorderPoint}</p></div><div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4"><p className="text-xs font-semibold text-zinc-500">{item.location}</p><div className="flex gap-2"><button onClick={() => onAdjust(item.id, -1)} className="h-9 w-9 rounded-lg border border-zinc-200 text-lg font-black text-zinc-600 hover:bg-zinc-100">−</button><button onClick={() => onAdjust(item.id, 1)} className="h-9 w-9 rounded-lg bg-[#171717] text-lg font-black text-white hover:bg-[#c59b27] hover:text-[#171717]">+</button></div></div></article>; })}</div></div>;
}

function CustomersView({ orders }: { orders: OpsOrder[] }) {
  return <div className="py-7"><section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-lg font-black">علاقات العملاء</p><p className="mt-1 text-sm text-zinc-500">نظرة موحدة على العملاء والطلبات المفتوحة.</p></div><div className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-600">{defaultCustomers.length} عملاء نشطون</div></div><div className="mt-6 grid gap-4 lg:grid-cols-2">{defaultCustomers.map((customer) => { const openOrders = orders.filter((order) => order.customer === customer.name && order.stage !== "delivery"); return <article key={customer.id} className="rounded-2xl border border-zinc-200 p-5 transition hover:border-[#c59b27]/50 hover:shadow-md"><div className="flex items-start justify-between gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#171717] text-sm font-black text-[#e3bd50]">{customer.name.slice(0, 1)}</div><button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100"><MoreHorizontal className="h-5 w-5" /></button></div><p className="mt-4 text-lg font-black">{customer.name}</p><p className="mt-1 text-sm text-zinc-500">{customer.company}</p><div className="mt-5 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4"><Stat label="إجمالي الطلبات" value={customer.totalOrders.toString()} /><Stat label="قيد التنفيذ" value={openOrders.length.toString()} /><Stat label="إجمالي القيمة" value={compactNumber(customer.totalValue)} /></div><div className="mt-5 flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5 text-xs font-semibold text-zinc-600"><span dir="ltr">{customer.phone}</span><span>آخر طلب {formatDate(customer.lastOrder)}</span></div></article>; })}</div></section></div>;
}

function PricingView() {
  const [result, setResult] = useState<PricingResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/ops/pricing/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        materialCode: data.get("materialCode"),
        weightGrams: Number(data.get("weightGrams")),
        printHours: Number(data.get("printHours")),
        labourMinutes: Number(data.get("labourMinutes")),
        quantity: Number(data.get("quantity")),
        complexity: data.get("complexity"),
      }),
    });
    const payload = await response.json().catch(() => null) as { result?: PricingResult; error?: string } | null;
    if (!response.ok || !payload?.result) {
      setError(payload?.error || "تعذر حساب السعر الآن.");
      setLoading(false);
      return;
    }
    setResult(payload.result);
    setLoading(false);
  }

  return <div className="py-7"><div className="mb-6"><p className="text-lg font-black">التسعير التلقائي</p><p className="mt-1 text-sm text-zinc-500">حساب داخلي يعتمد على قواعد الخامات والوقت والتجهيز والهدر والربح. لا يشمل الشحن أو ضريبة القيمة المضافة.</p></div><div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]"><section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7"><form onSubmit={calculate} className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold text-zinc-700">الخامة<select name="materialCode" defaultValue="pla" className="rounded-xl border border-zinc-200 bg-white px-3 py-3 outline-none focus:border-[#c59b27]"><option value="pla">PLA</option><option value="petg">PETG</option><option value="asa">ASA</option><option value="abs">ABS</option><option value="resin">ريزن</option></select></label><label className="grid gap-2 text-sm font-bold text-zinc-700">درجة التعقيد<select name="complexity" defaultValue="standard" className="rounded-xl border border-zinc-200 bg-white px-3 py-3 outline-none focus:border-[#c59b27]"><option value="basic">بسيط</option><option value="standard">قياسي</option><option value="complex">معقد</option></select></label><Input label="وزن القطعة (غرام)" name="weightGrams" type="number" min="1" defaultValue="100" required /><Input label="وقت الطباعة للقطعة (ساعة)" name="printHours" type="number" min="0" step="0.1" defaultValue="3" required /><Input label="العمل اليدوي (دقيقة)" name="labourMinutes" type="number" min="0" defaultValue="20" required /><Input label="الكمية" name="quantity" type="number" min="1" defaultValue="1" required /><div className="sm:col-span-2 mt-2 border-t border-zinc-100 pt-5"><button disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c59b27] hover:text-[#171717] disabled:opacity-60"><Calculator className="h-4 w-4" />{loading ? "جارٍ الحساب…" : "احسب السعر المقترح"}</button></div></form>{error && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}</section><PricingResultCard result={result} /></div><p className="mt-5 text-xs leading-6 text-zinc-500">ملاحظة: قواعد الأسعار محفوظة في قاعدة البيانات ويمكن لمالك النظام أو المدير تعديلها. السعر المعروض تقديري داخلي ويجب مراجعته قبل إرساله للعميل.</p></div>;
}

function PricingResultCard({ result }: { result: PricingResult | null }) {
  if (!result) return <aside className="rounded-3xl bg-[#171717] p-6 text-white shadow-xl"><Calculator className="h-7 w-7 text-[#e3bd50]" /><p className="mt-6 text-lg font-black">نتيجة التسعير</p><p className="mt-2 text-sm leading-6 text-zinc-400">أدخل مواصفات القطعة ثم احسب السعر للحصول على تفصيل واضح للتكلفة والربح.</p></aside>;
  const rows = [["الخامة", result.materialCost], ["وقت الطباعة", result.machineCost], ["العمل اليدوي", result.labourCost], ["التجهيز", result.setupFee], ["الهدر", result.wasteCost], ["التعقيد", result.complexityCost], ["الربح", result.markup]] as const;
  return <aside className="rounded-3xl bg-[#171717] p-6 text-white shadow-xl"><p className="text-xs font-bold text-[#e3bd50]">سعر مقترح للعميل</p><p className="mt-2 text-4xl font-black">{currency(result.total)}</p><p className="mt-2 text-sm text-zinc-400">سعر الوحدة: {currency(result.unitPrice)}</p><div className="mt-6 space-y-3 border-t border-white/10 pt-5">{rows.map(([label, value]) => <div className="flex items-center justify-between text-sm" key={label}><span className="text-zinc-400">{label}</span><span className="font-bold">{currency(value)}</span></div>)}</div></aside>;
}

function NewOrderModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div role="dialog" aria-modal="true" aria-labelledby="new-order-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" dir="rtl"><div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold text-[#a7801a]">Infinity OS</p><h2 id="new-order-title" className="mt-1 text-2xl font-black">إضافة طلب مخصص</h2><p className="mt-2 text-sm text-zinc-500">يبدأ الطلب في مرحلة الاستلام ثم ينتقل عبر لوحة الإنتاج.</p></div><button onClick={onClose} className="rounded-xl border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100" aria-label="إغلاق"><X className="h-5 w-5" /></button></div><form onSubmit={onSubmit} className="mt-7 grid gap-4 sm:grid-cols-2"><Input label="اسم العميل" name="customer" required placeholder="الاسم أو اسم المنشأة" /><Input label="اسم الشركة (اختياري)" name="company" placeholder="اسم المنشأة" /><Input label="اسم المشروع" name="title" required placeholder="مثال: حامل لوحة تحكم" /><Input label="الخدمة" name="service" required placeholder="طباعة، تصميم، نموذج أولي…" /><Input label="الخامة" name="material" placeholder="PLA، PETG، ريزن…" /><Input label="رقم التواصل" name="contact" type="tel" placeholder="+966 5X XXX XXXX" /><Input label="الكمية" name="quantity" type="number" defaultValue="1" min="1" required /><Input label="قيمة تقديرية (ر.س)" name="value" type="number" min="0" placeholder="0" /><Input label="موعد التسليم" name="dueDate" type="date" required /><label className="grid gap-2 text-sm font-bold text-zinc-700">الأولوية<select name="priority" className="rounded-xl border border-zinc-200 bg-white px-3 py-3 outline-none focus:border-[#c59b27]"><option value="medium">متوسط</option><option value="high">عاجل</option><option value="low">منخفض</option></select></label><div className="sm:col-span-2 mt-2 flex justify-end gap-3 border-t border-zinc-100 pt-5"><button type="button" onClick={onClose} className="rounded-xl border border-zinc-200 px-5 py-3 text-sm font-bold text-zinc-700 hover:bg-zinc-50">إلغاء</button><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-5 py-3 text-sm font-bold text-white hover:bg-[#c59b27] hover:text-[#171717]"><Plus className="h-4 w-4" />إضافة الطلب</button></div></form></div></div>;
}

function Input({ label, name, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return <label className="grid gap-2 text-sm font-bold text-zinc-700">{label}<input name={name} {...props} className="rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm font-semibold text-zinc-900 outline-none transition placeholder:font-normal placeholder:text-zinc-400 focus:border-[#c59b27] focus:ring-4 focus:ring-[#c59b27]/10" /></label>;
}

function Metric({ label, value, progress }: { label: string; value: string; progress: number }) {
  return <div><div className="flex items-center justify-between text-sm"><span className="font-semibold text-zinc-300">{label}</span><span className="font-black text-white">{value}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#e3bd50]" style={{ width: `${progress}%` }} /></div></div>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div><p className="text-[11px] font-bold text-zinc-500">{label}</p><p className="mt-1 text-base font-black text-zinc-900">{value}</p></div>;
}

function StageBadge({ stage }: { stage: OpsStage }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-bold ${stageClasses[stage]}`}>{stageMeta[stage].shortLabel}</span>;
}

function PriorityBadge({ priority }: { priority: OpsPriority }) {
  const meta = priorityMeta[priority];
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[11px] font-bold ring-1 ${meta.className}`}>{meta.label}</span>;
}

function roleLabel(role: OpsRole) {
  return { owner: "مالك النظام", admin: "مدير", sales: "مبيعات", production: "إنتاج", inventory: "مخزون", viewer: "مشاهد" }[role];
}
