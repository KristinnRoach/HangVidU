import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

// Enable multi-browser testing with COMPAT=true
const isCompatMode = process.env.COMPAT === 'true';

export default defineConfig({
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
