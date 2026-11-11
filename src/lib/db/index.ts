import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import * as schema from "./schema";

export const getDb = cache(() => {
  const { env } = getCloudflareContext();
  return drizzle(env.falq_db, { schema });
});

/** For SSG / static generation paths that need async context. */
export const getDbAsync = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.falq_db, { schema });
});
