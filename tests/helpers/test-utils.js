// tests/helpers/test-utils.js - Common utilities for E2E tests

import { expect } from '@playwright/test';

/**
 * Set up two browser contexts for peer-to-peer testing
 */
export async function setupTwoPeerConnection(browser) {
  const context1 = await browser.newContext({
    permissions: ['camera', 'microphone'],
    ignoreHTTPSErrors: true,
  });
  const context2 = await browser.newContext({
    permissions: ['camera', 'microphone'],
    ignoreHTTPSErrors: true,
  });

  const page1 = await context1.newPage();
  const page2 = await context2.newPage();

  // Add console logging for debugging
  page1.on('console', (msg) => console.log(`Page1: ${msg.text()}`));
  page2.on('console', (msg) => console.log(`Page2: ${msg.text()}`));

  return {
    page1,
    page2,
    context1,
    context2,
    cleanup: async () => {
      try {
        if (!context1.isClosed) await context1.close();
      } catch (e) {
        console.warn('Error closing context1:', e.message);
      }
      try {
        if (!context2.isClosed) await context2.close();
      } catch (e) {
        console.warn('Error closing context2:', e.message);
      }
    },
  };
}

/**
 * Wait for app to be ready and free of error overlays
 */
export async function waitForAppReady(page) {
  // Wait for any error overlays to disappear and app to be ready
  await page.waitForFunction(
    () => {
      const errorOverlay = document.querySelector('vite-error-overlay');
      return !errorOverlay || errorOverlay.style.display === 'none';
    },
    { timeout: 15000 }
  );

  // Wait for the app to be initialized (status element should be present)
  await page.waitForSelector('#status', { timeout: 10000 });

  // Ensure no overlays are blocking interactions
  const errorOverlay = page.locator('vite-error-overlay');
  if (await errorOverlay.isVisible().catch(() => false)) {
    await expect(errorOverlay).not.toBeVisible({ timeout: 5000 });
  }
}

/**
 * Create a video chat connection between two pages
 */
export async function createVideoConnection(page1, page2) {
  // Person A starts chat
  await page1.goto('/');

  // Wait for app to be ready
  await waitForAppReady(page1);

  // Wait for the start chat button to be actually clickable
  await page1.waitForSelector('#startChat:not([disabled])', {
    state: 'visible',
    timeout: 10000,
  });

  await page1.click('#startChat');

  // Wait for link to be generated
  await expect(page1.locator('#linkContainer')).toBeVisible();

  // Get share link and extract room ID
  const shareLink = await page1.locator('#shareLink').inputValue();
  const url = new URL(shareLink);
  const roomId = url.searchParams.get('room');

  if (!roomId) {
    throw new Error('No room ID found in share link');
  }

  // Person B joins
  await page2.goto(`/?room=${roomId}`);

  // Wait for app to be ready on page2
  await waitForAppReady(page2);

  // Wait for connection to establish
  await expect(page1.locator('#status')).toContainText('Connected', {
    timeout: 15000,
  });
  await expect(page2.locator('#status')).toContainText('Connected', {
    timeout: 15000,
  });

  // Verify video elements are visible
  await expect(page1.locator('#remoteVideo')).toBeVisible();
  await expect(page2.locator('#remoteVideo')).toBeVisible();

  return { roomId, shareLink };
}

/**
 * Switch both pages to watch mode
 */
export async function switchToWatchMode(page1, page2) {
  await page1.click('#toggleMode');
  await page2.click('#toggleMode');

  // Verify watch containers are visible
  await expect(page1.locator('#watchContainer')).toBeVisible();
  await expect(page2.locator('#watchContainer')).toBeVisible();

  // Verify video containers are hidden
  await expect(page1.locator('.video-container')).toBeHidden();
  await expect(page2.locator('.video-container')).toBeHidden();
}

/**
 * Load a video URL and verify it syncs between pages
 */
export async function loadAndSyncVideo(page1, page2, videoUrl) {
  // Load video on page1
  await page1.fill('#streamUrl', videoUrl);
  await page1.click('#loadStream');

  // Wait for sync status to update
  await expect(page1.locator('#syncStatus')).not.toContainText(
    'Waiting for video',
    { timeout: 10000 }
  );

  // Verify page2 receives the URL
  await expect(page2.locator('#streamUrl')).toHaveValue(videoUrl, {
    timeout: 10000,
  });

  // Verify both pages have the same URL
  const page1Url = await page1.locator('#streamUrl').inputValue();
  const page2Url = await page2.locator('#streamUrl').inputValue();
  expect(page1Url).toBe(page2Url);
}

/**
 * Wait for element to be visible with custom timeout
 */
export async function waitForVisible(page, selector, timeout = 10000) {
  await expect(page.locator(selector)).toBeVisible({ timeout });
}

/**
 * Wait for element to contain specific text
 */
