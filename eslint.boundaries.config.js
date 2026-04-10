import boundaries from 'eslint-plugin-boundaries';
import fs from 'node:fs';

function envEnabled(name, defaultValue) {
  const value = process.env[name];
  if (value == null) return defaultValue;
  return value === '1' || value.toLowerCase() === 'true';
}

function discoverFeatures() {
  const root = 'src/features';
  if (!fs.existsSync(root)) return [];

  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

const ENFORCE_ALL = envEnabled('BOUNDARIES_ENFORCE_ALL', false);
const ALL_FEATURES = discoverFeatures();

// Boundary rollout (keep this short and practical):
// - normal incremental mode: `pnpm lint:boundaries`
// - hotspot scan (all rules + all features): `BOUNDARIES_ENFORCE_ALL=1 pnpm lint:boundaries`
// - single-rule drill-down examples:
//   - `BOUNDARIES_AUTH=1 pnpm lint:boundaries`
//   - `BOUNDARIES_APP=1 pnpm lint:boundaries`
//   - `BOUNDARIES_SETUP=1 pnpm lint:boundaries`
// - specific feature set: `BOUNDARIES_ENFORCED_FEATURES=contacts,messaging pnpm lint:boundaries`
const ENABLE_RULE = {
  shared: envEnabled('BOUNDARIES_SHARED', true),
  auth: envEnabled('BOUNDARIES_AUTH', ENFORCE_ALL),
  app: envEnabled('BOUNDARIES_APP', ENFORCE_ALL),
  setup: envEnabled('BOUNDARIES_SETUP', ENFORCE_ALL),
};

// Incremental feature rollout:
// - default: only what is already enforced + current WIP
// - BOUNDARIES_ENFORCE_ALL=1: all discovered features
// - BOUNDARIES_ENFORCED_FEATURES=a,b,c: explicit list
const ENFORCED_FEATURES = process.env.BOUNDARIES_ENFORCED_FEATURES
  ? process.env.BOUNDARIES_ENFORCED_FEATURES.split(',')
      .map((name) => name.trim())
      .filter(Boolean)
  : ENFORCE_ALL
    ? ALL_FEATURES
    : ['contacts'];
const SHARED_TEMP_FEATURE_EXCEPTIONS = [
  'call',
  'messaging',
  'watch',
  'notifications',
];

const SHARED_GLOBS = [
  'src/elements.js',
  'src/components/**/*.js',
  'src/events/**/*.js',
  'src/vendors/**/*.js',
  'src/i18n/**/*.js',
  'src/media/**/*.js',
  'src/media-next/**/*.js',
  'src/pwa/**/*.js',
  'src/storage/**/*.js',
  'src/styles/**/*.js',
  'src/utils/**/*.js',
];

function dependencyRule(files, rules) {
  return {
    files,
    ignores: ['src/**/*.test.js', 'src/**/*.browser.test.js'],
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules,
        },
      ],
    },
  };
}

const overrides = [];

if (ENABLE_RULE.shared) {
  overrides.push(
    dependencyRule(SHARED_GLOBS, [
      {
        from: { type: 'shared' },
        allow: {
          to: [
            { type: 'shared' },
            ...SHARED_TEMP_FEATURE_EXCEPTIONS.map((featureName) => ({
              type: 'feature',
              captured: { featureName },
            })),
          ],
        },
        message:
          'Shared code may only import shared code (plus explicit temporary feature exceptions).',
      },
    ]),
  );
}

for (const featureName of ENFORCED_FEATURES) {
  overrides.push(
    dependencyRule(
      [
        `src/features/${featureName}/*.js`,
        `src/features/${featureName}/**/*.js`,
      ],
      [
        {
          from: { type: 'feature', captured: { featureName } },
          allow: {
            to: [
              { type: 'auth' },
              { type: 'shared' },
              { type: 'feature', captured: { featureName } },
            ],
          },
          message: `${featureName} may only import from auth, shared, or itself.`,
        },
      ],
    ),
  );
}

if (ENABLE_RULE.auth) {
  overrides.push(
    dependencyRule(
      ['src/auth/*.js', 'src/auth/**/*.js'],
      [
        {
          from: { type: 'auth' },
          allow: {
            to: [{ type: 'auth' }, { type: 'shared' }],
          },
          message: 'Auth may only import from auth and shared.',
        },
      ],
    ),
  );
}

if (ENABLE_RULE.app) {
  overrides.push(
    dependencyRule(
      ['src/app/*.js', 'src/app/**/*.js'],
      [
        {
          from: { type: 'app' },
          allow: {
            to: [
              { type: 'app' },
              { type: 'auth' },
              { type: 'feature' },
              { type: 'shared' },
            ],
          },
          message: 'App may only import from app, auth, feature, and shared.',
        },
      ],
    ),
  );
}

if (ENABLE_RULE.setup) {
  overrides.push(
    dependencyRule(
      ['src/setup/*.js', 'src/setup/**/*.js'],
      [
        {
          from: { type: 'setup' },
          allow: {
            to: [
              { type: 'setup' },
              { type: 'app' },
              { type: 'auth' },
              { type: 'feature' },
              { type: 'shared' },
            ],
          },
          message:
            'Setup may only import from setup, app, auth, feature, and shared.',
        },
      ],
    ),
  );
}

export default [
  {
    files: ['src/**/*.js'],
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        {
          type: 'shared',
          mode: 'full',
          pattern: SHARED_GLOBS,
        },
        {
          type: 'feature',
          mode: 'full',
          pattern: ['src/features/*/*.js', 'src/features/*/**/*.js'],
          capture: ['featureName'],
        },
        {
          type: 'auth',
          mode: 'full',
          pattern: ['src/auth/*.js', 'src/auth/**/*.js'],
        },
        {
          type: 'app',
          mode: 'full',
          pattern: ['src/app/*.js', 'src/app/**/*.js'],
        },
        {
          type: 'setup',
          mode: 'full',
          pattern: ['src/setup/*.js', 'src/setup/**/*.js'],
        },
      ],
    },
  },
  ...overrides,
];
