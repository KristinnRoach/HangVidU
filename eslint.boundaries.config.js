import boundaries from 'eslint-plugin-boundaries';
import tseslint from 'typescript-eslint';

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
          ...SHARED_TEMP_FEATURE_EXCEPTIONS.map((featureName) => ({
            type: 'feature',
            captured: { featureName },
          })),
        ],
      },
      message:
        'Shared is pure cross-cutting code — may only import from shared (plus explicit temporary feature exceptions).',
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
            { type: 'feature' },
            { type: 'components' },
            { type: 'infra' },
            { type: 'stores' },
          ],
        },
        message:
          'Features may import from auth, shared, components, infra, stores, or other features.',
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
            { type: 'infra' },
            { type: 'components' },
          ],
        },
        message:
          'Auth may only import from auth, shared, components and infra.',
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
        allow: { to: [{ type: 'infra' }] },
        message:
          'Infra is the external-system bootstrap layer — may only import from infra (vendor SDKs + env config only).',
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
          to: [{ type: 'components' }, { type: 'auth' }, { type: 'shared' }],
        },
        message: 'Components may only import from components, auth and shared',
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
          to: [{ type: 'storage' }, { type: 'shared' }, { type: 'infra' }],
        },
        message:
          'Storage is the persistence layer — may only import from storage, shared, and infra.',
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
            { type: 'storage' },
            { type: 'infra' },
            { type: 'feature' },
          ],
        },
        message:
          'Stores may only import from stores, auth, shared, storage, infra and feature.',
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
          ],
        },
        message:
          'App shell may only import from app, auth, shared, components, and feature.',
      },
    ],
  ),
);

export default [
  {
    files: TS_FILES,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    files: ['src/**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
  },
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
