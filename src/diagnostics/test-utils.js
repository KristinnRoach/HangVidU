// src/diagnostics/test-utils.js
// Utilities for property-based testing with fast-check

import * as fc from 'fast-check';

/**
 * Configuration for property-based tests
 * All property tests should run at least 100 iterations
 */
export const PBT_CONFIG = {
  numRuns: 100,
  verbose: false,
};

/**
 * Arbitrary generators for common types used in diagnostics
 */

// Browser types
export const arbitraryBrowserType = () =>
  fc.constantFrom(
    'chrome',
    'firefox',
    'safari',
    'edge',
    'opera',
    'samsung',
    'unknown',
  );

// OS types
export const arbitraryOSType = () =>
  fc.constantFrom('windows', 'macos', 'linux', 'ios', 'android', 'unknown');

// Device types
export const arbitraryDeviceType = () =>
  fc.constantFrom('desktop', 'mobile', 'tablet');

// Notification permission states
export const arbitraryPermissionState = () =>
  fc.constantFrom('granted', 'denied', 'default');

// Service worker states
export const arbitraryServiceWorkerState = () =>
  fc.record({
    registered: fc.boolean(),
    active: fc.boolean(),
    waiting: fc.boolean(),
    installing: fc.boolean(),
    updateAvailable: fc.boolean(),
    registrationTime: fc.option(fc.date(), { nil: undefined }),
    scope: fc.option(fc.webUrl(), { nil: undefined }),
    scriptURL: fc.option(fc.webUrl(), { nil: undefined }),
  });

// FCM token status
export const arbitraryFCMTokenStatus = () =>
  fc.record({
    hasToken: fc.boolean(),
    token: fc.option(fc.hexaString({ minLength: 32, maxLength: 64 }), {
      nil: undefined,
    }),
    tokenGeneratedAt: fc.option(fc.date(), { nil: undefined }),
    tokenSentToBackend: fc.boolean(),
    backendTokenMatches: fc.option(fc.boolean(), { nil: undefined }),
    lastRefreshAttempt: fc.option(fc.date(), { nil: undefined }),
  });

// Platform info
export const arbitraryPlatformInfo = () =>
  fc.record({
    browser: arbitraryBrowserType(),
    browserVersion: fc.stringMatching(/^\d+\.\d+\.\d+$/),
    os: arbitraryOSType(),
    osVersion: fc.stringMatching(/^\d+(\.\d+)?(\.\d+)?$/),
    deviceType: arbitraryDeviceType(),
    isPWA: fc.boolean(),
    isStandalone: fc.boolean(),
  });

// Complete notification system state
export const arbitraryNotificationSystemState = () =>
  fc.record({
    permission: arbitraryPermissionState(),
    serviceWorkerStatus: arbitraryServiceWorkerState(),
    fcmTokenStatus: arbitraryFCMTokenStatus(),
    platformSupport: arbitraryPlatformInfo(),
    lastError: fc.option(
      fc.record({
        code: fc.string(),
        message: fc.string(),
        timestamp: fc.date(),
        context: fc.anything(),
      }),
      { nil: undefined },
    ),
  });

// Error codes
export const arbitraryErrorCode = () =>
  fc.constantFrom(
    'PERMISSION_DENIED',
    'PERMISSION_DISMISSED',
    'SW_REGISTRATION_FAILED',
    'SW_NOT_ACTIVE',
    'SW_UPDATE_FAILED',
    'TOKEN_GENERATION_FAILED',
    'TOKEN_DELIVERY_FAILED',
    'TOKEN_REFRESH_FAILED',
    'PLATFORM_NOT_SUPPORTED',
    'PWA_INSTALL_REQUIRED',
    'NETWORK_ERROR',
    'BACKEND_ERROR',
    'UNKNOWN_ERROR',
  );

// Test result
export const arbitraryTestResult = () =>
  fc.record({
    testName: fc.string(),
    passed: fc.boolean(),
    message: fc.string(),
    details: fc.option(fc.anything(), { nil: undefined }),
    error: fc.option(
      fc.record({
        code: arbitraryErrorCode(),
        message: fc.string(),
        timestamp: fc.date(),
        context: fc.anything(),
      }),
      { nil: undefined },
    ),
  });

/**
 * Helper to tag property tests with feature and property number
 * Usage: tagProperty('fcm-reliability-testing', 1, 'Diagnostic Interface Completeness')
 */
export function tagProperty(feature, propertyNumber, propertyName) {
  return `Feature: ${feature}, Property ${propertyNumber}: ${propertyName}`;
}

/**
 * Helper to run a property test with standard configuration
 * Usage: runPropertyTest(tag, arbitrary, predicate)
 */
export function runPropertyTest(tag, arbitrary, predicate) {
  return fc.assert(fc.property(arbitrary, predicate), {
    ...PBT_CONFIG,
    // Add tag as a comment in test output
    examples: [[tag]],
  });
}
