// watch2gether/watch-sync.js
import { db } from '../../storage/firebase.js';
import { ref, set, update, onValue, child } from 'firebase/database';
import { getRoomId } from '../connect/connection.js';

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
  isSyncing: false,
  streamUrl: '',
};

// ===== PUBLIC API =====

export function getWatchMode() {
  return state.watchMode;
}

export function getIsSyncing() {
  return state.isSyncing;
}

export function getStreamUrl() {
  return state.streamUrl;
}

export function setStreamUrl(url) {
  state.streamUrl = url;
}

// ===== COMPATIBILITY STUBS =====
// These functions exist in the WebRTC version but not in legacy
// Adding stubs to maintain API compatibility

export function getSyncStatusInfo() {
  return {
    isConnected: true, // Firebase is always "connected" if we have internet
    isSyncing: state.isSyncing,
    lastError: null,
    autoResyncEnabled: false,
    manualResyncAvailable: false,
    playerReady: true,
    hasActiveVideo: !!state.streamUrl,
    syncHealth: { score: 100, status: 'excellent', issues: [] },
  };
}

export function triggerManualResync() {
  // Legacy system doesn't need manual resync
  return Promise.resolve(false);
}

export function setAutoResyncEnabled(enabled) {
  // Legacy system doesn't support auto resync
  if (import.meta.env.DEV) {
    console.log('Auto resync not supported in legacy mode');
  }
}

export function getErrorDetails() {
  return {
    lastError: null,
    timestamp: null,
    syncHealth: { score: 100, status: 'excellent', issues: [] },
    componentStatus: {
      syncManager: false,
      playerAdapter: false,
      transport: false,
      webrtcConnected: false,
    },
    troubleshootingSteps: [],
  };
}

export function executeTroubleshootingAction(action) {
  // Legacy system doesn't support troubleshooting actions
  return Promise.resolve(false);
}

// ===== SEARCH UI FUNCTIONALITY =====

function initializeSearchUI() {
  initSearchUI(handleVideoSelection);
  updateSearchAvailability();

  if (import.meta.env.DEV) {
    console.log('YouTube search UI initialized for legacy watch mode');
  }
}

async function handleVideoSelection(video) {
  // Get elements
  const sharedVideo = document.getElementById('sharedVideo');
  const streamUrlInput = document.getElementById('streamUrl');
  const syncStatus = document.getElementById('syncStatus');

  // Update URL input with selected video
  if (streamUrlInput) {
    streamUrlInput.value = video.url;
  }

  // Update status
  if (syncStatus) {
    syncStatus.textContent = `Loading "${video.title}"...`;
  }

  try {
    // Check if we have an active room for syncing
    const roomId = getRoomId();

    if (roomId) {
      // We're in a call - use the sync-enabled loadStream function
      await loadStream({
        roomId,
        url: video.url,
        sharedVideo,
        syncStatus: syncStatus || {
          textContent: `Loading "${video.title}"...`,
        },
      });
    } else {
      // No active call - just play the video locally
      await playVideoLocally(video.url, sharedVideo, syncStatus);
    }

    if (import.meta.env.DEV) {
      console.log('Video loaded from search selection:', video.title);
    }
  } catch (error) {
    console.error('Failed to load selected video:', error);
    if (syncStatus) {
      syncStatus.textContent = 'Failed to load video. Please try again.';
    }
  }
}

