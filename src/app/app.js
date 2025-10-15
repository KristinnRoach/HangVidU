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
} from './elements.js';

import { loadState, saveState, clearState } from '../storage/localStorage.js';

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
} from '../features/connection/connection.js';

import {
  handlePipToggleBtn,
  addRemoteVideoPipListeners,
  closePiP,
} from '../features/videoChat/pip.js';

import {
  toggleWatchMode as toggleWatchModeSync,
  loadStream as loadStreamSync,
  setupWatchSync,
  getWatchMode,
} from '../features/watch2gether/watch-sync.js';

import {
  toggleMute,
  toggleVideo as toggleVideoDevice,
  switchCamera,
  hasFrontAndBackCameras,
  getIsAudioMuted,
  getIsVideoOn,
  getCurrentFacingMode,
  restoreMediaState,
} from '../features/videoChat/media-devices.js';

import { setupEventListeners } from './events.js';
import { handleMediaError } from '../utils/error/error-handling.js';
import { setupTouchControls } from '../utils/ui/touch-controls.js';
import { copyLink } from '../utils/clipboard.js';

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
    return true;
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
      handleCopyLink: () => copyLink(shareLink, copyLinkBtn, updateStatus),
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
    return true;
  } catch (error) {
    handleMediaError(error);
    isInitialized = false;
    return false;
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
      const success = await init();
      if (!success) {
        console.error('Failed to initialize media devices.');
        return;
      }
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

function updateStatus(message, statusDiv = statusDiv) {
  statusDiv.textContent = message;
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

// ===== EVENT LISTENERS ===== // Todo: consolidate patterns / structure

import { hoverControlHandlers } from '../features/videoChat/video-controls.js';

fullscreenPartnerBtn?.addEventListener('click', () =>
  hoverControlHandlers.onFullscreenClick(remoteVideo)
);

fullscreenSelfBtn?.addEventListener('click', () =>
  hoverControlHandlers.onFullscreenClick(localVideo)
);

muteSelfBtn?.addEventListener('click', () => toggleMuteSelfMic());

mutePartnerBtn?.addEventListener(
  'click',
  hoverControlHandlers.onMutePartnerClick(remoteVideo, mutePartnerBtn)
);

// Touch controls for mobile: show/hide buttons on tap
document.querySelectorAll('.video-wrapper').forEach(setupTouchControls);

init();
