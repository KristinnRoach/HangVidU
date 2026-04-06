import boundaries from 'eslint-plugin-boundaries';

// Boundary model (at a glance):
// 1) Classify files into element types via `settings.boundaries/elements`.
// 2) Enforce import rules with `boundaries/dependencies`.
// 3) Use `default: 'disallow'` and then explicitly list allowed targets.
export default [
  {
    // Register element types for all source files.
    files: ['src/**/*.js'],
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        {
          // "shared" is framework/infrastructure code reused across modules.
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
          // Every file under `src/features/<name>/...` is a `feature`.
          // `capture.featureName` stores `<name>` so rules can target one feature.
          type: 'feature',
          mode: 'full',
          pattern: ['src/features/*/*.js', 'src/features/*/**/*.js'],
          capture: ['featureName'],
        },
        {
          // Auth is intentionally modeled as its own upstream module.
          type: 'auth',
          mode: 'full',
          pattern: ['src/auth/*.js', 'src/auth/**/*.js'],
        },
        {
          // App composition/wiring layer.
          type: 'app',
          mode: 'full',
          pattern: ['src/app/*.js', 'src/app/**/*.js'],
        },
      ],
    },
  },
  {
    // Shared-layer enforcement:
    // shared -> shared only (no imports into features/auth/app).
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
                to: [
                  { type: 'shared' },

                  // TODO: Remove / disallow temporary shared -> feature exceptions.
                  // Keep these explicit so we can remove them one-by-one during migration.
                  { type: 'feature', captured: { featureName: 'messaging' } },
                  { type: 'feature', captured: { featureName: 'watch' } },
                  {
                    type: 'feature',
                    captured: { featureName: 'notifications' },
                  },
                  { type: 'feature', captured: { featureName: 'call' } },
                ],
              },
              message:
                'Shared code may only import shared code (plus temporary, explicitly-listed feature exceptions).',
            },
          ],
        },
      ],
    },
  },
  {
    // Incremental feature rollout:
    // add feature modules one at a time to "from" and "allow.to" lists.
    files: ['src/features/contacts/*.js', 'src/features/contacts/**/*.js'],
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              // Syntax note:
              // `from.captured.featureName` matches the importing feature name.
              // `to.captured.featureName` lets us allow "same-feature only" imports.
              from: { type: 'feature', captured: { featureName: 'contacts' } },
              allow: {
                to: [
                  { type: 'auth' },
                  { type: 'shared' },
                  { type: 'feature', captured: { featureName: 'contacts' } },

                  // TODO: Remove / disallow temporary contacts -> feature exceptions.
                  // Remove one by one as each dependency is migrated.
                  // {
                  //   type: 'feature',
                  //   captured: { featureName: 'notifications' },
                  // },
                  { type: 'feature', captured: { featureName: 'account' } },
                ],
              },
              message:
                'Contacts may only import from auth/shared/contacts (plus temporary, explicitly-listed feature exceptions).',
            },
          ],
        },
      ],
    },
  },
];
