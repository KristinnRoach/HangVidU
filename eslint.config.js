import boundaries from 'eslint-plugin-boundaries';
import { recommended } from 'eslint-plugin-boundaries/config';

export default [
  {
    ignores: ['dist/**', 'functions/**', 'node_modules/**'],
  },
  {
    files: ['src/features/**/*.js'],
    plugins: {
      boundaries,
    },
    settings: {
      ...recommended.settings,
      'boundaries/include': ['src/**/*.js'],
      'boundaries/elements': [
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
          default: 'disallow',
          message:
            'Feature modules cannot import directly from sibling feature modules.',
          rules: [
            {
              from: { type: 'feature' },
              allow: {
                to: [
                  { type: 'shared' },
                  {
                    type: 'feature',
                    captured: {
                      featureName: '{{from.captured.featureName}}',
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  },
];
