// ============================================================================
// HANGVIDU - P2P VIDEO CHAT WITH WATCH-TOGETHER MODE
// ============================================================================

import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  ref,
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
  removeAllFirebaseListeners,
  rtdb,
  trackFirebaseListener,
} from './firebase.js';

import { closeOnClickOutside } from './utils/clickOutside';
import {
  isHidden,
  showElement,
  hideElement,
  isElementInPictureInPicture,
} from './utils/ui-utils';
import { updateStatus } from './utils/status.js';
import { setupShowHideOnInactivity } from './utils/showHideOnInactivity.js';
import {
  localVideo,
  remoteVideo,
  sharedVideo,
  callBtn,
  hangUpBtn,
  linkContainer,
  shareLink,
  syncStatus,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  micBtn,
  cameraBtn,
  switchCameraSelfBtn,
  fullscreenSelfBtn,
  installBtn,
  chatControls,
} from './elements.js';

import {
  initializeMediaControls,
  cleanupMediaControls,
} from './media-controls.js';

import { userMediaAudioConstraints } from './setupStream.js';

import {
  setupWatchSync,
  isWatchModeActive,
  setWatchMode,
  getLastWatched,
  setLastWatched,
} from './watch-sync.js';

import {
  destroyYouTubePlayer,
  pauseYouTubeVideo,
  getYTContainer,
  isYTVisible,
  showYouTubePlayer,
  hideYouTubePlayer,
  setYouTubeReady,
} from './youtube-player.js';

import { cleanupSearchUI, initializeSearchUI } from './youtube-search.js';
import { hasFrontAndBackCameras } from './media-devices.js';
import { setupPWA } from './PWA.js';
import { setupIceCandidates } from './ice.js';
import {
  setUpLocalStream,
  setupRemoteStream,
  getLocalStream,
  cleanupLocalStream,
} from './setupStream.js';

import { initChatUI } from './chat-ui.js';

// ============================================================================
// GLOBAL STATE
// ============================================================================

let pc = null; // RTCPeerConnection
let dataChannel = null; // RTCDataChannel (for text chat, file transfer, etc.)
let roomId = null;
let peerId = null;
let role = null; // 'initiator' | 'joiner'
let textChat; // holds chat UI reference

let cleanupFunctions = [];

// Prevent duplicate SDP processing
let lastAnswerSdp = null;
let lastOfferSdp = null;

export const isRemoteVideoVideoActive = () => {
  return (
    remoteVideo.srcObject &&
    remoteVideo.srcObject.getVideoTracks().some((track) => track.enabled)
  );
};

// ============================================================================
// INITIALIZATION & MEDIA SETUP
// ============================================================================

async function init() {
  peerId = Math.random().toString(36).substring(2, 15);

  // TEMP FIX: hide YouTube container if present
  try {
    const ytContainer = getYTContainer();
    hideElement(ytContainer);
  } catch {
    // Container not present — OK
  }

  try {
    await setUpLocalStream(localVideo);

    if (await hasFrontAndBackCameras()) {
      switchCameraSelfBtn.style.display = 'block';
    }

    initializeMediaControls({
      getLocalStream,
      getLocalVideo: () => localVideo,
      getRemoteVideo: () => remoteVideo,
      getPeerConnection: () => pc,

      muteSelfBtn: micBtn,
      videoSelfBtn: cameraBtn,
      switchCameraSelfBtn,
      fullscreenSelfBtn,
      mutePartnerBtn,
      fullscreenPartnerBtn,

      audioConstraints: userMediaAudioConstraints,
    });

    setupPWA(installBtn);

    initializeSearchUI();

    addWatchModeKeyListener();

    if (import.meta.env.DEV) {
      micBtn.click();
    }

    return true;
  } catch (error) {
    console.error('Failed to get user media:', error);
    updateStatus('Error: Please allow camera and microphone access.');
    return false;
  }
}

function setupDataChannel() {
  dataChannel = pc.createDataChannel('chat');
  textChat = initChatUI((msg) => {
    if (dataChannel.readyState === 'open') {
      dataChannel.send(msg);
    }
  });

  dataChannel.onopen = () => {
    textChat.showChatToggle();
    textChat.addMessage('💬 Chat connected');
  };

  dataChannel.onmessage = (e) => textChat.addMessage(`Partner: ${e.data}`);
}

// === WIP ===

