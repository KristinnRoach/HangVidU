// media-devices.js

import { getVideoConstraints } from './constraints.js';

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

export async function switchVideoStreamFacingMode(
  pc,
  localStream,
  currentFacingMode,
) {
  const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

  try {
    // Get new video stream with new facing mode
    const streamWithNewFacingMode = await navigator.mediaDevices.getUserMedia({
      video: getVideoConstraints(newFacingMode),
    });

    const newVideoTrack = streamWithNewFacingMode.getVideoTracks()[0];
    if (!newVideoTrack) {
      console.error('No video track in new stream');
      return null;
    }

    // Stop unused audio tracks (we only need video, keep original audio)
    streamWithNewFacingMode.getAudioTracks().forEach((track) => track.stop());

    // Preserve enabled state from old track
    const oldVideoTrack = localStream?.getVideoTracks()[0];
    if (oldVideoTrack) {
      newVideoTrack.enabled = oldVideoTrack.enabled;
    }

    // Replace video track in peer connection
    if (pc) {
      const videoSender = pc
        .getSenders()
        .find((s) => s.track?.kind === 'video');
      if (videoSender) {
        await videoSender.replaceTrack(newVideoTrack);
      }
    }

    return { newVideoTrack, facingMode: newFacingMode };
  } catch (error) {
    console.error('Failed to switch video stream source:', error);
    return null;
  }
}
