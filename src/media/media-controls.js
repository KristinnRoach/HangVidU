// media-controls.js
// Handles all media control button functionality (mute, video, camera, fullscreen)

import {
  switchCamera,
  setupOrientationListener,
  hasFrontAndBackCameras,
} from './media-devices.js';
import { getFacingMode, setFacingMode } from './state.js';
import { showElement, hideElement } from '../utils/ui/ui-utils.js';

// ============================================================================
// STATE
// ============================================================================

let cleanupFunctions = [];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Update mute mic icon
 */
function updateMuteMicIcon(muted, muteSelfBtn) {
  const icon = muteSelfBtn.querySelector('i');
  icon.className = muted ? 'fa fa-microphone-slash' : 'fa fa-microphone';
}

// ============================================================================
// REMOTE VIDEO EVENT LISTENERS
// ============================================================================

/**
 * Initialize remote video - kept for consistency but no longer adds listeners
 */
export function addRemoteVideoEventListeners() {
  // No-op: Icon updates now happen inline in button click handler
  // This function is kept to avoid breaking the call flow API
}

// ============================================================================
// MEDIA CONTROL INITIALIZATION
// ============================================================================

/**
 * Initialize all media controls
 * @param {Object} params - Configuration object
 * @param {MediaStream} params.getLocalStream - Getter for Local media stream
 * @param {HTMLVideoElement} params.getLocalVideo - Getter for Local video element
 * @param {HTMLVideoElement} params.getRemoteVideo - Getter for Remote video element
 * @param {RTCPeerConnection} params.getPeerConnection - Getter for Peer connection (optional, for camera switch)
 * @param {HTMLElement} params.micBtn - Local microphone toggle button
 * @param {HTMLElement} params.cameraBtn - Local camera toggle button
 * @param {HTMLElement} params.switchCameraBtn - Switch camera button
 * @param {HTMLElement} params.mutePartnerBtn - Mute partner button
 * @param {HTMLElement} params.fullscreenPartnerBtn - Fullscreen partner button
 */
export function initializeMediaControls({
  getLocalStream,
  getLocalVideo,
  getRemoteVideo,
  getPeerConnection = () => null,
  setLocalStream = null,
  micBtn,
  cameraBtn,
  switchCameraBtn,
  mutePartnerBtn,
  fullscreenPartnerBtn,
}) {
  // ===== TOGGLE MIC =====
  if (micBtn) {
    micBtn.onclick = () => {
      const localStream = getLocalStream();
      if (!localStream) return;

      const audioTrack = localStream.getAudioTracks()[0];
      if (!audioTrack) return;

      audioTrack.enabled = !audioTrack.enabled;
      updateMuteMicIcon(!audioTrack.enabled, micBtn);
    };
  }

  // ===== TOGGLE CAMERA ON/OFF =====
  if (cameraBtn) {
    cameraBtn.onclick = () => {
      const localStream = getLocalStream();
      if (!localStream) return;

      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        const icon = cameraBtn.querySelector('i');
        icon.className = videoTrack.enabled
          ? 'fa fa-video'
          : 'fa fa-video-slash';
      }
    };
  }

  // ===== SWITCH CAMERA (MOBILE) =====

  const removeOrientationListener = setupOrientationListener({
    getLocalStream,
    getFacingMode,
  });

  cleanupFunctions.push(removeOrientationListener);

  if (switchCameraBtn) {
    switchCameraBtn.onclick = async () => {
      const result = await switchCamera({
        localStream: getLocalStream(),
        localVideo: getLocalVideo(),
        currentFacingMode: getFacingMode(),
        peerConnection: getPeerConnection() || null,
      });

      if (result) {
        setFacingMode(result.facingMode);
        console.log('Switched camera to facingMode:', result.facingMode);
        if (result.newStream && typeof setLocalStream === 'function') {
          setLocalStream(result.newStream);
        }
      } else {
        console.error('Camera switch failed.');
      }
    };

    (async () => {
      const hasMultipleCameras = await hasFrontAndBackCameras();
      if (hasMultipleCameras) {
        showElement(switchCameraBtn);
      } else {
        hideElement(switchCameraBtn);
      }
    })();
  }

  // ===== MUTE/UNMUTE PARTNER =====
  if (mutePartnerBtn) {
    mutePartnerBtn.onclick = () => {
      const remoteVideo = getRemoteVideo();
      if (!remoteVideo) return;

      remoteVideo.muted = !remoteVideo.muted;

      // Update icon inline
      const icon = mutePartnerBtn.querySelector('i');
      icon.className = remoteVideo.muted
        ? 'fa fa-volume-mute'
        : 'fa fa-volume-up';
    };
  }

  // ===== FULLSCREEN FOR REMOTE VIDEO =====
  if (fullscreenPartnerBtn) {
    fullscreenPartnerBtn.onclick = () => {
      const remoteVideo = getRemoteVideo();
      if (remoteVideo.requestFullscreen) {
        remoteVideo.requestFullscreen();
      } else if (remoteVideo.webkitRequestFullscreen) {
        remoteVideo.webkitRequestFullscreen();
      }
    };
  }
}

// ============================================================================
// CLEANUP
// ============================================================================

/**
 * Cleanup media controls
 */
export function cleanupMediaControls() {
  // Run all cleanup functions
  cleanupFunctions.forEach((cleanupFn) => cleanupFn());
  cleanupFunctions = [];
}

// Listen for orientation changes and update constraints
// let isUpdatingForOrientation = false;
// const handleOrientationChange = async () => {
//   if (isUpdatingForOrientation) return;
//   isUpdatingForOrientation = true;
//   import.meta.env.DEV && console.debug('Orientation change detected.');

//   const localStream = getLocalStream();
//   const localVideo = getLocalVideo();
//   const pc = getPeerConnection() || null; // May be null

//   if (!localStream || !localVideo) {
//     isUpdatingForOrientation = false;
//     return;
//   }

//   import.meta.env.DEV &&
//     console.debug('Updating video constraints for orientation. pc: ', pc);

//   const result = await updateVideoConstraintsForOrientation({
//     localStream,
//     localVideo,
//     currentFacingMode: lastFacingMode,
//     peerConnection: pc || null,
//   });
//   // Sync the shared reference if setter is provided
//   if (result?.newStream && typeof setLocalStream === 'function') {
//     setLocalStream(result.newStream);
//   }
//   isUpdatingForOrientation = false;
// };

// const removeOrientationListeners = (() => {
//   //window.addEventListener('orientationchange', handleOrientationChange);
//   let screenListenerAdded = false;

//   const orientationQuery = window.matchMedia('(orientation: portrait)');
//   orientationQuery.addEventListener('change', handleOrientationChange);
//   screenListenerAdded = true;

//   // if (window.screen?.orientation) {
//   //   window.screen.orientation.addEventListener(
//   //     'change',
//   //     handleOrientationChange
//   //   );
//   //   screenListenerAdded = true;
//   // }
//   return () => {
//     // window.removeEventListener('orientationchange', handleOrientationChange);
//     if (screenListenerAdded) {
//       // window.screen.orientation.removeEventListener(
//       //   'change',
//       //   handleOrientationChange
//       // );
//       orientationQuery.removeEventListener('change', handleOrientationChange);
//       screenListenerAdded = false;
//     }
//   };
// })();

// cleanupFunctions.push(
//   removeOrientationListeners
// );
