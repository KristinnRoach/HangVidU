// watch-sync.js - Watch mode and video sync feature with improved sync system

import { db } from '../../storage/firebaseRealTimeDB.js';
import { getRoomId, getPeerConnection } from '../connect/connection.js';
import {
  createSyncManager,
  getSyncManager,
  cleanupSyncManager,
} from './sync-manager.js';
import {
  createYouTubePlayerAdapter,
  getYouTubePlayerAdapter,
  cleanupYouTubePlayerAdapter,
} from './youtube-player-adapter.js';
import {
  initializeWebRTCSync,
  sendSyncEvent as sendWebRTCEvent,
  onSyncEvent,
  cleanupWebRTCSync,
  getSyncStatus,
} from './webrtc-sync.js';

import {
  isYouTubeUrl,
  getYouTubeId,
  showYouTubePlayer,
  hideYouTubePlayer,
  getYTPlayer,
  getYTReady,
} from './youtube.js';

import {
  initializeSearchUI as initSearchUI,
  updateSearchAvailability,
  cleanupSearchUI,
} from './youtube-search-ui.js';

// ===== STATE =====
const state = {
  watchMode: false,
  streamUrl: '',
  // New sync system components
  syncManager: null,
  playerAdapter: null,
  transport: null,
  // UI elements for status display
  syncStatusElement: null,
  // Error handling and recovery
  lastError: null,
  autoResyncEnabled: true,
  manualResyncAvailable: false,
  // Auto resync state
  lastPartnerState: null,
  autoResyncInterval: null,
};

// ===== PUBLIC API =====

/**
 * Initialize YouTube search UI when entering watch mode
 */
function initializeSearchUI() {
  initSearchUI(handleVideoSelection);
  updateSearchAvailability();

  if (import.meta.env.DEV) {
    console.log('YouTube search UI initialized for watch mode');
  }
}

/**
 * Handle video selection from search results
 * @param {Object} video - Selected video object
 */
async function handleVideoSelection(video) {
  // Get current room ID and elements
  const roomId = getRoomId();
  const sharedVideo = document.getElementById('sharedVideo');
  const streamUrlInput = document.getElementById('streamUrl');

  if (!roomId) {
    updateSyncStatus('No active room found', 'error');
    return;
  }

  // Update URL input with selected video
  if (streamUrlInput) {
    streamUrlInput.value = video.url;
  }

  // Update sync status
  updateSyncStatus(`Loading "${video.title}"...`);

  try {
    // Load the selected video using existing loadStream function
    await loadStream({
      roomId,
      url: video.url,
      sharedVideo,
      syncStatus: state.syncStatusElement,
      peerConnection: getPeerConnection(),
    });

    if (import.meta.env.DEV) {
      console.log('Video loaded from search selection:', video.title);
    }
  } catch (error) {
    console.error('Failed to load selected video:', error);
    updateSyncStatus('Failed to load video. Please try again.', 'error');
  }
}

export function getWatchMode() {
  return state.watchMode;
}

export function getIsSyncing() {
  return state.syncManager?.getSyncState()?.isSyncing || false;
}

export function getStreamUrl() {
  return state.streamUrl;
}

export function setStreamUrl(url) {
  state.streamUrl = url;
}

/**
 * Get comprehensive sync status for UI display
 * @returns {Object} Sync status information
 */
export function getSyncStatusInfo() {
  const syncManagerStatus = state.syncManager?.getSyncState() || {};
  const webrtcStatus = getSyncStatus();

  return {
    ...syncManagerStatus,
    ...webrtcStatus,
    lastError: state.lastError,
    autoResyncEnabled: state.autoResyncEnabled,
    manualResyncAvailable: state.manualResyncAvailable,
    // Additional status indicators
    playerReady: state.playerAdapter?.isPlayerReady() || false,
    hasActiveVideo: !!state.streamUrl,
    syncHealth: calculateSyncHealth(),
  };
}

/**
 * Calculate overall sync health score
 * @returns {Object} Sync health information
 */
function calculateSyncHealth() {
  const webrtcStatus = getSyncStatus();
  const syncManagerStatus = state.syncManager?.getSyncState() || {};

  let score = 100;
  const issues = [];

  // Check WebRTC connection
  if (!webrtcStatus.isConnected) {
    score -= 40;
    issues.push('WebRTC connection lost');
  }

  // Check sync manager state
  if (syncManagerStatus.failedEvents > 0) {
    score -= 20;
    issues.push(`${syncManagerStatus.failedEvents} failed sync events`);
  }

  // Check for recent sync activity
  const timeSinceLastSync = Date.now() - (syncManagerStatus.lastSyncTime || 0);
  if (timeSinceLastSync > 30000 && state.streamUrl) {
    // 30 seconds
    score -= 15;
    issues.push('No recent sync activity');
  }

  // Check player state
  if (state.streamUrl && !state.playerAdapter?.isPlayerReady()) {
    score -= 25;
    issues.push('Player not ready');
  }

  return {
    score: Math.max(0, score),
    status:
      score >= 80
        ? 'excellent'
        : score >= 60
        ? 'good'
        : score >= 40
        ? 'fair'
        : 'poor',
    issues,
  };
}

