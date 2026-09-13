import { NextResponse } from "next/server";

import { getSallaProducts, isSallaConfigured } from "@/lib/salla";

export async function GET() {
  const products = await getSallaProducts();

  return NextResponse.json(
    {
      configured: isSallaConfigured(),
      products,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    }
  );
}
