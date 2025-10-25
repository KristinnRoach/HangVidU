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
} from './youtube-player.js';

import { streamUrlInput, syncStatus, sharedVideo } from './elements.js'; // TODO: refactor:
import { enterWatchMode, getPeerId, getRoomId } from './main.js';
import { hideElement, showElement } from './utils/ui-utils.js';

// ============================================================================
// WATCH-TOGETHER SYNC (Firebase-based)
// ============================================================================

// Keep local copy of active room ID to avoid stale/null imports from main.js
let currentRoomId = null;

let watchMode = false;
let lastWatched = 'none'; // 'yt' | 'url' | 'none'

// export let currentVideoElement = null;

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
      updatedBy: getPeerId(),
    });
  } catch (err) {
    console.error('Failed to update watch state:', err);
    // TODO: consider retry/backoff strategy
  }
}

// -----------------------------------------------------------------------------
// SYNC SETUP
// -----------------------------------------------------------------------------
export function setupWatchSync(roomId, role) {
  if (!roomId) return;

  currentRoomId = roomId;

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
  if (data.updatedBy === getPeerId()) return; // Ignore self-updates
  if (Date.now() - lastLocalAction < 500) return; // Ignore local race updates

  console.debug('[WatchSync] onValue triggered', {
    data,
    myPeer: getPeerId(),
    updatedBy: data?.updatedBy,
  });

  // -- Handle URL changes -----------------------------------------------------
  if (data.url && data.url !== streamUrlInput.value) {
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
  streamUrlInput.value = url;

  if (isYouTubeUrl(url)) {
    loadYouTubeVideoWithSync(url);
    lastWatched = 'yt';
  } else {
    destroyYouTubePlayer();
    showElement(sharedVideo);
    sharedVideo.src = url;
    lastWatched = 'url';
  }

  syncStatus.textContent = 'Video loaded';
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
    await updateWatchSyncState(roomId, {
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
    if (data.playing && sharedVideo.paused) {
      sharedVideo.play().catch((e) => console.warn('Play failed:', e));
    } else if (!data.playing && !sharedVideo.paused) {
      sharedVideo.pause();
    }
  }

  if (data.currentTime !== undefined) {
    const timeDiff = Math.abs(sharedVideo.currentTime - data.currentTime);
    if (timeDiff > 1) {
      sharedVideo.currentTime = data.currentTime;
      if (data.playing) {
        sharedVideo.play().catch((e) => console.warn('Play failed:', e));
      } else {
        sharedVideo.pause();
      }
    }
  }
}

// -----------------------------------------------------------------------------
// LOCAL EVENT LISTENERS
// -----------------------------------------------------------------------------
function setupLocalVideoListeners() {
  sharedVideo.addEventListener('play', async () => {
    if (!getYouTubePlayer() && currentRoomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({ playing: true, isYouTube: false });
    }
    lastWatched = 'url';
  });

  sharedVideo.addEventListener('pause', async () => {
    if (!getYouTubePlayer() && currentRoomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({ playing: false, isYouTube: false });
    }
    lastWatched = 'url';
  });

  sharedVideo.addEventListener('seeked', async () => {
    if (!getYouTubePlayer() && currentRoomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({
        currentTime: sharedVideo.currentTime,
        playing: !sharedVideo.paused,
        isYouTube: false,
      });
    }
    lastWatched = 'url';
  });
}

// -----------------------------------------------------------------------------
// LOCAL STREAM LOADING
// -----------------------------------------------------------------------------
function loadStream() {
  const url = streamUrlInput.value.trim();
  if (!url) {
    syncStatus.textContent = 'Please enter a video URL';
    return;
  }

  lastLocalAction = Date.now();

  if (isYouTubeUrl(url)) {
    loadYouTubeVideoWithSync(url);
    lastWatched = 'yt';
  } else {
    destroyYouTubePlayer();
    showElement(sharedVideo);
    sharedVideo.src = url;
    syncStatus.textContent = 'Video loaded';
    lastWatched = 'url';
  }

  if (currentRoomId) {
    const watchRef = ref(rtdb, `rooms/${currentRoomId}/watch`);
    set(watchRef, {
      url,
      playing: false,
      currentTime: 0,
      isYouTube: isYouTubeUrl(url),
      updatedBy: getPeerId(),
    });
  }
}

// -----------------------------------------------------------------------------
// VIDEO SELECTION
// -----------------------------------------------------------------------------
export function handleVideoSelection(video) {
  if (!video || !video.url) {
    console.warn(`Non-existing or invalid video.`);
    return;
  }

  streamUrlInput.value = video.url;
  loadStream(); // todo: await and return boolean success/failure
  // enterWatchMode(); // on success only - ensure idempotence
  syncStatus.textContent = `Loading "${video.title}"...`;
}

// TODO: Refactor between youtube-player.js, watch-sync.js, and main.js
// -----------------------------------------------------------------------------
// YOUTUBE VIDEO LOADING WITH SYNC
// -----------------------------------------------------------------------------

async function loadYouTubeVideoWithSync(url) {
  if (!currentRoomId) {
    import.meta.env.DEV &&
      console.debug(`No roomId: ${currentRoomId}, OK if not in call.`);
  }

  const videoId = extractYouTubeId(url);

  if (!videoId) {
    syncStatus.textContent = 'Invalid YouTube URL';
    return;
  }

  syncStatus.textContent = 'Loading YouTube video...';

  // Hide regular video element
  hideElement(sharedVideo);

  try {
    // Load YouTube player
    await loadYouTubeVideo({
      url: url,
      onReady: (event) => {
        setYouTubeReady(true);
        syncStatus.textContent = 'YouTube video ready';

        // Both participants can set initial state in Firebase
        if (currentRoomId) {
          const watchRef = ref(rtdb, `rooms/${currentRoomId}/watch`);
          set(watchRef, {
            url: url,
            playing: false,
            currentTime: 0,
            isYouTube: true,
            updatedBy: getPeerId(),
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

    syncStatus.textContent = 'YouTube video loaded';
  } catch (error) {
    console.error('Failed to load YouTube video:', error);
    syncStatus.textContent = 'Failed to load YouTube video';
  }
}