/**
 * Manually trigger resync with partner
 * @returns {Promise<boolean>} Success status
 */
export async function triggerManualResync() {
  if (!state.syncManager) {
    console.warn('No sync manager available for manual resync');
    return false;
  }

  try {
    const success = await state.syncManager.retryFailedSyncOperations();
    if (success > 0) {
      updateSyncStatus('Manual resync completed successfully');
      state.manualResyncAvailable = false;
    } else {
      updateSyncStatus('No failed operations to retry');
    }
    return success > 0;
  } catch (error) {
    console.error('Manual resync failed:', error);
    updateSyncStatus('Manual resync failed: ' + error.message, 'error');
    return false;
  }
}

/**
 * Enable or disable automatic resync for large time differences
 * @param {boolean} enabled - Whether to enable auto resync
 */
export function setAutoResyncEnabled(enabled) {
  state.autoResyncEnabled = enabled;

  if (enabled) {
    startAutoResyncMonitoring();
  } else {
    stopAutoResyncMonitoring();
  }

  if (import.meta.env.DEV) {
    console.log('Auto resync', enabled ? 'enabled' : 'disabled');
  }
}

/**
 * Start automatic resync monitoring
 */
function startAutoResyncMonitoring() {
  // Clear existing interval if any
  if (state.autoResyncInterval) {
    clearInterval(state.autoResyncInterval);
  }

  // Check for auto resync conditions every 10 seconds
  state.autoResyncInterval = setInterval(() => {
    if (state.autoResyncEnabled && state.streamUrl) {
      checkForAutoResync();
    }
  }, 10000);

  if (import.meta.env.DEV) {
    console.log('Auto resync monitoring started');
  }
}

/**
 * Stop automatic resync monitoring
 */
function stopAutoResyncMonitoring() {
  if (state.autoResyncInterval) {
    clearInterval(state.autoResyncInterval);
    state.autoResyncInterval = null;
  }

  if (import.meta.env.DEV) {
    console.log('Auto resync monitoring stopped');
  }
}

/**
 * Get detailed error information for troubleshooting
 * @returns {Object} Error details
 */
export function getErrorDetails() {
  const syncStatus = getSyncStatusInfo();
  const errorDetails = {
    lastError: state.lastError,
    timestamp: state.lastError ? Date.now() : null,
    syncHealth: syncStatus.syncHealth,
    componentStatus: {
      syncManager: !!state.syncManager,
      playerAdapter: !!state.playerAdapter,
      transport: !!state.transport,
      webrtcConnected: syncStatus.isConnected,
    },
    troubleshootingSteps: generateTroubleshootingSteps(syncStatus),
  };

  return errorDetails;
}

/**
 * Generate troubleshooting steps based on current state
 * @param {Object} syncStatus - Current sync status
 * @returns {Array} Array of troubleshooting steps
 */
function generateTroubleshootingSteps(syncStatus) {
  const steps = [];

  if (!syncStatus.isConnected) {
    steps.push({
      step: 'Check WebRTC connection',
      description: 'Ensure both users have stable internet connections',
      action: 'refresh_page',
    });
  }

  if (syncStatus.failedEvents > 0) {
    steps.push({
      step: 'Retry failed sync events',
      description: 'Some sync events failed to send',
      action: 'manual_resync',
    });
  }

  if (!syncStatus.playerReady && syncStatus.hasActiveVideo) {
    steps.push({
      step: 'Reload video player',
      description: 'The video player is not responding',
      action: 'reload_player',
    });
  }

  if (syncStatus.syncHealth.score < 60) {
    steps.push({
      step: 'Reset sync system',
      description: 'Multiple sync issues detected',
      action: 'reset_sync',
    });
  }

  return steps;
}

/**
 * Execute troubleshooting action
 * @param {string} action - Action to execute
 * @returns {Promise<boolean>} Success status
 */
export async function executeTroubleshootingAction(action) {
  try {
    switch (action) {
      case 'manual_resync':
        return await triggerManualResync();

      case 'reload_player':
        return await reloadPlayer();

      case 'reset_sync':
        return await resetSyncSystem();

      case 'refresh_page':
        // This would typically be handled by the UI
        updateSyncStatus('Please refresh the page to reconnect', 'warning');
        return true;

      default:
        console.warn('Unknown troubleshooting action:', action);
        return false;
    }
  } catch (error) {
    console.error('Troubleshooting action failed:', error);
    return false;
  }
}

/**
 * Reload the video player
 * @returns {Promise<boolean>} Success status
 */
