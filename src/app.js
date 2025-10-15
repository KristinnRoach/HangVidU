// src/app.js
import {
  localVideo,
  remoteVideo,
  sharedVideo,
  startChatBtn,
  hangUpBtn,
  copyLinkBtn,
  pipBtn,
  switchCameraBtn,
  toggleMuteBtn,
  toggleVideoBtn,
  toggleModeBtn,
  loadStreamBtn,
  statusDiv,
  linkContainer,
  watchContainer,
  videoContainer,
  shareLink,
  streamUrlInput,
  syncStatus,

  // Todo:
  mutePartnerBtn,
  fullscreenPartnerBtn,
  muteSelfBtn,
  fullscreenSelfBtn,
} from './lib/ui/elements.js';

import { loadState, saveState, clearState } from './lib/storage.js';

import {
  connect,
  join,
  disconnect,
  reconnect,
  setLocalStream,
  getRoomId,
  getIsInitiator,
  getWasConnected,
  getPeerConnection,
  getLocalStream,
  restoreConnectionState,
  fullCleanup,
  cleanupFirebaseRoom,
} from './lib/connection.js';
import { handleMediaError } from './lib/error-handling.js';
import * as ui from './lib/ui/ui.js';
import { setupEventListeners } from './lib/ui/events.js';
import {
  handlePipToggleBtn,
  addRemoteVideoPipListeners,
  closePiP,
} from './lib/ui/pip.js';

import {
  toggleWatchMode as toggleWatchModeSync,
  loadStream as loadStreamSync,
  setupWatchSync,
  getWatchMode,
} from './lib/watch-sync.js';

import {
  toggleMute,
  toggleVideo as toggleVideoDevice,
  switchCamera,
  hasFrontAndBackCameras,
  getIsAudioMuted,
  getIsVideoOn,
  getCurrentFacingMode,
  restoreMediaState,
} from './lib/media-devices.js';

import '@fortawesome/fontawesome-free/css/all.min.css';

// ====== STATE ======

function saveCurrentState() {
  saveState({
    roomId: getRoomId(),
    isInitiator: getIsInitiator(),
    isAudioMuted: getIsAudioMuted(),
    isVideoOn: getIsVideoOn(),
    currentFacingMode: getCurrentFacingMode(),
    watchMode: getWatchMode(),
    wasConnected: getWasConnected(),
    streamUrl: streamUrlInput.value,
    lastActive: Date.now(),
  });
}

// ===== INITIALIZE =====

