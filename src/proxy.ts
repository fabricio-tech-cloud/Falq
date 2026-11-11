import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  MANAGER_SESSION_COOKIE,
  isValidManagerSessionToken,
} from "@/lib/manager-auth";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(MANAGER_SESSION_COOKIE)?.value;
  const authed = await isValidManagerSessionToken(token);

  if (!authed) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manager", "/manager/:path*"],
};
