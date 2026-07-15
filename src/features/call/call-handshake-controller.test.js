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
    const p2p = {
      join: vi.fn(async () => ({
        roomId: 'room-1',
        members: ['callee-id'],
      })),
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
        presenceData: { cameraOn: false },
      }),
    );
    const joinOptions = p2p.join.mock.calls[0][0];
    await expect(joinOptions.getLocalStream()).resolves.toBe(stream);
  });

  it('closes a notification-opened call when the remote caller leaves while the accept response is pending', async () => {
    let onAlone;
    const acceptResponse = deferred();
    mocks.respondToIncomingCallInvite.mockReturnValue(acceptResponse.promise);
    const p2p = {
      join: vi.fn(async (options) => {
        onAlone = options.onAlone;
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

    controller.showIncomingCallFromNotification({
      roomId: 'room-1',
      callerId: 'caller-id',
      callerName: 'Caller',
      audioOnly: false,
      startedAt: Date.now(),
    });

    controller.acceptIncoming();
    await flushPromises();

    expect(mocks.respondToIncomingCallInvite).toHaveBeenCalledWith({
      roomId: 'room-1',
      callerId: 'caller-id',
      responseType: 'accepted',
    });

    onAlone?.({ members: ['callee-id'], memberCount: 1 });

    expect(p2p.close).toHaveBeenCalledTimes(1);
  });

  it('does not notify accepted when joining the room fails', async () => {
    const joinError = new Error('camera blocked');
    const stream = createMediaStream({ audio: true, video: true });
    mocks.getUserMedia.mockResolvedValue(stream);
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
    await vi.waitFor(() => expect(p2p.close).toHaveBeenCalled());
    expect(p2p.error).toHaveBeenCalledTimes(1);
    stream
      .getTracks()
      .forEach((track) => expect(track.stop).toHaveBeenCalled());
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
    const controller = new CallHandshakeController({
      p2p: {
        join: vi.fn(),
        close: vi.fn(),
        state: vi.fn(() => 'idle'),
        room: vi.fn(),
      },
      createSignaling: vi.fn(),
      getCallerName: () => 'Caller',
      onStateChange: vi.fn(),
      onCalleeBusy: vi.fn(),
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
    const controller = new CallHandshakeController({
      p2p: {
        join: vi.fn(),
        close: vi.fn(),
        state: vi.fn(() => 'idle'),
        room: vi.fn(),
      },
      createSignaling: vi.fn(),
      getCallerName: () => 'Caller',
      onStateChange: vi.fn(),
      onCalleeBusy: vi.fn(),
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
