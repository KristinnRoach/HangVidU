import { createEffect, createSignal, onCleanup, type Accessor } from 'solid-js';
import type { LocalTrackSlot } from '@kidlib/p2p';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';

import { getVideoConstraints } from './media-constraints.js';

export const MICROPHONE_SLOT_ID = 'microphone';
export const PRIMARY_VIDEO_SLOT_ID = 'primary-video';

const cameraKey = (device: MediaDeviceInfo) =>
  device.groupId || device.deviceId;

function uniqueCameras(devices: MediaDeviceInfo[]) {
  const cameras = devices.filter((device) => device.kind === 'videoinput');
  return cameras.filter(
    (camera, index) =>
      cameras.findIndex((other) => cameraKey(other) === cameraKey(camera)) ===
      index,
  );
}

export type CallMedia = {
  micOn: Accessor<boolean>;
  cameraOn: Accessor<boolean>;
  cameraPending: Accessor<boolean>;
  cameraSwitchAvailable: Accessor<boolean>;
  screenShareAvailable: Accessor<boolean>;
  screenSharing: Accessor<boolean>;
  setMicEnabled: (enabled: boolean) => Promise<void>;
  setCameraEnabled: (enabled: boolean) => Promise<void>;
  switchCamera: () => Promise<void>;
  toggleScreenShare: () => Promise<void>;
};

export function createCallLocalTrackSlots(
  stream: MediaStream,
): LocalTrackSlot[] {
  return [
    {
      id: MICROPHONE_SLOT_ID,
      kind: 'audio',
      track: stream.getAudioTracks()[0] ?? null,
    },
    {
      id: PRIMARY_VIDEO_SLOT_ID,
      kind: 'video',
      track: stream.getVideoTracks()[0] ?? null,
    },
  ];
}

