import { defineConfig } from 'vite-plus';
import { playwright } from 'vite-plus/test/browser-playwright';
import { pwaPlugin } from './vite.pwa.js';
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
    dedupe: ['solid-js'],
    conditions: ['development', 'browser'],
  },
  plugins: [solid(), pwaPlugin()],
  test: {
    projects: [
      // Default: runs in Node with jsdom (no Playwright RPC overhead)
      // Convention: *.test.{js,jsx,ts,tsx}
      {
        resolve: {
          tsconfigPaths: true,
          dedupe: ['solid-js'],
          conditions: ['solid', 'development', 'browser'],
        },
        test: {
          ...sharedTestConfig,
          name: 'node',
          environment: 'jsdom',
          // jsdom is built once per worker; each file still gets a fresh window.
          pool: 'vmThreads',
          // Several jsdom specs stub shared browser globals and hoisted module
          // mocks. Keep these files sequential so the node suite remains
          // deterministic under the main multi-project test command.
          fileParallelism: false,
          // vmThreads + no file parallelism gives this project a different
          // maxWorkers than browser, which Vitest requires in its own group.
          sequence: { groupOrder: 0 },
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
          include: testDirs.map((d) => `${d}*.test.{js,jsx,ts,tsx}`),
          exclude: testDirs.map((d) => `${d}*.browser.test.{js,jsx,ts,tsx}`),
        },
      },
      // Browser: runs in real Chromium via Playwright
      // Convention: *.browser.test.{js,jsx,ts,tsx} — use for tests
      // needing real WebRTC, OPFS, ServiceWorker, or other APIs jsdom can't
      // provide
      {
        resolve: {
          tsconfigPaths: true,
          dedupe: ['solid-js'],
        },
        test: {
          ...sharedTestConfig,
          name: 'browser',
          sequence: { groupOrder: 1 },
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
          include: testDirs.map((d) => `${d}*.browser.test.{js,jsx,ts,tsx}`),
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
