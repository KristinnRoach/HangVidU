import boundaries from 'eslint-plugin-boundaries';
import tseslint from 'typescript-eslint';

const JS_FILES = ['src/**/*.js', 'src/**/*.jsx'];
const TS_FILES = ['src/**/*.ts', 'src/**/*.tsx'];
const SOURCE_FILES = [...JS_FILES, ...TS_FILES];

const SHARED_TEMP_FEATURE_EXCEPTIONS = ['watch', 'notifications', 'call'];

const SHARED_GLOBS = [
  'src/elements.js',
  'src/shared/components/**/*.{js,jsx,ts,tsx}',
  'src/shared/events/**/*.{js,jsx,ts,tsx}',
  'src/shared/vendors/**/*.{js,jsx,ts,tsx}',
  'src/shared/i18n/**/*.{js,jsx,ts,tsx}',
  'src/shared/media/**/*.{js,jsx,ts,tsx}',
  'src/shared/media-next/**/*.{js,jsx,ts,tsx}',
  'src/shared/pwa/**/*.{js,jsx,ts,tsx}',
  'src/shared/storage/**/*.{js,jsx,ts,tsx}',
  'src/shared/styles/**/*.{js,jsx,ts,tsx}',
  'src/shared/utils/**/*.{js,jsx,ts,tsx}',
];

function dependencyRule(files, rules) {
  return {
    files,
    ignores: [
      'src/**/*.test.js',
      'src/**/*.test.jsx',
      'src/**/*.test.ts',
      'src/**/*.test.tsx',
      'src/**/*.browser.test.js',
      'src/**/*.browser.test.jsx',
      'src/**/*.browser.test.ts',
      'src/**/*.browser.test.tsx',
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
          { type: 'auth' },
          ...SHARED_TEMP_FEATURE_EXCEPTIONS.map((featureName) => ({
            type: 'feature',
            captured: { featureName },
          })),
        ],
      },
      message:
        'Shared code may import shared and auth (plus explicit temporary feature exceptions).',
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
            { type: 'contacts' },
          ],
        },
        message:
          'Features may import from auth, shared, components, contacts, or other features.',
      },
    ],
  ),
);

overrides.push(
  dependencyRule(
    ['src/contacts/*.{js,jsx,ts,tsx}', 'src/contacts/**/*.{js,jsx,ts,tsx}'],
    [
      {
        from: { type: 'contacts' },
        allow: {
          to: [
            { type: 'auth' },
            { type: 'shared' },
            { type: 'components' },
            { type: 'contacts' },
            { type: 'feature' },
          ],
        },
        message:
          'Contacts may import from auth, shared, components, features, or itself.',
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
          to: [{ type: 'auth' }, { type: 'shared' }],
        },
        message: 'Auth may only import from auth and shared.',
      },
    ],
  ),
);

overrides.push(
  dependencyRule(
    ['src/setup/*.{js,jsx,ts,tsx}', 'src/setup/**/*.{js,jsx,ts,tsx}'],
    [
      {
        from: { type: 'setup' },
        allow: {
          to: [
            { type: 'setup' },
            { type: 'auth' },
            { type: 'feature' },
            { type: 'shared' },
            { type: 'components' },
            { type: 'contacts' },
          ],
        },
        message:
          'Setup may only import from setup, auth, feature, shared, components, and contacts.',
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
            { type: 'feature' },
            { type: 'shared' },
            { type: 'contacts' },
          ],
        },
        message:
          'Components may only import from components, auth, feature, shared, and contacts.',
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
        allow: { to: [{ type: 'storage' }, { type: 'shared' }] },
        message:
          'Storage is the persistence layer — may only import from storage and shared.',
      },
    ],
  ),
);

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
          ],
        },
        message:
          'Stores may only import from stores, auth, shared, and storage — they sit below features/components/contacts/setup.',
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
            'src/features/*/*.js',
            'src/features/*/**/*.js',
            'src/features/*/*.jsx',
            'src/features/*/**/*.jsx',
            'src/features/*/*.ts',
            'src/features/*/**/*.ts',
            'src/features/*/*.tsx',
            'src/features/*/**/*.tsx',
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
          type: 'setup',
          mode: 'full',
          pattern: [
            'src/setup/*.{js,jsx,ts,tsx}',
            'src/setup/**/*.{js,jsx,ts,tsx}',
          ],
        },
        {
          type: 'components',
          mode: 'full',
          pattern: [
            'src/components/*.js',
            'src/components/**/*.js',
            'src/components/*.jsx',
            'src/components/**/*.jsx',
            'src/components/*.ts',
            'src/components/**/*.ts',
            'src/components/*.tsx',
            'src/components/**/*.tsx',
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
          type: 'contacts',
          mode: 'full',
          pattern: [
            'src/contacts/*.{js,jsx,ts,tsx}',
            'src/contacts/**/*.{js,jsx,ts,tsx}',
          ],
        },
      ],
    },
  },
  ...overrides,
];
