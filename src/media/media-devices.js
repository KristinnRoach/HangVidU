// media-devices.js

import { devDebug } from '../utils/log.js';

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

// === SIMPLIFIED ORIENTATION LOGIC ===

let isUpdatingForOrientation = false;
let orientationQuery = null;
let boundOrientationHandler = null;

export function setupOrientationListener({ getLocalStream, getFacingMode }) {
  if (orientationQuery && boundOrientationHandler) {
    orientationQuery.removeEventListener('change', boundOrientationHandler);
  }
  orientationQuery = window.matchMedia('(orientation: portrait)');
  boundOrientationHandler = () => {
    try {
      const ls = typeof getLocalStream === 'function' ? getLocalStream() : null;
      const fm = typeof getFacingMode === 'function' ? getFacingMode() : 'user';
      handleOrientationChange({ localStream: ls, currentFacingMode: fm });
    } catch (e) {
      console.error('Orientation handler failed:', e);
    }
  };
  orientationQuery.addEventListener('change', boundOrientationHandler);
  return () => {
    if (orientationQuery && boundOrientationHandler) {
      orientationQuery.removeEventListener('change', boundOrientationHandler);
    }
    orientationQuery = null;
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
