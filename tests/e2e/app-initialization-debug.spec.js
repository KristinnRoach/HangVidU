// tests/e2e/app-initialization-debug.spec.js - Debug app initialization

import { test, expect } from '@playwright/test';
import {
  mockFirebaseForTesting,
  mockMediaDevices,
} from '../helpers/test-utils.js';

test.describe('App Initialization Debug', () => {
  test('should capture all console logs and errors', async ({ page }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    // Capture all console messages
    const logs = [];
    const errors = [];

    page.on('console', (msg) => {
      logs.push(`[${msg.type()}] ${msg.text()}`);
    });

    page.on('pageerror', (error) => {
      errors.push(error.toString());
    });

    await page.goto('/');

    // Wait for initialization
    await page.waitForTimeout(5000);

    // Check if init function was called
    const initCalled = await page.evaluate(() => {
      return window.isInitialized || false;
    });

    // Check status element
    const statusExists = await page.locator('#status').count();
    const statusText = await page.locator('#status').textContent();
    const statusVisible = await page.locator('#status').isVisible();

    console.log('=== INITIALIZATION DEBUG ===');
    console.log('Init called:', initCalled);
    console.log('Status element exists:', statusExists > 0);
    console.log('Status visible:', statusVisible);
    console.log('Status text:', `"${statusText}"`);
    console.log('');
    console.log('=== ERRORS ===');
    errors.forEach((error) => console.log('ERROR:', error));
    console.log('');
    console.log('=== CONSOLE LOGS ===');
    logs.forEach((log) => console.log(log));

    // The test passes - we just want to see the debug info
    expect(true).toBe(true);
  });

  test('should check if updateStatus function works', async ({ page }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    await page.goto('/');
    await page.waitForTimeout(2000);

    // Try to call updateStatus directly
    const updateStatusResult = await page.evaluate(() => {
      try {
        // Check if updateStatus function exists
        if (typeof window.updateStatus === 'function') {
          window.updateStatus('Test message from debug');
          return { success: true, message: 'updateStatus called' };
        } else {
          return { success: false, message: 'updateStatus function not found' };
        }
      } catch (error) {
        return { success: false, message: error.toString() };
      }
    });

    console.log('UpdateStatus result:', updateStatusResult);

    // Check if the message appeared
    const statusText = await page.locator('#status').textContent();
    console.log('Status after manual update:', `"${statusText}"`);

    expect(true).toBe(true);
  });
});
