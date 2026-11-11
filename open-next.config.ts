// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

const cf = defineCloudflareConfig({
	// For best results consider enabling R2 caching
	// See https://opennext.js.org/cloudflare/caching for more details
	// incrementalCache: r2IncrementalCache
});

// Workers Builds runs `npm run build`. That must be the OpenNext build.
// OpenNext would recurse if it also called `npm run build`, so Next uses build:next.
export default {
	...cf,
	buildCommand: "npm run build:next",
};
