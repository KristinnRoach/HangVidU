import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // timeout: 60000, // default is 30 sec
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list', { printSteps: false }]], // Less verbose

  use: {
    baseURL: 'http://localhost:5500',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    navigationTimeout: 10000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
