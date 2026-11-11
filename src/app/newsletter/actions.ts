"use server";

import { getDb } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { createId, nowIso } from "@/lib/id";

export type NewsletterState = {
  ok?: boolean;
  error?: string;
};

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return { error: "Bitte eine gültige E-Mail angeben." };
  }

  try {
    const db = getDb();
    await db
      .insert(newsletterSubscribers)
      .values({
        id: createId("news"),
        email,
        createdAt: nowIso(),
      })
      .onConflictDoNothing({ target: newsletterSubscribers.email });
  } catch {
    return { error: "Anmeldung fehlgeschlagen. Bitte später erneut versuchen." };
  }

  return { ok: true };
}
