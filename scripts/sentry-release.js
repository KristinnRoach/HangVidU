#!/usr/bin/env node
// Single source of truth for the Sentry release name.
//
// vite.config.js imports sentryRelease() to name the release it creates and to
// stamp the version into the bundle; `--deploy` marks that same release as
// deployed after firebase deploy succeeds. If the two ever derive the name
// differently, Sentry fails silently: a release with no events, events with no
// release, and no suspect commits on either.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function headSha(short = false) {
  return execFileSync(
    'git',
    ['rev-parse', ...(short ? ['--short'] : []), 'HEAD'],
    { encoding: 'utf8' },
  ).trim();
}

export function sentryRelease() {
  const pkg = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
  );
  return `${pkg.name}@${pkg.version}+${headSha(true)}`;
}

const runDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (runDirectly) {
  const version = sentryRelease();

  if (!process.argv.includes('--deploy')) {
    console.log(version);
  } else if (!process.env.SENTRY_AUTH_TOKEN) {
    // Same posture as sentryVitePlugin: no token means skip the Sentry work,
    // never fail a deploy that already shipped.
    console.warn(
      'SENTRY_AUTH_TOKEN not set; skipping Sentry deploy marker for ' + version,
    );
  } else {
    execFileSync(
      'sentry-cli',
      ['releases', 'deploys', version, 'new', '-e', 'production'],
      {
        stdio: 'inherit',
        env: {
          ...process.env,
          SENTRY_ORG: 'kristinn-roach',
          SENTRY_PROJECT: 'hangvidu',
        },
      },
    );
  }
}
