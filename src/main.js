// ============================================================================
// HANGVIDU - P2P VIDEO CHAT WITH WATCH-TOGETHER MODE
// ============================================================================

import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  onChildAdded,
  update,
  get,
  off,
  remove,
} from 'firebase/database';

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
} from './app/elements.js';

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

import { initializeSearchUI, clearSearchResults } from './youtube-search.js';

import '@fortawesome/fontawesome-free/css/all.min.css';

// ============================================================================
// FIREBASE CONFIGURATION
// ============================================================================

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ============================================================================
// WEBRTC CONFIGURATION
// ============================================================================

const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // Add TURN servers here if needed for better connectivity
  ],
};

// ============================================================================
// GLOBAL STATE
// ============================================================================
// Keeping state simple and centralized like simple-main.js reference

let pc = null; // RTCPeerConnection
let localStream = null; // Local media stream
let roomId = null; // Current room ID
let role = null; // 'initiator' | 'joiner'
let watchMode = false; // Watch-together mode active
let ytPlayer = null; // YouTube player instance
let ytReady = false; // YouTube API loaded

// Track Firebase listeners for proper cleanup
const firebaseListeners = [];

// Prevent duplicate SDP processing
let lastAnswerSdp = null;
let lastOfferSdp = null;

// ============================================================================
// INITIALIZATION & MEDIA SETUP
// ============================================================================

async function init() {
  try {
    // Get user media
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localVideo.srcObject = localStream;

    // Auto-mute in development mode
    if (import.meta.env.DEV && muteSelfBtn) {
      setTimeout(() => muteSelfBtn.click(), 100);
    }

    return true;
  } catch (error) {
    console.error('Failed to get user media:', error);
    updateStatus('Error: Please allow camera and microphone access.');
    return false;
  }
}

// ============================================================================
// WEBRTC CONNECTION - INITIATOR (CREATE CALL)
// ============================================================================

async function createCall() {
  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return;
  }

  // Generate room ID
  roomId = Math.random().toString(36).substring(2, 15);
  role = 'initiator';

  // Create peer connection
  pc = new RTCPeerConnection(configuration);

  // Add local tracks to peer connection
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  // Handle incoming remote stream
  pc.ontrack = (event) => {
    if (import.meta.env.DEV) {
      console.log('Received remote track');
    }
    if (remoteVideo.srcObject !== event.streams[0]) {
      remoteVideo.srcObject = event.streams[0];
      pipBtn.style.display = 'block';
      updateStatus('Connected!');
    }
  };

  // Send ICE candidates to Firebase
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      const candidateRef = push(ref(db, `rooms/${roomId}/callerCandidates`));
      set(candidateRef, event.candidate.toJSON());
    }
  };

  // Monitor connection state
  pc.onconnectionstatechange = () => {
    if (import.meta.env.DEV) {
      console.log('Connection state:', pc.connectionState);
    }
    if (pc.connectionState === 'connected') {
      updateStatus('Connected!');
    } else if (pc.connectionState === 'disconnected') {
      updateStatus('Partner disconnected');
    } else if (pc.connectionState === 'failed') {
      updateStatus('Connection failed');
    }
  };

  // Create offer
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  // Save offer to Firebase
  const roomRef = ref(db, `rooms/${roomId}`);
  await set(roomRef, {
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  });

  // Listen for answer from joiner
  const answerRef = ref(db, `rooms/${roomId}/answer`);
  const answerCallback = async (snapshot) => {
    const answer = snapshot.val();
    if (answer && answer.sdp !== lastAnswerSdp) {
      lastAnswerSdp = answer.sdp;

      // Check signaling state before setting remote description
      if (
        pc.signalingState !== 'have-local-offer' &&
        pc.signalingState !== 'stable'
      ) {
        if (import.meta.env.DEV) {
          console.log(
            'Ignoring answer - unexpected signaling state:',
            pc.signalingState
          );
        }
        return;
      }

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        if (import.meta.env.DEV) {
          console.log('Remote description set (answer)');
        }
      } catch (error) {
        console.error('Failed to set remote description:', error);
      }
    }
  };

  onValue(answerRef, answerCallback);
  trackListener(answerRef, answerCallback);

  // Listen for ICE candidates from joiner
  const calleeCandidatesRef = ref(db, `rooms/${roomId}/calleeCandidates`);
  const calleeCallback = (snapshot) => {
    const candidate = snapshot.val();
    if (candidate && pc.remoteDescription) {
      pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
        console.error('Error adding ICE candidate:', error);
      });
    }
  };

  onChildAdded(calleeCandidatesRef, calleeCallback);
  trackListener(calleeCandidatesRef, calleeCallback);

  // Setup watch-together sync
  setupWatchSync();

  // Show share link
  const shareUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
  shareLink.value = shareUrl;
  linkContainer.style.display = 'block';
  startChatBtn.disabled = true;
  hangUpBtn.disabled = false;

  updateStatus('Link ready! Share with your partner.');
  disableTitleLink();
}

// ============================================================================
// WEBRTC CONNECTION - JOINER (ANSWER CALL)
// ============================================================================

