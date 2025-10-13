// app.js
import {
  localVideo,
  remoteVideo,
  sharedVideo,
  startChatBtn,
  hangUpBtn,
  copyLinkBtn,
  pipBtn,
  switchCameraBtn,
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
} from './lib/ui/elements.js';

import { createRoom, joinRoom, removeRoom } from './lib/roomService.js';
import { db } from './lib/firebase.js';
import * as ui from './lib/ui/ui.js';
import { setupEventListeners } from './lib/ui/events.js';
import {
  handlePipToggleBtn,
  addRemoteVideoPipListeners,
  addLocalVideoPipListeners,
  closePiP,
} from './lib/ui/pip.js';

import {
  isYouTubeUrl,
  getYouTubeId,
  showYouTubePlayer,
  hideYouTubePlayer,
  getYTPlayer,
  getYTReady,
} from './lib/video/youtube.js';

import { hasFrontAndBackCameras, switchCamera } from './lib/devices.js';

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
let currentFacingMode = 'user'; // 'user' = front, 'environment' = back
let watchMode = false;
let isSyncing = false; // Prevent sync loops

// ===== LOCAL STORAGE =====
const STORAGE_KEY = 'hangvidu_session';

function saveState() {
  const state = {
    roomId,
    isInitiator,
    isAudioMuted,
    isVideoOn,
    currentFacingMode,
    watchMode,
    streamUrl: streamUrlInput.value,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const state = JSON.parse(stored);
    // Expire after 24 hours
    if (Date.now() - state.timestamp > 24 * 60 * 60 * 1000) {
      clearState();
      return null;
    }
    return state;
  } catch (e) {
    clearState();
    return null;
  }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

// ===== INITIALIZE =====
async function init() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideo.srcObject = localStream;

    toggleMuteBtn.style.display = 'block';
    toggleVideoBtn.style.display = 'block';

    // Display switch camera button only if device has both front and back cameras
    if (await hasFrontAndBackCameras()) {
      switchCameraBtn.style.display = 'block';
    } else {
      switchCameraBtn.style.display = 'none';
    }
    // addLocalVideoPipListeners(localVideo, pipBtn);

    setupEventListeners({
      startChatBtn,
      hangUpBtn,
      copyLinkBtn,
      switchCameraBtn,
      toggleMuteBtn,
      toggleVideoBtn,
      toggleModeBtn,
      loadStreamBtn,
      pipBtn,
      remoteVideo,
      handleStartChat: initiateChatRoom,
      handleHangUp: hangUp,
      handleCopyLink: copyLink,
      handleSwitchCamera: async () => {
        currentFacingMode = await switchCamera({
          localStream,
          currentFacingMode,
          localVideo,
          peerConnection,
        });
        saveState();
      },
      handleToggleMute: toggleMute,
      handleToggleVideo: toggleVideo,
      handleToggleMode: toggleWatchMode,
      handleLoadStream: loadStream,
      handlePipToggle: () =>
        handlePipToggleBtn(remoteVideo, pipBtn, updateStatus),
      updateStatus,
    });

    if (import.meta.env.DEV) {
      toggleMute();
    }

    // Try to restore from localStorage first
    const savedState = loadState();
    const urlParams = new URLSearchParams(window.location.search);
    const urlRoomId = urlParams.get('room');

    // URL takes precedence over saved state
    roomId = urlRoomId || savedState?.roomId;

    if (roomId) {
      updateStatus('Connecting...');
      startChatBtn.style.display = 'none';

      // Restore UI state
      if (savedState) {
        isAudioMuted = savedState.isAudioMuted;
        isVideoOn = savedState.isVideoOn;
        currentFacingMode = savedState.currentFacingMode;

        if (!isVideoOn) toggleVideo();
        if (isAudioMuted) toggleMute();
      }

      await joinChatRoom(roomId);

      // Restore watch mode state after connection
      if (savedState?.watchMode && !watchMode) {
        toggleWatchMode();
        if (savedState.streamUrl) streamUrlInput.value = savedState.streamUrl;
      }
    } else {
      updateStatus('Ready. Click to generate video chat link.');
    }
  } catch (error) {
    console.error('Media error:', error);
    updateStatus('Error: Could not access camera/mic. Check permissions.');
  }
}

function setupRemoteStream(event) {
  remoteVideo.srcObject = event.streams[0];
  pipBtn.style.display = 'block';
  addRemoteVideoPipListeners(remoteVideo, pipBtn);
  updateStatus('Connected!');
}

// ===== CREATE ROOM (Person A) =====
async function initiateChatRoom() {
  isInitiator = true;
  roomId = generateRoomId();

  // Create peer connection
  peerConnection = new RTCPeerConnection(configuration);

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  // Create offer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // Create room in DB and get ref
  const roomRef = await createRoom(roomId, offer);

  peerConnection.ontrack = setupRemoteStream;

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      roomRef.child('callerCandidates').push(event.candidate.toJSON());
    }
  };

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

  saveState();
}

// ===== JOIN ROOM (Person B) =====
async function joinChatRoom(roomId) {
  // Join room in DB and get ref/snapshot
  const { roomRef, roomSnapshot } = await joinRoom(roomId);

  if (!roomSnapshot.exists()) {
    updateStatus('Error: Invalid room link');
    return;
  }

  peerConnection = new RTCPeerConnection(configuration);

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = setupRemoteStream;

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

  saveState();
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
    await removeRoom(roomId);
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

  clearState();
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

function updateStatus(message) {
  ui.updateStatus(statusDiv, message);
}

function toggleMute() {
  isAudioMuted = ui.toggleMute(localStream, toggleMuteBtn, isAudioMuted);
  saveState();
}

function toggleVideo() {
  isVideoOn = ui.toggleVideo(localStream, toggleVideoBtn, isVideoOn);
  saveState();
}

function toggleWatchMode() {
  watchMode = ui.toggleWatchMode(
    watchMode,
    videoContainer,
    watchContainer,
    toggleModeBtn,
    sharedVideo,
    streamUrlInput,
    syncStatus
  );
  saveState();
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

  saveState();
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
      syncStatus.innerHTML = `Partner shared a video: <button id="accept-shared-video" style="margin-left: 10px; padding: 5px 15px;">✓ Accept & Load</button>`;
      const btn = document.getElementById('accept-shared-video');
      btn.addEventListener('click', acceptSharedVideo);
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

init();
