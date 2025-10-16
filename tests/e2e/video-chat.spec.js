// tests/e2e/video-chat.spec.js - Core video chat functionality tests

import { test, expect } from '@playwright/test';
import {
  setupTwoPeerConnection,
  createVideoConnection,
  testMediaControls,
  cleanupConnection,
  mockMediaDevices,
  mockFirebaseForTesting,
} from '../helpers/test-utils.js';

test.describe('Video Chat Core Flow', () => {
  test('should create and join video chat successfully', async ({
    browser,
  }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);

    try {
      // Mock Firebase and media devices for consistent testing
      await mockFirebaseForTesting(page1);
      await mockFirebaseForTesting(page2);
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);

      // Create connection
      const { roomId } = await createVideoConnection(page1, page2);

      // Verify room ID is valid
      expect(roomId).toBeTruthy();
      expect(roomId.length).toBeGreaterThan(5);

      // Verify UI state after connection
      await expect(page1.locator('#startChat')).toBeDisabled();
      await expect(page1.locator('#hangUp')).toBeEnabled();
      await expect(page1.locator('#toggleMode')).toBeVisible();

      await expect(page2.locator('#hangUp')).toBeEnabled();
      await expect(page2.locator('#toggleMode')).toBeVisible();

      // Verify video elements have media streams
      const page1VideoSrc = await page1
        .locator('#localVideo')
        .getAttribute('src');
      const page2VideoSrc = await page2
        .locator('#localVideo')
        .getAttribute('src');

      // Should have blob URLs for media streams
      expect(page1VideoSrc).toMatch(/^blob:/);
      expect(page2VideoSrc).toMatch(/^blob:/);
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should handle media controls correctly', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);

      await createVideoConnection(page1, page2);

      // Test media controls on page1
      await testMediaControls(page1);

      // Test camera switching if available (now in hover controls)
      const switchCameraBtn = page1.locator('#switchCameraSelfBtn');
      if (await switchCameraBtn.isVisible()) {
        // Hover over local video to show controls
        await page1.locator('#localVideo').hover();
        await switchCameraBtn.click();
        // Should not throw error
        await page1.waitForTimeout(1000);
      }
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should handle hang up correctly', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);

      await createVideoConnection(page1, page2);

      // Hang up from page1
      await page1.click('#hangUp');

      // Verify UI reset on page1
      await expect(page1.locator('#startChat')).toBeEnabled();
      await expect(page1.locator('#hangUp')).toBeDisabled();
      await expect(page1.locator('#linkContainer')).toBeHidden();
      await expect(page1.locator('#toggleMode')).toBeHidden();

      // Verify status message
      await expect(page1.locator('#status')).toContainText('Ready');

      // Page2 should also detect disconnection
      await expect(page2.locator('#status')).toContainText('Disconnected', {
        timeout: 10000,
      });
    } finally {
      await cleanup();
    }
  });

  test('should handle connection errors gracefully', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockMediaDevices(page1.page1);

      // Try to join non-existent room
      await page1.goto('/?room=non-existent-room-id');

      // Should show error or appropriate message
      await expect(page1.locator('#status')).toContainText(
        /not found|error|failed/i,
        { timeout: 10000 }
      );
    } finally {
      await cleanup();
    }
  });

  test('should copy share link successfully', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockMediaDevices(page1);

      await page1.goto('/');
      await page1.click('#startChat');
      await expect(page1.locator('#linkContainer')).toBeVisible();

      // Click copy button
      await page1.click('#copyLink');

      // Should show success message
      await expect(page1.locator('#status')).toContainText('copied', {
        timeout: 5000,
      });
    } finally {
      await cleanupConnection(page1, null);
      await cleanup();
    }
  });
});
