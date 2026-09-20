import { NextResponse } from "next/server";

import { getOpsIdentity, hasPermission } from "@/lib/ops/access";
import { calculatePrice, type Complexity, type MaterialCode, type PricingInput, type PricingRule } from "@/lib/ops/pricing";
import { createClient } from "@/lib/supabase/server";

const materials: MaterialCode[] = ["pla", "petg", "asa", "abs", "resin"];
const complexities: Complexity[] = ["basic", "standard", "complex"];

function boundedNumber(value: unknown, min: number, max: number) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) && number >= min && number <= max ? number : null;
}

export async function POST(request: Request) {
  const identity = await getOpsIdentity();
  if (identity.status !== "ready") return NextResponse.json({ error: "غير مصرح بالدخول." }, { status: 401 });
  if (!hasPermission(identity.role, "pricing:calculate")) return NextResponse.json({ error: "لا تملك صلاحية التسعير." }, { status: 403 });

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || !materials.includes(body.materialCode as MaterialCode) || !complexities.includes(body.complexity as Complexity)) {
    return NextResponse.json({ error: "بيانات التسعير غير صحيحة." }, { status: 400 });
  }

  const weightGrams = boundedNumber(body.weightGrams, 1, 100000);
  const printHours = boundedNumber(body.printHours, 0, 1000);
  const labourMinutes = boundedNumber(body.labourMinutes, 0, 10000);
  const quantity = boundedNumber(body.quantity, 1, 10000);
  const powerRatePerHour = boundedNumber(body.powerRatePerHour, 0, 1000);
  const overheadPercent = boundedNumber(body.overheadPercent, 0, 100);
  const shippingCost = boundedNumber(body.shippingCost, 0, 100000);
  const discountPercent = boundedNumber(body.discountPercent, 0, 80);
  const includeVat = typeof body.includeVat === "boolean" ? body.includeVat : false;
  if (weightGrams === null || printHours === null || labourMinutes === null || quantity === null || powerRatePerHour === null || overheadPercent === null || shippingCost === null || discountPercent === null) {
    return NextResponse.json({ error: "تحقق من الوزن والوقت والكمية." }, { status: 400 });
  }

  const input: PricingInput = {
    materialCode: body.materialCode as MaterialCode,
    complexity: body.complexity as Complexity,
    weightGrams,
    printHours,
    labourMinutes,
    quantity,
    powerRatePerHour,
    overheadPercent,
    shippingCost,
    discountPercent,
    includeVat,
  };
  const supabase = await createClient();
  const { data, error } = await supabase.from("pricing_rules").select("material_code, material_price_per_kg, machine_rate_per_hour, labour_rate_per_hour, setup_fee, waste_percent, markup_percent, minimum_order").eq("material_code", input.materialCode).eq("is_active", true).maybeSingle();
  if (error || !data) {
    return NextResponse.json({ error: "لا توجد قاعدة تسعير فعالة لهذه الخامة. راجع إعدادات التسعير." }, { status: 422 });
  }
  const rule: PricingRule = {
    materialCode: data.material_code as MaterialCode,
    materialPricePerKg: Number(data.material_price_per_kg),
    machineRatePerHour: Number(data.machine_rate_per_hour),
    labourRatePerHour: Number(data.labour_rate_per_hour),
    setupFee: Number(data.setup_fee),
    wastePercent: Number(data.waste_percent),
    markupPercent: Number(data.markup_percent),
    minimumOrder: Number(data.minimum_order),
  };

  return NextResponse.json({ input, rule, result: calculatePrice(input, rule), calculatedAt: new Date().toISOString() });
}
