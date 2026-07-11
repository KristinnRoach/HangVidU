import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  incomingCallback: undefined,
  responseCallback: undefined,
  initCallService: vi.fn(),
  getCallService: vi.fn(),
  cleanupCallService: vi.fn(),
  onIncomingCall: vi.fn((callback) => {
    mocks.incomingCallback = callback;
    return vi.fn();
  }),
  respondToIncomingCallInvite: vi.fn(),
  sendOutgoingCallInvite: vi.fn(),
  cancelOutgoingCall: vi.fn(),
  onCalleeResponse: vi.fn((callback) => {
    mocks.responseCallback = callback;
    return vi.fn();
  }),
  ackCallResponse: vi.fn(),
  getLoggedInUserId: vi.fn(() => 'callee-id'),
  getLoggedInUserToken: vi.fn(async () => 'token'),
  publish: vi.fn(),
  resolveDirectConversationId: vi.fn(),
  getUserMedia: vi.fn(),
}));

vi.mock('./call-service.js', () => ({
  initCallService: mocks.initCallService,
  getCallService: mocks.getCallService,
  cleanupCallService: mocks.cleanupCallService,
}));

vi.mock('../../auth/index.js', () => ({
  getLoggedInUserId: mocks.getLoggedInUserId,
  getLoggedInUserToken: mocks.getLoggedInUserToken,
}));

vi.mock('@shared/events/index.js', async (importOriginal) => ({
  ...(await importOriginal()),
  publish: mocks.publish,
}));

