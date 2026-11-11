"use server";

import { getDb } from "@/lib/db";
import { partnerApplications } from "@/lib/db/schema";
import { createId, nowIso } from "@/lib/id";

export type PartnerActionState = {
  ok?: boolean;
  error?: string;
};

const ALLOWED_INTEREST = new Set([
  "affiliate",
  "community",
  "content",
  "other",
]);

export async function submitPartnerApplication(
  _prev: PartnerActionState,
  formData: FormData
): Promise<PartnerActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const interest = String(formData.get("interest") ?? "").trim();
  const handle = String(formData.get("handle") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Bitte Name, E-Mail und Nachricht ausfüllen." };
  }
  if (!email.includes("@")) {
    return { error: "Bitte eine gültige E-Mail angeben." };
  }
  if (!ALLOWED_INTEREST.has(interest)) {
    return { error: "Ungültiges Interesse." };
  }

  const stamp = nowIso();

  try {
    const db = getDb();
    await db.insert(partnerApplications).values({
      id: createId("partner"),
      name,
      email,
      interest,
      handle,
      message,
      status: "neu",
      createdAt: stamp,
      updatedAt: stamp,
    });
  } catch {
    return { error: "Speichern fehlgeschlagen. Bitte später erneut versuchen." };
  }

  return { ok: true };
}
