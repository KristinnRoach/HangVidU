import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./**/*.test.js'], // Use .test for vitest, .spec for playwright
    environment: 'jsdom', // or 'happy-dom'
    globals: true,
  },
});