vi.mock('../../stores/conversation/dm-ids.js', () => ({
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

const { CallHandshakeController } =
  await import('./call-handshake-controller.js');

describe('CallHandshakeController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.incomingCallback = undefined;
    mocks.responseCallback = undefined;
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        mediaDevices: {
          getUserMedia: mocks.getUserMedia,
          getSupportedConstraints: () => ({}),
        },
        userAgent: '',
      },
      configurable: true,
    });
    mocks.getUserMedia.mockResolvedValue({
      getTracks: () => [{ stop: vi.fn() }],
    });
    const service = {
      onIncomingCall: mocks.onIncomingCall,
      respondToIncomingCallInvite: mocks.respondToIncomingCallInvite,
      sendOutgoingCallInvite: mocks.sendOutgoingCallInvite,
      cancelOutgoingCall: mocks.cancelOutgoingCall,
      onCalleeResponse: mocks.onCalleeResponse,
      ackCallResponse: mocks.ackCallResponse,
    };
    mocks.initCallService.mockReturnValue(service);
    mocks.getCallService.mockReturnValue(service);
    mocks.respondToIncomingCallInvite.mockResolvedValue(undefined);
    mocks.sendOutgoingCallInvite.mockResolvedValue(undefined);
    mocks.ackCallResponse.mockResolvedValue(undefined);
    mocks.resolveDirectConversationId.mockResolvedValue('room-1');
  });

  it('dismisses a matching incoming call when another device handles it', () => {
    const onStateChange = vi.fn();
    const controller = new CallHandshakeController({
      p2p: {
        close: vi.fn(),
        state: vi.fn(() => 'idle'),
        room: vi.fn(),
      },
      createSignaling: vi.fn(),
      getCallerName: () => 'Callee',
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
      getCallerName: () => 'Callee',
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

  it('does not close an accepted incoming room while waiting for the caller to join', async () => {
    const p2p = {
      join: vi.fn(async (options) => {
        options.onAlone?.({ roomId: 'room-1', members: ['callee-id'] });
        return { roomId: 'room-1', members: ['callee-id'] };
      }),
      close: vi.fn(),
      state: vi.fn(() => 'idle'),
      room: vi.fn(),
    };
    const controller = new CallHandshakeController({
      p2p,
      createSignaling: vi.fn(),
      getCallerName: () => 'Callee',
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

    expect(mocks.respondToIncomingCallInvite).toHaveBeenCalledWith({
      roomId: 'room-1',
      callerId: 'caller-id',
      responseType: 'accepted',
    });
    expect(p2p.close).not.toHaveBeenCalled();
  });

  it('does not notify accepted when joining the room fails', async () => {
    const joinError = new Error('camera blocked');
    const p2p = {
      join: vi.fn(() => Promise.resolve(undefined)),
      close: vi.fn(),
      state: vi.fn(() => 'idle'),
      error: vi.fn(() => joinError),
      room: vi.fn(),
    };
    const controller = new CallHandshakeController({
      p2p,
      createSignaling: vi.fn(),
      getCallerName: () => 'Callee',
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
    expect(p2p.error).toHaveBeenCalledTimes(1);
  });

  it('listens for a response before sending the invite', async () => {
    const send = deferred();
    const join = deferred();
    mocks.sendOutgoingCallInvite.mockReturnValue(send.promise);
    const p2p = {
      join: vi.fn(() => join.promise),
      close: vi.fn(),
      state: vi.fn(() => 'idle'),
      room: vi.fn(),
    };
    const controller = new CallHandshakeController({
      p2p,
      createSignaling: vi.fn(),
      getCallerName: () => 'Callee',
      onStateChange: vi.fn(),
      onCalleeBusy: vi.fn(),
    });

    const start = controller.sendOutgoingCallInvite({
      calleeId: 'callee-id',
      calleeName: 'Callee',
      audioOnly: false,
    });
    await flushPromises();
    expect(mocks.responseCallback).toBeTypeOf('function');

    const response = mocks.responseCallback?.({
      roomId: 'room-1',
      responseType: 'accepted',
      by: 'callee-id',
      respondedAt: Date.now(),
    });
    await flushPromises();
    expect(p2p.join).toHaveBeenCalled();

    send.resolve();
    await start;
    expect(mocks.publish).not.toHaveBeenCalledWith(
      'evt:call:invite:sent',
      expect.anything(),
    );

    join.resolve({ roomId: 'room-1', members: ['caller-id'] });
    await response;
    expect(mocks.ackCallResponse).toHaveBeenCalledWith('room-1');
  });

  it('does not send the invite when caller media permission fails', async () => {
    mocks.getUserMedia.mockRejectedValue(new Error('camera blocked'));
    const p2p = {
      join: vi.fn(),
      close: vi.fn(),
      state: vi.fn(() => 'idle'),
      room: vi.fn(),
    };
    const controller = new CallHandshakeController({
      p2p,
      createSignaling: vi.fn(),
      getCallerName: () => 'Caller',
      onStateChange: vi.fn(),
      onCalleeBusy: vi.fn(),
    });

    await controller.sendOutgoingCallInvite({
      calleeId: 'callee-id',
      calleeName: 'Callee',
      audioOnly: false,
    });

    expect(mocks.sendOutgoingCallInvite).not.toHaveBeenCalled();
    expect(mocks.onCalleeResponse).not.toHaveBeenCalled();
    expect(p2p.join).not.toHaveBeenCalled();
  });

  it('stops stale caller media when cleanup wins the permission race', async () => {
    const media = deferred();
    const stop = vi.fn();
    mocks.getUserMedia.mockReturnValue(media.promise);
    const p2p = {
      join: vi.fn(),
      close: vi.fn(),
      state: vi.fn(() => 'idle'),
      room: vi.fn(),
    };
    const controller = new CallHandshakeController({
      p2p,
      createSignaling: vi.fn(),
      getCallerName: () => 'Caller',
      onStateChange: vi.fn(),
      onCalleeBusy: vi.fn(),
    });

    const start = controller.sendOutgoingCallInvite({
      calleeId: 'callee-id',
      calleeName: 'Callee',
      audioOnly: false,
    });
    await flushPromises();

    controller.cleanup();
    media.resolve({ getTracks: () => [{ stop }] });
    await start;

    expect(stop).toHaveBeenCalledOnce();
    expect(mocks.sendOutgoingCallInvite).not.toHaveBeenCalled();
    expect(mocks.onCalleeResponse).not.toHaveBeenCalled();
  });
});
