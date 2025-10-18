// src/app/app.js
import {
  localVideo,
  remoteVideo,
  sharedVideo,
  startChatBtn,
  hangUpBtn,
  copyLinkBtn,
  pipBtn,
  toggleModeBtn,
  loadStreamBtn,
  statusDiv,
  linkContainer,
  watchContainer,
  videoContainer,
  shareLink,
  streamUrlInput,
  syncStatus,
  titleHeader,
  titleLink,
  titleText,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  muteSelfBtn,
  videoSelfBtn,
  switchCameraSelfBtn,
  fullscreenSelfBtn,
} from './elements.js';

// import { loadState, saveState, clearState } from '../storage/local-storage.js';

import {
  connect,
  join,
  disconnect,
  setLocalStream,
  getRoomId,
  getRole,
  getWasConnected,
  getPeerConnection,
  getLocalStream,
  restoreConnectionState,
} from '../features/connect/connection.js';

import { ConnectionMonitor } from '../features/connect/connection-monitor.js';

import {
  handlePipToggleBtn,
  addRemoteVideoPipListeners,
  closePiP,
} from '../features/videoChat/pip.js';

import { getSyncConfig } from '../config/api-config.js';

// import * as webrtcSync from '../features/watch2gether/watch-sync.js';
import * as sync from '../features/watch2gether/watch-sync.js';

// Select sync module based on configuration
const syncConfig = getSyncConfig();
const syncModule = syncConfig.useWebRTC ? webrtcSync : sync;

if (import.meta.env.DEV) {
  console.log(
    'Using sync system:',
    syncConfig.useWebRTC ? 'WebRTC' : 'Firebase Legacy'
  );
}

const {
  toggleWatchMode: toggleWatchModeSync,
  loadStream: loadStreamSync,
  setupWatchSync,
  // cleanupWatchSync,
  getWatchMode,
  getStreamUrl,
  setStreamUrl,
} = syncModule;

import {
  getIsAudioMuted,
  getIsVideoOn,
  getCurrentFacingMode,
  restoreMediaState,
} from '../features/videoChat/media-devices.js';

import {
  setupVideoControls,
  updateVideoControlIcons,
} from '../features/videoChat/video-controls.js';

import { setupEventListeners } from './events.js';
import { handleMediaError } from '../utils/error/error-handling.js';
import { setupTouchControls } from '../utils/ui/touch-controls.js';
import { copyLink } from '../utils/clipboard.js';
import {
  initializeApiConfig,
  validateApiConfig,
} from '../config/api-config.js';

import '@fortawesome/fontawesome-free/css/all.min.css';

// ====== MANAGERS ======
let connectionMonitor = null;

function saveCurrentState() {
  // Update feature module state
  setStreamUrl(streamUrlInput.value);
}

// ===== INITIALIZE =====

let isInitialized = false;

