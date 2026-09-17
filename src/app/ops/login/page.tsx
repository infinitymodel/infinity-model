import type { Metadata } from "next";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { OpsSetup } from "@/components/ops/OpsAccessState";
import OpsLoginForm from "@/components/ops/OpsLoginForm";

export const metadata: Metadata = { title: "دخول Infinity OS", robots: { index: false, follow: false } };

export default function OpsLoginPage() {
  if (!isSupabaseConfigured()) return <OpsSetup />;
  return <OpsLoginForm />;
}
