// tests/e2e/page-reload-basic.spec.js - Basic page reload functionality test

import { test, expect } from '@playwright/test';
import {
  mockFirebaseForTesting,
  mockMediaDevices,
  waitForAppReady,
} from '../helpers/test-utils.js';

test.describe('Page Reload Basic', () => {
  test('should start normally without any saved session', async ({ page }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    // Clear any existing localStorage
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto('/');
    await waitForAppReady(page);

    // Should show normal ready state
    await expect(page.locator('#status')).toContainText(/ready/i, {
      timeout: 5000,
    });

    // Start chat button should work
    await expect(page.locator('#startChat')).toBeEnabled();
    await page.click('#startChat');

    // Should show link container
    await expect(page.locator('#linkContainer')).toBeVisible({
      timeout: 10000,
    });

    // Should have a share link
    const shareLink = await page.locator('#shareLink').inputValue();
    expect(shareLink).toContain('room=');
  });

  test('should handle page reload manager initialization', async ({ page }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    await page.goto('/');
    await waitForAppReady(page);

    // Check that page reload manager is working by looking at console
    const logs = [];
    page.on('console', (msg) => {
      if (
        msg.text().includes('Session') ||
        msg.text().includes('restoration')
      ) {
        logs.push(msg.text());
      }
    });

    // Start a session
    await page.click('#startChat');
    await expect(page.locator('#linkContainer')).toBeVisible();

    // Wait a bit for any session saving
    await page.waitForTimeout(2000);

    console.log('Session-related logs:', logs);

    // Should have successfully started without restoration issues
    const status = await page.locator('#status').textContent();
    expect(status).toContain('Waiting for partner');
  });
});
