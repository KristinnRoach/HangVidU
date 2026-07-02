// Single source of truth for architecture boundaries. vite.config.js derives
// the oxlint `lint` overrides/settings from this file, so editing rules here
// updates `vp lint` directly (no sync step).
// The visualizer (playgrounds/boundary-rules.html) reads this config live for
// element types + allow-rules, but the underlying import data is a generated
// snapshot. After changing elements, rules, or the tsconfig path aliases,
// re-run `pnpm play:boundaries:scan` to refresh playgrounds/boundary-imports.json
// (the scanner playgrounds/build-import-graph.mjs resolves those same aliases).

import boundaries from 'eslint-plugin-boundaries';

const JS_FILES = ['src/**/*.js', 'src/**/*.jsx'];
const TS_FILES = ['src/**/*.ts', 'src/**/*.tsx'];
const SOURCE_FILES = [...JS_FILES, ...TS_FILES];

const SHARED_TEMP_FEATURE_EXCEPTIONS = [];

const SHARED_GLOBS = [
  'src/shared/*.{js,jsx,ts,tsx}',
  'src/shared/events/**/*.{js,jsx,ts,tsx}',
  'src/shared/i18n/**/*.{js,jsx,ts,tsx}',
  'src/shared/utils/**/*.{js,jsx,ts,tsx}',
];

// Bottom layer: framework-agnostic primitives with zero app knowledge.
// Importable by any layer; may only import from lib itself.
const LIB_GLOBS = ['src/lib/**/*.{js,jsx,ts,tsx}'];

