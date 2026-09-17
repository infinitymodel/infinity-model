import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { OpsAccessPending, OpsSetup } from "@/components/ops/OpsAccessState";
import InfinityOps from "@/components/ops/InfinityOps";
import { getOpsIdentity } from "@/lib/ops/access";
import { getOpsDashboard } from "@/lib/ops/dashboard";

export const metadata: Metadata = {
  title: "Infinity OS",
  description: "Infinity Model internal operations dashboard.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OperationsPage() {
  const identity = await getOpsIdentity();
  if (identity.status === "unconfigured") return <OpsSetup />;
  if (identity.status === "unauthenticated") redirect("/ops/login");
  if (identity.status === "pending") return <OpsAccessPending email={identity.email} />;

  const dashboard = await getOpsDashboard().catch(() => ({ orders: [], inventory: [] }));
  return <InfinityOps operator={{ name: identity.fullName, role: identity.role }} initialOrders={dashboard.orders} initialInventory={dashboard.inventory} />;
}
