// src/lib/devices.js

/**
 * Checks if the browser supports mediaDevices and enumerateDevices.
 * @returns {boolean}
 */
export function isMediaDevicesSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
}

/**
 * Returns a list of video input devices.
 * @returns {Promise<MediaDeviceInfo[]>}
 */
export async function getVideoInputDevices() {
  if (!isMediaDevicesSupported()) return [];
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === 'videoinput');
}

/**
 * Checks if the device likely has both front and back cameras.
 * @returns {Promise<boolean>}
 */
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
    )
      hasBack = true;
  });
  return hasFront && hasBack;
}

export async function switchCamera({
  localStream,
  currentFacingMode,
  localVideo,
  peerConnection,
}) {
  const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
  // Stop current video tracks
  localStream.getVideoTracks().forEach((track) => track.stop());
  // Get new stream
  const newStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: newFacingMode },
    audio: true,
  });
  const newVideoTrack = newStream.getVideoTracks()[0];
  localStream.removeTrack(localStream.getVideoTracks()[0]);
  localStream.addTrack(newVideoTrack);
  localVideo.srcObject = localStream;
  if (peerConnection) {
    const sender = peerConnection
      .getSenders()
      .find((s) => s.track && s.track.kind === 'video');
    if (sender) sender.replaceTrack(newVideoTrack);
  }
  return newFacingMode;
}
