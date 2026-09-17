import type { InventoryItem, OpsOrder, OpsPriority, OpsStage } from "@/data/ops";
import { createClient } from "@/lib/supabase/server";

type ClientRow = { name?: string | null; company?: string | null; phone?: string | null } | null;

function clientFromRow(value: unknown): ClientRow {
  if (Array.isArray(value)) return (value[0] ?? null) as ClientRow;
  return (value ?? null) as ClientRow;
}

export function mapOrder(row: Record<string, unknown>): OpsOrder {
  const client = clientFromRow(row.clients);
  return {
    id: String(row.order_number),
    databaseId: String(row.id),
    customer: client?.name || "عميل غير محدد",
    company: client?.company || undefined,
    title: String(row.title),
    service: String(row.service),
    material: String(row.material || "يحدد لاحقًا"),
    quantity: Number(row.quantity || 1),
    value: Number(row.value_sar || 0),
    dueDate: String(row.due_date || new Date().toISOString().slice(0, 10)),
    stage: row.stage as OpsStage,
    priority: row.priority as OpsPriority,
    contact: String(row.contact || client?.phone || ""),
    createdAt: String(row.created_at || new Date().toISOString()).slice(0, 10),
  };
}

export function mapInventory(row: Record<string, unknown>): InventoryItem {
  const type = row.item_type;
  return {
    id: String(row.id),
    name: String(row.name),
    type: type === "resin" || type === "spare" ? type : "filament",
    brand: String(row.brand || "غير محدد"),
    available: Number(row.available || 0),
    reorderPoint: Number(row.reorder_point || 0),
    unit: String(row.unit || "قطعة"),
    location: String(row.location || "غير محدد"),
    color: String(row.color || "غير محدد"),
  };
}

export async function getOpsDashboard() {
  const supabase = await createClient();
  const [ordersResponse, inventoryResponse] = await Promise.all([
    supabase
      .from("orders")
      .select("id, order_number, title, service, material, quantity, value_sar, due_date, stage, priority, contact, created_at, clients(name, company, phone)")
      .order("created_at", { ascending: false }),
    supabase
      .from("inventory_items")
      .select("id, name, item_type, brand, color, available, reorder_point, unit, location")
      .order("name", { ascending: true }),
  ]);

  if (ordersResponse.error) throw ordersResponse.error;
  if (inventoryResponse.error) throw inventoryResponse.error;

  return {
    orders: ((ordersResponse.data || []) as Record<string, unknown>[]).map(mapOrder),
    inventory: ((inventoryResponse.data || []) as Record<string, unknown>[]).map(mapInventory),
  };
}
