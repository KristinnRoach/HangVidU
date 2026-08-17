import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';

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
const CALL_INVITE_ID = 'call-invite-1';

describe('CallHandshakeController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.incomingCallback = undefined;
    mocks.responseCallback = undefined;
    vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(CALL_INVITE_ID);
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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('dismisses a matching incoming call when another device handles it', () => {
    const onStateChange = vi.fn();
    const controller = createController(createP2PMock(), { onStateChange });

    controller.init();
    mocks.incomingCallback?.({
      type: 'invite',
      invite: {
        callInviteId: CALL_INVITE_ID,
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        audioOnly: false,
        expiresAt: Date.now() + 60_000,
      },
    });
    mocks.incomingCallback?.({
      type: 'handled',
      callInviteId: CALL_INVITE_ID,
      roomId: 'room-1',
      by: 'callee-id',
    });

    expect(onStateChange).toHaveBeenLastCalledWith(null);
  });

  it('dismisses an incoming call when its invite expires', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-14T12:00:00Z'));
    try {
      const onStateChange = vi.fn();
      const controller = createController(createP2PMock(), { onStateChange });

      controller.init();
      mocks.incomingCallback?.({
        type: 'invite',
        invite: {
          callInviteId: CALL_INVITE_ID,
          roomId: 'room-1',
          callerId: 'caller-id',
          callerName: 'Caller',
          startedAt: Date.now(),
          expiresAt: Date.now() + 1_000,
        },
      });

      expect(onStateChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ direction: 'incoming' }),
      );
      vi.advanceTimersByTime(1_000);
      expect(onStateChange).toHaveBeenLastCalledWith(null);
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not surface an invite that is already expired', () => {
    const onStateChange = vi.fn();
    const controller = createController(createP2PMock(), { onStateChange });

    controller.init();
    mocks.incomingCallback?.({
      type: 'invite',
      invite: {
        callInviteId: CALL_INVITE_ID,
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        startedAt: Date.now() - 2_000,
        expiresAt: Date.now() - 1_000,
      },
    });

    expect(onStateChange).not.toHaveBeenCalled();
  });

  it('does not accept an invite that expired while its dialog was open', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-14T12:00:00Z'));
    try {
      const log = vi.spyOn(console, 'log').mockImplementation(() => {});
      const onStateChange = vi.fn();
      const p2p = createP2PMock();
      const controller = createController(p2p, { onStateChange });

      controller.init();
      mocks.incomingCallback?.({
        type: 'invite',
        invite: {
          callInviteId: CALL_INVITE_ID,
          roomId: 'room-1',
          callerId: 'caller-id',
          callerName: 'Caller',
          startedAt: Date.now(),
          expiresAt: Date.now() + 1_000,
        },
      });
      vi.setSystemTime(Date.now() + 1_000);

      controller.acceptIncoming();

      expect(onStateChange).toHaveBeenLastCalledWith(null);
      expect(mocks.getUserMedia).not.toHaveBeenCalled();
      expect(p2p.join).not.toHaveBeenCalled();
      expect(mocks.respondToIncomingCallInvite).not.toHaveBeenCalled();
      expect(log).toHaveBeenCalledWith('[call] incoming acceptance stopped', {
        reason: 'expired-before-start',
        roomId: 'room-1',
        callInviteId: CALL_INVITE_ID,
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it('logs when incoming acceptance cannot start without its service', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const controller = createController(createP2PMock());

    controller.init();
    mocks.incomingCallback?.({
      type: 'invite',
      invite: {
        callInviteId: CALL_INVITE_ID,
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        expiresAt: Date.now() + 60_000,
      },
    });
    mocks.getCallService.mockReturnValue(null);

    controller.acceptIncoming();

    expect(warn).toHaveBeenCalledWith(
      '[call] incoming acceptance unavailable',
      {
        reason: 'service-unavailable',
        roomId: 'room-1',
        callInviteId: CALL_INVITE_ID,
      },
    );
  });

  it('aborts acceptance when media permission resolves after invite expiry', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-14T12:00:00Z'));
    try {
      const localStream = createMediaStream({ audio: true, video: true });
      const pendingMedia = deferred();
      mocks.getUserMedia.mockReturnValue(pendingMedia.promise);
      const onStateChange = vi.fn();
      const p2p = createP2PMock();
      const controller = createController(p2p, { onStateChange });

      controller.init();
      mocks.incomingCallback?.({
        type: 'invite',
        invite: {
          callInviteId: CALL_INVITE_ID,
          roomId: 'room-1',
          callerId: 'caller-id',
          callerName: 'Caller',
          startedAt: Date.now(),
          expiresAt: Date.now() + 1_000,
        },
      });
      controller.acceptIncoming();

      await vi.advanceTimersByTimeAsync(1_000);
      await flushPromises();

      expect(onStateChange).toHaveBeenLastCalledWith(null);
      expect(p2p.join).not.toHaveBeenCalled();
      expect(mocks.respondToIncomingCallInvite).not.toHaveBeenCalled();

      pendingMedia.resolve(localStream);
      await flushPromises();
      localStream
        .getTracks()
        .forEach((track) => expect(track.stop).toHaveBeenCalledOnce());
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not accept when the invite expires before a delayed join resolves', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-14T12:00:00Z'));
    try {
      const log = vi.spyOn(console, 'log').mockImplementation(() => {});
      const join = deferred();
      let joinOptions;
      const p2p = createP2PMock({
        join: vi.fn((options) => {
          joinOptions = options;
          return join.promise;
        }),
      });
      const controller = createController(p2p);

      controller.init();
      mocks.incomingCallback?.({
        type: 'invite',
        invite: {
          callInviteId: CALL_INVITE_ID,
          roomId: 'room-1',
          callerId: 'caller-id',
          callerName: 'Caller',
          startedAt: Date.now(),
          expiresAt: Date.now() + 1_000,
        },
      });
      controller.acceptIncoming();
      await flushPromises();

      // Move the clock past the deadline without running the timeout callback.
      vi.setSystemTime(Date.now() + 1_000);
      join.resolve({ roomId: 'room-1', members: ['callee-id'] });
      await flushPromises();

      expect(joinOptions.signal.aborted).toBe(true);
      expect(mocks.respondToIncomingCallInvite).not.toHaveBeenCalled();
      expect(log).toHaveBeenCalledWith('[call] incoming acceptance stopped', {
        reason: 'expired-during-acceptance',
        roomId: 'room-1',
        callInviteId: CALL_INVITE_ID,
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it('aborts an active acceptance when the invite is dismissed', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const join = deferred();
    let joinOptions;
    const onStateChange = vi.fn();
    const p2p = createP2PMock({
      join: vi.fn((options) => {
        joinOptions = options;
        return join.promise;
      }),
    });
    const controller = createController(p2p, { onStateChange });

    controller.init();
    mocks.incomingCallback?.({
      type: 'invite',
      invite: {
        callInviteId: CALL_INVITE_ID,
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        expiresAt: Date.now() + 60_000,
      },
    });
    controller.acceptIncoming();
    await flushPromises();

    mocks.incomingCallback?.({
      type: 'cancel',
      callInviteId: CALL_INVITE_ID,
      roomId: 'room-1',
      by: 'caller-id',
    });

    expect(joinOptions.signal.aborted).toBe(true);
    expect(onStateChange).toHaveBeenLastCalledWith(null);

    join.resolve({ roomId: 'room-1', members: ['callee-id'] });
    await flushPromises();
    expect(mocks.respondToIncomingCallInvite).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith('[call] incoming acceptance stopped', {
      reason: 'cancelled-during-acceptance',
      roomId: 'room-1',
      callInviteId: CALL_INVITE_ID,
    });
  });

  it('keeps accepting when the responding callee receives its handled echo', async () => {
    const response = deferred();
    mocks.respondToIncomingCallInvite.mockReturnValue(response.promise);
    let joinOptions;
    const onStateChange = vi.fn();
    const p2p = createP2PMock({
      join: vi.fn(async (options) => {
        joinOptions = options;
        return { roomId: 'room-1', members: ['callee-id'] };
      }),
    });
    const controller = createController(p2p, { onStateChange });

    controller.init();
    mocks.incomingCallback?.({
      type: 'invite',
      invite: {
        callInviteId: CALL_INVITE_ID,
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        expiresAt: Date.now() + 60_000,
      },
    });
    controller.acceptIncoming();
    await flushPromises();

    mocks.incomingCallback?.({
      type: 'handled',
      callInviteId: CALL_INVITE_ID,
      roomId: 'room-1',
      by: 'callee-id',
    });

    expect(joinOptions.signal.aborted).toBe(false);
    expect(onStateChange).toHaveBeenLastCalledWith({
      direction: 'accepting',
      call: expect.objectContaining({ callInviteId: CALL_INVITE_ID }),
    });

    response.resolve();
    await vi.waitFor(() => {
      expect(onStateChange).toHaveBeenLastCalledWith(null);
    });
  });

  it('joins the room before notifying the caller that an incoming call was accepted', async () => {
    const join = deferred();
    const p2p = createP2PMock({ join: vi.fn(() => join.promise) });
    const onStateChange = vi.fn();
    const controller = createController(p2p, { onStateChange });

    controller.init();
    mocks.incomingCallback?.({
      type: 'invite',
      invite: {
        callInviteId: CALL_INVITE_ID,
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
        iceRecovery: {},
        iceServersProvider: expect.any(Function),
      }),
    );
    expect(mocks.respondToIncomingCallInvite).not.toHaveBeenCalled();
    expect(onStateChange).toHaveBeenLastCalledWith({
      direction: 'accepting',
      call: expect.objectContaining({ roomId: 'room-1' }),
    });

    join.resolve({ roomId: 'room-1', members: ['callee-id'] });
    await flushPromises();

    expect(mocks.respondToIncomingCallInvite).toHaveBeenCalledWith({
      callInviteId: CALL_INVITE_ID,
      roomId: 'room-1',
      callerId: 'caller-id',
      responseType: 'accepted',
    });
    await vi.waitFor(() => {
      expect(onStateChange).toHaveBeenLastCalledWith(null);
    });
  });

  it('provides authenticated TURN credentials to the room', async () => {
    const credentials = {
      iceServers: [
        {
          urls: 'turn:turn.cloudflare.com:3478?transport=udp',
          username: 'short-lived-user',
          credential: 'short-lived-credential',
        },
      ],
      expiresAt: Date.now() + 3_600_000,
    };
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(Response.json(credentials));
    const p2p = createP2PMock({
      join: vi.fn(async () => ({
        roomId: 'room-1',
        members: ['callee-id'],
      })),
    });
    const controller = createController(p2p);
    controller.showIncomingCallFromNotification({
      callInviteId: CALL_INVITE_ID,
      roomId: 'room-1',
      callerId: 'caller-id',
    });
    controller.acceptIncoming();
    await flushPromises();
    const provider = p2p.join.mock.calls[0][0].iceServersProvider;
    const signal = new AbortController().signal;

    await expect(provider({ reason: 'initial', signal })).resolves.toEqual(
      credentials,
    );
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.hangvidu.com/turn-credentials',
      {
        method: 'POST',
        headers: { Authorization: 'Bearer token' },
        signal: expect.any(AbortSignal),
      },
    );
  });

  it('falls back to Google STUN when the TURN credential fetch hangs', async () => {
    vi.useFakeTimers();
    try {
      const timeout = vi
        .spyOn(AbortSignal, 'timeout')
        .mockImplementation((ms) => {
          const controller = new AbortController();
          setTimeout(() => controller.abort(new DOMException('Timed out')), ms);
          return controller.signal;
        });
      vi.spyOn(globalThis, 'fetch').mockImplementation(
        (_input, { signal }) =>
          new Promise((_resolve, reject) => {
            signal.addEventListener('abort', () => reject(signal.reason), {
              once: true,
            });
          }),
      );
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      const p2p = createP2PMock({
        join: vi.fn(async () => ({
          roomId: 'room-1',
          members: ['callee-id'],
        })),
      });
      const controller = createController(p2p);
      controller.showIncomingCallFromNotification({
        callInviteId: CALL_INVITE_ID,
        roomId: 'room-1',
        callerId: 'caller-id',
      });
      controller.acceptIncoming();
      await flushPromises();
      const provider = p2p.join.mock.calls[0][0].iceServersProvider;

      const result = provider({
        reason: 'initial',
        signal: new AbortController().signal,
      });
      await vi.advanceTimersByTimeAsync(4_000);

      await expect(result).resolves.toEqual({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      expect(timeout).toHaveBeenCalledWith(4_000);
    } finally {
      vi.useRealTimers();
    }
  });

  it('falls back to Google STUN after ordinary provider failure but preserves aborts', async () => {
    const networkError = new Error('network unavailable');
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(networkError);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const p2p = createP2PMock({
      join: vi.fn(async () => ({
        roomId: 'room-1',
        members: ['callee-id'],
      })),
    });
    const controller = createController(p2p);
    controller.showIncomingCallFromNotification({
      callInviteId: CALL_INVITE_ID,
      roomId: 'room-1',
      callerId: 'caller-id',
    });
    controller.acceptIncoming();
    await flushPromises();
    const provider = p2p.join.mock.calls[0][0].iceServersProvider;

    await expect(
      provider({
        reason: 'initial',
        signal: new AbortController().signal,
      }),
    ).resolves.toEqual({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    expect(warn).toHaveBeenCalledWith(
      '[call] TURN credentials unavailable; using STUN fallback',
    );

    const controllerForAbort = new AbortController();
    controllerForAbort.abort();
    await expect(
      provider({ reason: 'manual', signal: controllerForAbort.signal }),
    ).rejects.toBe(networkError);
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
        callInviteId: CALL_INVITE_ID,
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
        callInviteId: CALL_INVITE_ID,
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

  it('fails the call on initial peer/session errors, ignoring other room errors', async () => {
    vi.useFakeTimers();
    try {
      let joinOptions;
      mocks.respondToIncomingCallInvite.mockReturnValue(deferred().promise);
      const p2p = createP2PMock({
        join: vi.fn(async (options) => {
          joinOptions = options;
          return { roomId: 'room-1', members: ['callee-id'] };
        }),
      });
      const onReconnectStatus = vi.fn();
      const controller = createController(p2p, { onReconnectStatus });

      controller.showIncomingCallFromNotification({
        callInviteId: CALL_INVITE_ID,
        roomId: 'room-1',
        callerId: 'caller-id',
        callerName: 'Caller',
        audioOnly: false,
        startedAt: Date.now(),
      });
      controller.acceptIncoming();
      await flushPromises();

      expect(joinOptions?.connectedTimeoutMs).toBe(20_000);

      joinOptions?.onError?.({ error: new Error('presence refresh failed') });
      expect(onReconnectStatus).not.toHaveBeenCalledWith('connect-failed');

      joinOptions?.onError?.({
        error: new Error('Peer.start: connection failed'),
      });
      expect(onReconnectStatus).toHaveBeenLastCalledWith('connect-failed');

      joinOptions?.onError?.({
        error: new Error(
          'P2PSession: data channel open timed out after 10000ms',
        ),
      });
      expect(onReconnectStatus).toHaveBeenLastCalledWith('connect-failed');
      expect(p2p.dispose).not.toHaveBeenCalled();

      // A member event can cancel reconnect grace, but not the bounded exit
      // scheduled for an initial connection failure.
      joinOptions?.onMemberJoined?.({ memberId: 'caller-id' });
      vi.advanceTimersByTime(4_000);
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
      callInviteId: CALL_INVITE_ID,
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
        callInviteId: CALL_INVITE_ID,
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
        callInviteId: CALL_INVITE_ID,
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
      callInviteId: CALL_INVITE_ID,
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
    expect(mocks.ackCallResponse).toHaveBeenCalledWith(
      'room-1',
      CALL_INVITE_ID,
    );
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
      callInviteId: CALL_INVITE_ID,
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

  it('publishes busy when the callee is already in a call', async () => {
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
      callInviteId: CALL_INVITE_ID,
      roomId: 'room-1',
      responseType: 'busy',
      by: 'callee-id',
      respondedAt: Date.now(),
    });

    expect(mocks.publish).toHaveBeenCalledWith(
      'evt:call:invite:busy',
      expect.objectContaining({ roomId: 'room-1', callerId: 'caller-id' }),
    );
  });

  it.each(['hangUp', 'cleanup'])(
    'publishes a completed call when %s ends the connection',
    async (endMethod) => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-08-16T12:00:00Z'));
      try {
        vi.spyOn(console, 'log').mockImplementation(() => {});
        mocks.getLoggedInUserId.mockReturnValue('caller-id');
        let joinOptions;
        const p2p = createP2PMock({
          join: vi.fn(async (options) => {
            joinOptions = options;
            return { roomId: 'room-1', members: ['caller-id'] };
          }),
        });
        const controller = createController(p2p, {
          getCallerName: () => 'Caller',
        });

        await controller.startCall({
          calleeId: 'callee-id',
          calleeName: 'Callee',
          audioOnly: true,
        });
        await mocks.responseCallback?.({
          callInviteId: CALL_INVITE_ID,
          roomId: 'room-1',
          responseType: 'accepted',
          by: 'callee-id',
          respondedAt: Date.now(),
        });

        joinOptions.onDataChannelOpen();
        vi.advanceTimersByTime(83_000);
        controller[endMethod]();

        expect(mocks.publish).toHaveBeenCalledWith(
          'evt:call:session:completed',
          expect.objectContaining({
            roomId: 'room-1',
            audioOnly: true,
            durationSeconds: 83,
          }),
        );
      } finally {
        vi.useRealTimers();
      }
    },
  );

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
