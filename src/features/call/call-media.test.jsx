import { createRoot, createSignal } from 'solid-js';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';

import {
  MICROPHONE_SLOT_ID,
  PRIMARY_VIDEO_SLOT_ID,
  createCallLocalTrackSlots,
  createCallMedia,
} from './call-media';

const maskMocks = vi.hoisted(() => ({
  isFaceMaskSupported: vi.fn(() => true),
  createFaceMask: vi.fn(),
  preloadFaceMask: vi.fn(async () => {}),
}));
vi.mock('../experimental/face-mask', () => ({
  isFaceMaskSupported: maskMocks.isFaceMaskSupported,
  createFaceMask: maskMocks.createFaceMask,
  preloadFaceMask: maskMocks.preloadFaceMask,
}));

function createTrack(kind) {
  const listeners = new Map();
  return {
    enabled: true,
    kind,
    muted: false,
    readyState: 'live',
    addEventListener(type, listener) {
      const callbacks = listeners.get(type) ?? new Set();
      callbacks.add(listener);
      listeners.set(type, callbacks);
    },
    removeEventListener(type, listener) {
      listeners.get(type)?.delete(listener);
    },
    dispatch(type) {
      listeners.get(type)?.forEach((listener) => listener());
    },
    stop: vi.fn(function () {
      this.readyState = 'ended';
    }),
  };
}

function createStream(tracks) {
  const listeners = new Map();
  return {
    addEventListener(type, listener) {
      const callbacks = listeners.get(type) ?? new Set();
      callbacks.add(listener);
      listeners.set(type, callbacks);
    },
    removeEventListener(type, listener) {
      listeners.get(type)?.delete(listener);
    },
    dispatch(type) {
      listeners.get(type)?.forEach((listener) => listener());
    },
    getTracks: () => tracks,
    getAudioTracks: () => tracks.filter((track) => track.kind === 'audio'),
    getVideoTracks: () => tracks.filter((track) => track.kind === 'video'),
  };
}

