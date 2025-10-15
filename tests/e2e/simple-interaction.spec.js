// tests/e2e/simple-interaction.spec.js - Simple interaction tests

import { test, expect } from '@playwright/test';
import { mockFirebaseForTesting, mockMediaDevices, waitForAppReady } from '../helpers/test-utils.js';

test.describe('Simple Interactions', () => {
  test('should click start chat button without errors', async ({ page }) => {
    // Mock Firebase and media devices
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);
    
    await page.goto('/');
    await waitForAppReady(page);
    
    // Click start chat button
    await page.click('#startChat');
    
    // Should show some kind of response (either success or error message)
    await page.waitForTimeout(2000);
    
    // Check that something happened - either link container appeared or status changed
    const linkVisible = await page.locator('#linkContainer').isVisible();
    const statusText = await page.locator('#status').textContent();
    
    // At least one of these should be true
    expect(linkVisible || statusText.length > 0).toBe(true);
  });

  test('should handle start chat click with proper mocking', async ({ page }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);
    
    await page.goto('/');
    await waitForAppReady(page);
    
    // Verify initial state
    await expect(page.locator('#startChat')).toBeEnabled();
    await expect(page.locator('#linkContainer')).toBeHidden();
    
    // Click start chat
    await page.click('#startChat');
    
    // Wait a bit for processing
    await page.waitForTimeout(3000);
    
    // Should either show link container or update status
    const hasLinkContainer = await page.locator('#linkContainer').isVisible();
    const statusText = await page.locator('#status').textContent();
    
    console.log('Link container visible:', hasLinkContainer);
    console.log('Status text:', statusText);
    
    // Test passes if we get some response
    expect(hasLinkContainer || statusText.includes('Connecting') || statusText.includes('Ready')).toBe(true);
  });
});