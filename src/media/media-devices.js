// media-devices.js

import { devDebug } from './utils/log';

// === DEFAULT USER MEDIA CONSTRAINTS ===

export const userMediaAudioConstraints = {
  default: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    voiceIsolation: true,
    restrictOwnAudio: true,
    highpassFilter: true,
    typingNoiseDetection: true,
  },
};

export const userMediaVideoConstraints = {
  desktop: {
    landscape: {
      width: { min: 1280, ideal: window.innerWidth, max: 2560 }, // 1920
      height: { min: 720, ideal: window.innerHeight, max: 1440 }, // 1080
      frameRate: { min: 15, ideal: 30, max: 60 },
      aspectRatio: { ideal: 16 / 9 },
      resizeMode: 'none', // 'none' | 'crop-and-scale'
    },
    // portrait mode is the same as landscape for desktop
    portrait: {
      width: { min: 1280, ideal: 1920, max: 2560 },
      height: { min: 720, ideal: 1080, max: 1440 },
      frameRate: { min: 15, ideal: 30, max: 60 },
      aspectRatio: { ideal: 16 / 9 },
      resizeMode: 'none',
    },
  },
  mobile: {
    portrait: {
      width: { min: 720, ideal: 1080, max: 1440 },
      height: { min: 1280, ideal: 1920, max: 2560 },
      aspectRatio: { ideal: 9 / 16 },
      frameRate: { min: 15, ideal: 30, max: 60 },
      resizeMode: 'none',
    },
    landscape: {
      width: { min: 1280, ideal: 1920, max: 2560 },
      height: { min: 720, ideal: 1080, max: 1440 },
      aspectRatio: { ideal: 16 / 9 },
      frameRate: { min: 15, ideal: 30, max: 60 },
      resizeMode: 'none',
    },
  },

  relyOnBrowserDefaults: true, // Just { video: true }
};

// ===== UTILS =====

export function isMediaDevicesSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
}

export async function getVideoInputDevices() {
  if (!isMediaDevicesSupported()) return [];
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === 'videoinput');
}

export async function hasFrontAndBackCameras() {
  const videoDevices = await getVideoInputDevices();
  let hasFront = false;
  let hasBack = false;

  videoDevices.forEach((device) => {
    const label = device.label.toLowerCase();
    if (label.includes('front') || label.includes('user')) {
      hasFront = true;
    }
    if (
      label.includes('back') ||
      label.includes('rear') ||
      label.includes('environment')
    ) {
      hasBack = true;
    }
  });

  return hasFront && hasBack;
}

// === DRAFT ==== // TODO: review and integrate or remove
/*
export async function canSwitchCamera(): Promise<boolean> {
  // Try to get camera permission and list of video devices
  try {
    // Request minimal stream with both facing modes to unlock labels
    await navigator.mediaDevices.getUserMedia({ video: true });

    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(d => d.kind === 'videoinput');

    let hasFront = false;
    let hasBack = false;

    // Check device labels for common keywords (case insensitive)
    videoDevices.forEach((device) => {
      const label = device.label.toLowerCase();
      if (label.includes('front') || label.includes('user')) {
        hasFront = true;
      }
      if (label.includes('back') || label.includes('rear') || label.includes('environment')) {
        hasBack = true;
      }
    });

    // If label-check is inconclusive, try facingMode-based getUserMedia as fallback
    if (!hasFront || !hasBack) {
      const testFront = await testFacingMode('user');
      const testBack = await testFacingMode('environment');
      hasFront = hasFront || testFront;
      hasBack = hasBack || testBack;
    }

    return hasFront && hasBack;
  } catch (e) {
    // Access denied or device enumeration failed - assume no switch capability
    return false;
  }
}

// Helper function tries to open a stream with a facingMode constraint
async function testFacingMode(facingMode: 'user' | 'environment'): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch {
    return false;
  }
}
*/

