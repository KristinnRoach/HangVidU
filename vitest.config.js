import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    include: [
      'src/**/*.test.js',
      'tests/unit/**/*.test.js',
      'tests/browser/**/*.test.js',
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
