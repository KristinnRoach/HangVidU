const onFullscreenClick = (videoElement) => {
  if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen();
  } else if (videoElement.webkitRequestFullscreen) {
    // Safari
    videoElement.webkitRequestFullscreen();
  } else if (videoElement.msRequestFullscreen) {
    // IE11
    videoElement.msRequestFullscreen();
  }
};

const onMutePartnerClick = (remoteVideo, mutePartnerBtn) => {
  const audioTrack = remoteVideo.srcObject?.getAudioTracks()[0];
  if (audioTrack) {
    audioTrack.enabled = !audioTrack.enabled;
    const icon = mutePartnerBtn.querySelector('i');
    if (icon) {
      icon.className = audioTrack.enabled
        ? 'fa fa-volume-up'
        : 'fa fa-volume-mute';
    }
  }
};

export const hoverControlHandlers = {
  onMutePartnerClick,
  onFullscreenClick,
};
