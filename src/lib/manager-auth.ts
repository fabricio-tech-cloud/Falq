import { getCloudflareContext } from "@opennextjs/cloudflare";

export const MANAGER_SESSION_COOKIE = "falq_manager_session";

export type StaffRole = "manager" | "manager2";

type StaffAccount = {
  role: StaffRole;
  user: string;
  password: string;
};

function normalizeSecret(value: string | undefined | null) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

async function readEnv(key: string): Promise<string | undefined> {
  // Prefer Worker bindings/secrets. process.env can be polluted by .env.local
  // values from the OpenNext/Next build and would shadow Cloudflare secrets.
  try {
    const { env } = await getCloudflareContext({ async: true });
    const fromCf = normalizeSecret(
      (env as unknown as Record<string, string | undefined>)[key]
    );
    if (fromCf) return fromCf;
  } catch {
    // Local next-dev / tests without a Worker context.
  }

  return normalizeSecret(process.env[key]);
}

async function getSessionSecret() {
  return (await readEnv("MANAGER_SESSION_SECRET")) ?? "dev-only-change-me";
}

async function getStaffAccounts(): Promise<StaffAccount[]> {
  const [
    managerUser,
    managerPassword,
    manager2User,
    manager2Password,
  ] = await Promise.all([
    readEnv("MANAGER_USER"),
    readEnv("MANAGER_PASSWORD"),
    readEnv("MANAGER_USER_2"),
    readEnv("MANAGER_PASSWORD_2"),
  ]);

  const accounts: StaffAccount[] = [];

  if (managerUser && managerPassword) {
    accounts.push({
      role: "manager",
      user: managerUser,
      password: managerPassword,
    });
  }

  if (manager2User && manager2Password) {
    accounts.push({
      role: "manager2",
      user: manager2User,
      password: manager2Password,
    });
  }

  // Local fallback only when no Cloudflare/local secrets are configured.
  if (accounts.length === 0) {
    accounts.push({
      role: "manager",
      user: "falq",
      password: "changeme",
    });
  }

  return accounts;
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

function isStaffRole(value: string): value is StaffRole {
  return value === "manager" || value === "manager2";
}

export async function verifyStaffCredentials(
  username: string,
  password: string
): Promise<StaffRole | null> {
  const trimmedUser = username.trim();
  const trimmedPassword = password.trim();
  const accounts = await getStaffAccounts();

  for (const account of accounts) {
    const userMatches =
      safeEqual(trimmedUser, account.user) ||
      safeEqual(trimmedUser.toLowerCase(), account.user.toLowerCase());
    if (userMatches && safeEqual(trimmedPassword, account.password)) {
      return account.role;
    }
  }
  return null;
}

export async function createStaffSessionToken(role: StaffRole) {
  const accounts = await getStaffAccounts();
  const account = accounts.find((entry) => entry.role === role);
  if (!account) {
    throw new Error(`Unknown staff role: ${role}`);
  }
  const signature = await hmacHex(
    await getSessionSecret(),
    `falq-staff:${role}:${account.user}:${account.password}`
  );
  return `${role}.${signature}`;
}

export async function getStaffSessionFromToken(token: string | undefined) {
  if (!token) return null;
  const [role, signature] = token.split(".");
  if (!role || !signature || !isStaffRole(role)) return null;

  const expected = await createStaffSessionToken(role);
  if (!safeEqual(token, expected)) return null;
  return { role };
}

export async function isValidManagerSessionToken(token: string | undefined) {
  return (await getStaffSessionFromToken(token)) !== null;
}

export function staffRoleLabel(role: StaffRole | undefined) {
  if (role === "manager2") return "Manager 2";
  return "Manager 1";
}
