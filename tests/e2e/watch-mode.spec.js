// tests/e2e/watch-mode.spec.js - Watch together mode tests

import { test, expect } from '@playwright/test';
import { 
  setupTwoPeerConnection, 
  createVideoConnection, 
  switchToWatchMode,
  loadAndSyncVideo,
  cleanupConnection,
  mockMediaDevices 
} from '../helpers/test-utils.js';

test.describe('Watch Together Mode', () => {
  test('should switch to watch mode successfully', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);
      
      await createVideoConnection(page1, page2);
      await switchToWatchMode(page1, page2);
      
      // Verify toggle button text changed
      await expect(page1.locator('#toggleMode')).toContainText('Switch to Video Chat');
      await expect(page2.locator('#toggleMode')).toContainText('Switch to Video Chat');
      
      // Verify watch controls are visible
      await expect(page1.locator('#streamUrl')).toBeVisible();
      await expect(page1.locator('#loadStream')).toBeVisible();
      await expect(page2.locator('#streamUrl')).toBeVisible();
      await expect(page2.locator('#loadStream')).toBeVisible();
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should sync YouTube video URL between peers', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);
      
      await createVideoConnection(page1, page2);
      await switchToWatchMode(page1, page2);
      
      const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      await loadAndSyncVideo(page1, page2, testUrl);
      
      // Verify shared video element is visible on both pages
      await expect(page1.locator('#sharedVideo')).toBeVisible();
      await expect(page2.locator('#sharedVideo')).toBeVisible();
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should sync direct video URL between peers', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);
      
      await createVideoConnection(page1, page2);
      await switchToWatchMode(page1, page2);
      
      // Use a sample video URL (this won't actually load in tests, but should sync)
      const testUrl = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
      await loadAndSyncVideo(page1, page2, testUrl);
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should switch back to video chat mode', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);
      
      await createVideoConnection(page1, page2);
      await switchToWatchMode(page1, page2);
      
      // Switch back to video chat
      await page1.click('#toggleMode');
      await page2.click('#toggleMode');
      
      // Verify video containers are visible again
      await expect(page1.locator('.video-container')).toBeVisible();
      await expect(page2.locator('.video-container')).toBeVisible();
      
      // Verify watch containers are hidden
      await expect(page1.locator('#watchContainer')).toBeHidden();
      await expect(page2.locator('#watchContainer')).toBeHidden();
      
      // Verify toggle button text changed back
      await expect(page1.locator('#toggleMode')).toContainText('Switch to Watch Mode');
      await expect(page2.locator('#toggleMode')).toContainText('Switch to Watch Mode');
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should handle invalid video URLs gracefully', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);
      
      await createVideoConnection(page1, page2);
      await switchToWatchMode(page1, page2);
      
      // Try invalid URL
      const invalidUrl = 'not-a-valid-url';
      await page1.fill('#streamUrl', invalidUrl);
      await page1.click('#loadStream');
      
      // Should show error or remain in waiting state
      await expect(page1.locator('#syncStatus')).toContainText(/error|invalid|waiting/i, { timeout: 5000 });
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should clear video URL when switching modes', async ({ browser }) => {
    const { page1, page2, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockMediaDevices(page1);
      await mockMediaDevices(page2);
      
      await createVideoConnection(page1, page2);
      await switchToWatchMode(page1, page2);
      
      // Load a video
      const testUrl = 'https://www.youtube.com/watch?v=test123';
      await page1.fill('#streamUrl', testUrl);
      await page1.click('#loadStream');
      
      // Switch back to video chat
      await page1.click('#toggleMode');
      
      // Switch to watch mode again
      await page1.click('#toggleMode');
      
      // URL should be cleared
      await expect(page1.locator('#streamUrl')).toHaveValue('');
      await expect(page1.locator('#syncStatus')).toContainText('Waiting for video');
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });
});