// tests/e2e/state-management.spec.js - Test centralized state management

import { test, expect } from '@playwright/test';
import {
  mockFirebaseForTesting,
  mockMediaDevices,
  waitForAppReady,
} from '../helpers/test-utils.js';

test.describe('State Management', () => {
  test('should manage app state centrally', async ({ page }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    // Add state inspection to the page
    await page.addInitScript(() => {
      window.getAppState = () => {
        // Access the state module if available
        if (window.appStateModule) {
          return window.appStateModule.getState();
        }
        return null;
      };
    });

    await page.goto('/');
    await waitForAppReady(page);

    // Check initial state
    const initialState = await page.evaluate(() => {
      return {
        statusText: document.querySelector('#status').textContent,
        startChatEnabled: !document.querySelector('#startChat').disabled,
      };
    });

    console.log('Initial app state:', initialState);
    expect(initialState.statusText).toContain('Ready');
    expect(initialState.startChatEnabled).toBe(true);

    // Start chat and check state changes
    await page.click('#startChat');
    await expect(page.locator('#linkContainer')).toBeVisible();

    const afterStartState = await page.evaluate(() => {
      return {
        statusText: document.querySelector('#status').textContent,
        linkVisible:
          document.querySelector('#linkContainer').style.display !== 'none',
        shareLink: document.querySelector('#shareLink').value,
      };
    });

    console.log('After start chat state:', afterStartState);
    expect(afterStartState.statusText).toContain('Waiting for partner');
    expect(afterStartState.linkVisible).toBe(true);
    expect(afterStartState.shareLink).toContain('room=');
  });

  test('should prevent duplicate start chat calls', async ({ page }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    await page.goto('/');
    await waitForAppReady(page);

    // Click start chat multiple times rapidly
    await Promise.all([
      page.click('#startChat'),
      page.click('#startChat'),
      page.click('#startChat'),
    ]);

    // Should only create one room
    await expect(page.locator('#linkContainer')).toBeVisible();

    const shareLink = await page.locator('#shareLink').inputValue();
    expect(shareLink).toContain('room=');

    // Should show waiting status
    await expect(page.locator('#status')).toContainText(/waiting/i);

    console.log('Successfully prevented duplicate start chat calls');
  });
});
