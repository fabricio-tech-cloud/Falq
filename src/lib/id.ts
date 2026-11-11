export function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "")}`;
}

export function nowIso() {
  return new Date().toISOString();
}
