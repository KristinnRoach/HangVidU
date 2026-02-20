// media-controls.js
// Handles all media control button functionality (mute, video, camera, fullscreen)
import { initIcons } from '../ui/icons.js';

import { switchCamera, hasFrontAndBackCameras } from './media-devices.js';
import { getFacingMode, setFacingMode } from './state.js';
import {
  showElement,
  hideElement,
  isElementInPictureInPicture,
  exitPiP,
  requestPiP,
  isPiPSupported,
} from '../ui/utils/ui-utils.js';
import { devDebug, isDev, isProd } from '../utils/dev/dev-utils.js';

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
  if (icon) {
    icon.setAttribute('data-lucide', muted ? 'mic-off' : 'mic');
    initIcons(muteSelfBtn);
  }
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
 * @param {HTMLElement} params.remotePipBtn - Remote video picture-in-picture button
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
  remotePipBtn,
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
    import.meta.env.DEV && micBtn.click(); // Auto-mute mic in dev to avoid feedback
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
        if (icon) {
          icon.setAttribute('data-lucide', videoTrack.enabled ? 'video' : 'video-off');
          initIcons(cameraBtn);
        }
      }
    };
  }

  // ===== SWITCH CAMERA (MOBILE) =====
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
      if (icon) {
        icon.setAttribute('data-lucide', remoteVideo.muted ? 'volume-x' : 'volume-2');
        initIcons(mutePartnerBtn);
      }
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

  // ===== PICTURE-IN-PICTURE FOR REMOTE VIDEO =====

  // TODO: Resolve stream freezing issue when entering PiP and re-enable PiP button
  // TEMPORARY: Disable PiP button in PROD until the issue of stream freezing is resolved
  const TEMP_DISABL_PIP = !isDev();

  if (!TEMP_DISABL_PIP && remotePipBtn && isPiPSupported()) {
    remotePipBtn.onclick = async () => {
      const remoteVideo = getRemoteVideo();
      if (!remoteVideo) return;

      if (isElementInPictureInPicture(remoteVideo)) {
        await exitPiP(remoteVideo);
      } else {
        const pipResult = await requestPiP(
          remoteVideo,
          remoteVideo.parentElement,
        );
        devDebug('Picture-in-Picture result:', pipResult);
      }
    };

    showElement(remotePipBtn);
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