describe('call media', () => {
  const getUserMedia = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    maskMocks.isFaceMaskSupported.mockReturnValue(false);
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: {
        mediaDevices: {
          enumerateDevices: vi.fn(async () => []),
          getSupportedConstraints: () => ({}),
          getUserMedia,
        },
        userAgent: '',
      },
    });
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        innerHeight: 720,
        innerWidth: 1280,
        matchMedia: () => ({ matches: false }),
        screen: {},
      },
    });
  });

  it('reserves a null video slot for an audio-only stream', () => {
    const microphone = createTrack('audio');
    const stream = createStream([microphone]);

    expect(createCallLocalTrackSlots(stream)).toEqual([
      { id: MICROPHONE_SLOT_ID, kind: 'audio', track: microphone },
      { id: PRIMARY_VIDEO_SLOT_ID, kind: 'video', track: null },
    ]);
  });

  it('does not offer camera switching for duplicate entries from one camera', async () => {
    navigator.mediaDevices.enumerateDevices = vi.fn(async () => [
      { kind: 'videoinput', deviceId: 'default', groupId: 'camera-1' },
      { kind: 'videoinput', deviceId: 'camera-1', groupId: 'camera-1' },
    ]);
    const p2p = {
      dataChannels: () => new Map(),
      remoteMemberStreams: () => [],
      localStream: () => undefined,
      room: () => undefined,
    };
    let media;
    let dispose;
    createRoot((rootDispose) => {
      dispose = rootDispose;
      media = createCallMedia(p2p);
    });

    await Promise.resolve();
    await Promise.resolve();

    expect(media.cameraSwitchAvailable()).toBe(false);
    dispose();
  });

  it('acquires, publishes, and switches video for an audio-only call', async () => {
    const microphone = createTrack('audio');
    const camera = createTrack('video');
    const localTracks = [microphone];
    const localStream = createStream(localTracks);
    const cameraStream = createStream([camera]);
    getUserMedia.mockResolvedValue(cameraStream);

    const room = {
      localStream,
      memberPresence: [{ memberId: 'local', data: { cameraOn: true } }],
      peerId: 'local',
      setPresenceData: vi.fn(async () => {}),
      setLocalTrack: vi.fn(async (_slotId, track) => {
        if (track) {
          localTracks.push(track);
          localStream.dispatch('addtrack');
        }
      }),
    };
    const p2p = {
      dataChannels: () => new Map(),
      remoteMemberStreams: () => [],
      localStream: () => localStream,
      room: () => room,
    };

    await createRoot(async (dispose) => {
      const media = createCallMedia(p2p);

      expect(media.cameraOn()).toBe(false);
      await media.setMicEnabled(false);
      expect(media.micOn()).toBe(false);
      expect(room.setPresenceData).toHaveBeenCalledWith({
        cameraOn: false,
        micOn: false,
      });
      await media.setCameraEnabled(true);

      expect(getUserMedia).toHaveBeenCalledWith({
        video: expect.any(Object),
      });
      expect(room.setLocalTrack).toHaveBeenCalledWith(
        PRIMARY_VIDEO_SLOT_ID,
        camera,
      );
      expect(media.cameraOn()).toBe(true);
      expect(room.setPresenceData).toHaveBeenCalledWith({
        cameraOn: true,
        micOn: false,
      });

      const backCamera = createTrack('video');
      camera.getSettings = () => ({ deviceId: 'facetime-camera' });
      navigator.mediaDevices.enumerateDevices = vi.fn(async () => [
        {
          kind: 'videoinput',
          deviceId: 'facetime-camera',
          groupId: 'facetime-group',
        },
        {
          kind: 'videoinput',
          deviceId: 'iphone-camera',
          groupId: 'iphone-group',
        },
      ]);
      getUserMedia.mockResolvedValue(createStream([backCamera]));

      await media.switchCamera();

      expect(getUserMedia).toHaveBeenLastCalledWith({
        video: expect.objectContaining({
          deviceId: { exact: 'iphone-camera' },
        }),
      });
      expect(room.setLocalTrack).toHaveBeenLastCalledWith(
        PRIMARY_VIDEO_SLOT_ID,
        backCamera,
      );
      expect(camera.stop).toHaveBeenCalledOnce();

      const frontCamera = createTrack('video');
      backCamera.getSettings = () => ({ deviceId: 'iphone-camera' });
      getUserMedia.mockResolvedValue(createStream([frontCamera]));

      await media.switchCamera();

      expect(getUserMedia).toHaveBeenLastCalledWith({
        video: expect.objectContaining({
          deviceId: { exact: 'facetime-camera' },
        }),
      });
      expect(room.setLocalTrack).toHaveBeenLastCalledWith(
        PRIMARY_VIDEO_SLOT_ID,
        frontCamera,
      );
      expect(backCamera.stop).toHaveBeenCalledOnce();
      dispose();
    });
  });

  it('serializes microphone and camera presence updates', async () => {
    const microphone = createTrack('audio');
    const camera = createTrack('video');
    camera.enabled = false;
    const localStream = createStream([microphone, camera]);
    let releaseFirstUpdate;
    const firstUpdate = new Promise((resolve) => {
      releaseFirstUpdate = resolve;
    });
    const room = {
      localStream,
      memberPresence: [
        {
          memberId: 'local',
          data: { cameraOn: false, micOn: true },
        },
      ],
      peerId: 'local',
      setPresenceData: vi.fn(async (data) => {
        if (room.setPresenceData.mock.calls.length === 1) {
          await firstUpdate;
        }
        room.memberPresence[0].data = data;
      }),
      setLocalTrack: vi.fn(async () => {}),
    };
    const p2p = {
      dataChannels: () => new Map(),
      remoteMemberStreams: () => [],
      localStream: () => localStream,
      room: () => room,
    };

    await createRoot(async (dispose) => {
      const media = createCallMedia(p2p);
      const microphoneUpdate = media.setMicEnabled(false);
      const cameraUpdate = media.setCameraEnabled(true);

      await Promise.resolve();
      expect(room.setPresenceData).toHaveBeenCalledOnce();

      releaseFirstUpdate();
      await Promise.all([microphoneUpdate, cameraUpdate]);

      expect(room.setPresenceData).toHaveBeenLastCalledWith({
        cameraOn: true,
        micOn: false,
      });
      dispose();
    });
  });

  it('shows an enabled live camera even when presence publishing fails', async () => {
    const microphone = createTrack('audio');
    const camera = createTrack('video');
    camera.enabled = false;
    const localStream = createStream([microphone, camera]);
    const publishError = new Error('presence unavailable');
    const room = {
      localStream,
      memberPresence: [],
      peerId: 'local',
      setPresenceData: vi.fn(async () => {
        throw publishError;
      }),
      setLocalTrack: vi.fn(async () => {}),
    };
    const p2p = {
      dataChannels: () => new Map(),
      remoteMemberStreams: () => [],
      localStream: () => localStream,
      room: () => room,
    };

    await createRoot(async (dispose) => {
      const media = createCallMedia(p2p);

      await expect(media.setCameraEnabled(true)).rejects.toBe(publishError);

      expect(camera.enabled).toBe(true);
      expect(media.cameraOn()).toBe(true);
      dispose();
    });
  });

  it('updates camera state when a dynamically acquired track ends', async () => {
    const microphone = createTrack('audio');
    const camera = createTrack('video');
    const localTracks = [microphone];
    const localStream = createStream(localTracks);
    getUserMedia.mockResolvedValue(createStream([camera]));

    const room = {
      localStream,
      memberPresence: [],
      peerId: 'local',
      setPresenceData: vi.fn(async () => {}),
      setLocalTrack: vi.fn(async (_slotId, track) => {
        localTracks.push(track);
        localStream.dispatch('addtrack');
      }),
    };
    const p2p = {
      dataChannels: () => new Map(),
      remoteMemberStreams: () => [],
      localStream: () => localStream,
      room: () => room,
    };

    await createRoot(async (dispose) => {
      const media = createCallMedia(p2p);
      await media.setCameraEnabled(true);

      camera.readyState = 'ended';
      camera.dispatch('ended');

      expect(media.cameraOn()).toBe(false);
      dispose();
    });
  });

  it('unpublishes and stops the camera when video is disabled', async () => {
    const microphone = createTrack('audio');
    const camera = createTrack('video');
    const localTracks = [microphone, camera];
    const localStream = createStream(localTracks);
    const room = {
      localStream,
      memberPresence: [],
      peerId: 'local',
      setPresenceData: vi.fn(async () => {}),
      setLocalTrack: vi.fn(async (_slotId, track) => {
        if (track === null) localTracks.splice(localTracks.indexOf(camera), 1);
      }),
    };
    const p2p = {
      dataChannels: () => new Map(),
      remoteMemberStreams: () => [],
      localStream: () => localStream,
      room: () => room,
    };

    await createRoot(async (dispose) => {
      const media = createCallMedia(p2p);

      await media.setCameraEnabled(false);

      expect(room.setLocalTrack).toHaveBeenCalledWith(
        PRIMARY_VIDEO_SLOT_ID,
        null,
      );
      expect(camera.stop).toHaveBeenCalledOnce();
      expect(media.cameraOn()).toBe(false);
      expect(room.setPresenceData).toHaveBeenCalledWith({
        cameraOn: false,
        micOn: true,
      });
      dispose();
    });
  });

  it('publishes camera-off presence after a partially failed replacement', async () => {
    const microphone = createTrack('audio');
    const camera = createTrack('video');
    const localTracks = [microphone, camera];
    const localStream = createStream(localTracks);
    const replacementError = new Error('remote replacement failed');
    const room = {
      localStream,
      memberPresence: [{ memberId: 'local', data: { cameraOn: true } }],
      peerId: 'local',
      setPresenceData: vi.fn(async () => {}),
      setLocalTrack: vi.fn(async () => {
        localTracks.splice(localTracks.indexOf(camera), 1);
        throw replacementError;
      }),
    };
    const p2p = {
      dataChannels: () => new Map(),
      remoteMemberStreams: () => [],
      localStream: () => localStream,
      room: () => room,
    };

    await createRoot(async (dispose) => {
      const media = createCallMedia(p2p);

      await expect(media.setCameraEnabled(false)).rejects.toBe(
        replacementError,
      );

      expect(room.setPresenceData).toHaveBeenCalledWith({
        cameraOn: false,
        micOn: true,
      });
      expect(camera.stop).toHaveBeenCalledOnce();
      dispose();
    });
  });

  it('publishes camera-on presence after a partially failed replacement', async () => {
    const microphone = createTrack('audio');
    const camera = createTrack('video');
    const localTracks = [microphone];
    const localStream = createStream(localTracks);
    getUserMedia.mockResolvedValue(createStream([camera]));
    const replacementError = new Error('remote replacement failed');
    const room = {
      localStream,
      memberPresence: [{ memberId: 'local', data: { cameraOn: false } }],
      peerId: 'local',
      setPresenceData: vi.fn(async () => {}),
      setLocalTrack: vi.fn(async () => {
        localTracks.push(camera);
        throw replacementError;
      }),
    };
    const p2p = {
      dataChannels: () => new Map(),
      remoteMemberStreams: () => [],
      localStream: () => localStream,
      room: () => room,
    };

    await createRoot(async (dispose) => {
      const media = createCallMedia(p2p);

      await expect(media.setCameraEnabled(true)).rejects.toBe(replacementError);

      expect(room.setPresenceData).toHaveBeenCalledWith({
        cameraOn: true,
        micOn: true,
      });
      expect(camera.stop).not.toHaveBeenCalled();
      dispose();
    });
  });

  it('stops a dynamically acquired camera when the call controls dispose', async () => {
    const microphone = createTrack('audio');
    const camera = createTrack('video');
    const localTracks = [microphone];
    const localStream = createStream(localTracks);
    getUserMedia.mockResolvedValue(createStream([camera]));

    const room = {
      localStream,
      memberPresence: [],
      peerId: 'local',
      setPresenceData: vi.fn(async () => {}),
      setLocalTrack: vi.fn(async (_slotId, track) => {
        if (track) {
          localTracks.push(track);
          localStream.dispatch('addtrack');
        }
      }),
    };
    const p2p = {
      dataChannels: () => new Map(),
      remoteMemberStreams: () => [],
      localStream: () => localStream,
      room: () => room,
    };

    let media;
    let dispose;
    createRoot((rootDispose) => {
      dispose = rootDispose;
      media = createCallMedia(p2p);
    });

    await media.setCameraEnabled(true);
    dispose();

    expect(camera.stop).toHaveBeenCalledOnce();
    expect(microphone.stop).not.toHaveBeenCalled();
  });
});

