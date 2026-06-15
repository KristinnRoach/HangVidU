import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  onValue: vi.fn(),
  ref: vi.fn((_database, path) => ({ path })),
  remove: vi.fn(() => Promise.resolve()),
  set: vi.fn(() => Promise.resolve()),
}));

vi.mock('firebase/database', () => ({
  onValue: mocks.onValue,
  ref: mocks.ref,
  remove: mocks.remove,
  set: mocks.set,
}));

import { CallRTDBAdapter } from './call-rtdb-adapter.js';

function createSnapshot(value) {
  return {
    exists: () => value !== null,
    val: () => value,
  };
}

describe('CallRTDBAdapter', () => {
  let adapter;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    adapter = new CallRTDBAdapter({ database: {} });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('emits null when no incoming call exists', () => {
    const callback = vi.fn();
    mocks.onValue.mockImplementation((_refArg, handler) => {
      handler(createSnapshot(null));
      return vi.fn();
    });

    adapter.onInviteReceived('user-1', callback);

    expect(callback).toHaveBeenCalledWith(null);
    expect(mocks.remove).not.toHaveBeenCalled();
  });

  it('parses valid incoming call data', () => {
    const callback = vi.fn();
    const call = {
      roomId: 'room-1',
      callerId: 'caller-1',
      callerName: 'Alice',
      audioOnly: false,
      startedAt: 123,
    };
    mocks.onValue.mockImplementation((_refArg, handler) => {
      handler(createSnapshot(call));
      return vi.fn();
    });

    adapter.onInviteReceived('user-1', callback);

    expect(callback).toHaveBeenCalledWith(call);
    expect(mocks.remove).not.toHaveBeenCalled();
  });

  it('writes invite lifecycle and callee metadata when provided', async () => {
    await adapter.sendInvite('callee-1', {
      roomId: 'room-1',
      callerId: 'caller-1',
      calleeId: 'callee-1',
      callerName: 'Alice',
      audioOnly: false,
      startedAt: 123,
      expiresAt: 456,
    });

    expect(mocks.set).toHaveBeenCalledWith(
      { path: 'users/callee-1/calls/incoming' },
      {
        roomId: 'room-1',
        callerId: 'caller-1',
        calleeId: 'callee-1',
        callerName: 'Alice',
        audioOnly: false,
        startedAt: 123,
        expiresAt: 456,
      },
    );
  });

  it('writes response lifecycle metadata when provided', async () => {
    await adapter.sendResponse('callee-1', {
      roomId: 'room-1',
      responseType: 'accepted',
      by: 'callee-1',
      respondedAt: 123,
      expiresAt: 456,
    });

    expect(mocks.set).toHaveBeenCalledWith(
      { path: 'users/callee-1/calls/response' },
      {
        roomId: 'room-1',
        responseType: 'accepted',
        by: 'callee-1',
        respondedAt: 123,
        expiresAt: 456,
      },
    );
  });

  it('parses busy call responses', () => {
    const callback = vi.fn();
    const response = {
      roomId: 'room-1',
      responseType: 'busy',
      by: 'callee-1',
      respondedAt: 123,
      expiresAt: Date.now() + 60_000,
    };
    mocks.onValue.mockImplementation((_refArg, handler) => {
      handler(createSnapshot(response));
      return vi.fn();
    });

    adapter.onResponseReceived('callee-1', callback);

    expect(callback).toHaveBeenCalledWith(response);
  });

  it('ignores expired call responses so a stale accept cannot join a room', () => {
    const callback = vi.fn();
    const response = {
      roomId: 'room-1',
      responseType: 'accepted',
      by: 'callee-1',
      respondedAt: 123,
      expiresAt: Date.now() - 1,
    };
    mocks.onValue.mockImplementation((_refArg, handler) => {
      handler(createSnapshot(response));
      return vi.fn();
    });

    adapter.onResponseReceived('callee-1', callback);

    expect(callback).toHaveBeenCalledWith(null);
    // The caller listens to the callee's node and cannot clear it.
    expect(mocks.remove).not.toHaveBeenCalled();
  });

  it('removes expired incoming call data instead of showing a stale call', () => {
    const callback = vi.fn();
    const call = {
      roomId: 'room-1',
      callerId: 'caller-1',
      callerName: 'Alice',
      audioOnly: false,
      startedAt: 123,
      expiresAt: Date.now() - 1,
    };
    mocks.onValue.mockImplementation((_refArg, handler) => {
      handler(createSnapshot(call));
      return vi.fn();
    });

    adapter.onInviteReceived('user-1', callback);

    expect(callback).toHaveBeenCalledWith(null);
    expect(mocks.remove).toHaveBeenCalledWith({
      path: 'users/user-1/calls/incoming',
    });
  });

  it('removes stale invalid incoming call data instead of logging a ZodError as an active error', () => {
    const callback = vi.fn();
    mocks.onValue.mockImplementation((_refArg, handler) => {
      handler(createSnapshot({ roomId: 'room-1', startedAt: 123 }));
      return vi.fn();
    });

    adapter.onInviteReceived('user-1', callback);

    expect(callback).toHaveBeenCalledWith(null);
    expect(mocks.remove).toHaveBeenCalledWith({
      path: 'users/user-1/calls/incoming',
    });
    expect(console.warn).toHaveBeenCalledWith(
      'Removing stale incoming call data at users/user-1/calls/incoming',
    );
    expect(console.error).not.toHaveBeenCalled();
  });
});
