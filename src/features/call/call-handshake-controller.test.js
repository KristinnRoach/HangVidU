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

vi.mock('../../stores/conversation/conversations-client.js', () => ({
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

function createMediaTrack(kind) {
  return { kind, stop: vi.fn() };
}

function createMediaStream({ audio = true, video = false } = {}) {
  const tracks = [
    ...(audio ? [createMediaTrack('audio')] : []),
    ...(video ? [createMediaTrack('video')] : []),
  ];
  return {
    getTracks: () => tracks,
    getAudioTracks: () => tracks.filter((track) => track.kind === 'audio'),
    getVideoTracks: () => tracks.filter((track) => track.kind === 'video'),
  };
}

async function flushPromises() {
  await Promise.resolve();
  await Promise.resolve();
}

function createP2PMock(overrides = {}) {
  return {
    join: vi.fn(),
    dispose: vi.fn(() => Promise.resolve()),
    broadcast: vi.fn(),
    state: vi.fn(() => 'idle'),
    members: vi.fn(() => []),
    error: vi.fn(),
    room: vi.fn(),
    ...overrides,
  };
}

function createController(p2p, overrides = {}) {
  return new CallHandshakeController({
    p2p,
    createSignaling: vi.fn(),
    getCallerName: () => 'Callee',
    onStateChange: vi.fn(),
    onCalleeBusy: vi.fn(),
    onReconnectStatus: vi.fn(),
    ...overrides,
  });
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
    mocks.getUserMedia.mockResolvedValue(createMediaStream());
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
    mocks.cancelOutgoingCall.mockResolvedValue(undefined);
    mocks.ackCallResponse.mockResolvedValue(undefined);
    mocks.resolveDirectConversationId.mockResolvedValue('room-1');
  });

  it('dismisses a matching incoming call when another device handles it', () => {
    const onStateChange = vi.fn();
    const controller = createController(createP2PMock(), { onStateChange });

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
    const p2p = createP2PMock({ join: vi.fn(() => join.promise) });
    const controller = createController(p2p);

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

  it('reserves a video slot when joining an audio-only call', async () => {
    const stream = createMediaStream({ audio: true, video: false });
    mocks.getUserMedia.mockResolvedValue(stream);
    const p2p = createP2PMock({
      join: vi.fn(async () => ({
        roomId: 'room-1',
        members: ['callee-id'],
      })),
    });
    const controller = createController(p2p);

    controller.init();
    mocks.incomingCallback?.({
      type: 'invite',
      invite: {
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        audioOnly: true,
        expiresAt: Date.now() + 60_000,
      },
    });

    controller.acceptIncoming();
    await flushPromises();

    expect(mocks.getUserMedia).toHaveBeenCalledWith(
      expect.objectContaining({ video: false }),
    );
    expect(p2p.join).toHaveBeenCalledWith(
      expect.objectContaining({
        localTrackSlots: [
          {
            id: 'microphone',
            kind: 'audio',
            track: stream.getAudioTracks()[0],
          },
          { id: 'primary-video', kind: 'video', track: null },
        ],
        presenceData: { cameraOn: false, micOn: false },
      }),
    );
    const joinOptions = p2p.join.mock.calls[0][0];
    await expect(joinOptions.getLocalStream()).resolves.toBe(stream);
  });

  it('holds a reconnect grace window when the remote peer drops silently, then tears down', async () => {
    vi.useFakeTimers();
    try {
      let joinOptions;
      const acceptResponse = deferred();
      mocks.respondToIncomingCallInvite.mockReturnValue(acceptResponse.promise);
      const p2p = createP2PMock({
        join: vi.fn(async (options) => {
          joinOptions = options;
          return { roomId: 'room-1', members: ['callee-id'] };
        }),
      });
      const onReconnectStatus = vi.fn();
      const controller = createController(p2p, { onReconnectStatus });

      controller.showIncomingCallFromNotification({
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        audioOnly: false,
        startedAt: Date.now(),
      });

      controller.acceptIncoming();
      await flushPromises();

      // Silent drop (`dropped`): grace window, not an immediate teardown.
      joinOptions?.onAlone?.({
        members: ['callee-id'],
        memberCount: 1,
        reason: 'dropped',
      });
      expect(onReconnectStatus).toHaveBeenLastCalledWith('reconnecting');
      expect(p2p.dispose).not.toHaveBeenCalled();

      // Grace elapses → "failed" shown → final teardown after the display delay.
      vi.advanceTimersByTime(10_000);
      expect(onReconnectStatus).toHaveBeenLastCalledWith('failed');
      expect(p2p.dispose).not.toHaveBeenCalled();

      vi.advanceTimersByTime(2_500);
      expect(p2p.dispose).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('exits immediately on an explicit `left` departure, skipping the grace window', async () => {
    let joinOptions;
    const acceptResponse = deferred();
    mocks.respondToIncomingCallInvite.mockReturnValue(acceptResponse.promise);
    const p2p = createP2PMock({
      join: vi.fn(async (options) => {
        joinOptions = options;
        return { roomId: 'room-1', members: ['callee-id'] };
      }),
    });
    const onReconnectStatus = vi.fn();
    const controller = createController(p2p, { onReconnectStatus });

    controller.showIncomingCallFromNotification({
      roomId: 'room-1',
      callerId: 'caller-id',
      callerName: 'Caller',
      audioOnly: false,
      startedAt: Date.now(),
    });

    controller.acceptIncoming();
    await flushPromises();

    // Intentional hangup: the room reports `alone` with reason `left` → close now.
    joinOptions?.onAlone?.({
      members: ['callee-id'],
      memberCount: 1,
      reason: 'left',
    });

    expect(onReconnectStatus).not.toHaveBeenCalledWith('reconnecting');
    expect(p2p.dispose).toHaveBeenCalledTimes(1);
  });

  it('cancels the reconnect grace when the peer rejoins', async () => {
    vi.useFakeTimers();
    try {
      let joinOptions;
      const acceptResponse = deferred();
      mocks.respondToIncomingCallInvite.mockReturnValue(acceptResponse.promise);
      const p2p = createP2PMock({
        join: vi.fn(async (options) => {
          joinOptions = options;
          return { roomId: 'room-1', members: ['callee-id'] };
        }),
      });
      const onReconnectStatus = vi.fn();
      const controller = createController(p2p, { onReconnectStatus });

      controller.showIncomingCallFromNotification({
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        audioOnly: false,
        startedAt: Date.now(),
      });
      controller.acceptIncoming();
      await flushPromises();

      joinOptions?.onAlone?.({
        members: ['callee-id'],
        memberCount: 1,
        reason: 'dropped',
      });
      expect(onReconnectStatus).toHaveBeenLastCalledWith('reconnecting');

      joinOptions?.onMemberJoined?.({ memberId: 'caller-id' });
      expect(onReconnectStatus).toHaveBeenLastCalledWith('connected');

      // Timers were cleared: no teardown even after the full window elapses.
      vi.advanceTimersByTime(20_000);
      expect(p2p.dispose).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not notify accepted when joining the room fails', async () => {
    const joinError = new Error('camera blocked');
    const stream = createMediaStream({ audio: true, video: true });
    mocks.getUserMedia.mockResolvedValue(stream);
    const p2p = createP2PMock({
      join: vi.fn(() => Promise.resolve(undefined)),
      error: vi.fn(() => joinError),
    });
    const controller = createController(p2p);

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
    await vi.waitFor(() => expect(p2p.dispose).toHaveBeenCalled());
    expect(p2p.error).toHaveBeenCalledTimes(1);
    stream
      .getTracks()
      .forEach((track) => expect(track.stop).toHaveBeenCalled());
  });

  it('listens for a response before sending the invite', async () => {
    const send = deferred();
    const join = deferred();
    mocks.sendOutgoingCallInvite.mockReturnValue(send.promise);
    const p2p = createP2PMock({ join: vi.fn(() => join.promise) });
    const controller = createController(p2p);

    const start = controller.startCall({
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

  it('publishes declined when the callee rejects', async () => {
    mocks.getLoggedInUserId.mockReturnValue('caller-id');
    const controller = createController(createP2PMock({ join: vi.fn() }), {
      getCallerName: () => 'Caller',
    });

    await controller.startCall({
      calleeId: 'callee-id',
      calleeName: 'Callee',
      audioOnly: false,
    });
    await mocks.responseCallback?.({
      roomId: 'room-1',
      responseType: 'rejected',
      by: 'callee-id',
      respondedAt: Date.now(),
    });

    expect(mocks.publish).toHaveBeenCalledWith(
      'evt:call:invite:declined',
      expect.objectContaining({ roomId: 'room-1', callerId: 'caller-id' }),
    );
  });

  it('publishes unanswered when the caller cancels while ringing', async () => {
    mocks.getLoggedInUserId.mockReturnValue('caller-id');
    const controller = createController(createP2PMock({ join: vi.fn() }), {
      getCallerName: () => 'Caller',
    });

    await controller.startCall({
      calleeId: 'callee-id',
      calleeName: 'Callee',
      audioOnly: false,
    });
    controller.cancelOutgoing();

    expect(mocks.publish).toHaveBeenCalledWith(
      'evt:call:invite:unanswered',
      expect.objectContaining({ roomId: 'room-1', callerId: 'caller-id' }),
    );
  });

  it('does not send the invite when caller media permission fails', async () => {
    mocks.getUserMedia.mockRejectedValue(new Error('camera blocked'));
    const p2p = createP2PMock({ join: vi.fn() });
    const controller = createController(p2p, { getCallerName: () => 'Caller' });

    await controller.startCall({
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
    const p2p = createP2PMock({ join: vi.fn() });
    const controller = createController(p2p, { getCallerName: () => 'Caller' });

    const start = controller.startCall({
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
