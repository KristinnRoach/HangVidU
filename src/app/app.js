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

import { loadState, saveState, clearState } from '../storage/localStorage.js';

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
import { PageReloadManager } from '../features/session/page-reload-manager.js';

import {
  handlePipToggleBtn,
  addRemoteVideoPipListeners,
  closePiP,
} from '../features/videoChat/pip.js';

import {
  toggleWatchMode as toggleWatchModeSync,
  loadStream as loadStreamSync,
  setupWatchSync,
  // cleanupWatchSync,
  getWatchMode,
  getStreamUrl,
  setStreamUrl,
} from '../features/watch2gether/watch-sync.js';

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
// App-level manager instances (not shared state)
let connectionMonitor = null;
let pageReloadManager = null;
let autoSaveCleanup = null;

// ====== STATE ======
// App-level state is now managed in ./state.js

function saveCurrentState() {
  // Update feature module state
  setStreamUrl(streamUrlInput.value);

  // Save to localStorage via page reload manager
  if (pageReloadManager) {
    pageReloadManager.saveCurrentSession(connectionMonitor, {
      getIsAudioMuted,
      getIsVideoOn,
      getCurrentFacingMode,
      getWatchMode,
      getStreamUrl,
    });
  }
}

// ===== INITIALIZE =====

async function init() {
  // Check if already initialized by looking for existing managers and local stream
  if (pageReloadManager && getLocalStream()) {
    if (import.meta.env.DEV) {
      console.debug('init() called when already initialized.');
    }
    return true;
  }

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
          setupAutoSave();
          return true;
        } else {
          // Restoration failed, clear stale session state
          try {
            pageReloadManager.clearSession();
          } catch (clearError) {
            console.error('Failed to clear session state:', clearError);
          }
          updateStatus('Session restoration failed. Starting fresh...');
        }
      } catch (error) {
        console.error('Session restoration error:', error);
        // Clear potentially stale session state
        try {
          pageReloadManager.clearSession();
        } catch (clearError) {
          console.error('Failed to clear session state:', clearError);
        }
        updateStatus('Starting fresh...');
      }
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
      // Auto-mute in development mode
      if (muteSelfBtn) {
        muteSelfBtn.click();
      }
    }

    setupAutoSave();
    return true;
  } catch (error) {
    handleMediaError(error);
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

  // Clean up page reload manager
  if (pageReloadManager) {
    try {
      pageReloadManager.clearSession();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Error clearing session:', error);
      }
    }
    pageReloadManager = null;
  }

  // Clean up auto save
  if (autoSaveCleanup) {
    try {
      autoSaveCleanup();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Error during auto-save cleanup:', error);
      }
    }
    autoSaveCleanup = null;
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

function setupAutoSave() {
  if (autoSaveCleanup) {
    autoSaveCleanup(); // Clean up previous setup
    autoSaveCleanup = null;
  }

  if (pageReloadManager) {
    autoSaveCleanup = pageReloadManager.setupAutoSave(() => connectionMonitor);
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

    // Setup video controls with restored state
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

    // Update icons to match restored state
    updateVideoControlIcons({ muteSelfBtn, videoSelfBtn });

    if (import.meta.env.DEV) {
      console.log('Media devices restored successfully');
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to restore media devices:', error);
    return { success: false, error: error.message };
  }
}

async function restoreConnection({ roomId, role }) {
  try {
    const isRoomInitiator = role === 'initiator';

    if (isRoomInitiator) {
      // For initiators, we can't really restore the connection
      // since the room might have expired. Show the link again.
      updateStatus(
        'Session restored. Share the link to reconnect with your partner.'
      );

      shareLink.value = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
      linkContainer.style.display = 'block';
      startChatBtn.disabled = true;
      hangUpBtn.disabled = false;
      disableTitleLink(); // Prevent accidental page reloads

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
        disableTitleLink(); // Prevent accidental page reloads
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
    // Restore watch mode if it was active and toggle button exists
    if (watchMode && !getWatchMode() && toggleModeBtn) {
      toggleWatchMode();
    }

    // Restore stream URL in feature module
    if (streamUrl) {
      setStreamUrl(streamUrl);
      if (streamUrlInput) {
        streamUrlInput.value = streamUrl;
      }
    }

    // Update video control icons to match restored state
    updateVideoControlIcons({ muteSelfBtn, videoSelfBtn });

    if (import.meta.env.DEV) {
      console.log('UI state restored successfully');
    }
  } catch (error) {
    console.error('Failed to restore UI state:', error);
  }
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
