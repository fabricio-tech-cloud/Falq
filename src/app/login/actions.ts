"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  MANAGER_SESSION_COOKIE,
  createManagerSessionToken,
  verifyManagerCredentials,
} from "@/lib/manager-auth";

export type LoginState = {
  error?: string;
};

export async function loginManager(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyManagerCredentials(username, password)) {
    return { error: "Zugangsdaten stimmen nicht." };
  }

  const jar = await cookies();
  jar.set(MANAGER_SESSION_COOKIE, await createManagerSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect("/manager");
}

export async function logoutManager() {
  const jar = await cookies();
  jar.delete(MANAGER_SESSION_COOKIE);
  redirect("/login");
}
