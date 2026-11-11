"use server";

import { getDb } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { createId, nowIso } from "@/lib/id";
import { getProduct } from "@/lib/products";

export type CheckoutActionState = {
  ok?: boolean;
  error?: string;
  orderId?: string;
};

type CheckoutCartItem = {
  productId: string;
  quantity: number;
};

function parseCartItems(raw: FormDataEntryValue | null): CheckoutCartItem[] | null {
  if (typeof raw !== "string" || !raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed.map((item) => ({
      productId: String((item as CheckoutCartItem).productId ?? ""),
      quantity: Number((item as CheckoutCartItem).quantity ?? 0),
    }));
  } catch {
    return null;
  }
}

export async function submitOrder(
  _prev: CheckoutActionState,
  formData: FormData
): Promise<CheckoutActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const discord = String(formData.get("discord") ?? "").trim() || null;
  const telegram = String(formData.get("telegram") ?? "").trim() || null;
  const items = parseCartItems(formData.get("items"));

  if (!name || !email) {
    return { error: "Bitte Name und E-Mail ausfüllen." };
  }
  if (!email.includes("@")) {
    return { error: "Bitte eine gültige E-Mail angeben." };
  }
  if (!items?.length) {
    return { error: "Warenkorb ist leer." };
  }

  const lineItems: {
    productId: string;
    name: string;
    quantity: number;
    unitCents: number;
    lineCents: number;
  }[] = [];

  let totalCents = 0;

  for (const item of items) {
    const quantity = Math.max(1, Math.floor(Number(item.quantity) || 0));
    const product = getProduct(item.productId);
    if (!product || quantity < 1) {
      return { error: "Ungültiger Warenkorb." };
    }
    const lineCents = product.priceCents * quantity;
    totalCents += lineCents;
    lineItems.push({
      productId: product.id,
      name: product.name,
      quantity,
      unitCents: product.priceCents,
      lineCents,
    });
  }

  const orderId = createId("order");
  const stamp = nowIso();

  try {
    const db = getDb();
    await db.insert(orders).values({
      id: orderId,
      name,
      email,
      discord,
      telegram,
      itemsJson: JSON.stringify(lineItems),
      totalCents,
      status: "pending",
      createdAt: stamp,
      updatedAt: stamp,
    });
  } catch {
    return { error: "Bestellung konnte nicht gespeichert werden." };
  }

  return { ok: true, orderId };
}
