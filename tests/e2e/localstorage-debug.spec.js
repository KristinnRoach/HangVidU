// tests/e2e/localstorage-debug.spec.js - Debug localStorage issues

import { test, expect } from '@playwright/test';
import {
  mockFirebaseForTesting,
  mockMediaDevices,
  waitForAppReady,
} from '../helpers/test-utils.js';

test.describe('LocalStorage Debug', () => {
  test('should inspect localStorage behavior', async ({ page }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    // Clear localStorage and monitor it
    await page.addInitScript(() => {
      localStorage.clear();

      // Override localStorage methods to log what's happening
      const originalSetItem = localStorage.setItem;
      const originalGetItem = localStorage.getItem;

      localStorage.setItem = function (key, value) {
        console.log('localStorage.setItem:', key, value);
        return originalSetItem.call(this, key, value);
      };

      localStorage.getItem = function (key) {
        const value = originalGetItem.call(this, key);
        console.log('localStorage.getItem:', key, '→', value);
        return value;
      };
    });

    // Capture console logs
    const logs = [];
    page.on('console', (msg) => {
      logs.push(msg.text());
    });

    await page.goto('/');

    // Wait a bit for initialization
    await page.waitForTimeout(3000);

    // Check what's in localStorage
    const localStorageContents = await page.evaluate(() => {
      const contents = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        contents[key] = localStorage.getItem(key);
      }
      return contents;
    });

    console.log('LocalStorage contents:', localStorageContents);
    console.log(
      'Console logs:',
      logs.filter(
        (log) =>
          log.includes('localStorage') ||
          log.includes('Session') ||
          log.includes('restoration') ||
          log.includes('ERROR') ||
          log.includes('Error')
      )
    );

    // Check app state
    const statusText = await page.locator('#status').textContent();
    const startChatVisible = await page.locator('#startChat').isVisible();

    console.log('Status text:', statusText);
    console.log('Start chat visible:', startChatVisible);

    // The test passes if we can see what's happening
    expect(true).toBe(true);
  });

  test('should check localStorage behavior during app lifecycle', async ({
    page,
  }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    // Inject some fake session data to see what happens
    await page.addInitScript(() => {
      const fakeSession = {
        roomId: 'test-room-123',
        isInitiator: true,
        wasConnected: false, // Not connected, so shouldn't restore
        timestamp: Date.now(),
        lastActivity: Date.now() - 1000, // Recent but not connected
      };
      localStorage.setItem('hangvidu_session', JSON.stringify(fakeSession));
    });

    const logs = [];
    page.on('console', (msg) => {
      logs.push(msg.text());
    });

    await page.goto('/');
    await page.waitForTimeout(5000);

    console.log(
      'Logs with fake session data:',
      logs.filter(
        (log) =>
          log.includes('Session') ||
          log.includes('restoration') ||
          log.includes('ERROR') ||
          log.includes('Error') ||
          log.includes('shouldRestore')
      )
    );

    const statusText = await page.locator('#status').textContent();
    console.log('Final status with fake session:', statusText);

    expect(true).toBe(true);
  });
});
