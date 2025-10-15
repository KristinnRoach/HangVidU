// tests/e2e/basic-smoke.spec.js - Simple smoke tests

import { test, expect } from '@playwright/test';

test.describe('Basic Smoke Tests', () => {
  test('should load the page and show basic elements', async ({ page }) => {
    // Just navigate to the page
    await page.goto('/');
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/HangVidU/);
    
    // Check if basic elements exist
    await expect(page.locator('h1')).toContainText('HangVidU');
    await expect(page.locator('#startChat')).toBeVisible();
    await expect(page.locator('#status')).toBeVisible();
  });

  test('should have the correct page structure', async ({ page }) => {
    await page.goto('/');
    
    // Check for main containers
    await expect(page.locator('.container')).toBeVisible();
    await expect(page.locator('.video-container')).toBeVisible();
    await expect(page.locator('.chat-controls')).toBeVisible();
    
    // Check for video elements
    await expect(page.locator('#localVideo')).toBeVisible();
    await expect(page.locator('#remoteVideo')).toBeVisible();
  });

  test('should show initial status message', async ({ page }) => {
    await page.goto('/');
    
    // Should show ready message initially
    await expect(page.locator('#status')).toContainText(/ready/i, { timeout: 5000 });
  });

  test('should have start chat button enabled initially', async ({ page }) => {
    await page.goto('/');
    
    // Start chat button should be enabled
    await expect(page.locator('#startChat')).toBeEnabled();
    await expect(page.locator('#startChat')).toContainText('Start New Chat');
  });
});