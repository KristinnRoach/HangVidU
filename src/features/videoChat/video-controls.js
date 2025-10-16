// Utility function for handling fullscreen requests with error handling
export const requestFullscreen = async (element) => {
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      // Safari
      await element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE11
      await element.msRequestFullscreen();
    } else {
      console.warn('Fullscreen API is not supported by this browser.');
    }
  } catch (error) {
    console.error('Failed to enter fullscreen mode:', error);
  }
};

const onFullscreenClick = (videoElement) => {
  requestFullscreen(videoElement);
};

const onMutePartnerClick = (remoteVideo, mutePartnerBtn) => {
  const audioTrack = remoteVideo.srcObject?.getAudioTracks()[0];
  if (audioTrack) {
    audioTrack.enabled = !audioTrack.enabled;
    const icon = mutePartnerBtn.querySelector('i');
    if (icon) {
      icon.className = audioTrack.enabled
        ? 'fa fa-volume-mute'
        : 'fa fa-volume-up';
    }
  }
};

export const hoverControlHandlers = {
  onMutePartnerClick,
  onFullscreenClick,
};
