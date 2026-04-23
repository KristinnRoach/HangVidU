// media/stream.js

import { attachRemoteStream } from '@kidlib/p2p';

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
import { attachAudioInputRecovery } from './audio-input-recovery.js';

import { initIcons } from '../components/ui/icons.js';

export function attachAudioMonitor(stream) {
  attachAudioInputRecovery(stream);
}

// Retry once on NotAllowedError if the browser still considers permission
// grantable. Covers the case where the prompt was dismissed by accident or
// not properly visible (focus/PWA quirks). User just clicked "call" — try
// one more time before failing.
async function getUserMediaWithRetry(constraints) {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    if (
      err?.name !== 'NotAllowedError' &&
      err?.name !== 'PermissionDeniedError'
    )
      throw err;
    let promptable = true;
    try {
      const probeNames = [];
      if (constraints?.audio) probeNames.push('microphone');
      if (constraints?.video) probeNames.push('camera');

      const states = await Promise.all(
        probeNames.map(async (name) => {
          try {
            return await navigator.permissions?.query?.({ name });
          } catch {
            return undefined;
          }
        }),
      );

      promptable = states.some((s) => !s || s.state === 'prompt');
    } catch {
      import.meta.env.DEV &&
        console.warn(
          'Permissions API not available, cannot check if permission is promptable',
        );
      promptable = true; // Assume promptable if we can't check
    }
    if (!promptable) throw err;
    await new Promise((r) => setTimeout(r, 250));
    return navigator.mediaDevices.getUserMedia(constraints);
  }
}

export const createLocalStream = async ({ audioOnly = false } = {}) => {
  if (hasLocalStream()) {
    console.debug('Reusing existing local MediaStream.');
    return getLocalStream();
  }

  const videoConstraints = audioOnly ? false : getVideoConstraints('user');
  const audioConstraints = getAudioConstraints();

  try {
    const newStream = await getUserMediaWithRetry({
      video: videoConstraints,
      audio: audioConstraints,
    });

    setLocalStream(newStream);
    attachAudioMonitor(newStream);

    return newStream;
  } catch (error) {
    if (error.name === 'OverconstrainedError') {
      console.warn(
        `❌ Constraint failed on property: ${error.constraint}, falling back to basic constraints`,
      );
      devDebug('Full error:', error);
      // Fallback to absolute minimum (avoid Over Constrained error)
      const fallbackAudioConstraints = getFallbackAudioConstraints();
      const basicStream = await getUserMediaWithRetry({
        video: audioOnly ? false : true,
        audio: fallbackAudioConstraints,
      });
      setLocalStream(basicStream);
      attachAudioMonitor(basicStream);
      return basicStream;
    }
    throw error;
  }
};

export async function setUpLocalStream(
  localVideoEl,
  { audioOnly = false } = {},
) {
  const localStream = await createLocalStream({ audioOnly });

  if (audioOnly) {
    return true;
  }

  // Workaround for mobile browser echo (don't respect "videoEl.volume"):
  // Create a new stream with only the video track for local preview
  const videoOnlyStream = new MediaStream(localStream.getVideoTracks());
  setLocalVideoOnlyStream(videoOnlyStream);
  localVideoEl.srcObject = videoOnlyStream;

  return true;
}

export function setupRemoteStream(pc, remoteVideoEl, mutePartnerBtn) {
  try {
    attachRemoteStream(pc, {
      onTrack({ stream, track }) {
        devDebug(`REMOTE TRACK RECEIVED: ${track.kind}`);

        const currentRemoteStream = hasRemoteStream()
          ? getRemoteStream()
          : null;

        // Always update stream and video element (handles both new streams and track replacements)
        setRemoteStream(stream);
        remoteVideoEl.srcObject = stream;
        // Hide video while loading new metadata to prevent flicker/cropping
        if (track.kind === 'video') {
          if (remoteVideoEl.readyState >= 1) {
            remoteVideoEl.style.opacity = '1';
          } else {
            remoteVideoEl.style.opacity = '0';
            remoteVideoEl.addEventListener(
              'loadedmetadata',
              () => {
                remoteVideoEl.style.opacity = '1';
              },
              { once: true },
            );
          }
        }

        // Auto-mute partner in dev to avoid feedback
        if (isDev() && !remoteVideoEl.muted) {
          remoteVideoEl.muted = true;
          const icon = mutePartnerBtn?.querySelector('i, svg');
          if (icon) {
            icon.setAttribute('data-lucide', 'volume-x');
            initIcons(mutePartnerBtn);
          }
        }

        // Log connection status
        if (currentRemoteStream !== stream) {
          devDebug('Connected!');
        } else {
          devDebug(`Added ${track.kind} track to existing remote stream`);
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
            // Note: don't set remoteVideoEl.style.opacity here - controlled by onloadedmetadata for flicker prevention
          }
        } catch (e) {
          console.warn('Visibility override failed:', e);
        }
      },
    });
    return true;
  } catch (error) {
    devDebug('setupRemoteStream failed', error);
    console.error('setupRemoteStream failed', error);
    return false;
  }
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