export async function waitForText(page, selector, text, timeout = 10000) {
  await expect(page.locator(selector)).toContainText(text, { timeout });
}

/**
 * Mock Firebase for testing to prevent initialization errors
 */
export async function mockFirebaseForTesting(page) {
  await page.addInitScript(() => {
    // Mock Firebase to prevent connection errors
    window.firebase = {
      database: () => ({
        ref: (path) => ({
          set: () => Promise.resolve(),
          on: () => {},
          off: () => {},
          once: () => Promise.resolve({ exists: () => false, val: () => null }),
          child: () => ({
            set: () => Promise.resolve(),
            on: () => {},
            off: () => {},
            push: () => Promise.resolve({ key: 'mock-key' }),
            update: () => Promise.resolve(),
          }),
          push: () => Promise.resolve({ key: 'mock-key' }),
          remove: () => Promise.resolve(),
          onDisconnect: () => ({
            set: () => Promise.resolve(),
            remove: () => Promise.resolve(),
          }),
        }),
      }),
    };

    // Mock the db import
    window.db = window.firebase.database();
  });
}

/**
 * Mock media devices for consistent testing
 */
export async function mockMediaDevices(page) {
  await page.addInitScript(() => {
    // Override getUserMedia to provide fake media
    navigator.mediaDevices.getUserMedia = async (constraints) => {
      // Create a canvas for fake video
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');

      // Draw a test pattern
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(0, 0, 640, 480);
      ctx.fillStyle = '#000000';
      ctx.font = '48px Arial';
      ctx.fillText('TEST VIDEO', 200, 240);

      const stream = canvas.captureStream(30);

      if (constraints.audio) {
        // Add fake audio track
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const dest = audioContext.createMediaStreamDestination();
        oscillator.connect(dest);
        oscillator.start();

        const audioTrack = dest.stream.getAudioTracks()[0];
        stream.addTrack(audioTrack);
      }

      return stream;
    };

    // Mock device enumeration
    navigator.mediaDevices.enumerateDevices = async () => [
      {
        deviceId: 'fake-video-1',
        kind: 'videoinput',
        label: 'Fake Camera (Front)',
        groupId: 'fake-group-1',
      },
      {
        deviceId: 'fake-video-2',
        kind: 'videoinput',
        label: 'Fake Camera (Back)',
        groupId: 'fake-group-2',
      },
      {
        deviceId: 'fake-audio-1',
        kind: 'audioinput',
        label: 'Fake Microphone',
        groupId: 'fake-group-3',
      },
    ];
  });
}

/**
 * Test media controls (mute, video toggle, etc.)
 */
export async function testMediaControls(page) {
  // Test mute toggle using hover controls
  await page.locator('#localVideo').hover();

  // Check initial mute state (should be unmuted, showing microphone-slash icon)
  const muteBtn = page.locator('#muteSelfBtn');
  await expect(muteBtn.locator('i')).toHaveClass(/fa-microphone-slash/);

  // Click to mute
  await muteBtn.click();
  await expect(muteBtn.locator('i')).toHaveClass(/fa-microphone/);

  // Click to unmute
  await muteBtn.click();
  await expect(muteBtn.locator('i')).toHaveClass(/fa-microphone-slash/);

  // Test video toggle using hover controls
  const videoBtn = page.locator('#videoSelfBtn');

  // Check initial video state (should be on, showing video icon)
  await expect(videoBtn.locator('i')).toHaveClass(/fa-video/);

  // Click to turn off video
  await videoBtn.click();
  await expect(videoBtn.locator('i')).toHaveClass(/fa-video-slash/);

  // Click to turn on video
  await videoBtn.click();
  await expect(videoBtn.locator('i')).toHaveClass(/fa-video/);
}

/**
 * Clean up after test - hang up and close connections
 */
export async function cleanupConnection(page1, page2) {
  try {
    // Hang up on page1 if available
    if (page1) {
      try {
        const hangUpBtn1 = page1.locator('#hangUp');
        if (
          (await hangUpBtn1.isVisible({ timeout: 2000 })) &&
          (await hangUpBtn1.isEnabled({ timeout: 2000 }))
        ) {
          await hangUpBtn1.click();
        }
      } catch (e) {
        console.warn('Could not hang up on page1:', e.message);
      }
    }

    // Hang up on page2 if available
    if (page2) {
      try {
        const hangUpBtn2 = page2.locator('#hangUp');
        if (
          (await hangUpBtn2.isVisible({ timeout: 2000 })) &&
          (await hangUpBtn2.isEnabled({ timeout: 2000 }))
        ) {
          await hangUpBtn2.click();
        }
      } catch (e) {
        console.warn('Could not hang up on page2:', e.message);
      }
    }

    // Wait for cleanup to complete
    if (page1) await page1.waitForTimeout(1000);
    if (page2) await page2.waitForTimeout(1000);
  } catch (error) {
    console.warn('Cleanup error:', error);
  }
}
