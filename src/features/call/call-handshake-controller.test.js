import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  incomingCallback: undefined,
  initCallService: vi.fn(),
  getCallService: vi.fn(),
  cleanupCallService: vi.fn(),
  onIncomingCall: vi.fn((callback) => {
    mocks.incomingCallback = callback;
    return vi.fn();
  }),
  respondToIncomingCallInvite: vi.fn(),
  getLoggedInUserId: vi.fn(() => 'callee-id'),
  getLoggedInUserToken: vi.fn(async () => 'token'),
  getUser: vi.fn(() => ({ userName: 'Callee' })),
  sendIncomingCallPushNotification: vi.fn(),
  sendMissedCallPushNotification: vi.fn(),
  resolveDirectConversationId: vi.fn(),
}));

vi.mock('./call-service.js', () => ({
  initCallService: mocks.initCallService,
  getCallService: mocks.getCallService,
  cleanupCallService: mocks.cleanupCallService,
}));

vi.mock('../../auth/index.js', () => ({
  getLoggedInUserId: mocks.getLoggedInUserId,
  getLoggedInUserToken: mocks.getLoggedInUserToken,
  getUser: mocks.getUser,
}));

vi.mock('./call-notifications.js', () => ({
  sendIncomingCallPushNotification: mocks.sendIncomingCallPushNotification,
  sendMissedCallPushNotification: mocks.sendMissedCallPushNotification,
}));

vi.mock('../../stores/conversations-client.js', () => ({
  resolveDirectConversationId: mocks.resolveDirectConversationId,
}));

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

async function flushPromises() {
  await Promise.resolve();
  await Promise.resolve();
}

const { CallHandshakeController } = await import(
  './call-handshake-controller.js'
);

describe('CallHandshakeController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.incomingCallback = undefined;
    const service = {
      onIncomingCall: mocks.onIncomingCall,
      respondToIncomingCallInvite: mocks.respondToIncomingCallInvite,
    };
    mocks.initCallService.mockReturnValue(service);
    mocks.getCallService.mockReturnValue(service);
    mocks.respondToIncomingCallInvite.mockResolvedValue(undefined);
  });

  it("dismisses a matching incoming call when another device handles it", () => {
    const onStateChange = vi.fn();
    const controller = new CallHandshakeController({
      p2p: {
        close: vi.fn(),
        state: vi.fn(() => 'idle'),
        room: vi.fn(),
      },
      createSignaling: vi.fn(),
      onStateChange,
      onCalleeBusy: vi.fn(),
    });

    controller.init();
    mocks.incomingCallback?.({
      type: 'invite',
      invite: {
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        audioOnly: false,
        expiresAt: Date.now() + 60_000,
      },
    });
    mocks.incomingCallback?.({
      type: 'handled',
      roomId: 'room-1',
      by: 'callee-id',
    });

    expect(onStateChange).toHaveBeenLastCalledWith(null);
  });

  it('joins the room before notifying the caller that an incoming call was accepted', async () => {
    const join = deferred();
    const p2p = {
      join: vi.fn(() => join.promise),
      close: vi.fn(),
      state: vi.fn(() => 'idle'),
      room: vi.fn(),
    };
    const controller = new CallHandshakeController({
      p2p,
      createSignaling: vi.fn(),
      onStateChange: vi.fn(),
      onCalleeBusy: vi.fn(),
    });

    controller.init();
    mocks.incomingCallback?.({
      type: 'invite',
      invite: {
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        audioOnly: false,
        expiresAt: Date.now() + 60_000,
      },
    });

    controller.acceptIncoming();

    expect(p2p.join).toHaveBeenCalledWith(
      expect.objectContaining({
        roomId: 'room-1',
        peerId: 'callee-id',
        memberCapacity: 2,
        dataChannel: true,
      }),
    );
    expect(mocks.respondToIncomingCallInvite).not.toHaveBeenCalled();

    join.resolve({ roomId: 'room-1', members: ['callee-id'] });
    await flushPromises();

    expect(mocks.respondToIncomingCallInvite).toHaveBeenCalledWith({
      roomId: 'room-1',
      callerId: 'caller-id',
      responseType: 'accepted',
    });
  });

  it('does not notify accepted when joining the room fails', async () => {
    const p2p = {
      join: vi.fn(() => Promise.reject(new Error('camera blocked'))),
      close: vi.fn(),
      state: vi.fn(() => 'idle'),
      room: vi.fn(),
    };
    const controller = new CallHandshakeController({
      p2p,
      createSignaling: vi.fn(),
      onStateChange: vi.fn(),
      onCalleeBusy: vi.fn(),
    });

    controller.init();
    mocks.incomingCallback?.({
      type: 'invite',
      invite: {
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        audioOnly: false,
        expiresAt: Date.now() + 60_000,
      },
    });

    controller.acceptIncoming();
    await flushPromises();

    expect(mocks.respondToIncomingCallInvite).not.toHaveBeenCalled();
    expect(p2p.close).toHaveBeenCalled();
  });
});
