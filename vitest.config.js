import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { VitePWA } from 'vite-plugin-pwa';

// Enable multi-browser testing with COMPAT=true
const isCompatMode = process.env.COMPAT === 'true';

export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: ['index.html', 'favicon.ico'],
      registerType: 'autoUpdate',
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
    globals: true,
    setupFiles: ['./tests/setup.js'],
    include: [
      'src/**/*.test.js',
      'tests/unit/**/*.test.js',
      'tests/smoke/**/*.test.js',
      'tests/integration/**/*.test.js',
      'tests/investigation/**/*.test.js',
    ],
    exclude: ['tests/e2e/**/*', 'tests/**/*.spec.js', 'node_modules/**/*'],
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
