// vite.config.js

import { defineConfig, lazyPlugins } from 'vite-plus';
import path from 'path';
import { pwaPlugin } from './vite.pwa.js';
import mkcert from 'vite-plugin-mkcert';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { headSha, sentryRelease } from './scripts/sentry-release.js';
import solid from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';
import boundariesConfig from './eslint.boundaries.config.js';

// Architecture boundaries: eslint.boundaries.config.js is the single source
// (it also feeds the boundary playground). Derive the oxlint overrides and
// settings from it instead of duplicating them here.
const boundariesSettings = boundariesConfig.find((c) => c.settings)?.settings;
const boundariesOverrides = boundariesConfig
  .filter((c) => c.rules?.['boundaries/dependencies'])
  .map(({ files, rules }) => ({
    files,
    rules,
    jsPlugins: ['eslint-plugin-boundaries'],
  }));

const publicModuleImportPatterns = [
  {
    group: [
      '@features/*/**',
      '@auth/**',
      '@push/**',
      '@pwa/**',
      '@realtime/**',
      '@storage/contacts/**',
      '@storage/files/**',
      '@storage/user/**',
      '**/features/*/**',
      '**/auth/**',
      '**/push/**',
      '!./push/sw/index.js',
      '**/pwa/**',
      '**/realtime/**',
      '**/storage/contacts/**',
      '**/storage/files/**',
      '**/storage/user/**',
    ],
    message: 'Import from the module index instead of an internal file.',
  },
];

