import { NextResponse } from "next/server";

import { getOpsIdentity, hasPermission } from "@/lib/ops/access";
import { getOpsDashboard } from "@/lib/ops/dashboard";

export async function GET() {
  const identity = await getOpsIdentity();
  if (identity.status !== "ready" || !hasPermission(identity.role, "orders:read")) {
    return NextResponse.json({ error: "غير مصرح بالدخول." }, { status: 401 });
  }

  try {
    return NextResponse.json(await getOpsDashboard());
  } catch {
    return NextResponse.json({ error: "تعذر تحميل بيانات التشغيل." }, { status: 500 });
  }
}
