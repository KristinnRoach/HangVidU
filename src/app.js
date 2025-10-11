// app.js

import './style.css';

import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  child,
  onValue,
  onChildAdded,
  remove,
} from 'firebase/database';
import { getStorage } from 'firebase/storage';

import {
  localVideo,
  remoteVideo,
  sharedVideo,
  startChatBtn,
  hangUpBtn,
  copyLinkBtn,
  pipBtn,
  toggleMuteBtn,
  toggleVideoBtn,
  toggleModeBtn,
  loadStreamBtn,
  statusDiv,
  linkContainer,
  watchContainer,
  videoContainer,
  shareLink,
  streamUrlInput,
  videoFileInput,
  syncStatus,
  uploadProgress,
} from './elements.js';

import {
  togglePiP,
  setupNativePipListeners,
  setupLocalVideoPipListeners,
  closePiP,
} from './pip.js';

// ===== CONFIGURATION =====
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const webRTCConfig = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

// ===== FIREBASE SERVICES =====
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

// ===== STATE =====
const state = {
  localStream: null,
  peerConnection: null,
  roomId: null,
  isInitiator: false,
  isAudioMuted: false,
  isVideoOn: true,
  watchMode: false,
  isSyncing: false,
};

// ===== INITIALIZE =====
async function init() {
  try {
    state.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideo.srcObject = state.localStream;
    toggleMuteBtn.style.display = 'block';
    toggleVideoBtn.style.display = 'block';

    setupLocalVideoPipListeners(localVideo, pipBtn);

    // Check if joining existing room
    const urlParams = new URLSearchParams(window.location.search);
    state.roomId = urlParams.get('room');

    if (state.roomId) {
      updateStatus('Connecting...');
      startChatBtn.style.display = 'none';
      await joinRoom(state.roomId);
    } else {
      updateStatus('Ready. Click to generate video chat link.');
    }
  } catch (error) {
    console.error('Media error:', error);
    updateStatus('Error: Could not access camera/mic. Check permissions.');
  }
}

