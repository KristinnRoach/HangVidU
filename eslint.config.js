import boundariesConfig from './eslint.boundaries.config.js';

const appConfig = [
  {
    files: ['src/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'firebase/auth',
              message:
                'Import from src/auth/adapters/firebase-auth-adapter.js instead of firebase/auth directly.',
            },
          ],
          patterns: [
            {
              group: ['firebase/auth/*'],
              message:
                'Import from src/auth/adapters/firebase-auth-adapter.js instead of firebase/auth directly.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/auth/adapters/firebase-auth-adapter.js'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];

export default [...boundariesConfig, ...appConfig];
