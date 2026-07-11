// vite.config.js

import { defineConfig, lazyPlugins } from 'vite-plus';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
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
          // Inside their own module the *-state.js files are fair game;
          // only the firebase/auth restriction still applies here.
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
      VitePWA({
        includeAssets: ['index.html', 'favicon.ico'],
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.js',
        injectManifest: {
          // Don't include the large EAC3 WASM modules in the precache manifest; they'll be loaded on demand.
          globIgnores: ['**/assets/mediabunny-ac3-*.*'],
        },
        devOptions: {
          enabled: false, // injectManifest with ES modules doesn't work in dev
          type: 'module',
        },
        workbox: {
          cleanupOutdatedCaches: true,
          navigateFallback: `${basePath}index.html`, // fallback for SPA navigation (accounts for base path)
          navigateFallbackDenylist: [
            new RegExp(`^${basePath.replaceAll('/', '\\/')}index\\.html$`), // Don't fallback for index.html itself (prevents cache error)
            /^\/__\//, // Exclude Firebase auth handler paths (/__/auth/handler, etc.)
            /^\/auth\//, // Exclude any other auth-related paths
          ],
        },

        manifest: {
          name: 'HangVidU',
          short_name: 'HangVidU',
          description: 'Peer-to-peer video chat with watch-together mode',

          start_url: basePath,
          scope: basePath,

          display: 'standalone',
          theme_color: '#82b5ecff',
          background_color: '#1a1a1a',

          icons: [
            {
              src: `${basePath}icons/play-arrows-v1/icon-192.png`,
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: `${basePath}icons/play-arrows-v1/icon-512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: `${basePath}icons/play-arrows-v1/icon-512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          screenshots: [
            {
              src: `${basePath}screenshot-1280x800.webp`,
              sizes: '1280x800',
              form_factor: 'wide',
              type: 'image/webp',
            },
            {
              src: `${basePath}screenshot-720x1444.webp`,
              sizes: '720x1444',
              form_factor: 'narrow',
              type: 'image/webp',
            },
          ],
        },
      }),
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
