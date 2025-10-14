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
  toggleWatchMode as toggleWatchModeSync,
  loadStream as loadStreamSync,
  setupWatchSync,
  getWatchMode,
} from './lib/watch-sync.js';

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

function saveCurrentState() {
  saveState({
    roomId,
    isInitiator,
    isAudioMuted,
    isVideoOn,
    currentFacingMode,
    watchMode: getWatchMode(),
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
  wasConnected = savedState.wasConnected || false;

  if (!isVideoOn) toggleVideo();
  if (isAudioMuted) toggleMuteSelfMic();
  if (savedState.watchMode && !getWatchMode()) {
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

  setupWatchSync({ roomId, sharedVideo, streamUrlInput, syncStatus });
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

  setupWatchSync({ roomId, sharedVideo, streamUrlInput, syncStatus });
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
  toggleWatchModeSync({
    videoContainer,
    watchContainer,
    toggleModeBtn,
    sharedVideo,
    streamUrlInput,
    syncStatus,
  });
  saveCurrentState();
}

function loadStream() {
  const url = streamUrlInput.value.trim();
  loadStreamSync({ roomId, url, sharedVideo, syncStatus });
  saveCurrentState();
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

  const controls = wrapper.querySelector('.hover-controls');

  // keep controls onscreen if interacting with buttons
  controls.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
  controls.addEventListener('touchstart', () => clearTimeout(hideTimeout), {
    passive: true,
  });
  controls.addEventListener('click', () => clearTimeout(hideTimeout));

  // Hide controls when leaving the controller area
  controls.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      wrapper.classList.remove('show-controls');
    }, 2000);
  });
}

document.querySelectorAll('.video-wrapper').forEach(setupTouchControls);

init();