async function answerCall() {
  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return;
  }

  if (!roomId) {
    updateStatus('Error: No room ID');
    return;
  }

  role = 'joiner';

  // Get room data from Firebase
  const roomRef = ref(db, `rooms/${roomId}`);
  const roomSnapshot = await get(roomRef);

  if (!roomSnapshot.exists()) {
    updateStatus('Error: Invalid room link');
    return;
  }

  const roomData = roomSnapshot.val();
  const offer = roomData.offer;

  if (!offer) {
    updateStatus('Error: No offer found');
    return;
  }

  // Create peer connection
  pc = new RTCPeerConnection(configuration);

  // Add local tracks
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  // Handle incoming remote stream
  pc.ontrack = (event) => {
    if (import.meta.env.DEV) {
      console.log('Received remote track');
    }
    if (remoteVideo.srcObject !== event.streams[0]) {
      remoteVideo.srcObject = event.streams[0];
      pipBtn.style.display = 'block';
      updateStatus('Connected!');
    }
  };

  // Send ICE candidates to Firebase
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      const candidateRef = push(ref(db, `rooms/${roomId}/calleeCandidates`));
      set(candidateRef, event.candidate.toJSON());
    }
  };

  // Monitor connection state
  pc.onconnectionstatechange = () => {
    if (import.meta.env.DEV) {
      console.log('Connection state:', pc.connectionState);
    }
    if (pc.connectionState === 'connected') {
      updateStatus('Connected!');
    } else if (pc.connectionState === 'disconnected') {
      updateStatus('Partner disconnected');
    } else if (pc.connectionState === 'failed') {
      updateStatus('Connection failed');
    }
  };

  // Listen for ICE candidates from initiator
  const callerCandidatesRef = ref(db, `rooms/${roomId}/callerCandidates`);
  const callerCallback = (snapshot) => {
    const candidate = snapshot.val();
    if (candidate && pc.remoteDescription) {
      pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
        console.error('Error adding ICE candidate:', error);
      });
    }
  };

  onChildAdded(callerCandidatesRef, callerCallback);
  trackListener(callerCandidatesRef, callerCallback);

  // Set remote description (offer)
  await pc.setRemoteDescription(new RTCSessionDescription(offer));

  // Create answer
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  // Save answer to Firebase
  await update(roomRef, {
    answer: {
      type: answer.type,
      sdp: answer.sdp,
    },
  });

  // Setup watch-together sync
  setupWatchSync();

  hangUpBtn.disabled = false;
  updateStatus('Connecting...');
  disableTitleLink();
}

// ============================================================================
// WATCH-TOGETHER SYNC (Firebase-based)
// ============================================================================

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
        update(watchRef, {
          currentTime: sharedVideo.currentTime,
          isYouTube: false,
        });
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

function handleVideoSelection(video) {
  streamUrlInput.value = video.url;
  loadStream();
  syncStatus.textContent = `Loading "${video.title}"...`;
}

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

// ============================================================================
// UI CONTROLS - WATCH MODE TOGGLE
// ============================================================================

function toggleWatchMode() {
  watchMode = !watchMode;

  if (watchMode) {
    videoContainer.style.display = 'none';
    watchContainer.style.display = 'block';
    toggleModeBtn.textContent = 'Switch to Chat Mode';
    syncStatus.textContent =
      watchMode && roomId ? 'Watch mode ready' : 'Enter a video URL';

    initializeSearchUI(handleVideoSelection);
  } else {
    videoContainer.style.display = 'flex';
    watchContainer.style.display = 'none';
    toggleModeBtn.textContent = 'Switch to Watch Mode';

    // Hide YouTube player when switching back to chat
    const ytContainer = document.getElementById('ytPlayerContainer');

    clearSearchResults();
    if (ytContainer) {
      ytContainer.style.display = 'none';
    }
    sharedVideo.style.display = 'block';
  }
}

// ============================================================================
// UI CONTROLS - MEDIA CONTROLS (MUTE, VIDEO, FULLSCREEN)
// ============================================================================

// Mute/unmute self
muteSelfBtn.onclick = () => {
  if (!localStream) return;

  const audioTrack = localStream.getAudioTracks()[0];
  if (audioTrack) {
    audioTrack.enabled = !audioTrack.enabled;
    const icon = muteSelfBtn.querySelector('i');
    icon.className = audioTrack.enabled
      ? 'fa fa-microphone'
      : 'fa fa-microphone-slash';
  }
};

// Toggle video on/off
videoSelfBtn.onclick = () => {
  if (!localStream) return;

  const videoTrack = localStream.getVideoTracks()[0];
  if (videoTrack) {
    videoTrack.enabled = !videoTrack.enabled;
    const icon = videoSelfBtn.querySelector('i');
    icon.className = videoTrack.enabled ? 'fa fa-video' : 'fa fa-video-slash';
  }
};