async function init() {
  // Check if already initialized
  if (isInitialized) {
    if (import.meta.env.DEV) {
      console.debug('init() called when already initialized.');
    }
    return true;
  }

  isInitialized = true;

  try {
    // Initialize API configuration
    initializeApiConfig();

    // Validate API configuration and warn about missing keys
    const apiValidation = validateApiConfig();
    if (!apiValidation.isValid && import.meta.env.DEV) {
      console.warn('API Configuration Issues:');
      apiValidation.missing.forEach((key) => console.warn(`- Missing: ${key}`));
      apiValidation.warnings.forEach((warning) => console.warn(`- ${warning}`));
    }

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setLocalStream(localStream);
    localVideo.srcObject = localStream;

    // Setup video controls
    await setupVideoControls({
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
      onStateChange: saveCurrentState,
    });

    setupEventListeners({
      startChatBtn,
      hangUpBtn,
      copyLinkBtn,
      toggleModeBtn,
      loadStreamBtn,
      pipBtn,
      remoteVideo,
      handleStartChat: initiateChatRoom,
      handleHangUp: hangUp,
      handleCopyLink: async () => {
        const success = await copyLink(shareLink, copyLinkBtn);
        if (success) updateStatus('Link copied!');
        else updateStatus('Please copy manually.');
      },
      handleToggleMode: toggleWatchMode,
      handleLoadStream: loadStream,
      handlePipToggle: () =>
        handlePipToggleBtn(remoteVideo, pipBtn, updateStatus),
      updateStatus,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const urlRoomId = urlParams.get('room');

    const decision = determineRoomAction({ urlRoomId });

    if (decision.action === 'join') {
      updateStatus('Connecting...');
      startChatBtn.style.display = 'none';
      // restoreUIState(savedState);
      await joinChatRoom(decision.roomId);
    } else {
      updateStatus('Ready. Click to generate video chat link.');
    }

    if (import.meta.env.DEV) {
      // Auto-mute in development mode
      if (muteSelfBtn) {
        muteSelfBtn.click();
      }
    }

    return true;
  } catch (error) {
    handleMediaError(error);
    return false;
  }
}

function determineRoomAction({ urlRoomId }) {
  const roomId = urlRoomId; //  || savedState?.roomId;
  if (!roomId) return { action: 'idle' };
  return { action: 'join', roomId };
}

function restoreUIState(savedState) {
  if (!savedState) return;

  restoreMediaState(savedState);
  restoreConnectionState(savedState);

  // Update video control icons to match restored state
  updateVideoControlIcons({ muteSelfBtn, videoSelfBtn });
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

    // Don't immediately show "Connected!" - let the monitor validate first
    updateStatus('Received video stream. Validating...');

    if (remoteVideo.paused && remoteVideo.srcObject) {
      remoteVideo.play().catch((e) => {
        if (import.meta.env.DEV) {
          console.warn('remoteVideo.play() failed:', e);
        }
      });
    }

    // Start enhanced connection monitoring
    if (!connectionMonitor) {
      connectionMonitor = new ConnectionMonitor({
        videoValidationTimeout: 10000,
        maxRetries: 3,
        retryDelay: 2000,
      });

      connectionMonitor.setCallbacks({
        onStatusUpdate: updateStatus,
        onConnectionStateChange: (newState, oldState) => {
          if (import.meta.env.DEV) {
            console.log(`Connection state: ${oldState} → ${newState}`);
          }
        },
        onValidationComplete: (result) => {
          if (import.meta.env.DEV) {
            console.log('Connection validation complete:', result);
          }

          if (!result.success) {
            // Validation failed - show error and potentially retry
            console.warn('Video stream validation failed:', result.error);
          }
        },
      });
    }

    // Start monitoring the remote video
    connectionMonitor.startMonitoring(remoteVideo, getPeerConnection());
  } else {
    if (import.meta.env.DEV) {
      console.log('Duplicate ontrack event ignored');
    }
  }
}

// ===== CREATE ROOM (Person A) =====

async function initiateChatRoom() {
  // Check if already in progress by looking for existing room or disabled start button
  if (getRoomId() || startChatBtn.disabled) {
    if (import.meta.env.DEV) {
      console.debug('initiateChatRoom() called when already in progress.');
    }
    return;
  }

  try {
    const success = await init();
    if (!success) {
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

    setupWatchSync({
      roomId,
      sharedVideo,
      streamUrlInput,
      syncStatus,
      peerConnection: getPeerConnection(),
      callerRole: getRole(),
    });
    disableTitleLink(); // Prevent accidental page reloads

    saveCurrentState();
  } catch (error) {
    console.error('Failed to initiate chat room:', error);
    // Reset UI state on error
    startChatBtn.disabled = false;
    linkContainer.style.display = 'none';
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

  setupWatchSync({
    roomId,
    sharedVideo,
    streamUrlInput,
    syncStatus,
    peerConnection: getPeerConnection(),
    callerRole: getRole(),
  });
  hangUpBtn.disabled = false;
  disableTitleLink(); // Prevent accidental page reloads

  saveCurrentState();
}

// ===== HANG UP =====
async function hangUp() {
  isInitialized = false;

  // Close any PiP windows first
  closePiP(pipBtn);

  // Clean up connection monitor
  if (connectionMonitor) {
    try {
      connectionMonitor.cleanup();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Error during connection monitor cleanup:', error);
      }
    }
    connectionMonitor = null;
  }

  // Clean up watch sync
  // try {
  //   cleanupWatchSync();
  // } catch (error) {
  //   if (import.meta.env.DEV) {
  //     console.warn('Error during watch sync cleanup:', error);
  //   }
  // }

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
  watchContainer.style.display = 'none';
  videoContainer.style.display = 'flex';
  shareLink.value = '';
  sharedVideo.src = '';
  streamUrlInput.value = '';
  syncStatus.textContent = '';
  enableTitleLink();

  window.history.replaceState({}, document.title, window.location.pathname);
  clearState();
}

// ===== HELPERS =====

function updateStatus(message, el = statusDiv) {
  el.textContent = message;
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

// ===== TITLE MODE TOGGLE =====

function disableTitleLink() {
  console.debug('Disabling title link to prevent page reloads.');
  titleLink.href = ''; // Todo: ensure this robustly prevents a page reload across browsers
}

function enableTitleLink() {
  if (import.meta.env.DEV) {
    titleLink.href = '#';
  }
  if (import.meta.env.PROD) {
    titleLink.href = 'https://kristinnroach.github.io/HangVidU/';
  }
}

// Touch controls for mobile: show/hide buttons on tap
document.querySelectorAll('.video-wrapper').forEach(setupTouchControls);

init();
