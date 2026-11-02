#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { sentryRelease } from './sentry-release.js';

const run = (args, env = process.env) =>
  execFileSync('pnpm', args, { stdio: 'inherit', env });

export function deploy({
  withWorker = false,
  allFirebase = false,
  skipTests = false,
} = {}) {
  // Test the published p2p package, even if this checkout was linked for dev.
  run(['run', 'p2p:prod']);
  if (allFirebase) run(['run', 'install:fb:functions']);
  if (withWorker) {
    run(['run', 'lint:cf']);
    run(['run', 'test:cf']);
  }
  if (!skipTests) run(['run', 'test:compat']);

  // Capture after preparation/validation, then reuse for upload and marking.
  const release = sentryRelease();
  const env = {
    ...process.env,
    SENTRY_RELEASE: release,
    SENTRY_UPLOAD: 'true',
  };
  run(['run', 'build'], env);

  if (withWorker) run(['-C', 'backend/cloudflare', 'run', 'deploy'], env);
  run(
    [
      'exec',
      'firebase',
      'deploy',
      ...(allFirebase ? [] : ['--only', 'hosting']),
    ],
    env,
  );
  console.log(`Firebase deployment succeeded (${release}).`);

  try {
    run(['run', 'sentry:deploy'], env);
  } catch {
    // Firebase already shipped. A marker failure must not invite a redeploy.
    console.warn('Deployment succeeded, but the Sentry deploy marker failed.');
    const quotedRelease = `'${release.replaceAll("'", "'\\''")}'`;
    console.warn(
      `Retry only the marker: SENTRY_RELEASE=${quotedRelease} pnpm run sentry:deploy`,
    );
  }
}

const runDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (runDirectly) {
  const flags = process.argv.slice(2);
  const allowed = new Set(['--with-worker', '--all-firebase', '--skip-tests']);
  if (flags.some((flag) => !allowed.has(flag))) {
    throw new Error(
      'Usage: node scripts/deploy.js [--with-worker] [--all-firebase] [--skip-tests]',
    );
  }
  deploy({
    withWorker: flags.includes('--with-worker'),
    allFirebase: flags.includes('--all-firebase'),
    skipTests: flags.includes('--skip-tests'),
  });
}
