// app.js
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
  syncStatus,
} from './elements.js';

import {
  togglePiP,
  setupNativePipListeners,
  setupLocalVideoPipListeners,
  closePiP,
} from './pip.js';

import {
  isYouTubeUrl,
  getYouTubeId,
  showYouTubePlayer,
  hideYouTubePlayer,
  getYTPlayer,
  getYTReady,
} from './youtube.js';

// ===== FIREBASE CONFIG  =====
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

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
// const storage = firebase.storage();

// ===== WEBRTC SETUP =====
const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

let localStream;
let peerConnection;
let roomId = null;
let isInitiator = false;
let isAudioMuted = false;
let isVideoOn = true;
let watchMode = false;
let isSyncing = false; // Prevent sync loops

// ===== INITIALIZE =====
async function init() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideo.srcObject = localStream;

    localVideo.srcObject = localStream;
    toggleMuteBtn.style.display = 'block';
    toggleVideoBtn.style.display = 'block';

    // Setup local video PiP listeners (for future use if disablePictureInPicture is removed)
    setupLocalVideoPipListeners(localVideo, pipBtn);

    if (import.meta.env.DEV) {
      toggleMute();
    }
    // Check if joining existing room
    const urlParams = new URLSearchParams(window.location.search);
    roomId = urlParams.get('room');

    if (roomId) {
      updateStatus('Connecting...');
      startChatBtn.style.display = 'none';
      await joinRoom(roomId);
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
  isInitiator = true;
  roomId = generateRoomId();

  const roomRef = db.ref(`rooms/${roomId}`);

  // Create peer connection
  peerConnection = new RTCPeerConnection(configuration);

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
    pipBtn.style.display = 'block';
    setupNativePipListeners(remoteVideo, pipBtn);
    updateStatus('Connected!');
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      roomRef.child('callerCandidates').push(event.candidate.toJSON());
    }
  };

  // Create offer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  await roomRef.set({
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  });

  // Listen for answer
  roomRef.child('answer').on('value', async (snapshot) => {
    const answer = snapshot.val();
    if (answer && !peerConnection.currentRemoteDescription) {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    }
  });

  // Listen for callee ICE candidates
  roomRef.child('calleeCandidates').on('child_added', (snapshot) => {
    const candidate = snapshot.val();
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  // Show link
  const url = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
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
  const roomRef = db.ref(`rooms/${roomId}`);
  const roomSnapshot = await roomRef.once('value');

  if (!roomSnapshot.exists()) {
    updateStatus('Error: Invalid room link');
    return;
  }

  peerConnection = new RTCPeerConnection(configuration);

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
    pipBtn.style.display = 'block';
    setupNativePipListeners(remoteVideo, pipBtn);
    updateStatus('Connected!');
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      roomRef.child('calleeCandidates').push(event.candidate.toJSON());
    }
  };

  // Get offer and set remote description
  const offer = roomSnapshot.val().offer;
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

  // Create answer
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  await roomRef.child('answer').set({
    type: answer.type,
    sdp: answer.sdp,
  });

  // Listen for caller ICE candidates
  roomRef.child('callerCandidates').on('child_added', (snapshot) => {
    const candidate = snapshot.val();
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  setupWatchSync();
  toggleModeBtn.style.display = 'block';

  hangUpBtn.disabled = false;
}

// ===== HANG UP =====
async function hangUp() {
  // Close any PiP windows first
  closePiP(pipBtn);

  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }

  if (remoteVideo.srcObject) {
    remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
  }

  // Clean up Firebase
  if (roomId && isInitiator) {
    await db.ref(`rooms/${roomId}`).remove();
  }

  // Reset UI
  roomId = null;
  isInitiator = false;
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
  watchMode = false;
  isAudioMuted = false;
  isVideoOn = true;

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
  const audioTrack = localStream.getAudioTracks()[0];
  if (audioTrack) {
    isAudioMuted = !isAudioMuted;
    audioTrack.enabled = !isAudioMuted;
    toggleMuteBtn.textContent = isAudioMuted ? 'Unmute Mic' : 'Mute Mic';
  }
}

function toggleVideo() {
  const videoTrack = localStream.getVideoTracks()[0];
  if (videoTrack) {
    isVideoOn = !isVideoOn;
    videoTrack.enabled = isVideoOn;
    toggleVideoBtn.textContent = isVideoOn ? 'Turn Video Off' : 'Turn Video On';
  }
}

