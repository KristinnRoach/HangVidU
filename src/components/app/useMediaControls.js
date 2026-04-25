import { createSignal, onCleanup, onMount } from 'solid-js';
import CallController from '../../features/call/call-controller.js';
import { subscribe } from '../../shared/events/index.js';
import { getElements } from '../../elements.js';
import {
  getFacingMode,
  getLocalStream,
  setFacingMode,
} from '../../shared/media/state.js';
import {
  hasFrontAndBackCameras,
  switchVideoStreamFacingMode,
} from '../../shared/media/media-devices.js';

function readLocalStream() {
  try {
    return getLocalStream();
  } catch {
    return null;
  }
}

function readMediaElements() {
  const { localVideoEl, remoteVideoEl } = getElements();
  return { localVideoEl, remoteVideoEl };
}

export function useMediaControls() {
  const [hasLocalMedia, setHasLocalMedia] = createSignal(false);
  const [micMuted, setMicMuted] = createSignal(false);
  const [cameraEnabled, setCameraEnabled] = createSignal(true);
  const [canSwitchCamera, setCanSwitchCamera] = createSignal(false);
  const [remoteMuted, setRemoteMuted] = createSignal(false);
  const [remoteControlsEnabled, setRemoteControlsEnabled] = createSignal(false);
  let didAutoMuteInDev = false;

  function syncLocalTrackState() {
    const localStream = readLocalStream();
    setHasLocalMedia(!!localStream);
    if (!localStream) return;

    const audioTrack = localStream.getAudioTracks()[0];
    const videoTrack = localStream.getVideoTracks()[0];
    if (audioTrack) setMicMuted(!audioTrack.enabled);
    if (videoTrack) setCameraEnabled(videoTrack.enabled);
  }

  function toggleMic() {
    const localStream = readLocalStream();
    const audioTrack = localStream?.getAudioTracks()[0];
    if (!audioTrack) return;

    // Side effect to decouple later: media track mutation belongs in a media
    // service, with this hook only consuming resulting state.
    audioTrack.enabled = !audioTrack.enabled;
    setMicMuted(!audioTrack.enabled);
  }

  function toggleCamera() {
    const localStream = readLocalStream();
    const videoTrack = localStream?.getVideoTracks()[0];
    if (!videoTrack) return;

    // Side effect to decouple later: media track mutation belongs in a media
    // service, with this hook only consuming resulting state.
    videoTrack.enabled = !videoTrack.enabled;
    setCameraEnabled(videoTrack.enabled);
  }

  async function switchCamera() {
    const localStream = readLocalStream();
    if (!localStream) return;

    const result = await switchVideoStreamFacingMode(
      CallController.getPeerConnection(),
      localStream,
      getFacingMode(),
    );

    if (!result) {
      console.error('Failed to switch video stream source');
      return;
    }

    const oldVideoTrack = localStream.getVideoTracks()[0];
    if (oldVideoTrack) {
      // Side effect to decouple later: track replacement should be owned by
      // the media/call layer, not the UI hook.
      localStream.removeTrack(oldVideoTrack);
      oldVideoTrack.stop();
    }
    localStream.addTrack(result.newVideoTrack);
    setFacingMode(result.facingMode);
    setCameraEnabled(result.newVideoTrack.enabled);

    const { localVideoEl } = readMediaElements();
    if (localVideoEl) {
      // Side effect to decouple later: video element binding should be reactive
      // view state rather than direct DOM assignment.
      localVideoEl.srcObject = new MediaStream([result.newVideoTrack]);
    }
  }

  function toggleRemoteMute() {
    const { remoteVideoEl } = readMediaElements();
    if (!remoteVideoEl) return;

    // Side effect to decouple later: remote audio state should live in media
    // state and drive the video element, rather than mutating from UI.
    remoteVideoEl.muted = !remoteVideoEl.muted;
    setRemoteMuted(remoteVideoEl.muted);
  }

  function fullscreenRemote() {
    const { remoteVideoEl } = readMediaElements();
    if (!remoteVideoEl) return;

    // Side effect to decouple later: fullscreen requests should be wrapped by
    // a platform service so UI can handle unsupported browsers consistently.
    if (remoteVideoEl.requestFullscreen) {
      remoteVideoEl.requestFullscreen();
    } else if (remoteVideoEl.webkitRequestFullscreen) {
      remoteVideoEl.webkitRequestFullscreen();
    }
  }

  onMount(() => {
    syncLocalTrackState();

    hasFrontAndBackCameras()
      .then(setCanSwitchCamera)
      .catch((error) => {
        console.error('Failed to detect camera availability:', error);
        setCanSwitchCamera(false);
      });

    const offLocalMediaReady = subscribe('evt:media:local-stream:ready', () => {
      syncLocalTrackState();
      if (import.meta.env.DEV && !didAutoMuteInDev) {
        didAutoMuteInDev = true;
        toggleMic();
      }
    });
    const offCallJoined = CallController.on('evt:call:participant:joined', () => {
      const { remoteVideoEl } = readMediaElements();
      setRemoteMuted(!!remoteVideoEl?.muted);
      setRemoteControlsEnabled(true);
    });
    const offCallCleanup = CallController.on('evt:call:session:cleanup', () => {
      setRemoteControlsEnabled(false);
      setRemoteMuted(false);
    });

    onCleanup(() => {
      offLocalMediaReady();
      offCallJoined();
      offCallCleanup();
    });
  });

  return {
    state: {
      hasLocalMedia,
      micMuted,
      cameraEnabled,
      canSwitchCamera,
      remoteMuted,
      remoteControlsEnabled,
    },
    actions: {
      toggleMic,
      toggleCamera,
      switchCamera,
      toggleRemoteMute,
      fullscreenRemote,
    },
  };
}