describe('experimental face mask lifecycle', () => {
  afterEach(() => vi.unstubAllGlobals());
  async function toggleAndApply(media) {
    const pending = media.toggleFaceMask();
    await Promise.resolve();
    if (media.faceMaskPreview()) media.applyFaceMask();
    await pending;
  }

  beforeEach(() => {
    vi.clearAllMocks();
    maskMocks.isFaceMaskSupported.mockReturnValue(true);
    vi.stubGlobal('MediaStream', function (tracks) {
      return createStream(tracks);
    });
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: {
        userAgent: '',
        mediaDevices: { enumerateDevices: async () => [] },
      },
    });
  });
  function setup(
    channelState = 'open',
    initialRemotes = [
      {
        memberId: 'remote',
        stream: createStream([createTrack('audio')]),
        data: {},
      },
    ],
  ) {
    const [remotes, setRemotes] = createSignal(initialRemotes);
    const camera = createTrack('video');
    const filtered = createTrack('video');
    const tracks = [camera];
    const stream = createStream(tracks);
    const mask = { track: filtered, dispose: vi.fn(() => filtered.stop()) };
    maskMocks.createFaceMask.mockResolvedValue(mask);
    const room = {
      localStream: stream,
      setPresenceData: vi.fn(async () => {}),
      setLocalTrack: vi.fn(async (_slot, track) => {
        tracks.splice(0, tracks.length, ...(track ? [track] : []));
      }),
    };
    let media;
    let dispose;
    const channel = { ...createTrack('channel'), readyState: channelState };
    createRoot((cleanup) => {
      dispose = cleanup;
      media = createCallMedia({
        localStream: () => stream,
        room: () => room,
        dataChannels: () => new Map([['remote', channel]]),
        remoteMemberStreams: () =>
          remotes().map(({ memberId, stream }) => ({ memberId, stream })),
        memberPresence: () =>
          remotes().map(({ memberId, data }) => ({ memberId, data })),
      });
    });
    return {
      camera,
      filtered,
      mask,
      room,
      media,
      dispose,
      channel,
      stream,
      tracks,
      setRemotes,
    };
  }

  it.each(['capture', 'ended', 'camera-off'])(
    'defaults to the remote capture source and handles %s',
    async (action) => {
      const remote = createTrack('video');
      const { media, mask, room, dispose, setRemotes } = setup('open', [
        {
          memberId: 'remote',
          stream: createStream([remote]),
          data: { cameraOn: true },
        },
      ]);
      let ready;
      maskMocks.createFaceMask.mockImplementation(
        (_camera, signal, { onCaptureReady }) =>
          new Promise((resolve, reject) => {
            ready = () => onCaptureReady(() => resolve(mask));
            signal.addEventListener(
              'abort',
              () => reject(new Error('cancelled')),
              { once: true },
            );
          }),
      );
      expect(media.remoteCaptureAvailable()).toBe(true);
      const pending = media.toggleFaceMask();
      expect(media.faceMaskCaptureTrack()).toBe(remote);
      expect(media.faceMaskOutline()).toBe(false);
      expect(maskMocks.createFaceMask.mock.calls[0][2].captureTrack()).toBe(
        remote,
      );
      expect(room.setLocalTrack).not.toHaveBeenCalled();
      if (action === 'capture') {
        ready();
        media.captureFaceMask();
        await vi.waitFor(() => expect(media.faceMaskPreview()).toBeDefined());
        media.applyFaceMask();
      } else if (action === 'ended') {
        remote.dispatch('ended');
      } else {
        setRemotes([]);
      }
      await pending;
      expect(media.faceMaskOn()).toBe(action === 'capture');
      expect(media.faceMaskError()).toBe('');
      expect(
        maskMocks.createFaceMask.mock.calls[0][2].captureTrack(),
      ).toBeUndefined();
      dispose();
      expect(remote.stop).not.toHaveBeenCalled();
    },
  );

  it.each([
    { data: [] },
    { data: [{ cameraOn: true, screenShare: true }] },
    { data: [{ cameraOn: false }] },
    { data: [{ cameraOn: true }, { cameraOn: true }] },
  ])(
    'does not select an ambiguous or unavailable remote camera: %j',
    ({ data }) => {
      const { media, dispose } = setup(
        'open',
        data.map((data, index) => ({
          memberId: String(index),
          stream: createStream([createTrack('video')]),
          data,
        })),
      );
      expect(media.remoteCaptureAvailable()).toBe(false);
      dispose();
    },
  );

  it('makes the mask available without loading libraries or replacing the camera', () => {
    const { media, room, dispose } = setup('connecting');
    expect(media.faceMaskSupported()).toBe(true);
    expect(maskMocks.preloadFaceMask).not.toHaveBeenCalled();
    expect(maskMocks.createFaceMask).not.toHaveBeenCalled();
    expect(room.setLocalTrack).not.toHaveBeenCalled();
    expect(media.faceMaskOn()).toBe(false);
    dispose();
  });

  it('starts mask initialization only after the data channel opens', async () => {
    const { media, room, dispose, channel } = setup('connecting');
    expect(media.mediaFlowing()).toBe(false);
    await toggleAndApply(media);
    expect(maskMocks.createFaceMask).not.toHaveBeenCalled();
    expect(maskMocks.preloadFaceMask).not.toHaveBeenCalled();
    expect(room.setLocalTrack).not.toHaveBeenCalled();

    channel.readyState = 'open';
    channel.dispatch('open');
    expect(media.mediaFlowing()).toBe(true);
    expect(maskMocks.preloadFaceMask).toHaveBeenCalledOnce();
    expect(maskMocks.createFaceMask).not.toHaveBeenCalled();
    await toggleAndApply(media);
    expect(maskMocks.createFaceMask).toHaveBeenCalledOnce();
    dispose();
  });

  it('waits for remote media to arrive and unmute', () => {
    const { media, dispose, setRemotes } = setup('open', []);
    expect(media.mediaFlowing()).toBe(false);
    expect(maskMocks.preloadFaceMask).not.toHaveBeenCalled();
    const remote = createTrack('audio');
    remote.muted = true;
    setRemotes([
      { memberId: 'remote', stream: createStream([remote]), data: {} },
    ]);
    expect(maskMocks.preloadFaceMask).not.toHaveBeenCalled();
    remote.muted = false;
    remote.dispatch('unmute');
    expect(media.mediaFlowing()).toBe(true);
    expect(maskMocks.preloadFaceMask).toHaveBeenCalledOnce();
    remote.muted = true;
    remote.dispatch('mute');
    expect(media.mediaFlowing()).toBe(false);
    remote.muted = false;
    remote.dispatch('unmute');
    expect(maskMocks.preloadFaceMask).toHaveBeenCalledOnce();
    dispose();
  });

  it('waits for a live local camera before preloading', () => {
    const { media, channel, stream, tracks, camera, dispose } =
      setup('connecting');
    tracks.length = 0;
    stream.dispatch('removetrack');
    channel.readyState = 'open';
    channel.dispatch('open');
    expect(media.mediaFlowing()).toBe(false);
    expect(maskMocks.preloadFaceMask).not.toHaveBeenCalled();
    tracks.push(camera);
    stream.dispatch('addtrack');
    expect(media.mediaFlowing()).toBe(true);
    expect(maskMocks.preloadFaceMask).toHaveBeenCalledOnce();
    camera.readyState = 'ended';
    camera.dispatch('ended');
    expect(media.mediaFlowing()).toBe(false);
    dispose();
  });

  it('skips the feature in unsupported environments', async () => {
    maskMocks.isFaceMaskSupported.mockReturnValueOnce(false);
    const { media, room, camera, dispose } = setup();
    expect(media.faceMaskSupported()).toBe(false);
    expect(maskMocks.preloadFaceMask).not.toHaveBeenCalled();
    await toggleAndApply(media);
    expect(maskMocks.createFaceMask).not.toHaveBeenCalled();
    expect(room.setLocalTrack).not.toHaveBeenCalled();
    expect(camera.stop).not.toHaveBeenCalled();
    dispose();
  });

  it.each(['sync', 'async'])(
    'contains %s preload failures without changing call tracks',
    async (mode) => {
      maskMocks.preloadFaceMask.mockImplementationOnce(() => {
        if (mode === 'sync') throw new Error('Model unavailable');
        return Promise.reject(new Error('Model unavailable'));
      });
      const { media, room, camera, dispose } = setup();
      await Promise.resolve();
      expect(media.faceMaskError()).toBe('Model unavailable');
      expect(media.cameraOn()).toBe(true);
      expect(room.setLocalTrack).not.toHaveBeenCalled();
      expect(camera.stop).not.toHaveBeenCalled();
      dispose();
    },
  );

  it('keeps the camera live until capture and allows cancellation', async () => {
    const { camera, mask, room, media, dispose } = setup();
    maskMocks.createFaceMask.mockImplementation(
      (_camera, signal, { onCaptureReady }) =>
        new Promise((resolve, reject) => {
          onCaptureReady(() => resolve(mask));
          signal.addEventListener(
            'abort',
            () => reject(new Error('cancelled')),
            { once: true },
          );
        }),
    );
    const cancelled = media.toggleFaceMask();
    expect(media.faceMaskCapturing()).toBe(true);
    expect(media.faceMaskCaptureReady()).toBe(true);
    expect(room.localStream.getVideoTracks()).toEqual([camera]);
    expect(room.setLocalTrack).not.toHaveBeenCalled();
    media.cancelFaceMaskCapture();
    await cancelled;
    expect(media.faceMaskCapturing()).toBe(false);
    expect(media.cameraPending()).toBe(false);
    expect(media.faceMaskError()).toBe('');
    const captured = media.toggleFaceMask();
    media.captureFaceMask();
    await vi.waitFor(() => expect(media.faceMaskPreview()).toBeDefined());
    expect(room.setLocalTrack).not.toHaveBeenCalled();
    media.applyFaceMask();
    await captured;
    expect(media.faceMaskOn()).toBe(true);
    expect(media.faceMaskCaptureReady()).toBe(false);
    dispose();
  });

  it('retakes or cancels a private preview without publishing it', async () => {
    const { media, mask, room, dispose } = setup();
    const pending = media.toggleFaceMask();
    await vi.waitFor(() => expect(media.faceMaskPreview()).toBeDefined());
    expect(room.setLocalTrack).not.toHaveBeenCalled();
    media.retakeFaceMask();
    await vi.waitFor(() =>
      expect(maskMocks.createFaceMask).toHaveBeenCalledTimes(2),
    );
    expect(mask.dispose).toHaveBeenCalledOnce();
    await vi.waitFor(() => expect(media.faceMaskPreview()).toBeDefined());
    media.cancelFaceMaskCapture();
    await pending;
    expect(mask.dispose).toHaveBeenCalledTimes(2);
    expect(media.faceMaskPreview()).toBeUndefined();
    expect(media.cameraPending()).toBe(false);
    expect(room.setLocalTrack).not.toHaveBeenCalled();
    dispose();
  });

  it.each(['source', 'mode'])(
    'restarts a private preview when changing %s',
    async (change) => {
      const remote = createTrack('video');
      const { media, mask, room, dispose } = setup('open', [
        {
          memberId: 'remote',
          stream: createStream([remote]),
          data: { cameraOn: true },
        },
      ]);
      const pending = media.toggleFaceMask();
      await vi.waitFor(() => expect(media.faceMaskPreview()).toBeDefined());
      maskMocks.createFaceMask.mock.calls[0][2].onCaptureStatus(2);
      expect(media.faceMaskCaptureStatus()).toBe(2);
      if (change === 'source') media.setFaceMaskSource(false);
      else media.toggleFaceMaskOutline();
      expect(media.faceMaskPreview()).toBeUndefined();
      expect(media.faceMaskCaptureStatus()).toBe('preparing');
      await vi.waitFor(() =>
        expect(maskMocks.createFaceMask).toHaveBeenCalledTimes(2),
      );
      expect(mask.dispose).toHaveBeenCalledOnce();
      const options = maskMocks.createFaceMask.mock.calls[1][2];
      expect(options.captureMode()).toBe(
        change === 'mode' ? 'outline' : 'detected',
      );
      expect(options.captureTrack()).toBe(
        change === 'source' ? undefined : remote,
      );
      await vi.waitFor(() => expect(media.faceMaskPreview()).toBeDefined());
      media.applyFaceMask();
      await pending;
      expect(room.setLocalTrack).toHaveBeenCalledOnce();
      dispose();
    },
  );

  it('restarts a pending capture when the mode changes', async () => {
    const { media, mask, room, dispose } = setup();
    maskMocks.createFaceMask.mockImplementationOnce(
      (_camera, signal) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener(
            'abort',
            () => reject(new Error('cancelled')),
            { once: true },
          );
        }),
    );
    const pending = media.toggleFaceMask();
    media.toggleFaceMaskOutline();
    await vi.waitFor(() =>
      expect(maskMocks.createFaceMask).toHaveBeenCalledTimes(2),
    );
    await vi.waitFor(() => expect(media.faceMaskPreview()).toBeDefined());
    expect(media.faceMaskError()).toBe('');
    media.cancelFaceMaskCapture();
    await pending;
    expect(mask.dispose).toHaveBeenCalledOnce();
    expect(room.setLocalTrack).not.toHaveBeenCalled();
    dispose();
  });

  it('disposes a pending preview when the call ends', async () => {
    const { media, mask, room, dispose } = setup();
    const pending = media.toggleFaceMask();
    await vi.waitFor(() => expect(media.faceMaskPreview()).toBeDefined());
    dispose();
    await pending;
    expect(mask.dispose).toHaveBeenCalledOnce();
    expect(room.setLocalTrack).not.toHaveBeenCalled();
  });
  it('publishes the mask and restores the live camera without reacquiring it', async () => {
    const { camera, filtered, mask, room, media, dispose } = setup();
    await toggleAndApply(media);
    expect(room.setLocalTrack).toHaveBeenLastCalledWith(
      PRIMARY_VIDEO_SLOT_ID,
      filtered,
    );
    expect(media.faceMaskOn()).toBe(true);
    expect(camera.stop).not.toHaveBeenCalled();
    await toggleAndApply(media);
    expect(room.setLocalTrack).toHaveBeenLastCalledWith(
      PRIMARY_VIDEO_SLOT_ID,
      camera,
    );
    expect(mask.dispose).toHaveBeenCalledOnce();
    expect(media.faceMaskOn()).toBe(false);
    dispose();
  });

  it('restores the camera after the data channel closes and blocks reactivation', async () => {
    const { camera, mask, room, media, dispose, channel } = setup();
    await toggleAndApply(media);
    channel.readyState = 'closed';
    channel.dispatch('close');
    expect(media.mediaFlowing()).toBe(false);
    await toggleAndApply(media);
    expect(room.setLocalTrack).toHaveBeenLastCalledWith(
      PRIMARY_VIDEO_SLOT_ID,
      camera,
    );
    expect(mask.dispose).toHaveBeenCalledOnce();
    expect(media.faceMaskOn()).toBe(false);
    await toggleAndApply(media);
    expect(maskMocks.createFaceMask).toHaveBeenCalledOnce();
    dispose();
  });

  it('cancels a failed private preview without publishing it', async () => {
    const { camera, mask, room, media, dispose } = setup();
    const pending = media.toggleFaceMask();
    await vi.waitFor(() => expect(media.faceMaskPreview()).toBeDefined());
    maskMocks.createFaceMask.mock.calls[0][2].onError(
      new Error('Face mask tracking stopped. Try again.'),
    );
    await pending;
    expect(media.faceMaskPreview()).toBeUndefined();
    expect(media.faceMaskCapturing()).toBe(false);
    expect(media.faceMaskError()).toBe(
      'Face mask tracking stopped. Try again.',
    );
    expect(room.setLocalTrack).not.toHaveBeenCalled();
    expect(mask.dispose).toHaveBeenCalledOnce();
    expect(camera.stop).not.toHaveBeenCalled();
    dispose();
  });

  it('restores the camera and reports a renderer failure after publishing', async () => {
    const { camera, mask, room, media, dispose } = setup();
    await toggleAndApply(media);
    const { onError } = maskMocks.createFaceMask.mock.calls[0][2];
    onError(new Error('Renderer stopped'));
    await vi.waitFor(() => expect(media.faceMaskOn()).toBe(false));
    expect(room.setLocalTrack).toHaveBeenLastCalledWith(
      PRIMARY_VIDEO_SLOT_ID,
      camera,
    );
    expect(media.faceMaskError()).toBe('Renderer stopped');
    expect(mask.dispose).toHaveBeenCalledOnce();
    expect(camera.stop).not.toHaveBeenCalled();
    dispose();
  });

  it('camera off disposes the effect and stops the retained camera', async () => {
    const { camera, mask, room, media, dispose } = setup();
    await toggleAndApply(media);
    await media.setCameraEnabled(false);
    expect(room.setLocalTrack).toHaveBeenLastCalledWith(
      PRIMARY_VIDEO_SLOT_ID,
      null,
    );
    expect(camera.stop).toHaveBeenCalledOnce();
    expect(mask.dispose).toHaveBeenCalledOnce();
    expect(media.cameraOn()).toBe(false);
    dispose();
  });

  it('completes camera off when restoring the raw camera fails', async () => {
    const { camera, filtered, mask, room, media, dispose } = setup();
    await toggleAndApply(media);
    const replaceTrack = room.setLocalTrack.getMockImplementation();
    room.setLocalTrack.mockImplementationOnce(async (slot, track) => {
      await replaceTrack(slot, track);
      throw new Error('Peer track replacement failed');
    });

    await media.setCameraEnabled(false);

    expect(room.setLocalTrack).toHaveBeenLastCalledWith(
      PRIMARY_VIDEO_SLOT_ID,
      null,
    );
    expect(camera.stop).toHaveBeenCalledOnce();
    expect(filtered.stop).toHaveBeenCalledOnce();
    expect(mask.dispose).toHaveBeenCalledOnce();
    expect(media.cameraOn()).toBe(false);
    expect(media.faceMaskOn()).toBe(false);
    expect(media.cameraPending()).toBe(false);
    expect(room.setPresenceData).toHaveBeenLastCalledWith(
      expect.objectContaining({ cameraOn: false }),
    );
    dispose();
  });

  it('hangup stops both the raw camera and filtered track', async () => {
    const { camera, mask, media, dispose } = setup();
    await toggleAndApply(media);
    dispose();
    expect(mask.dispose).toHaveBeenCalledOnce();
    expect(camera.stop).toHaveBeenCalledOnce();
  });

  it('does not publish a processor that completes after hangup', async () => {
    const { mask, room, media, dispose } = setup();
    let finish;
    maskMocks.createFaceMask.mockImplementation(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    const pending = media.toggleFaceMask();
    await vi.waitFor(() => expect(finish).toBeTypeOf('function'));
    dispose();
    finish(mask);
    await pending;
    expect(room.setLocalTrack).not.toHaveBeenCalled();
    expect(mask.dispose).toHaveBeenCalledOnce();
  });

  it('leaves the original camera published when model loading fails', async () => {
    const { camera, room, media, dispose } = setup();
    maskMocks.createFaceMask.mockRejectedValue(new Error('Model unavailable'));
    await toggleAndApply(media);
    expect(room.localStream.getVideoTracks()).toEqual([camera]);
    expect(media.faceMaskError()).toBe('Model unavailable');
    expect(media.cameraPending()).toBe(false);
    dispose();
  });
});
