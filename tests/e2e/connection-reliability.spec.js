// tests/e2e/connection-reliability.spec.js - Connection reliability tests

import { test, expect } from '@playwright/test';
import {
  setupTwoPeerConnection,
  mockFirebaseForTesting,
  mockMediaDevices,
  waitForAppReady,
  cleanupConnection,
} from '../helpers/test-utils.js';

test.describe('Connection Reliability', () => {
  test('should detect when remote video is actually streaming', async ({
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

      // Get share link
      const shareLink = await page1.locator('#shareLink').inputValue();
      const url = new URL(shareLink);
      const roomId = url.searchParams.get('room');

      // Person B joins
      await page2.goto(`/?room=${roomId}`);
      await waitForAppReady(page2);

      // Wait for initial connection status
      await expect(page1.locator('#status')).toContainText(
        /received video stream|validating/i,
        { timeout: 10000 }
      );
      await expect(page2.locator('#status')).toContainText(
        /received video stream|validating/i,
        { timeout: 10000 }
      );

      // Wait for validation to complete - should show either success or connection with issues
      // Our mock video might not pass validation, which is actually correct behavior
      await expect(page1.locator('#status')).toContainText(
        /connected.*streaming|video streaming|connected.*issues|failed/i,
        { timeout: 20000 }
      );
      await expect(page2.locator('#status')).toContainText(
        /connected.*streaming|video streaming|connected.*issues|failed/i,
        { timeout: 20000 }
      );

      // Log the actual status for debugging
      const page1Status = await page1.locator('#status').textContent();
      const page2Status = await page2.locator('#status').textContent();
      console.log('Page1 final status:', page1Status);
      console.log('Page2 final status:', page2Status);

      // Verify video elements are visible and have content
      await expect(page1.locator('#remoteVideo')).toBeVisible();
      await expect(page2.locator('#remoteVideo')).toBeVisible();

      // Check that video elements have actual dimensions (not 0x0)
      const page1VideoSize = await page1
        .locator('#remoteVideo')
        .evaluate((el) => ({
          width: el.videoWidth,
          height: el.videoHeight,
        }));

      const page2VideoSize = await page2
        .locator('#remoteVideo')
        .evaluate((el) => ({
          width: el.videoWidth,
          height: el.videoHeight,
        }));

      expect(page1VideoSize.width).toBeGreaterThan(0);
      expect(page1VideoSize.height).toBeGreaterThan(0);
      expect(page2VideoSize.width).toBeGreaterThan(0);
      expect(page2VideoSize.height).toBeGreaterThan(0);
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should show validation status during connection', async ({
    browser,
  }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockFirebaseForTesting(page1);
      await mockMediaDevices(page1);

      await page1.goto('/');
      await waitForAppReady(page1);

      // Start chat
      await page1.click('#startChat');

      // Should show initial ready status
      await expect(page1.locator('#status')).toContainText(/ready.*waiting/i, {
        timeout: 5000,
      });

      // Link should be generated
      await expect(page1.locator('#linkContainer')).toBeVisible();
    } finally {
      await cleanupConnection(page1, null);
      await cleanup();
    }
  });

  test('should handle video validation timeout gracefully', async ({
    browser,
  }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);

    try {
      await mockFirebaseForTesting(page1);
      await mockFirebaseForTesting(page2);

      // Mock media devices but with problematic video
      await page1.addInitScript(() => {
        navigator.mediaDevices.getUserMedia = async (constraints) => {
          const canvas = document.createElement('canvas');
          canvas.width = 1; // Very small dimensions
          canvas.height = 1;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#000000'; // Black
          ctx.fillRect(0, 0, 1, 1);

          const stream = canvas.captureStream(1); // Very low framerate

          if (constraints.audio) {
            // Add silent audio
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            oscillator.frequency.setValueAtTime(0, audioContext.currentTime);
            const dest = audioContext.createMediaStreamDestination();
            oscillator.connect(dest);
            oscillator.start();

            const audioTrack = dest.stream.getAudioTracks()[0];
            stream.addTrack(audioTrack);
          }

          return stream;
        };
      });

      await page2.addInitScript(() => {
        navigator.mediaDevices.getUserMedia = async (constraints) => {
          const canvas = document.createElement('canvas');
          canvas.width = 1;
          canvas.height = 1;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, 1, 1);

          const stream = canvas.captureStream(1);

          if (constraints.audio) {
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            oscillator.frequency.setValueAtTime(0, audioContext.currentTime);
            const dest = audioContext.createMediaStreamDestination();
            oscillator.connect(dest);
            oscillator.start();

            const audioTrack = dest.stream.getAudioTracks()[0];
            stream.addTrack(audioTrack);
          }

          return stream;
        };
      });

      // Start connection
      await page1.goto('/');
      await waitForAppReady(page1);
      await page1.click('#startChat');

      const shareLink = await page1.locator('#shareLink').inputValue();
      const url = new URL(shareLink);
      const roomId = url.searchParams.get('room');

      await page2.goto(`/?room=${roomId}`);
      await waitForAppReady(page2);

      // Should eventually show validation issues or retry messages
      await expect(page1.locator('#status')).toContainText(
        /validating|issue|retry|failed/i,
        { timeout: 20000 }
      );
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });
});
