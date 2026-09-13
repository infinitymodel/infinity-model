import { redirect } from "next/navigation";

import { sallaStoreUrl } from "@/data/store";

/**
 * Product details, price, stock and shipping must have a single source of truth.
 * Legacy marketing-site product URLs therefore lead customers to the Salla store
 * instead of exposing old sample cards with missing prices.
 */
export default function LegacyProductPage() {
  redirect(sallaStoreUrl);
}
