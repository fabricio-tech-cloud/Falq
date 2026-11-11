"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  orders,
  partnerApplications,
  type OrderStatus,
  type PartnerStatus,
} from "@/lib/db/schema";
import { nowIso } from "@/lib/id";

const PARTNER_STATUSES = new Set<PartnerStatus>([
  "neu",
  "in_bearbeitung",
  "erledigt",
]);

const ORDER_STATUSES = new Set<OrderStatus>([
  "pending",
  "fulfilled",
  "cancelled",
]);

export async function updatePartnerStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as PartnerStatus;

  if (!id || !PARTNER_STATUSES.has(status)) {
    return;
  }

  const db = getDb();
  await db
    .update(partnerApplications)
    .set({ status, updatedAt: nowIso() })
    .where(eq(partnerApplications.id, id));

  revalidatePath("/manager");
}

export async function updateOrderStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;

  if (!id || !ORDER_STATUSES.has(status)) {
    return;
  }

  const db = getDb();
  await db
    .update(orders)
    .set({ status, updatedAt: nowIso() })
    .where(eq(orders.id, id));

  revalidatePath("/manager");
}
