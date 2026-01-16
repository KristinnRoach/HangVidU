import { set, update, remove } from 'firebase/database';
import {
  onDataChange,
  getWatchRef,
  getWatchRequestRef,
} from '../storage/fb-rtdb/rtdb.js';
import {
  isYouTubeUrl,
  getYouTubePlayer,
  destroyYouTubePlayer,
  playYouTubeVideo,
  pauseYouTubeVideo,
  seekYouTubeVideo,
  getYouTubeCurrentTime,
  getYouTubePlayerState,
  YT_STATE,
  isYouTubeReady,
  extractYouTubeId,
  loadYouTubeVideo,
  setYouTubeReady,
} from '../media/youtube/youtube-player.js';

import { sharedVideoEl, sharedBoxEl } from '../elements.js'; // TODO: refactor:
import { hideElement, showElement } from '../utils/ui/ui-utils.js';
import { enterWatchMode } from '../components/ui/watch-mode.js';

// ============================================================================
// WATCH-TOGETHER SYNC (Firebase-based)
// ============================================================================

// TODO: if loaded video before making a call or before call is joined, still store a ref to it so if partner joines later can sync automatically

// Keep local copy of active room ID to avoid stale/null imports from main.js
let currentRoomId = null;
let currentUserId = null;

let watchMode = false;
let lastWatched = 'none'; // 'yt' | 'url' | 'file' | 'none'

let currentVideoUrl = null;

// File watch request state
let currentFileRequest = null; // Stores current file being requested/watched
let requestTimeout = null; // Timeout for auto-cancel

export const isWatchModeActive = () => watchMode;
export const setWatchMode = (active) => (watchMode = active);

export const getLastWatched = () => lastWatched;
export const setLastWatched = (mode) => {
  if (['yt', 'url', 'file', 'none'].includes(mode)) {
    lastWatched = mode;
  } else {
    console.warn('Invalid lastWatched platform:', mode);
  }
};

// -----------------------------------------------------------------------------
// LOCAL STATE
// -----------------------------------------------------------------------------
let justSeeked = false;
let seekDebounceTimeout = null;
let lastLocalAction = 0; // Prevent feedback loops in bidirectional sync
let wasPlayingBeforeSeek = false; // Track play state before seek for regular videos

// -----------------------------------------------------------------------------
// FIREBASE SYNC HELPERS
// -----------------------------------------------------------------------------
async function updateWatchSyncState(updates) {
  if (!currentRoomId) return;

  console.debug('Updating watch sync state, roomId:', currentRoomId);

  const watchRef = getWatchRef(currentRoomId);
  try {
    await update(watchRef, {
      ...updates,
      updatedBy: currentUserId,
    });
  } catch (err) {
    console.error('Failed to update watch state:', err);
    // TODO: consider retry/backoff strategy
  }
}

// -----------------------------------------------------------------------------
// SYNC SETUP
// -----------------------------------------------------------------------------
export function setupWatchSync(roomId, role, userId) {
  if (!roomId) return;

  currentRoomId = roomId;
  currentUserId = userId;

  const watchRef = getWatchRef(roomId);
  const watchRequestRef = getWatchRequestRef(roomId);

  onDataChange(watchRef, handleWatchUpdate, roomId);
  onDataChange(watchRequestRef, handleWatchRequestUpdate, roomId);

  setupLocalVideoListeners();

  if (import.meta.env.DEV) {
    console.log('Watch sync setup complete for role:', role);
  }
}

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------
function isBlobUrl(url) {
  return typeof url === 'string' && url.startsWith('blob:');
}

// -----------------------------------------------------------------------------
// FILE WATCH REQUEST HANDLING
// -----------------------------------------------------------------------------

/**
 * Create a watch request to notify the other user to join watching
 */
export async function createWatchRequest(fileName, file) {
  if (!currentRoomId || !currentUserId) return false;

  currentFileRequest = { fileName, file };

  const watchRequestRef = getWatchRequestRef(currentRoomId);
  try {
    await set(watchRequestRef, {
      fileName,
      requestedBy: currentUserId,
      timestamp: Date.now(),
    });

    // Auto-cancel after 5 minutes
    if (requestTimeout) clearTimeout(requestTimeout);
    requestTimeout = setTimeout(() => {
      cancelWatchRequest();
    }, 5 * 60 * 1000); // 5 minutes

    return true;
  } catch (err) {
    console.error('Failed to create watch request:', err);
    return false;
  }
}

