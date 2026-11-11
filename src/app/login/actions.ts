"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  MANAGER_SESSION_COOKIE,
  createStaffSessionToken,
  verifyStaffCredentials,
} from "@/lib/manager-auth";

export type LoginState = {
  error?: string;
};

function safeNextPath(value: FormDataEntryValue | null) {
  const next = String(value ?? "").trim();
  if (!next.startsWith("/") || next.startsWith("//")) return "/manager";
  return next;
}

export async function loginManager(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const role = await verifyStaffCredentials(username, password);

  if (!role) {
    return { error: "Zugangsdaten stimmen nicht." };
  }

  const jar = await cookies();
  jar.set(MANAGER_SESSION_COOKIE, await createStaffSessionToken(role), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect(safeNextPath(formData.get("next")));
}

export async function logoutManager() {
  const jar = await cookies();
  jar.delete(MANAGER_SESSION_COOKIE);
  redirect("/partner");
}
