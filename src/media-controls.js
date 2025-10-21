// src/media-controls.js

// Handles all media control button functionality (mute, video, camera, fullscreen)

// ============================================================================
// STATE
// ============================================================================

let remotePreviousMuted = false;
let remoteVolumeChangeListener = null;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Enable/disable microphone
 */
function setMicrophoneEnabled(enabled, localStream) {
  if (!localStream) return;

  const audioTrack = localStream.getAudioTracks()[0];
  if (!audioTrack) return;

  audioTrack.enabled = enabled;
}

/**
 * Mute/unmute local video element
 */
function setLocalVideoMuted(enabled, volume, localVideo) {
  if (!localVideo) return;

  localVideo.muted = !enabled;
  localVideo.volume = volume;
}

/**
 * Update mute mic icon
 */
function updateMuteMicIcon(muted, muteSelfBtn) {
  const icon = muteSelfBtn.querySelector('i');
  icon.className = muted ? 'fa fa-microphone-slash' : 'fa fa-microphone';
}

// ============================================================================
// REMOTE VIDEO EVENT LISTENERS
// ============================================================================

/**
 * Add event listeners to remote video for volume/mute changes
 */
export function addRemoteVideoEventListeners(remoteVideo, mutePartnerBtn) {
  if (!remoteVideo) return;

  // Listen for volumechange (only event that fires on muted events)
  remoteVolumeChangeListener = () => {
    if (remoteVideo.muted !== remotePreviousMuted) {
      const icon = mutePartnerBtn.querySelector('i');
      icon.className = remoteVideo.muted
        ? 'fa fa-volume-mute'
        : 'fa fa-volume-up';
      remotePreviousMuted = remoteVideo.muted;
    }
  };

  remoteVideo.addEventListener('volumechange', remoteVolumeChangeListener);
}

/**
 * Remove remote video event listeners (cleanup)
 */
export function removeRemoteVideoEventListeners(remoteVideo) {
  if (!remoteVideo || !remoteVolumeChangeListener) return;

  remoteVideo.removeEventListener('volumechange', remoteVolumeChangeListener);
  remoteVolumeChangeListener = null;
}

// ============================================================================
// MEDIA CONTROL INITIALIZATION
// ============================================================================

/**
 * Initialize all media controls
 * @param {Object} params - Configuration object
 * @param {MediaStream} params.localStream - Local media stream
 * @param {HTMLVideoElement} params.localVideo - Local video element
 * @param {HTMLVideoElement} params.remoteVideo - Remote video element
 * @param {HTMLElement} params.muteSelfBtn - Mute self button
 * @param {HTMLElement} params.videoSelfBtn - Video toggle button
 * @param {HTMLElement} params.switchCameraSelfBtn - Switch camera button
 * @param {HTMLElement} params.fullscreenSelfBtn - Fullscreen self button
 * @param {HTMLElement} params.mutePartnerBtn - Mute partner button
 * @param {HTMLElement} params.fullscreenPartnerBtn - Fullscreen partner button
 * @param {RTCPeerConnection} params.pc - Peer connection (optional, for camera switch)
 * @param {Object} params.audioConstraints - Audio constraints for camera switch
 */
export function initializeMediaControls({
  localStream,
  localVideo,
  remoteVideo,
  muteSelfBtn,
  videoSelfBtn,
  switchCameraSelfBtn,
  fullscreenSelfBtn,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  pc = null,
  audioConstraints = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
}) {
  // ===== MUTE/UNMUTE SELF =====
  if (muteSelfBtn) {
    muteSelfBtn.onclick = () => {
      if (!localVideo || !localStream) return;

      const shouldMute = !localVideo.muted;
      setMicrophoneEnabled(!shouldMute, localStream);
      setLocalVideoMuted(!shouldMute, 0, localVideo);
      updateMuteMicIcon(shouldMute, muteSelfBtn);
    };
  }

  // ===== TOGGLE VIDEO ON/OFF =====
  if (videoSelfBtn) {
    videoSelfBtn.onclick = () => {
      if (!localStream) return;

      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        const icon = videoSelfBtn.querySelector('i');
        icon.className = videoTrack.enabled
          ? 'fa fa-video'
          : 'fa fa-video-slash';
      }
    };
  }

  // ===== SWITCH CAMERA (MOBILE) =====
  if (switchCameraSelfBtn) {
    switchCameraSelfBtn.onclick = async () => {
      if (!localStream) return;

      try {
        const videoTrack = localStream.getVideoTracks()[0];
        const currentFacingMode = videoTrack.getSettings().facingMode;
        const newFacingMode =
          currentFacingMode === 'user' ? 'environment' : 'user';

        // Stop current track
        videoTrack.stop();

        // Get new stream with opposite camera
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: newFacingMode },
          audio: audioConstraints,
        });

        // Replace track in peer connection if it exists
        const newVideoTrack = newStream.getVideoTracks()[0];
        if (pc) {
          const sender = pc.getSenders().find((s) => s.track?.kind === 'video');
          if (sender) {
            sender.replaceTrack(newVideoTrack);
          }
        }

        // Update local stream reference (caller must handle this)
        // Return new stream so caller can update their localStream variable
        return newStream;
      } catch (error) {
        console.error('Failed to switch camera:', error);
        return null;
      }
    };
  }

  // ===== FULLSCREEN FOR LOCAL VIDEO =====
  if (fullscreenSelfBtn && localVideo) {
    fullscreenSelfBtn.onclick = () => {
      if (localVideo.requestFullscreen) {
        localVideo.requestFullscreen();
      } else if (localVideo.webkitRequestFullscreen) {
        localVideo.webkitRequestFullscreen();
      }
    };
  }

  // ===== MUTE/UNMUTE PARTNER =====
  if (mutePartnerBtn && remoteVideo) {
    mutePartnerBtn.onclick = () => {
      if (!remoteVideo) return;
      remoteVideo.muted = !remoteVideo.muted;
    };
  }

  // ===== FULLSCREEN FOR REMOTE VIDEO =====
  if (fullscreenPartnerBtn && remoteVideo) {
    fullscreenPartnerBtn.onclick = () => {
      if (remoteVideo.requestFullscreen) {
        remoteVideo.requestFullscreen();
      } else if (remoteVideo.webkitRequestFullscreen) {
        remoteVideo.webkitRequestFullscreen();
      }
    };
  }
}

// ============================================================================
// CLEANUP
// ============================================================================

/**
 * Cleanup media controls
 */
export function cleanupMediaControls(remoteVideo) {
  removeRemoteVideoEventListeners(remoteVideo);
  remotePreviousMuted = false;
}
