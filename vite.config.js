// vite.config.js

import { defineConfig, lazyPlugins } from 'vite-plus';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
  // Firebase Hosting is the only production target.
  const basePath = '/';

  return {
    staged: {
      '*': 'vp check --fix',
    },
    fmt: {
      singleQuote: true,
      printWidth: 80,
    },
    lint: {
      plugins: ['oxc', 'typescript', 'unicorn', 'react'],
      categories: {
        correctness: 'warn',
      },
      env: {
        builtin: true,
      },
      overrides: [
        {
          files: [
            'src/shared/*.{js,jsx,ts,tsx}',
            'src/shared/events/**/*.{js,jsx,ts,tsx}',
            'src/shared/i18n/**/*.{js,jsx,ts,tsx}',
            'src/shared/utils/**/*.{js,jsx,ts,tsx}',
          ],
          rules: {
            'boundaries/dependencies': [
              'error',
              {
                default: 'disallow',
                rules: [
                  {
                    from: {
                      type: 'shared',
                    },
                    allow: {
                      to: [
                        {
                          type: 'shared',
                        },
                        {
                          type: 'lib',
                        },
                      ],
                    },
                    message:
                      'Shared is pure cross-cutting code — may only import from shared and lib (plus explicit temporary feature exceptions).',
                  },
                ],
              },
            ],
          },
          jsPlugins: ['eslint-plugin-boundaries'],
        },
        {
          files: [
            'src/features/*/*.{js,jsx,ts,tsx}',
            'src/features/*/**/*.{js,jsx,ts,tsx}',
          ],
          rules: {
            'boundaries/dependencies': [
              'error',
              {
                default: 'disallow',
                rules: [
                  {
                    from: {
                      type: 'feature',
                    },
                    allow: {
                      to: [
                        {
                          type: 'auth',
                        },
                        {
                          type: 'shared',
                        },
                        {
                          type: 'lib',
                        },
                        {
                          type: 'feature',
                        },
                        {
                          type: 'components',
                        },
                        {
                          type: 'infra',
                        },
                        {
                          type: 'stores',
                        },
                        {
                          type: 'realtime',
                        },
                      ],
                    },
                    message:
                      'Features may import from auth, shared, lib, components, infra, stores, realtime, or other features.',
                  },
                ],
              },
            ],
          },
          jsPlugins: ['eslint-plugin-boundaries'],
        },
        {
          files: [
            'src/auth/*.{js,jsx,ts,tsx}',
            'src/auth/**/*.{js,jsx,ts,tsx}',
          ],
          rules: {
            'boundaries/dependencies': [
              'error',
              {
                default: 'disallow',
                rules: [
                  {
                    from: {
                      type: 'auth',
                    },
                    allow: {
                      to: [
                        {
                          type: 'auth',
                        },
                        {
                          type: 'shared',
                        },
                        {
                          type: 'lib',
                        },
                        {
                          type: 'infra',
                        },
                        {
                          type: 'components',
                        },
                      ],
                    },
                    message:
                      'Auth may only import from auth, shared, lib, components and infra.',
                  },
                ],
              },
            ],
          },
          jsPlugins: ['eslint-plugin-boundaries'],
        },
        {
          files: [
            'src/infra/*.{js,jsx,ts,tsx}',
            'src/infra/**/*.{js,jsx,ts,tsx}',
          ],
          rules: {
            'boundaries/dependencies': [
              'error',
              {
                default: 'disallow',
                rules: [
                  {
                    from: {
                      type: 'infra',
                    },
                    allow: {
                      to: [
                        {
                          type: 'infra',
                        },
                        {
                          type: 'lib',
                        },
                      ],
                    },
                    message:
                      'Infra is the external-system bootstrap layer — may only import from infra and lib (vendor SDKs + env config + primitives).',
                  },
                ],
              },
            ],
          },
          jsPlugins: ['eslint-plugin-boundaries'],
        },
        {
          files: [
            'src/components/*.{js,jsx,ts,tsx}',
            'src/components/**/*.{js,jsx,ts,tsx}',
          ],
          rules: {
            'boundaries/dependencies': [
              'error',
              {
                default: 'disallow',
                rules: [
                  {
                    from: {
                      type: 'components',
                    },
                    allow: {
                      to: [
                        {
                          type: 'components',
                        },
                        {
                          type: 'auth',
                        },
                        {
                          type: 'shared',
                        },
                        {
                          type: 'lib',
                        },
                      ],
                    },
                    message:
                      'Components may only import from components, auth, shared and lib',
                  },
                ],
              },
            ],
          },
          jsPlugins: ['eslint-plugin-boundaries'],
        },
        {
          files: [
            'src/storage/*.{js,jsx,ts,tsx}',
            'src/storage/**/*.{js,jsx,ts,tsx}',
          ],
          rules: {
            'boundaries/dependencies': [
              'error',
              {
                default: 'disallow',
                rules: [
                  {
                    from: {
                      type: 'storage',
                    },
                    allow: {
                      to: [
                        {
                          type: 'storage',
                        },
                        {
                          type: 'shared',
                        },
                        {
                          type: 'lib',
                        },
                        {
                          type: 'infra',
                        },
                      ],
                    },
                    message:
                      'Storage is the persistence layer — may only import from storage, shared, lib, and infra.',
                  },
                ],
              },
            ],
          },
          jsPlugins: ['eslint-plugin-boundaries'],
        },
        {
          files: [
            'src/realtime/*.{js,jsx,ts,tsx}',
            'src/realtime/**/*.{js,jsx,ts,tsx}',
          ],
          rules: {
            'boundaries/dependencies': [
              'error',
              {
                default: 'disallow',
                rules: [
                  {
                    from: {
                      type: 'realtime',
                    },
                    allow: {
                      to: [
                        {
                          type: 'realtime',
                        },
                        {
                          type: 'shared',
                        },
                        {
                          type: 'lib',
                        },
                        {
                          type: 'infra',
                        },
                        {
                          type: 'auth',
                        },
                      ],
                    },
                    message:
                      'Realtime is the ephemeral-coordination layer (sibling of storage) — may only import from realtime, shared, lib, infra, and auth.',
                  },
                ],
              },
            ],
          },
          jsPlugins: ['eslint-plugin-boundaries'],
        },
        {
          files: [
            'src/stores/*.{js,jsx,ts,tsx}',
            'src/stores/**/*.{js,jsx,ts,tsx}',
          ],
          rules: {
            'boundaries/dependencies': [
              'error',
              {
                default: 'disallow',
                rules: [
                  {
                    from: {
                      type: 'stores',
                    },
                    allow: {
                      to: [
                        {
                          type: 'stores',
                        },
                        {
                          type: 'auth',
                        },
                        {
                          type: 'shared',
                        },
                        {
                          type: 'lib',
                        },
                        {
                          type: 'storage',
                        },
                        {
                          type: 'realtime',
                        },
                        {
                          type: 'infra',
                        },
                        {
                          type: 'feature',
                        },
                      ],
                    },
                    message:
                      'Stores may only import from stores, auth, shared, lib, storage, realtime, infra and feature.',
                  },
                ],
              },
            ],
          },
          jsPlugins: ['eslint-plugin-boundaries'],
        },
        {
          files: ['src/app/*.{js,jsx,ts,tsx}', 'src/app/**/*.{js,jsx,ts,tsx}'],
          rules: {
            'boundaries/dependencies': [
              'error',
              {
                default: 'disallow',
                rules: [
                  {
                    from: {
                      type: 'app',
                    },
                    allow: {
                      to: [
                        {
                          type: 'app',
                        },
                        {
                          type: 'auth',
                        },
                        {
                          type: 'stores',
                        },
                        {
                          type: 'feature',
                        },
                        {
                          type: 'components',
                        },
                        {
                          type: 'shared',
                        },
                        {
                          type: 'lib',
                        },
                      ],
                    },
                    message:
                      'App shell may only import from app, auth, shared, lib, components, and feature.',
                  },
                ],
              },
            ],
          },
          jsPlugins: ['eslint-plugin-boundaries'],
        },
        {
          files: ['src/lib/**/*.{js,jsx,ts,tsx}'],
          rules: {
            'boundaries/dependencies': [
              'error',
              {
                default: 'disallow',
                rules: [
                  {
                    from: {
                      type: 'lib',
                    },
                    allow: {
                      to: [
                        {
                          type: 'lib',
                        },
                      ],
                    },
                    message:
                      'Lib is the bottom layer of framework-agnostic primitives — may only import from lib (no app knowledge).',
                  },
                ],
              },
            ],
          },
          jsPlugins: ['eslint-plugin-boundaries'],
        },
        {
          // STATE_RULES.md: *-state.js modules are module-private. A later
          // override resets this inside src/auth/** and src/features/contacts/**.
          files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
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
      ],
      options: {
        typeAware: true,
        typeCheck: true,
      },
      // Worker package type-checks with its own tsconfig (`pnpm lint:cf`);
      // the root type-aware pass can't resolve cloudflare:test there.
      ignorePatterns: ['backend/**'],
      settings: {
        'import/resolver': {
          typescript: { alwaysTryTypes: true },
        },
        'boundaries/include': ['src/**/*.{js,jsx,ts,tsx}'],
        'boundaries/elements': [
          {
            type: 'shared',
            mode: 'full',
            pattern: [
              'src/shared/*.{js,jsx,ts,tsx}',
              'src/shared/events/**/*.{js,jsx,ts,tsx}',
              'src/shared/i18n/**/*.{js,jsx,ts,tsx}',
              'src/shared/utils/**/*.{js,jsx,ts,tsx}',
            ],
          },
          {
            type: 'lib',
            mode: 'full',
            pattern: ['src/lib/**/*.{js,jsx,ts,tsx}'],
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
            type: 'realtime',
            mode: 'full',
            pattern: [
              'src/realtime/*.{js,jsx,ts,tsx}',
              'src/realtime/**/*.{js,jsx,ts,tsx}',
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