async function reloadPlayer() {
  if (!state.playerAdapter || !state.streamUrl) {
    return false;
  }

  try {
    updateSyncStatus('Reloading player...', 'info');

    // Clean up current player
    if (state.playerAdapterCleanup) {
      state.playerAdapterCleanup();
    }

    // Reinitialize player
    if (isYouTubeUrl(state.streamUrl)) {
      const vid = getYouTubeId(state.streamUrl);
      const success = await state.playerAdapter.initializePlayer(vid);

      if (success) {
        const { cleanup, processRemoteSync } =
          state.playerAdapter.setupBidirectionalSync((syncEvent) =>
            handleLocalPlayerAction(syncEvent)
          );

        state.playerAdapterCleanup = cleanup;
        state.processRemoteSync = processRemoteSync;

        updateSyncStatus('Player reloaded successfully');
        return true;
      }
    }

    throw new Error('Failed to reload player');
  } catch (error) {
    console.error('Player reload failed:', error);
    updateSyncStatus('Player reload failed', 'error');
    return false;
  }
}

/**
 * Reset the entire sync system
 * @returns {Promise<boolean>} Success status
 */
async function resetSyncSystem() {
  try {
    updateSyncStatus('Resetting sync system...', 'info');

    // Clean up existing components
    cleanupSyncComponents();

    // Clear error state
    state.lastError = null;
    state.manualResyncAvailable = false;

    updateSyncStatus('Sync system reset - please reload your video');
    return true;
  } catch (error) {
    console.error('Sync system reset failed:', error);
    updateSyncStatus('Reset failed', 'error');
    return false;
  }
}

export function toggleWatchMode({
  videoContainer,
  watchContainer,
  toggleModeBtn,
  sharedVideo,
  streamUrlInput,
  syncStatus,
}) {
  state.watchMode = !state.watchMode;
  state.syncStatusElement = syncStatus; // Store reference for status updates

  if (state.watchMode) {
    videoContainer.style.display = 'none';
    watchContainer.style.display = 'block';
    toggleModeBtn.textContent = 'Switch to Video Chat';
    updateSyncStatus(
      'Search for videos or paste the same stream URL as your partner'
    );

    // Initialize YouTube search UI
    initializeSearchUI();

    // Add manual resync button to UI if not already present
    addManualResyncButton(syncStatus);
  } else {
    videoContainer.style.display = 'flex';
    watchContainer.style.display = 'none';
    toggleModeBtn.textContent = 'Switch to Watch Mode';
    sharedVideo.src = '';
    streamUrlInput.value = '';

    // Clean up sync components when leaving watch mode
    cleanupSyncComponents();

    // Clean up search UI
    cleanupSearchUI();
  }

  return state.watchMode;
}

export async function loadStream({
  roomId,
  url,
  sharedVideo,
  syncStatus,
  peerConnection,
}) {
  if (!url) {
    updateSyncStatus('Please enter a stream URL', 'error');
    return;
  }

  try {
    // Initialize sync components if not already done
    await initializeSyncComponents(roomId, sharedVideo, peerConnection);

    if (isYouTubeUrl(url)) {
      const vid = getYouTubeId(url);

      // Initialize YouTube player adapter if needed
      if (!state.playerAdapter) {
        state.playerAdapter = createYouTubePlayerAdapter(
          'youtube-player-container'
        );
      }

      // Initialize YouTube player through adapter
      const success = await state.playerAdapter.initializePlayer(vid);

      if (success) {
        updateSyncStatus('YouTube video loading...');

        // Set up bidirectional sync
        const { cleanup, processRemoteSync } =
          state.playerAdapter.setupBidirectionalSync((syncEvent) =>
            handleLocalPlayerAction(syncEvent)
          );

        // Store cleanup function for later
        state.playerAdapterCleanup = cleanup;
        state.processRemoteSync = processRemoteSync;

        updateSyncStatus('YouTube video sent to partner...');
      } else {
        throw new Error('Failed to initialize YouTube player');
      }
    } else {
      // Handle direct video URLs (fallback to legacy approach for now)
      hideYouTubePlayer(sharedVideo);
      sharedVideo.src = url;
      updateSyncStatus('Video sent to partner...');

      // Set up legacy video sync for non-YouTube videos
      setupLegacyVideoSync(roomId, sharedVideo);
    }

    // Send URL to partner through both Firebase (backward compatibility) and WebRTC
    if (roomId) {
      await Promise.all([
        db.ref(`rooms/${roomId}/stream`).set({ url }),
        state.syncManager?.sendSyncEvent('url-share', { url }),
      ]);
    }

    // Store current URL
    state.streamUrl = url;
  } catch (error) {
    console.error('Failed to load stream:', error);
    state.lastError = error;
    updateSyncStatus(`Failed to load video: ${error.message}`, 'error');
    state.manualResyncAvailable = true;
  }
}

