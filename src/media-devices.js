// src/media-devices.js

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
}) {
  const newFacingMode =
    state.currentFacingMode === 'user' ? 'environment' : 'user';

  const videoTrack = localStream.getVideoTracks()[0];

  try {
    // Attempt to apply constraints to the existing video track
    await videoTrack.applyConstraints({ facingMode: newFacingMode });
    state.currentFacingMode = newFacingMode;
    return; // Exit early if constraints were successfully applied
  } catch (error) {
    console.warn(
      'applyConstraints failed, falling back to getUserMedia:',
      error
    );
  }

  // Fallback: Get a new stream
  const newStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: newFacingMode },
    audio: false, // Reuse existing audio track
  });

  const newVideoTrack = newStream.getVideoTracks()[0];

  // Replace the video track in the peer connection
  if (peerConnection) {
    const sender = peerConnection
      .getSenders()
      .find((s) => s.track && s.track.kind === 'video');
    if (sender) sender.replaceTrack(newVideoTrack);
  }

  // Update the local stream
  localStream.removeTrack(videoTrack);
  localStream.addTrack(newVideoTrack);
  localVideo.srcObject = localStream;

  // Stop the old video track
  videoTrack.stop();

  // Stop any unused tracks in the new stream
  newStream.getTracks().forEach((track) => {
    if (track !== newVideoTrack) {
      track.stop();
    }
  });

  state.currentFacingMode = newFacingMode;
}
