import type { Metadata } from "next";

import { OpsSetup } from "@/components/ops/OpsAccessState";
import OpsResetPasswordForm from "@/components/ops/OpsResetPasswordForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "استعادة كلمة مرور Infinity OS", robots: { index: false, follow: false } };

export default function ResetPasswordPage() {
  if (!isSupabaseConfigured()) return <OpsSetup />;
  return <OpsResetPasswordForm />;
}