async function init() {
  try {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setLocalStream(localStream);
    localVideo.srcObject = localStream;

    toggleMuteBtn.style.display = 'block';
    toggleVideoBtn.style.display = 'block';

    if (await hasFrontAndBackCameras()) {
      switchCameraBtn.style.display = 'block';
    } else {
      switchCameraBtn.style.display = 'none';
    }

    setupEventListeners({
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
      handleStartChat: initiateChatRoom,
      handleHangUp: hangUp,
      handleCopyLink: copyLink,
      handleSwitchCamera: async () => {
        await switchCamera({
          localStream: getLocalStream(),
          localVideo,
          peerConnection: getPeerConnection(),
        });
        saveCurrentState();
      },
      handleToggleMute: toggleMuteSelfMic,
      handleToggleVideo: toggleVideo,
      handleToggleMode: toggleWatchMode,
      handleLoadStream: loadStream,
      handlePipToggle: () =>
        handlePipToggleBtn(remoteVideo, pipBtn, updateStatus),
      updateStatus,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const urlRoomId = urlParams.get('room');
    const savedState = loadState();

    // Extract only connection-related state
    const connectionState = savedState
      ? {
          roomId: savedState.roomId,
          wasConnected: savedState.wasConnected,
          isInitiator: savedState.isInitiator,
          lastActive: savedState.lastActive,
        }
      : null;

    const decision = determineRoomAction({ urlRoomId, connectionState });

    if (decision.action === 'join') {
      updateStatus('Connecting...');
      startChatBtn.style.display = 'none';
      await joinChatRoom(decision.roomId);
    } else if (decision.action === 'reconnect') {
      updateStatus('Reconnecting...');
      startChatBtn.style.display = 'none';
      // Restore connection state before reconnecting
      if (connectionState) {
        restoreConnectionState(connectionState);
      }
      await reconnectChatRoom();
    } else {
      updateStatus('Ready. Click to generate video chat link.');
    }

    if (import.meta.env.DEV) {
      toggleMuteSelfMic();
    }
  } catch (error) {
    handleMediaError(error);
  }
}

function determineRoomAction({ urlRoomId, connectionState }) {
  // Priority 1: URL room (someone shared a link)
  if (urlRoomId) {
    return { action: 'join', roomId: urlRoomId };
  }

  // Priority 2: Reconnection (page refresh during active call)
  // Only allow reconnect if lastActive is recent (within 2 minutes)
  const now = Date.now();
  const MAX_RECONNECT_AGE = 2 * 60 * 1000; // 2 minutes
  if (
    connectionState?.roomId &&
    connectionState?.wasConnected &&
    connectionState?.lastActive &&
    now - connectionState.lastActive < MAX_RECONNECT_AGE
  ) {
    return { action: 'reconnect', roomId: connectionState.roomId };
  }

  // Default: idle, waiting to start
  return { action: 'idle' };
}

function restoreUIState(savedState) {
  if (!savedState) return;

  restoreMediaState(savedState);
  restoreConnectionState(savedState);

  if (!getIsVideoOn()) toggleVideo();
  if (getIsAudioMuted()) toggleMuteSelfMic();
  if (savedState.watchMode && !getWatchMode()) {
    toggleWatchMode();
    if (savedState.streamUrl) streamUrlInput.value = savedState.streamUrl;
  }
}

async function handleRemoteStream(stream) {
  // Always set srcObject (your reconnect code should avoid zombie tracks)

  if (remoteVideo.srcObject === stream) {
    if (import.meta.env.DEV) {
      console.log('Duplicate ontrack event ignored');
    }
    return;
  }

  if (!stream) {
    console.warn('handleRemoteStream called with null stream');
    return;
  }

  if (!remoteVideo) {
    console.warn('handleRemoteStream: remoteVideo element not found');
    return;
  }

  const pc = getPeerConnection && getPeerConnection();
  if (pc) {
    console.log('[SIGNALING] handleRemoteStream:', {
      signalingState: pc.signalingState,
      remoteDescription: pc.remoteDescription?.type,
      localDescription: pc.localDescription?.type,
    });
  }

  // Defensive: always make a new stream object
  const freshStream = new MediaStream(stream.getTracks());
  if (remoteVideo.srcObject) {
    remoteVideo.srcObject.getTracks().forEach((t) => t.stop());
    remoteVideo.srcObject = null;
  }
  remoteVideo.srcObject = freshStream;

  // Inspect video/audio track health immediately
  const videoTrack = stream.getVideoTracks()[0];
  if (videoTrack) {
    console.log(
      'video track muted:',
      videoTrack.muted,
      'enabled:',
      videoTrack.enabled
    );
    videoTrack.addEventListener('mute', () => {
      console.log('[TRACK] Video track MUTED');
    });
    videoTrack.addEventListener('unmute', () => {
      console.log('[TRACK] Video track UNMUTED');
    });
  }

  // Do NOT call remoteVideo.load()
  // Only one play()—if it fails, catch/log
  try {
    await remoteVideo.play();
  } catch (e) {
    if (import.meta.env.DEV) console.warn('remoteVideo.play() failed:', e);
  }

  pipBtn.style.display = 'block';
  addRemoteVideoPipListeners(remoteVideo, pipBtn);
  saveCurrentState();
  updateStatus('Connected!');

  // Streaming health debug logs
  if (import.meta.env.DEV) {
    const vTracks = stream.getVideoTracks();
    const aTracks = stream.getAudioTracks();
    console.log(
      '[DEBUG STREAM] Video tracks:',
      vTracks.length,
      vTracks.map(
        (t) =>
          `${t.label} enabled=${t.enabled} muted=${t.muted} readyState=${t.readyState}`
      )
    );
    console.log(
      '[DEBUG STREAM] Audio tracks:',
      aTracks.length,
      aTracks.map(
        (t) =>
          `${t.label} enabled=${t.enabled} muted=${t.muted} readyState=${t.readyState}`
      )
    );
    setTimeout(() => {
      console.log('[DEBUG VIDEO] remoteVideo.paused:', remoteVideo.paused);
      console.log(
        '[DEBUG VIDEO] remoteVideo.readyState:',
        remoteVideo.readyState
      );
      console.log(
        '[DEBUG VIDEO] remoteVideo.videoWidth:',
        remoteVideo.videoWidth
      );
      console.log(
        '[DEBUG VIDEO] remoteVideo.videoHeight:',
        remoteVideo.videoHeight
      );
    }, 1000);
  }

  // If video doesn't start within 2 seconds, offer repair option
  setTimeout(() => {
    if (remoteVideo.readyState < 2 || remoteVideo.videoWidth === 0) {
      updateStatus(
        'Remote video is not loading. Click anywhere to restart connection.'
      );
      // Or use a visible #repairBtn instead of body:
      document.body.addEventListener('click', repairConnectionHandler, {
        once: true,
      });
    }
  }, 2000);
}

function repairConnectionHandler() {
  updateStatus('Forcing connection repair...');
  window.location.reload(); // Or call hangUp, then startChatBtn.click() if you want to restart without full page reload
}

// ===== CREATE ROOM (Person A) =====
async function initiateChatRoom() {
  // Wait briefly to ensure previous teardown fully settled
  await new Promise((r) => setTimeout(r, 150));

  const { roomId, shareUrl } = await connect({
    onRemoteStream: handleRemoteStream,
    onStatusUpdate: updateStatus,
  });

  // Show link
  shareLink.value = shareUrl;
  linkContainer.style.display = 'block';
  startChatBtn.disabled = true;
  hangUpBtn.disabled = false;

  setupWatchSync({ roomId, sharedVideo, streamUrlInput, syncStatus });
  toggleModeBtn.style.display = 'block';

  saveCurrentState();
}

// ===== JOIN ROOM (Person B) =====
async function joinChatRoom(roomId) {
  // Wait briefly to ensure previous teardown fully settled
  await new Promise((r) => setTimeout(r, 150));

  const result = await join({
    roomId,
    onRemoteStream: handleRemoteStream,
    onStatusUpdate: updateStatus,
    remoteVideo,
  });

  if (!result.success) {
    return;
  }

  setupWatchSync({ roomId, sharedVideo, streamUrlInput, syncStatus });
  toggleModeBtn.style.display = 'block';
  hangUpBtn.disabled = false;

  saveCurrentState();
}

// ===== RECONNECT =====
function hasLiveRemoteVideo(videoEl) {
  return (
    videoEl &&
    videoEl.srcObject &&
    videoEl.videoWidth > 0 &&
    videoEl.readyState >= 2 // HAVE_CURRENT_DATA
  );
}

async function reconnectChatRoom() {
  const result = await reconnect({
    onRemoteStream: handleRemoteStream,
    onStatusUpdate: updateStatus,
    remoteVideo,
  });

  if (!result.success || !hasLiveRemoteVideo(remoteVideo)) {
    // Clean up UI to initial state
    updateStatus('Ready. Click to generate video chat link.');
    startChatBtn.disabled = false;
    startChatBtn.style.display = 'block';
    hangUpBtn.disabled = true;
    linkContainer.style.display = 'none';
    toggleMuteBtn.style.display = 'none';
    toggleVideoBtn.style.display = 'none';
    toggleModeBtn.style.display = 'none';
    watchContainer.style.display = 'none';
    videoContainer.style.display = 'flex';
    shareLink.value = '';
    sharedVideo.src = '';
    streamUrlInput.value = '';
    syncStatus.textContent = '';
    window.history.replaceState({}, document.title, window.location.pathname);
    clearState();
    return;
  }

  const roomId = getRoomId();

  // Restore UI state
  if (getIsInitiator()) {
    const shareUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    shareLink.value = shareUrl;
    linkContainer.style.display = 'block';
  }

  setupWatchSync({ roomId, sharedVideo, streamUrlInput, syncStatus });
  toggleModeBtn.style.display = 'block';
  hangUpBtn.disabled = false;
  startChatBtn.style.display = 'none';

  saveCurrentState();
}

// ===== HANG UP =====
async function hangUp() {
  // Close any PiP windows first
  closePiP(pipBtn);

  // Use fullCleanup orchestrator (deleteRoom true)
  await fullCleanup({ deleteRoom: true });

  // Reset UI
  startChatBtn.disabled = false;
  startChatBtn.style.display = 'block';
  hangUpBtn.disabled = true;
  linkContainer.style.display = 'none';
  toggleMuteBtn.style.display = 'none';
  toggleVideoBtn.style.display = 'none';
  toggleModeBtn.style.display = 'none';
  watchContainer.style.display = 'none';
  videoContainer.style.display = 'flex';
  shareLink.value = '';
  sharedVideo.src = '';
  streamUrlInput.value = '';
  syncStatus.textContent = '';

  window.history.replaceState({}, document.title, window.location.pathname);
  clearState();
}

// ===== HELPERS =====

async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => (copyLinkBtn.textContent = 'Copy Link'), 2000);
  } catch (err) {
    shareLink.select();
    document.execCommand('copy');
  }
}

