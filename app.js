// app.js
import {
  togglePiP,
  setupNativePipListeners,
  setupLocalVideoPipListeners,
  closePiP,
} from './pip.js';

// ===== FIREBASE CONFIG  =====
const firebaseConfig = {
  apiKey: 'AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA',
  authDomain: 'vidu-aae11.firebaseapp.com',
  databaseURL:
    'https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'vidu-aae11',
  storageBucket: 'vidu-aae11.firebasestorage.app',
  messagingSenderId: '765724787439',
  appId: '1:765724787439:web:61a3b5dd538149564c911a',
  measurementId: 'G-EGJ53HLGY4',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();

// ===== WEBRTC SETUP =====
let localStream;
let peerConnection;
let roomId = null;
let isInitiator = false;
let isAudioMuted = false;
let isVideoOn = true;

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startChatBtn = document.getElementById('startChat');
const hangUpBtn = document.getElementById('hangUp');
const statusDiv = document.getElementById('status');
const linkContainer = document.getElementById('linkContainer');
const shareLink = document.getElementById('shareLink');
const copyLinkBtn = document.getElementById('copyLink');
const pipBtn = document.getElementById('pipBtn');
const toggleMuteBtn = document.getElementById('toggleMute');
const toggleVideoBtn = document.getElementById('toggleVideo');
const toggleModeBtn = document.getElementById('toggleMode');
const watchContainer = document.getElementById('watchContainer');
const videoContainer = document.querySelector('.video-container');
const streamUrlInput = document.getElementById('streamUrl');
const loadStreamBtn = document.getElementById('loadStream');
const sharedVideo = document.getElementById('sharedVideo');
const syncStatus = document.getElementById('syncStatus');
const videoFileInput = document.getElementById('videoFile');
const uploadProgress = document.getElementById('uploadProgress');

// const uploadBtn = document.getElementById('uploadBtn'); // Temporarily disabled

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
    toggleMuteBtn.textContent = isAudioMuted ? 'Unmute Audio' : 'Mute Audio';
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

  sharedVideo.src = url;
  syncStatus.textContent = 'Video sent to partner...';

  // Notify partner
  if (roomId) {
    db.ref(`rooms/${roomId}/stream`).set({ url });
  }
}

window.acceptSharedVideo = function () {
  sharedVideo.src = streamUrlInput.value;
  syncStatus.textContent = 'Loading shared video...';
  syncStatus.style.background = '#2a2a2a';
};

function setupWatchSync() {
  if (!roomId) return;

  const roomRef = db.ref(`rooms/${roomId}`);

  // Listen for stream URL changes
  roomRef.child('stream/url').on('value', (snapshot) => {
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
  roomRef.child('stream/playing').on('value', async (snapshot) => {
    if (isSyncing) return;
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
  roomRef.child('stream/time').on('value', (snapshot) => {
    if (isSyncing) return;
    const time = snapshot.val();
    if (time !== null && Math.abs(sharedVideo.currentTime - time) > 2) {
      sharedVideo.currentTime = time;
      syncStatus.textContent = `Syncing to ${Math.floor(time)}s`;
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
