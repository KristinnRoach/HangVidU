// tests/e2e/media-controls.spec.js - Media control functionality tests

import { test, expect } from '@playwright/test';
import { 
  setupTwoPeerConnection, 
  createVideoConnection, 
  cleanupConnection,
  mockMediaDevices,
  mockFirebaseForTesting 
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
      
      // Initial state should be unmuted
      await expect(page1.locator('#toggleMute')).toContainText('Mute');
      
      // Toggle mute
      await page1.click('#toggleMute');
      await expect(page1.locator('#toggleMute')).toContainText('Unmute');
      
      // Toggle back to unmuted
      await page1.click('#toggleMute');
      await expect(page1.locator('#toggleMute')).toContainText('Mute');
      
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
      
      // Initial state should be video on
      await expect(page1.locator('#toggleVideo')).toContainText('Turn Video Off');
      
      // Toggle video off
      await page1.click('#toggleVideo');
      await expect(page1.locator('#toggleVideo')).toContainText('Turn Video On');
      
      // Toggle back to video on
      await page1.click('#toggleVideo');
      await expect(page1.locator('#toggleVideo')).toContainText('Turn Video Off');
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should show camera switch button when multiple cameras available', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      
      await page1.goto('/');
      await page1.click('#startChat');
      
      // Wait for media initialization
      await expect(page1.locator('#linkContainer')).toBeVisible();
      
      // Switch camera button should be visible (mocked devices include multiple cameras)
      await expect(page1.locator('#switchCameraBtn')).toBeVisible();
      
      // Click should not cause errors
      await page1.click('#switchCameraBtn');
      await page1.waitForTimeout(1000); // Allow time for camera switch
      
    } finally {
      await cleanupConnection(page1, null);
      await cleanup();
    }
  });

  test('should enable PiP button when remote video is available', async ({ browser }) => {
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
      await expect(localVideoWrapper.locator('#fullscreenSelfBtn')).toBeVisible();
      
      // Test mute button in hover controls
      await localVideoWrapper.locator('#muteSelfBtn').click();
      
      // Should affect main mute button state
      await expect(page1.locator('#toggleMute')).toContainText('Unmute');
      
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
      await expect(page1.locator('#status')).toContainText(/permission|denied|error/i, { timeout: 10000 });
      
    } finally {
      await cleanup();
    }
  });

  test('should persist media state across page interactions', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      
      await page1.goto('/');
      await page1.click('#startChat');
      await expect(page1.locator('#linkContainer')).toBeVisible();
      
      // Mute audio
      await page1.click('#toggleMute');
      await expect(page1.locator('#toggleMute')).toContainText('Unmute');
      
      // Turn off video
      await page1.click('#toggleVideo');
      await expect(page1.locator('#toggleVideo')).toContainText('Turn Video On');
      
      // State should persist during other interactions
      await page1.click('#copyLink');
      
      // Media state should still be the same
      await expect(page1.locator('#toggleMute')).toContainText('Unmute');
      await expect(page1.locator('#toggleVideo')).toContainText('Turn Video On');
      
    } finally {
      await cleanupConnection(page1, null);
      await cleanup();
    }
  });
});