/**
 * Call-Flow Import Integration Test
 *
 * Purpose: Verify that call-flow.js has all required imports and can be loaded.
 * This catches issues like missing 'ref' or 'onDataChange' imports that mocked
 * tests won't catch.
 *
 * This test is intentionally minimal and isolated from DOM dependencies.
 */

import { describe, it, expect, beforeAll } from 'vitest';

describe('Call-Flow Import Integration', () => {
  beforeAll(() => {
    // Mock DOM elements that main.js tries to access
    global.document = {
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement: () => ({}),
      body: { appendChild: () => {} },
    };
    global.window = {
      location: { origin: 'http://localhost', pathname: '/' },
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  });

  it('call-flow.js can be imported without ReferenceErrors', async () => {
    let importError = null;

    try {
      // Import call-flow - if imports like 'ref' are missing, this will throw ReferenceError
      await import('../../src/webrtc/call-flow.js');
    } catch (error) {
      importError = error;
    }

    // Should not have import errors like "ref is not defined"
    if (importError) {
      expect(importError.message).not.toMatch(/is not defined/);
      expect(importError.message).not.toMatch(/Cannot find module/);
    }
  });

  it('createCall function exists and is callable', async () => {
    const { createCall } = await import('../../src/webrtc/call-flow.js');

    expect(createCall).toBeDefined();
    expect(typeof createCall).toBe('function');

    // Call with invalid input to test it doesn't throw import errors
    const result = await createCall({ localStream: null });

    expect(result).toBeDefined();
    expect(result.success).toBe(false);
  });

  it('answerCall function exists and is callable', async () => {
    const { answerCall } = await import('../../src/webrtc/call-flow.js');

    expect(answerCall).toBeDefined();
    expect(typeof answerCall).toBe('function');

    // Call with invalid input to test it doesn't throw import errors
    const result = await answerCall({ localStream: null });

    expect(result).toBeDefined();
    expect(result.success).toBe(false);
  });
});
