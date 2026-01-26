// src/diagnostics/test-utils.test.js
// Tests to verify property-based testing setup

import { describe, test, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  PBT_CONFIG,
  arbitraryBrowserType,
  arbitraryOSType,
  arbitraryDeviceType,
  arbitraryPermissionState,
  arbitraryNotificationSystemState,
  tagProperty,
} from './test-utils.js';

describe('Property-Based Testing Setup', () => {
  test('fast-check is installed and working', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return typeof n === 'number';
      }),
      { numRuns: 10 },
    );
  });

  test('PBT_CONFIG has correct structure', () => {
    expect(PBT_CONFIG).toHaveProperty('numRuns');
    expect(PBT_CONFIG.numRuns).toBeGreaterThanOrEqual(100);
  });

  test('arbitraryBrowserType generates valid browser types', () => {
    fc.assert(
      fc.property(arbitraryBrowserType(), (browser) => {
        const validBrowsers = [
          'chrome',
          'firefox',
          'safari',
          'edge',
          'opera',
          'samsung',
          'unknown',
        ];
        return validBrowsers.includes(browser);
      }),
      { numRuns: 50 },
    );
  });

  test('arbitraryOSType generates valid OS types', () => {
    fc.assert(
      fc.property(arbitraryOSType(), (os) => {
        const validOSes = [
          'windows',
          'macos',
          'linux',
          'ios',
          'android',
          'unknown',
        ];
        return validOSes.includes(os);
      }),
      { numRuns: 50 },
    );
  });

  test('arbitraryDeviceType generates valid device types', () => {
    fc.assert(
      fc.property(arbitraryDeviceType(), (device) => {
        const validDevices = ['desktop', 'mobile', 'tablet'];
        return validDevices.includes(device);
      }),
      { numRuns: 50 },
    );
  });

  test('arbitraryPermissionState generates valid permission states', () => {
    fc.assert(
      fc.property(arbitraryPermissionState(), (permission) => {
        const validStates = ['granted', 'denied', 'default'];
        return validStates.includes(permission);
      }),
      { numRuns: 50 },
    );
  });

  test('arbitraryNotificationSystemState generates complete state objects', () => {
    fc.assert(
      fc.property(arbitraryNotificationSystemState(), (state) => {
        // Verify all required properties exist
        expect(state).toHaveProperty('permission');
        expect(state).toHaveProperty('serviceWorkerStatus');
        expect(state).toHaveProperty('fcmTokenStatus');
        expect(state).toHaveProperty('platformSupport');

        // Verify nested structures
        expect(state.serviceWorkerStatus).toHaveProperty('registered');
        expect(state.fcmTokenStatus).toHaveProperty('hasToken');
        expect(state.platformSupport).toHaveProperty('browser');

        return true;
      }),
      { numRuns: 50 },
    );
  });

  test('tagProperty creates correct tag format', () => {
    const tag = tagProperty('fcm-reliability-testing', 1, 'Test Property');
    expect(tag).toBe(
      'Feature: fcm-reliability-testing, Property 1: Test Property',
    );
  });
});
