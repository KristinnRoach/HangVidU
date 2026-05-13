/**
 * Call-Flow Import Integration Test
 *
 * Purpose: Verify that current call-flow modules have all required imports and can be loaded.
 * This catches issues like missing 'ref' or 'onDataChange' imports that mocked
 * tests won't catch.
 *
 * This test is intentionally minimal and isolated from DOM dependencies.
 */

import { describe, it, expect, beforeAll } from 'vitest';

describe('Call-Flow Import Integration', () => {
  beforeAll(() => {
    // Browser mode provides native document and window - no mocking needed
  });

  it('call-flow modules can be imported without ReferenceErrors', async () => {
    let importError = null;

    try {
      await Promise.all([
        import('../../src/features/call/useCallFlow.js'),
        import('../../src/features/call/call-room.js'),
        import('../../src/features/call/call-notifications.js'),
        import('../../src/features/call/call-command-handlers.js'),
        import('../../src/features/call/call-types.js'),
      ]);
    } catch (error) {
      importError = error;
    }

    // Should not have import errors like "ref is not defined"
    if (importError) {
      expect(importError.message).not.toMatch(/is not defined/);
      expect(importError.message).not.toMatch(/Cannot find module/);
    }
  });

  it('useCallFlow function exists', async () => {
    const { useCallFlow } = await import('../../src/features/call/useCallFlow.js');

    expect(useCallFlow).toBeDefined();
    expect(typeof useCallFlow).toBe('function');
  });

  it('extracted call helpers exist', async () => {
    const { joinCallRoom } = await import('../../src/features/call/call-room.js');
    const { sendIncomingCallNotification, sendMissedCallNotification } =
      await import('../../src/features/call/call-notifications.js');
    const { registerCallCommandHandlers } = await import(
      '../../src/features/call/call-command-handlers.js'
    );

    expect(typeof joinCallRoom).toBe('function');
    expect(typeof sendIncomingCallNotification).toBe('function');
    expect(typeof sendMissedCallNotification).toBe('function');
    expect(typeof registerCallCommandHandlers).toBe('function');
  });
});
