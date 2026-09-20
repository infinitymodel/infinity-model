import { NextResponse } from "next/server";

import type { OpsStage } from "@/data/ops";
import { getOpsIdentity, hasPermission } from "@/lib/ops/access";
import { createClient } from "@/lib/supabase/server";

const stages: OpsStage[] = ["brief", "design", "quote", "production", "quality", "delivery"];

function canChangeStage(role: "owner" | "admin" | "sales" | "production" | "inventory" | "viewer", current: OpsStage, next: OpsStage) {
  if (role === "owner" || role === "admin") return true;
  if (role === "sales") return ["brief", "design", "quote", "production"].includes(current) && ["brief", "design", "quote", "production"].includes(next);
  return role === "production" && ["production", "quality"].includes(current) && ["production", "quality"].includes(next);
}

export async function PATCH(request: Request, context: RouteContext<"/api/ops/orders/[id]">) {
  const identity = await getOpsIdentity();
  if (identity.status !== "ready" || !(hasPermission(identity.role, "orders:write") || hasPermission(identity.role, "production:write"))) {
    return NextResponse.json({ error: "لا تملك صلاحية تعديل مرحلة الطلب." }, { status: 403 });
  }

  const body = await request.json().catch(() => null) as { stage?: unknown } | null;
  if (!body || !stages.includes(body.stage as OpsStage)) return NextResponse.json({ error: "مرحلة الطلب غير صحيحة." }, { status: 400 });
  const { id } = await context.params;
  const supabase = await createClient();
  const { data: currentOrder, error: readError } = await supabase.from("orders").select("stage").eq("id", id).maybeSingle();
  if (readError || !currentOrder) return NextResponse.json({ error: "تعذر العثور على الطلب." }, { status: 404 });
  if (!canChangeStage(identity.role, currentOrder.stage as OpsStage, body.stage as OpsStage)) {
    return NextResponse.json({ error: "لا تملك صلاحية نقل هذا الطلب إلى المرحلة المطلوبة." }, { status: 403 });
  }
  const { error } = await supabase.from("orders").update({ stage: body.stage }).eq("id", id);
  if (error) return NextResponse.json({ error: "تعذر تحديث مرحلة الطلب." }, { status: 500 });
  await supabase.from("order_activity").insert({
    order_id: id,
    actor_id: identity.id,
    action: "stage_changed",
    payload: { from: currentOrder.stage, to: body.stage },
  });
  return NextResponse.json({ stage: body.stage });
}
