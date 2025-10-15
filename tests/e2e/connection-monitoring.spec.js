// tests/e2e/connection-monitoring.spec.js - Test connection monitoring functionality

import { test, expect } from '@playwright/test';
import { 
  setupTwoPeerConnection, 
  mockFirebaseForTesting, 
  mockMediaDevices, 
  waitForAppReady,
  cleanupConnection 
} from '../helpers/test-utils.js';

test.describe('Connection Monitoring', () => {
  test('should show validation process during connection', async ({ browser }) => {
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
      
      // Should show validation process
      await expect(page1.locator('#status')).toContainText(/received.*stream.*validating|validating/i, { timeout: 10000 });
      await expect(page2.locator('#status')).toContainText(/received.*stream.*validating|validating/i, { timeout: 10000 });
      
      // Wait a bit more to see the validation process
      await page1.waitForTimeout(5000);
      
      // Check final status - should be either success or detected issues
      const page1Status = await page1.locator('#status').textContent();
      const page2Status = await page2.locator('#status').textContent();
      
      console.log('Final statuses:');
      console.log('Page1:', page1Status);
      console.log('Page2:', page2Status);
      
      // The important thing is that we're not immediately showing "Connected!" 
      // without validation
      expect(page1Status).not.toBe('Connected!');
      expect(page2Status).not.toBe('Connected!');
      
      // Should show some kind of validation result
      expect(page1Status.length).toBeGreaterThan(0);
      expect(page2Status.length).toBeGreaterThan(0);
      
    } finally {
      await cleanupConnection(page1, page2);
      await cleanup();
    }
  });

  test('should detect connection state changes', async ({ browser }) => {
    const { page1, cleanup } = await setupTwoPeerConnection(browser);
    
    try {
      await mockFirebaseForTesting(page1);
      await mockMediaDevices(page1);
      
      await page1.goto('/');
      await waitForAppReady(page1);
      
      // Initial state
      await expect(page1.locator('#status')).toContainText(/ready/i);
      
      // Start chat
      await page1.click('#startChat');
      
      // Should show waiting state
      await expect(page1.locator('#status')).toContainText(/ready.*waiting|waiting/i, { timeout: 5000 });
      
      // Link should be available
      await expect(page1.locator('#linkContainer')).toBeVisible();
      const shareLink = await page1.locator('#shareLink').inputValue();
      expect(shareLink).toContain('room=');
      
    } finally {
      await cleanupConnection(page1, null);
      await cleanup();
    }
  });
});