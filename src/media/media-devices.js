// media-devices.js

import { devDebug } from '../utils/dev-utils.js';
import {
  userMediaAudioConstraints,
  getOrientationAwareVideoConstraints,
} from './constraints.js';

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

    // Capture previous state before stopping old tracks
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

// === ORIENTATION LOGIC ===

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
