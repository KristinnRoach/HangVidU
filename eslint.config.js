import boundaries from 'eslint-plugin-boundaries';
import { recommended } from 'eslint-plugin-boundaries/config';

export default [
  {
    ignores: ['dist/**', 'functions/**', 'node_modules/**'],
  },
  {
    files: ['src/**/*.js'],
    plugins: {
      boundaries,
    },
    settings: {
      ...recommended.settings,
      'boundaries/include': ['src/**/*.js'],
      'boundaries/elements': [
        {
          type: 'auth-public',
          mode: 'full',
          pattern: 'src/auth/index.js',
        },
        {
          type: 'contacts-public',
          mode: 'full',
          pattern: 'src/features/contacts/index.js',
        },
        {
          type: 'contacts',
          mode: 'full',
          pattern: 'src/features/contacts/**/*.js',
        },
        {
          type: 'auth',
          mode: 'full',
          pattern: 'src/auth/**/*.js',
        },
        {
          type: 'feature',
          mode: 'full',
          pattern: 'src/features/*/**/*',
          capture: ['featureName'],
        },
        {
          type: 'shared',
          mode: 'full',
          pattern: [
            'src/components/**/*',
            'src/storage/**/*',
            'src/utils/**/*',
            'src/media/**/*',
            'src/media-next/**/*',
            'src/firebase/**/*',
            'src/i18n/**/*',
            'src/pwa/**/*',
            'src/styles/**/*',
            'src/app/**/*',
            'src/main.js',
            'src/elements.js',
            'src/initSentry.js',
          ],
        },
      ],
    },
    rules: {
      ...recommended.rules,
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          rules: [
            {
              from: { type: 'contacts' },
              allow: {
                to: [
                  { type: 'shared' },
                  { type: 'auth' },
                  { type: 'contacts-public' },
                  {
                    type: 'contacts',
                  },
                ],
              },
              message:
                'Contacts modules cannot import directly from sibling features.',
            },
            {
              from: { type: 'feature' },
              disallow: {
                to: [{ type: 'contacts' }],
              },
              message:
                'Import contacts only through src/features/contacts/index.js.',
            },
            {
              from: { type: 'shared' },
              disallow: {
                to: [{ type: 'contacts' }],
              },
              message:
                'Import contacts only through src/features/contacts/index.js.',
            },
            {
              from: { type: 'auth' },
              disallow: {
                to: [{ type: 'contacts' }],
              },
              message:
                'Import contacts only through src/features/contacts/index.js.',
            },
            {
              from: [{ type: 'feature' }, { type: 'shared' }, { type: 'contacts' }],
              disallow: {
                to: [{ type: 'auth' }],
              },
              message: 'Import auth only through src/auth/index.js.',
            },
          ],
        },
      ],
    },
  },
];
