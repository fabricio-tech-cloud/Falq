import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import * as schema from "./schema";

export const getDb = cache(() => {
  const { env } = getCloudflareContext();
  if (!env.falq_db) {
    throw new Error(
      "D1 binding falq_db is missing. Restart `npm run dev` after wrangler D1 config changes, then run `npm run db:migrate:local`."
    );
  }
  return drizzle(env.falq_db, { schema });
});

/** For SSG / static generation paths that need async context. */
export const getDbAsync = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.falq_db) {
    throw new Error(
      "D1 binding falq_db is missing. Restart `npm run dev` after wrangler D1 config changes, then run `npm run db:migrate:local`."
    );
  }
  return drizzle(env.falq_db, { schema });
});
