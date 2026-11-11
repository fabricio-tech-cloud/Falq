export const MANAGER_SESSION_COOKIE = "falq_manager_session";

function getAuthConfig() {
  return {
    user: process.env.MANAGER_USER ?? "falq",
    password: process.env.MANAGER_PASSWORD ?? "changeme",
    secret: process.env.MANAGER_SESSION_SECRET ?? "dev-only-change-me",
  };
}

async function hmacHex(secret: string, message: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message)
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createManagerSessionToken() {
  const { user, password, secret } = getAuthConfig();
  return hmacHex(secret, `falq-manager:${user}:${password}`);
}

export function verifyManagerCredentials(username: string, password: string) {
  const config = getAuthConfig();
  return (
    safeEqual(username.trim(), config.user) &&
    safeEqual(password, config.password)
  );
}

export async function isValidManagerSessionToken(token: string | undefined) {
  if (!token) return false;
  const expected = await createManagerSessionToken();
  return safeEqual(token, expected);
}