// ===== CREATE ROOM (Person A) =====
async function createRoom() {
  state.isInitiator = true;
  state.roomId = generateRoomId();

  const roomRef = ref(db, `rooms/${state.roomId}`);

  // Create peer connection
  state.peerConnection = new RTCPeerConnection(webRTCConfig);

  state.localStream.getTracks().forEach((track) => {
    state.peerConnection.addTrack(track, state.localStream);
  });

  state.peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
    pipBtn.style.display = 'block';
    setupNativePipListeners(remoteVideo, pipBtn);
    updateStatus('Connected!');
  };

  state.peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const candidatesRef = ref(db, `rooms/${state.roomId}/callerCandidates`);
      push(candidatesRef, event.candidate.toJSON());
    }
  };

  // Create offer
  const offer = await state.peerConnection.createOffer();
  await state.peerConnection.setLocalDescription(offer);

  await set(roomRef, {
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  });

  // Listen for answer
  const answerRef = ref(db, `rooms/${state.roomId}/answer`);
  onValue(answerRef, async (snapshot) => {
    const answer = snapshot.val();
    if (answer && !state.peerConnection.currentRemoteDescription) {
      await state.peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    }
  });

  // Listen for callee ICE candidates
  const calleeCandidatesRef = ref(db, `rooms/${state.roomId}/calleeCandidates`);
  onChildAdded(calleeCandidatesRef, (snapshot) => {
    const candidate = snapshot.val();
    state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  // Show link
  const url = `${window.location.origin}${window.location.pathname}?room=${state.roomId}`;
  shareLink.value = url;
  linkContainer.style.display = 'block';
  startChatBtn.disabled = true;
  hangUpBtn.disabled = false;

  setupWatchSync();
  toggleModeBtn.style.display = 'block';

  updateStatus('Link ready! Waiting for partner...');
}

// ===== JOIN ROOM (Person B) =====
async function joinRoom(roomId) {
  const roomRef = ref(db, `rooms/${roomId}`);
  const roomSnapshot = await get(roomRef);

  if (!roomSnapshot.exists()) {
    updateStatus('Error: Invalid room link');
    return;
  }

  state.peerConnection = new RTCPeerConnection(webRTCConfig);

  state.localStream.getTracks().forEach((track) => {
    state.peerConnection.addTrack(track, state.localStream);
  });

  state.peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
    pipBtn.style.display = 'block';
    setupNativePipListeners(remoteVideo, pipBtn);
    updateStatus('Connected!');
  };

  state.peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const candidatesRef = ref(db, `rooms/${state.roomId}/calleeCandidates`);
      push(candidatesRef, event.candidate.toJSON());
    }
  };

  // Get offer and set remote description
  const offer = roomSnapshot.val().offer;
  await state.peerConnection.setRemoteDescription(
    new RTCSessionDescription(offer)
  );

  // Create answer
  const answer = await state.peerConnection.createAnswer();
  await state.peerConnection.setLocalDescription(answer);

  const answerRef = ref(db, `rooms/${state.roomId}/answer`);
  await set(answerRef, {
    type: answer.type,
    sdp: answer.sdp,
  });

  // Listen for caller ICE candidates
  const callerCandidatesRef = ref(db, `rooms/${state.roomId}/callerCandidates`);
  onChildAdded(callerCandidatesRef, (snapshot) => {
    const candidate = snapshot.val();
    state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  setupWatchSync();
  toggleModeBtn.style.display = 'block';

  hangUpBtn.disabled = false;
}

// ===== HANG UP =====
async function hangUp() {
  // Close any PiP windows first
  closePiP(pipBtn);

  if (state.peerConnection) {
    state.peerConnection.close();
    state.peerConnection = null;
  }

  if (remoteVideo.srcObject) {
    remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
  }

  // Clean up Firebase
  if (state.roomId && state.isInitiator) {
    const roomRef = ref(db, `rooms/${state.roomId}`);
    await remove(roomRef);
  }

  // Reset UI
  state.roomId = null;
  state.isInitiator = false;
  startChatBtn.disabled = false;
  startChatBtn.style.display = 'block';
  hangUpBtn.disabled = true;
  linkContainer.style.display = 'none';
  toggleMuteBtn.style.display = 'none';
  toggleVideoBtn.style.display = 'none';
  toggleModeBtn.style.display = 'none';
  watchContainer.style.display = 'none';
  videoContainer.style.display = 'flex';
  shareLink.value = '';
  sharedVideo.src = '';
  streamUrlInput.value = '';
  syncStatus.textContent = '';
  state.watchMode = false;
  state.isAudioMuted = false;
  state.isVideoOn = true;

  window.history.replaceState({}, document.title, window.location.pathname);

  updateStatus('Disconnected. Ready for new chat.');
}

// ===== HELPERS =====
function generateRoomId() {
  return Math.random().toString(36).substring(2, 15);
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => (copyLinkBtn.textContent = 'Copy Link'), 2000);
  } catch (err) {
    shareLink.select();
    document.execCommand('copy');
  }
}
// ===== Picture-in-Picture =====
pipBtn.addEventListener('click', async () => {
  await togglePiP(remoteVideo, pipBtn, updateStatus);
});

function updateStatus(message) {
  statusDiv.textContent = message;
}

function toggleMute() {
  const audioTrack = state.localStream.getAudioTracks()[0];
  if (audioTrack) {
    state.isAudioMuted = !state.isAudioMuted;
    audioTrack.enabled = !state.isAudioMuted;
    toggleMuteBtn.textContent = state.isAudioMuted
      ? 'Unmute Audio'
      : 'Mute Audio';
  }
}

function toggleVideo() {
  const videoTrack = state.localStream.getVideoTracks()[0];
  if (videoTrack) {
    state.isVideoOn = !state.isVideoOn;
    videoTrack.enabled = state.isVideoOn;
    toggleVideoBtn.textContent = state.isVideoOn
      ? 'Turn Video Off'
      : 'Turn Video On';
  }
}

function toggleWatchMode() {
  state.watchMode = !state.watchMode;

  if (state.watchMode) {
    // Switch to watch mode
    videoContainer.style.display = 'none';
    watchContainer.style.display = 'block';
    toggleModeBtn.textContent = 'Switch to Video Chat';
    syncStatus.textContent = 'Paste the same stream URL as your partner';
  } else {
    // Switch back to video chat
    videoContainer.style.display = 'flex';
    watchContainer.style.display = 'none';
    toggleModeBtn.textContent = 'Switch to Watch Mode';
    sharedVideo.src = '';
    streamUrlInput.value = '';
  }
}

function loadStream() {
  const url = streamUrlInput.value.trim();
  if (!url) {
    syncStatus.textContent = 'Please enter a stream URL';
    return;
  }

  sharedVideo.src = url;
  syncStatus.textContent = 'Video sent to partner...';

  // Notify partner
  if (state.roomId) {
    const streamRef = ref(db, `rooms/${state.roomId}/stream`);
    set(streamRef, { url });
  }
}

