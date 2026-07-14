import { createEffect, createSignal, onCleanup, type Accessor } from 'solid-js';
import type { LocalTrackSlot } from '@kidlib/p2p';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';

import { getVideoConstraints } from './media-constraints.js';

export const MICROPHONE_SLOT_ID = 'microphone';
export const PRIMARY_VIDEO_SLOT_ID = 'primary-video';

export type CallMedia = {
  micOn: Accessor<boolean>;
  cameraOn: Accessor<boolean>;
  cameraPending: Accessor<boolean>;
  setMicEnabled: (enabled: boolean) => void;
  setCameraEnabled: (enabled: boolean) => Promise<void>;
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
    ownedCameraTracks.forEach((track) => track.stop());
    ownedCameraTracks.clear();
  });

  function setMicEnabled(enabled: boolean) {
    const tracks = localStream()?.getAudioTracks() ?? [];
    tracks.forEach((track) => {
      track.enabled = enabled;
    });
    syncTrackState();
  }

  async function publishCameraPresence(
    room: NonNullable<ReturnType<SolidP2PRoom['room']>>,
    cameraOn: boolean,
  ) {
    const currentData =
      room.memberPresence.find((member) => member.memberId === room.peerId)
        ?.data ?? {};
    await room.setPresenceData({ ...currentData, cameraOn });
  }

  async function finishCommittedCameraChange(
    room: NonNullable<ReturnType<SolidP2PRoom['room']>>,
    cameraOn: boolean,
    replacementError?: unknown,
  ) {
    try {
      await publishCameraPresence(room, cameraOn);
    } catch (presenceError) {
      if (replacementError) {
        console.error(
          '[CallMedia] Failed to publish camera presence after a partial track replacement',
          presenceError,
        );
      } else {
        throw presenceError;
      }
    }
    if (replacementError) throw replacementError;
  }

  async function setCameraEnabled(enabled: boolean) {
    if (cameraPending()) return;
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
          const cameraWasRemoved = currentTracks.every(
            (track) => !room.localStream?.getTracks().includes(track),
          );
          if (cameraWasRemoved) {
            await finishCommittedCameraChange(room, false, replacementError);
          } else if (replacementError) {
            throw replacementError;
          }
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
        await publishCameraPresence(room, true);
        syncTrackState();
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

  return {
    micOn,
    cameraOn,
    cameraPending,
    setMicEnabled,
    setCameraEnabled,
  };
}