export async function switchCamera({
  localStream,
  localVideo,
  currentFacingMode,
  peerConnection = null,
}) {
  if (!localStream || !localVideo) {
    console.error('switchCamera: missing localStream or localVideo');
    return null;
  }
  const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
  const videoConstraintsForOrientation =
    getOrientationAwareVideoConstraints(newFacingMode);

  try {
    // Get a new stream with consistent video constraints and audio
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraintsForOrientation,
      audio: userMediaAudioConstraints.default,
    });

    const newVideoTrack = newStream.getVideoTracks()[0];
    const newAudioTrack = newStream.getAudioTracks()[0];

    const oldVideoTrack = localStream.getVideoTracks()[0];
    const wasVideoEnabled = oldVideoTrack ? oldVideoTrack.enabled : true;
    const oldAudioTrack = localStream.getAudioTracks()[0];
    const wasAudioMuted = oldAudioTrack ? !oldAudioTrack.enabled : false;

    // Replace tracks in the peer connection
    if (peerConnection) {
      const videoSender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === 'video');
      if (videoSender) videoSender.replaceTrack(newVideoTrack);

      const audioSender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === 'audio');
      if (audioSender && newAudioTrack) audioSender.replaceTrack(newAudioTrack);
    }

    // Apply the previous mic and camera enabled state to the new tracks

    if (newVideoTrack) {
      newVideoTrack.enabled = wasVideoEnabled;
    }

    if (newAudioTrack) {
      newAudioTrack.enabled = !wasAudioMuted; // Preserve mute state
    }

    // Stop old tracks
    localStream.getTracks().forEach((track) => track.stop());

    // Update local video with video-only stream
    localVideo.srcObject = new MediaStream([newVideoTrack].filter(Boolean));

    // Return the new stream and facing mode for the caller to update references
    return { newStream, facingMode: newFacingMode };
  } catch (error) {
    console.error('Failed to switch camera:', error);
    return null; // Indicate failure
  }
}

/**
 * Detects the current device orientation.
 * @returns {boolean} True if portrait, false if landscape.
 */
export function OLD_isPortraitOrientation() {
  return (
    window.screen?.orientation?.type?.includes('portrait') ||
    window.orientation === 0 ||
    window.orientation === 180
  );
}

/**
 * Returns video constraints based on current orientation and facing mode.
 * @param {string} facingMode - 'user' or 'environment'.
 * @returns {object} Video constraints object.
 */
export function OLD_getOrientationAwareVideoConstraints(facingMode) {
  const isPortrait = OLD_isPortraitOrientation();

  import.meta.env.DEV &&
    console.debug(
      `Orientation detected: ${
        isPortrait ? 'portrait' : 'landscape'
      }, facingMode: ${facingMode}`
    );

  if (isPortrait) {
    return {
      facingMode,
      aspectRatio: { ideal: 9 / 16 }, // Portrait aspect ratio
      width: { ideal: 1080 }, // Swapped for portrait
      height: { ideal: 1920 },
    };
  } else {
    return {
      facingMode,
      aspectRatio: { ideal: 16 / 9 }, // Landscape aspect ratio
      width: { ideal: 1920 },
      height: { ideal: 1080 },
    };
  }
}

/**
 * Updates video constraints based on orientation change (without switching cameras).
 * @param {MediaStream} localStream - The current local stream.
 * @param {HTMLVideoElement} localVideo - The local video element.
 * @param {RTCPeerConnection} peerConnection - The peer connection.
 * @param {string} currentFacingMode - The current facing mode ('user' or 'environment').
 */