export async function setupWatchSync({
  roomId,
  sharedVideo,
  streamUrlInput,
  syncStatus,
  peerConnection,
  callerRole, // ? Should we use role here? (initator vs joiner)
}) {
  if (!roomId) return;

  state.syncStatusElement = syncStatus; // Store reference for status updates

  try {
    // Initialize sync components
    await initializeSyncComponents(roomId, sharedVideo, peerConnection);

    // Set up Firebase listeners for backward compatibility
    setupFirebaseListeners(roomId, sharedVideo, streamUrlInput, syncStatus);

    // Set up WebRTC sync event listeners
    setupWebRTCSyncListeners(sharedVideo, streamUrlInput);

    updateSyncStatus('Sync system initialized');

    // Start auto resync monitoring if enabled
    if (state.autoResyncEnabled) {
      startAutoResyncMonitoring();
    }

    if (import.meta.env.DEV) {
      console.log('Watch sync setup completed for room:', roomId);
    }
  } catch (error) {
    console.error('Failed to setup watch sync:', error);
    state.lastError = error;
    updateSyncStatus(`Sync setup failed: ${error.message}`, 'error');
    state.manualResyncAvailable = true;
  }
}

// ===== PRIVATE HELPERS =====

/**
 * Initialize sync components (SyncManager, PlayerAdapter, WebRTC transport)
 * @param {string} roomId - Room identifier
 * @param {HTMLVideoElement} sharedVideo - Shared video element
 * @param {RTCPeerConnection} peerConnection - WebRTC peer connection
 */
async function initializeSyncComponents(roomId, sharedVideo, peerConnection) {
  if (state.syncManager) {
    // Already initialized
    return;
  }

  try {
    // Initialize WebRTC transport
    if (peerConnection) {
      // Determine if we're the initiator (this would need to be passed from the calling code)
      const isInitiator = true; // This should be determined by the calling context
      initializeWebRTCSync(peerConnection, isInitiator);

      // Create transport wrapper for SyncManager
      state.transport = createWebRTCTransport();
    }

    // Create SyncManager
    state.syncManager = createSyncManager(
      roomId,
      state.playerAdapter,
      state.transport
    );

    if (import.meta.env.DEV) {
      console.log('Sync components initialized for room:', roomId);
    }
  } catch (error) {
    console.error('Failed to initialize sync components:', error);
    throw error;
  }
}

/**
 * Create WebRTC transport wrapper for SyncManager
 * @returns {Object} Transport interface
 */
function createWebRTCTransport() {
  return {
    async sendEvent(eventType, eventData) {
      try {
        return sendWebRTCEvent(eventType, eventData.data);
      } catch (error) {
        console.error('WebRTC transport send failed:', error);
        return false;
      }
    },

    onEvent(eventType, callback) {
      return onSyncEvent(eventType, callback);
    },

    isConnected() {
      return getSyncStatus().isConnected;
    },
  };
}

/**
 * Handle local player actions and send to sync manager
 * @param {Object} syncEvent - Local sync event
 */
async function handleLocalPlayerAction(syncEvent) {
  if (!state.syncManager) return;

  try {
    await state.syncManager.sendSyncEvent(syncEvent.type, {
      currentTime: syncEvent.currentTime,
      timestamp: syncEvent.timestamp,
    });

    updateSyncStatus(
      `${
        syncEvent.type === 'play'
          ? 'Playing'
          : syncEvent.type === 'pause'
          ? 'Paused'
          : 'Seeking'
      } - synced with partner`
    );
  } catch (error) {
    console.error('Failed to send local player action:', error);
    state.lastError = error;
    updateSyncStatus('Sync failed - will retry automatically', 'warning');
    state.manualResyncAvailable = true;
  }
}

/**
 * Set up Firebase listeners for backward compatibility
 * @param {string} roomId - Room identifier
 * @param {HTMLVideoElement} sharedVideo - Shared video element
 * @param {HTMLInputElement} streamUrlInput - Stream URL input
 * @param {HTMLElement} syncStatus - Sync status element
 */
function setupFirebaseListeners(
  roomId,
  sharedVideo,
  streamUrlInput,
  syncStatus
) {
  const roomRef = db.ref(`rooms/${roomId}`);

  // Listen for stream URL changes (backward compatibility)
  roomRef.child('stream/url').on('value', (snapshot) => {
    const url = snapshot.val();
    if (url && url !== streamUrlInput.value && url !== state.streamUrl) {
      streamUrlInput.value = url;
      showSharedVideoNotification(url, sharedVideo);
    }
  });

  // Legacy Firebase sync listeners (as fallback)
  roomRef.child('stream/playing').on('value', async (snapshot) => {
    if (getIsSyncing()) return; // Use new sync manager state

    const playing = snapshot.val();
    if (playing !== null) {
      await handleLegacyPlayPauseSync(
        playing,
        streamUrlInput.value,
        sharedVideo
      );
    }
  });

  roomRef.child('stream/time').on('value', (snapshot) => {
    if (getIsSyncing()) return; // Use new sync manager state

    const time = snapshot.val();
    if (time !== null) {
      handleLegacySeekSync(time, streamUrlInput.value, sharedVideo);
    }
  });
}

