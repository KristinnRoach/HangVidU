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
} from '../features/connect/connection.js';

import { ConnectionMonitor } from '../features/connect/connection-monitor.js';
import { PageReloadManager } from '../features/session/page-reload-manager.js';
import { updateState } from './state.js';

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
let connectionMonitor = null;
let pageReloadManager = null;
let autoSaveCleanup = null;

function saveCurrentState() {
  // Update centralized state
  updateState({
    room: {
      id: getRoomId(),
      isInitiator: getIsInitiator(),
      partnerOnline: getWasConnected(),
    },
    ui: {
      isAudioMuted: getIsAudioMuted(),
      isVideoOn: getIsVideoOn(),
      currentFacingMode: getCurrentFacingMode(),
      watchMode: getWatchMode(),
    },
    sync: {
      streamUrl: streamUrlInput.value,
      isSyncing: false,
    },
  });

  // Save to localStorage via page reload manager
  if (pageReloadManager) {
    pageReloadManager.saveCurrentSession();
  }
}

// ===== INITIALIZE =====

async function init() {
  if (isInitialized) {
    console.debug('init() called when isInitialized is true.');
    return true;
  }

  try {
    // Initialize page reload manager
    pageReloadManager = new PageReloadManager();
    pageReloadManager.setCallbacks({
      onMediaRestore: restoreMediaDevices,
      onConnectionRestore: restoreConnection,
      onUIRestore: restoreUIStateFromReload,
      onStatusUpdate: updateStatus,
    });

    // Check if we should restore from page reload
    if (pageReloadManager.shouldRestoreSession()) {
      updateStatus('Detected previous session. Restoring...');

      try {
        const restorationResult = await pageReloadManager.restoreSession();

        if (restorationResult.success) {
          // Session restored successfully
          isInitialized = true;
          setupAutoSave();
          return true;
        } else {
          // Restoration failed, continue with normal initialization
          updateStatus('Session restoration failed. Starting fresh...');
        }
      } catch (error) {
        console.error('Session restoration error:', error);
        updateStatus('Starting fresh...');
      }
    }

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
      handleCopyLink: async () => {
        const success = await copyLink(shareLink, copyLinkBtn);
        if (success) updateStatus('Link copied!');
        else updateStatus('Please copy manually.');
      },
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
    setupAutoSave();
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

  // Clean up connection monitor
  if (connectionMonitor) {
    connectionMonitor.cleanup();
    connectionMonitor = null;
  }

  // Clean up page reload manager
  if (pageReloadManager) {
    pageReloadManager.clearSession();
  }

  if (autoSaveCleanup) {
    autoSaveCleanup();
    autoSaveCleanup = null;
  }

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

function updateStatus(message, el = statusDiv) {
  el.textContent = message;
}

function setupAutoSave() {
  if (autoSaveCleanup) {
    autoSaveCleanup(); // Clean up previous setup
  }

  if (pageReloadManager) {
    autoSaveCleanup = pageReloadManager.setupAutoSave();
  }
}

// ===== PAGE RELOAD RESTORATION =====

async function restoreMediaDevices({
  isAudioMuted,
  isVideoOn,
  currentFacingMode,
}) {
  try {
    // Get media with the same constraints as before
    const constraints = {
      video: isVideoOn ? { facingMode: currentFacingMode } : false,
      audio: true,
    };

    const localStream = await navigator.mediaDevices.getUserMedia(constraints);
    setLocalStream(localStream);
    localVideo.srcObject = localStream;

    // Restore media state
    if (isAudioMuted) {
      toggleMuteSelfMic();
    }

    if (!isVideoOn) {
      toggleVideo();
    }

    // Show appropriate buttons
    toggleMuteBtn.style.display = 'block';
    toggleVideoBtn.style.display = 'block';

    if (await hasFrontAndBackCameras()) {
      switchCameraBtn.style.display = 'block';
    }

    if (import.meta.env.DEV) {
      console.log('Media devices restored successfully');
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to restore media devices:', error);
    return { success: false, error: error.message };
  }
}

async function restoreConnection({ roomId, isInitiator, wasConnected }) {
  try {
    if (isInitiator) {
      // For initiators, we can't really restore the connection
      // since the room might have expired. Show the link again.
      updateStatus(
        'Session restored. Share the link to reconnect with your partner.'
      );

      shareLink.value = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
      linkContainer.style.display = 'block';
      startChatBtn.disabled = true;
      hangUpBtn.disabled = false;
      toggleModeBtn.style.display = 'block';

      return { success: true };
    } else {
      // For joiners, attempt to rejoin the room
      updateStatus('Reconnecting to room...');

      const result = await join({
        roomId,
        onRemoteStream: handleRemoteStream,
        onStatusUpdate: updateStatus,
      });

      if (result.success) {
        hangUpBtn.disabled = false;
        toggleModeBtn.style.display = 'block';
        return { success: true };
      } else {
        throw new Error('Failed to rejoin room');
      }
    }
  } catch (error) {
    console.error('Failed to restore connection:', error);
    return { success: false, error: error.message };
  }
}

function restoreUIStateFromReload({
  isAudioMuted,
  isVideoOn,
  watchMode,
  streamUrl,
}) {
  try {
    // Restore watch mode if it was active
    if (watchMode && !getWatchMode()) {
      toggleWatchMode();

      if (streamUrl) {
        streamUrlInput.value = streamUrl;
      }
    }

    // Update button states to match restored media state
    if (isAudioMuted) {
      toggleMuteBtn.textContent = 'Unmute Mic';
    }

    if (!isVideoOn) {
      toggleVideoBtn.textContent = 'Turn Video On';
    }

    if (import.meta.env.DEV) {
      console.log('UI state restored successfully');
    }
  } catch (error) {
    console.error('Failed to restore UI state:', error);
  }
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

mutePartnerBtn?.addEventListener('click', () =>
  hoverControlHandlers.onMutePartnerClick(remoteVideo, mutePartnerBtn)
);

// Touch controls for mobile: show/hide buttons on tap
document.querySelectorAll('.video-wrapper').forEach(setupTouchControls);

init();
