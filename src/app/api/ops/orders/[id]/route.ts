import { NextResponse } from "next/server";

import type { OpsStage } from "@/data/ops";
import { getOpsIdentity, hasPermission } from "@/lib/ops/access";
import { createClient } from "@/lib/supabase/server";

const stages: OpsStage[] = ["brief", "design", "quote", "production", "quality", "delivery"];

export async function PATCH(request: Request, context: RouteContext<"/api/ops/orders/[id]">) {
  const identity = await getOpsIdentity();
  if (identity.status !== "ready" || !(hasPermission(identity.role, "orders:write") || hasPermission(identity.role, "production:write"))) {
    return NextResponse.json({ error: "لا تملك صلاحية تعديل مرحلة الطلب." }, { status: 403 });
  }

  const body = await request.json().catch(() => null) as { stage?: unknown } | null;
  if (!body || !stages.includes(body.stage as OpsStage)) return NextResponse.json({ error: "مرحلة الطلب غير صحيحة." }, { status: 400 });
  const { id } = await context.params;
  const supabase = await createClient();
  const { error } = await supabase.from("orders").update({ stage: body.stage }).eq("id", id);
  if (error) return NextResponse.json({ error: "تعذر تحديث مرحلة الطلب." }, { status: 500 });
  return NextResponse.json({ stage: body.stage });
}
