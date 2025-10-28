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

import { onClickOutside } from './utils/clickOutside';
import {
  isHidden,
  showElement,
  hideElement,
  isElementInPictureInPicture,
  placeInSmallFrame,
  removeFromSmallFrame,
} from './utils/ui-utils';
import { updateStatus } from './utils/status.js';
import { setupShowHideOnInactivity } from './utils/showHideOnInactivity.js';
import {
  localVideoEl,
  remoteVideoEl,
  sharedVideoEl,
  callBtn,
  hangUpBtn,
  shareLink,
  syncStatus,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  micBtn,
  cameraBtn,
  switchCameraBtn,
  installBtn,
  chatControls,
  localBoxEl,
  remoteBoxEl,
  sharedBoxEl,
} from './elements.js';

import {
  initializeMediaControls,
  cleanupMediaControls,
} from './media-controls.js';

import {
  hasFrontAndBackCameras,
  userMediaAudioConstraints,
} from './media-devices.js';

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
  getYTBox,
  isYTVisible,
  showYouTubePlayer,
  hideYouTubePlayer,
  setYouTubeReady,
} from './youtube-player.js';

import { cleanupSearchUI, initializeSearchUI } from './youtube-search.js';
import { setupPWA } from './PWA.js';
import { setupIceCandidates } from './ice.js';
import {
  setUpLocalStream,
  setupRemoteStream,
  getLocalStream,
  setLocalStream,
  cleanupLocalStream,
} from './setupStream.js';

import { initMessagesUI } from './chat-ui.js';
import { showCopyLinkModal } from './components/copyLinkModal.js';

// ============================================================================
// GLOBAL STATE
// ============================================================================

let pc = null; // RTCPeerConnection
let dataChannel = null; // RTCDataChannel (for text chat, file transfer, etc.)
let roomId = null;
let peerId = null;
let role = null; // 'initiator' | 'joiner'
let messagesUI; // holds text chat UI reference

let cleanupFunctions = [];

// Prevent duplicate SDP processing
let lastAnswerSdp = null;
let lastOfferSdp = null;

export const isRemoteVideoVideoActive = () => {
  return (
    remoteVideoEl.srcObject &&
    remoteVideoEl.srcObject.getVideoTracks().some((track) => track.enabled)
  );
};

// ============================================================================
// INITIALIZATION & MEDIA SETUP
// ============================================================================

