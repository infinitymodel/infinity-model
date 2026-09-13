function publicHttpsUrl(value: string | undefined, fallback: string) {
  const candidate = value?.trim();
  if (!candidate) return fallback;

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString().replace(/\/$/, "") : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Keep the marketing website and Salla storefront separate. Once the CNAME is
 * live, set NEXT_PUBLIC_SALLA_STORE_URL=https://shop.3dinfinitymodel.com.
 */
export const sallaStoreUrl = publicHttpsUrl(
  process.env.NEXT_PUBLIC_SALLA_STORE_URL,
  "https://3dinfinitymodel.com"
);

export const sallaReadyProductsUrl =
  "https://3dinfinitymodel.com/%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA-%D8%AC%D8%A7%D9%87%D8%B2%D9%87/c2027917336";

export const sallaCustomPrintingUrl = publicHttpsUrl(
  process.env.NEXT_PUBLIC_SALLA_CUSTOM_SERVICE_URL,
  "https://3dinfinitymodel.com/%D8%AE%D8%AF%D9%85%D8%A9-%D8%A7%D9%84%D8%B7%D8%A8%D8%A7%D8%B9%D8%A9-%D8%AD%D8%B3%D8%A8-%D8%A7%D9%84%D8%B7%D9%84%D8%A8/c2089509649"
);
