// src/app.js
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

  // Todo:
  mutePartnerBtn,
  fullscreenPartnerBtn,
  muteSelfBtn,
  fullscreenSelfBtn,
} from './lib/ui/elements.js';

import { loadState, saveState, clearState } from './lib/storage.js';

import { setConnectionStatus } from './lib/connectionStatus.js';

import { createRoom, joinRoom, removeRoom } from './lib/roomService.js';
import { db } from './lib/firebase.js';
import { handleMediaError } from './lib/error-handling.js';
import * as ui from './lib/ui/ui.js';
import { setupEventListeners } from './lib/ui/events.js';
import {
  handlePipToggleBtn,
  addRemoteVideoPipListeners,
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

import '@fortawesome/fontawesome-free/css/all.min.css';

// ===== Config =====
const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

// ====== STATE ======

let localStream;
let peerConnection;
let roomId = null;
let wasConnected = false;

let isInitiator = false;
let isAudioMuted = false;
let isVideoOn = true;
let currentFacingMode = 'user'; // 'user' = front, 'environment' = back
let watchMode = false;
let isSyncing = false; // Prevent sync loops

function saveCurrentState() {
  saveState({
    roomId,
    isInitiator,
    isAudioMuted,
    isVideoOn,
    currentFacingMode,
    watchMode,
    wasConnected,
    streamUrl: streamUrlInput.value,
  });
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

    if (await hasFrontAndBackCameras()) {
      switchCameraBtn.style.display = 'block';
    } else {
      switchCameraBtn.style.display = 'none';
    }

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
        saveCurrentState();
      },
      handleToggleMute: toggleMuteSelfMic,
      handleToggleVideo: toggleVideo,
      handleToggleMode: toggleWatchMode,
      handleLoadStream: loadStream,
      handlePipToggle: () =>
        handlePipToggleBtn(remoteVideo, pipBtn, updateStatus),
      updateStatus,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const urlRoomId = urlParams.get('room');
    const savedState = loadState();

    const decision = determineRoomAction({ urlRoomId, savedState });
    roomId = decision.roomId;

    if (decision.action === 'join') {
      updateStatus('Connecting...');
      startChatBtn.style.display = 'none';
      restoreUIState(savedState);
      await joinChatRoom(roomId);
    } else {
      updateStatus('Ready. Click to generate video chat link.');
    }

    if (import.meta.env.DEV) {
      toggleMuteSelfMic();
    }
  } catch (error) {
    handleMediaError(error);
  }
}

function determineRoomAction({ urlRoomId, savedState }) {
  const roomId = urlRoomId; // NOTE:  Disabled returning to saved room until properly implemented. //   || savedState?.roomId;
  if (!roomId) return { action: 'idle' };
  return { action: 'join', roomId };
}

function restoreUIState(savedState) {
  if (!savedState) return;

  isAudioMuted = savedState.isAudioMuted;
  isVideoOn = savedState.isVideoOn;
  currentFacingMode = savedState.currentFacingMode;
  isInitiator = savedState.isInitiator;
  watchMode = savedState.watchMode || false;
  wasConnected = savedState.wasConnected || false;

  if (!isVideoOn) toggleVideo();
  if (isAudioMuted) toggleMuteSelfMic();
  if (savedState.watchMode && !watchMode) {
    toggleWatchMode();
    if (savedState.streamUrl) streamUrlInput.value = savedState.streamUrl;
  }
}

function setupRemoteStream(event) {
  // Only set srcObject if not already set to this stream
  if (remoteVideo.srcObject !== event.streams[0]) {
    remoteVideo.srcObject = event.streams[0];
    pipBtn.style.display = 'block';
    addRemoteVideoPipListeners(remoteVideo, pipBtn);
    wasConnected = true;
    if (import.meta.env.DEV) {
      console.log('✅ Connection established, wasConnected =', wasConnected);
    }
    saveCurrentState();
    updateStatus('Connected!');
    if (remoteVideo.paused && remoteVideo.srcObject) {
      remoteVideo.play().catch((e) => {
        if (import.meta.env.DEV) {
          console.warn('remoteVideo.play() failed:', e);
        }
      });
    }
  } else {
    if (import.meta.env.DEV) {
      console.log('Duplicate ontrack event ignored');
    }
  }
}