/**
 * Set up WebRTC sync event listeners
 * @param {HTMLVideoElement} sharedVideo - Shared video element
 * @param {HTMLInputElement} streamUrlInput - Stream URL input
 */
function setupWebRTCSyncListeners(sharedVideo, streamUrlInput) {
  // Listen for sync events from WebRTC
  onSyncEvent('*', async (eventData) => {
    if (!eventData || !eventData.type) return;

    try {
      switch (eventData.type) {
        case 'play':
          if (state.processRemoteSync) {
            await state.processRemoteSync({
              type: 'play',
              currentTime: eventData.data.currentTime,
            });
          }
          updateSyncStatus('Partner started playing');
          break;

        case 'pause':
          if (state.processRemoteSync) {
            await state.processRemoteSync({
              type: 'pause',
              currentTime: eventData.data.currentTime,
            });
          }
          updateSyncStatus('Partner paused');
          break;

        case 'seek':
          if (state.processRemoteSync) {
            await state.processRemoteSync({
              type: 'seek',
              currentTime: eventData.data.currentTime,
            });
          }
          updateSyncStatus(
            `Partner seeked to ${Math.floor(eventData.data.currentTime)}s`
          );
          break;

        case 'url-share':
          if (
            eventData.data.url &&
            eventData.data.url !== streamUrlInput.value
          ) {
            streamUrlInput.value = eventData.data.url;
            showSharedVideoNotification(eventData.data.url, sharedVideo);
          }
          break;

        case 'connection':
          if (eventData.data.connected) {
            updateSyncStatus('Connected to partner');
          } else {
            updateSyncStatus('Disconnected from partner', 'warning');
            state.manualResyncAvailable = true;
          }
          break;

        case 'state-validation':
          // Handle state validation responses for auto resync
          if (eventData.data.requestType === 'auto-resync-check') {
            handlePartnerStateResponse(eventData.data);
          }
          break;

        case 'state-correction':
          // Handle state corrections from partner
          if (eventData.data.reason === 'auto_resync_large_diff') {
            if (import.meta.env.DEV) {
              console.log('Received auto resync correction from partner');
            }

            if (state.processRemoteSync) {
              if (eventData.data.isPlaying) {
                await state.processRemoteSync({
                  type: 'play',
                  currentTime: eventData.data.currentTime,
                });
              } else {
                await state.processRemoteSync({
                  type: 'pause',
                  currentTime: eventData.data.currentTime,
                });
              }
            }

            updateSyncStatus(
              `Partner auto-resynced you (${Math.floor(
                eventData.data.timeDifference || 0
              )}s difference)`,
              'success'
            );
            showAutoResyncNotification(eventData.data.timeDifference || 0);
          }
          break;
      }
    } catch (error) {
      console.error('Error handling WebRTC sync event:', error);
      state.lastError = error;
      updateSyncStatus('Sync error occurred', 'error');
      state.manualResyncAvailable = true;
    }
  });
}

/**
 * Show notification when partner shares a video
 * @param {string} url - Shared video URL
 * @param {HTMLVideoElement} sharedVideo - Shared video element
 */
function showSharedVideoNotification(url, sharedVideo) {
  if (!state.syncStatusElement) return;

  state.syncStatusElement.innerHTML = `Partner shared a video: <button id="accept-shared-video" style="margin-left: 10px; padding: 5px 15px;">✓ Accept & Load</button>`;
  state.syncStatusElement.style.background = '#2196f3';

  const btn = document.getElementById('accept-shared-video');
  btn?.addEventListener('click', () => acceptSharedVideo(url, sharedVideo));
}

/**
 * Accept shared video from partner
 * @param {string} url - Video URL to accept
 * @param {HTMLVideoElement} sharedVideo - Shared video element
 */
async function acceptSharedVideo(url, sharedVideo) {
  try {
    if (isYouTubeUrl(url)) {
      const vid = getYouTubeId(url);

      if (!state.playerAdapter) {
        state.playerAdapter = createYouTubePlayerAdapter(
          'youtube-player-container'
        );
      }

      const success = await state.playerAdapter.initializePlayer(vid);
      if (success) {
        updateSyncStatus('Loading shared YouTube video...');

        // Set up bidirectional sync
        const { cleanup, processRemoteSync } =
          state.playerAdapter.setupBidirectionalSync((syncEvent) =>
            handleLocalPlayerAction(syncEvent)
          );

        state.playerAdapterCleanup = cleanup;
        state.processRemoteSync = processRemoteSync;
      } else {
        throw new Error('Failed to load YouTube video');
      }
    } else {
      hideYouTubePlayer(sharedVideo);
      sharedVideo.src = url;
      updateSyncStatus('Loading shared video...');
    }

    state.streamUrl = url;
    resetSyncStatusStyle();
  } catch (error) {
    console.error('Failed to accept shared video:', error);
    state.lastError = error;
    updateSyncStatus(`Failed to load shared video: ${error.message}`, 'error');
    state.manualResyncAvailable = true;
  }
}

