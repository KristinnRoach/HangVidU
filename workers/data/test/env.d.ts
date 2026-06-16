import type { D1Migration } from '@cloudflare/vitest-pool-workers';

// Type the bindings the test pool exposes via `cloudflare:test`. `DB` mirrors the
// worker's binding; `TEST_MIGRATIONS` is injected by vitest.config.ts.
declare module 'cloudflare:test' {
  interface ProvidedEnv {
    DB: D1Database;
    TEST_MIGRATIONS: D1Migration[];
  }
}