// ===== CREATE ROOM (Person A) =====
async function initiateChatRoom() {
  isInitiator = true;
  if (!roomId) {
    roomId = generateRoomId();
  }

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

  console.log('[DEBUG] Assigning peerConnection.ontrack in initiateChatRoom');
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

  const role = 'initiator';
  setConnectionStatus(roomId, role, 'connected');

  saveCurrentState();

  updateStatus('Link ready! Waiting for partner...');
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

  console.log('[DEBUG] Assigning peerConnection.ontrack in joinChatRoom');
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

  const role = 'joiner';
  setConnectionStatus(roomId, role, 'connected');

  saveCurrentState();
}

// ===== HANG UP =====
async function hangUp() {
  // Close any PiP windows first
  closePiP(pipBtn);

  cleanupFirebaseListeners();

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
  wasConnected = false;

  window.history.replaceState({}, document.title, window.location.pathname);
  clearState();
  updateStatus('Disconnected. Ready for new chat.');
}

// ===== HELPERS =====
function generateRoomId() {
  return Math.random().toString(36).substring(2, 15);
}

function cleanupFirebaseListeners() {
  if (!roomId) return;

  const roomRef = db.ref(`rooms/${roomId}`);
  roomRef.child('answer').off();
  roomRef.child('offer').off();
  roomRef.child('callerCandidates').off();
  roomRef.child('calleeCandidates').off();
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

function toggleMuteSelfMic() {
  isAudioMuted = ui.toggleMuteMic(localStream, toggleMuteBtn, isAudioMuted);
  // Update the hover-button icon for muteSelfBtn
  const icon = muteSelfBtn.querySelector('i');
  if (icon) {
    icon.className = isAudioMuted
      ? 'fa fa-microphone-slash'
      : 'fa fa-microphone';
  }
  // Ensure toggleMuteBtn stays in sync
  toggleMuteBtn.textContent = isAudioMuted ? 'Unmute Mic' : 'Mute Mic';
  saveCurrentState();
}

function toggleVideo() {
  isVideoOn = ui.toggleVideo(localStream, toggleVideoBtn, isVideoOn);
  saveCurrentState();
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
  saveCurrentState();
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

  saveCurrentState();
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

// Add event handlers for fullscreen and mute buttons
fullscreenPartnerBtn?.addEventListener('click', () => {
  if (remoteVideo.requestFullscreen) {
    remoteVideo.requestFullscreen();
  } else if (remoteVideo.webkitRequestFullscreen) {
    // Safari
    remoteVideo.webkitRequestFullscreen();
  } else if (remoteVideo.msRequestFullscreen) {
    // IE11
    remoteVideo.msRequestFullscreen();
  }
});

fullscreenSelfBtn?.addEventListener('click', () => {
  if (localVideo.requestFullscreen) {
    localVideo.requestFullscreen();
  } else if (localVideo.webkitRequestFullscreen) {
    // Safari
    localVideo.webkitRequestFullscreen();
  } else if (localVideo.msRequestFullscreen) {
    // IE11
    localVideo.msRequestFullscreen();
  }
});

muteSelfBtn?.addEventListener('click', () => toggleMuteSelfMic());

mutePartnerBtn?.addEventListener('click', () => {
  const audioTrack = remoteVideo.srcObject?.getAudioTracks()[0];
  if (audioTrack) {
    audioTrack.enabled = !audioTrack.enabled;
    const icon = mutePartnerBtn.querySelector('i');
    if (icon) {
      icon.className = audioTrack.enabled
        ? 'fa fa-volume-mute'
        : 'fa fa-volume-up';
    }
  }
});

function setupTouchControls(wrapper) {
  let hideTimeout;

  function showControls() {
    wrapper.classList.add('show-controls');
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      wrapper.classList.remove('show-controls');
    }, 3000); // 3 seconds auto-hide
  }

  // Listen to both 'touchstart' and 'click'
  wrapper.addEventListener('touchstart', showControls);
  wrapper.addEventListener('click', (e) => {
    // Prevent play/pause if clicking controls
    if (e.target.closest('.hover-controls')) return;
    showControls();
  });

  // keep controls onscreen if interacting with buttons
  wrapper
    .querySelector('.hover-controls')
    .addEventListener('mouseenter', () => clearTimeout(hideTimeout));

  // Hide controls when leaving the controller area
  wrapper
    .querySelector('.hover-controls')
    .addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        wrapper.classList.remove('show-controls');
      }, 2000);
    });
}

document.querySelectorAll('.video-wrapper').forEach(setupTouchControls);

init();
