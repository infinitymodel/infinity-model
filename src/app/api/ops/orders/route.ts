import { NextResponse } from "next/server";

import type { OpsPriority } from "@/data/ops";
import { getOpsIdentity, hasPermission } from "@/lib/ops/access";
import { mapOrder } from "@/lib/ops/dashboard";
import { createClient } from "@/lib/supabase/server";

const priorities: OpsPriority[] = ["high", "medium", "low"];

function text(value: unknown, maximum = 500) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

export async function POST(request: Request) {
  const identity = await getOpsIdentity();
  if (identity.status !== "ready" || !hasPermission(identity.role, "orders:write")) {
    return NextResponse.json({ error: "لا تملك صلاحية إنشاء طلب." }, { status: 403 });
  }

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "بيانات الطلب غير صالحة." }, { status: 400 });

  const customer = text(body.customer, 140);
  const title = text(body.title, 200);
  const service = text(body.service, 140);
  const dueDate = text(body.dueDate, 10);
  const quantity = Number(body.quantity);
  const value = Number(body.value);
  const priority = body.priority as OpsPriority;
  if (!customer || !title || !service || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate) || !Number.isInteger(quantity) || quantity < 1 || quantity > 10000 || !Number.isFinite(value) || value < 0 || !priorities.includes(priority)) {
    return NextResponse.json({ error: "تحقق من الحقول المطلوبة في الطلب." }, { status: 400 });
  }

  const supabase = await createClient();
  const company = text(body.company, 140) || null;
  const contact = text(body.contact, 80) || null;
  const { data: existingClient, error: existingClientError } = await supabase.from("clients").select("id, name, company, phone").eq("name", customer).limit(1).maybeSingle();
  if (existingClientError) return NextResponse.json({ error: "تعذر قراءة بيانات العميل." }, { status: 500 });

  let client = existingClient;
  if (!client) {
    const { data, error } = await supabase.from("clients").insert({ name: customer, company, phone: contact, created_by: identity.id }).select("id, name, company, phone").single();
    if (error) return NextResponse.json({ error: "تعذر إضافة العميل." }, { status: 500 });
    client = data;
  }

  const { data: order, error: orderError } = await supabase.from("orders").insert({
    client_id: client.id,
    title,
    service,
    material: text(body.material, 100) || null,
    quantity,
    value_sar: value,
    due_date: dueDate,
    priority,
    contact,
    created_by: identity.id,
  }).select("id, order_number, title, service, material, quantity, value_sar, due_date, stage, priority, contact, created_at").single();
  if (orderError) return NextResponse.json({ error: "تعذر حفظ الطلب." }, { status: 500 });

  await supabase.from("order_activity").insert({
    order_id: order.id,
    actor_id: identity.id,
    action: "order_created",
    payload: { service, quantity, value_sar: value },
  });

  return NextResponse.json({ order: mapOrder({ ...order, clients: client }) }, { status: 201 });
}
