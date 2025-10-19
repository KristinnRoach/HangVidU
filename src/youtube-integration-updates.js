
// ============================================================================
// YOUTUBE INTEGRATION - UPDATED SECTIONS FOR MAIN.JS
// ============================================================================

// ========================================
// 1. ADD TO IMPORTS (at the top)
// ========================================

import {
  isYouTubeUrl,
  extractYouTubeId,
  loadYouTubeVideo,
  getYouTubePlayer,
  destroyYouTubePlayer,
  playYouTubeVideo,
  pauseYouTubeVideo,
  seekYouTubeVideo,
  getYouTubeCurrentTime,
  getYouTubePlayerState,
  YT_STATE,
} from './youtube-player.js';


// ========================================
// 2. REPLACE THE YOUTUBE PLAYER INTEGRATION SECTION
// ========================================

// ============================================================================
// YOUTUBE PLAYER INTEGRATION
// ============================================================================

async function loadYouTubeVideoWithSync(url) {
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    syncStatus.textContent = 'Invalid YouTube URL';
    return;
  }

  syncStatus.textContent = 'Loading YouTube video...';

  // Hide regular video element
  sharedVideo.style.display = 'none';

  // Get or create YouTube container
  let ytContainer = document.getElementById('ytPlayerContainer');
  if (!ytContainer) {
    ytContainer = document.createElement('div');
    ytContainer.id = 'ytPlayerContainer';
    ytContainer.style.width = '100%';
    ytContainer.style.height = '100%';
    sharedVideo.parentElement.appendChild(ytContainer);
  }
  ytContainer.style.display = 'block';

  try {
    // Load YouTube player
    await loadYouTubeVideo({
      url: url,
      containerId: 'ytPlayerContainer',
      onReady: (event) => {
        ytReady = true;
        syncStatus.textContent = 'YouTube video ready';

        // If initiator, set initial state in Firebase
        if (role === 'initiator' && roomId) {
          const watchRef = ref(db, `rooms/${roomId}/watch`);
          set(watchRef, {
            url: url,
            playing: false,
            currentTime: 0,
            isYouTube: true,
          });
        }
      },
      onStateChange: (event) => {
        // Only initiator sends state changes
        if (role === 'initiator' && roomId) {
          const watchRef = ref(db, `rooms/${roomId}/watch`);
          const player = getYouTubePlayer();

          if (player) {
            const playing = event.data === YT_STATE.PLAYING;
            const currentTime = getYouTubeCurrentTime();

            update(watchRef, {
              playing: playing,
              currentTime: currentTime,
            });
          }
        }
      },
    });

    ytPlayer = getYouTubePlayer();
    syncStatus.textContent = 'YouTube video loaded';
  } catch (error) {
    console.error('Failed to load YouTube video:', error);
    syncStatus.textContent = 'Failed to load YouTube video';

    // Fallback to showing regular video element
    sharedVideo.style.display = 'block';
    if (ytContainer) ytContainer.style.display = 'none';
  }
}


// ========================================
// 3. UPDATE THE WATCH-TOGETHER SYNC SECTION
// ========================================

function setupWatchSync() {
  if (!roomId) return;

  const watchRef = ref(db, `rooms/${roomId}/watch`);

  // Listen for video state changes from partner
  const watchCallback = (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // Only joiner follows the initiator's commands
    if (role !== 'joiner') return;

    // Load video if URL changes
    if (data.url && data.url !== streamUrlInput.value) {
      streamUrlInput.value = data.url;

      if (isYouTubeUrl(data.url)) {
        loadYouTubeVideoWithSync(data.url);
      } else {
        // Regular video
        sharedVideo.style.display = 'block';
        sharedVideo.src = data.url;

        // Hide YouTube container if it exists
        const ytContainer = document.getElementById('ytPlayerContainer');
        if (ytContainer) ytContainer.style.display = 'none';
      }

      syncStatus.textContent = 'Video loaded';
    }

    // Sync playback state
    if (data.isYouTube && ytPlayer && ytReady) {
      // YouTube video sync
      if (data.playing !== undefined) {
        const currentState = getYouTubePlayerState();
        const isPlaying = currentState === YT_STATE.PLAYING;

        if (data.playing && !isPlaying) {
          playYouTubeVideo();
        } else if (!data.playing && isPlaying) {
          pauseYouTubeVideo();
        }
      }

      // Sync current time (with 2 second tolerance)
      if (data.currentTime !== undefined) {
        const currentTime = getYouTubeCurrentTime();
        const timeDiff = Math.abs(currentTime - data.currentTime);
        if (timeDiff > 2) {
          seekYouTubeVideo(data.currentTime);
        }
      }
    } else if (!data.isYouTube && sharedVideo.src) {
      // Regular video sync
      if (data.playing !== undefined && sharedVideo.paused === data.playing) {
        if (data.playing) {
          sharedVideo.play().catch((e) => console.warn('Play failed:', e));
        } else {
          sharedVideo.pause();
        }
      }

      // Sync current time (with 2 second tolerance)
      if (data.currentTime !== undefined) {
        const timeDiff = Math.abs(sharedVideo.currentTime - data.currentTime);
        if (timeDiff > 2) {
          sharedVideo.currentTime = data.currentTime;
        }
      }
    }
  };

  onValue(watchRef, watchCallback);
  trackListener(watchRef, watchCallback);

  // If initiator, send local video state changes to Firebase
  if (role === 'initiator') {
    // Regular video element listeners
    sharedVideo.addEventListener('play', () => {
      if (!ytPlayer) {
        const watchRef = ref(db, `rooms/${roomId}/watch`);
        update(watchRef, { playing: true, isYouTube: false });
      }
    });

    sharedVideo.addEventListener('pause', () => {
      if (!ytPlayer) {
        const watchRef = ref(db, `rooms/${roomId}/watch`);
        update(watchRef, { playing: false, isYouTube: false });
      }
    });

    sharedVideo.addEventListener('seeked', () => {
      if (!ytPlayer) {
        const watchRef = ref(db, `rooms/${roomId}/watch`);
        update(watchRef, { currentTime: sharedVideo.currentTime, isYouTube: false });
      }
    });

    // Periodic sync for regular videos (every 5 seconds)
    setInterval(() => {
      if (!ytPlayer && sharedVideo.src && !sharedVideo.paused) {
        const watchRef = ref(db, `rooms/${roomId}/watch`);
        update(watchRef, {
          currentTime: sharedVideo.currentTime,
          playing: !sharedVideo.paused,
          isYouTube: false,
        });
      }
    }, 5000);
  }

  if (import.meta.env.DEV) {
    console.log('Watch sync setup complete for role:', role);
  }
}


