// tests/e2e/ice-candidate-handling.spec.js - Test ICE candidate handling improvements

import { test, expect } from '@playwright/test';
import {
  setupTwoPeerConnection,
  mockFirebaseForTesting,
  mockMediaDevices,
  waitForAppReady,
  cleanupConnection,
} from '../helpers/test-utils.js';

test.describe('ICE Candidate Handling', () => {
  test('should handle connection state transitions properly', async ({
    browser,
  }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockFirebaseForTesting(page1);
      await mockFirebaseForTesting(page2);
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);

      // Person A starts chat
      await page1.goto('/');
      await waitForAppReady(page1);
      await page1.click('#startChat');
      await expect(page1.locator('#linkContainer')).toBeVisible();

      // Should show waiting status
      await expect(page1.locator('#status')).toContainText(
        /ready.*waiting|waiting/i
      );

      // Get share link
      const shareLink = await page1.locator('#shareLink').inputValue();
      const url = new URL(shareLink);
      const roomId = url.searchParams.get('room');

      // Person B joins
      await page2.goto(`/?room=${roomId}`);
      await waitForAppReady(page2);

      // Should show connection process
      await expect(page1.locator('#status')).toContainText(
        /received.*stream|validating|connecting/i,
        { timeout: 10000 }
      );
      await expect(page2.locator('#status')).toContainText(
        /received.*stream|validating|connecting/i,
        { timeout: 10000 }
      );

      // Wait for connection to stabilize
      await page1.waitForTimeout(3000);

      // Check final status
      const page1Status = await page1.locator('#status').textContent();
      const page2Status = await page2.locator('#status').textContent();

      console.log('Connection established:');
      console.log('Page1 status:', page1Status);
      console.log('Page2 status:', page2Status);

      // Should not be stuck in "Connecting..." state
      expect(page1Status).not.toBe('Connecting...');
      expect(page2Status).not.toBe('Connecting...');

      // Should have some meaningful status
      expect(page1Status.length).toBeGreaterThan(0);
      expect(page2Status.length).toBeGreaterThan(0);
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should show proper connection diagnostics in console', async ({
    browser,
  }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockFirebaseForTesting(page1);
      await mockFirebaseForTesting(page2);
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);

      // Capture console logs for connection state tracking
      const page1Logs = [];
      const page2Logs = [];

      page1.on('console', (msg) => {
        if (
          msg.text().includes('Connection state') ||
          msg.text().includes('ICE')
        ) {
          page1Logs.push(msg.text());
        }
      });

      page2.on('console', (msg) => {
        if (
          msg.text().includes('Connection state') ||
          msg.text().includes('ICE')
        ) {
          page2Logs.push(msg.text());
        }
      });

      // Start connection
      await page1.goto('/');
      await waitForAppReady(page1);
      await page1.click('#startChat');

      await expect(page1.locator('#linkContainer')).toBeVisible();
      const shareLink = await page1.locator('#shareLink').inputValue();
      const url = new URL(shareLink);
      const roomId = url.searchParams.get('room');

      await page2.goto(`/?room=${roomId}`);
      await waitForAppReady(page2);

      // Wait for connection process
      await page1.waitForTimeout(5000);

      // Check that we got proper connection state logs
      console.log('Page1 connection logs:', page1Logs);
      console.log('Page2 connection logs:', page2Logs);

      // Should have connection state transitions
      const hasConnectionStates =
        page1Logs.some((log) => log.includes('Connection state')) ||
        page2Logs.some((log) => log.includes('Connection state'));

      expect(hasConnectionStates).toBe(true);
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should handle connection timeout gracefully', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockFirebaseForTesting(page1);
      await mockMediaDevices(page1);

      await page1.goto('/');
      await waitForAppReady(page1);

      // Start chat but don't have anyone join
      await page1.click('#startChat');
      await expect(page1.locator('#linkContainer')).toBeVisible();

      // Should show waiting status
      await expect(page1.locator('#status')).toContainText(
        /ready.*waiting|waiting/i
      );

      // Wait a bit - should remain in waiting state (not timeout since no one joined)
      await page1.waitForTimeout(3000);

      const status = await page1.locator('#status').textContent();
      expect(status).toContain('waiting');
    } finally {
      await cleanupConnection(page1, null);
      await cleanup();
    }
  });
});
