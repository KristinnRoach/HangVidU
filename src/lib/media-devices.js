// media-devices.js - Media device state and controls

// ===== STATE =====
const state = {
  isAudioMuted: false,
  isVideoOn: true,
  currentFacingMode: 'user', // 'user' = front, 'environment' = back
};

// ===== PUBLIC API =====

export function getIsAudioMuted() {
  return state.isAudioMuted;
}

export function getIsVideoOn() {
  return state.isVideoOn;
}

export function getCurrentFacingMode() {
  return state.currentFacingMode;
}

export function toggleMute({ localStream, toggleMuteBtn, muteSelfBtn }) {
  const audioTrack = localStream.getAudioTracks()[0];
  if (!audioTrack) return;

  state.isAudioMuted = !state.isAudioMuted;
  audioTrack.enabled = !state.isAudioMuted;

  // Update button text
  if (toggleMuteBtn) {
    toggleMuteBtn.textContent = state.isAudioMuted ? 'Unmute Mic' : 'Mute Mic';
  }

  // Update hover-button icon
  if (muteSelfBtn) {
    const icon = muteSelfBtn.querySelector('i');
    if (icon) {
      icon.className = state.isAudioMuted
        ? 'fa fa-microphone-slash'
        : 'fa fa-microphone';
    }
  }
}

export function toggleVideo({ localStream, toggleVideoBtn }) {
  const videoTrack = localStream.getVideoTracks()[0];
  if (!videoTrack) return;

  state.isVideoOn = !state.isVideoOn;
  videoTrack.enabled = state.isVideoOn;

  // Update button text
  if (toggleVideoBtn) {
    toggleVideoBtn.textContent = state.isVideoOn
      ? 'Turn Video Off'
      : 'Turn Video On';
  }
}

export async function switchCamera({
  localStream,
  localVideo,
  peerConnection,
}) {
  const newFacingMode =
    state.currentFacingMode === 'user' ? 'environment' : 'user';

  // Stop current video tracks
  localStream.getVideoTracks().forEach((track) => track.stop());

  // Get new stream
  const newStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: newFacingMode },
    audio: !state.isAudioMuted, // Respect the current mute state
  });

  const newVideoTrack = newStream.getVideoTracks()[0];
  localStream.removeTrack(localStream.getVideoTracks()[0]);
  localStream.addTrack(newVideoTrack);
  localVideo.srcObject = localStream;

  // Ensure audio track state matches the current mute state
  const newAudioTrack = newStream.getAudioTracks()[0];
  if (newAudioTrack) {
    newAudioTrack.enabled = !state.isAudioMuted;
  }

  // Update peer connection if connected
  if (peerConnection) {
    const sender = peerConnection
      .getSenders()
      .find((s) => s.track && s.track.kind === 'video');
    if (sender) sender.replaceTrack(newVideoTrack);
  }

  state.currentFacingMode = newFacingMode;
}

export function restoreMediaState(savedState) {
  if (!savedState) return;

  if (savedState.isAudioMuted !== undefined) {
    state.isAudioMuted = savedState.isAudioMuted;
  }
  if (savedState.isVideoOn !== undefined) {
    state.isVideoOn = savedState.isVideoOn;
  }
  if (savedState.currentFacingMode) {
    state.currentFacingMode = savedState.currentFacingMode;
  }
}

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