function dependencyRule(files, rules) {
  return {
    files,
    ignores: [
      'src/**/*.test.{js,jsx,ts,tsx}',
      'src/**/*.browser.test.{js,jsx,ts,tsx}',
    ],
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

overrides.push(
  dependencyRule(SHARED_GLOBS, [
    {
      from: { type: 'shared' },
      allow: {
        to: [
          { type: 'shared' },
          { type: 'lib' },
          ...SHARED_TEMP_FEATURE_EXCEPTIONS.map((featureName) => ({
            type: 'feature',
            captured: { featureName },
          })),
        ],
      },
      message:
        'Shared is pure cross-cutting code — may only import from shared and lib (plus explicit temporary feature exceptions).',
    },
  ]),
);

overrides.push(
  dependencyRule(
    ['src/features/*/*.{js,jsx,ts,tsx}', 'src/features/*/**/*.{js,jsx,ts,tsx}'],
    [
      {
        from: { type: 'feature' },
        allow: {
          to: [
            { type: 'auth' },
            { type: 'shared' },
            { type: 'lib' },
            { type: 'feature' },
            { type: 'components' },
            { type: 'infra' },
            { type: 'stores' },
            { type: 'realtime' },
          ],
        },
        message:
          'Features may import from auth, shared, lib, components, infra, stores, realtime, or other features.',
      },
    ],
  ),
);

overrides.push(
  dependencyRule(
    ['src/auth/*.{js,jsx,ts,tsx}', 'src/auth/**/*.{js,jsx,ts,tsx}'],
    [
      {
        from: { type: 'auth' },
        allow: {
          to: [
            { type: 'auth' },
            { type: 'shared' },
            { type: 'lib' },
            { type: 'infra' },
            { type: 'components' },
          ],
        },
        message:
          'Auth may only import from auth, shared, lib, components and infra.',
      },
    ],
  ),
);

// TODO: Move rtdb to storage? Is this worth keeping?
overrides.push(
  dependencyRule(
    ['src/infra/*.{js,jsx,ts,tsx}', 'src/infra/**/*.{js,jsx,ts,tsx}'],
    [
      {
        from: { type: 'infra' },
        allow: { to: [{ type: 'infra' }, { type: 'lib' }] },
        message:
          'Infra is the external-system bootstrap layer — may only import from infra and lib (vendor SDKs + env config + primitives).',
      },
    ],
  ),
);

overrides.push(
  dependencyRule(
    ['src/components/*.{js,jsx,ts,tsx}', 'src/components/**/*.{js,jsx,ts,tsx}'],
    [
      {
        from: { type: 'components' },
        allow: {
          to: [
            { type: 'components' },
            { type: 'auth' },
            { type: 'shared' },
            { type: 'lib' },
          ],
        },
        message:
          'Components may only import from components, auth, shared and lib',
      },
    ],
  ),
);

overrides.push(
  dependencyRule(
    ['src/storage/*.{js,jsx,ts,tsx}', 'src/storage/**/*.{js,jsx,ts,tsx}'],
    [
      {
        from: { type: 'storage' },
        allow: {
          to: [
            { type: 'storage' },
            { type: 'shared' },
            { type: 'lib' },
            { type: 'infra' },
          ],
        },
        message:
          'Storage is the persistence layer — may only import from storage, shared, lib, and infra.',
      },
    ],
  ),
);

overrides.push(
  dependencyRule(
    ['src/realtime/*.{js,jsx,ts,tsx}', 'src/realtime/**/*.{js,jsx,ts,tsx}'],
    [
      {
        from: { type: 'realtime' },
        allow: {
          to: [
            { type: 'realtime' },
            { type: 'shared' },
            { type: 'lib' },
            { type: 'infra' },
            { type: 'auth' },
          ],
        },
        message:
          'Realtime is the ephemeral-coordination layer (sibling of storage) — may only import from realtime, shared, lib, infra, and auth.',
      },
    ],
  ),
);

// TODO: If keeping stores as solid state for mirroring storage, keep it clean and remove this (move messaging and any feature storage accessors here)
overrides.push(
  dependencyRule(
    ['src/stores/*.{js,jsx,ts,tsx}', 'src/stores/**/*.{js,jsx,ts,tsx}'],
    [
      {
        from: { type: 'stores' },
        allow: {
          to: [
            { type: 'stores' },
            { type: 'auth' },
            { type: 'shared' },
            { type: 'lib' },
            { type: 'storage' },
            { type: 'realtime' },
            { type: 'infra' },
            { type: 'feature' },
          ],
        },
        message:
          'Stores may only import from stores, auth, shared, lib, storage, realtime, infra and feature.',
      },
    ],
  ),
);

overrides.push(
  dependencyRule(
    ['src/app/*.{js,jsx,ts,tsx}', 'src/app/**/*.{js,jsx,ts,tsx}'],
    [
      {
        from: { type: 'app' },
        allow: {
          to: [
            { type: 'app' },
            { type: 'auth' },
            { type: 'stores' },
            { type: 'feature' },
            { type: 'components' },
            { type: 'shared' },
            { type: 'lib' },
          ],
        },
        message:
          'App shell may only import from app, auth, shared, lib, components, and feature.',
      },
    ],
  ),
);

overrides.push(
  dependencyRule(LIB_GLOBS, [
    {
      from: { type: 'lib' },
      allow: { to: [{ type: 'lib' }] },
      message:
        'Lib is the bottom layer of framework-agnostic primitives — may only import from lib (no app knowledge).',
    },
  ]),
);

export default [
  {
    files: SOURCE_FILES,
    plugins: {
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true },
      },
      'boundaries/include': ['src/**/*.{js,jsx,ts,tsx}'],
      'boundaries/elements': [
        {
          type: 'shared',
          mode: 'full',
          pattern: SHARED_GLOBS,
        },
        {
          type: 'lib',
          mode: 'full',
          pattern: LIB_GLOBS,
        },
        {
          type: 'feature',
          mode: 'full',
          pattern: [
            'src/features/*/*.{js,jsx,ts,tsx}',
            'src/features/*/**/*.{js,jsx,ts,tsx}',
          ],
          capture: ['featureName'],
        },
        {
          type: 'auth',
          mode: 'full',
          pattern: [
            'src/auth/*.{js,jsx,ts,tsx}',
            'src/auth/**/*.{js,jsx,ts,tsx}',
          ],
        },
        {
          type: 'components',
          mode: 'full',
          pattern: [
            'src/components/*.{js,jsx,ts,tsx}',
            'src/components/**/*.{js,jsx,ts,tsx}',
          ],
        },
        {
          type: 'storage',
          mode: 'full',
          pattern: [
            'src/storage/*.{js,jsx,ts,tsx}',
            'src/storage/**/*.{js,jsx,ts,tsx}',
          ],
        },
        {
          type: 'realtime',
          mode: 'full',
          pattern: [
            'src/realtime/*.{js,jsx,ts,tsx}',
            'src/realtime/**/*.{js,jsx,ts,tsx}',
          ],
        },
        {
          type: 'stores',
          mode: 'full',
          pattern: [
            'src/stores/*.{js,jsx,ts,tsx}',
            'src/stores/**/*.{js,jsx,ts,tsx}',
          ],
        },
        {
          type: 'infra',
          mode: 'full',
          pattern: [
            'src/infra/*.{js,jsx,ts,tsx}',
            'src/infra/**/*.{js,jsx,ts,tsx}',
          ],
        },
        {
          type: 'app',
          mode: 'full',
          pattern: [
            'src/app/*.{js,jsx,ts,tsx}',
            'src/app/**/*.{js,jsx,ts,tsx}',
          ],
        },
      ],
    },
  },
  ...overrides,
];