async function playVideoLocally(url, sharedVideo, syncStatus) {
  if (isYouTubeUrl(url)) {
    const vid = getYouTubeId(url);
    showYouTubePlayer(vid, sharedVideo, () => {
      // No sync needed when playing locally
    });
    if (syncStatus) {
      syncStatus.textContent = 'YouTube video loaded (local playback)';
    }
  } else {
    hideYouTubePlayer(sharedVideo);
    sharedVideo.src = url;
    sharedVideo.style.display = 'block';
    if (syncStatus) {
      syncStatus.textContent = 'Video loaded (local playback)';
    }
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

  if (state.watchMode) {
    videoContainer.style.display = 'none';
    watchContainer.style.display = 'block';
    toggleModeBtn.textContent = 'Switch to Video Chat';
    syncStatus.textContent =
      'Search for videos or paste the same stream URL as your partner';

    // Initialize search UI
    initializeSearchUI();
  } else {
    videoContainer.style.display = 'flex';
    watchContainer.style.display = 'none';
    toggleModeBtn.textContent = 'Switch to Watch Mode';
    sharedVideo.src = '';
    streamUrlInput.value = '';

    // Clean up search UI
    cleanupSearchUI();
  }

  return state.watchMode;
}

export function loadStream({ roomId, url, sharedVideo, syncStatus }) {
  if (!url) {
    syncStatus.textContent = 'Please enter a stream URL';
    return;
  }

  if (isYouTubeUrl(url)) {
    const vid = getYouTubeId(url);
    showYouTubePlayer(vid, sharedVideo, (event) =>
      onYouTubeStateChange(event, roomId)
    );
    syncStatus.textContent = 'YouTube video sent to partner...';
  } else {
    hideYouTubePlayer(sharedVideo);
    sharedVideo.src = url;
    syncStatus.textContent = 'Video sent to partner...';
  }

  if (roomId) {
    const streamRef = ref(db, `rooms/${roomId}/stream`);
    set(streamRef, { url });
  }
}

export function setupWatchSync({
  roomId,
  sharedVideo,
  streamUrlInput,
  syncStatus,
}) {
  if (!roomId) return;

  const roomRef = ref(db, `rooms/${roomId}`);

  // Listen for stream URL changes
  const streamUrlRef = ref(db, `rooms/${roomId}/stream/url`);
  onValue(streamUrlRef, (snapshot) => {
    const url = snapshot.val();
    if (url && url !== streamUrlInput.value) {
      streamUrlInput.value = url;
      syncStatus.innerHTML = `Partner shared a video: <button id="accept-shared-video" style="margin-left: 10px; padding: 5px 15px;">✓ Accept & Load</button>`;
      const btn = document.getElementById('accept-shared-video');
      btn.addEventListener('click', () =>
        acceptSharedVideo({ url, sharedVideo, syncStatus })
      );
      syncStatus.style.background = '#2196f3';
    }
  });

  // Listen for play/pause
  const playingRef = ref(db, `rooms/${roomId}/stream/playing`);
  onValue(playingRef, async (snapshot) => {
    if (state.isSyncing) return;
    const playing = snapshot.val();
    const url = streamUrlInput.value;
    const ytPlayer = getYTPlayer();
    const ytReady = getYTReady();

    if (isYouTubeUrl(url) && ytPlayer && ytReady) {
      if (
        playing === true &&
        ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING
      ) {
        ytPlayer.playVideo();
        syncStatus.textContent = 'Playing in sync';
      } else if (
        playing === false &&
        ytPlayer.getPlayerState() === YT.PlayerState.PLAYING
      ) {
        ytPlayer.pauseVideo();
        syncStatus.textContent = 'Partner pressed pause';
      }
    } else {
      if (playing === true && sharedVideo.paused) {
        try {
          await sharedVideo.play();
          syncStatus.textContent = 'Playing in sync';
        } catch (error) {
          syncStatus.textContent = '▶️ Tap the video to start playing';
          syncStatus.style.background = '#FF5722';
          syncStatus.style.fontSize = '16px';
          const clearWarning = () => {
            syncStatus.style.background = '#2a2a2a';
            syncStatus.style.fontSize = '14px';
            sharedVideo.removeEventListener('play', clearWarning);
          };
          sharedVideo.addEventListener('play', clearWarning);
        }
      } else if (playing === false && !sharedVideo.paused) {
        sharedVideo.pause();
        syncStatus.textContent = 'Partner pressed pause';
      }
    }
  });

  // Listen for seek
  const timeRef = ref(db, `rooms/${roomId}/stream/time`);
  onValue(timeRef, (snapshot) => {
    if (state.isSyncing) return;
    const time = snapshot.val();
    const url = streamUrlInput.value;
    const ytPlayer = getYTPlayer();
    const ytReady = getYTReady();

    if (isYouTubeUrl(url) && ytPlayer && ytReady) {
      if (time !== null && Math.abs(ytPlayer.getCurrentTime() - time) > 2) {
        ytPlayer.seekTo(time, true);
        syncStatus.textContent = `Syncing to ${Math.floor(time)}s`;
      }
    } else {
      if (time !== null && Math.abs(sharedVideo.currentTime - time) > 2) {
        sharedVideo.currentTime = time;
        syncStatus.textContent = `Syncing to ${Math.floor(time)}s`;
      }
    }
  });

  // Send local events to Firebase
  setupLocalVideoListeners({ roomId, sharedVideo });
}

// ===== PRIVATE HELPERS =====

function onYouTubeStateChange(event, roomId) {
  const ytPlayer = getYTPlayer();
  const ytReady = getYTReady();
  if (!roomId || !ytReady || !ytPlayer) return;

  const streamRef = ref(db, `rooms/${roomId}/stream`);

  if (event.data === YT.PlayerState.PLAYING) {
    update(streamRef, {
      playing: true,
      time: ytPlayer.getCurrentTime(),
    });
  } else if (event.data === YT.PlayerState.PAUSED) {
    update(streamRef, {
      playing: false,
      time: ytPlayer.getCurrentTime(),
    });
  }
}

function acceptSharedVideo({ url, sharedVideo, syncStatus }) {
  if (isYouTubeUrl(url)) {
    const vid = getYouTubeId(url);
    showYouTubePlayer(vid, sharedVideo, onYouTubeStateChange);
    syncStatus.textContent = 'Loading YouTube video...';
  } else {
    hideYouTubePlayer(sharedVideo);
    sharedVideo.src = url;
    syncStatus.textContent = 'Loading shared video...';
  }
  syncStatus.style.background = '#2a2a2a';
}

function setupLocalVideoListeners({ roomId, sharedVideo }) {
  sharedVideo.addEventListener('play', () => {
    if (roomId && !state.isSyncing) {
      state.isSyncing = true;
      const streamRef = ref(db, `rooms/${roomId}/stream`);
      update(streamRef, {
        playing: true,
        time: sharedVideo.currentTime,
      });
      setTimeout(() => (state.isSyncing = false), 1000);
    }
  });

  sharedVideo.addEventListener('pause', () => {
    if (roomId && !state.isSyncing) {
      state.isSyncing = true;
      const streamRef = ref(db, `rooms/${roomId}/stream`);
      update(streamRef, {
        playing: false,
        time: sharedVideo.currentTime,
      });
      setTimeout(() => (state.isSyncing = false), 1000);
    }
  });

  sharedVideo.addEventListener('seeked', () => {
    if (roomId && !state.isSyncing) {
      state.isSyncing = true;
      const streamRef = ref(db, `rooms/${roomId}/stream`);
      update(streamRef, {
        time: sharedVideo.currentTime,
      });
      setTimeout(() => (state.isSyncing = false), 1000);
    }
  });

  sharedVideo.addEventListener('loadeddata', () => {
    // Could pass syncStatus here if needed
  });

  sharedVideo.addEventListener('waiting', () => {
    // Could pass syncStatus here if needed
  });

  sharedVideo.addEventListener('playing', () => {
    // Could pass syncStatus here if needed
  });
}
