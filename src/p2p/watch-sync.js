import { ref, set, onValue, update, get } from 'firebase/database';
import { rtdb, trackFirebaseListener } from './firebase.js';
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
} from '../youtube-player.js';

import { sharedVideoEl, sharedBoxEl } from '../elements.js'; // TODO: refactor:
import { hideElement, showElement } from '../utils/ui-utils.js';
import { enterWatchMode } from '../main.js';

// ============================================================================
// WATCH-TOGETHER SYNC (Firebase-based)
// ============================================================================

// TODO: if loaded video before making a call or before call is joined, still store a ref to it so if partner joines later can sync automatically

// Keep local copy of active room ID to avoid stale/null imports from main.js
let currentRoomId = null;
let currentPeerId = null;

let watchMode = false;
let lastWatched = 'none'; // 'yt' | 'url' | 'none'

let currentVideoUrl = null;

export const isWatchModeActive = () => watchMode;
export const setWatchMode = (active) => (watchMode = active);

export const getLastWatched = () => lastWatched;
export const setLastWatched = (mode) => {
  if (['yt', 'url', 'none'].includes(mode)) {
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

  const watchRef = ref(rtdb, `rooms/${currentRoomId}/watch`);
  try {
    await update(watchRef, {
      ...updates,
      updatedBy: currentPeerId,
    });
  } catch (err) {
    console.error('Failed to update watch state:', err);
    // TODO: consider retry/backoff strategy
  }
}

// -----------------------------------------------------------------------------
// SYNC SETUP
// -----------------------------------------------------------------------------
export function setupWatchSync(roomId, role, peerId) {
  if (!roomId) return;

  currentRoomId = roomId;
  currentPeerId = peerId;

  const watchRef = ref(rtdb, `rooms/${roomId}/watch`);

  onValue(watchRef, handleWatchUpdate);
  trackFirebaseListener(watchRef, 'value', handleWatchUpdate);

  setupLocalVideoListeners();

  if (import.meta.env.DEV) {
    console.log('Watch sync setup complete for role:', role);
  }
}

// -----------------------------------------------------------------------------
// REMOTE UPDATE HANDLER
// -----------------------------------------------------------------------------
function handleWatchUpdate(snapshot) {
  const data = snapshot.val();
  if (!data) return;
  if (data.updatedBy === currentPeerId) return; // Ignore self-updates
  if (Date.now() - lastLocalAction < 500) return; // Ignore local race updates

  // -- Handle URL changes -----------------------------------------------------
  if (data.url && data.url !== currentVideoUrl) {
    handleRemoteUrlChange(data.url);
  }

  // -- Handle playback sync ---------------------------------------------------
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
    lastWatched = 'url';
  });

  sharedVideoEl.addEventListener('pause', async () => {
    if (!getYouTubePlayer() && currentRoomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({ playing: false, isYouTube: false });
    }
    lastWatched = 'url';
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
    lastWatched = 'url';
  });
}

// -----------------------------------------------------------------------------
// LOCAL STREAM LOADING
// -----------------------------------------------------------------------------
async function loadStream(url) {
  if (!url) return false;

  lastLocalAction = Date.now();

  if (isYouTubeUrl(url)) {
    hideElement(sharedBoxEl);
    const success = await loadYouTubeVideoWithSync(url);
    if (!success) return false;

    lastWatched = 'yt';
  } else {
    destroyYouTubePlayer();

    showElement(sharedBoxEl);
    sharedVideoEl.src = url;

    lastWatched = 'url';
  }

  if (currentRoomId) {
    const watchRef = ref(rtdb, `rooms/${currentRoomId}/watch`);
    set(watchRef, {
      url,
      playing: false,
      currentTime: 0,
      isYouTube: isYouTubeUrl(url),
      updatedBy: currentPeerId,
    });
  }

  return true;
}

// -----------------------------------------------------------------------------
// VIDEO SELECTION
// -----------------------------------------------------------------------------
export async function handleVideoSelection(video) {
  if (!video || !video.url) {
    console.warn(`Non-existing or invalid video.`);
    return false;
  }

  currentVideoUrl = video.url;

  const success = await loadStream(video.url);

  enterWatchMode();

  return success;
}

// TODO: Refactor between youtube-player.js, watch-sync.js, and main.js
// -----------------------------------------------------------------------------
// YOUTUBE VIDEO LOADING WITH SYNC
// -----------------------------------------------------------------------------

async function loadYouTubeVideoWithSync(url, currentRoomId, currentPeerId) {
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
          const watchRef = ref(rtdb, `rooms/${currentRoomId}/watch`);
          set(watchRef, {
            url: url,
            playing: false,
            currentTime: 0,
            isYouTube: true,
            updatedBy: currentPeerId,
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