/**
 * Handle legacy play/pause sync for backward compatibility
 * @param {boolean} playing - Playing state
 * @param {string} url - Current video URL
 * @param {HTMLVideoElement} sharedVideo - Shared video element
 */
async function handleLegacyPlayPauseSync(playing, url, sharedVideo) {
  const ytPlayer = getYTPlayer();
  const ytReady = getYTReady();

  if (isYouTubeUrl(url) && ytPlayer && ytReady) {
    if (
      playing === true &&
      ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING
    ) {
      ytPlayer.playVideo();
      updateSyncStatus('Playing in sync');
    } else if (
      playing === false &&
      ytPlayer.getPlayerState() === YT.PlayerState.PLAYING
    ) {
      ytPlayer.pauseVideo();
      updateSyncStatus('Partner pressed pause');
    }
  } else {
    if (playing === true && sharedVideo.paused) {
      try {
        await sharedVideo.play();
        updateSyncStatus('Playing in sync');
      } catch (error) {
        updateSyncStatus('▶️ Tap the video to start playing', 'warning');
      }
    } else if (playing === false && !sharedVideo.paused) {
      sharedVideo.pause();
      updateSyncStatus('Partner pressed pause');
    }
  }
}

/**
 * Handle legacy seek sync for backward compatibility
 * @param {number} time - Seek time
 * @param {string} url - Current video URL
 * @param {HTMLVideoElement} sharedVideo - Shared video element
 */
function handleLegacySeekSync(time, url, sharedVideo) {
  const ytPlayer = getYTPlayer();
  const ytReady = getYTReady();

  if (isYouTubeUrl(url) && ytPlayer && ytReady) {
    if (Math.abs(ytPlayer.getCurrentTime() - time) > 2) {
      ytPlayer.seekTo(time, true);
      updateSyncStatus(`Syncing to ${Math.floor(time)}s`);
    }
  } else {
    if (Math.abs(sharedVideo.currentTime - time) > 2) {
      sharedVideo.currentTime = time;
      updateSyncStatus(`Syncing to ${Math.floor(time)}s`);
    }
  }
}

/**
 * Set up legacy video sync for non-YouTube videos
 * @param {string} roomId - Room identifier
 * @param {HTMLVideoElement} sharedVideo - Shared video element
 */
function setupLegacyVideoSync(roomId, sharedVideo) {
  // Remove existing listeners to prevent duplicates
  const newVideo = sharedVideo.cloneNode(true);
  sharedVideo.parentNode.replaceChild(newVideo, sharedVideo);

  // Add new listeners with sync manager integration
  newVideo.addEventListener('play', async () => {
    if (!getIsSyncing() && state.syncManager) {
      await state.syncManager.sendSyncEvent('play', {
        currentTime: newVideo.currentTime,
      });
    }
  });

  newVideo.addEventListener('pause', async () => {
    if (!getIsSyncing() && state.syncManager) {
      await state.syncManager.sendSyncEvent('pause', {
        currentTime: newVideo.currentTime,
      });
    }
  });

  newVideo.addEventListener('seeked', async () => {
    if (!getIsSyncing() && state.syncManager) {
      await state.syncManager.sendSyncEvent('seek', {
        currentTime: newVideo.currentTime,
      });
    }
  });
}

/**
 * Update sync status display with error handling and user feedback
 * @param {string} message - Status message
 * @param {string} type - Message type ('info', 'warning', 'error')
 */
function updateSyncStatus(message, type = 'info', options = {}) {
  if (!state.syncStatusElement) return;

  // Add timestamp for debugging
  const timestamp = new Date().toLocaleTimeString();
  const displayMessage = options.showTimestamp
    ? `[${timestamp}] ${message}`
    : message;

  state.syncStatusElement.textContent = displayMessage;

  // Apply styling based on message type
  switch (type) {
    case 'error':
      state.syncStatusElement.style.background = '#FF5722';
      state.syncStatusElement.style.color = 'white';
      state.syncStatusElement.style.fontWeight = 'bold';

      // Show troubleshooting hint for errors
      if (options.showTroubleshooting !== false) {
        addTroubleshootingHint();
      }
      break;

    case 'warning':
      state.syncStatusElement.style.background = '#FF9800';
      state.syncStatusElement.style.color = 'white';
      state.syncStatusElement.style.fontWeight = 'normal';
      break;

    case 'success':
      state.syncStatusElement.style.background = '#4CAF50';
      state.syncStatusElement.style.color = 'white';
      state.syncStatusElement.style.fontWeight = 'normal';
      break;

    default:
      resetSyncStatusStyle();
  }

  // Auto-clear messages after specified duration
  const duration =
    options.duration ||
    (type === 'error' ? 10000 : type === 'warning' ? 7000 : 5000);

  if (type !== 'info' && options.autoClear !== false) {
    setTimeout(() => {
      if (state.syncStatusElement.textContent === displayMessage) {
        resetSyncStatusStyle();
        state.syncStatusElement.textContent = 'Ready for sync';
        removeTroubleshootingHint();
      }
    }, duration);
  }

  // Log to console for debugging
  if (import.meta.env.DEV) {
    const logMethod =
      type === 'error' ? 'error' : type === 'warning' ? 'warn' : 'log';
    console[logMethod](`[Sync Status] ${message}`);
  }

  // Check for automatic resync conditions
  if (state.autoResyncEnabled && state.playerAdapter) {
    checkForAutoResync();
  }

  // Update manual resync availability based on error state
  if (type === 'error' || type === 'warning') {
    state.manualResyncAvailable = true;
  }
}