export function createCallMedia(p2p: SolidP2PRoom): CallMedia {
  const localStream = () => p2p.localStream();
  const ownedCameraTracks = new Set<MediaStreamTrack>();
  const [micOn, setMicOn] = createSignal(false);
  const [cameraOn, setCameraOn] = createSignal(false);
  const [cameraPending, setCameraPending] = createSignal(false);
  const [cameraSwitchAvailable, setCameraSwitchAvailable] = createSignal(false);
  const [screenSharing, setScreenSharing] = createSignal(false);
  const screenShareAvailable = () =>
    typeof navigator.mediaDevices?.getDisplayMedia === 'function';
  let screenTrack: MediaStreamTrack | undefined;
  let cameraBeforeScreenShare: MediaStreamTrack | null = null;
  let screenStopRequested = false;
  let presenceWriteChain = Promise.resolve();

  function enqueuePresenceUpdate(
    room: NonNullable<ReturnType<SolidP2PRoom['room']>>,
    data: { micOn?: boolean; cameraOn?: boolean },
  ) {
    const update = presenceWriteChain.then(async () => {
      const currentData =
        room.memberPresence.find((member) => member.memberId === room.peerId)
          ?.data ?? {};
      await room.setPresenceData({ ...currentData, ...data });
    });
    presenceWriteChain = update.catch(() => {});
    return update;
  }

  async function refreshCameraSwitchAvailability(log = false) {
    const devices = await navigator.mediaDevices
      ?.enumerateDevices?.()
      .catch(() => []);
    const videoDevices =
      devices?.filter((device) => device.kind === 'videoinput') ?? [];
    const distinctCameras = uniqueCameras(videoDevices).length;
    const available = distinctCameras > 1;
    setCameraSwitchAvailable(available);
    if (log) {
      console.info('[CallMedia] Media devices changed', {
        videoInputs: videoDevices.length,
        distinctCameras,
        cameraSwitchAvailable: available,
      });
    }
  }

  const onDeviceChange = () => void refreshCameraSwitchAvailability(true);
  void refreshCameraSwitchAvailability();
  navigator.mediaDevices?.addEventListener?.('devicechange', onDeviceChange);

  const syncTrackState = () => {
    const stream = localStream();
    const audioTracks = stream?.getAudioTracks() ?? [];
    const videoTracks = stream?.getVideoTracks() ?? [];
    setMicOn(
      audioTracks.some((track) => track.readyState === 'live' && track.enabled),
    );
    setCameraOn(
      videoTracks.some((track) => track.readyState === 'live' && track.enabled),
    );
  };

  createEffect(() => {
    const stream = localStream();
    syncTrackState();
    if (!stream) return;

    let removeTrackListeners = () => {};
    const observeTracks = () => {
      removeTrackListeners();
      const tracks = stream.getTracks();
      const update = () => syncTrackState();
      tracks.forEach((track) => track.addEventListener?.('ended', update));
      removeTrackListeners = () => {
        tracks.forEach((track) => track.removeEventListener?.('ended', update));
      };
      update();
    };

    stream.addEventListener?.('addtrack', observeTracks);
    stream.addEventListener?.('removetrack', observeTracks);
    observeTracks();

    onCleanup(() => {
      stream.removeEventListener?.('addtrack', observeTracks);
      stream.removeEventListener?.('removetrack', observeTracks);
      removeTrackListeners();
    });
  });

  onCleanup(() => {
    navigator.mediaDevices?.removeEventListener?.(
      'devicechange',
      onDeviceChange,
    );
    screenTrack?.stop();
    ownedCameraTracks.forEach((track) => track.stop());
    ownedCameraTracks.clear();
  });

  async function setMicEnabled(enabled: boolean) {
    const tracks = localStream()?.getAudioTracks() ?? [];
    tracks.forEach((track) => {
      track.enabled = enabled;
    });
    syncTrackState();

    const room = p2p.room();
    if (!room)
      throw new Error('Cannot change microphone without an active room');

    await enqueuePresenceUpdate(room, { micOn: micOn() });
  }

  // Broadcasts our cameraOn flag to other members via the room's member data
  // (@kidlib/p2p "presence" — unrelated to the online/offline presence feature).
  async function publishCameraOn(
    room: NonNullable<ReturnType<SolidP2PRoom['room']>>,
    cameraOn: boolean,
  ) {
    await enqueuePresenceUpdate(room, { cameraOn });
  }

  async function finishCommittedCameraChange(
    room: NonNullable<ReturnType<SolidP2PRoom['room']>>,
    cameraOn: boolean,
    replacementError?: unknown,
  ) {
    try {
      await publishCameraOn(room, cameraOn);
    } catch (publishError) {
      if (replacementError) {
        console.error(
          '[CallMedia] Failed to publish cameraOn after a partial track replacement',
          publishError,
        );
      } else {
        throw publishError;
      }
    }
    if (replacementError) throw replacementError;
  }

  async function setCameraEnabled(enabled: boolean) {
    if (cameraPending() || screenSharing()) return;
    const room = p2p.room();
    if (!room) throw new Error('Cannot change camera without an active room');

    setCameraPending(true);
    try {
      const currentTracks = localStream()?.getVideoTracks() ?? [];

      if (!enabled) {
        try {
          let replacementError: unknown;
          try {
            await room.setLocalTrack(PRIMARY_VIDEO_SLOT_ID, null);
          } catch (error) {
            replacementError = error;
          }
          // currentTracks are stopped unconditionally in finally, so the
          // camera is off locally regardless of replacement outcome —
          // the published cameraOn flag must always reflect that.
          await finishCommittedCameraChange(room, false, replacementError);
        } finally {
          // Null is the room's desired state even after a partial pair failure.
          currentTracks.forEach((track) => {
            track.stop();
            ownedCameraTracks.delete(track);
          });
          syncTrackState();
        }
        return;
      }

      const liveTrack = currentTracks.find(
        (track) => track.readyState === 'live',
      );
      if (liveTrack) {
        liveTrack.enabled = true;
        syncTrackState();
        await publishCameraOn(room, true);
        return;
      }

      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: getVideoConstraints(),
      });
      const cameraTrack = cameraStream.getVideoTracks()[0];
      if (!cameraTrack) {
        cameraStream.getTracks().forEach((track) => track.stop());
        throw new Error('Camera acquisition returned no video track');
      }

      cameraStream
        .getTracks()
        .filter((track) => track !== cameraTrack)
        .forEach((track) => track.stop());

      void refreshCameraSwitchAvailability();

      let replacementError: unknown;
      try {
        await room.setLocalTrack(PRIMARY_VIDEO_SLOT_ID, cameraTrack);
      } catch (error) {
        replacementError = error;
      }
      try {
        if (room.localStream?.getTracks().includes(cameraTrack)) {
          ownedCameraTracks.add(cameraTrack);
          await finishCommittedCameraChange(room, true, replacementError);
        } else {
          cameraTrack.stop();
          if (replacementError) throw replacementError;
        }
      } catch (error) {
        if (!room.localStream?.getTracks().includes(cameraTrack)) {
          cameraTrack.stop();
        }
        throw error;
      } finally {
        syncTrackState();
      }
    } finally {
      setCameraPending(false);
    }
  }

  async function switchCamera() {
    if (cameraPending() || screenSharing()) return;
    const room = p2p.room();
    if (!room) throw new Error('Cannot switch camera without an active room');

    const currentTrack = localStream()
      ?.getVideoTracks()
      .find((track) => track.readyState === 'live');
    if (!currentTrack) throw new Error('Cannot switch an inactive camera');

    setCameraPending(true);
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = uniqueCameras(devices);
      const currentDeviceId = currentTrack.getSettings?.().deviceId;
      const currentDevice = devices.find(
        (device) => device.deviceId === currentDeviceId,
      );
      const currentCameraKey = currentDevice && cameraKey(currentDevice);
      const currentIndex = cameras.findIndex(
        (camera) => cameraKey(camera) === currentCameraKey,
      );
      const nextCamera = cameras[(currentIndex + 1) % cameras.length];
      if (
        !nextCamera ||
        (currentCameraKey && cameraKey(nextCamera) === currentCameraKey)
      ) {
        throw new Error('No alternate camera is available');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          ...getVideoConstraints(),
          deviceId: { exact: nextCamera.deviceId },
        },
      });
      const nextTrack = stream.getVideoTracks()[0];
      if (!nextTrack) {
        stream.getTracks().forEach((track) => track.stop());
        throw new Error('Camera switch returned no video track');
      }
      stream
        .getTracks()
        .filter((track) => track !== nextTrack)
        .forEach((track) => track.stop());
      nextTrack.enabled = currentTrack.enabled;

      try {
        await room.setLocalTrack(PRIMARY_VIDEO_SLOT_ID, nextTrack);
      } catch (error) {
        if (room.localStream?.getTracks().includes(nextTrack)) {
          ownedCameraTracks.add(nextTrack);
          currentTrack.stop();
          ownedCameraTracks.delete(currentTrack);
          syncTrackState();
        } else {
          nextTrack.stop();
        }
        throw error;
      }
      ownedCameraTracks.add(nextTrack);
      currentTrack.stop();
      ownedCameraTracks.delete(currentTrack);
      syncTrackState();
    } finally {
      setCameraPending(false);
    }
  }

  async function stopScreenShare() {
    if (!screenSharing()) return;
    if (cameraPending()) {
      screenStopRequested = true;
      return;
    }
    const room = p2p.room();
    if (!room) {
      screenTrack?.stop();
      screenTrack = undefined;
      cameraBeforeScreenShare = null;
      setScreenSharing(false);
      syncTrackState();
      return;
    }

    setCameraPending(true);
    const displayTrack = screenTrack;
    const restoreTrack =
      cameraBeforeScreenShare?.readyState === 'live'
        ? cameraBeforeScreenShare
        : null;
    try {
      let replacementError: unknown;
      try {
        await room.setLocalTrack(PRIMARY_VIDEO_SLOT_ID, restoreTrack);
      } catch (error) {
        replacementError = error;
      }
      await finishCommittedCameraChange(
        room,
        restoreTrack !== null,
        replacementError,
      );

      screenTrack = undefined;
      cameraBeforeScreenShare = null;
      setScreenSharing(false);
      displayTrack?.stop();
    } finally {
      syncTrackState();
      setCameraPending(false);
      if (screenStopRequested) {
        screenStopRequested = false;
        void stopScreenShare().catch((error) => {
          console.error('[CallMedia] Failed to stop screen sharing', error);
        });
      }
    }
  }

  async function toggleScreenShare() {
    if (screenSharing()) {
      await stopScreenShare();
      return;
    }
    if (cameraPending()) return;
    const room = p2p.room();
    if (!room) throw new Error('Cannot share screen without an active room');

    setCameraPending(true);
    cameraBeforeScreenShare =
      localStream()
        ?.getVideoTracks()
        .find((track) => track.readyState === 'live') ?? null;
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const displayTrack = stream.getVideoTracks()[0];
      if (!displayTrack) {
        stream.getTracks().forEach((track) => track.stop());
        throw new Error('Screen capture returned no video track');
      }
      displayTrack.addEventListener(
        'ended',
        () => {
          if (cameraPending()) {
            screenStopRequested = true;
            return;
          }
          void stopScreenShare().catch((error) => {
            console.error('[CallMedia] Failed to stop screen sharing', error);
          });
        },
        { once: true },
      );
      stream
        .getTracks()
        .filter((track) => track !== displayTrack)
        .forEach((track) => track.stop());

      let replacementError: unknown;
      try {
        await room.setLocalTrack(PRIMARY_VIDEO_SLOT_ID, displayTrack);
      } catch (error) {
        replacementError = error;
      }
      if (!room.localStream?.getTracks().includes(displayTrack)) {
        displayTrack.stop();
        if (replacementError) throw replacementError;
        throw new Error('Screen-share track was not published');
      }

      screenTrack = displayTrack;
      setScreenSharing(true);
      await finishCommittedCameraChange(room, true, replacementError);
      syncTrackState();
    } catch (error) {
      if (!room.localStream?.getTracks().includes(screenTrack!)) {
        screenTrack?.stop();
        screenTrack = undefined;
        cameraBeforeScreenShare = null;
      }
      throw error;
    } finally {
      setCameraPending(false);
      if (screenStopRequested) {
        screenStopRequested = false;
        void stopScreenShare().catch((error) => {
          console.error('[CallMedia] Failed to stop screen sharing', error);
        });
      }
    }
  }

  return {
    micOn,
    cameraOn,
    cameraPending,
    cameraSwitchAvailable,
    screenShareAvailable,
    screenSharing,
    setMicEnabled,
    setCameraEnabled,
    switchCamera,
    toggleScreenShare,
  };
}
