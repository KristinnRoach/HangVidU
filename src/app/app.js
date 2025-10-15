// src/app/app.js
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
} from '../lib/ui/elements.js';

import { loadState, saveState, clearState } from '../lib/storage.js';

import {
  connect,
  join,
  disconnect,
  setLocalStream,
  getRoomId,
  getIsInitiator,
  getWasConnected,
  getPeerConnection,
  getLocalStream,
  restoreConnectionState,
} from '../lib/connection.js';
import { handleMediaError } from '../lib/error-handling.js';
import * as ui from '../lib/ui/ui.js';
import { setupEventListeners } from '../lib/ui/events.js';
import {
  handlePipToggleBtn,
  addRemoteVideoPipListeners,
  closePiP,
} from '../lib/ui/pip.js';

import {
  toggleWatchMode as toggleWatchModeSync,
  loadStream as loadStreamSync,
  setupWatchSync,
  getWatchMode,
} from '../lib/watch-sync.js';

import {
  toggleMute,
  toggleVideo as toggleVideoDevice,
  switchCamera,
  hasFrontAndBackCameras,
  getIsAudioMuted,
  getIsVideoOn,
  getCurrentFacingMode,
  restoreMediaState,
} from '../lib/media-devices.js';

import '@fortawesome/fontawesome-free/css/all.min.css';

// ====== STATE ======

let isInitialized = false;

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
  });
}

// ===== INITIALIZE =====

async function init() {
  if (isInitialized) {
    console.debug('init() called when isInitialized is true.');
    return;
  }

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

    const decision = determineRoomAction({ urlRoomId, savedState });

    if (decision.action === 'join') {
      updateStatus('Connecting...');
      startChatBtn.style.display = 'none';
      restoreUIState(savedState);
      await joinChatRoom(decision.roomId);
    } else {
      updateStatus('Ready. Click to generate video chat link.');
    }

    if (import.meta.env.DEV) {
      toggleMuteSelfMic();
    }

    isInitialized = true;
  } catch (error) {
    handleMediaError(error);
    isInitialized = false;
  }
}

function determineRoomAction({ urlRoomId, savedState }) {
  const roomId = urlRoomId; // NOTE:  Disabled returning to saved room until properly implemented. //   || savedState?.roomId;
  if (!roomId) return { action: 'idle' };
  return { action: 'join', roomId };
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

function handleRemoteStream(stream) {
  // Only set srcObject if not already set to this stream
  if (remoteVideo.srcObject !== stream) {
    remoteVideo.srcObject = stream;
    pipBtn.style.display = 'block';
    addRemoteVideoPipListeners(remoteVideo, pipBtn);
    saveCurrentState();
    updateStatus('Connected!');
    if (remoteVideo.paused && remoteVideo.srcObject) {
      remoteVideo.play().catch((e) => {
        if (import.meta.env.DEV) {
          console.warn('remoteVideo.play() failed:', e);
        }
      });
    }
  } else {
    if (import.meta.env.DEV) {
      console.log('Duplicate ontrack event ignored');
    }
  }
}

// ===== CREATE ROOM (Person A) =====
let startChatInProgress = false;

async function initiateChatRoom() {
  if (startChatInProgress) return;
  startChatInProgress = true;
  try {
    if (!isInitialized) {
      await init();
    }
    if (!isInitialized) {
      console.error('Failed to initialize media devices.');
      return;
    }
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
  } finally {
    startChatInProgress = false;
  }
}

// ===== JOIN ROOM (Person B) =====
async function joinChatRoom(roomId) {
  const result = await join({
    roomId,
    onRemoteStream: handleRemoteStream,
    onStatusUpdate: updateStatus,
  });

  if (!result.success) {
    return;
  }

  setupWatchSync({ roomId, sharedVideo, streamUrlInput, syncStatus });
  toggleModeBtn.style.display = 'block';
  hangUpBtn.disabled = false;

  saveCurrentState();
}

// ===== HANG UP =====
async function hangUp() {
  // Close any PiP windows first
  closePiP(pipBtn);

  if (remoteVideo.srcObject) {
    remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
  }

  // Stop local media too
  const localStream = getLocalStream();
  if (localStream) {
    localStream.getTracks().forEach((t) => t.stop());
    localVideo.srcObject = null;
    setLocalStream(null);
  }

  await disconnect({ onStatusUpdate: updateStatus });

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

  isInitialized = false;
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

init();
