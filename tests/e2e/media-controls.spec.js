// tests/e2e/media-controls.spec.js - Media control functionality tests

import { test, expect } from '@playwright/test';
import {
  setupTwoPeerConnection,
  createVideoConnection,
  cleanupConnection,
  mockMediaDevices,
  mockFirebaseForTesting,
} from '../helpers/test-utils.js';

test.describe('Media Controls', () => {
  test('should toggle mute/unmute correctly', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockFirebaseForTesting(page1);
      await mockFirebaseForTesting(page2);
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);

      await createVideoConnection(page1, page2);

      // Hover over local video to show controls
      await page1.locator('#localVideo').hover();

      // Initial state should be unmuted (microphone-slash icon)
      const muteBtn = page1.locator('#muteSelfBtn');
      await expect(muteBtn.locator('i')).toHaveClass(/fa-microphone-slash/);

      // Toggle mute
      await muteBtn.click();
      await expect(muteBtn.locator('i')).toHaveClass(/fa-microphone/);

      // Toggle back to unmuted
      await muteBtn.click();
      await expect(muteBtn.locator('i')).toHaveClass(/fa-microphone-slash/);
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should toggle video on/off correctly', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);

      await createVideoConnection(page1, page2);

      // Hover over local video to show controls
      await page1.locator('#localVideo').hover();

      // Initial state should be video on (video icon)
      const videoBtn = page1.locator('#videoSelfBtn');
      await expect(videoBtn.locator('i')).toHaveClass(/fa-video/);

      // Toggle video off
      await videoBtn.click();
      await expect(videoBtn.locator('i')).toHaveClass(/fa-video-slash/);

      // Toggle back to video on
      await videoBtn.click();
      await expect(videoBtn.locator('i')).toHaveClass(/fa-video/);
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should show camera switch button when multiple cameras available', async ({
    browser,
  }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockMediaDevices(page1);

      await page1.goto('/');
      await page1.click('#startChat');

      // Wait for media initialization
      await expect(page1.locator('#linkContainer')).toBeVisible();

      // Hover over local video to show controls
      await page1.locator('#localVideo').hover();

      // Switch camera button should be visible (mocked devices include multiple cameras)
      await expect(page1.locator('#switchCameraSelfBtn')).toBeVisible();

      // Click should not cause errors
      await page1.click('#switchCameraSelfBtn');
      await page1.waitForTimeout(1000); // Allow time for camera switch
    } finally {
      await cleanupConnection(page1, null);
      await cleanup();
    }
  });

  test('should enable PiP button when remote video is available', async ({
    browser,
  }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);

      await createVideoConnection(page1, page2);

      // PiP button should be visible after connection
      await expect(page1.locator('#pipBtn')).toBeVisible();
      await expect(page2.locator('#pipBtn')).toBeVisible();

      // Note: We can't actually test PiP functionality in headless mode,
      // but we can verify the button is clickable
      await expect(page1.locator('#pipBtn')).toBeEnabled();
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should show hover controls on video elements', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);

      await createVideoConnection(page1, page2);

      // Hover over local video to show controls
      await page1.locator('#localVideo').hover();

      // Hover controls should be visible
      const localVideoWrapper = page1.locator('#localVideo').locator('..');
      await expect(localVideoWrapper.locator('#muteSelfBtn')).toBeVisible();
      await expect(
        localVideoWrapper.locator('#fullscreenSelfBtn')
      ).toBeVisible();

      // Test mute button in hover controls
      await localVideoWrapper.locator('#muteSelfBtn').click();

      // Should update the mute button icon state
      await expect(localVideoWrapper.locator('#muteSelfBtn i')).toHaveClass(
        /fa-microphone/
      );
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should handle media device errors gracefully', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      // Don't mock media devices to simulate permission denial
      await page1.addInitScript(() => {
        navigator.mediaDevices.getUserMedia = async () => {
          throw new DOMException('Permission denied', 'NotAllowedError');
        };
      });

      await page1.goto('/');
      await page1.click('#startChat');

      // Should show error message
      await expect(page1.locator('#status')).toContainText(
        /permission|denied|error/i,
        { timeout: 10000 }
      );
    } finally {
      await cleanup();
    }
  });

  test('should persist media state across page interactions', async ({
    browser,
  }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockMediaDevices(page1);

      await page1.goto('/');
      await page1.click('#startChat');
      await expect(page1.locator('#linkContainer')).toBeVisible();

      // Hover over local video to show controls
      await page1.locator('#localVideo').hover();

      // Mute audio
      const muteBtn = page1.locator('#muteSelfBtn');
      await muteBtn.click();
      await expect(muteBtn.locator('i')).toHaveClass(/fa-microphone/);

      // Turn off video
      const videoBtn = page1.locator('#videoSelfBtn');
      await videoBtn.click();
      await expect(videoBtn.locator('i')).toHaveClass(/fa-video-slash/);

      // State should persist during other interactions
      await page1.click('#copyLink');

      // Media state should still be the same
      await page1.locator('#localVideo').hover(); // Re-hover to show controls
      await expect(muteBtn.locator('i')).toHaveClass(/fa-microphone/);
      await expect(videoBtn.locator('i')).toHaveClass(/fa-video-slash/);
    } finally {
      await cleanupConnection(page1, null);
      await cleanup();
    }
  });
});
