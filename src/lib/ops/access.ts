import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { OpsRole } from "@/lib/ops/permissions";

export { hasPermission, type OpsPermission, type OpsRole } from "@/lib/ops/permissions";

export type OpsIdentity =
  | { status: "unconfigured" }
  | { status: "unauthenticated" }
  | { status: "pending"; email: string }
  | { status: "ready"; id: string; email: string; fullName: string; role: OpsRole };

export async function getOpsIdentity(): Promise<OpsIdentity> {
  if (!isSupabaseConfigured()) return { status: "unconfigured" };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const subject = typeof claims?.sub === "string" ? claims.sub : undefined;
  const email = typeof claims?.email === "string" ? claims.email : "";

  if (error || !subject) return { status: "unauthenticated" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", subject)
    .maybeSingle();

  if (!profile) return { status: "pending", email };

  return {
    status: "ready",
    id: subject,
    email,
    fullName: typeof profile.full_name === "string" && profile.full_name.trim() ? profile.full_name : email,
    role: profile.role as OpsRole,
  };
}