export default defineConfig(({ mode }) => {
  // Firebase Hosting is the only production target.
  const basePath = '/';

  return {
    staged: {
      '*': 'vp check --fix',
    },
    fmt: {
      singleQuote: true,
      jsxSingleQuote: true,
      printWidth: 80,
    },
    lint: {
      plugins: ['oxc', 'typescript', 'unicorn', 'react', 'import'],

      categories: {
        correctness: 'error',
      },
      env: {
        builtin: true,
      },
      overrides: [
        ...boundariesOverrides,
        {
          // STATE_RULES.md: *-state.js modules are module-private. A later
          // override resets this inside src/auth/** and src/features/contacts/**.
          files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
          rules: {
            'import/no-cycle': 'error', // Use ['error', { ignoreTypes: false }] if want to include type imports in cyclical check

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
                  ...publicModuleImportPatterns,
                  {
                    group: ['firebase/auth/*'],
                    message:
                      'Import from src/auth/adapters/firebase-auth-adapter.js instead of firebase/auth directly.',
                  },
                  {
                    group: ['**/auth-state', '**/auth-state.js'],
                    message:
                      'auth-state.js is private to src/auth/. Import read-only getters from src/auth/index.js and subscribe to evt:auth:state:changed. See docs/architecture/STATE_RULES.md.',
                  },
                  {
                    group: ['**/contacts-state', '**/contacts-state.js'],
                    message:
                      'contacts-state.js is private to src/features/contacts/. Import read-only getters from src/features/contacts/index.js and subscribe to evt:contacts:state:changed. See docs/architecture/STATE_RULES.md.',
                  },
                ],
              },
            ],
          },
        },
        {
          // Inside their own module the *-state.js files are fair game. Keep
          // the public-module and Firebase restrictions from the base rule.
          files: ['src/auth/**', 'src/features/contacts/**'],
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
                  ...publicModuleImportPatterns,
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
        {
          files: ['src/components/**/*.jsx', 'src/components/**/*.tsx'],
          rules: {
            'no-restricted-imports': [
              'error',
              {
                patterns: [
                  ...publicModuleImportPatterns,
                  {
                    group: ['**/shared/i18n', '**/shared/i18n/index.js'],
                    importNames: [
                      't',
                      'getLocale',
                      'setLocale',
                      'onLocaleChange',
                    ],
                    message:
                      'In Solid components use `useI18n()` from src/shared/i18n/. Bare t/getLocale/setLocale/onLocaleChange imports couple components to the current impl.',
                  },
                ],
              },
            ],
          },
        },
        {
          // Solid idioms: `let el;` ref variables and bare signal reads in
          // createEffect for dependency tracking.
          files: ['src/**/*.jsx', 'src/**/*.tsx'],
          rules: {
            'no-unassigned-vars': 'off',
            'no-unused-expressions': 'off',
          },
        },
        {
          // unbound-method is noise on vitest mock assertions.
          files: ['**/*.test.*', '**/__tests__/**', 'tests/**'],
          rules: {
            'typescript/unbound-method': 'off',
          },
        },
      ],
      options: {
        typeAware: true,
        typeCheck: true,
      },
      // Worker package type-checks with its own tsconfig (`pnpm lint:cf`);
      // the root type-aware pass can't resolve cloudflare:test there.
      ignorePatterns: ['backend/**'],
      settings: boundariesSettings,
      jsPlugins: [
        {
          name: 'vite-plus',
          specifier: 'vite-plus/oxlint-plugin',
        },
        {
          name: 'local',
          specifier: './eslint-plugin-local.js',
        },
      ],
      rules: {
        'vite-plus/prefer-vite-plus-imports': 'error',
        'local/event-name-format': 'error',
        // Solid JSX has no key prop; the React rule is noise here.
        'react/jsx-key': 'off',
      },
    },
    base: basePath,

    resolve: {
      tsconfigPaths: true,
      dedupe: ['solid-js'],
    },

    build: {
      // Needed so Sentry can map minified frames back to source. "hidden"
      // emits the .map files without the sourceMappingURL comment, so
      // browsers never fetch them; sentryVitePlugin deletes them from dist
      // after upload so they are not served at all.
      sourcemap: 'hidden',
      // AC3 support is intentionally emitted as a large, on-demand chunk.
      // Keep warnings focused on regressions beyond the current expected ceiling.
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
      },
    },

    plugins: lazyPlugins(() => [
      ...(mode === 'development'
        ? [mkcert({ savePath: path.resolve(__dirname, '.vite-plugin-mkcert') })]
        : []),
      solid(),
      tailwindcss(),
      pwaPlugin(basePath),
      // Uploads source maps so production stack traces show real files and
      // lines. Reads SENTRY_AUTH_TOKEN from .env.sentry-build-plugin
      // (gitignored); without it the plugin logs a warning and skips upload.
      // The token embeds its own region URL, so no `url` option is needed.
      ...(mode === 'production'
        ? [
            sentryVitePlugin({
              org: 'kristinn-roach',
              project: 'hangvidu',
              // Named explicitly so `pnpm sentry:deploy` can mark this exact
              // release as deployed. Both sides derive it from
              // scripts/sentry-release.js.
              release: {
                name: sentryRelease(),
                // Pin the repo instead of letting --auto guess. Auto resolves
                // the git remote *name*, which registered a generic repo
                // called "origin" in Sentry and attached every commit to it.
                // Suspect commits resolve blame through the GitHub-integrated
                // repo, which was left with no commits at all.
                setCommits: {
                  repo: 'KristinnRoach/HangVidU',
                  commit: headSha(),
                  // Sentry's mirror of the repo can lag a fresh push. Without
                  // these, set-commits errors out on a commit it cannot see
                  // yet; with them it degrades to a warning.
                  ignoreMissing: true,
                  ignoreEmpty: true,
                },
              },
              sourcemaps: { filesToDeleteAfterUpload: ['./dist/**/*.map'] },
            }),
          ]
        : []),
    ]),
    server: {
      port: 5173,
      strictPort: true,
      https: true,
      host: true,
      allowedHosts: ['dev.hangvidu.com'],

      proxy: {
        // Proxy Firebase Auth handler and init.json requests
        '/__/auth': {
          target: 'https://vidu-aae11.firebaseapp.com', // Your project's default auth domain
          changeOrigin: true,
          rewrite: (path) => path, // Don't rewrite the path
        },
        '/__/firebase/init.json': {
          target: 'https://vidu-aae11.firebaseapp.com', // Your project's default auth domain
          changeOrigin: true,
          rewrite: (path) => path, // Don't rewrite the path
        },
      },
    },

    preview: {
      // Distinct from dev's 5173 so preview's service worker / precache never
      // lands on the dev origin and serves stale code into `pnpm dev`.
      // Tunnel ingress (~/.cloudflared/config.yml) points here.
      port: 4173,
      strictPort: true,
      host: true,
      allowedHosts: ['dev.hangvidu.com'],
    },
  };
});
