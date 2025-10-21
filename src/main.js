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
  onChildRemoved,
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
  chatContainer,
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
  ytContainer,
  videoInputSelect,
  audioInputSelect,
  audioOutputSelect,
} from './elements.js';

import {
  initializeMediaControls,
  addRemoteVideoEventListeners,
  cleanupMediaControls,
} from './media-controls.js';

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

import { SelectMediaDevice } from './components/SelectMediaDevice.js';

import '@fortawesome/fontawesome-free/css/all.min.css';
import { hasFrontAndBackCameras } from './media-devices.js';

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
let peerId = null; // Unique peer ID
let role = null; // 'initiator' | 'joiner'
let watchMode = false; // Watch-together mode active
let ytPlayer = null; // YouTube player instance
let ytReady = false; // YouTube API loaded

// Track Firebase listeners for proper cleanup
const firebaseListeners = [];

// Prevent duplicate SDP processing
let lastAnswerSdp = null;
let lastOfferSdp = null;

// Prevent feedback loops in bidirectional sync
let lastLocalAction = 0;

// ============================================================================
// INITIALIZATION & MEDIA SETUP
// ============================================================================

const userMediaAudioConstraints = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
};

const userMediaVideoConstraints = {
  width: { min: 640, ideal: 1920, max: 1920 },
  height: { min: 480, ideal: 1080, max: 1080 },
};

async function init() {
  peerId = Math.random().toString(36).substring(2, 15);

  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: userMediaVideoConstraints,
      audio: userMediaAudioConstraints,
    });

    // Workaround for mobile browser echo (don't respect "videoEl.volume"):
    // Create a new stream with only the video track for local preview
    const videoOnlyStream = new MediaStream(localStream.getVideoTracks());
    localVideo.srcObject = videoOnlyStream;

    if (await hasFrontAndBackCameras()) {
      switchCameraSelfBtn.style.display = 'block';
    }

    initializeMediaControls({
      getLocalStream: () => localStream,
      getLocalVideo: () => localVideo,
      getRemoteVideo: () => remoteVideo,
      getPeerConnection: () => pc,

      muteSelfBtn,
      videoSelfBtn,
      switchCameraSelfBtn,
      fullscreenSelfBtn,
      mutePartnerBtn,
      fullscreenPartnerBtn,

      audioConstraints: userMediaAudioConstraints,
    });

    return true;
  } catch (error) {
    console.error('Failed to get user media:', error);
    updateStatus('Error: Please allow camera and microphone access.');
    return false;
  }
}

// === WIP ===

let uiHandleRemoteJoined = () => {
  remoteVideo.style.display = 'block';
  localVideo.classList.add('smallFrame');
};

let uiHandleRemoteLeft = () => {
  remoteVideo.style.display = 'none';
  localVideo.classList.remove('smallFrame');
};

// Minimal room members setup for join/leave events
let membersListeners = [];
function setupRoomMembers() {
  if (!roomId || !peerId) return;
  const membersRef = ref(db, `rooms/${roomId}/members`);
  const myMemberRef = ref(db, `rooms/${roomId}/members/${peerId}`);
  set(myMemberRef, { joinedAt: Date.now() });

  // Listen for remote peer join
  const onJoin = (snapshot) => {
    if (snapshot.key !== peerId) uiHandleRemoteJoined();
  };
  onChildAdded(membersRef, onJoin);
  membersListeners.push({
    ref: membersRef,
    type: 'child_added',
    callback: onJoin,
  });

  // Listen for remote peer leave
  const onLeave = (snapshot) => {
    if (snapshot.key !== peerId) uiHandleRemoteLeft();
  };
  onChildRemoved(membersRef, onLeave);
  membersListeners.push({
    ref: membersRef,
    type: 'child_removed',
    callback: onLeave,
  });
}

// === End of WIP ===

// ============================================================================
// WEBRTC CONNECTION - INITIATOR (CREATE CALL)
// ============================================================================

