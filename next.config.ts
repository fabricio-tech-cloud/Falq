import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
  // Cache Components hangs on Cloudflare Workers (setTimeout/workerd) → Error 1101.
  // Re-enable once OpenNext/workerd fully supports staged renders for this Next version.
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

// Must run for local `next dev` so D1/bindings exist on getCloudflareContext().env
initOpenNextCloudflareForDev();
