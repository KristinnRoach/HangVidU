// events.js
// Centralizes DOM event listener setup

export function setupEventListeners({
  startChatBtn,
  hangUpBtn,
  copyLinkBtn,
  switchCameraBtn,
  toggleMuteBtn,
  toggleVideoBtn,
  toggleModeBtn,
  loadStreamBtn,
  pipBtn,
  remoteVideo,
  handleStartChat,
  handleHangUp,
  handleCopyLink,
  handleToggleMute,
  handleToggleVideo,
  handleToggleMode,
  handleLoadStream,
  handlePipToggle,
  handleSwitchCamera,
  updateStatus,
}) {
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'p' && remoteVideo.srcObject) {
      e.preventDefault();
      handlePipToggle();
    }
  });
  startChatBtn.addEventListener('click', handleStartChat);
  hangUpBtn.addEventListener('click', handleHangUp);
  copyLinkBtn.addEventListener('click', handleCopyLink);
  switchCameraBtn.addEventListener('click', handleSwitchCamera);
  toggleMuteBtn.addEventListener('click', handleToggleMute);
  toggleVideoBtn.addEventListener('click', handleToggleVideo);
  toggleModeBtn.addEventListener('click', handleToggleMode);
  loadStreamBtn.addEventListener('click', handleLoadStream);
  pipBtn.addEventListener('click', handlePipToggle);
}