window.acceptSharedVideo = function () {
  sharedVideo.src = streamUrlInput.value;
  syncStatus.textContent = 'Loading shared video...';
  syncStatus.style.background = '#2a2a2a';
};

function setupWatchSync() {
  if (!state.roomId) return;

  // Listen for stream URL changes
  const streamUrlRef = ref(db, `rooms/${state.roomId}/stream/url`);
  onValue(streamUrlRef, (snapshot) => {
    const url = snapshot.val();
    if (url && url !== streamUrlInput.value && url !== sharedVideo.src) {
      // Show accept prompt instead of auto-loading
      streamUrlInput.value = url;
      syncStatus.innerHTML = `
      Partner shared a video: 
      <button onclick="acceptSharedVideo()" style="margin-left: 10px; padding: 5px 15px;">
        ✓ Accept & Load
      </button>
    `;
      syncStatus.style.background = '#2196f3';
    }
  });

  // Listen for play/pause
  const playingRef = ref(db, `rooms/${state.roomId}/stream/playing`);
  onValue(playingRef, async (snapshot) => {
    if (state.isSyncing) return;
    const playing = snapshot.val();
    if (playing === true && sharedVideo.paused) {
      try {
        await sharedVideo.play();
        syncStatus.textContent = 'Playing in sync';
      } catch (error) {
        // Android autoplay blocked - need user interaction
        syncStatus.textContent = '▶️ Tap the video to start playing';
        syncStatus.style.background = '#FF5722';
        syncStatus.style.fontSize = '16px';

        // Clear the warning once they manually play
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
  });

  // Listen for seek
  const timeRef = ref(db, `rooms/${state.roomId}/stream/time`);
  onValue(timeRef, (snapshot) => {
    if (state.isSyncing) return;
    const time = snapshot.val();
    if (time !== null && Math.abs(sharedVideo.currentTime - time) > 2) {
      sharedVideo.currentTime = time;
      syncStatus.textContent = `Syncing to ${Math.floor(time)}s`;
    }
  });

  // Send local events to Firebase
  sharedVideo.addEventListener('play', () => {
    if (state.roomId && !state.isSyncing) {
      state.isSyncing = true;
      const streamRef = ref(db, `rooms/${state.roomId}/stream`);
      set(streamRef, {
        playing: true,
        time: sharedVideo.currentTime,
        url: sharedVideo.src,
      });
      setTimeout(() => (state.isSyncing = false), 1000);
    }
  });

  sharedVideo.addEventListener('pause', () => {
    if (state.roomId && !state.isSyncing) {
      state.isSyncing = true;
      const streamRef = ref(db, `rooms/${state.roomId}/stream`);
      set(streamRef, {
        playing: false,
        time: sharedVideo.currentTime,
        url: sharedVideo.src,
      });
      setTimeout(() => (state.isSyncing = false), 1000);
    }
  });

  sharedVideo.addEventListener('seeked', () => {
    if (state.roomId && !state.isSyncing) {
      state.isSyncing = true;
      const streamRef = ref(db, `rooms/${state.roomId}/stream`);
      set(streamRef, {
        playing: !sharedVideo.paused,
        time: sharedVideo.currentTime,
        url: sharedVideo.src,
      });
      setTimeout(() => (state.isSyncing = false), 1000);
    }
  });

  sharedVideo.addEventListener('loadeddata', () => {
    syncStatus.textContent = 'Video loaded! Press play to start.';
  });

  sharedVideo.addEventListener('waiting', () => {
    syncStatus.textContent = 'Buffering...';
  });

  sharedVideo.addEventListener('playing', () => {
    syncStatus.textContent = 'Playing in sync';
  });
}

// ===== UPLOAD VIDEO =====
// TODO: Implement file transfer via WebRTC DataChannel or GitHub CDN
// See TODO.md for implementation options

// ===== EVENT LISTENERS =====

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 'p' && remoteVideo.srcObject) {
    e.preventDefault();
    togglePiP(remoteVideo, pipBtn, updateStatus);
  }
});

startChatBtn.addEventListener('click', createRoom);
hangUpBtn.addEventListener('click', hangUp);
copyLinkBtn.addEventListener('click', copyLink);
toggleMuteBtn.addEventListener('click', toggleMute);
toggleVideoBtn.addEventListener('click', toggleVideo);
toggleModeBtn.addEventListener('click', toggleWatchMode);
loadStreamBtn.addEventListener('click', loadStream);

init();
