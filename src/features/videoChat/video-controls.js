import {
  toggleMute,
  toggleVideo,
  switchCamera,
  hasFrontAndBackCameras,
  getIsAudioMuted,
  getIsVideoOn,
} from './media-devices.js';

// ===== UTILITY FUNCTIONS =====

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

// ===== HOVER CONTROL HANDLERS =====

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

const onMuteSelfClick = ({ localStream, muteSelfBtn, onStateChange }) => {
  toggleMute({ localStream, muteSelfBtn });
  if (onStateChange) onStateChange();
};

const onVideoSelfClick = ({ localStream, videoSelfBtn, onStateChange }) => {
  toggleVideo({ localStream, videoSelfBtn });
  if (onStateChange) onStateChange();
};

const onSwitchCameraClick = async ({
  localStream,
  localVideo,
  peerConnection,
  onStateChange,
}) => {
  await switchCamera({ localStream, localVideo, peerConnection });
  if (onStateChange) onStateChange();
};

// ===== VIDEO CONTROLS SETUP =====

export async function setupVideoControls({
  localVideo,
  remoteVideo,
  muteSelfBtn,
  videoSelfBtn,
  switchCameraSelfBtn,
  fullscreenSelfBtn,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  getLocalStream,
  getPeerConnection,
  onStateChange,
}) {
  // Set up self controls
  if (muteSelfBtn) {
    muteSelfBtn.addEventListener('click', () =>
      onMuteSelfClick({
        localStream: getLocalStream(),
        muteSelfBtn,
        onStateChange,
      })
    );
  }

  if (videoSelfBtn) {
    videoSelfBtn.addEventListener('click', () =>
      onVideoSelfClick({
        localStream: getLocalStream(),
        videoSelfBtn,
        onStateChange,
      })
    );
  }

  if (switchCameraSelfBtn) {
    // Show/hide camera switch button based on available cameras
    if (await hasFrontAndBackCameras()) {
      switchCameraSelfBtn.style.display = 'block';
      switchCameraSelfBtn.addEventListener('click', () =>
        onSwitchCameraClick({
          localStream: getLocalStream(),
          localVideo,
          peerConnection: getPeerConnection(),
          onStateChange,
        })
      );
    } else {
      switchCameraSelfBtn.style.display = 'none';
    }
  }

  if (fullscreenSelfBtn) {
    fullscreenSelfBtn.addEventListener('click', () =>
      onFullscreenClick(localVideo)
    );
  }

  // Set up partner controls
  if (mutePartnerBtn) {
    mutePartnerBtn.addEventListener('click', () =>
      onMutePartnerClick(remoteVideo, mutePartnerBtn)
    );
  }

  if (fullscreenPartnerBtn) {
    fullscreenPartnerBtn.addEventListener('click', () =>
      onFullscreenClick(remoteVideo)
    );
  }
}

// ===== ICON UPDATE FUNCTIONS =====

export function updateVideoControlIcons({ muteSelfBtn, videoSelfBtn }) {
  // Update mute icon
  if (muteSelfBtn) {
    const icon = muteSelfBtn.querySelector('i');
    if (icon) {
      icon.className = getIsAudioMuted()
        ? 'fa fa-microphone'
        : 'fa fa-microphone-slash';
    }
  }

  // Update video icon
  if (videoSelfBtn) {
    const icon = videoSelfBtn.querySelector('i');
    if (icon) {
      icon.className = getIsVideoOn() ? 'fa fa-video' : 'fa fa-video-slash';
      videoSelfBtn.setAttribute(
        'aria-label',
        getIsVideoOn() ? 'Turn video off' : 'Turn video on'
      );
    }
  }
}

// ===== LEGACY EXPORTS (for backward compatibility) =====

export const hoverControlHandlers = {
  onMutePartnerClick,
  onFullscreenClick,
};