/**
 * Accept a watch request and load the video
 */
export async function acceptWatchRequest(file) {
  if (!currentRoomId) return false;

  // Clear the request from Firebase
  const watchRequestRef = getWatchRequestRef(currentRoomId);
  try {
    await remove(watchRequestRef);
  } catch (err) {
    console.warn('Failed to remove watch request:', err);
  }

  // Clear local request state & timeout to prevent lingering timers
  if (requestTimeout) {
    clearTimeout(requestTimeout);
    requestTimeout = null;
  }
  currentFileRequest = null;

  // Load the video locally
  return await handleVideoSelection(file);
}

/**
 * Cancel the current watch request
 */
export async function cancelWatchRequest() {
  if (!currentRoomId) return;

  currentFileRequest = null;
  if (requestTimeout) {
    clearTimeout(requestTimeout);
    requestTimeout = null;
  }

  const watchRequestRef = getWatchRequestRef(currentRoomId);
  try {
    await remove(watchRequestRef);
  } catch (err) {
    console.warn('Failed to cancel watch request:', err);
  }
}

/**
 * Handle incoming watch request from remote user
 */
function handleWatchRequestUpdate(snapshot) {
  const data = snapshot.val();

  // Request was cancelled or doesn't exist
  if (!data) {
    currentFileRequest = null;
    if (requestTimeout) {
      clearTimeout(requestTimeout);
      requestTimeout = null;
    }
    return;
  }

  // Ignore our own requests
  if (data.requestedBy === currentUserId) return;

  // Notify the UI layer about the incoming request
  // This will be handled by messages-ui to show a prompt
  if (window.onFileWatchRequestReceived) {
    window.onFileWatchRequestReceived(data.fileName);
  }
}

// -----------------------------------------------------------------------------
// REMOTE UPDATE HANDLER
// -----------------------------------------------------------------------------
function handleWatchUpdate(snapshot) {
  const data = snapshot.val();
  if (!data) return;
  if (data.updatedBy === currentUserId) return; // Ignore self-updates
  if (Date.now() - lastLocalAction < 500) return; // Ignore local race updates

  // -- Handle URL changes (skip blob URLs - they're local-only) -------------
  if (data.url && data.url !== currentVideoUrl && !isBlobUrl(data.url)) {
    handleRemoteUrlChange(data.url);
  }

  // -- Handle playback sync (works for ALL video sources!) -------------------
  if (data.isYouTube) {
    handleYouTubeSync(data);
  } else {
    handleRegularVideoSync(data);
  }
}

// -----------------------------------------------------------------------------
// REMOTE: URL CHANGE
// -----------------------------------------------------------------------------
function handleRemoteUrlChange(url) {
  currentVideoUrl = url;

  if (isYouTubeUrl(url)) {
    hideElement(sharedBoxEl);
    loadYouTubeVideoWithSync(url);
    lastWatched = 'yt';
  } else {
    destroyYouTubePlayer();
    showElement(sharedBoxEl);
    sharedVideoEl.src = url;
    lastWatched = 'url';
  }
}

// -----------------------------------------------------------------------------
// REMOTE: YOUTUBE SYNC
// -----------------------------------------------------------------------------
function handleYouTubeSync(data) {
  const ytPlayer = getYouTubePlayer();
  if (!ytPlayer || !isYouTubeReady()) return;

  syncYouTubePlaybackState(data);
  syncYouTubeCurrentTime(data);
}

function syncYouTubePlaybackState(data) {
  const currentState = getYouTubePlayerState();
  const isPlaying = currentState === YT_STATE.PLAYING;

  // Handle buffering/unstarted states
  if ([YT_STATE.BUFFERING, YT_STATE.UNSTARTED].includes(currentState)) {
    debounceSeekSync();
    return;
  }

  if (justSeeked) return; // Skip transient state after seeking

  // Sync play/pause
  if (data.playing && !isPlaying) {
    playYouTubeVideo();
    lastWatched = 'yt';
  } else if (!data.playing && isPlaying) {
    pauseYouTubeVideo();
    lastWatched = 'yt';
  }
}

