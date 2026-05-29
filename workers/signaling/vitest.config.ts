import { cloudflareTest } from '@cloudflare/vitest-pool-workers';
import { defineConfig } from 'vitest/config';

// vitest 4 + pool-workers 0.16: the pool is a Vite plugin; the old
// defineWorkersConfig/poolOptions shape was removed.
export default defineConfig({
  plugins: [cloudflareTest({ wrangler: { configPath: './wrangler.jsonc' } })],
});