function setupRemoteStream(pc) {
  pc.ontrack = (event) => {
    if (import.meta.env.DEV) {
      console.log('Received remote track');
    }

    if (
      !event.streams ||
      !event.streams[0] ||
      !(event.streams[0] instanceof MediaStream)
    ) {
      console.error(
        'No valid remote MediaStream found in event.streams:',
        event.streams
      );
      return;
    }

    if (remoteVideo.srcObject !== event.streams[0]) {
      remoteVideo.srcObject = event.streams[0];
      pipBtn.style.display = 'block';
      addRemoteVideoEventListeners(remoteVideo, mutePartnerBtn);
      updateStatus('Connected!');
    }
  };
}

function setupIceCandidates(pc, role) {
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      const path =
        role === 'initiator' ? 'callerCandidates' : 'calleeCandidates';
      const candidateRef = push(ref(db, `rooms/${roomId}/${path}`));
      set(candidateRef, event.candidate.toJSON());
    }
  };

  const remotePath =
    role === 'initiator' ? 'calleeCandidates' : 'callerCandidates';
  const remoteCandidatesRef = ref(db, `rooms/${roomId}/${remotePath}`);
  const callback = (snapshot) => {
    const candidate = snapshot.val();
    if (candidate && pc.remoteDescription) {
      pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
        console.error('Error adding ICE candidate:', error);
      });
    }
  };

  onChildAdded(remoteCandidatesRef, callback);
  trackListener(remoteCandidatesRef, 'child_added', callback);
}

function setupConnectionStateHandlers(pc) {
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
}

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

  setupRemoteStream(pc);
  setupIceCandidates(pc, role);
  setupConnectionStateHandlers(pc);

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
  trackListener(answerRef, 'value', answerCallback);

  // Setup watch-together sync
  setupWatchSync();

  // Add self to room members and listen for join/leave
  setupRoomMembers();

  // Show share link
  const shareUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
  shareLink.value = shareUrl;
  // TODO: Cleanup replaced elements and related code, e.g. -> linkContainer.style.display = 'block';
  startChatBtn.disabled = true;
  hangUpBtn.disabled = false;

  // TODO: Make nice
  // Automatically copy link to clipboard
  try {
    await navigator.clipboard.writeText(shareUrl);
    alert(
      `Link copied! Share it with someone to start a call.\n\n( link: ${shareUrl} )`
    );
  } catch (error) {
    alert(`Share this link with your partner:\n${shareUrl}`);
  }

  updateStatus('Link ready! Share with your partner.');
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
  setupRemoteStream(pc);

  // Send ICE candidates to Firebase
  setupIceCandidates(pc, role);

  // Monitor connection state
  setupConnectionStateHandlers(pc);

  // Set remote description (offer)
  await pc.setRemoteDescription(new RTCSessionDescription(offer));

  // Create answer
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  // Save answer to Firebase
  try {
    await update(roomRef, {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    });
  } catch (err) {
    console.error('Failed to update answer in Firebase:', err);
    updateStatus('Failed to send answer to partner.');
    return;
  }

  // Setup watch-together sync
  setupWatchSync();

  // Add self to room members and listen for join/leave
  setupRoomMembers();

  hangUpBtn.disabled = false;
  updateStatus('Connecting...');
}

// ============================================================================
// WATCH-TOGETHER SYNC (Firebase-based)
// ============================================================================

// STATE
let justSeeked = false;
let seekDebounceTimeout = null;

// UTILS
async function updateWatchSyncState(updates) {
  if (!roomId) return;
  const watchRef = ref(db, `rooms/${roomId}/watch`);
  try {
    await update(watchRef, {
      ...updates,
      updatedBy: peerId,
    });
  } catch (err) {
    console.error('Failed to update watch state:', err);
    // TODO: consider whether it's worth it to implement retry/backoff here
  }
}

