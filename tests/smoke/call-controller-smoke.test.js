/**
 * CallController Browser Smoke Tests
 *
 * Purpose: Fast, minimal tests to verify core CallController functionality
 * before and after each refactor step. These tests focus on:
 * 1. Happy path lifecycle (create, answer, hangup, cleanup)
 * 2. Idempotency (duplicate calls don't cause issues)
 * 3. Event emission (correct events fire at correct times)
 *
 * Run with: pnpm test:smoke
 * Expected runtime: < 5 seconds
 *
 * NOTE: Keep these tests MINIMAL. Do not test edge cases or error scenarios.
 * The goal is quick verification that core functionality works.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies
vi.mock('../../src/webrtc/call-flow.js', () => {
  return {
    createCall: vi.fn(),
    answerCall: vi.fn(),
  };
});

vi.mock('../../src/room.js', () => {
  return {
    default: {
      cancelCall: vi.fn(),
      leaveRoom: vi.fn(),
      onMemberJoined: vi.fn(),
      onMemberLeft: vi.fn(),
    },
  };
});

vi.mock('../../src/auth/auth-state.js', () => {
  return {
    getUserId: () => 'test-user-id',
    getUser: () => ({ uid: 'test-user-id' }),
    getIsLoggedIn: () => true,
    getLoggedInUserId: () => 'test-user-id',
    subscribe: vi.fn(() => () => {}),
  };
});

vi.mock('../../src/webrtc/data-connection.js', () => {
  return {
    createDataConnection: vi.fn(() =>
      Promise.resolve({
        pc: { close: vi.fn() },
        dataChannel: { addEventListener: vi.fn(), readyState: 'open' },
      }),
    ),
    joinDataConnection: vi.fn(() =>
      Promise.resolve({
        pc: { close: vi.fn(), ondatachannel: null },
        dataChannel: { addEventListener: vi.fn(), readyState: 'open' },
      }),
    ),
    closeDataConnection: vi.fn(),
  };
});

import CallController from '../../src/webrtc/call-controller.js';
import {
  createCall as createCallFlow,
  answerCall as answerCallFlow,
} from '../../src/webrtc/call-flow.js';
import RoomService from '../../src/room.js';

describe('CallController Smoke Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    CallController.resetState();
  });

  afterEach(() => {
    CallController.resetState();
  });

  // ============================================================================
  // LIFECYCLE TESTS - Happy Path Only
  // ============================================================================

  describe('Core Lifecycle', () => {
    it('createCall returns success and emits created event', async () => {
      const mockResult = {
        success: true,
        pc: { id: 'pc1' },
        roomId: 'room-123',
        roomLink: 'https://example.com/?room=room-123',
        role: 'initiator',
        messagesUI: {},
      };
      createCallFlow.mockResolvedValueOnce(mockResult);

      const createdListener = vi.fn();
      CallController.on('created', createdListener);

      const result = await CallController.createCall({ localStream: {} });

      expect(result.success).toBe(true);
      expect(result.roomId).toBe('room-123');
      expect(createdListener).toHaveBeenCalledWith({
        roomId: 'room-123',
        roomLink: 'https://example.com/?room=room-123',
        role: 'initiator',
      });
    });

    it('answerCall returns success and emits answered event', async () => {
      const mockResult = {
        success: true,
        pc: { id: 'pc2' },
        roomId: 'room-456',
        role: 'joiner',
        messagesUI: {},
      };
      answerCallFlow.mockResolvedValueOnce(mockResult);

      const answeredListener = vi.fn();
      CallController.on('answered', answeredListener);

      const result = await CallController.answerCall({ roomId: 'room-456' });

      expect(result.success).toBe(true);
      expect(result.roomId).toBe('room-456');
      expect(answeredListener).toHaveBeenCalledWith({
        roomId: 'room-456',
        role: 'joiner',
      });
    });

    it('hangUp emits cancellation and cleanup events', async () => {
      // Setup: simulate active call
      CallController.pc = { close: vi.fn() };
      CallController.roomId = 'room-789';

      RoomService.cancelCall.mockResolvedValueOnce();
      RoomService.leaveRoom.mockResolvedValueOnce();

      const hangupListener = vi.fn();
      const cleanupListener = vi.fn();
      CallController.on('hangup', hangupListener);
      CallController.on('cleanup', cleanupListener);

      await CallController.hangUp({ emitCancel: true, reason: 'user_hung_up' });

      expect(RoomService.cancelCall).toHaveBeenCalledWith(
        'room-789',
        'test-user-id',
        'user_hung_up',
      );
      expect(hangupListener).toHaveBeenCalled();
      expect(cleanupListener).toHaveBeenCalled();
    });

    it('cleanupCall does NOT emit cancellation', async () => {
      // Setup: simulate active call
      CallController.pc = { close: vi.fn() };
      CallController.roomId = 'room-999';

      RoomService.leaveRoom.mockResolvedValueOnce();

      const cleanupListener = vi.fn();
      CallController.on('cleanup', cleanupListener);

      await CallController.cleanupCall({ reason: 'remote_hangup' });

      expect(RoomService.cancelCall).not.toHaveBeenCalled();
      expect(RoomService.leaveRoom).toHaveBeenCalledWith(
        'test-user-id',
        'room-999',
      );
      expect(cleanupListener).toHaveBeenCalled();
    });
  });

  // ============================================================================
  // IDEMPOTENCY TESTS - Critical for preventing race conditions
  // ============================================================================

  describe('Idempotency', () => {
    it('multiple rapid hangUp calls only execute once', async () => {
      // Setup: simulate active call
      CallController.pc = { close: vi.fn() };
      CallController.roomId = 'room-idempotent';

      RoomService.cancelCall.mockResolvedValueOnce();
      RoomService.leaveRoom.mockResolvedValueOnce();

      // Fire 5 rapid hangUp calls
      const promises = [
        CallController.hangUp(),
        CallController.hangUp(),
        CallController.hangUp(),
        CallController.hangUp(),
        CallController.hangUp(),
      ];

      await Promise.all(promises);

      // Should only call cancelCall once
      expect(RoomService.cancelCall).toHaveBeenCalledTimes(1);
      expect(RoomService.leaveRoom).toHaveBeenCalledTimes(1);
    });

    it('multiple rapid cleanupCall calls only execute once', async () => {
      // Setup: simulate active call
      CallController.pc = { close: vi.fn() };
      CallController.roomId = 'room-cleanup-idempotent';

      RoomService.leaveRoom.mockResolvedValueOnce();

      // Fire 5 rapid cleanupCall calls
      const promises = [
        CallController.cleanupCall(),
        CallController.cleanupCall(),
        CallController.cleanupCall(),
        CallController.cleanupCall(),
        CallController.cleanupCall(),
      ];

      await Promise.all(promises);

      // Should only call leaveRoom once
      expect(RoomService.leaveRoom).toHaveBeenCalledTimes(1);
    });
  });

  // ============================================================================
  // STATE VERIFICATION - Ensure state is managed correctly
  // ============================================================================

  describe('State Management', () => {
    it('getState returns expected fields after createCall', async () => {
      const mockResult = {
        success: true,
        pc: { id: 'pc1' },
        roomId: 'room-state',
        roomLink: 'https://example.com/?room=room-state',
        role: 'initiator',
      };
      createCallFlow.mockResolvedValueOnce(mockResult);

      await CallController.createCall({ localStream: {} });

      const state = CallController.getState();
      expect(state.roomId).toBe('room-state');
      expect(state.roomLink).toBe('https://example.com/?room=room-state');
      expect(state.role).toBe('initiator');
      expect(state.hasPc).toBe(true);
    });

    it('resetState clears all state to idle', () => {
      // Setup: simulate active call
      CallController.roomId = 'room-reset';
      CallController.pc = { id: 'pc1' };
      CallController.state = 'connected';

      CallController.resetState();

      const state = CallController.getState();
      expect(state.state).toBe('idle');
      expect(state.roomId).toBe(null);
      expect(state.hasPc).toBe(false);
    });
  });
});
