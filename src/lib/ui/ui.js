// ui.js
// UI helper functions for status, toggles, and mode switching

export function updateStatus(statusDiv, message) {
  statusDiv.textContent = message;
}

export function toggleMuteMic(localStream, toggleMuteBtn, isAudioMuted) {
  const audioTrack = localStream.getAudioTracks()[0];
  if (audioTrack) {
    isAudioMuted = !isAudioMuted;
    audioTrack.enabled = !isAudioMuted;
    toggleMuteBtn.textContent = isAudioMuted ? 'Unmute Mic' : 'Mute Mic';
  }
  return isAudioMuted;
}

export function toggleVideo(localStream, toggleVideoBtn, isVideoOn) {
  const videoTrack = localStream.getVideoTracks()[0];
  if (videoTrack) {
    isVideoOn = !isVideoOn;
    videoTrack.enabled = isVideoOn;
    toggleVideoBtn.textContent = isVideoOn ? 'Turn Video Off' : 'Turn Video On';
  }
  return isVideoOn;
}

export function toggleWatchMode(
  watchMode,
  videoContainer,
  watchContainer,
  toggleModeBtn,
  sharedVideo,
  streamUrlInput,
  syncStatus
) {
  watchMode = !watchMode;
  if (watchMode) {
    videoContainer.style.display = 'none';
    watchContainer.style.display = 'block';
    toggleModeBtn.textContent = 'Switch to Video Chat';
    syncStatus.textContent = 'Paste the same stream URL as your partner';
  } else {
    videoContainer.style.display = 'flex';
    watchContainer.style.display = 'none';
    toggleModeBtn.textContent = 'Switch to Watch Mode';
    sharedVideo.src = '';
    streamUrlInput.value = '';
  }
  return watchMode;
}
