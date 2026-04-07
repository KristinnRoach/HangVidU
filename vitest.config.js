import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { VitePWA } from 'vite-plugin-pwa';

// Enable multi-browser testing with COMPAT=true
const isCompatMode = process.env.COMPAT === 'true';

// Shared test options
const sharedTestConfig = {
  globals: true,
  setupFiles: ['./tests/setup.js'],
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
  plugins: [
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
      // Convention: *.test.js
      {
        test: {
          ...sharedTestConfig,
          name: 'node',
          environment: 'jsdom',
          include: testDirs.map((d) => `${d}*.test.js`),
          exclude: testDirs.map((d) => `${d}*.browser.test.js`),
        },
      },
      // Browser: runs in real Chromium via Playwright
      // Convention: *.browser.test.js — use for tests needing real
      // WebRTC, OPFS, ServiceWorker, or other APIs jsdom can't provide
      {
        test: {
          ...sharedTestConfig,
          name: 'browser',
          globalSetup: ['./tests/global-setup.js'],
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
          include: testDirs.map((d) => `${d}*.browser.test.js`),
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