// Switch camera (mobile)
if (switchCameraSelfBtn) {
  switchCameraSelfBtn.onclick = async () => {
    if (!localStream) return;

    try {
      const videoTrack = localStream.getVideoTracks()[0];
      const currentFacingMode = videoTrack.getSettings().facingMode;
      const newFacingMode =
        currentFacingMode === 'user' ? 'environment' : 'user';

      // Stop current track
      videoTrack.stop();

      // Get new stream with opposite camera
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode },
        audio: true,
      });

      // Replace track in peer connection
      const newVideoTrack = newStream.getVideoTracks()[0];
      if (pc) {
        const sender = pc.getSenders().find((s) => s.track?.kind === 'video');
        if (sender) {
          sender.replaceTrack(newVideoTrack);
        }
      }

      // Update local video
      localStream = newStream;
      localVideo.srcObject = newStream;
    } catch (error) {
      console.error('Failed to switch camera:', error);
    }
  };
}

// Fullscreen for local video
fullscreenSelfBtn.onclick = () => {
  if (localVideo.requestFullscreen) {
    localVideo.requestFullscreen();
  } else if (localVideo.webkitRequestFullscreen) {
    localVideo.webkitRequestFullscreen();
  }
};

// Mute/unmute partner
mutePartnerBtn.onclick = () => {
  if (!remoteVideo.srcObject) return;

  const audioTracks = remoteVideo.srcObject.getAudioTracks();
  audioTracks.forEach((track) => {
    track.enabled = !track.enabled;
  });

  const icon = mutePartnerBtn.querySelector('i');
  icon.className = audioTracks[0]?.enabled
    ? 'fa fa-volume-up'
    : 'fa fa-volume-mute';
};

// Fullscreen for remote video
fullscreenPartnerBtn.onclick = () => {
  if (remoteVideo.requestFullscreen) {
    remoteVideo.requestFullscreen();
  } else if (remoteVideo.webkitRequestFullscreen) {
    remoteVideo.webkitRequestFullscreen();
  }
};

// ============================================================================
// UI CONTROLS - PICTURE-IN-PICTURE
// ============================================================================

pipBtn.onclick = async () => {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      pipBtn.textContent = 'Float Partner Video';
    } else {
      await remoteVideo.requestPictureInPicture();
      pipBtn.textContent = 'Exit Floating Video';
    }
  } catch (error) {
    console.error('PiP failed:', error);
    updateStatus('Picture-in-picture not supported');
  }
};

// ============================================================================
// HANG UP / CLEANUP
// ============================================================================
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

// ============================================================================
// EVENT LISTENERS
// ============================================================================

startChatBtn.onclick = async () => {
  const success = await init();
  if (success) {
    await createCall();
  }
};

hangUpBtn.onclick = hangUp;

toggleModeBtn.onclick = toggleWatchMode;

loadStreamBtn.onclick = loadStream;

copyLinkBtn.onclick = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    updateStatus('Link copied to clipboard!');
  } catch (error) {
    // Fallback for older browsers
    shareLink.select();
    document.execCommand('copy');
    updateStatus('Link copied!');
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function updateStatus(message) {
  statusDiv.textContent = message;
  if (import.meta.env.DEV) {
    console.log('Status:', message);
  }
}

function trackListener(fbRef, callback) {
  firebaseListeners.push({ ref: fbRef, callback });
}

function disableTitleLink() {
  titleLink.href = '';
  titleLink.style.cursor = 'default';
}

function enableTitleLink() {
  if (import.meta.env.PROD) {
    titleLink.href = 'https://kristinnroach.github.io/HangVidU/';
  } else {
    titleLink.href = '#';
  }
  titleLink.style.cursor = 'pointer';
}

// ============================================================================
// AUTO-JOIN FROM URL PARAMETER
// ============================================================================

async function autoJoinFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlRoomId = urlParams.get('room');

  if (urlRoomId) {
    roomId = urlRoomId;
    updateStatus('Connecting to room...');
    startChatBtn.style.display = 'none';

    const success = await init();
    if (success) {
      await answerCall();
    }
  } else {
    updateStatus('Ready. Click "Start New Chat" to begin.');
  }
}

// ============================================================================
// INITIALIZE ON PAGE LOAD
// ============================================================================

// Handle page leave warning
window.addEventListener('beforeunload', (event) => {
  if (pc && pc.connectionState === 'connected') {
    event.preventDefault();
    event.returnValue = '';
  }
});

// Touch controls for mobile (show/hide buttons on tap)
document.querySelectorAll('.video-wrapper').forEach((wrapper) => {
  let hideTimeout;
  const controls = wrapper.querySelector('.hover-controls');

  if (controls) {
    wrapper.addEventListener('touchstart', () => {
      controls.style.opacity = '1';
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        controls.style.opacity = '0';
      }, 3000);
    });
  }
});

// Auto-join if room parameter exists
autoJoinFromUrl();

// Warn user before leaving page during active call
window.addEventListener('beforeunload', (e) => {
  if (pc && pc.connectionState === 'connected') {
    // Trigger browser's generic "leave page?" dialog
    e.preventDefault();
    // NOTE: Modern browsers ignore returnValue text
    e.returnValue =
      'You are in an active call. Are you sure you want to leave?';
    return e.returnValue;
  }
});
