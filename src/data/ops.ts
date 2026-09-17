export type OpsStage =
  | "brief"
  | "design"
  | "quote"
  | "production"
  | "quality"
  | "delivery";

export type OpsPriority = "high" | "medium" | "low";

export interface OpsOrder {
  id: string;
  databaseId?: string;
  customer: string;
  company?: string;
  title: string;
  service: string;
  material: string;
  quantity: number;
  value: number;
  dueDate: string;
  stage: OpsStage;
  priority: OpsPriority;
  contact: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: "filament" | "resin" | "spare";
  brand: string;
  available: number;
  reorderPoint: number;
  unit: string;
  location: string;
  color: string;
}

export interface OpsCustomer {
  id: string;
  name: string;
  company: string;
  phone: string;
  totalOrders: number;
  totalValue: number;
  lastOrder: string;
}

export const stageMeta: Record<OpsStage, { label: string; shortLabel: string }> = {
  brief: { label: "استلام الطلب", shortLabel: "طلب جديد" },
  design: { label: "التصميم", shortLabel: "تصميم" },
  quote: { label: "عرض السعر", shortLabel: "عرض سعر" },
  production: { label: "الإنتاج", shortLabel: "إنتاج" },
  quality: { label: "فحص الجودة", shortLabel: "جودة" },
  delivery: { label: "التسليم", shortLabel: "تسليم" },
};

export const stageOrder: OpsStage[] = [
  "brief",
  "design",
  "quote",
  "production",
  "quality",
  "delivery",
];

export const defaultOrders: OpsOrder[] = [
  {
    id: "IM-2408",
    customer: "مؤسسة أفق الهندسية",
    company: "أفق الهندسية",
    title: "حامل لوحة تحكم صناعية",
    service: "تصميم وطباعة مخصصة",
    material: "PETG أسود",
    quantity: 12,
    value: 1840,
    dueDate: "2026-09-18",
    stage: "production",
    priority: "high",
    contact: "+966 55 203 7841",
    createdAt: "2026-09-12",
  },
  {
    id: "IM-2407",
    customer: "رنا الشمراني",
    title: "مجسم شخصية مخصص",
    service: "طباعة ريزن",
    material: "ريزن رمادي",
    quantity: 1,
    value: 420,
    dueDate: "2026-09-19",
    stage: "quality",
    priority: "medium",
    contact: "+966 50 771 4192",
    createdAt: "2026-09-11",
  },
  {
    id: "IM-2406",
    customer: "شركة وعد العقارية",
    company: "وعد العقارية",
    title: "نموذج معماري لمكتب مبيعات",
    service: "نموذج أولي",
    material: "PLA أبيض",
    quantity: 1,
    value: 3200,
    dueDate: "2026-09-24",
    stage: "design",
    priority: "high",
    contact: "+966 54 100 2030",
    createdAt: "2026-09-10",
  },
  {
    id: "IM-2405",
    customer: "محمد القحطاني",
    title: "قطع غيار لجهاز زراعي",
    service: "هندسة عكسية",
    material: "ASA أبيض",
    quantity: 4,
    value: 960,
    dueDate: "2026-09-17",
    stage: "quote",
    priority: "medium",
    contact: "+966 55 419 6180",
    createdAt: "2026-09-09",
  },
  {
    id: "IM-2404",
    customer: "مكتبة جازان التعليمية",
    company: "مكتبة جازان التعليمية",
    title: "مجسمات تعليمية للعلوم",
    service: "إنتاج دفعات",
    material: "PLA ألوان متنوعة",
    quantity: 45,
    value: 5100,
    dueDate: "2026-09-26",
    stage: "brief",
    priority: "low",
    contact: "+966 56 503 3341",
    createdAt: "2026-09-08",
  },
];

export const defaultInventory: InventoryItem[] = [
  { id: "INV-01", name: "PLA Matte", type: "filament", brand: "Bambu Lab", available: 8, reorderPoint: 3, unit: "بكرة", location: "رف A-01", color: "أحمر" },
  { id: "INV-02", name: "PETG Basic", type: "filament", brand: "Bambu Lab", available: 2, reorderPoint: 3, unit: "بكرة", location: "رف A-02", color: "رمادي" },
  { id: "INV-03", name: "ASA Aero", type: "filament", brand: "Bambu Lab", available: 5, reorderPoint: 2, unit: "بكرة", location: "رف A-03", color: "أبيض" },
  { id: "INV-04", name: "PLA+", type: "filament", brand: "Kingroon", available: 11, reorderPoint: 4, unit: "بكرة", location: "رف B-01", color: "أسود" },
  { id: "INV-05", name: "Standard Resin", type: "resin", brand: "Elegoo", available: 1, reorderPoint: 2, unit: "عبوة", location: "خزانة R-02", color: "رمادي" },
  { id: "INV-06", name: "Nozzle 0.4 mm", type: "spare", brand: "Bambu Lab", available: 6, reorderPoint: 4, unit: "قطعة", location: "درج S-04", color: "نحاسي" },
];

export const defaultCustomers: OpsCustomer[] = [
  { id: "CUS-01", name: "مؤسسة أفق الهندسية", company: "أفق الهندسية", phone: "+966 55 203 7841", totalOrders: 7, totalValue: 14800, lastOrder: "2026-09-12" },
  { id: "CUS-02", name: "شركة وعد العقارية", company: "وعد العقارية", phone: "+966 54 100 2030", totalOrders: 4, totalValue: 9200, lastOrder: "2026-09-10" },
  { id: "CUS-03", name: "مكتبة جازان التعليمية", company: "مكتبة جازان التعليمية", phone: "+966 56 503 3341", totalOrders: 3, totalValue: 7750, lastOrder: "2026-09-08" },
  { id: "CUS-04", name: "رنا الشمراني", company: "عميل فردي", phone: "+966 50 771 4192", totalOrders: 2, totalValue: 980, lastOrder: "2026-09-11" },
];
