import { NextResponse } from "next/server";

import { getOpsIdentity, hasPermission } from "@/lib/ops/access";
import { mapInventory } from "@/lib/ops/dashboard";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request, context: RouteContext<"/api/ops/inventory/[id]">) {
  const identity = await getOpsIdentity();
  if (identity.status !== "ready" || !hasPermission(identity.role, "inventory:write")) {
    return NextResponse.json({ error: "لا تملك صلاحية تعديل المخزون." }, { status: 403 });
  }
  const body = await request.json().catch(() => null) as { change?: unknown } | null;
  const change = typeof body?.change === "number" ? body.change : Number(body?.change);
  if (!Number.isFinite(change) || !Number.isInteger(change) || change === 0 || Math.abs(change) > 1000) {
    return NextResponse.json({ error: "تعديل المخزون غير صحيح." }, { status: 400 });
  }

  const { id } = await context.params;
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("adjust_inventory_item", { item_id: id, quantity_change: change });
  if (error || !data) return NextResponse.json({ error: "تعذر تحديث المخزون." }, { status: 500 });
  return NextResponse.json({ item: mapInventory(data as Record<string, unknown>) });
}
