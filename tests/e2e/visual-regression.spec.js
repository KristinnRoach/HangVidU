import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for CSS Standardization
 *
 * MVP: Captures screenshots of major UI components to ensure
 * CSS refactoring doesn't introduce visual regressions.
 *
 * ═══════════════════════════════════════════════════════════════
 * UPDATING SNAPSHOTS
 * ═══════════════════════════════════════════════════════════════
 *
 * When visual changes are intentional, update snapshots with:
 *
 *   pnpm test:e2e --update-snapshots
 *
 * Or using the short flag:
 *
 *   pnpm test:e2e -u
 *
 * This will update all screenshot snapshots in this test file.
 * ═══════════════════════════════════════════════════════════════
 */

test.describe('Visual Regression - Lobby', () => {
  test('lobby view - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('#lobby', { state: 'visible' });

    await expect(page).toHaveScreenshot('lobby-mobile.png', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Top Bar', () => {
  test('top bar - desktop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const topBar = page.locator('.top-bar');
    await expect(topBar).toBeVisible();

    await expect(topBar).toHaveScreenshot('top-bar-desktop.png');
  });

  test('top bar - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const topBar = page.locator('.top-bar');
    await expect(topBar).toBeVisible();

    await expect(topBar).toHaveScreenshot('top-bar-mobile.png');
  });
});
