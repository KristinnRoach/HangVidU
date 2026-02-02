#!/usr/bin/env node

/**
 * Runner for file transfer large tests with --sizes flag.
 *
 * Usage:
 *   pnpm test:file-transfer                        # default: 100MB only
 *   pnpm test:file-transfer --sizes 100,250,500    # values in MB
 *   pnpm test:file-transfer --sizes 500MB,1GB      # with units
 *   pnpm test:file-transfer:full                    # preset: 100-1024MB
 */

import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const sizesIdx = args.indexOf('--sizes');
const sizes = sizesIdx !== -1 && args[sizesIdx + 1]
  ? args[sizesIdx + 1].replace(/\s/g, '')
  : undefined;

const env = { ...process.env };
if (sizes) {
  env.VITE_FT_SIZES = sizes;
}

try {
  execSync('vitest --run tests/integration/file-transfer-large.test.js', {
    stdio: 'inherit',
    env,
  });
} catch {
  process.exit(1);
}