async function init() {
  peerId = Math.random().toString(36).substring(2, 15);

  // TEMP FIX: hide YouTube container if present
  try {
    const ytBox = getYTBox();
    hideElement(ytBox);
  } catch {
    // Container not present — OK
  }

  try {
    await setUpLocalStream(localVideoEl);

    if (await hasFrontAndBackCameras()) {
      showElement(switchCameraBtn);
    }

    initializeMediaControls({
      getLocalStream,
      getLocalVideo: () => localVideoEl,
      getRemoteVideo: () => remoteVideoEl,
      getPeerConnection: () => pc,
      setLocalStream,

      micBtn,
      cameraBtn,
      switchCameraBtn,
      mutePartnerBtn,
      fullscreenPartnerBtn,
    });

    setupPWA(installBtn);

    initializeSearchUI();

    addKeyListeners();

    exitCallMode(); // Ensure UI is in initial state

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

  const sendMessage = (msg) => {
    if (dataChannel.readyState === 'open') {
      dataChannel.send(msg);
    }
  };

  messagesUI = initMessagesUI(sendMessage);

  dataChannel.onopen = () => {
    messagesUI.showMessagesToggle();
    messagesUI.appendChatMessage('💬 Chat connected');
  };

  dataChannel.onmessage = (e) => messagesUI.receiveMessage(e.data);
}

function clearUrlParam() {
  window.history.replaceState({}, document.title, window.location.pathname);
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
      enterCallMode();
    } else if (pc.connectionState === 'disconnected') {
      updateStatus('Partner disconnected');
      exitCallMode();
      clearUrlParam();
    } else if (pc.connectionState === 'failed') {
      updateStatus('Connection failed');
      clearUrlParam();
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

  if (setupRemoteStream(pc, remoteVideoEl, mutePartnerBtn)) {
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

  showCopyLinkModal(shareUrl, {
    onCopy: () => updateStatus('Link ready! Share with your partner.'),
    onCancel: () => {
      updateStatus('Call cancelled. Click "Start New Chat" to try again.');
      hangUp();
    },
  });

  updateStatus('Waiting for partner to join...');

  return true;
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
    messagesUI = initMessagesUI((msg) => dataChannel.send(msg));

    dataChannel.onopen = () => {
      messagesUI.showMessagesToggle();
      messagesUI.appendChatMessage('💬 Chat connected');
    };
    dataChannel.onmessage = (e) => messagesUI.receiveMessage(e.data);
  };

  // Add local tracks
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  if (setupRemoteStream(pc, remoteVideoEl, mutePartnerBtn)) {
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

  enterCallMode();

  updateStatus('Connecting...');

  return true;
}

let seekDebounceTimeout = null; // Todo: Is this still needed?

// ============================================================================
// UI Layout change helpers
// ============================================================================

let cleanupChatControlAutoHide = null;

function isPiPSupported() {
  return (
    'pictureInPictureEnabled' in document &&
    typeof document.pictureInPictureEnabled === 'boolean' &&
    document.pictureInPictureEnabled
  );
}

export function enterWatchMode() {
  if (isWatchModeActive()) return;
  setWatchMode(true);

  chatControls.classList.remove('bottom');
  chatControls.classList.add('watch-mode');
  // Disable auto-hide in watch mode to ensure accessibility
  if (cleanupChatControlAutoHide) {
    cleanupChatControlAutoHide();
    cleanupChatControlAutoHide = null;
  }

  if (!isRemoteVideoVideoActive()) {
    showElement(localBoxEl);
    placeInSmallFrame(localBoxEl);
    hideElement(remoteBoxEl);
    removeFromSmallFrame(remoteBoxEl);
    return;
  }

  // Hide local video if remote video is active
  hideElement(localBoxEl);
  removeFromSmallFrame(localBoxEl);

  if (isElementInPictureInPicture(remoteVideoEl)) {
    hideElement(remoteBoxEl); // ensure small-frame is hidden if in PiP
    removeFromSmallFrame(remoteBoxEl);
  } else if (isPiPSupported()) {
    // Try to enter PiP with fallback
    remoteVideoEl
      .requestPictureInPicture()
      .then(() => {
        // Hide the smallFrame if PiP entered successfully
        hideElement(remoteBoxEl);
        removeFromSmallFrame(remoteBoxEl);
      })
      .catch((err) => {
        console.warn('Failed to enter Picture-in-Picture:', err);
        // Fallback: place in small frame
        placeInSmallFrame(remoteBoxEl);
        showElement(remoteBoxEl);
      });
  } else {
    // PiP not supported
    placeInSmallFrame(remoteBoxEl);
    showElement(remoteBoxEl);
  }
}

export function exitWatchMode() {
  if (!isWatchModeActive()) return;

  chatControls.classList.remove('watch-mode');
  chatControls.classList.add('bottom');

  // Enable auto-hide again
  if (!cleanupChatControlAutoHide) {
    cleanupChatControlAutoHide = setupShowHideOnInactivity(chatControls, {
      inactivityMs: 2500,
      hideOnEsc: true,
    });
  }

  if (isRemoteVideoVideoActive()) {
    if (isElementInPictureInPicture(remoteBoxEl)) {
      document.exitPictureInPicture().catch((err) => {
        console.error('Failed to exit Picture-in-Picture:', err);
      });
    }

    removeFromSmallFrame(remoteBoxEl);
    showElement(remoteBoxEl);
  }

  placeInSmallFrame(localBoxEl);
  showElement(localBoxEl);

  setWatchMode(false);
}

let enterCallMode = () => {
  showElement(remoteBoxEl);
  placeInSmallFrame(localBoxEl);

  callBtn.disabled = true;
  mutePartnerBtn.disabled = false;
  hangUpBtn.disabled = false;

  if (!cleanupChatControlAutoHide) {
    // Start hidden, show on activity and auto-hide after inactivity
    cleanupChatControlAutoHide = setupShowHideOnInactivity(chatControls, {
      inactivityMs: 2500,
      hideOnEsc: true,
    });
  }

  // showElement(mutePartnerBtn);
  // showElement(micBtn);
  // showElement(cameraBtn);
  // if (hasFrontAndBackCameras()) {
  //   showElement(switchCameraBtn);
  // }
};

let exitCallMode = () => {
  removeFromSmallFrame(remoteBoxEl);
  hideElement(remoteBoxEl);
  placeInSmallFrame(localBoxEl); // Always keep local video in small frame
  showElement(localBoxEl);

  callBtn.disabled = false;
  hangUpBtn.disabled = true;
  mutePartnerBtn.disabled = true;

  if (cleanupChatControlAutoHide) {
    cleanupChatControlAutoHide();
    cleanupChatControlAutoHide = null;
  }

  // hideElement(mutePartnerBtn);
  // hideElement(switchCameraBtn);
  // hideElement(micBtn);
  // hideElement(cameraBtn);
};

// ============================================================================
// YOUTUBE PLAYER INTEGRATION
// ============================================================================

function isSharedVideoVisible() {
  return (
    sharedVideoEl &&
    sharedBoxEl &&
    !sharedBoxEl.classList.contains('hidden') &&
    sharedVideoEl.src &&
    sharedVideoEl.src.trim() !== ''
  );
}

let keyListenersAdded = false;

function addKeyListeners() {
  if (keyListenersAdded) return;

  const isTextInputFocused = () => {
    const activeElement = document.activeElement;
    return (
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable)
    );
  };

  document.addEventListener('keydown', (event) => {
    // Press 'W' to toggle player visibility
    if (!isTextInputFocused()) {
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
          }
        } else if (getLastWatched() === 'url') {
          console.log('Processing URL case');
          if (isSharedVideoVisible()) {
            console.log('Hiding shared video');
            hideElement(sharedVideoEl);
            exitWatchMode();
          } else {
            console.log('Showing shared video');
            showElement(sharedVideoEl);
            enterWatchMode();
          }
        }
      }
      // Toggle chat messages with 'M' key
      if (event.key === 'm' || event.key === 'M') {
        if (messagesUI) {
          messagesUI.toggleMessages();
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
        sharedVideoEl.pause();
        hideElement(sharedVideoEl);
      }
    }
  });

  keyListenersAdded = true;
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

