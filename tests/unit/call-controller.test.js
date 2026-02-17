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
    getUserId: () => 'local-user-id',
    getUser: () => ({ uid: 'local-user-id' }),
    getIsLoggedIn: () => true,
    getLoggedInUserId: () => 'local-user-id',
    subscribe: vi.fn(() => () => {}),
  };
});
vi.mock('../../src/storage/fb-rtdb/rtdb.js', () => {
  return {
    rtdb: {},
    onDataChange: vi.fn(),
    removeRTDBListenersForRoom: vi.fn(),
    // Stubs added for tests that import these named exports
    getWatchRef: vi.fn(() => ({ refPath: '/watch' })),
    getWatchRequestRef: vi.fn(() => ({ refPath: '/watchRequests' })),
  };
});
vi.mock('firebase/database', () => {
  return {
    ref: vi.fn((db, path) => ({ _path: path })),
    off: vi.fn(),
    get: vi.fn(),
    set: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    onValue: vi.fn(),
    onChildAdded: vi.fn(),
    onChildChanged: vi.fn(),
    onChildRemoved: vi.fn(),
    onChildMoved: vi.fn(),
    push: vi.fn(),
    serverTimestamp: vi.fn(() => ({ '.sv': 'timestamp' })),
    getDatabase: vi.fn(() => ({})),
  };
});
vi.mock('../../src/webrtc/ice.js', () => {
  return {
    drainIceCandidateQueue: vi.fn(),
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

describe('CallController (unit)', () => {
  beforeEach(() => {
    // reset mocks and controller state
    vi.clearAllMocks();
    CallController.resetState();
  });

  it('createCall delegates to call-flow and emits created event', async () => {
    const fakeResult = {
      success: true,
      pc: { id: 'pc1' },
      roomId: 'room-123',
      roomLink: 'https://example/?room=room-123',
      role: 'initiator',
      messagesUI: {},
    };
    createCallFlow.mockResolvedValueOnce(fakeResult);

    const created = vi.fn();
    CallController.on('created', created);

    const res = await CallController.createCall({ localStream: {} });

    expect(createCallFlow).toHaveBeenCalled();
    expect(res).toEqual(fakeResult);
    expect(CallController.getState().roomId).toBe('room-123');
    expect(created).toHaveBeenCalledWith({
      roomId: 'room-123',
      roomLink: 'https://example/?room=room-123',
      role: 'initiator',
    });
  });

  it('hangUp emits cancel and performs cleanup when emitCancel=true', async () => {
    // prepare controller state as if in a call
    const pc = { close: vi.fn() };
    CallController.pc = pc;
    CallController.roomId = 'room-abc';

    // Mocks
    RoomService.cancelCall.mockResolvedValueOnce();
    RoomService.leaveRoom.mockResolvedValueOnce();

    const hangupEvt = vi.fn();
    const cleanupEvt = vi.fn();
    CallController.on('hangup', hangupEvt);
    CallController.on('cleanup', cleanupEvt);

    await CallController.hangUp({ emitCancel: true, reason: 'user_hung_up' });

    expect(RoomService.cancelCall).toHaveBeenCalledWith(
      'room-abc',
      'local-user-id',
      'user_hung_up',
    );
    // leaveRoom called by cleanupCall
    expect(RoomService.leaveRoom).toHaveBeenCalledWith(
      'local-user-id',
      'room-abc',
    );
    expect(pc.close).toHaveBeenCalled();
    expect(hangupEvt).toHaveBeenCalled();
    expect(cleanupEvt).toHaveBeenCalled();
    expect(CallController.getState().state).toBe('idle');
  });

  it('cleanupCall does NOT emit cancel and resets state', async () => {
    const pc = { close: vi.fn() };
    CallController.pc = pc;
    CallController.roomId = 'room-xyz';
    CallController.partnerId = 'partner-123';

    RoomService.leaveRoom.mockResolvedValueOnce();
    RoomService.cancelCall.mockResolvedValueOnce();

    const cleanupEvt = vi.fn();
    CallController.on('cleanup', cleanupEvt);

    await CallController.cleanupCall({ reason: 'remote_hangup' });

    expect(RoomService.cancelCall).not.toHaveBeenCalled();
    expect(RoomService.leaveRoom).toHaveBeenCalledWith(
      'local-user-id',
      'room-xyz',
    );
    expect(pc.close).toHaveBeenCalled();
    expect(cleanupEvt).toHaveBeenCalledWith(
      expect.objectContaining({
        roomId: 'room-xyz',
        partnerId: 'partner-123',
        reason: 'remote_hangup',
      }),
    );
    expect(CallController.getState().state).toBe('idle');
  });

  it('hangUp is idempotent - multiple calls only execute once', async () => {
    const pc = { close: vi.fn() };
    CallController.pc = pc;
    CallController.roomId = 'room-idempotent';

    RoomService.cancelCall.mockResolvedValueOnce();
    RoomService.leaveRoom.mockResolvedValueOnce();

    // Fire multiple hangUp calls rapidly
    await Promise.all([
      CallController.hangUp(),
      CallController.hangUp(),
      CallController.hangUp(),
    ]);

    // Should only call cancelCall and leaveRoom once
    expect(RoomService.cancelCall).toHaveBeenCalledTimes(1);
    expect(RoomService.leaveRoom).toHaveBeenCalledTimes(1);
  });

  it('cleanupCall is idempotent - multiple calls only execute once', async () => {
    const pc = { close: vi.fn() };
    CallController.pc = pc;
    CallController.roomId = 'room-cleanup-idempotent';

    RoomService.leaveRoom.mockResolvedValueOnce();

    // Fire multiple cleanupCall calls rapidly
    await Promise.all([
      CallController.cleanupCall(),
      CallController.cleanupCall(),
      CallController.cleanupCall(),
    ]);

    // Should only call leaveRoom once
    expect(RoomService.leaveRoom).toHaveBeenCalledTimes(1);
  });

  it('setPartnerId stores partner ID in state', () => {
    CallController.setPartnerId('partner-123');
    expect(CallController.getState().partnerId).toBe('partner-123');
  });

  it('getState includes new properties', () => {
    CallController.partnerId = 'partner-456';
    CallController.isHangingUp = true;
    CallController.isCleaningUp = false;

    const state = CallController.getState();
    expect(state.partnerId).toBe('partner-456');
    expect(state.isHangingUp).toBe(true);
    expect(state.isCleaningUp).toBe(false);
  });

  it('remoteVideoEl is cleared during cleanup', async () => {
    const mockVideoEl = { srcObject: 'mock-stream' };
    CallController.pc = { close: vi.fn() };
    CallController.roomId = 'room-video';
    CallController.remoteVideoEl = mockVideoEl;

    RoomService.leaveRoom.mockResolvedValueOnce();

    await CallController.cleanupCall();

    expect(mockVideoEl.srcObject).toBe(null);
  });

  afterEach(() => {
    // ensure no listeners leak between tests
    CallController.resetState();
  });
});

it('emits remoteHangup event when cleanup is triggered by remote party', async () => {
  // Setup: simulate active call
  CallController.pc = { close: vi.fn() };
  CallController.roomId = 'room-remote';
  CallController.partnerId = 'partner-123';

  RoomService.leaveRoom.mockResolvedValueOnce();

  const remoteHangupListener = vi.fn();
  CallController.on('remoteHangup', remoteHangupListener);

  // Act: cleanup with remote reason
  await CallController.cleanupCall({ reason: 'remote_cancelled' });

  // Assert: remoteHangup event was emitted
  expect(remoteHangupListener).toHaveBeenCalledWith({
    roomId: 'room-remote',
    partnerId: 'partner-123',
    reason: 'remote_cancelled',
  });
});

it('does NOT emit remoteHangup event when cleanup is user-initiated', async () => {
  // Setup: simulate active call
  CallController.pc = { close: vi.fn() };
  CallController.roomId = 'room-user';

  RoomService.leaveRoom.mockResolvedValueOnce();

  const remoteHangupListener = vi.fn();
  CallController.on('remoteHangup', remoteHangupListener);

  // Act: cleanup with user reason
  await CallController.cleanupCall({ reason: 'user_hung_up' });

  // Assert: remoteHangup event was NOT emitted
  expect(remoteHangupListener).not.toHaveBeenCalled();
});

it('emits callFailed event when createCall fails', async () => {
  const failureResult = {
    success: false,
    error: 'Camera not initialized',
  };
  createCallFlow.mockResolvedValueOnce(failureResult);

  const callFailedListener = vi.fn();
  CallController.on('callFailed', callFailedListener);

  const result = await CallController.createCall({ localStream: null });

  expect(result.success).toBe(false);
  expect(callFailedListener).toHaveBeenCalledWith({
    phase: 'createCall',
    error: 'Camera not initialized',
  });
});

it('emits callFailed event when answerCall fails', async () => {
  const failureResult = {
    success: false,
    error: 'Invalid room link',
  };
  answerCallFlow.mockResolvedValueOnce(failureResult);

  const callFailedListener = vi.fn();
  CallController.on('callFailed', callFailedListener);

  const result = await CallController.answerCall({ roomId: 'invalid' });

  expect(result.success).toBe(false);
  expect(callFailedListener).toHaveBeenCalledWith({
    phase: 'answerCall',
    error: 'Invalid room link',
  });
});

// ============================================================================
// Task 10.1: TDD - Cancellation Listener Tracking Tests (RED phase)
// ============================================================================

it('tracks cancellation listener in listeners Map after createCall', async () => {
  const fakeResult = {
    success: true,
    pc: { id: 'pc1' },
    roomId: 'room-123',
    roomLink: 'https://example/?room=room-123',
    role: 'initiator',
    messagesUI: {},
  };
  createCallFlow.mockResolvedValueOnce(fakeResult);

  await CallController.createCall({ localStream: {} });

  // Verify cancellation listener is tracked
  expect(CallController.listeners.has('cancellation')).toBe(true);
  const cancellationListeners = CallController.listeners.get('cancellation');
  expect(cancellationListeners).toBeDefined();
  expect(cancellationListeners.length).toBeGreaterThan(0);
});

it('removes cancellation listener from listeners Map on cleanup', async () => {
  // Setup: simulate active call with tracked listener
  const fakeResult = {
    success: true,
    pc: { close: vi.fn() },
    roomId: 'room-456',
    role: 'initiator',
  };
  createCallFlow.mockResolvedValueOnce(fakeResult);

  await CallController.createCall({ localStream: {} });

  // Verify listener is tracked
  expect(CallController.listeners.has('cancellation')).toBe(true);

  RoomService.leaveRoom.mockResolvedValueOnce();

  // Act: cleanup
  await CallController.cleanupCall({ reason: 'test_cleanup' });

  // Assert: listener is removed
  expect(CallController.listeners.has('cancellation')).toBe(false);
});

it('tracks rejection listener in listeners Map after createCall', async () => {
  const fakeResult = {
    success: true,
    pc: { id: 'pc1' },
    roomId: 'room-789',
    roomLink: 'https://example/?room=room-789',
    role: 'initiator',
    messagesUI: {},
  };
  createCallFlow.mockResolvedValueOnce(fakeResult);

  await CallController.createCall({ localStream: {} });

  // Wait a tick for async listener setup to complete
  await new Promise((resolve) => setTimeout(resolve, 10));

  // Verify rejection listener is tracked
  expect(CallController.listeners.has('rejection')).toBe(true);
  const rejectionListeners = CallController.listeners.get('rejection');
  expect(rejectionListeners).toBeDefined();
  expect(rejectionListeners.length).toBeGreaterThan(0);
});

it('removes rejection listener from listeners Map on cleanup', async () => {
  // Setup: simulate active call with tracked listener
  const fakeResult = {
    success: true,
    pc: { close: vi.fn() },
    roomId: 'room-rejection',
    role: 'initiator',
  };
  createCallFlow.mockResolvedValueOnce(fakeResult);

  await CallController.createCall({ localStream: {} });

  // Verify listener is tracked
  expect(CallController.listeners.has('rejection')).toBe(true);

  RoomService.leaveRoom.mockResolvedValueOnce();

  // Act: cleanup
  await CallController.cleanupCall({ reason: 'test_cleanup' });

  // Assert: listener is removed
  expect(CallController.listeners.has('rejection')).toBe(false);
});

// ============================================================================
// Task 11.1: TDD - Member Listener Tracking Tests (RED phase)
// ============================================================================

it('tracks member-joined listener in listeners Map after createCall', async () => {
  const fakeResult = {
    success: true,
    pc: { id: 'pc1' },
    roomId: 'room-members',
    roomLink: 'https://example/?room=room-members',
    role: 'initiator',
    messagesUI: {},
  };
  createCallFlow.mockResolvedValueOnce(fakeResult);

  await CallController.createCall({ localStream: {} });

  // Verify member-joined listener is tracked
  expect(CallController.listeners.has('member-joined')).toBe(true);
  const memberJoinedListeners = CallController.listeners.get('member-joined');
  expect(memberJoinedListeners).toBeDefined();
  expect(memberJoinedListeners.length).toBeGreaterThan(0);
});

it('tracks member-left listener in listeners Map after createCall', async () => {
  const fakeResult = {
    success: true,
    pc: { id: 'pc1' },
    roomId: 'room-members-left',
    roomLink: 'https://example/?room=room-members-left',
    role: 'initiator',
    messagesUI: {},
  };
  createCallFlow.mockResolvedValueOnce(fakeResult);

  await CallController.createCall({ localStream: {} });

  // Verify member-left listener is tracked
  expect(CallController.listeners.has('member-left')).toBe(true);
  const memberLeftListeners = CallController.listeners.get('member-left');
  expect(memberLeftListeners).toBeDefined();
  expect(memberLeftListeners.length).toBeGreaterThan(0);
});

it('removes member listeners from listeners Map on cleanup', async () => {
  // Setup: simulate active call with tracked listeners
  const fakeResult = {
    success: true,
    pc: { close: vi.fn() },
    roomId: 'room-member-cleanup',
    role: 'initiator',
  };
  createCallFlow.mockResolvedValueOnce(fakeResult);

  await CallController.createCall({ localStream: {} });

  // Verify listeners are tracked
  expect(CallController.listeners.has('member-joined')).toBe(true);
  expect(CallController.listeners.has('member-left')).toBe(true);

  RoomService.leaveRoom.mockResolvedValueOnce();

  // Act: cleanup
  await CallController.cleanupCall({ reason: 'test_cleanup' });

  // Assert: listeners are removed
  expect(CallController.listeners.has('member-joined')).toBe(false);
  expect(CallController.listeners.has('member-left')).toBe(false);
});

// ============================================================================
// CONTACT SAVE SCENARIO TESTS
// ============================================================================

it('cleanup event includes partnerId for contact save prompt (user-initiated hangup)', async () => {
  // Setup: simulate active call with partner
  const pc = { close: vi.fn() };
  CallController.pc = pc;
  CallController.roomId = 'room-contact-save';
  CallController.partnerId = 'partner-user-id';

  RoomService.cancelCall.mockResolvedValueOnce();
  RoomService.leaveRoom.mockResolvedValueOnce();

  const cleanupListener = vi.fn();
  CallController.on('cleanup', cleanupListener);

  // Act: User A hangs up
  await CallController.hangUp({ emitCancel: true, reason: 'user_hung_up' });

  // Assert: cleanup event includes partnerId for contact save
  expect(cleanupListener).toHaveBeenCalledWith(
    expect.objectContaining({
      roomId: 'room-contact-save',
      partnerId: 'partner-user-id',
      reason: 'user_hung_up',
    }),
  );
});

it('cleanup event includes partnerId for contact save prompt (remote hangup)', async () => {
  // Setup: simulate active call with partner
  const pc = { close: vi.fn() };
  CallController.pc = pc;
  CallController.roomId = 'room-remote-hangup';
  CallController.partnerId = 'remote-partner-id';

  RoomService.leaveRoom.mockResolvedValueOnce();

  const cleanupListener = vi.fn();
  CallController.on('cleanup', cleanupListener);

  // Act: Remote party hangs up (triggered by cancellation listener)
  await CallController.cleanupCall({ reason: 'remote_cancelled' });

  expect(cleanupListener).toHaveBeenCalledWith(
    expect.objectContaining({
      roomId: 'room-remote-hangup',
      partnerId: 'remote-partner-id',
      reason: 'remote_cancelled',
    }),
  );
});