function syncYouTubeCurrentTime(data) {
  if (data.currentTime === undefined) return;

  const currentTime = getYouTubeCurrentTime();
  const timeDiff = Math.abs(currentTime - data.currentTime);

  if (timeDiff > 0.3 && !justSeeked) {
    seekYouTubeVideo(data.currentTime);

    // Ensure playback state consistency after seek
    setTimeout(() => {
      if (data.playing) playYouTubeVideo();
      else pauseYouTubeVideo();
      lastWatched = 'yt';
    }, 500);
  }
}

function debounceSeekSync() {
  justSeeked = true;
  clearTimeout(seekDebounceTimeout);

  seekDebounceTimeout = setTimeout(async () => {
    justSeeked = false;
    const finalPlaying = getYouTubePlayerState() === YT_STATE.PLAYING;
    await updateWatchSyncState({
      playing: finalPlaying,
      currentTime: getYouTubeCurrentTime(),
    });
  }, 700);
}

// -----------------------------------------------------------------------------
// REMOTE: REGULAR VIDEO SYNC
// -----------------------------------------------------------------------------
function handleRegularVideoSync(data) {
  // Suppress local event handlers while applying remote state
  lastLocalAction = Date.now();

  if (data.playing !== undefined) {
    if (data.playing && sharedVideoEl.paused) {
      sharedVideoEl.play().catch((e) => console.warn('Play failed:', e));
    } else if (!data.playing && !sharedVideoEl.paused) {
      sharedVideoEl.pause();
    }
  }

  if (data.currentTime !== undefined) {
    const timeDiff = Math.abs(sharedVideoEl.currentTime - data.currentTime);
    if (timeDiff > 1) {
      sharedVideoEl.currentTime = data.currentTime;
      if (data.playing) {
        sharedVideoEl.play().catch((e) => console.warn('Play failed:', e));
      } else {
        sharedVideoEl.pause();
      }
    }
  }
}

// -----------------------------------------------------------------------------
// LOCAL EVENT LISTENERS
// -----------------------------------------------------------------------------
function setupLocalVideoListeners() {
  // Helper to preserve 'file' mode when handling regular video events
  const preserveFileMode = () => {
    if (lastWatched !== 'file') {
      lastWatched = 'url';
    }
  };

  sharedVideoEl.addEventListener('play', async () => {
    if (!getYouTubePlayer() && currentRoomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({
        playing: true,
        currentTime: sharedVideoEl.currentTime,
        isYouTube: false,
      });
    }
    preserveFileMode();
  });

  sharedVideoEl.addEventListener('pause', async () => {
    // Skip seek-triggered pauses - the seeked event will send complete state
    if (sharedVideoEl.seeking) return;

    if (!getYouTubePlayer() && currentRoomId) {
      lastLocalAction = Date.now();
      // DEBUG
      console.log('[SYNC DEBUG] Local pause event:', {
        currentTime: sharedVideoEl.currentTime,
      });
      await updateWatchSyncState({
        playing: false,
        currentTime: sharedVideoEl.currentTime,
        isYouTube: false,
      });
    }
    preserveFileMode();
  });

  // Track play state continuously so we know if video was playing before seek
  sharedVideoEl.addEventListener('playing', () => {
    wasPlayingBeforeSeek = true;
  });

  // Only reset wasPlayingBeforeSeek on actual user pause (not seek-triggered)
  sharedVideoEl.addEventListener(
    'pause',
    () => {
      if (!sharedVideoEl.seeking) {
        wasPlayingBeforeSeek = false;
      }
    },
    true
  ); // Use capture to run before our other pause handler

  sharedVideoEl.addEventListener('seeked', async () => {
    if (!getYouTubePlayer() && currentRoomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({
        currentTime: sharedVideoEl.currentTime,
        playing: wasPlayingBeforeSeek,
        isYouTube: false,
      });
    }
    preserveFileMode();
  });
}

