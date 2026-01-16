import { set, update } from 'firebase/database';
import { onDataChange, rtdb, getWatchRef } from '../storage/fb-rtdb/rtdb.js';
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

  onDataChange(watchRef, handleWatchUpdate, roomId);

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
  sharedVideoEl.addEventListener('play', async () => {
    if (!getYouTubePlayer() && currentRoomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({ playing: true, isYouTube: false });
    }
    // Preserve 'file' mode if already set, otherwise set to 'url'
    if (lastWatched !== 'file') {
      lastWatched = 'url';
    }
  });

  sharedVideoEl.addEventListener('pause', async () => {
    if (!getYouTubePlayer() && currentRoomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({ playing: false, isYouTube: false });
    }
    // Preserve 'file' mode if already set, otherwise set to 'url'
    if (lastWatched !== 'file') {
      lastWatched = 'url';
    }
  });

  sharedVideoEl.addEventListener('seeked', async () => {
    if (!getYouTubePlayer() && currentRoomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({
        currentTime: sharedVideoEl.currentTime,
        playing: !sharedVideoEl.paused,
        isYouTube: false,
      });
    }
    // Preserve 'file' mode if already set, otherwise set to 'url'
    if (lastWatched !== 'file') {
      lastWatched = 'url';
    }
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

  // Only sync real URLs to Firebase (not blob URLs)
  if (currentRoomId && !isBlob) {
    const watchRef = getWatchRef(currentRoomId);
    set(watchRef, {
      url,
      playing: false,
      currentTime: 0,
      isYouTube: isYouTubeUrl(url),
      updatedBy: currentUserId,
    });
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
