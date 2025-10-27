// src/media-devices.js

// === DEFAULT USER MEDIA CONSTRAINTS ===

export const userMediaAudioConstraints = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
  voiceIsolation: true,
  restrictOwnAudio: true,
};

export const userMediaVideoConstraints = {
  // width: { min: 640, ideal: 1920, max: 1920 },
  // height: { min: 480, ideal: 1080, max: 1080 },
  width: { ideal: 1920 }, // Looser ideals to accommodate portrait
  height: { ideal: 1080 },
  aspectRatio: { ideal: 16 / 9 },
  // resizeMode: 'crop-and-scale',
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
    if (label.includes('front')) hasFront = true;
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

export async function switchCamera({
  localStream,
  localVideo,
  peerConnection,
  currentFacingMode,
}) {
  const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
  const videoConstraints = getOrientationAwareVideoConstraints(newFacingMode);

  try {
    // Get a new stream with consistent video constraints and audio
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: userMediaAudioConstraints,
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
export function isPortraitOrientation() {
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
export function getOrientationAwareVideoConstraints(facingMode) {
  const isPortrait = isPortraitOrientation();

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
export async function updateVideoConstraintsForOrientation({
  localStream,
  localVideo,
  peerConnection,
  currentFacingMode,
}) {
  const videoConstraints =
    getOrientationAwareVideoConstraints(currentFacingMode);

  try {
    // Get a new stream with updated constraints (same facing mode)
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: userMediaAudioConstraints,
    });

    const newVideoTrack = newStream.getVideoTracks()[0];
    const newAudioTrack = newStream.getAudioTracks()[0];

    // Capture the mute state
    const oldAudioTrack = localStream.getAudioTracks()[0];
    const wasAudioMuted = oldAudioTrack ? !oldAudioTrack.enabled : false;
    const wasVideoMuted = localVideo.muted;

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
