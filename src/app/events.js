// events.js
// Centralizes DOM event listener setup

export function setupEventListeners({
  startChatBtn,
  hangUpBtn,
  copyLinkBtn,
  toggleModeBtn,
  loadStreamBtn,
  pipBtn,
  remoteVideo,
  handleStartChat,
  handleHangUp,
  handleCopyLink,
  handleToggleMode,
  handleLoadStream,
  handlePipToggle,
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
  toggleModeBtn.addEventListener('click', handleToggleMode);
  loadStreamBtn.addEventListener('click', handleLoadStream);
  pipBtn.addEventListener('click', handlePipToggle);
}
