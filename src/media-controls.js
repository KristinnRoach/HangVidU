// src/media-controls.js
// Handles all media control button functionality (mute, video, camera, fullscreen)

import {
  switchCamera,
  updateVideoConstraintsForOrientation,
  userMediaAudioConstraints,
  userMediaVideoConstraints,
} from './media-devices.js';

// ============================================================================
// STATE
// ============================================================================

let remotePreviousMuted = false;
let cleanupFunctions = [];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Enable/disable microphone
 */
function setMicrophoneEnabled(enabled, localStream) {
  if (!localStream) return;

  const audioTrack = localStream.getAudioTracks()[0];
  if (!audioTrack) return;

  audioTrack.enabled = enabled;
}

/**
 * Mute/unmute local video element
 */
function setLocalVideoMuted(enabled, volume, localVideo) {
  if (!localVideo) return;

  localVideo.muted = !enabled;
  localVideo.volume = volume;
}

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
 * Add event listeners to remote video for volume/mute changes
 */
export function addRemoteVideoEventListeners(remoteVideo, mutePartnerBtn) {
  if (!remoteVideo) return;

  // Listen for volumechange (only event that fires on muted events)
  const remoteVolumeChangeListener = () => {
    if (remoteVideo.muted !== remotePreviousMuted) {
      const icon = mutePartnerBtn.querySelector('i');
      icon.className = remoteVideo.muted
        ? 'fa fa-volume-mute'
        : 'fa fa-volume-up';
      remotePreviousMuted = remoteVideo.muted;
    }
  };

  remoteVideo.addEventListener('volumechange', remoteVolumeChangeListener);

  // Push cleanup function for this listener
  cleanupFunctions.push(() => {
    if (remoteVideo) {
      remoteVideo.removeEventListener(
        'volumechange',
        remoteVolumeChangeListener
      );
    }
  });
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
 * @param {HTMLElement} params.muteSelfBtn - Mute self button
 * @param {HTMLElement} params.videoSelfBtn - Video toggle button
 * @param {HTMLElement} params.switchCameraSelfBtn - Switch camera button
 * @param {HTMLElement} params.fullscreenSelfBtn - Fullscreen self button
 * @param {HTMLElement} params.mutePartnerBtn - Mute partner button
 * @param {HTMLElement} params.fullscreenPartnerBtn - Fullscreen partner button
 * @param {Object} params.audioConstraints - Audio constraints for camera switch
 */
export function initializeMediaControls({
  getLocalStream,
  getLocalVideo,
  getRemoteVideo,
  getPeerConnection = () => null,
  muteSelfBtn,
  videoSelfBtn,
  switchCameraSelfBtn,
  fullscreenSelfBtn,
  mutePartnerBtn,
  fullscreenPartnerBtn,
}) {
  // ===== TOGGLE MIC =====
  if (muteSelfBtn) {
    muteSelfBtn.onclick = () => {
      const localStream = getLocalStream();
      const localVideo = getLocalVideo();
      if (!localVideo || !localStream) return;

      const shouldMute = !localVideo.muted;
      setMicrophoneEnabled(!shouldMute, localStream);
      setLocalVideoMuted(!shouldMute, 0, localVideo);
      updateMuteMicIcon(shouldMute, muteSelfBtn);
    };
  }

  // ===== TOGGLE CAMERA ON/OFF =====
  if (videoSelfBtn) {
    videoSelfBtn.onclick = () => {
      const localStream = getLocalStream();
      if (!localStream) return;

      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        const icon = videoSelfBtn.querySelector('i');
        icon.className = videoTrack.enabled
          ? 'fa fa-video'
          : 'fa fa-video-slash';
      }
    };
  }

  // ===== SWITCH CAMERA (MOBILE) =====
  let lastFacingMode = 'user'; // Track  facing mode manually

  // Listen for orientation changes and update constraints
  let isUpdatingForOrientation = false;
  const handleOrientationChange = async () => {
    if (isUpdatingForOrientation) return;
    isUpdatingForOrientation = true;
    import.meta.env.DEV && console.debug('Orientation change detected.');

    const localStream = getLocalStream();
    const localVideo = getLocalVideo();
    const pc = getPeerConnection?.();
    if (!localStream || !localVideo) {
      isUpdatingForOrientation = false;
      return;
    }

    const result = await updateVideoConstraintsForOrientation({
      localStream,
      localVideo,
      peerConnection: pc,
      currentFacingMode: lastFacingMode,
    });
    // Sync the shared reference if setter is provided
    if (result?.newStream && typeof setLocalStream === 'function') {
      setLocalStream(result.newStream);
    }
    isUpdatingForOrientation = false;
  };

  const removeOrientationListeners = (() => {
    window.addEventListener('orientationchange', handleOrientationChange);
    let screenListenerAdded = false;
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener(
        'change',
        handleOrientationChange
      );
      screenListenerAdded = true;
    }
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (screenListenerAdded) {
        window.screen.orientation.removeEventListener(
          'change',
          handleOrientationChange
        );
      }
    };
  })();

  cleanupFunctions.push(() => {
    removeOrientationListeners();
  });

  if (switchCameraSelfBtn) {
    switchCameraSelfBtn.onclick = async () => {
      // ...existing code...
      const result = await switchCamera({
        localStream: getLocalStream(),
        localVideo: getLocalVideo(),
        peerConnection: pc,
        currentFacingMode: lastFacingMode,
      });

      if (result) {
        lastFacingMode = result.facingMode;
        console.log('Switched camera to facingMode:', lastFacingMode);
      } else {
        console.error('Camera switch failed.');
      }
    };
  }

  // ===== FULLSCREEN FOR LOCAL VIDEO =====
  if (fullscreenSelfBtn) {
    fullscreenSelfBtn.onclick = () => {
      const localVideo = getLocalVideo();
      if (localVideo.requestFullscreen) {
        localVideo.requestFullscreen();
      } else if (localVideo.webkitRequestFullscreen) {
        localVideo.webkitRequestFullscreen();
      }
    };
  }

  // ===== MUTE/UNMUTE PARTNER =====
  if (mutePartnerBtn) {
    mutePartnerBtn.onclick = () => {
      const remoteVideo = getRemoteVideo();
      if (!remoteVideo) return;
      remoteVideo.muted = !remoteVideo.muted;
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

  // Reset state
  remotePreviousMuted = false;
}