// ========================================
// 4. UPDATE THE loadStream() FUNCTION
// ========================================

function loadStream() {
  const url = streamUrlInput.value.trim();

  if (!url) {
    syncStatus.textContent = 'Please enter a video URL';
    return;
  }

  if (isYouTubeUrl(url)) {
    loadYouTubeVideoWithSync(url);
  } else {
    // Show regular video element
    sharedVideo.style.display = 'block';
    sharedVideo.src = url;
    syncStatus.textContent = 'Video loaded';

    // Hide YouTube container if it exists
    const ytContainer = document.getElementById('ytPlayerContainer');
    if (ytContainer) ytContainer.style.display = 'none';
  }

  // Sync to Firebase if in a room
  if (roomId && role === 'initiator') {
    const watchRef = ref(db, `rooms/${roomId}/watch`);
    set(watchRef, {
      url: url,
      playing: false,
      currentTime: 0,
      isYouTube: isYouTubeUrl(url),
    });
  }
}


// ========================================
// 5. UPDATE THE hangUp() FUNCTION - ADD YOUTUBE CLEANUP
// ========================================

async function hangUp() {
  // Stop local media
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localVideo.srcObject = null;
    localStream = null;
  }

  // Stop remote media
  if (remoteVideo.srcObject) {
    remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
  }

  // Close peer connection
  if (pc) {
    pc.close();
    pc = null;
  }

  // Remove Firebase listeners
  firebaseListeners.forEach(({ ref: fbRef, callback }) => {
    off(fbRef, 'value', callback);
    off(fbRef, 'child_added', callback);
  });
  firebaseListeners.length = 0;

  // Clean up YouTube player
  destroyYouTubePlayer();
  ytPlayer = null;
  ytReady = false;

  const ytContainer = document.getElementById('ytPlayerContainer');
  if (ytContainer) {
    ytContainer.remove();
  }

  // Remove room from Firebase (optional - rooms can auto-expire)
  if (roomId && role === 'initiator') {
    const roomRef = ref(db, `rooms/${roomId}`);
    remove(roomRef).catch((error) => {
      console.warn('Failed to remove room:', error);
    });
  }

  // Reset UI
  startChatBtn.disabled = false;
  startChatBtn.style.display = 'block';
  hangUpBtn.disabled = true;
  linkContainer.style.display = 'none';
  watchContainer.style.display = 'none';
  videoContainer.style.display = 'flex';
  pipBtn.style.display = 'none';
  shareLink.value = '';
  sharedVideo.src = '';
  sharedVideo.style.display = 'block';
  streamUrlInput.value = '';
  syncStatus.textContent = '';

  // Reset state
  roomId = null;
  role = null;
  watchMode = false;
  lastAnswerSdp = null;
  lastOfferSdp = null;

  // Clear URL parameter
  window.history.replaceState({}, document.title, window.location.pathname);

  updateStatus('Disconnected. Click "Start New Chat" to begin.');
  enableTitleLink();
}


// ========================================
// 6. UPDATE toggleWatchMode() - SHOW/HIDE YOUTUBE PROPERLY
// ========================================

function toggleWatchMode() {
  watchMode = !watchMode;

  if (watchMode) {
    videoContainer.style.display = 'none';
    watchContainer.style.display = 'block';
    toggleModeBtn.textContent = 'Switch to Chat Mode';
    syncStatus.textContent = watchMode && roomId ? 'Watch mode ready' : 'Enter a video URL';
  } else {
    videoContainer.style.display = 'flex';
    watchContainer.style.display = 'none';
    toggleModeBtn.textContent = 'Switch to Watch Mode';

    // Hide YouTube player when switching back to chat
    const ytContainer = document.getElementById('ytPlayerContainer');
    if (ytContainer) {
      ytContainer.style.display = 'none';
    }
    sharedVideo.style.display = 'block';
  }
}
