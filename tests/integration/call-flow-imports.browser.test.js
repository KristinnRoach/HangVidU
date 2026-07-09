/**
 * Call Import Integration Test
 *
 * Purpose: Verify that current call-flow modules have all required imports and can be loaded.
 * This catches issues like missing 'ref' or 'onDataChange' imports that mocked
 * tests won't catch.
 *
 * This test is intentionally minimal and isolated from DOM dependencies.
 */

import { describe, it, expect, beforeAll } from 'vite-plus/test';

describe('Call Import Integration', () => {
  beforeAll(() => {
    // Browser mode provides native document and window - no mocking needed
  });

  it('call modules can be imported without ReferenceErrors', async () => {
    let importError = null;

    try {
      await Promise.all([
        import('../../src/features/call/call-handshake.tsx'),
        import('../../src/features/call/call-handshake-controller.ts'),
        import('../../src/features/call/call-types.ts'),
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

  it('call handshake context exports exist', async () => {
    const { CallHandshakeProvider, useCallHandshake } =
      await import('../../src/features/call/call-handshake.tsx');

    expect(typeof CallHandshakeProvider).toBe('function');
    expect(typeof useCallHandshake).toBe('function');
  });

  it('call handshake controller exists', async () => {
    const { CallHandshakeController } =
      await import('../../src/features/call/call-handshake-controller.ts');

    expect(typeof CallHandshakeController).toBe('function');
  });
});