function updateStatus(message) {
  ui.updateStatus(statusDiv, message);
}

function toggleMuteSelfMic() {
  toggleMute({ localStream: getLocalStream(), toggleMuteBtn, muteSelfBtn });
  saveCurrentState();
}

function toggleVideo() {
  toggleVideoDevice({ localStream: getLocalStream(), toggleVideoBtn });
  saveCurrentState();
}

function toggleWatchMode() {
  toggleWatchModeSync({
    videoContainer,
    watchContainer,
    toggleModeBtn,
    sharedVideo,
    streamUrlInput,
    syncStatus,
  });
  saveCurrentState();
}

function loadStream() {
  const url = streamUrlInput.value.trim();
  loadStreamSync({ roomId: getRoomId(), url, sharedVideo, syncStatus });
  saveCurrentState();
}

// Add event handlers for fullscreen and mute buttons
fullscreenPartnerBtn?.addEventListener('click', () => {
  if (remoteVideo.requestFullscreen) {
    remoteVideo.requestFullscreen();
  } else if (remoteVideo.webkitRequestFullscreen) {
    // Safari
    remoteVideo.webkitRequestFullscreen();
  } else if (remoteVideo.msRequestFullscreen) {
    // IE11
    remoteVideo.msRequestFullscreen();
  }
});

