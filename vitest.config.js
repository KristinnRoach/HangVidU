import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
    globals: true,
    setupFiles: ['./tests/setup.js'],
    include: [
      'src/**/*.test.js',
      'tests/unit/**/*.test.js',
      'tests/smoke/**/*.test.js',
      'tests/integration/**/*.test.js',
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
