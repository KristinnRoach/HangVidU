// media-devices.js

import { devDebug } from '../utils/dev/dev-utils.js';
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

// === ORIENTATION LOGIC ===

let isUpdatingForOrientation = false;
let orientationQuery = null;
let boundOrientationHandler = null;
let pendingOrientation = null;
let pendingOrientationRetryId = null;
let pendingOrientationAttempts = 0;
const MAX_ORIENTATION_RETRIES = 10;
const DISABLE_ORIENTATION_STREAM_REREQUEST = true;

export function setupOrientationListener({
  getLocalStream,
  getFacingMode,
  getPeerConnection,
  setLocalStream,
}) {
  if (orientationQuery && boundOrientationHandler) {
    orientationQuery.removeEventListener('change', boundOrientationHandler);
  }
  orientationQuery = window.matchMedia('(orientation: portrait)');
  const retryPendingOrientation = async () => {
    if (pendingOrientation === null) return;
    if (pendingOrientationAttempts >= MAX_ORIENTATION_RETRIES) {
      console.warn('Orientation retry limit reached. Skipping pending update.');
      pendingOrientation = null;
      pendingOrientationAttempts = 0;
      if (pendingOrientationRetryId) {
        clearTimeout(pendingOrientationRetryId);
        pendingOrientationRetryId = null;
      }
      return;
    }

    pendingOrientationAttempts += 1;
    const pc =
      typeof getPeerConnection === 'function' ? getPeerConnection() : null;
    const ls = typeof getLocalStream === 'function' ? getLocalStream() : null;
    const fm = typeof getFacingMode === 'function' ? getFacingMode() : 'user';
    const sls = typeof setLocalStream === 'function' ? setLocalStream : null;

    const applied = await handleOrientationChange({
      localStream: ls,
      currentFacingMode: fm,
      peerConnection: pc,
      setLocalStream: sls,
      isPortrait: pendingOrientation,
    });

    if (!applied) {
      pendingOrientationRetryId = setTimeout(retryPendingOrientation, 500);
    } else {
      pendingOrientation = null;
      pendingOrientationAttempts = 0;
      if (pendingOrientationRetryId) {
        clearTimeout(pendingOrientationRetryId);
        pendingOrientationRetryId = null;
      }
    }
  };

  boundOrientationHandler = async () => {
    console.log('Orientation change fired');
    try {
      const ls = typeof getLocalStream === 'function' ? getLocalStream() : null;
      const fm = typeof getFacingMode === 'function' ? getFacingMode() : 'user';
      const pc =
        typeof getPeerConnection === 'function' ? getPeerConnection() : null;
      const sls = typeof setLocalStream === 'function' ? setLocalStream : null;
      const applied = await handleOrientationChange({
        localStream: ls,
        currentFacingMode: fm,
        peerConnection: pc,
        setLocalStream: sls,
        isPortrait: orientationQuery.matches,
      });
      if (!applied) {
        pendingOrientation = orientationQuery.matches;
        if (!pendingOrientationRetryId) {
          pendingOrientationRetryId = setTimeout(retryPendingOrientation, 500);
        }
      }
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
    pendingOrientation = null;
    pendingOrientationAttempts = 0;
    if (pendingOrientationRetryId) {
      clearTimeout(pendingOrientationRetryId);
      pendingOrientationRetryId = null;
    }
  };
}

export async function handleOrientationChange({
  localStream,
  currentFacingMode,
  peerConnection = null,
  setLocalStream = null,
  isPortrait,
}) {
  if (DISABLE_ORIENTATION_STREAM_REREQUEST) {
    console.log('LOCAL_ORIENTATION_CHANGE_IGNORED', {
      reason: 'DISABLE_ORIENTATION_STREAM_REREQUEST',
      isPortrait,
    });
    return true;
  }
  if (isUpdatingForOrientation || !localStream?.getVideoTracks()[0]) return;
  isUpdatingForOrientation = true;
  const orientationChangeId = Date.now();
  devDebug(`Orientation change detected. id=${orientationChangeId}`);
  console.log('Orientation handler peerConnection present:', !!peerConnection);
  console.log(
    'Orientation handler sender count:',
    peerConnection?.getSenders?.()?.length,
  );
  if (!peerConnection) {
    console.warn('Orientation change skipped: peerConnection is null');
    isUpdatingForOrientation = false;
    return false;
  }
  try {
    // Get a new stream with updated constraints for the current orientation
    const orientation = isPortrait ? 'portrait' : 'landscape';
    console.log('LOCAL_ORIENTATION_CHANGE', { orientation });

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const videoConstraints = isMobile
      ? { facingMode: currentFacingMode }
      : getVideoConstraints(currentFacingMode, orientation);

    const newStream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: getAudioConstraints(),
    });

    const newVideoTrack = newStream.getVideoTracks()[0];
    console.log('LOCAL_ORIENTATION_APPLY', {
      requested: orientation,
      isMobile,
      settings: newVideoTrack?.getSettings?.(),
    });
    console.log(
      'New video track constraints:',
      newVideoTrack?.getConstraints?.(),
    );
    console.log('New video track settings:', newVideoTrack?.getSettings?.());

    const newAudioTrack = newStream.getAudioTracks()[0];

    // Capture previous state
    const oldVideoTrack = localStream.getVideoTracks()[0];
    const wasVideoEnabled = oldVideoTrack ? oldVideoTrack.enabled : true;
    const oldAudioTrack = localStream.getAudioTracks()[0];
    const wasAudioMuted = oldAudioTrack ? !oldAudioTrack.enabled : false;

    // Apply previous state to new tracks
    if (newVideoTrack) newVideoTrack.enabled = wasVideoEnabled;
    if (newAudioTrack) newAudioTrack.enabled = !wasAudioMuted;

    // Replace tracks in peer connection
    if (peerConnection) {
      const videoSender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === 'video');
      console.log('Video sender found:', !!videoSender);
      if (videoSender) {
        await videoSender.replaceTrack(newVideoTrack);
        console.log('Video track replaced successfully', {
          id: orientationChangeId,
        });
      } else {
        console.log('No video sender found');
      }

      const audioSender = peerConnection
        .getSenders()
        .find((s) => s.track && s.track.kind === 'audio');
      console.log('Audio sender found:', !!audioSender);
      if (audioSender && newAudioTrack) {
        await audioSender.replaceTrack(newAudioTrack);
        console.log('Audio track replaced successfully');
      }
    }

    // Update local stream and video
    localStream.getTracks().forEach((track) => track.stop());
    if (setLocalStream) setLocalStream(newStream);

    devDebug(
      `Orientation constraints updated successfully. id=${orientationChangeId}`,
    );
  } catch (error) {
    console.error('Failed to apply orientation constraints:', error);
  } finally {
    isUpdatingForOrientation = false;
  }
  return true;
}