// Minimal room members setup for join/leave events
let membersListeners = [];
function setupRoomMembers() {
  if (!roomId || !peerId) return;
  const membersRef = ref(rtdb, `rooms/${roomId}/members`);
  const myMemberRef = ref(rtdb, `rooms/${roomId}/members/${peerId}`);
  set(myMemberRef, { joinedAt: Date.now() });

  // Listen for remote peer join
  const onPartnerJoined = (snapshot) => {
    if (snapshot.key !== peerId) enterCallMode();
  };

  onChildAdded(membersRef, onPartnerJoined);

  membersListeners.push({
    ref: membersRef,
    type: 'child_added',
    callback: onPartnerJoined,
  });

  // Listen for remote peer leave
  const onPartnerLeft = (snapshot) => {
    if (snapshot.key !== peerId) {
      console.info('Partner has left the call');
    }
    hangUp();
  };

  onChildRemoved(membersRef, onPartnerLeft);

  membersListeners.push({
    ref: membersRef,
    type: 'child_removed',
    callback: onPartnerLeft,
  });
}

// === End of WIP ===

// ============================================================================
// WEBRTC CONNECTION - INITIATOR (CREATE CALL)
// ============================================================================

const rtcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // Add TURN servers here if needed for better connectivity
  ],
};

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
  const localStream = getLocalStream();
  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return false;
  }

  // Generate room ID
  roomId = Math.random().toString(36).substring(2, 15);
  role = 'initiator';

  // Create peer connection
  pc = new RTCPeerConnection(rtcConfig);

  // Create a data channel for text chat
  setupDataChannel();

  // Add local tracks to peer connection
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  if (setupRemoteStream(pc, remoteVideo, mutePartnerBtn)) {
    setupIceCandidates(pc, role, roomId);
    setupConnectionStateHandlers(pc);
    console.debug('Peer connection created as initiator with room ID:', roomId);
  } else {
    updateStatus('Error setting up remote stream');
    console.error('Error setting up remote stream');
    return false;
  }

  // Create offer
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  // Save offer to Firebase
  const roomRef = ref(rtdb, `rooms/${roomId}`);
  await set(roomRef, {
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  });

  // Listen for answer from joiner
  const answerRef = ref(rtdb, `rooms/${roomId}/answer`);
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
        return true;
      }

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        if (import.meta.env.DEV) {
          console.log('Remote description set (answer)');
        }
        return true;
      } catch (error) {
        console.error('Failed to set remote description:', error);
        return false;
      }
    }
  };

  onValue(answerRef, answerCallback);
  trackFirebaseListener(answerRef, 'value', answerCallback);

  // Setup watch-together sync
  setupWatchSync(roomId, role, peerId);

  // Add self to room members and listen for join/leave
  setupRoomMembers();

  // Show share link
  const shareUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
  shareLink.value = shareUrl;
  // TODO: Cleanup replaced elements and related code, e.g. -> linkContainer.style.display = 'block';
  callBtn.disabled = true;
  hangUpBtn.disabled = false;

  // TODO: Make nice
  // Automatically copy link to clipboard
  try {
    await navigator.clipboard.writeText(shareUrl);
    alert(
      `Link copied! Share it with someone to start a call.\n\n( link: ${shareUrl} )`
    );
    updateStatus('Link ready! Share with your partner.');
    return true;
  } catch (error) {
    alert(`Share this link with your partner:\n${shareUrl}`);
  }
  return false;
}

// ============================================================================
// WEBRTC CONNECTION - JOINER (ANSWER CALL)
// ============================================================================

