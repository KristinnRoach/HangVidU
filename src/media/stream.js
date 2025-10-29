import { addRemoteVideoEventListeners } from './media-controls.js';

import {
  userMediaAudioConstraints,
  userMediaVideoConstraints,
  getOrientationAwareVideoConstraints,
} from './media-devices.js';

import { updateStatus } from '../utils/status.js';

let localStream = null;
let videoOnlyStream = null;

export function getLocalStream() {
  if (!localStream || !(localStream instanceof MediaStream)) {
    console.error('Invalid local MediaStream accessed:', localStream);
    console.error('Call createLocalStream() before accessing local stream.');
    return null;
  }
  return localStream;
}

export function setLocalStream(newStream) {
  localStream = newStream;
}

export const createLocalStream = async () => {
  if (localStream && localStream instanceof MediaStream) {
    console.debug('Reusing existing local MediaStream.');
    return localStream;
  }

  const videoConstraints = getOrientationAwareVideoConstraints('user');

  localStream = await navigator.mediaDevices.getUserMedia({
    video: videoConstraints || userMediaVideoConstraints.relyOnBrowserDefaults,
    audio: userMediaAudioConstraints.default,
  });

  if (import.meta.env.DEV) {
    console.table({
      videoCapabilities: localStream.getVideoTracks()[0].getCapabilities(),
      audioCapabilities: localStream.getAudioTracks()[0].getCapabilities(),
      videoApplied: localStream.getVideoTracks()[0].getSettings(),
      audioApplied: localStream.getAudioTracks()[0].getSettings(),
    });
  }
  return localStream;
};

export async function setUpLocalStream(localVideoEl) {
  localStream = await createLocalStream();

  // Workaround for mobile browser echo (don't respect "videoEl.volume"):
  // Create a new stream with only the video track for local preview
  videoOnlyStream = new MediaStream(localStream.getVideoTracks());
  localVideoEl.srcObject = videoOnlyStream;

  return true;
}

export function setupRemoteStream(pc, remoteVideoEl, mutePartnerBtn) {
  pc.ontrack = (event) => {
    if (import.meta.env.DEV) {
      console.log('Received remote track');
    }

    if (
      !event.streams ||
      !event.streams[0] ||
      !(event.streams[0] instanceof MediaStream)
    ) {
      console.error(
        'No valid remote MediaStream found in event.streams:',
        event.streams
      );
      return false;
    }

    if (remoteVideoEl.srcObject !== event.streams[0]) {
      remoteVideoEl.srcObject = event.streams[0];
      addRemoteVideoEventListeners(remoteVideoEl, mutePartnerBtn);
      updateStatus('Connected!');

      if (import.meta.env.DEV) {
        remoteVideoEl.style.border = '8px solid red';
      }
    }
  };
  return true;
}

export const cleanupLocalStream = () => {
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }
};

// // ======= DEVICES ==========
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