callBtn.onclick = async () => {
  await createCall();
};

hangUpBtn.onclick = hangUp;

// ============================================================================
// AUTO-JOIN FROM URL PARAMETER
// ============================================================================

async function autoJoinFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlRoomId = urlParams.get('room');

  if (!urlRoomId) {
    updateStatus('Ready. Click "Start New Chat" to begin.');
    return false;
  }

  roomId = urlRoomId;
  updateStatus('Connecting to room...');

  const initSuccess = await init();
  let answerSuccess = false;
  if (initSuccess) answerSuccess = await answerCall();

  if (answerSuccess) {
    return true;
  } else {
    showElement(callBtn);
    hangUpBtn.disabled = true;
    callBtn.disabled = false;
    clearUrlParam();
  }
  return false;
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

  // Stop remote media
  if (remoteVideoEl.srcObject) {
    remoteVideoEl.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideoEl.srcObject = null;
  }

  cleanupMediaControls();

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

  // Cleanup chat UI
  if (messagesUI && messagesUI.cleanup) {
    messagesUI.cleanup();
    messagesUI = null;
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
  sharedVideoEl.src = '';
  // streamUrlInput.value = '';
  syncStatus.textContent = '';

  cleanupLocalStream();
  localVideoEl.srcObject = null;

  exitWatchMode();
  setLastWatched('none');
  destroyYouTubePlayer();
  setYouTubeReady(false);

  cleanupSearchUI();
  cleanupFunctions.forEach((cleanupFn) => cleanupFn());
}
