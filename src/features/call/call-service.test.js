import { afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  envelopeCallback: undefined,
  close: vi.fn(),
}));

vi.mock('../../realtime/mailbox-channel', () => ({
  createMailboxChannel: vi.fn(() => ({
    onEnvelope(callback) {
      mocks.envelopeCallback = callback;
      return vi.fn();
    },
    close: mocks.close,
  })),
}));

import { cleanupCallService, initCallService } from './call-service.js';

describe('initCallService', () => {
  afterEach(() => {
    cleanupCallService();
  });

  it('replaces a stale singleton when the authenticated UID changes', () => {
    const first = initCallService({
      localUID: 'guest-id',
      baseUrl: 'http://localhost:8788',
      getToken: async () => null,
    });
    const cleanup = vi.spyOn(first, 'cleanup');

    const second = initCallService({
      localUID: 'firebase-auth-uid',
      baseUrl: 'http://localhost:8788',
      getToken: async () => null,
    });

    expect(second).not.toBe(first);
    expect(second.localUID).toBe('firebase-auth-uid');
    expect(cleanup).toHaveBeenCalledOnce();
  });

  it('normalizes a trailing slash from the data worker base URL', () => {
    const service = initCallService({
      localUID: 'firebase-auth-uid',
      baseUrl: 'http://localhost:8788/',
      getToken: async () => null,
    });

    expect(service.baseUrl).toBe('http://localhost:8788');
  });

  it("surfaces a 'handled' mailbox envelope as an incoming-call event", () => {
    const service = initCallService({
      localUID: 'callee-id',
      baseUrl: 'http://localhost:8788',
      getToken: async () => null,
    });
    const callback = vi.fn();

    service.onIncomingCall(callback);
    mocks.envelopeCallback?.({
      t: 'handled',
      roomId: 'room-1',
      by: 'callee-id',
    });

    expect(callback).toHaveBeenCalledWith({
      type: 'handled',
      roomId: 'room-1',
      by: 'callee-id',
    });
  });
});