function toggleWatchMode() {
  watchMode = !watchMode;

  if (watchMode) {
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
  if (isYouTubeUrl(url)) {
    const vid = getYouTubeId(url);
    showYouTubePlayer(vid, sharedVideo, onYouTubeStateChange);
    syncStatus.textContent = 'YouTube video sent to partner...';
  } else {
    hideYouTubePlayer(sharedVideo);
    sharedVideo.src = url;
    syncStatus.textContent = 'Video sent to partner...';
  }
  // Notify partner
  if (roomId) {
    db.ref(`rooms/${roomId}/stream`).set({ url });
  }
}

// --- YOUTUBE SYNC ---
function onYouTubeStateChange(event) {
  const ytPlayer = getYTPlayer();
  const ytReady = getYTReady();
  if (!roomId || !ytReady || !ytPlayer) return;
  // 1=play, 2=pause
  if (event.data === YT.PlayerState.PLAYING) {
    db.ref(`rooms/${roomId}/stream`).update({
      playing: true,
      time: ytPlayer.getCurrentTime(),
    });
  } else if (event.data === YT.PlayerState.PAUSED) {
    db.ref(`rooms/${roomId}/stream`).update({
      playing: false,
      time: ytPlayer.getCurrentTime(),
    });
  }
}

function acceptSharedVideo() {
  const url = streamUrlInput.value;
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

function setupWatchSync() {
  if (!roomId) return;
  const roomRef = db.ref(`rooms/${roomId}`);

  // Listen for stream URL changes
  roomRef.child('stream/url').on('value', (snapshot) => {
    const url = snapshot.val();
    if (url && url !== streamUrlInput.value) {
      streamUrlInput.value = url;
      syncStatus.innerHTML = `Partner shared a video: <button onclick="acceptSharedVideo()" style="margin-left: 10px; padding: 5px 15px;">✓ Accept & Load</button>`;
      syncStatus.style.background = '#2196f3';
    }
  });

  // Listen for play/pause
  roomRef.child('stream/playing').on('value', async (snapshot) => {
    if (isSyncing) return;
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
  roomRef.child('stream/time').on('value', (snapshot) => {
    if (isSyncing) return;
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
  sharedVideo.addEventListener('play', () => {
    if (roomId && !isSyncing) {
      isSyncing = true;
      db.ref(`rooms/${roomId}/stream`).update({
        playing: true,
        time: sharedVideo.currentTime,
      });
      setTimeout(() => (isSyncing = false), 1000);
    }
  });
  sharedVideo.addEventListener('pause', () => {
    if (roomId && !isSyncing) {
      isSyncing = true;
      db.ref(`rooms/${roomId}/stream`).update({
        playing: false,
        time: sharedVideo.currentTime,
      });
      setTimeout(() => (isSyncing = false), 1000);
    }
  });
  sharedVideo.addEventListener('seeked', () => {
    if (roomId && !isSyncing) {
      isSyncing = true;
      db.ref(`rooms/${roomId}/stream`).update({
        time: sharedVideo.currentTime,
      });
      setTimeout(() => (isSyncing = false), 1000);
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

// ===== UPLOAD VIDEO ===== // Temporarily disabled since Firebase storage costs // Todo: try IDB with fb sync ?

// uploadBtn.addEventListener('click', () => {
//   videoFileInput.click();
// });

// videoFileInput.addEventListener('change', async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   // NOTE: No check for file size - will fail if over Firebase limit

//   uploadProgress.style.display = 'block';
//   uploadProgress.textContent = 'Uploading 0%...';
// });

// const storageRef = storage.ref(`videos/${Date.now()}_${file.name}`);
// const uploadTask = storageRef.put(file);

// uploadTask.on(
//   'state_changed',
//   (snapshot) => {
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     uploadProgress.textContent = `Uploading ${Math.round(progress)}%...`;
//   },
//   (error) => {
//     // Firebase limit exceeded or other error
//     if (error.code === 'storage/quota-exceeded') {
//       uploadProgress.textContent = '❌ Storage quota exceeded (5GB limit)';
//     } else if (error.code === 'storage/unauthorized') {
//       uploadProgress.textContent =
//         '❌ Permission denied - check Firebase rules';
//     } else {
//       uploadProgress.textContent = `❌ Upload failed: ${error.message}`;
//     }
//     uploadProgress.style.color = '#f44336';
//     console.error(error);
//   },
//   async () => {
//     // Success callback
//     const url = await uploadTask.snapshot.ref.getDownloadURL();
//     streamUrlInput.value = url;
//     uploadProgress.style.display = 'none';
//     uploadProgress.style.color = '#fff'; // Reset color

//     sharedVideo.src = url;
//     syncStatus.textContent = 'Upload complete! Shared with partner.';

//     if (roomId) {
//       db.ref(`rooms/${roomId}/stream`).set({ url });
//     }
//   }
// );
