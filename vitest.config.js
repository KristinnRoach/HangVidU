import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { VitePWA } from 'vite-plugin-pwa';
import solid from 'vite-plugin-solid';

// Enable multi-browser testing with COMPAT=true
const isCompatMode = process.env.COMPAT === 'true';

// Shared test options
const sharedTestConfig = {
  globals: true,
  setupFiles: ['./tests/env-setup.js'],
};

// Shared include patterns (both projects use the same directories)
const testDirs = [
  'src/**/',
  'tests/unit/**/',
  'tests/smoke/**/',
  'tests/integration/**/',
  'tests/investigation/**/',
];

export default defineConfig({
  // Solid-js exposes both server + client entrypoints via package exports.
  // Node default-resolves the server build; force client conditions so
  // render() in tests hits the DOM path. `development` is also required —
  // without it `solid-js/web`'s hot-reload shim throws.
  resolve: {
    tsconfigPaths: true,
    conditions: ['development', 'browser'],
  },
  plugins: [
    solid(),
    VitePWA({
      includeAssets: ['index.html', 'favicon.ico'],
      registerType: 'prompt',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      devOptions: {
        enabled: false, // injectManifest with ES modules doesn't work in dev
      },
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html', // fallback for SPA navigation
        navigateFallbackDenylist: [
          /^\/index\.html$/, // Don't fallback for index.html itself
          /^\/__\//, // Exclude Firebase auth handler paths
          /^\/auth\//, // Exclude any other auth-related paths
        ],
      },
    }),
  ],
  test: {
    projects: [
      // Default: runs in Node with jsdom (no Playwright RPC overhead)
      // Convention: *.test.js / *.test.jsx
      {
        plugins: [solid()],
        resolve: {
          tsconfigPaths: true,
          conditions: ['solid', 'development', 'browser'],
        },
        test: {
          ...sharedTestConfig,
          name: 'node',
          environment: 'jsdom',
          environmentOptions: {
            jsdom: {
              url: 'http://localhost/',
            },
          },
          // Solid ships a DOM and a Node (server) build behind package
          // conditions. Jsdom tests need the DOM build — force inline so
          // the conditions config applies even for hoisted modules.
          server: {
            deps: {
              inline: [/solid-js/, /@solidjs\/testing-library/],
            },
          },
          include: testDirs.flatMap((d) => [
            `${d}*.test.js`,
            `${d}*.test.jsx`,
          ]),
          exclude: testDirs.flatMap((d) => [
            `${d}*.browser.test.js`,
            `${d}*.browser.test.jsx`,
          ]),
        },
      },
      // Browser: runs in real Chromium via Playwright
      // Convention: *.browser.test.js / *.browser.test.jsx — use for tests
      // needing real WebRTC, OPFS, ServiceWorker, or other APIs jsdom can't
      // provide
      {
        plugins: [solid()],
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          ...sharedTestConfig,
          name: 'browser',
          globalSetup: ['./tests/process-setup.js'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: isCompatMode
              ? [
                  { browser: 'chromium' },
                  { browser: 'firefox' },
                  { browser: 'webkit' },
                ]
              : [{ browser: 'chromium' }],
          },
          include: testDirs.flatMap((d) => [
            `${d}*.browser.test.js`,
            `${d}*.browser.test.jsx`,
          ]),
        },
      },
    ],
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/e2e/',
        'dist/',
        '*.config.js',
        'go-server/',
      ],
    },
  },
});
