// tests/e2e/service-worker-registration.spec.js
// E2E tests for service worker registration and configuration

import { test, expect } from '@playwright/test';

/**
 * Service Worker Registration Tests
 *
 * These tests verify that:
 * 1. Exactly ONE service worker is registered
 * 2. It's the correct service worker (sw.js, not dev-sw.js)
 * 3. It's in the correct scope
 * 4. It's active and running
 *
 * IMPORTANT: These tests require PWA to be enabled
 * The dev server must be started with DISABLE_PWA=0
 *
 * Run: pnpm test:e2e
 * Time: ~10 seconds
 */

test.describe('Service Worker Registration', () => {
  test('exactly one service worker is registered', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Get all registered service workers
    const registrations = await page.evaluate(async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      return regs.map((reg) => ({
        scope: reg.scope,
        active: reg.active
          ? {
              scriptURL: reg.active.scriptURL,
              state: reg.active.state,
            }
          : null,
        installing: reg.installing
          ? {
              scriptURL: reg.installing.scriptURL,
              state: reg.installing.state,
            }
          : null,
        waiting: reg.waiting
          ? {
              scriptURL: reg.waiting.scriptURL,
              state: reg.waiting.state,
            }
          : null,
      }));
    });

    // Log for debugging
    console.log(
      'Service Worker Registrations:',
      JSON.stringify(registrations, null, 2),
    );

    // Should have exactly 1 registration
    expect(registrations.length).toBe(1);
  });

  test('service worker is the production sw.js (not dev-sw.js)', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for service worker to be ready
    const swInfo = await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      return {
        scriptURL: reg.active?.scriptURL || null,
        state: reg.active?.state || null,
        scope: reg.scope,
      };
    });

    console.log('Service Worker Info:', swInfo);

    // Should be sw.js, not dev-sw.js
    expect(swInfo.scriptURL).toContain('sw.js');
    expect(swInfo.scriptURL).not.toContain('dev-sw.js');

    // Should be activated
    expect(swInfo.state).toBe('activated');
  });

  test('service worker scope is correct', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const scope = await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      return reg.scope;
    });

    console.log('Service Worker Scope:', scope);

    // Scope should be root-scoped for both local and Firebase Hosting deployments
    expect(scope).toMatch(/\/$/);
    expect(scope).not.toContain('/HangVidU/');
  });

  test('service worker is controlling the page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const isControlled = await page.evaluate(() => {
      return navigator.serviceWorker.controller !== null;
    });

    // First load might not be controlled, so we reload
    if (!isControlled) {
      await page.reload();
      await page.waitForLoadState('networkidle');
    }

    const isControlledAfterReload = await page.evaluate(() => {
      return navigator.serviceWorker.controller !== null;
    });

    expect(isControlledAfterReload).toBe(true);
  });

  test('service worker responds to messages', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Send a message to the service worker and wait for response
    const response = await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;

      return new Promise((resolve) => {
        const messageChannel = new MessageChannel();

        messageChannel.port1.onmessage = (event) => {
          resolve(event.data);
        };

        reg.active.postMessage({ type: 'GET_VERSION' }, [messageChannel.port2]);

        // Timeout after 5 seconds
        setTimeout(() => resolve({ error: 'timeout' }), 5000);
      });
    });

    console.log('Service Worker Response:', response);

    // Should receive a version response
    expect(response).toHaveProperty('version');
    expect(response).toHaveProperty('timestamp');
    expect(response.error).toBeUndefined();
  });
});

test.describe('Service Worker Environment Checks', () => {
  test('HTTPS is enabled', async ({ page }) => {
    await page.goto('/');

    const protocol = await page.evaluate(() => window.location.protocol);

    // Should be https: (or http: for localhost in dev)
    expect(['https:', 'http:']).toContain(protocol);

    // If http:, must be localhost
    if (protocol === 'http:') {
      const hostname = await page.evaluate(() => window.location.hostname);
      expect(hostname).toBe('localhost');
    }
  });

  test('service worker API is available', async ({ page }) => {
    await page.goto('/');

    const isAvailable = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });

    expect(isAvailable).toBe(true);
  });

  test('Notification API is available', async ({ page }) => {
    await page.goto('/');

    const isAvailable = await page.evaluate(() => {
      return 'Notification' in window;
    });

    expect(isAvailable).toBe(true);
  });
});
