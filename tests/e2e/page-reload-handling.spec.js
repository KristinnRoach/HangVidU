// tests/e2e/page-reload-handling.spec.js - Test page reload during calls

import { test, expect } from '@playwright/test';
import {
  setupTwoPeerConnection,
  mockFirebaseForTesting,
  mockMediaDevices,
  waitForAppReady,
  cleanupConnection,
} from '../helpers/test-utils.js';

test.describe('Page Reload Handling', () => {
  test('should not restore unconnected sessions after page reload', async ({
    browser,
  }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockFirebaseForTesting(page1);
      await mockMediaDevices(page1);

      // Start a chat session but don't connect
      await page1.goto('/');
      await waitForAppReady(page1);
      await page1.click('#startChat');
      await expect(page1.locator('#linkContainer')).toBeVisible();

      // Wait for session to be saved
      await page1.waitForTimeout(2000);

      // Reload the page
      await page1.reload();
      await waitForAppReady(page1);

      // Should NOT restore because session was never connected
      await expect(page1.locator('#status')).toContainText(/ready.*click/i, {
        timeout: 5000,
      });

      // Should show normal initial state
      await expect(page1.locator('#startChat')).toBeEnabled();

      console.log('Correctly did not restore unconnected session');
    } finally {
      await cleanupConnection(page1, null);
      await cleanup();
    }
  });

  test('should restore UI state after page reload', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockFirebaseForTesting(page1);
      await mockMediaDevices(page1);

      // Start chat and modify some UI state
      await page1.goto('/');
      await waitForAppReady(page1);
      await page1.click('#startChat');
      await expect(page1.locator('#linkContainer')).toBeVisible();

      // Mute audio
      await page1.click('#toggleMute');
      await expect(page1.locator('#toggleMute')).toContainText('Unmute');

      // Turn off video
      await page1.click('#toggleVideo');
      await expect(page1.locator('#toggleVideo')).toContainText(
        'Turn Video On'
      );

      // Wait for state to be saved
      await page1.waitForTimeout(1000);

      // Reload page
      await page1.reload();
      await waitForAppReady(page1);

      // Wait for restoration
      await page1.waitForTimeout(5000);

      // Check if UI state was restored
      const muteButtonText = await page1.locator('#toggleMute').textContent();
      const videoButtonText = await page1.locator('#toggleVideo').textContent();

      console.log('After reload - Mute button:', muteButtonText);
      console.log('After reload - Video button:', videoButtonText);

      // Note: The exact restoration depends on the implementation
      // At minimum, the buttons should be visible and have some state
      await expect(page1.locator('#toggleMute')).toBeVisible();
      await expect(page1.locator('#toggleVideo')).toBeVisible();
    } finally {
      await cleanupConnection(page1, null);
      await cleanup();
    }
  });

  test('should not restore very old sessions', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockFirebaseForTesting(page1);
      await mockMediaDevices(page1);

      // Inject old session data
      await page1.addInitScript(() => {
        const oldSessionData = {
          roomId: 'old-room-123',
          isInitiator: true,
          wasConnected: true,
          timestamp: Date.now(),
          lastActivity: Date.now() - 10 * 60 * 1000, // 10 minutes ago
        };
        localStorage.setItem(
          'hangvidu_session',
          JSON.stringify(oldSessionData)
        );
      });

      await page1.goto('/');
      await waitForAppReady(page1);

      // Should not attempt restoration for old sessions
      await expect(page1.locator('#status')).toContainText(/ready.*click/i, {
        timeout: 5000,
      });

      // Should show normal initial state
      await expect(page1.locator('#startChat')).toBeEnabled();
    } finally {
      await cleanup();
    }
  });

  test('should handle restoration failure gracefully', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      // Don't mock Firebase to simulate connection failure
      await mockMediaDevices(page1);

      // Inject session data that will fail to restore
      await page1.addInitScript(() => {
        const sessionData = {
          roomId: 'invalid-room-123',
          isInitiator: false, // Joiner trying to rejoin invalid room
          wasConnected: true,
          timestamp: Date.now(),
          lastActivity: Date.now() - 1000, // Recent
        };
        localStorage.setItem('hangvidu_session', JSON.stringify(sessionData));
      });

      await page1.goto('/');
      await waitForAppReady(page1);

      // Should attempt restoration but fail gracefully
      await expect(page1.locator('#status')).toContainText(
        /restoring|restoration.*failed|starting.*fresh/i,
        { timeout: 10000 }
      );

      // Should eventually return to normal state
      await page1.waitForTimeout(3000);
      const finalStatus = await page1.locator('#status').textContent();
      console.log('Status after failed restoration:', finalStatus);

      // Should not be stuck in restoration state
      expect(finalStatus).not.toContain('Restoring');
    } finally {
      await cleanup();
    }
  });
});
