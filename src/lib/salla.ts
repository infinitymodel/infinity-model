const SALLA_PRODUCTS_ENDPOINT = "https://api.salla.dev/admin/v2/products";

export interface SallaProduct {
  id: string;
  name: string;
  price: number | null;
  currency: string;
  image?: string;
  href: string;
  available: boolean;
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function asText(value: unknown): string | undefined {
  if (typeof value !== "string" && typeof value !== "number") return undefined;
  const text = String(value).trim();
  return text || undefined;
}

function asNumber(value: unknown): number | null {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

function isTrustedStoreUrl(value: string | undefined): value is string {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && (
      url.hostname === "3dinfinitymodel.com" ||
      url.hostname === "salla.sa" ||
      url.hostname.endsWith(".salla.sa")
    );
  } catch {
    return false;
  }
}

function isTrustedImageUrl(value: string | undefined): value is string {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && (
      url.hostname.endsWith(".salla.network") ||
      url.hostname === "salla-dev.s3.eu-central-1.amazonaws.com"
    );
  } catch {
    return false;
  }
}

function normalizeProduct(value: unknown): SallaProduct | null {
  if (!isRecord(value)) return null;

  const id = asText(value.id);
  const name = asText(value.name);
  const urls = isRecord(value.urls) ? value.urls : undefined;
  const href = asText(urls?.customer);

  if (!id || !name || !isTrustedStoreUrl(href)) return null;

  const priceRecord = isRecord(value.price) ? value.price : undefined;
  const thumbnail = asText(value.thumbnail);
  const status = asText(value.status)?.toLowerCase();

  return {
    id,
    name,
    price: asNumber(priceRecord?.amount),
    currency: asText(priceRecord?.currency) ?? "SAR",
    image: isTrustedImageUrl(thumbnail) ? thumbnail : undefined,
    href,
    available: status !== "out" && status !== "hidden",
  };
}

export function isSallaConfigured() {
  return Boolean(process.env.SALLA_ACCESS_TOKEN?.trim());
}

export async function getSallaProducts(limit = 8): Promise<SallaProduct[]> {
  const token = process.env.SALLA_ACCESS_TOKEN?.trim();
  if (!token) return [];

  try {
    const response = await fetch(
      `${SALLA_PRODUCTS_ENDPOINT}?per_page=${Math.min(Math.max(limit, 1), 20)}&format=light`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        next: { revalidate: 900 },
      }
    );

    if (!response.ok) return [];

    const payload: unknown = await response.json();
    const data = isRecord(payload) ? payload.data : undefined;

    if (!Array.isArray(data)) return [];

    return data
      .map(normalizeProduct)
      .filter((product): product is SallaProduct => product !== null)
      .filter((product) => product.available)
      .slice(0, limit);
  } catch {
    // A storefront should remain available even if the store API is temporarily unavailable.
    return [];
  }
}