// -----------------------------------------------------------------------------
// LOCAL STREAM LOADING
// -----------------------------------------------------------------------------
async function loadStream(url) {
  if (!url) return false;

  lastLocalAction = Date.now();

  const isBlob = isBlobUrl(url);

  if (isYouTubeUrl(url)) {
    hideElement(sharedBoxEl);
    const success = await loadYouTubeVideoWithSync(url);
    if (!success) return false;

    lastWatched = 'yt';
  } else {
    destroyYouTubePlayer();

    showElement(sharedBoxEl);
    sharedVideoEl.src = url;

    lastWatched = isBlob ? 'file' : 'url';
  }

  // Sync to Firebase
  if (currentRoomId) {
    const watchRef = getWatchRef(currentRoomId);

    if (isBlob) {
      // For blob URLs, only sync playback state (not the URL)
      // Use set() to ensure the isYouTube field is initialized
      await set(watchRef, {
        playing: false,
        currentTime: 0,
        isYouTube: false,
        updatedBy: currentUserId,
      });
    } else {
      // For regular URLs, sync everything including the URL
      set(watchRef, {
        url,
        playing: false,
        currentTime: 0,
        isYouTube: isYouTubeUrl(url),
        updatedBy: currentUserId,
      });
    }
  }

  return true;
}

// -----------------------------------------------------------------------------
// VIDEO SELECTION
// -----------------------------------------------------------------------------
export async function handleVideoSelection(source) {
  let url;

  // Accept File object or URL string
  if (source instanceof File) {
    if (!source.type.startsWith('video/')) {
      console.warn('Invalid file type:', source.type);
      return false;
    }
    url = URL.createObjectURL(source);
  } else if (typeof source === 'string') {
    url = source;
  } else if (source?.url) {
    // Legacy: video object with url property
    url = source.url;
  } else {
    console.warn('Invalid video source:', source);
    return false;
  }

  currentVideoUrl = url;
  const success = await loadStream(url);

  if (success) {
    enterWatchMode();
  } else if (source instanceof File) {
    URL.revokeObjectURL(url);
  }

  // Revoke object URL if loading failed for a File source to avoid leaks
  if (!success && source instanceof File) {
    try {
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn('Failed to revoke object URL:', e);
    }
  }

  return success;
}

// TODO: Refactor between youtube-player.js, watch-sync.js, and main.js
// -----------------------------------------------------------------------------
// YOUTUBE VIDEO LOADING WITH SYNC
// -----------------------------------------------------------------------------

async function loadYouTubeVideoWithSync(url) {
  if (!currentRoomId) {
    import.meta.env.DEV &&
      console.debug(`No roomId: ${currentRoomId}, expected IF not in call.`);
  }

  const videoId = extractYouTubeId(url);

  if (!videoId) {
    console.error('Invalid YouTube URL:', url);
    return false;
  }

  try {
    // Load YouTube player
    await loadYouTubeVideo({
      url: url,
      onReady: (event) => {
        setYouTubeReady(true);

        // Both participants can set initial state in Firebase
        if (currentRoomId) {
          const watchRef = getWatchRef(currentRoomId);
          set(watchRef, {
            url: url,
            playing: false,
            currentTime: 0,
            isYouTube: true,
            updatedBy: currentUserId,
          });
        }
      },
      onStateChange: async (event) => {
        const player = getYouTubePlayer();
        if (!player) return;

        const playing = event.data === YT_STATE.PLAYING;
        const paused = event.data === YT_STATE.PAUSED;
        const buffering = event.data === YT_STATE.BUFFERING;

        // When buffering (seek started), mark justSeeked true and store intended state
        if (buffering) {
          justSeeked = true;
          if (seekDebounceTimeout) clearTimeout(seekDebounceTimeout);
          seekDebounceTimeout = setTimeout(async () => {
            justSeeked = false;
            // After debounce timeout, send stable state
            const actualState = getYouTubePlayerState();
            const stablePlaying = actualState === YT_STATE.PLAYING;

            await updateWatchSyncState({
              playing: stablePlaying,
              currentTime: getYouTubeCurrentTime(),
            });
          }, 700);
          return; // Don't send state update immediately on BUFFERING
        }

        // If event is PAUSED during debounce window, ignore to prevent toggling
        if (paused && justSeeked) {
          return; // Ignore this transient pause event right after seek
        }

        // If outside debounce window, on PAUSED or PLAYING send updates normally
        if (!justSeeked && (playing || paused)) {
          await updateWatchSyncState({
            playing: playing,
            currentTime: getYouTubeCurrentTime(),
          });
        }
      },
    });

    return true;
  } catch (error) {
    console.error('Failed to load YouTube video:', error);
    return false;
  }
}
