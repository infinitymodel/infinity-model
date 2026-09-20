export type OpsRole = "owner" | "admin" | "sales" | "production" | "inventory" | "viewer";
export type OpsPermission = "orders:read" | "orders:write" | "production:write" | "inventory:write" | "pricing:calculate" | "users:manage";

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