/**
 * Reset sync status element styling
 */
function resetSyncStatusStyle() {
  if (!state.syncStatusElement) return;

  state.syncStatusElement.style.background = '#2a2a2a';
  state.syncStatusElement.style.color = '';
  state.syncStatusElement.style.fontSize = '14px';
}

/**
 * Add manual resync button to UI
 * @param {HTMLElement} container - Container element
 */
function addManualResyncButton(container) {
  // Check if button already exists
  if (document.getElementById('manual-resync-btn')) return;

  const button = document.createElement('button');
  button.id = 'manual-resync-btn';
  button.textContent = '🔄 Manual Resync';
  button.style.cssText = `
    margin-left: 10px;
    padding: 5px 10px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    display: none;
  `;

  button.addEventListener('click', async () => {
    button.disabled = true;
    button.textContent = '🔄 Resyncing...';

    const success = await triggerManualResync();

    button.disabled = false;
    button.textContent = success ? '✓ Resynced' : '🔄 Manual Resync';

    if (success) {
      setTimeout(() => {
        button.style.display = 'none';
      }, 2000);
    }
  });

  container.appendChild(button);

  // Show/hide button based on manual resync availability
  const checkResyncAvailability = () => {
    button.style.display = state.manualResyncAvailable
      ? 'inline-block'
      : 'none';
  };

  setInterval(checkResyncAvailability, 1000);
}

/**
 * Check for automatic resync conditions (large time differences)
 */
async function checkForAutoResync() {
  if (!state.autoResyncEnabled || !state.playerAdapter || !state.syncManager)
    return;

  try {
    const currentTime = state.playerAdapter.getCurrentTime();
    const syncStatus = state.syncManager.getSyncState();

    // Check if there's been recent sync activity
    const timeSinceLastSync = Date.now() - (syncStatus.lastSyncTime || 0);

    // Only check for auto resync if there's been no recent sync activity
    if (timeSinceLastSync > 15000) {
      // 15 seconds since last sync
      // Request current state from partner to compare
      await requestPartnerStateForComparison();
    }

    // Check if we have stored partner state to compare against
    if (state.lastPartnerState) {
      const timeDiff = Math.abs(
        currentTime - state.lastPartnerState.currentTime
      );
      const stateAge = Date.now() - state.lastPartnerState.timestamp;

      // Only compare if partner state is recent (within 10 seconds)
      if (stateAge < 10000 && timeDiff > 5) {
        if (import.meta.env.DEV) {
          console.log(
            `Large time difference detected: ${timeDiff}s, triggering auto resync`
          );
        }

        await triggerAutoResync(timeDiff, state.lastPartnerState);
      }
    }
  } catch (error) {
    console.warn('Error checking auto resync conditions:', error);
  }
}

/**
 * Request partner's current state for comparison
 */
async function requestPartnerStateForComparison() {
  if (!state.syncManager) return;

  try {
    // Send a state validation request to get partner's current state
    await state.syncManager.sendSyncEvent('state-validation', {
      currentTime: state.playerAdapter.getCurrentTime(),
      isPlaying: state.playerAdapter.getPlayerState() === 'playing',
      timestamp: Date.now(),
      requestType: 'auto-resync-check',
    });
  } catch (error) {
    console.warn('Failed to request partner state:', error);
  }
}

/**
 * Trigger automatic resync when large time differences are detected
 * @param {number} timeDiff - Time difference in seconds
 * @param {Object} partnerState - Partner's current state
 */
