// media-devices.js

import { getVideoConstraints, getAudioConstraints } from './constraints.js';

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

  try {
    // Get a new stream with consistent video constraints and audio
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: getVideoConstraints(newFacingMode),
      audio: getAudioConstraints(),
    });

    const newVideoTrack = newStream.getVideoTracks()[0];
    const newAudioTrack = newStream.getAudioTracks()[0];

    // Capture previous state before stopping old tracks
    const oldVideoTrack = localStream.getVideoTracks()[0];
    const wasVideoEnabled = oldVideoTrack ? oldVideoTrack.enabled : true;
    const oldAudioTrack = localStream.getAudioTracks()[0];
    const wasAudioMuted = oldAudioTrack ? !oldAudioTrack.enabled : false;

    // Apply the previous mic and camera enabled state to the new tracks BEFORE replaceTrack
    if (newVideoTrack) {
      newVideoTrack.enabled = wasVideoEnabled;
    }

    if (newAudioTrack) {
      newAudioTrack.enabled = !wasAudioMuted; // Preserve mute state
    }

    // Stop old tracks BEFORE replacing (important for mobile camera release)
    localStream.getTracks().forEach((track) => track.stop());

    // Replace tracks in the peer connection (await the promises!)
    if (peerConnection) {
      const videoSender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === 'video');
      if (videoSender) await videoSender.replaceTrack(newVideoTrack);

      const audioSender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === 'audio');
      if (audioSender && newAudioTrack)
        await audioSender.replaceTrack(newAudioTrack);
    }

    // Update local video with video-only stream
    localVideo.srcObject = new MediaStream([newVideoTrack].filter(Boolean));

    // Return the new stream and facing mode for the caller to update references
    return { newStream, facingMode: newFacingMode };
  } catch (error) {
    console.error('Failed to switch camera:', error);
    return null; // Indicate failure
  }
}
