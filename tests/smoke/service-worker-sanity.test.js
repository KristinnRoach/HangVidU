// tests/smoke/service-worker-sanity.test.js
// Automated sanity checks for service worker configuration and environment

import { test, expect, describe } from 'vitest';

/**
 * Service Worker Sanity Checks
 *
 * These tests verify the service worker environment is correctly configured
 * before attempting manual testing. They catch common configuration issues.
 *
 * Run: pnpm test:smoke
 * Time: ~5 seconds
 */

describe('Service Worker Environment Sanity Checks', () => {
  test('service worker API is available', () => {
    expect('serviceWorker' in navigator).toBe(true);
  });

  test('Notification API is available', () => {
    expect('Notification' in window).toBe(true);
  });

  test('HTTPS is enabled (required for service workers)', () => {
    // In test environment, this might be http, but we document the requirement
    const isSecure =
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost';
    expect(isSecure).toBe(true);
  });

  test('Firebase config is loaded', () => {
    expect(import.meta.env.VITE_FIREBASE_API_KEY).toBeDefined();
    expect(import.meta.env.VITE_FIREBASE_PROJECT_ID).toBeDefined();
    expect(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID).toBeDefined();
  });

  test('FCM VAPID key is configured', () => {
    expect(import.meta.env.VITE_FCM_VAPID_KEY).toBeDefined();
    expect(import.meta.env.VITE_FCM_VAPID_KEY).not.toBe('');
  });

  test('base URL is configured correctly', () => {
    const baseUrl = import.meta.env.BASE_URL;
    expect(baseUrl).toBeDefined();
    // Firebase Hosting is the only production target
    expect(baseUrl).toBe('/');
  });
});

describe('Service Worker Configuration Validation', () => {
  test('service worker file path is correct', () => {
    // The SW should be at /sw.js relative to base URL
    const baseUrl = import.meta.env.BASE_URL;
    const expectedPath = `${baseUrl}sw.js`.replace('//', '/');

    // We can't check if file exists in unit test, but we can validate the path format
    expect(expectedPath).toMatch(/^\/.*sw\.js$/);
  });

  test('Firebase config values are not placeholder values', () => {
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

    // Check they're not the example placeholder values
    expect(apiKey).not.toContain('your_api_key');
    expect(apiKey).not.toContain('your-project');
    expect(projectId).not.toContain('your-project');
  });

  test('VAPID key is not placeholder value', () => {
    const vapidKey = import.meta.env.VITE_FCM_VAPID_KEY;

    expect(vapidKey).not.toContain('your_vapid_key');
    expect(vapidKey.length).toBeGreaterThan(50); // Real VAPID keys are long
  });
});
