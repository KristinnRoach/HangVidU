// src/media-controls.js
// Handles all media control button functionality (mute, video, camera, fullscreen)

import { switchCamera } from './media-devices.js';

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
 * @param {MediaStream} params.getLocalStream - Getter for Local media stream
 * @param {HTMLVideoElement} params.getLocalVideo - Getter for Local video element
 * @param {HTMLVideoElement} params.getRemoteVideo - Getter for Remote video element
 * @param {RTCPeerConnection} params.getPeerConnection - Getter for Peer connection (optional, for camera switch)
 * @param {HTMLElement} params.muteSelfBtn - Mute self button
 * @param {HTMLElement} params.videoSelfBtn - Video toggle button
 * @param {HTMLElement} params.switchCameraSelfBtn - Switch camera button
 * @param {HTMLElement} params.fullscreenSelfBtn - Fullscreen self button
 * @param {HTMLElement} params.mutePartnerBtn - Mute partner button
 * @param {HTMLElement} params.fullscreenPartnerBtn - Fullscreen partner button
 * @param {Object} params.audioConstraints - Audio constraints for camera switch
 */
export function initializeMediaControls({
  getLocalStream,
  getLocalVideo,
  getRemoteVideo,
  getPeerConnection = () => null,
  muteSelfBtn,
  videoSelfBtn,
  switchCameraSelfBtn,
  fullscreenSelfBtn,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  audioConstraints = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
}) {
  // ===== MUTE/UNMUTE SELF =====
  if (muteSelfBtn) {
    muteSelfBtn.onclick = () => {
      const localStream = getLocalStream();
      const localVideo = getLocalVideo();
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
      const localStream = getLocalStream();
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
      const localStream = getLocalStream();
      const localVideo = getLocalVideo();
      if (!localStream) return;
      const videoTrack = localStream.getVideoTracks()[0];
      const currentFacingMode = videoTrack.getSettings().facingMode;
      const pc = getPeerConnection?.();
      if (!pc) {
        console.error('PeerConnection is required to switch camera.');
        return;
      }
      await switchCamera({
        localStream,
        localVideo,
        peerConnection: pc,
        currentFacingMode,
      });
    };
  }

  // TODO: delete this after testing:
  // switchCameraSelfBtn.onclick = async () => {
  //   if (!localStream) return;

  //   try {
  //     const videoTrack = localStream.getVideoTracks()[0];
  //     const currentFacingMode = videoTrack.getSettings().facingMode;
  //     const newFacingMode =
  //       currentFacingMode === 'user' ? 'environment' : 'user';

  //     // Stop current track
  //     videoTrack.stop();

  //     // Get new stream with opposite camera
  //     const newStream = await navigator.mediaDevices.getUserMedia({
  //       video: { facingMode: newFacingMode },
  //       audio: audioConstraints,
  //     });

  //     // Replace track in peer connection if it exists
  //     const newVideoTrack = newStream.getVideoTracks()[0];
  //     if (pc) {
  //       const sender = pc.getSenders().find((s) => s.track?.kind === 'video');
  //       if (sender) {
  //         sender.replaceTrack(newVideoTrack);
  //       }
  //     }

  //     // Update local stream reference (caller must handle this)
  //     // Return new stream so caller can update their localStream variable
  //     return newStream;
  //   } catch (error) {
  //     console.error('Failed to switch camera:', error);
  //     return null;
  //   }
  // };
  // }

  // ===== FULLSCREEN FOR LOCAL VIDEO =====
  if (fullscreenSelfBtn && getLocalVideo()) {
    fullscreenSelfBtn.onclick = () => {
      const localVideo = getLocalVideo();
      if (localVideo.requestFullscreen) {
        localVideo.requestFullscreen();
      } else if (localVideo.webkitRequestFullscreen) {
        localVideo.webkitRequestFullscreen();
      }
    };
  }

  // ===== MUTE/UNMUTE PARTNER =====
  if (mutePartnerBtn && getRemoteVideo()) {
    mutePartnerBtn.onclick = () => {
      const remoteVideo = getRemoteVideo();
      if (!remoteVideo) return;
      remoteVideo.muted = !remoteVideo.muted;
    };
  }

  // ===== FULLSCREEN FOR REMOTE VIDEO =====
  if (fullscreenPartnerBtn && getRemoteVideo()) {
    fullscreenPartnerBtn.onclick = () => {
      const remoteVideo = getRemoteVideo();
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
