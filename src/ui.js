// ui.js - UI update and control utilities

export function updateStatus(elements, message) {
  elements.statusDiv.textContent = message;
}

export function showLinkUI(elements, url) {
  elements.shareLink.value = url;
  elements.linkContainer.style.display = 'block';
  elements.startChatBtn.disabled = true;
  elements.hangUpBtn.disabled = false;
  elements.toggleModeBtn.style.display = 'block';
}

export function resetUI(elements) {
  elements.startChatBtn.disabled = false;
  elements.startChatBtn.style.display = 'block';
  elements.hangUpBtn.disabled = true;
  elements.linkContainer.style.display = 'none';
  elements.toggleMuteBtn.style.display = 'none';
  elements.toggleVideoBtn.style.display = 'none';
  elements.toggleModeBtn.style.display = 'none';
  elements.watchContainer.style.display = 'none';
  elements.videoContainer.style.display = 'flex';
  elements.shareLink.value = '';
  elements.sharedVideo.src = '';
  elements.streamUrlInput.value = '';
  elements.syncStatus.textContent = '';
}

export function toggleWatchMode(elements, state) {
  state.watchMode = !state.watchMode;
  
  if (state.watchMode) {
    elements.videoContainer.style.display = 'none';
    elements.watchContainer.style.display = 'block';
    elements.toggleModeBtn.textContent = 'Switch to Video Chat';
    elements.syncStatus.textContent = 'Paste the same stream URL as your partner';
  } else {
    elements.videoContainer.style.display = 'flex';
    elements.watchContainer.style.display = 'none';
    elements.toggleModeBtn.textContent = 'Switch to Watch Mode';
    elements.sharedVideo.src = '';
    elements.streamUrlInput.value = '';
  }
}

export function toggleMute(state, localStream, elements) {
  const audioTrack = localStream.getAudioTracks()[0];
  if (audioTrack) {
    state.isAudioMuted = !state.isAudioMuted;
    audioTrack.enabled = !state.isAudioMuted;
    elements.toggleMuteBtn.textContent = state.isAudioMuted ? 'Unmute Audio' : 'Mute Audio';
  }
}

export function toggleVideo(state, localStream, elements) {
  const videoTrack = localStream.getVideoTracks()[0];
  if (videoTrack) {
    state.isVideoOn = !state.isVideoOn;
    videoTrack.enabled = state.isVideoOn;
    elements.toggleVideoBtn.textContent = state.isVideoOn ? 'Turn Video Off' : 'Turn Video On';
  }
}

export async function copyLink(elements) {
  try {
    await navigator.clipboard.writeText(elements.shareLink.value);
    elements.copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => (elements.copyLinkBtn.textContent = 'Copy Link'), 2000);
  } catch (err) {
    elements.shareLink.select();
    document.execCommand('copy');
  }
}