import boundaries from 'eslint-plugin-boundaries';

const SHARED_TEMP_FEATURE_EXCEPTIONS = ['watch', 'notifications', 'call'];

const SHARED_GLOBS = [
  'src/elements.js',
  'src/shared/components/**/*.js',
  'src/shared/events/**/*.js',
  'src/shared/vendors/**/*.js',
  'src/shared/i18n/**/*.js',
  'src/shared/media/**/*.js',
  'src/shared/media-next/**/*.js',
  'src/shared/pwa/**/*.js',
  'src/shared/storage/**/*.js',
  'src/shared/styles/**/*.js',
  'src/shared/utils/**/*.js',
];

function dependencyRule(files, rules) {
  return {
    files,
    ignores: [
      'src/**/*.test.js',
      'src/**/*.test.jsx',
      'src/**/*.browser.test.js',
      'src/**/*.browser.test.jsx',
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
    [
      'src/features/*/*.js',
      'src/features/*/**/*.js',
      'src/features/*/*.jsx',
      'src/features/*/**/*.jsx',
    ],
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
    ['src/contacts/*.js', 'src/contacts/**/*.js'],
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

overrides.push(
  dependencyRule(
    [
      'src/setup/*.js',
      'src/setup/**/*.js',
      'src/setup/*.jsx',
      'src/setup/**/*.jsx',
    ],
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
    [
      'src/components/*.js',
      'src/components/**/*.js',
      'src/components/*.jsx',
      'src/components/**/*.jsx',
    ],
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

export default [
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
    files: ['src/**/*.js', 'src/**/*.jsx'],
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
          ],
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
        {
          type: 'components',
          mode: 'full',
          pattern: [
            'src/components/*.js',
            'src/components/**/*.js',
            'src/components/*.jsx',
            'src/components/**/*.jsx',
          ],
        },
        {
          type: 'storage',
          mode: 'full',
          pattern: ['src/storage/*.js', 'src/storage/**/*.js'],
        },
        {
          type: 'contacts',
          mode: 'full',
          pattern: ['src/contacts/*.js', 'src/contacts/**/*.js'],
        },
      ],
    },
  },
  ...overrides,
];
