// media/stream.js

import { addRemoteVideoEventListeners } from './media-controls.js';
import {
  hasLocalStream,
  getLocalStream,
  setLocalStream,
  hasRemoteStream,
  setRemoteStream,
  getRemoteStream,
  setLocalVideoOnlyStream,
} from './state.js';
import {
  getAudioConstraints,
  getFallbackAudioConstraints,
  getVideoConstraints,
} from './constraints.js';
import { devDebug, isDev } from '../utils/dev/dev-utils.js';

export const createLocalStream = async () => {
  if (hasLocalStream()) {
    console.debug('Reusing existing local MediaStream.');
    return getLocalStream();
  }

  const videoConstraints = getVideoConstraints('user');
  const audioConstraints = getAudioConstraints();

  try {
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: audioConstraints,
    });

    setLocalStream(newStream);

    return newStream;
  } catch (error) {
    if (error.name === 'OverconstrainedError') {
      console.warn(
        `❌ Constraint failed on property: ${error.constraint}, falling back to basic constraints`
      );
      devDebug('Full error:', error);
      // Fallback to absolute minimum (avoid Over Constrained error)
      const fallbackAudioConstraints = getFallbackAudioConstraints();
      const basicStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: fallbackAudioConstraints,
      });
      setLocalStream(basicStream);
      return basicStream;
    }
    throw error;
  }
};

export async function setUpLocalStream(localVideoEl) {
  const localStream = await createLocalStream();

  // Workaround for mobile browser echo (don't respect "videoEl.volume"):
  // Create a new stream with only the video track for local preview
  const videoOnlyStream = new MediaStream(localStream.getVideoTracks());
  setLocalVideoOnlyStream(videoOnlyStream);
  localVideoEl.srcObject = videoOnlyStream;

  return true;
}

export function setupRemoteStream(pc, remoteVideoEl, mutePartnerBtn) {
  pc.ontrack = (event) => {
    devDebug(`REMOTE TRACK RECEIVED: ${event.track.kind}`);

    const currentRemoteStream = hasRemoteStream() ? getRemoteStream() : null;

    // Try to use stream from event, fallback to creating one from track
    let newRemoteStream;
    if (
      event.streams &&
      event.streams[0] &&
      event.streams[0] instanceof MediaStream
    ) {
      newRemoteStream = event.streams[0];
    } else {
      // Fallback: add track to existing stream or create new one
      console.warn('No stream in track event, using fallback track handling');
      if (currentRemoteStream) {
        // Add track to existing stream
        currentRemoteStream.addTrack(event.track);
        newRemoteStream = currentRemoteStream;
      } else {
        // Create new stream with this track
        newRemoteStream = new MediaStream([event.track]);
      }
    }

    // Always update stream and video element (handles both new streams and track replacements)
    setRemoteStream(newRemoteStream);
    remoteVideoEl.srcObject = newRemoteStream;
    addRemoteVideoEventListeners(remoteVideoEl, mutePartnerBtn);

    // Log connection status
    if (currentRemoteStream !== newRemoteStream) {
      devDebug('Connected!');
    } else {
      devDebug(`Added ${event.track.kind} track to existing remote stream`);
    }

    // Ensure the remote video and its container are visible (fix mobile Safari cases)
    try {
      const container =
        document.getElementById('remote-video-box') ||
        remoteVideoEl.parentElement;
      if (container) {
        // Remove any utility hidden class from container or element
        container.classList?.remove('hidden');
        remoteVideoEl.classList?.remove('hidden');

        // Force visibility in case a parent applied visibility:hidden via inheritance
        container.style.visibility = 'visible';
        container.style.opacity = '1';
        container.style.position = '';
        container.style.left = '';
        container.style.top = '';
        remoteVideoEl.style.visibility = 'visible';
        remoteVideoEl.style.opacity = '1';
      }
    } catch (e) {
      console.warn('Visibility override failed:', e);
    }
  };
  return true;
}

// // ======= DEVICES DRAFT BELOW (IGNORE)  ==========
// async function updateLocalMediaDevices() {
//   const videoSource = videoInputSelect?.value;
//   const audioSource = audioInputSelect?.value;

//   const userMediaAudioConstraints = {
//     echoCancellation: true,
//     noiseSuppression: true,
//     autoGainControl: true,
//   };

//   // Build constraints based on selected device IDs
//   const constraints = {
//     video: videoSource
//       ? { deviceId: { exact: videoSource }, ...userMediaVideoConstraints }
//       : { ...userMediaVideoConstraints },
//     audio: audioSource
//       ? {
//           deviceId: { exact: audioSource },
//           ...userMediaAudioConstraints,
//         }
//       : {
//           ...userMediaAudioConstraints,
//         },
//   };

//   try {
//     const newStream = await navigator.mediaDevices.getUserMedia(constraints);

//     // Replace tracks in peer connection if exists
//     if (pc) {
//       // Replace video track
//       const videoTrack = newStream.getVideoTracks()[0];
//       const senderV = pc.getSenders().find((s) => s.track?.kind === 'video');
//       if (videoTrack && senderV) senderV.replaceTrack(videoTrack);

//       // Replace audio track
//       const audioTrack = newStream.getAudioTracks()[0];
//       const senderA = pc.getSenders().find((s) => s.track?.kind === 'audio');
//       if (audioTrack && senderA) senderA.replaceTrack(audioTrack);
//     }

//     // Update local stream and video element
//     const oldStream = localStream;
//     localStream = newStream;
//     localVideo.srcObject = new MediaStream(newStream.getVideoTracks());
//     if (oldStream) oldStream.getTracks().forEach((t) => t.stop()); // Cleanup old tracks
//   } catch (err) {
//     updateStatus('Could not access selected devices.');
//     console.error(err);
//   }
// }

// // Listen for device selection changes
// videoInputSelect?.shadowRoot
//   .querySelector('select')
//   ?.addEventListener('change', updateLocalMediaDevices);
// audioInputSelect?.shadowRoot
//   .querySelector('select')
//   ?.addEventListener('change', updateLocalMediaDevices);

// // Set audio output device if supported
// audioOutputSelect?.shadowRoot
//   .querySelector('select')
//   ?.addEventListener('change', (e) => {
//     const sinkId = e.target.value;
//     if (typeof remoteVideo?.setSinkId === 'function') {
//       remoteVideo.setSinkId(sinkId).catch((err) => {
//         updateStatus('Could not set audio output device.');
//         console.error(err);
//       });
//     }
//   });
