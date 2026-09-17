import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type OpsRole = "owner" | "admin" | "sales" | "production" | "inventory" | "viewer";
export type OpsPermission = "orders:read" | "orders:write" | "production:write" | "inventory:write" | "pricing:calculate" | "users:manage";

export type OpsIdentity =
  | { status: "unconfigured" }
  | { status: "unauthenticated" }
  | { status: "pending"; email: string }
  | { status: "ready"; id: string; email: string; fullName: string; role: OpsRole };

const permissions: Record<OpsRole, OpsPermission[]> = {
  owner: ["orders:read", "orders:write", "production:write", "inventory:write", "pricing:calculate", "users:manage"],
  admin: ["orders:read", "orders:write", "production:write", "inventory:write", "pricing:calculate", "users:manage"],
  sales: ["orders:read", "orders:write", "pricing:calculate"],
  production: ["orders:read", "production:write", "pricing:calculate"],
  inventory: ["orders:read", "inventory:write"],
  viewer: ["orders:read"],
};

export function hasPermission(role: OpsRole, permission: OpsPermission) {
  return permissions[role].includes(permission);
}

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
