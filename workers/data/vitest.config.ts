import { cloudflareTest, readD1Migrations } from '@cloudflare/vitest-pool-workers';
import { defineConfig } from 'vitest/config';

// Apply the real D1 migrations to the test database so the suite exercises the
// production schema (constraints, indexes, dropped columns) rather than a
// hand-rolled approximation. The migrations are read once and handed to the
// worker pool as a binding; `test/apply-migrations.ts` applies them per file.
export default defineConfig(async () => {
  const migrations = await readD1Migrations('./migrations');
  return {
    test: {
      setupFiles: ['./test/apply-migrations.ts'],
    },
    plugins: [
      cloudflareTest({
        miniflare: {
          bindings: { TEST_MIGRATIONS: migrations },
        },
        wrangler: { configPath: './wrangler.jsonc' },
      }),
    ],
  };
});
