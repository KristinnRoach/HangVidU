import { createRoot } from 'solid-js';
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

import {
  MICROPHONE_SLOT_ID,
  PRIMARY_VIDEO_SLOT_ID,
  createCallLocalTrackSlots,
  createCallMedia,
} from './call-media';

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
    const p2p = { localStream: () => undefined, room: () => undefined };
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
      localStream: () => localStream,
      room: () => room,
    };

    await createRoot(async (dispose) => {
      const media = createCallMedia(p2p);

      expect(media.cameraOn()).toBe(false);
      await media.setCameraEnabled(true);

      expect(getUserMedia).toHaveBeenCalledWith({
        video: expect.any(Object),
      });
      expect(room.setLocalTrack).toHaveBeenCalledWith(
        PRIMARY_VIDEO_SLOT_ID,
        camera,
      );
      expect(media.cameraOn()).toBe(true);
      expect(room.setPresenceData).toHaveBeenCalledWith({ cameraOn: true });

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
      expect(backCamera.stop).toHaveBeenCalledOnce();
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
      expect(room.setPresenceData).toHaveBeenCalledWith({ cameraOn: false });
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
      localStream: () => localStream,
      room: () => room,
    };

    await createRoot(async (dispose) => {
      const media = createCallMedia(p2p);

      await expect(media.setCameraEnabled(false)).rejects.toBe(
        replacementError,
      );

      expect(room.setPresenceData).toHaveBeenCalledWith({ cameraOn: false });
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
      localStream: () => localStream,
      room: () => room,
    };

    await createRoot(async (dispose) => {
      const media = createCallMedia(p2p);

      await expect(media.setCameraEnabled(true)).rejects.toBe(replacementError);

      expect(room.setPresenceData).toHaveBeenCalledWith({ cameraOn: true });
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