async function answerCall() {
  const localStream = getLocalStream();

  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return false;
  }

  if (!roomId) {
    updateStatus('Error: No room ID');
    return false;
  }

  role = 'joiner';

  // Get room data from Firebase
  const roomRef = ref(rtdb, `rooms/${roomId}`);
  const roomSnapshot = await get(roomRef);

  if (!roomSnapshot.exists()) {
    updateStatus('Error: Invalid room link');
    return false;
  }

  const roomData = roomSnapshot.val();
  const offer = roomData.offer;

  if (!offer) {
    updateStatus('Error: No offer found');
    return false;
  }

  // Create peer connection
  pc = new RTCPeerConnection(rtcConfig);

  // Prepare to receive chat DataChannel from initiator
  pc.ondatachannel = (event) => {
    dataChannel = event.channel;
    textChat = initChatUI((msg) => dataChannel.send(msg));

    dataChannel.onopen = () => {
      textChat.show();
      textChat.addMessage('💬 Chat connected');
    };
    dataChannel.onmessage = (e) => textChat.addMessage(`Partner: ${e.data}`);
  };

  // Add local tracks
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  if (setupRemoteStream(pc, remoteVideo, mutePartnerBtn)) {
    setupIceCandidates(pc, role, roomId); // Send ICE candidates to Firebase
    setupConnectionStateHandlers(pc); // Monitor connection state
    console.debug('Peer connection created as joiner for room ID:', roomId);
  } else {
    updateStatus('Error setting up remote stream');
    console.error('Error setting up remote stream for joiner');
    return false;
  }

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
    return false;
  }

  // Setup watch-together sync
  setupWatchSync(roomId, role, peerId);

  // Add self to room members and listen for join/leave
  setupRoomMembers();

  hangUpBtn.disabled = false;
  enterCallMode();

  updateStatus('Connecting...');

  return true;
}

let seekDebounceTimeout = null; // Todo: Is this still needed?

// ============================================================================
// UI Layout change helpers
// ============================================================================

export function enterWatchMode() {
  if (isWatchModeActive()) return;

  // Todo: Picture-in-Picture instead of smallFrame?
  if (isRemoteVideoVideoActive()) {
    remoteVideo.classList.add('smallFrame');
    hideElement(localVideo);

    remoteVideo
      .requestPictureInPicture()
      .then(() => {
        // Hide the smallFrame if PiP entered successfully
        hideElement(remoteVideo);
      })
      .catch((err) => {
        console.error('Failed to enter Picture-in-Picture:', err);
      });
  } else {
    showElement(localVideo);
    localVideo.classList.add('smallFrame');
  }

  chatControls.classList.remove('bottom');
  chatControls.classList.add('watch-mode');

  setWatchMode(true);
}

export function exitWatchMode() {
  if (!isWatchModeActive()) return;

  showElement(localVideo);

  if (isRemoteVideoVideoActive()) {
    remoteVideo.classList.remove('smallFrame');
    showElement(remoteVideo);

    if (isElementInPictureInPicture(remoteVideo)) {
      document.exitPictureInPicture().catch((err) => {
        console.error('Failed to exit Picture-in-Picture:', err);
      });
    }
  } else {
    localVideo.classList.remove('smallFrame');
  }

  chatControls.classList.remove('watch-mode');
  chatControls.classList.add('bottom');

  setWatchMode(false);
}

let enterCallMode = () => {
  showElement(remoteVideo);
  localVideo.classList.add('smallFrame');
};

let exitCallMode = () => {
  hideElement(remoteVideo);
  localVideo.classList.remove('smallFrame');
};

// ============================================================================
// YOUTUBE PLAYER INTEGRATION
// ============================================================================

function isSharedVideoVisible() {
  return (
    sharedVideo &&
    !sharedVideo.classList.contains('hidden') &&
    sharedVideo.src &&
    sharedVideo.src.trim() !== ''
  );
}

let watchModeKeyListenerAdded = false;

