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
}

export interface PricingResult {
  materialCost: number;
  machineCost: number;
  labourCost: number;
  setupFee: number;
  wasteCost: number;
  complexityCost: number;
  markup: number;
  subtotal: number;
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

const complexityMultiplier: Record<Complexity, number> = { basic: 0, standard: 0.1, complex: 0.25 };
const money = (value: number) => Math.round(value * 100) / 100;

export function calculatePrice(input: PricingInput, rule: PricingRule): PricingResult {
  const materialCost = (input.weightGrams / 1000) * rule.materialPricePerKg * input.quantity;
  const machineCost = input.printHours * rule.machineRatePerHour * input.quantity;
  const labourCost = (input.labourMinutes / 60) * rule.labourRatePerHour;
  const setupFee = rule.setupFee;
  const base = materialCost + machineCost + labourCost + setupFee;
  const wasteCost = (materialCost * rule.wastePercent) / 100;
  const complexityCost = (base + wasteCost) * complexityMultiplier[input.complexity];
  const subtotal = base + wasteCost + complexityCost;
  const markup = (subtotal * rule.markupPercent) / 100;
  const total = Math.max(rule.minimumOrder, subtotal + markup);

  return {
    materialCost: money(materialCost),
    machineCost: money(machineCost),
    labourCost: money(labourCost),
    setupFee: money(setupFee),
    wasteCost: money(wasteCost),
    complexityCost: money(complexityCost),
    markup: money(markup),
    subtotal: money(subtotal),
    total: money(total),
    unitPrice: money(total / input.quantity),
    currency: "SAR",
  };
}
