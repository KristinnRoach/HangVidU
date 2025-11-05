import { addRemoteVideoEventListeners } from './media-controls.js';
import {
  getLocalStream,
  setLocalStream,
  setRemoteStream,
  getRemoteStream,
  setLocalVideoOnlyStream,
} from './state.js';
import {
  userMediaAudioConstraints,
  userMediaVideoConstraints,
  getOrientationAwareVideoConstraints,
} from './constraints.js';
import { updateStatus } from '../utils/ui/status.js';
import { devDebug } from '../utils/dev/dev-utils.js';

export const createLocalStream = async () => {
  const existingStream = getLocalStream(false); // (false) -> don't log null error
  if (existingStream && existingStream instanceof MediaStream) {
    console.debug('Reusing existing local MediaStream.');
    return existingStream;
  }

  const videoConstraints = getOrientationAwareVideoConstraints('user');

  const newStream = await navigator.mediaDevices.getUserMedia({
    video: videoConstraints || userMediaVideoConstraints.relyOnBrowserDefaults,
    audio: userMediaAudioConstraints.default,
  });

  setLocalStream(newStream);

  // if (import.meta.env.DEV) {
  //   console.table({
  //     videoCapabilities: newStream.getVideoTracks()[0].getCapabilities(),
  //     audioCapabilities: newStream.getAudioTracks()[0].getCapabilities(),
  //     videoApplied: newStream.getVideoTracks()[0].getSettings(),
  //     audioApplied: newStream.getAudioTracks()[0].getSettings(),
  //   });
  // }
  return newStream;
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

    const remoteStream = event.streams[0];
    const currentRemoteStream = getRemoteStream(false);

    // Only update if this is a new/different stream
    if (currentRemoteStream !== remoteStream) {
      setRemoteStream(remoteStream);
      remoteVideoEl.srcObject = remoteStream;
      addRemoteVideoEventListeners(remoteVideoEl, mutePartnerBtn);
      updateStatus('Connected!');

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

          // Diagnostic: log container state
          // (kept lightweight; remove after verifying on device)
          console.log('[DEBUG] remote container visibility fix', {
            containerClasses: container.className,
            containerComputedVisibility: getComputedStyle(container).visibility,
            videoComputedVisibility: getComputedStyle(remoteVideoEl).visibility,
          });
        }
      } catch (e) {
        console.warn('Visibility override failed:', e);
      }

      console.log(
        '[DEBUG] remoteVideoEl',
        remoteVideoEl,
        'srcObject:',
        remoteVideoEl.srcObject,
        'videoWidth:',
        remoteVideoEl.videoWidth,
        'videoHeight:',
        remoteVideoEl.videoHeight,
        'offsetWidth:',
        remoteVideoEl.offsetWidth,
        'offsetHeight:',
        remoteVideoEl.offsetHeight,
        'computedStyle.display:',
        getComputedStyle(remoteVideoEl).display,
        'computedStyle.visibility:',
        getComputedStyle(remoteVideoEl).visibility
      );

      if (import.meta.env.DEV) {
        remoteVideoEl.style.border = '8px solid red';
      }
    }
  };
  return true;
}

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
