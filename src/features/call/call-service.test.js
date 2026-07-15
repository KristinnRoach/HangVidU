import { afterEach, describe, expect, it, vi } from 'vite-plus/test';

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
    vi.useRealTimers();
    vi.restoreAllMocks();
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

  it('retries an accepted response when token acquisition times out', async () => {
    vi.useFakeTimers();
    const getToken = vi
      .fn()
      .mockReturnValueOnce(new Promise(() => {}))
      .mockResolvedValueOnce('fresh-token');
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 200 }));
    const service = initCallService({
      localUID: 'callee-id',
      baseUrl: 'http://localhost:8788',
      getToken,
    });

    const response = service.respondToIncomingCallInvite({
      roomId: 'room-1',
      callerId: 'caller-id',
      responseType: 'accepted',
    });
    await vi.advanceTimersByTimeAsync(8_000);
    await response;

    expect(getToken).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe('http://localhost:8788/calls/response');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({
      conversationId: 'room-1',
      callerId: 'caller-id',
      responseType: 'accepted',
      expiresAt: expect.any(Number),
    });
  });

  it('retries an accepted response when the request times out', async () => {
    vi.useFakeTimers();
    const getToken = vi.fn().mockResolvedValue('fresh-token');
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementationOnce((_url, init) => {
        return new Promise((_, reject) => {
          init.signal.addEventListener(
            'abort',
            () => reject(init.signal.reason),
            { once: true },
          );
        });
      })
      .mockResolvedValueOnce(new Response(null, { status: 200 }));
    const service = initCallService({
      localUID: 'callee-id',
      baseUrl: 'http://localhost:8788',
      getToken,
    });

    const response = service.respondToIncomingCallInvite({
      roomId: 'room-1',
      callerId: 'caller-id',
      responseType: 'accepted',
    });
    await vi.advanceTimersByTimeAsync(8_000);
    await response;

    expect(getToken).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('does not retry a rejected response when token acquisition times out', async () => {
    vi.useFakeTimers();
    const getToken = vi.fn(() => new Promise(() => {}));
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const service = initCallService({
      localUID: 'callee-id',
      baseUrl: 'http://localhost:8788',
      getToken,
    });

    const response = expect(
      service.respondToIncomingCallInvite({
        roomId: 'room-1',
        callerId: 'caller-id',
        responseType: 'rejected',
      }),
    ).rejects.toMatchObject({ name: 'TimeoutError' });
    await vi.advanceTimersByTimeAsync(8_000);
    await response;

    expect(getToken).toHaveBeenCalledOnce();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