function addWatchModeKeyListener() {
  if (watchModeKeyListenerAdded) return;

  document.addEventListener('keydown', (event) => {
    // Press 'W' to toggle player visibility
    if (event.key === 'w' || event.key === 'W') {
      console.log('=== W KEY PRESSED ===');
      console.log('lastWatched:', getLastWatched());
      console.log('isYTVisible():', isYTVisible());
      console.log('isSharedVideoVisible():', isSharedVideoVisible());
      console.log('isWatchModeActive():', isWatchModeActive());

      if (getLastWatched() === 'yt') {
        console.log('Processing YouTube case');
        if (isYTVisible()) {
          console.log('Hiding YouTube player');
          hideYouTubePlayer();
          exitWatchMode();
        } else {
          console.log('Showing YouTube player');
          showYouTubePlayer();
          enterWatchMode();

          // if (isRemoteVideoVideoActive()) {
          //   remoteVideo
          //     .requestPictureInPicture()
          //     .catch((err) => console.error(err));
          // }
        }
      } else if (getLastWatched() === 'url') {
        console.log('Processing URL case');
        if (isSharedVideoVisible()) {
          console.log('Hiding shared video');
          hideElement(sharedVideo);
          exitWatchMode();
        } else {
          console.log('Showing shared video');
          showElement(sharedVideo);
          enterWatchMode();

          // if (isRemoteVideoVideoActive()) {
          //   remoteVideo
          //     .requestPictureInPicture()
          //     .catch((err) => console.error(err));
          // }
        }
      }
    }
    // Hide media player when pressing 'Escape', if player is visible
    if (event.key === 'Escape') {
      if (getLastWatched() === 'yt' && isYTVisible()) {
        pauseYouTubeVideo();
        hideYouTubePlayer();
        exitWatchMode();
      } else if (getLastWatched() === 'url' && isSharedVideoVisible()) {
        sharedVideo.pause();
        hideElement(sharedVideo);
      }
    }
  });

  watchModeKeyListenerAdded = true;
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

callBtn.onclick = async () => {
  await createCall();
};

hangUpBtn.onclick = hangUp;

// Start hidden, show on activity and auto-hide after inactivity
const cleanupChatControlAutoHide = setupShowHideOnInactivity(chatControls, {
  inactivityMs: 2500,
  hideOnEsc: true,
});

cleanupFunctions.push(cleanupChatControlAutoHide);

// ============================================================================
// AUTO-JOIN FROM URL PARAMETER
// ============================================================================

async function autoJoinFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlRoomId = urlParams.get('room');

  if (urlRoomId) {
    roomId = urlRoomId;
    updateStatus('Connecting to room...');
    callBtn.style.display = 'none';

    const initSuccess = await init();
    let answerSuccess = false;
    if (initSuccess) answerSuccess = await answerCall();

    if (!initSuccess || !answerSuccess) {
      callBtn.style.display = 'block';
      return false;
    }
    return true;
  } else {
    updateStatus('Ready. Click "Start New Chat" to begin.');
    return false;
  }
}

// ============================================================================
// INITIALIZE ON PAGE LOAD
// ============================================================================

window.onload = async () => {
  // Auto-join if room parameter exists
  const joinedSuccess = await autoJoinFromUrl();
  if (joinedSuccess) return;

  const success = await init();
  if (!success) {
    callBtn.disabled = true;
    console.error('Initialization failed. Cannot start chat.');
    return;
  }
};

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
  cleanup();
});

// ============================================================================
// HANG UP / CLEANUP
// ============================================================================

let isHangingUp = false;

async function hangUp() {
  if (isHangingUp) return;
  isHangingUp = true;

  console.debug('Hanging up...');

  exitCallMode();

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

  removeAllFirebaseListeners();

  // Clear debounce timeout if any
  if (seekDebounceTimeout) {
    clearTimeout(seekDebounceTimeout);
    seekDebounceTimeout = null;
  }

  // Remove room from Firebase (optional - rooms can auto-expire)
  if (roomId && role === 'initiator') {
    const roomRef = ref(rtdb, `rooms/${roomId}`);
    remove(roomRef).catch((error) => {
      console.warn('Failed to remove room:', error);
    });
  }

  // Reset UI
  exitCallMode();
  callBtn.disabled = false;
  callBtn.style.display = 'block';
  hangUpBtn.disabled = true;
  linkContainer.style.display = 'none';

  membersListeners.forEach(({ ref: fbRef, type, callback }) =>
    off(fbRef, type, callback)
  );
  membersListeners.length = 0;

  // Remove self from room members
  if (roomId && peerId) {
    const myMemberRef = ref(rtdb, `rooms/${roomId}/members/${peerId}`);
    remove(myMemberRef).catch(() => {});
  }

  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((err) => console.error(err));
  }

  // Reset state
  roomId = null;
  role = null;
  lastAnswerSdp = null;
  lastOfferSdp = null;

  // Clear URL parameter
  window.history.replaceState({}, document.title, window.location.pathname);

  updateStatus('Disconnected. Click "Start New Chat" to begin.');

  isHangingUp = false;
}

function cleanup() {
  if (pc || roomId) hangUp();

  shareLink.value = '';
  sharedVideo.src = '';
  // streamUrlInput.value = '';
  syncStatus.textContent = '';

  cleanupLocalStream();
  localVideo.srcObject = null;
  cleanupMediaControls(localVideo);

  exitWatchMode();
  setLastWatched('none');
  destroyYouTubePlayer();
  setYouTubeReady(false);

  cleanupSearchUI();
  cleanupFunctions.forEach((cleanupFn) => cleanupFn());
}
