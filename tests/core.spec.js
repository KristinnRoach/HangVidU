import { test, expect } from '@playwright/test';

test.describe('Core Functionality', () => {
  
  test('Room creation generates shareable link', async ({ page }) => {
    // TESTS: Firebase room creation, link generation, UI state
    // DOES NOT TEST: Actual WebRTC connection
    
    // Mock getUserMedia before navigation
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const stream = canvas.captureStream();
        stream.addTrack(stream.getVideoTracks()[0]);
        return stream;
      };
    });
    
    await page.goto('/');
    
    // Wait for app to initialize
    await page.waitForSelector('#startChat:not([disabled])', { timeout: 15000 });
    
    await page.click('#startChat');
    
    // Verify link container appears with valid room ID
    await expect(page.locator('#linkContainer')).toBeVisible({ timeout: 10000 });
    const link = await page.locator('#shareLink').inputValue();
    expect(link).toMatch(/\?room=[a-z0-9]+$/);
    
    // Verify button states changed
    await expect(page.locator('#startChat')).toBeDisabled();
    await expect(page.locator('#hangUp')).toBeEnabled();
  });

  test('Watch mode: video URL syncs between users', async ({ browser }) => {
    // TESTS: Firebase realtime sync for watch-together
    // DOES NOT TEST: Video playback or WebRTC
    
    const contextA = await browser.newContext();
    const contextB = await browser.newContext();
    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();
    
    // Mock getUserMedia for both with proper stream
    const mockScript = () => {
      navigator.mediaDevices.getUserMedia = async () => {
        const canvas = document.createElement('canvas');
        const stream = canvas.captureStream();
        return stream;
      };
    };
    await pageA.addInitScript(mockScript);
    await pageB.addInitScript(mockScript);
    
    // Person A creates room
    await pageA.goto('/');
    await pageA.waitForSelector('#startChat:not([disabled])', { timeout: 15000 });
    await pageA.click('#startChat');
    const link = await pageA.locator('#shareLink').inputValue();
    
    // Person B joins
    await pageB.goto(link);
    
    // Both switch to watch mode
    await pageA.click('#toggleMode');
    await pageB.click('#toggleMode');
    
    // Person A shares a video URL
    const testUrl = 'https://example.com/test.mp4';
    await pageA.fill('#streamUrl', testUrl);
    await pageA.click('#loadStream');
    
    // Person B should receive the URL via Firebase
    await expect(pageB.locator('#streamUrl')).toHaveValue(testUrl, { timeout: 5000 });
    await expect(pageB.locator('#syncStatus')).toContainText('Partner shared a video');
    
    await contextA.close();
    await contextB.close();
  });
  
  test('Hang up cleans up UI state', async ({ page }) => {
    // TESTS: Cleanup logic, button state reset
    // DOES NOT TEST: Firebase cleanup, peer connection teardown
    
    // Mock getUserMedia before navigation
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => {
        const canvas = document.createElement('canvas');
        const stream = canvas.captureStream();
        return stream;
      };
    });
    
    await page.goto('/');
    
    // Wait for app to initialize
    await page.waitForSelector('#startChat:not([disabled])', { timeout: 15000 });
    
    // Create room
    await page.click('#startChat');
    await expect(page.locator('#linkContainer')).toBeVisible();
    
    // Hang up
    await page.click('#hangUp');
    
    // Verify UI reset
    await expect(page.locator('#linkContainer')).toBeHidden();
    await expect(page.locator('#startChat')).toBeVisible();
    await expect(page.locator('#startChat')).toBeEnabled();
    await expect(page.locator('#status')).toContainText('Disconnected');
  });
});
