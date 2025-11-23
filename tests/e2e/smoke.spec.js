import { test, expect } from '@playwright/test';

/**
 * MINIMAL Smoke Tests
 *
 * These tests verify core functionality works after refactoring.
 * They are NOT comprehensive - they catch critical breakage only.
 *
 * What we test:
 * - App loads without errors
 * - Critical DOM elements are present
 * - UI is interactive (buttons enabled, elements attached)
 *
 * What we DON'T test:
 * - Full user flows (require auth/WebRTC setup)
 * - Multi-user scenarios
 * - Actual call connections
 *
 * Run: pnpm exec playwright test smoke.spec.js
 * Debug: pnpm exec playwright test smoke.spec.js --ui
 * Time: ~3 seconds
 */

test.describe('Core Functionality Smoke Tests', () => {
  test('app loads and shows lobby', async ({ page }) => {
    await page.goto('/');

    // Verify lobby is visible
    await expect(page.locator('#lobby')).toBeVisible();
    await expect(page.locator('#lobby-call-btn')).toBeVisible();

    // Verify top bar loaded
    await expect(page.locator('.top-bar')).toBeVisible();
  });

  test('UI elements are present and interactive', async ({ page }) => {
    await page.goto('/');

    // Verify key interactive elements exist
    await expect(page.locator('#lobby-call-btn')).toBeEnabled();
    await expect(page.locator('#chat-controls')).toBeAttached();

    // Verify call button is clickable (don't actually click - may require auth)
    const callBtn = page.locator('#lobby-call-btn');
    await expect(callBtn).not.toBeDisabled();
  });

  test('watch mode keyboard handler exists', async ({ page }) => {
    await page.goto('/');

    // Verify chat controls exist (watch mode target)
    const chatControls = page.locator('#chat-controls');
    await expect(chatControls).toBeAttached();

    // Verify it doesn't have watch-mode class initially
    await expect(chatControls).not.toHaveClass(/watch-mode/);

    // Note: Actually triggering watch mode requires media permissions
    // and proper initialization, so we just verify the elements exist
  });
});
