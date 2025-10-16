// tests/unit/state-deep-merge.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { updateState, getState } from '../../src/app/state.js';

describe('State Deep Merge', () => {
  beforeEach(() => {
    // Reset state to initial values
    updateState({
      room: {
        id: null,
        role: null,
        partnerOnline: false,
      },
    });
  });

  it('should perform deep merge for nested objects', () => {
    const initialState = getState();

    // Verify initial state
    expect(initialState.room).toEqual({
      id: null,
      role: null,
      partnerOnline: false,
    });

    // Update only one property of room
    updateState({
      room: {
        id: 'test-room-123',
      },
    });

    const updatedState = getState();

    // Should preserve other room properties
    expect(updatedState.room).toEqual({
      id: 'test-room-123',
      role: null,
      partnerOnline: false,
    });
  });

  it('should handle multiple nested object updates', () => {
    // Update nested objects
    updateState({
      room: {
        id: 'room-123',
        role: 'initiator',
      },
    });

    const state = getState();

    // Room should have merged properties
    expect(state.room).toEqual({
      id: 'room-123',
      role: 'initiator',
      partnerOnline: false, // preserved
    });
  });

  it('should replace primitive values completely', () => {
    updateState({
      testPrimitive: 'test-value',
    });

    const state = getState();
    expect(state.testPrimitive).toBe('test-value');
  });

  it('should handle null values correctly', () => {
    updateState({
      room: null,
    });

    const state = getState();
    expect(state.room).toBe(null);
  });

  it('should handle arrays correctly (replace, not merge)', () => {
    // First set an array
    updateState({
      testArray: [1, 2, 3],
    });

    // Then replace it
    updateState({
      testArray: [4, 5],
    });

    const state = getState();
    expect(state.testArray).toEqual([4, 5]);
  });
});
