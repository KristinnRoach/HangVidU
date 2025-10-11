// watch-sync.js - Video synchronization utilities
import { ref, set, onValue } from 'firebase/database';

export function setupWatchSync(db, roomId, elements, state) {
  if (!roomId) return;

  listenForStreamUrl(db, roomId, elements);
  listenForPlayPause(db, roomId, elements, state);
  listenForSeek(db, roomId, elements, state);
  setupLocalVideoEvents(db, roomId, elements, state);
}

function listenForStreamUrl(db, roomId, elements) {
  const streamUrlRef = ref(db, `rooms/${roomId}/stream/url`);
  onValue(streamUrlRef, (snapshot) => {
    const url = snapshot.val();
    if (url && url !== elements.streamUrlInput.value && url !== elements.sharedVideo.src) {
      elements.streamUrlInput.value = url;
      elements.syncStatus.innerHTML = `
        Partner shared a video: 
        <button onclick="acceptSharedVideo()" style="margin-left: 10px; padding: 5px 15px;">
          ✓ Accept & Load
        </button>
      `;
      elements.syncStatus.style.background = '#2196f3';
    }
  });
}

function listenForPlayPause(db, roomId, elements, state) {
  const playingRef = ref(db, `rooms/${roomId}/stream/playing`);
  onValue(playingRef, async (snapshot) => {
    if (state.isSyncing) return;
    const playing = snapshot.val();
    
    if (playing === true && elements.sharedVideo.paused) {
      try {
        await elements.sharedVideo.play();
        elements.syncStatus.textContent = 'Playing in sync';
      } catch (error) {
        elements.syncStatus.textContent = '▶️ Tap the video to start playing';
        elements.syncStatus.style.background = '#FF5722';
        elements.syncStatus.style.fontSize = '16px';
        
        const clearWarning = () => {
          elements.syncStatus.style.background = '#2a2a2a';
          elements.syncStatus.style.fontSize = '14px';
          elements.sharedVideo.removeEventListener('play', clearWarning);
        };
        elements.sharedVideo.addEventListener('play', clearWarning);
      }
    } else if (playing === false && !elements.sharedVideo.paused) {
      elements.sharedVideo.pause();
      elements.syncStatus.textContent = 'Partner pressed pause';
    }
  });
}

function listenForSeek(db, roomId, elements, state) {
  const timeRef = ref(db, `rooms/${roomId}/stream/time`);
  onValue(timeRef, (snapshot) => {
    if (state.isSyncing) return;
    const time = snapshot.val();
    if (time !== null && Math.abs(elements.sharedVideo.currentTime - time) > 2) {
      elements.sharedVideo.currentTime = time;
      elements.syncStatus.textContent = `Syncing to ${Math.floor(time)}s`;
    }
  });
}

function setupLocalVideoEvents(db, roomId, elements, state) {
  const video = elements.sharedVideo;
  const streamRef = ref(db, `rooms/${roomId}/stream`);
  
  video.addEventListener('play', () => {
    if (roomId && !state.isSyncing) {
      state.isSyncing = true;
      set(streamRef, {
        playing: true,
        time: video.currentTime,
        url: video.src
      });
      setTimeout(() => (state.isSyncing = false), 1000);
    }
  });
  
  video.addEventListener('pause', () => {
    if (roomId && !state.isSyncing) {
      state.isSyncing = true;
      set(streamRef, {
        playing: false,
        time: video.currentTime,
        url: video.src
      });
      setTimeout(() => (state.isSyncing = false), 1000);
    }
  });
  
  video.addEventListener('seeked', () => {
    if (roomId && !state.isSyncing) {
      state.isSyncing = true;
      set(streamRef, {
        playing: !video.paused,
        time: video.currentTime,
        url: video.src
      });
      setTimeout(() => (state.isSyncing = false), 1000);
    }
  });
  
  video.addEventListener('loadeddata', () => {
    elements.syncStatus.textContent = 'Video loaded! Press play to start.';
  });
  
  video.addEventListener('waiting', () => {
    elements.syncStatus.textContent = 'Buffering...';
  });
  
  video.addEventListener('playing', () => {
    elements.syncStatus.textContent = 'Playing in sync';
  });
}

export function shareVideoUrl(db, roomId, url) {
  if (!roomId || !url) return;
  
  const streamRef = ref(db, `rooms/${roomId}/stream`);
  set(streamRef, { url });
}