fullscreenSelfBtn?.addEventListener('click', () => {
  if (localVideo.requestFullscreen) {
    localVideo.requestFullscreen();
  } else if (localVideo.webkitRequestFullscreen) {
    // Safari
    localVideo.webkitRequestFullscreen();
  } else if (localVideo.msRequestFullscreen) {
    // IE11
    localVideo.msRequestFullscreen();
  }
});

muteSelfBtn?.addEventListener('click', () => toggleMuteSelfMic());

mutePartnerBtn?.addEventListener('click', () => {
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
});

function setupTouchControls(wrapper) {
  let hideTimeout;

  function showControls() {
    wrapper.classList.add('show-controls');
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      wrapper.classList.remove('show-controls');
    }, 3000); // 3 seconds auto-hide
  }

  // Listen to both 'touchstart' and 'click'
  wrapper.addEventListener('touchstart', showControls);
  wrapper.addEventListener('click', (e) => {
    // Prevent play/pause if clicking controls
    if (e.target.closest('.hover-controls')) return;
    showControls();
  });

  // keep controls onscreen if interacting with buttons

  const controls = wrapper.querySelector('.hover-controls');

  // keep controls onscreen if interacting with buttons
  controls.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
  controls.addEventListener('touchstart', () => clearTimeout(hideTimeout), {
    passive: true,
  });
  controls.addEventListener('click', () => clearTimeout(hideTimeout));

  // Hide controls when leaving the controller area
  controls.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      wrapper.classList.remove('show-controls');
    }, 2000);
  });
}

document.querySelectorAll('.video-wrapper').forEach(setupTouchControls);

// Ensure full cleanup on page unload / visibility change
window.addEventListener('pagehide', async () => {
  // pagehide fires on navigation away / refresh / close for modern browsers
  try {
    await fullCleanup({ deleteRoom: true });
  } catch (e) {
    if (import.meta.env.DEV) console.warn('pagehide fullCleanup failed', e);
  }
});

window.addEventListener('beforeunload', async (e) => {
  // best-effort synchronous cleanup; avoid async blocking ops
  try {
    // stop and null video elements (synchronous)
    if (remoteVideo?.srcObject) {
      remoteVideo.srcObject.getTracks().forEach((t) => t.stop());
      remoteVideo.srcObject = null;
    }
    if (localVideo?.srcObject) {
      localVideo.srcObject.getTracks().forEach((t) => t.stop());
      localVideo.srcObject = null;
    }

    // remove firebase room synchronously is not possible; but we attempt an async call
    // We still call fullCleanup but cannot await it reliably here.
    fullCleanup({ deleteRoom: true }).catch(() => {});
  } catch (err) {
    // ignore errors during unload
  }
});

init();