function setupWatchSync() {
  if (!roomId) return;

  const watchRef = ref(db, `rooms/${roomId}/watch`);

  // Listen for video state changes from partner
  const watchCallback = (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // Ignore updates we sent ourselves
    if (data.updatedBy === peerId) return;

    // Ignore if we just performed a local action
    if (Date.now() - lastLocalAction < 500) return;

    // Load video if URL changes
    if (data.url && data.url !== streamUrlInput.value) {
      streamUrlInput.value = data.url;
      if (isYouTubeUrl(data.url)) {
        loadYouTubeVideoWithSync(data.url);
      } else {
        // Regular video
        sharedVideo.style.display = 'block';
        sharedVideo.src = data.url;
        // Hide YouTube container
        ytContainer.style.display = 'none';
      }
      syncStatus.textContent = 'Video loaded';
    }

    // Sync playback state
    if (data.isYouTube && ytPlayer && ytReady) {
      // YouTube video sync
      if (data.playing !== undefined) {
        const currentState = getYouTubePlayerState();
        const isPlaying = currentState === YT_STATE.PLAYING;

        // Handle seek in YouTube with debounce
        if (
          currentState === YT_STATE.BUFFERING ||
          currentState === YT_STATE.UNSTARTED
        ) {
          justSeeked = true;
          if (seekDebounceTimeout) clearTimeout(seekDebounceTimeout);
          seekDebounceTimeout = setTimeout(async () => {
            justSeeked = false;
            // Send final state after seek settles
            const finalState = getYouTubePlayerState();
            const finalPlaying = finalState === YT_STATE.PLAYING;
            await updateWatchSyncState({
              playing: finalPlaying,
              currentTime: getYouTubeCurrentTime(),
            });
          }, 700);
        } else if (justSeeked) {
          // Ignore transient pause/play events right after seek
          return;
        } else {
          // Sync play/pause
          if (data.playing && !isPlaying) {
            playYouTubeVideo();
          } else if (!data.playing && isPlaying) {
            pauseYouTubeVideo();
          }
        }
      }

      // Sync current time with tolerance
      if (data.currentTime !== undefined) {
        const currentTime = getYouTubeCurrentTime();
        const timeDiff = Math.abs(currentTime - data.currentTime);
        if (timeDiff > 0.3 && !justSeeked) {
          seekYouTubeVideo(data.currentTime);
          // After seek, ensure correct play/pause state
          setTimeout(() => {
            if (data.playing) {
              playYouTubeVideo();
            } else {
              pauseYouTubeVideo();
            }
          }, 500); // 500ms after seek
        }
      }
    } else if (!data.isYouTube && sharedVideo.src) {
      // Regular video sync (no debounce needed)
      if (data.playing !== undefined) {
        if (data.playing && sharedVideo.paused) {
          sharedVideo.play().catch((e) => console.warn('Play failed:', e));
        } else if (!data.playing && !sharedVideo.paused) {
          sharedVideo.pause();
        }
      }

      // Sync current time
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
  };

  onValue(watchRef, watchCallback);
  trackListener(watchRef, 'value', watchCallback);

  // Regular video element listeners
  sharedVideo.addEventListener('play', async () => {
    if (!ytPlayer && roomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({ playing: true, isYouTube: false });
    }
  });

  sharedVideo.addEventListener('pause', async () => {
    if (!ytPlayer && roomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({ playing: false, isYouTube: false });
    }
  });

  sharedVideo.addEventListener('seeked', async () => {
    if (!ytPlayer && roomId) {
      lastLocalAction = Date.now();
      await updateWatchSyncState({
        currentTime: sharedVideo.currentTime,
        playing: !sharedVideo.paused,
        isYouTube: false,
      });
    }
  });

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

  lastLocalAction = Date.now();

  if (isYouTubeUrl(url)) {
    loadYouTubeVideoWithSync(url);
  } else {
    // Hide YouTube container and destroy player if switching to direct video
    ytContainer.style.display = 'none';
    destroyYouTubePlayer();

    // Show regular video element
    sharedVideo.style.display = 'block';
    sharedVideo.src = url;
    syncStatus.textContent = 'Video loaded';
  }

  // Both participants can sync to Firebase
  if (roomId) {
    const watchRef = ref(db, `rooms/${roomId}/watch`);
    set(watchRef, {
      url: url,
      playing: false,
      currentTime: 0,
      isYouTube: isYouTubeUrl(url),
      updatedBy: peerId,
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

  // Show YouTube container
  ytContainer.style.display = 'block';

  try {
    // Load YouTube player
    await loadYouTubeVideo({
      url: url,
      containerId: 'yt-player-div',
      onReady: (event) => {
        ytReady = true;
        syncStatus.textContent = 'YouTube video ready';

        // Both participants can set initial state in Firebase
        if (roomId) {
          const watchRef = ref(db, `rooms/${roomId}/watch`);
          set(watchRef, {
            url: url,
            playing: false,
            currentTime: 0,
            isYouTube: true,
            updatedBy: peerId,
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

    ytPlayer = getYouTubePlayer();
    syncStatus.textContent = 'YouTube video loaded';
  } catch (error) {
    console.error('Failed to load YouTube video:', error);
    syncStatus.textContent = 'Failed to load YouTube video';

    // Fallback to showing regular video element
    sharedVideo.style.display = 'block';
    ytContainer.style.display = 'none';
  }
}

// ============================================================================
// UI CONTROLS - WATCH MODE TOGGLE
// ============================================================================

function toggleWatchMode() {
  watchMode = !watchMode;

  if (watchMode) {
    chatContainer.style.display = 'none';
    watchContainer.style.display = 'block';
    // toggleModeBtn.textContent = 'Switch to Chat Mode';
    syncStatus.textContent =
      watchMode && roomId ? 'Watch mode ready' : 'Enter a video URL';

    initializeSearchUI(handleVideoSelection);
  } else {
    chatContainer.style.display = 'flex';
    watchContainer.style.display = 'none';
    // toggleModeBtn.textContent = 'Switch to Watch Mode';

    // Hide YouTube player when switching back to chat
    clearSearchResults();
    ytContainer.style.display = 'none';
    sharedVideo.style.display = 'none';
  }
}

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
  console.debug('Hanging up...');

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

  cleanupMediaControls(remoteVideo);

  // Close peer connection
  if (pc) {
    pc.close();
    pc = null;
  }

  // Remove Firebase listeners
  firebaseListeners.forEach(({ ref: fbRef, type, callback }) =>
    off(fbRef, type, callback)
  );
  firebaseListeners.length = 0;

  // Clean up YouTube player
  destroyYouTubePlayer();
  ytPlayer = null;
  ytReady = false;
  ytContainer.style.display = 'none';

  // Clear debounce timeout if any
  if (seekDebounceTimeout) {
    clearTimeout(seekDebounceTimeout);
    seekDebounceTimeout = null;
  }
  justSeeked = false;

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
  membersListeners.forEach(({ ref: fbRef, type, callback }) =>
    off(fbRef, type, callback)
  );
  membersListeners.length = 0;

  // Remove self from room members
  if (roomId && peerId) {
    const myMemberRef = ref(db, `rooms/${roomId}/members/${peerId}`);
    remove(myMemberRef).catch(() => {});
  }
  watchContainer.style.display = 'none';
  chatContainer.style.display = 'flex';
  pipBtn.style.display = 'none';
  shareLink.value = '';
  sharedVideo.src = '';
  sharedVideo.style.display = 'none';
  streamUrlInput.value = '';
  syncStatus.textContent = '';

  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((err) => console.error(err));
  }

  // Reset state
  roomId = null;
  role = null;
  watchMode = false;
  lastAnswerSdp = null;
  lastOfferSdp = null;

  // Clear URL parameter
  window.history.replaceState({}, document.title, window.location.pathname);

  updateStatus('Disconnected. Click "Start New Chat" to begin.');
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

function trackListener(fbRef, type, callback) {
  firebaseListeners.push({ ref: fbRef, type, callback });
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

// Handle page leave
window.addEventListener('beforeunload', (e) => {
  // Trigger browser's generic "leave page?" dialog if in active call (in PROD)
  if (import.meta.env.PROD && pc && pc.connectionState === 'connected') {
    e.preventDefault();
    e.returnValue = // NOTE: Modern browsers ignore returnValue text
      'You are in an active call. Are you sure you want to leave?';
    return e.returnValue;
  }

  // Clean up resources
  hangUp();
});

// TODO: Touch controls for mobile (show/hide buttons on tap)
// let hideTimeout;
// const controls = wrapper.querySelector('.controls-section');

// if (controls) {
//   wrapper.addEventListener('touchstart', () => {
//     controls.style.opacity = '1';
//     clearTimeout(hideTimeout);
//     hideTimeout = setTimeout(() => {
//       controls.style.opacity = '0';
//     }, 3000);
//   });
// }

// document.querySelectorAll('.video-wrapper').forEach((wrapper) => {
//   let hideTimeout;
//   const controls = wrapper.querySelector('.hover-controls');

//   if (controls) {
//     wrapper.addEventListener('touchstart', () => {
//       controls.style.opacity = '1';
//       clearTimeout(hideTimeout);
//       hideTimeout = setTimeout(() => {
//         controls.style.opacity = '0';
//       }, 3000);
//     });
//   }
// });

// Auto-join if room parameter exists
autoJoinFromUrl();

// ======= DEVICES ==========
async function updateLocalMediaDevices() {
  const videoSource = videoInputSelect?.value;
  const audioSource = audioInputSelect?.value;

  const userMediaAudioConstraints = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  };

  // Build constraints based on selected device IDs
  const constraints = {
    video: videoSource
      ? { deviceId: { exact: videoSource }, ...userMediaVideoConstraints }
      : { ...userMediaVideoConstraints },
    audio: audioSource
      ? {
          deviceId: { exact: audioSource },
          ...userMediaAudioConstraints,
        }
      : {
          ...userMediaAudioConstraints,
        },
  };

  try {
    const newStream = await navigator.mediaDevices.getUserMedia(constraints);

    // Replace tracks in peer connection if exists
    if (pc) {
      // Replace video track
      const videoTrack = newStream.getVideoTracks()[0];
      const senderV = pc.getSenders().find((s) => s.track?.kind === 'video');
      if (videoTrack && senderV) senderV.replaceTrack(videoTrack);

      // Replace audio track
      const audioTrack = newStream.getAudioTracks()[0];
      const senderA = pc.getSenders().find((s) => s.track?.kind === 'audio');
      if (audioTrack && senderA) senderA.replaceTrack(audioTrack);
    }

    // Update local stream and video element
    const oldStream = localStream;
    localStream = newStream;
    localVideo.srcObject = new MediaStream(newStream.getVideoTracks());
    if (oldStream) oldStream.getTracks().forEach((t) => t.stop()); // Cleanup old tracks
  } catch (err) {
    updateStatus('Could not access selected devices.');
    console.error(err);
  }
}

// Listen for device selection changes
videoInputSelect?.shadowRoot
  .querySelector('select')
  ?.addEventListener('change', updateLocalMediaDevices);
audioInputSelect?.shadowRoot
  .querySelector('select')
  ?.addEventListener('change', updateLocalMediaDevices);

// Set audio output device if supported
audioOutputSelect?.shadowRoot
  .querySelector('select')
  ?.addEventListener('change', (e) => {
    const sinkId = e.target.value;
    if (typeof remoteVideo?.setSinkId === 'function') {
      remoteVideo.setSinkId(sinkId).catch((err) => {
        updateStatus('Could not set audio output device.');
        console.error(err);
      });
    }
  });

// // ============================================================================
// // UI CONTROLS - MEDIA CONTROLS (MUTE, VIDEO, FULLSCREEN)
// // ============================================================================

// // STATE
// let remotePreviousMuted = remoteVideo?.muted || false;
// // let remotePreviousVolume = false;

// // Mute/unmute self

// const setMicrophoneEnabled = (enabled) => {
//   if (!localStream) return;
//   const audioTrack = localStream.getAudioTracks()[0];
//   if (!audioTrack) return;
//   audioTrack.enabled = enabled;
// };

// const setLocalVideoMuted = (enabled, volume = 0) => {
//   if (!localVideo) return;
//   localVideo.muted = !enabled;
//   localVideo.volume = volume;
// };

// const updateMuteMicIcon = (muted) => {
//   const icon = muteSelfBtn.querySelector('i');
//   icon.className = muted ? 'fa fa-microphone-slash' : 'fa fa-microphone';
// };

// muteSelfBtn.onclick = () => {
//   if (!localVideo || !localStream) return;
//   const shouldMute = !localVideo.muted;
//   setMicrophoneEnabled(!shouldMute);
//   setLocalVideoMuted(!shouldMute, 0);
//   updateMuteMicIcon(shouldMute);
// };

// // Mute/unmute partner

// const remoteVolumeChangeListener = () => {
//   // Listen for volumechange (only event that fires on "muted") events
//   if (remoteVideo.muted !== remotePreviousMuted) {
//     const icon = mutePartnerBtn.querySelector('i');
//     icon.className = remoteVideo.muted // Sync with PIP button clicks
//       ? 'fa fa-volume-mute'
//       : 'fa fa-volume-up';
//     remotePreviousMuted = remoteVideo.muted;
//   }
//   // For possible future use -> if (remoteVideo.volume !== remotePreviousVolume) {}
// };

// function addRemoteVideoEventListeners() {
//   if (!remoteVideo) return;
//   remoteVideo.addEventListener('volumechange', remoteVolumeChangeListener);
// }

// mutePartnerBtn.onclick = () => {
//   if (!remoteVideo) return;
//   remoteVideo.muted = !remoteVideo.muted;
// };

// // Toggle own video stream on/off
// videoSelfBtn.onclick = () => {
//   if (!localStream) return;

//   const videoTrack = localStream.getVideoTracks()[0];
//   if (videoTrack) {
//     videoTrack.enabled = !videoTrack.enabled;
//     const icon = videoSelfBtn.querySelector('i');
//     icon.className = videoTrack.enabled ? 'fa fa-video' : 'fa fa-video-slash';
//   }
// };

// // Switch camera (mobile)
// if (switchCameraSelfBtn) {
//   switchCameraSelfBtn.onclick = async () => {
//     if (!localStream) return;

//     try {
//       const videoTrack = localStream.getVideoTracks()[0];
//       const currentFacingMode = videoTrack.getSettings().facingMode;
//       const newFacingMode =
//         currentFacingMode === 'user' ? 'environment' : 'user';

//       // Stop current track
//       videoTrack.stop();

//       // Get new stream with opposite camera
//       const newStream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: newFacingMode },
//         audio: userMediaAudioConstraints,
//       });

//       // Replace track in peer connection
//       const newVideoTrack = newStream.getVideoTracks()[0];
//       if (pc) {
//         const sender = pc.getSenders().find((s) => s.track?.kind === 'video');
//         if (sender) {
//           sender.replaceTrack(newVideoTrack);
//         }
//       }

//       // Update local video
//       localStream = newStream;
//       localVideo.srcObject = newStream;
//     } catch (error) {
//       console.error('Failed to switch camera:', error);
//     }
//   };
// }

// // Fullscreen for local video
// fullscreenSelfBtn.onclick = () => {
//   if (localVideo.requestFullscreen) {
//     localVideo.requestFullscreen();
//   } else if (localVideo.webkitRequestFullscreen) {
//     localVideo.webkitRequestFullscreen();
//   }
// };

// // Fullscreen for remote video
// fullscreenPartnerBtn.onclick = () => {
//   if (remoteVideo.requestFullscreen) {
//     remoteVideo.requestFullscreen();
//   } else if (remoteVideo.webkitRequestFullscreen) {
//     remoteVideo.webkitRequestFullscreen();
//   }
// };