async function triggerAutoResync(timeDiff, partnerState) {
  if (!state.syncManager || !state.playerAdapter) return;

  try {
    updateSyncStatus(
      `Auto-resyncing (${Math.floor(timeDiff)}s difference)...`,
      'warning'
    );

    // Determine which state is more recent
    const currentTime = state.playerAdapter.getCurrentTime();
    const currentTimestamp = Date.now();

    // Use the most recent state (based on timestamp)
    const usePartnerState = partnerState.timestamp > currentTimestamp - 2000; // Within 2 seconds

    if (usePartnerState) {
      // Sync to partner's state
      if (partnerState.isPlaying) {
        await state.playerAdapter.play(partnerState.currentTime);
      } else {
        await state.playerAdapter.pause(partnerState.currentTime);
      }

      updateSyncStatus(
        `Auto-resynced to partner's position (${Math.floor(
          partnerState.currentTime
        )}s)`,
        'success'
      );
    } else {
      // Send our state to partner
      const currentState = {
        currentTime: currentTime,
        isPlaying: state.playerAdapter.getPlayerState() === 'playing',
        timestamp: currentTimestamp,
      };

      await state.syncManager.sendSyncEvent('state-correction', {
        ...currentState,
        reason: 'auto_resync_large_diff',
        timeDifference: timeDiff,
      });

      updateSyncStatus(
        `Auto-resync sent to partner (${Math.floor(timeDiff)}s difference)`,
        'success'
      );
    }

    // Clear the stored partner state
    state.lastPartnerState = null;

    // Notify user about the auto resync
    showAutoResyncNotification(timeDiff);
  } catch (error) {
    console.error('Auto resync failed:', error);
    updateSyncStatus('Auto resync failed - manual resync available', 'error');
    state.manualResyncAvailable = true;
  }
}

/**
 * Show notification about automatic resync
 * @param {number} timeDiff - Time difference that triggered resync
 */
function showAutoResyncNotification(timeDiff) {
  // Create a temporary notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 14px;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  `;
  notification.textContent = `🔄 Auto-resynced (${Math.floor(
    timeDiff
  )}s difference)`;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

/**
 * Handle incoming state validation responses for auto resync
 * @param {Object} partnerState - Partner's state data
 */
function handlePartnerStateResponse(partnerState) {
  // Store partner state for comparison
  state.lastPartnerState = {
    currentTime: partnerState.currentTime,
    isPlaying: partnerState.isPlaying,
    timestamp: partnerState.timestamp,
  };

  if (import.meta.env.DEV) {
    console.log('Received partner state for auto resync check:', partnerState);
  }
}

/**
 * Add troubleshooting hint to the UI
 */
function addTroubleshootingHint() {
  // Check if hint already exists
  if (document.getElementById('troubleshooting-hint')) return;

  const hint = document.createElement('div');
  hint.id = 'troubleshooting-hint';
  hint.style.cssText = `
    margin-top: 5px;
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
  `;
  hint.textContent = '💡 Click for troubleshooting steps';

  hint.addEventListener('click', showTroubleshootingDialog);

  if (state.syncStatusElement && state.syncStatusElement.parentNode) {
    state.syncStatusElement.parentNode.appendChild(hint);
  }
}

/**
 * Remove troubleshooting hint from the UI
 */
function removeTroubleshootingHint() {
  const hint = document.getElementById('troubleshooting-hint');
  if (hint) {
    hint.remove();
  }
}

/**
 * Show troubleshooting dialog with specific steps
 */
function showTroubleshootingDialog() {
  const errorDetails = getErrorDetails();
  const steps = errorDetails.troubleshootingSteps;

  if (steps.length === 0) {
    alert(
      'No specific troubleshooting steps available. Try refreshing the page.'
    );
    return;
  }

  let dialogContent = 'Troubleshooting Steps:\n\n';
  steps.forEach((step, index) => {
    dialogContent += `${index + 1}. ${step.step}\n   ${step.description}\n\n`;
  });

  dialogContent += 'Would you like to try automatic fixes?';

  if (confirm(dialogContent)) {
    // Execute the first available automatic fix
    const autoFixStep = steps.find((step) =>
      ['manual_resync', 'reload_player', 'reset_sync'].includes(step.action)
    );

    if (autoFixStep) {
      executeTroubleshootingAction(autoFixStep.action);
    }
  }
}

/**
 * Clean up sync components when leaving watch mode
 */
function cleanupSyncComponents() {
  // Clean up player adapter
  if (state.playerAdapterCleanup) {
    state.playerAdapterCleanup();
    state.playerAdapterCleanup = null;
  }

  if (state.playerAdapter) {
    cleanupYouTubePlayerAdapter(state.playerAdapter.containerId);
    state.playerAdapter = null;
  }

  // Clean up sync manager
  if (state.syncManager) {
    cleanupSyncManager(state.syncManager.roomId);
    state.syncManager = null;
  }

  // Clean up WebRTC sync
  cleanupWebRTCSync();
  state.transport = null;

  // Stop auto resync monitoring
  stopAutoResyncMonitoring();

  // Reset state
  state.processRemoteSync = null;
  state.lastError = null;
  state.manualResyncAvailable = false;
  state.syncStatusElement = null;
  state.lastPartnerState = null;
  state.autoResyncInterval = null;

  // Remove troubleshooting UI elements
  removeTroubleshootingHint();

  if (import.meta.env.DEV) {
    console.log('Sync components cleaned up');
  }
}
