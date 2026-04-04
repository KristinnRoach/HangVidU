import boundaries from 'eslint-plugin-boundaries';

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
          pattern: [
            'src/components/**/*',
            'src/events/**/*',
            'src/firebase/**/*',
            'src/i18n/**/*',
            'src/media/**/*',
            'src/media-next/**/*',
            'src/pwa/**/*',
            'src/storage/**/*',
            'src/styles/**/*',
            'src/utils/**/*',
          ],
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
      ],
    },
  },
  {
    files: [
      'src/components/**/*.js',
      'src/events/**/*.js',
      'src/firebase/**/*.js',
      'src/i18n/**/*.js',
      'src/media/**/*.js',
      'src/media-next/**/*.js',
      'src/pwa/**/*.js',
      'src/storage/**/*.js',
      'src/styles/**/*.js',
      'src/utils/**/*.js',
    ],
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: { type: 'shared' },
              allow: {
                to: [{ type: 'shared' }],
              },
              message: 'Shared code may only import from shared code.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/contacts/*.js', 'src/features/contacts/**/*.js'],
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: { type: 'feature', captured: { featureName: 'contacts' } },
              allow: {
                to: [
                  { type: 'shared' },
                  { type: 'feature', captured: { featureName: 'contacts' } },
                ],
              },
              message:
                'Contacts may only import from shared code or from within the contacts feature.',
            },
          ],
        },
      ],
    },
  },
];