export async function OLD_updateVideoConstraintsForOrientation({
  localStream,
  localVideo,
  currentFacingMode,
  peerConnection = null,
}) {
  const videoConstraints =
    OLD_getOrientationAwareVideoConstraints(currentFacingMode);

  try {
    // Get a new stream with updated constraints (same facing mode)
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: userMediaAudioConstraints.default,
    });

    const newVideoTrack = newStream.getVideoTracks()[0];
    const newAudioTrack = newStream.getAudioTracks()[0];

    // Capture the mute state
    const oldAudioTrack = localStream.getAudioTracks()[0];
    const wasAudioMuted = oldAudioTrack ? !oldAudioTrack.enabled : false;
    const wasVideoMuted = localVideo.muted;

    // Replace tracks in the peer connection if provided // ? consider refactoring / removing ?
    if (peerConnection) {
      const videoSender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === 'video');
      if (videoSender) videoSender.replaceTrack(newVideoTrack);

      const audioSender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === 'audio');
      if (audioSender && newAudioTrack) audioSender.replaceTrack(newAudioTrack);
    }

    // Apply mute state
    if (newAudioTrack) {
      newAudioTrack.enabled = !wasAudioMuted;
    }

    // Stop old tracks
    localStream.getTracks().forEach((track) => track.stop());

    // Update local video
    localVideo.srcObject = newStream;
    localVideo.muted = wasVideoMuted;

    console.log('Updated video constraints for orientation change.');
    return { newStream };
  } catch (error) {
    console.error('Failed to update video constraints for orientation:', error);
    return null;
  }
}
// === SIMPLIFIED ORIENTATION LOGIC ===

let isUpdatingForOrientation = false;
let orientationListener = null;
let boundOrientationHandler = null;

export function setupOrientationListener({ getLocalStream, getFacingMode }) {
  if (orientationListener && boundOrientationHandler) {
    orientationListener.removeEventListener('change', boundOrientationHandler);
  }
  orientationListener = window.matchMedia('(orientation: portrait)');
  boundOrientationHandler = () => {
    try {
      const ls = typeof getLocalStream === 'function' ? getLocalStream() : null;
      const fm = typeof getFacingMode === 'function' ? getFacingMode() : 'user';
      handleOrientationChange({ localStream: ls, currentFacingMode: fm });
    } catch (e) {
      console.error('Orientation handler failed:', e);
    }
  };
  orientationListener.addEventListener('change', boundOrientationHandler);
  return () => {
    if (orientationListener && boundOrientationHandler) {
      orientationListener.removeEventListener(
        'change',
        boundOrientationHandler
      );
    }
    orientationListener = null;
    boundOrientationHandler = null;
  };
}

export async function handleOrientationChange({
  localStream,
  currentFacingMode,
  // localVideo,
  // peerConnection = null,
}) {
  if (isUpdatingForOrientation || !localStream?.getVideoTracks()[0]) return;
  isUpdatingForOrientation = true;
  devDebug('Orientation change detected.');
  try {
    const videoTrack = localStream.getVideoTracks()[0];
    const constraints = getOrientationAwareVideoConstraints(currentFacingMode);
    devDebug('Applying constraints:', constraints);
    // Apply constraints to existing track (no new stream)
    await videoTrack.applyConstraints(constraints);
    devDebug('Video constraints updated successfully');
  } catch (error) {
    console.error('Failed to apply orientation constraints:', error);
  } finally {
    isUpdatingForOrientation = false;
  }
}

export function isPortraitOrientation() {
  return (
    window.screen?.orientation?.type?.includes('portrait') ||
    window.orientation === 0 ||
    window.orientation === 180
  );
}

export function getOrientationAwareVideoConstraints(facingMode) {
  const orientation = isPortraitOrientation() ? 'portrait' : 'landscape';
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  // Todo: use dimensions if needed
  // const currentViewport = {
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // };

  devDebug(
    `Orientation: ${orientation}, isMobile: ${isMobile}, facingMode: ${facingMode}`
  );

  if (!isMobile) {
    // Desktop constraints
    return {
      facingMode, // ? is facingMode relevant if !isMobile ?
      ...userMediaVideoConstraints.desktop,
    };
  }

  // Mobile constraints
  return { facingMode, ...userMediaVideoConstraints.mobile[orientation] };
}

// === DEBUG ====

// if (import.meta.env.DEV) {
//   // Modern approach using matchMedia (best browser compatibility)
//   const orientationQuery = window.matchMedia('(orientation: portrait)');

//   orientationQuery.addEventListener('change', (e) => {
//     console.log(`Orientation: ${e.matches ? 'portrait' : 'landscape'}`);
//   });

//   // Log initial state
//   console.log(
//     `Initial orientation: ${
//       orientationQuery.matches ? 'portrait' : 'landscape'
//     }`
//   );
// }
