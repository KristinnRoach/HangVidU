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
const ALL_FEATURES_SET = new Set(ALL_FEATURES);

// Incremental feature rollout:
// - default: only what is already enforced + current WIP
// - BOUNDARIES_ENFORCE_ALL=1: all discovered features
// - BOUNDARIES_ENFORCED_FEATURES=a,b,c: explicit list
const requestedFeatures = process.env.BOUNDARIES_ENFORCED_FEATURES
  ? process.env.BOUNDARIES_ENFORCED_FEATURES.split(',')
      .map((name) => name.trim())
      .filter(Boolean)
  : null;

if (requestedFeatures) {
  const unknownFeatures = requestedFeatures.filter(
    (featureName) => !ALL_FEATURES_SET.has(featureName),
  );
  if (unknownFeatures.length > 0) {
    throw new Error(
      `Unknown BOUNDARIES_ENFORCED_FEATURES: ${unknownFeatures.join(', ')}`,
    );
  }
}

// ____________________________________

// Boundary rollout (incremental rules — modify freely):
// - normal incremental mode: `pnpm lint:boundaries`
// - hotspot scan (all rules + all features): `BOUNDARIES_ENFORCE_ALL=1 pnpm lint:boundaries`
// - single-rule drill-down examples:
//   - `BOUNDARIES_AUTH=1 pnpm lint:boundaries`
//   - `BOUNDARIES_SETUP=1 pnpm lint:boundaries`
// - specific feature set: `BOUNDARIES_ENFORCED_FEATURES=contacts,messaging pnpm lint:boundaries`

const ENABLE_RULE = {
  shared: envEnabled('BOUNDARIES_SHARED', true),
  auth: envEnabled('BOUNDARIES_AUTH', true),
  setup: envEnabled('BOUNDARIES_SETUP', ENFORCE_ALL),
};

// enforced features - add one at a time until all are included
const ENFORCED_FEATURES = requestedFeatures
  ? requestedFeatures
  : ENFORCE_ALL
    ? ALL_FEATURES
    : ['contacts', 'push-notifications', 'messaging'];

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
              { type: 'auth' },
              { type: 'feature' },
              { type: 'shared' },
            ],
          },
          message:
            'Setup may only import from setup, auth, feature, and shared.',
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
          type: 'setup',
          mode: 'full',
          pattern: ['src/setup/*.js', 'src/setup/**/*.js'],
        },
      ],
    },
  },
  ...overrides,
];
