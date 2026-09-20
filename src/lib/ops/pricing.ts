export type MaterialCode = "pla" | "petg" | "asa" | "abs" | "resin";
export type Complexity = "basic" | "standard" | "complex";

export interface PricingRule {
  materialCode: MaterialCode;
  materialPricePerKg: number;
  machineRatePerHour: number;
  labourRatePerHour: number;
  setupFee: number;
  wastePercent: number;
  markupPercent: number;
  minimumOrder: number;
}

export interface PricingInput {
  materialCode: MaterialCode;
  weightGrams: number;
  printHours: number;
  labourMinutes: number;
  quantity: number;
  complexity: Complexity;
  powerRatePerHour: number;
  overheadPercent: number;
  shippingCost: number;
  discountPercent: number;
  includeVat: boolean;
}

export interface PricingResult {
  materialCost: number;
  machineCost: number;
  labourCost: number;
  powerCost: number;
  setupFee: number;
  wasteCost: number;
  complexityCost: number;
  overheadCost: number;
  markup: number;
  subtotal: number;
  discount: number;
  shippingCost: number;
  netBeforeVat: number;
  vat: number;
  total: number;
  unitPrice: number;
  currency: "SAR";
}

export const defaultPricingRules: PricingRule[] = [
  { materialCode: "pla", materialPricePerKg: 95, machineRatePerHour: 18, labourRatePerHour: 55, setupFee: 25, wastePercent: 8, markupPercent: 35, minimumOrder: 45 },
  { materialCode: "petg", materialPricePerKg: 120, machineRatePerHour: 20, labourRatePerHour: 55, setupFee: 30, wastePercent: 10, markupPercent: 38, minimumOrder: 55 },
  { materialCode: "asa", materialPricePerKg: 150, machineRatePerHour: 24, labourRatePerHour: 60, setupFee: 35, wastePercent: 12, markupPercent: 42, minimumOrder: 70 },
  { materialCode: "abs", materialPricePerKg: 130, machineRatePerHour: 23, labourRatePerHour: 60, setupFee: 35, wastePercent: 12, markupPercent: 40, minimumOrder: 65 },
  { materialCode: "resin", materialPricePerKg: 190, machineRatePerHour: 28, labourRatePerHour: 65, setupFee: 40, wastePercent: 15, markupPercent: 45, minimumOrder: 90 },
];

export const operationalPricingDefaults = {
  powerRatePerHour: 2.5,
  overheadPercent: 8,
  vatPercent: 15,
} as const;

const complexityMultiplier: Record<Complexity, number> = { basic: 0, standard: 0.1, complex: 0.25 };
const money = (value: number) => Math.round(value * 100) / 100;

export function calculatePrice(input: PricingInput, rule: PricingRule): PricingResult {
  const materialCost = (input.weightGrams / 1000) * rule.materialPricePerKg * input.quantity;
  const machineCost = input.printHours * rule.machineRatePerHour * input.quantity;
  const labourCost = (input.labourMinutes / 60) * rule.labourRatePerHour * input.quantity;
  const powerCost = input.printHours * input.powerRatePerHour * input.quantity;
  const setupFee = rule.setupFee;
  const base = materialCost + machineCost + labourCost + powerCost + setupFee;
  const wasteCost = (materialCost * rule.wastePercent) / 100;
  const complexityCost = (base + wasteCost) * complexityMultiplier[input.complexity];
  const overheadCost = (base + wasteCost + complexityCost) * (input.overheadPercent / 100);
  const subtotal = base + wasteCost + complexityCost + overheadCost;
  const markup = (subtotal * rule.markupPercent) / 100;
  const discount = ((subtotal + markup) * input.discountPercent) / 100;
  const netBeforeVat = Math.max(rule.minimumOrder, subtotal + markup - discount);
  const vat = input.includeVat ? (netBeforeVat + input.shippingCost) * (operationalPricingDefaults.vatPercent / 100) : 0;
  const total = netBeforeVat + input.shippingCost + vat;

  return {
    materialCost: money(materialCost),
    machineCost: money(machineCost),
    labourCost: money(labourCost),
    powerCost: money(powerCost),
    setupFee: money(setupFee),
    wasteCost: money(wasteCost),
    complexityCost: money(complexityCost),
    overheadCost: money(overheadCost),
    markup: money(markup),
    subtotal: money(subtotal),
    discount: money(discount),
    shippingCost: money(input.shippingCost),
    netBeforeVat: money(netBeforeVat),
    vat: money(vat),
    total: money(total),
    unitPrice: money(total / input.quantity),
    currency: "SAR",
  };
}
