import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  "stl",
  "obj",
  "3mf",
  "step",
  "stp",
  "zip",
  "pdf",
  "png",
  "jpg",
  "jpeg",
]);

function textValue(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function extensionOf(filename: string) {
  return filename.toLowerCase().split(".").pop() ?? "";
}

function validWebhookUrl(value: string | undefined) {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  const incoming = await request.formData();
  const fields = {
    name: textValue(incoming.get("name"), 120),
    email: textValue(incoming.get("email"), 180),
    phone: textValue(incoming.get("phone"), 40),
    inquiry: textValue(incoming.get("inquiry"), 160),
    dimensions: textValue(incoming.get("dimensions"), 160),
    material: textValue(incoming.get("material"), 100),
    quantity: textValue(incoming.get("quantity"), 40),
    targetDate: textValue(incoming.get("targetDate"), 40),
    details: textValue(incoming.get("details"), 3000),
  };

  if (!fields.name || !fields.email || !fields.inquiry || !fields.details) {
    return NextResponse.json({ error: "Invalid quote request." }, { status: 400 });
  }

  const attachment = incoming.get("attachment");
  const file = attachment instanceof File && attachment.size > 0 ? attachment : undefined;

  if (file && (
    file.size > MAX_ATTACHMENT_BYTES ||
    !ALLOWED_EXTENSIONS.has(extensionOf(file.name))
  )) {
    return NextResponse.json({ error: "Invalid attachment." }, { status: 400 });
  }

  const webhookUrl = validWebhookUrl(process.env.QUOTE_WEBHOOK_URL?.trim());
  if (!webhookUrl) {
    return NextResponse.json({
      delivered: false,
      requiresSetup: true,
    }, { status: 202 });
  }

  const forwarded = new FormData();
  Object.entries(fields).forEach(([key, value]) => forwarded.set(key, value));
  forwarded.set("source", "infinity-model-website");

  if (file) {
    forwarded.set(
      "attachment",
      new File([await file.arrayBuffer()], file.name, {
        type: file.type || "application/octet-stream",
      })
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      body: forwarded,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ delivered: true });
}
