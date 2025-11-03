// main.js

// ============================================================================
// HANGVIDU - P2P VIDEO CHAT WITH WATCH-TOGETHER MODE
// ============================================================================

import '@fortawesome/fontawesome-free/css/all.min.css';
import { ref, set, get, remove } from 'firebase/database';
import {
  onDataChange,
  removeAllRTDBListeners,
  rtdb,
} from './storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getUserId } from './firebase/auth.js';

import {
  isHidden,
  showElement,
  hideElement,
  isElementInPictureInPicture,
  placeInSmallFrame,
  removeFromSmallFrame,
  isInSmallFrame,
} from './utils/ui-utils.js';

import { updateStatus } from './utils/status.js';
import { setupShowHideOnInactivity } from './utils/showHideOnInactivity.js';
import {
  saveContact,
  renderContactsList,
  getContacts,
} from './components/contacts/contacts.js';
import {
  showCallingUI,
  hideCallingUI,
  onCallAnswered,
  isOutgoingCallFresh,
  isRoomCallFresh,
} from './components/calling/calling-ui.js';

import {
  localVideoEl,
  remoteVideoEl,
  sharedVideoEl,
  callBtn,
  hangUpBtn,
  syncStatus,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  micBtn,
  cameraBtn,
  switchCameraBtn,
  chatControls,
  localBoxEl,
  remoteBoxEl,
  sharedBoxEl,
  lobbyDiv,
  titleAuthBar,
  createLinkBtn,
  copyLinkBtn,
  getElements,
  joinRoomBtn,
  roomIdInput,
} from './elements.js';

import {
  initializeMediaControls,
  cleanupMediaControls,
} from './media/media-controls.js';

import {
  setupWatchSync,
  isWatchModeActive,
  setWatchMode,
  getLastWatched,
  setLastWatched,
} from './firebase/watch-sync.js';

import {
  destroyYouTubePlayer,
  pauseYouTubeVideo,
  getYTBox,
  isYTVisible,
  showYouTubePlayer,
  hideYouTubePlayer,
  setYouTubeReady,
} from './media/youtube/youtube-player.js';

import {
  cleanupSearchUI,
  initializeSearchUI,
} from './media/youtube/youtube-search.js';
import { setupPWA } from './pwa/PWA.js';
import { setupIceCandidates } from './webrtc/ice.js';
import { setUpLocalStream, setupRemoteStream } from './media/stream.js';

import {
  getLocalStream,
  setLocalStream,
  cleanupLocalStream,
  getRemoteStream,
  cleanupRemoteStream,
  cleanupLocalVideoOnlyStream,
} from './media/state.js';

import { initMessagesUI } from './components/messages/messages-ui.js';
import {
  copyToClipboard,
  showCopyLinkModal,
} from './components/modal/copyLinkModal.js';
import { devDebug } from './utils/dev-utils.js';

import { initializeAuthUI } from './components/auth/auth-ui.js';

import RoomService from './room.js';

// ============================================================================
// GLOBAL STATE
// ============================================================================

let pc = null; // RTCPeerConnection
let dataChannel = null; // RTCDataChannel (for text chat, file transfer, etc.)
let partnerUserId = null;
let role = null; // 'initiator' | 'joiner'
let messagesUI; // holds text chat UI reference
let currentRoomLink = null;
let currentRoomId = null; // Track current room ID for contacts

let cleanupFunctions = [];

// Prevent duplicate SDP processing
let lastAnswerSdp = null;
let lastOfferSdp = null;

export const isRemoteVideoVideoActive = () => {
  const remoteStream = getRemoteStream(false);
  return (
    remoteStream && remoteStream.getVideoTracks().some((track) => track.enabled)
  );
};

// ============================================================================
// INITIALIZATION & MEDIA SETUP
// ============================================================================

async function init() {
  // Initialize generated user ID if needed (will be created by getUserId() when first used)

  // Validate critical elements first
  const elements = getElements();
  const criticalElements = [
    'localVideoEl',
    'remoteVideoEl',
    'localBoxEl',
    'remoteBoxEl',
    'chatControls',
    'lobbyDiv',
    'titleAuthBar',
  ];

  const missingCritical = criticalElements.filter((name) => !elements[name]);
  if (missingCritical.length > 0) {
    console.error('Critical elements missing:', missingCritical);
    updateStatus('Error: Required UI elements not found.');
    return false;
  }

  try {
    setupPWA();
    initializeSearchUI();
    addKeyListeners();

    const { cleanupAuthUI } = initializeAuthUI(titleAuthBar);
    cleanupFunctions.push(cleanupAuthUI);

    await setUpLocalStream(localVideoEl);

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

    if (localVideoEl) {
      localVideoEl.addEventListener(
        'enterpictureinpicture',
        () => localBoxEl && hideElement(localBoxEl)
      );

      localVideoEl.addEventListener('leavepictureinpicture', () => {
        if (
          localBoxEl &&
          !(isWatchModeActive() && isRemoteVideoVideoActive())
        ) {
          showElement(localBoxEl);
        }
      });
    }

    exitCallMode(); // Ensure UI is in initial state

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

// ============================================================================
// WEBRTC CONNECTION - INITIATOR (CREATE CALL)
// ============================================================================

const rtcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // Add TURN servers here if needed for better connectivity
  ],
};

let disconnectTimeoutId = null;

function setupConnectionStateHandlers(pc) {
  pc.onconnectionstatechange = () => {
    devDebug('onconnectionstatechange:', pc.connectionState);

    if (pc.connectionState === 'connected') {
      updateStatus('Connected!');
      enterCallMode();
      // Ensure any calling overlay is dismissed once connected
      onCallAnswered().catch((e) =>
        console.warn('Failed to clear calling state on connect:', e)
      );
      // Clear any pending disconnect timeout if we reconnect
      if (disconnectTimeoutId) {
        clearTimeout(disconnectTimeoutId);
        disconnectTimeoutId = null;
      }
    } else if (pc.connectionState === 'disconnected') {
      updateStatus('Partner disconnected (reconnecting...)');

      // Wait 3 seconds before hanging up to allow transient disconnects to recover
      if (disconnectTimeoutId) clearTimeout(disconnectTimeoutId);
      disconnectTimeoutId = setTimeout(() => {
        // Only hang up if still disconnected after grace period
        if (pc && pc.connectionState === 'disconnected') {
          updateStatus('Partner disconnected');
          exitCallMode();
          clearUrlParam();
          hangUp();
        }
        disconnectTimeoutId = null;
      }, 3000);
    } else if (pc.connectionState === 'failed') {
      updateStatus('Connection failed');
      clearUrlParam();
      // Clear any pending disconnect timeout
      if (disconnectTimeoutId) {
        clearTimeout(disconnectTimeoutId);
        disconnectTimeoutId = null;
      }
      // Immediately hang up on failed (no grace period needed)
      hangUp();
    }
  };

  pc.addEventListener('iceconnectionstatechange', (e) => {
    devDebug('ICE iceconnectionstatechange:', pc.iceConnectionState);
    if (pc.iceConnectionState === 'failed') {
      /* possibly reconfigure the connection in some way here */
      /* then request ICE restart */
      console.warn('ICE connection failed, restarting ICE...');
      pc.restartIce();
    }
  });
}

async function createCall(targetRoomId = null) {
  const localStream = getLocalStream();
  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return false;
  }

  // Clean up any previous connection listeners before creating new ones
  try {
    removeAllRTDBListeners();
    RoomService.cleanupListeners();
  } catch (e) {
    /* noop */
  }

  role = 'initiator';
  pc = new RTCPeerConnection(rtcConfig);

  // Setup Data channel for text messages
  setupDataChannel();

  // Add local tracks to peer connection
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  // Create offer
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const userId = getUserId();

  const roomId = targetRoomId || Math.random().toString(36).substring(2, 9);

  // Setup remote stream and ICE handlers BEFORE writing the offer to RTDB
  const successFullySetupRemoteStream = setupRemoteStream(
    pc,
    remoteVideoEl,
    mutePartnerBtn
  );

  if (!successFullySetupRemoteStream) {
    updateStatus('Error setting up remote stream');
    console.error('Error setting up remote stream');
    return false;
  }

  setupIceCandidates(pc, role, roomId);
  setupConnectionStateHandlers(pc);

  // Listen for answer from joiner BEFORE we write the offer so we won't miss it
  const answerRef = ref(rtdb, `rooms/${roomId}/answer`);
  const answerCallback = async (snapshot) => {
    const answer = snapshot.val();
    if (answer && answer.sdp !== lastAnswerSdp) {
      lastAnswerSdp = answer.sdp;

      // Only set remote description in an expected signaling state
      if (
        !pc ||
        (pc.signalingState !== 'have-local-offer' &&
          pc.signalingState !== 'stable')
      ) {
        devDebug(
          'Ignoring answer - unexpected signaling state:',
          pc ? pc.signalingState : 'no-pc'
        );
        return true;
      }

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        devDebug('Remote description set (answer)');
        return true;
      } catch (error) {
        console.error('Failed to set remote description:', error);
        return false;
      }
    }
  };
  onDataChange(answerRef, answerCallback);

  // Create and join room using the chosen roomId (prevents ID mismatch)
  const actualRoomId = await RoomService.createNewRoom(offer, userId, roomId);

  devDebug(
    'Peer connection created as initiator with room ID:',
    actualRoomId || roomId,
    'userId:',
    userId
  );

  // Track current room ID for contacts
  currentRoomId = roomId;

  // Setup watch-together sync
  setupWatchSync(roomId, role, userId);

  // Setup member listeners
  RoomService.onMemberJoined(roomId, (snapshot) => {
    const currentUserId = getUserId();
    if (snapshot.key !== currentUserId) {
      partnerUserId = snapshot.key; // Track partner for contacts
      enterCallMode();
      // Hide calling UI when partner joins (call answered)
      onCallAnswered().catch((e) =>
        console.warn('Failed to clear calling state:', e)
      );
    }

    saveRecentCall(roomId).catch((e) =>
      console.warn('Failed to save recent call:', e)
    );
  });

  RoomService.onMemberLeft(roomId, (snapshot) => {
    const currentUserId = getUserId();
    if (snapshot.key !== currentUserId && pc?.connectionState === 'connected') {
      console.info('Partner has left the call');
    }
  });

  // Copy share link
  currentRoomLink = `${window.location.origin}${window.location.pathname}?room=${roomId}`;

  // Only show copy link modal if not targeting a specific room
  if (roomId !== targetRoomId) {
    showCopyLinkModal(currentRoomLink, {
      onCopy: () => updateStatus('Link ready! Share with your partner.'),
      onCancel: () => {
        updateStatus(
          'Link ready! Use the copy button to use it, or create a new one.'
        );
      },
    });
  }

  updateStatus('Waiting for partner to join...');

  copyLinkBtn.disabled = false;

  return true;
}

// ============================================================================
// WEBRTC CONNECTION - JOINER (ANSWER CALL)
// ============================================================================

async function answerCall(roomId) {
  const localStream = getLocalStream();

  devDebug('answerCall roomId: ', roomId);

  if (!localStream) {
    updateStatus('Error: Camera not initialized');
    return false;
  }

  if (!roomId) {
    updateStatus('Error: No room ID');
    return false;
  }

  const roomStatus = await RoomService.checkRoomStatus(roomId);

  if (!roomStatus.exists) {
    updateStatus('Error: Invalid room link');
    return false;
  }

  if (!roomStatus.hasMembers) {
    updateStatus('Error: Room is empty - no one to connect with');
    return false;
  }

  // Clean up any previous connection listeners before creating new ones
  try {
    removeAllRTDBListeners();
    RoomService.cleanupListeners();
  } catch (e) {
    /* noop */
  }

  role = 'joiner';

  let roomData;
  try {
    roomData = await RoomService.getRoomData(roomId);
  } catch (error) {
    updateStatus('Error: ' + error.message);
    return false;
  }

  // // Get room data from Firebase
  // const roomRef = ref(rtdb, `rooms/${roomId}`);
  // const roomSnapshot = await get(roomRef);

  // if (!roomSnapshot.exists()) {
  //   updateStatus('Error: Invalid room link');
  //   return false;
  // }

  // const roomData = roomSnapshot.val();

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

  try {
    // Save answer to Firebase
    await RoomService.saveAnswer(roomId, answer);
  } catch (err) {
    console.error('Failed to update answer in Firebase:', err);
    updateStatus('Failed to send answer to partner.');
    return false;
  }

  // Setup watch-together sync
  const userId = getUserId();
  setupWatchSync(roomId, role, userId);

  // Track current room ID for contacts
  currentRoomId = roomId;

  // Join as member and setup listeners
  await RoomService.joinRoom(roomId, userId);

  RoomService.onMemberJoined(roomId, (snapshot) => {
    const currentUserId = getUserId();
    if (snapshot.key !== currentUserId) {
      partnerUserId = snapshot.key; // Track partner for contacts
      enterCallMode();
    }

    saveRecentCall(roomId).catch((e) =>
      console.warn('Failed to save recent call:', e)
    );
  });

  RoomService.onMemberLeft(roomId, (snapshot) => {
    const currentUserId = getUserId();
    if (snapshot.key !== currentUserId && pc?.connectionState === 'connected') {
      console.info('Partner has left the call');
    }
  });

  updateStatus('Connecting...');

  return true;
}

async function joinOrCreateRoomWithId(customRoomId) {
  const status = await RoomService.checkRoomStatus(customRoomId);

  if (!status.exists) {
    devDebug(
      '[joinOrCreateRoomWithId]: Room with does not exist, creating new one for same id: ',
      customRoomId
    );
    // return await createCall(customRoomId);
    const created = await createCall(customRoomId);

    return created;
  }
  if (!status.hasMembers) {
    devDebug(
      'Room is empty - no one to connect with. Creating new Room for same id: ',
      customRoomId
    );

    return await createCall(customRoomId);
  }

  updateStatus('Joining room...');

  return await answerCall(customRoomId);
}

// Expose for contacts UI
window.joinOrCreateRoomWithId = joinOrCreateRoomWithId;
window.showCallingUI = showCallingUI;
window.hideCallingUI = hideCallingUI;

// ============================================================================
// RECENT CALLS (24h TTL) + INCOMING CALL LISTENERS
// ============================================================================

// Track which roomIds we've already attached incoming listeners for
const listeningRoomIds = new Set();

/**
 * Save a recent call for the current user (RTDB if logged in, localStorage otherwise).
 * Expires after 24 hours (expiresAt timestamp).
 */
async function saveRecentCall(roomId) {
  const now = Date.now();
  const expiresAt = now + 24 * 60 * 60 * 1000; // 24 hours
  const loggedInUid = getLoggedInUserId();

  if (loggedInUid) {
    const userRecentRef = ref(
      rtdb,
      `users/${loggedInUid}/recentCalls/${roomId}`
    );
    await set(userRecentRef, { roomId, savedAt: now, expiresAt });
    return;
  }

  // fallback to localStorage for guests
  try {
    const raw = localStorage.getItem('recentCalls') || '{}';
    const obj = JSON.parse(raw);
    obj[roomId] = { roomId, savedAt: now, expiresAt };
    localStorage.setItem('recentCalls', JSON.stringify(obj));
  } catch (e) {
    console.warn('Failed to save recent call to localStorage', e);
  }
}

/**
 * Remove a recent call entry for the current user (RTDB if logged in, localStorage otherwise).
 */
async function removeRecentCall(roomId) {
  const loggedInUid = getLoggedInUserId();

  if (loggedInUid) {
    try {
      await remove(ref(rtdb, `users/${loggedInUid}/recentCalls/${roomId}`));
    } catch (e) {
      console.warn('Failed to remove recent call from RTDB', e);
    }
    return;
  }

  // Guest: remove from localStorage
  try {
    const raw = localStorage.getItem('recentCalls') || '{}';
    const obj = JSON.parse(raw);
    if (obj[roomId]) {
      delete obj[roomId];
      localStorage.setItem('recentCalls', JSON.stringify(obj));
    }
  } catch (e) {
    console.warn('Failed to remove recent call from localStorage', e);
  }
}

/**
 * Listen for incoming member joins on a given roomId and log them.
 */
function listenForIncomingOnRoom(roomId) {
  if (!roomId) return;
  if (listeningRoomIds.has(roomId)) return; // avoid duplicate attachments
  listeningRoomIds.add(roomId);
  // Use RoomService's member listener helper
  RoomService.onMemberJoined(roomId, async (snapshot) => {
    const joiningUserId = snapshot.key;
    const memberData = snapshot.val ? snapshot.val() : null;
    const currentUserId = getUserId();
    if (joiningUserId && joiningUserId !== currentUserId) {
      console.log(`incoming call from ${joiningUserId} for room ${roomId}`);

      // Prefer the member's joinedAt as the primary freshness signal (real-time join)
      const joinedAt =
        memberData && typeof memberData.joinedAt === 'number'
          ? memberData.joinedAt
          : null;
      const CALL_FRESH_MS = 20000;

      let isFresh = false;
      if (joinedAt) {
        isFresh = Date.now() - joinedAt < CALL_FRESH_MS;
      }

      // If joinedAt isn't present or seems old (e.g., listener attached late),
      // fall back to caller-scoped outgoing marker (for logged-in callers),
      // or room-scoped createdAt (for guests)
      if (!isFresh) {
        isFresh =
          (await isOutgoingCallFresh(joiningUserId, roomId)) ||
          (await isRoomCallFresh(roomId));
      }
      if (!isFresh) {
        console.log(
          `Ignoring stale incoming call from ${joiningUserId} for room ${roomId}`
        );
        return;
      }

      // Minimal prompt to accept or reject the incoming call.
      // Only prompt if we're not already in an active call.
      const inActiveCall = !!pc && pc.connectionState === 'connected';
      if (inActiveCall) return;

      const accept = window.confirm(
        `Incoming call from ${joiningUserId} for room ${roomId}.\n\nAccept?`
      );

      if (accept) {
        joinOrCreateRoomWithId(roomId).catch((e) => {
          console.warn('Failed to answer incoming call:', e);
          updateStatus('Failed to answer incoming call.');
        });
      } else {
        console.log('Incoming call rejected by user');
        // Optional: remove the saved recent call to avoid repeated prompts
        // removeRecentCall(roomId).catch(() => {});
      }
    }
  });

  // Listen for member leaves: if the room becomes empty after a leave,
  // remove this saved recent call for the current user so they don't keep
  // an incoming notification for a non-existent partner.
  RoomService.onMemberLeft(roomId, async (snapshot) => {
    const leavingUserId = snapshot.key;
    const currentUserId = getUserId();

    // Ignore our own leaves
    if (!leavingUserId || leavingUserId === currentUserId) return;

    try {
      const status = await RoomService.checkRoomStatus(roomId);
      // If no members remain, remove the saved recent call for this client
      if (!status.hasMembers) {
        await removeRecentCall(roomId);
        console.log(
          `Removed saved recent call for room ${roomId} because it is now empty`
        );
      }
    } catch (e) {
      console.warn('Failed to evaluate room status on member leave', e);
    }
  });
}
/**
 * Read saved recent calls (RTDB or localStorage), remove expired entries,
 * and attach incoming listeners for each valid room id.
 */
async function startListeningForSavedRooms() {
  // Ensure auth state is initialized before deciding storage location
  // This prevents a race where we read localStorage as a guest before auth is ready
  try {
    if (typeof window !== 'undefined') {
      const { getCurrentUserAsync } = await import('./firebase/auth.js');
      await getCurrentUserAsync();
    }
  } catch (e) {
    // non-fatal
  }

  const loggedInUid = getLoggedInUserId();

  if (loggedInUid) {
    const userRecentRef = ref(rtdb, `users/${loggedInUid}/recentCalls`);
    try {
      const snap = await get(userRecentRef);
      const val = snap.exists() ? snap.val() : null;
      const toListen = new Set();

      if (val) {
        for (const [roomId, meta] of Object.entries(val)) {
          if (!meta || (meta.expiresAt && meta.expiresAt < Date.now())) {
            // remove expired
            await remove(
              ref(rtdb, `users/${loggedInUid}/recentCalls/${roomId}`)
            ).catch(() => {});
            continue;
          }
          toListen.add(roomId);
        }
      }

      // Also include saved contacts' roomIds
      try {
        const contacts = await getContacts();
        Object.values(contacts || {}).forEach((c) => {
          if (c?.roomId) toListen.add(c.roomId);
        });
      } catch (e) {
        // ignore
      }

      toListen.forEach((roomId) => listenForIncomingOnRoom(roomId));
    } catch (e) {
      console.warn('Failed to read recent calls from RTDB', e);
    }
    return;
  }

  // Guest: localStorage
  try {
    const raw = localStorage.getItem('recentCalls') || '{}';
    const obj = JSON.parse(raw);
    const cleaned = {};
    const toListen = new Set();
    for (const [roomId, meta] of Object.entries(obj || {})) {
      if (!meta || (meta.expiresAt && meta.expiresAt < Date.now())) {
        // skip expired
        continue;
      }
      cleaned[roomId] = meta;
      toListen.add(roomId);
    }
    // Also include saved contacts' roomIds
    try {
      const contacts = await getContacts();
      Object.values(contacts || {}).forEach((c) => {
        if (c?.roomId) toListen.add(c.roomId);
      });
    } catch (e) {
      // ignore
    }

    toListen.forEach((roomId) => listenForIncomingOnRoom(roomId));

    // overwrite with cleaned set (remove expired)
    localStorage.setItem('recentCalls', JSON.stringify(cleaned));
  } catch (e) {
    console.warn('Failed to read recent calls from localStorage', e);
  }
}

// ============================================================================
// UI Layout change helpers
// ============================================================================

let cleanupChatControlAutoHide = null;
let cleanupRemoteLeavePipHandler = null;
let cleanupRemoteEnterPipHandler = null;

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

  // Hide lobby if visible
  hideElement(lobbyDiv);

  chatControls.classList.remove('bottom');
  chatControls.classList.add('watch-mode');
  showElement(chatControls);
  // Disable auto-hide in watch mode to ensure accessibility
  if (cleanupChatControlAutoHide) {
    cleanupChatControlAutoHide();
    cleanupChatControlAutoHide = null;
  }

  if (!isRemoteVideoVideoActive()) {
    hideElement(remoteBoxEl);
    removeFromSmallFrame(remoteBoxEl);

    if (!isElementInPictureInPicture(localVideoEl)) {
      showElement(localBoxEl);
      placeInSmallFrame(localBoxEl);
    }
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
      inactivityMs: 3000,
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

  if (!isRemoteVideoVideoActive()) {
    showElement(lobbyDiv);
    showElement(createLinkBtn);
    showElement(copyLinkBtn);
  }

  setWatchMode(false);
}

let enterCallModeWaitingForVideo = false;

let enterCallMode = () => {
  // Check if remote video is ready and playing
  const remoteStream = getRemoteStream(false);
  if (
    !remoteVideoEl ||
    !remoteStream ||
    remoteVideoEl.paused ||
    remoteVideoEl.readyState < 2
  ) {
    // Video not ready yet - set up listener if we haven't already
    if (!enterCallModeWaitingForVideo) {
      enterCallModeWaitingForVideo = true;
      remoteVideoEl.addEventListener(
        'playing',
        () => {
          enterCallModeWaitingForVideo = false;
          enterCallMode();
        },
        { once: true }
      );
    }
    return;
  }

  // Video is ready and playing - proceed with entering call mode
  enterCallModeWaitingForVideo = false;

  showElement(remoteBoxEl);
  placeInSmallFrame(localBoxEl);

  hideElement(lobbyDiv);
  hideElement(createLinkBtn);
  hideElement(copyLinkBtn);

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

  if (!cleanupRemoteLeavePipHandler) {
    const remoteLeavePipHandler = () => {
      if (isWatchModeActive()) placeInSmallFrame(remoteBoxEl);
      else removeFromSmallFrame(remoteBoxEl);
      showElement(remoteBoxEl);
    };
    // Handle case when user exits PiP manually
    remoteVideoEl.addEventListener(
      'leavepictureinpicture',
      remoteLeavePipHandler
    );

    cleanupRemoteLeavePipHandler = () =>
      remoteVideoEl.removeEventListener(
        'leavepictureinpicture',
        remoteLeavePipHandler
      );

    cleanupFunctions.push(cleanupRemoteLeavePipHandler);
  }

  if (!cleanupRemoteEnterPipHandler) {
    const remoteEnterPipHandler = () => hideElement(remoteBoxEl);

    remoteVideoEl.addEventListener(
      'enterpictureinpicture',
      remoteEnterPipHandler
    );

    cleanupRemoteEnterPipHandler = () =>
      remoteVideoEl.removeEventListener(
        'enterpictureinpicture',
        remoteEnterPipHandler
      );

    cleanupFunctions.push(cleanupRemoteEnterPipHandler);
  }
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

  showElement(chatControls); // Ensure visible

  createLinkBtn.disabled = false;
  copyLinkBtn.disabled = true;
  showElement(lobbyDiv);
  showElement(createLinkBtn);
  showElement(copyLinkBtn);
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
          if (isYTVisible()) {
            hideYouTubePlayer();
            exitWatchMode();
          } else {
            showYouTubePlayer();
            enterWatchMode();
          }
        } else if (getLastWatched() === 'url') {
          if (isSharedVideoVisible()) {
            hideElement(sharedBoxEl);
            exitWatchMode();
          } else {
            showElement(sharedBoxEl);
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
      } else if (getLastWatched() === 'url' && isSharedVideoVisible()) {
        sharedVideoEl.pause();
        hideElement(sharedBoxEl);
      }
      exitWatchMode();
    }
  });

  keyListenersAdded = true;
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// const recentCallBtn = document.getElementById('recent-call-btn');
// if (recentCallBtn) {
//   recentCallBtn.onclick = async () => {
//     const lastRoomId = localStorage.getItem('lastRoomId') || null;
//     if (lastRoomId) {
//       await joinSavedRoom(lastRoomId);
//     }
//   };
// } else {
//   console.warn('no recent call button ');
// }

async function handleCopyLink() {
  if (currentRoomLink) {
    const success = await copyToClipboard(currentRoomLink);
    if (success) {
      updateStatus('Link copied to clipboard!');
      alert('Link copied!');
    } else {
      updateStatus('Failed to copy link to clipboard.');
    }
  }
}

callBtn.onclick = async () => await createCall();

createLinkBtn.onclick = async () => await createCall();

copyLinkBtn.onclick = async () => await handleCopyLink();

hangUpBtn.onclick = async () => await hangUp();

// ============================================================================
// TEST: JOIN ROOM BUTTON (TEMPORARY - FOR TESTING)
// ============================================================================

function normalizeRoomInput(raw) {
  let room = raw.trim();
  if (!room) return '';
  try {
    const maybeUrl = new URL(room, window.location.origin);
    const q = maybeUrl.searchParams.get('room');
    if (q) return q;
    const hashMatch = maybeUrl.hash.match(/room=([^&]+)/);
    if (hashMatch) return decodeURIComponent(hashMatch[1]);
    return maybeUrl.pathname.replace(/^\//, '') || room;
  } catch (e) {
    return room; // not a full URL
  }
}

async function waitForLocalStream(timeoutMs = 5000) {
  if (getLocalStream()) return true;
  const start = Date.now();
  return new Promise((resolve) => {
    const check = () => {
      if (getLocalStream()) return resolve(true);
      if (Date.now() - start > timeoutMs) return resolve(false);
      setTimeout(check, 150);
    };
    check();
  });
}

async function registerJoinButton() {
  if (!joinRoomBtn || !roomIdInput) return false;

  // disable until init enables it
  joinRoomBtn.disabled = false;

  joinRoomBtn.onclick = async () => {
    const raw = roomIdInput.value || '';
    const inputRoomId = normalizeRoomInput(raw);
    if (!inputRoomId) {
      updateStatus('Please enter a room ID');
      return false;
    }

    const mediaReady = await waitForLocalStream(5000);
    if (!mediaReady) {
      updateStatus('Camera not ready. Please allow permissions and try again.');
      return false;
    }

    return await joinOrCreateRoomWithId(inputRoomId);
  };

  return true;
}

// document.addEventListener('DOMContentLoaded', () => {
//   if (!joinRoomBtn || !roomIdInput) {
//     console.warn('Join room button or input element not found');
//     return;
//   }

//   joinRoomBtn.onclick = async () => {
//     let inputRoomId = roomIdInput.value.trim();
//     if (!inputRoomId) {
//       updateStatus('Please enter a room ID');
//       return;
//     }

//     // Normalize if user pasted a full URL like https://.../?room=ROOMID
//     try {
//       const maybeUrl = new URL(inputRoomId, window.location.origin);
//       const q = maybeUrl.searchParams.get('room');
//       if (q) inputRoomId = q;
//       else {
//         // also accept hash or path-style ids if needed
//         const hashMatch = maybeUrl.hash.match(/room=([^&]+)/);
//         if (hashMatch) inputRoomId = decodeURIComponent(hashMatch[1]);
//       }
//     } catch (e) {
//       // not a full URL -- keep input as-is
//     }

//     await joinOrCreateRoomWithId(inputRoomId);
//   };
// });

// ============================================================================
// AUTO-JOIN FROM URL PARAMETER
// ============================================================================

async function autoJoinFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlRoomId = urlParams.get('room');

  if (!urlRoomId) return false;

  const success = await joinOrCreateRoomWithId(urlRoomId);

  if (!success) {
    clearUrlParam();
    exitCallMode();
  }

  updateStatus('Auto-joined room from URL');
  return success;
}

// ============================================================================
// INITIALIZE ON PAGE LOAD
// ============================================================================

window.onload = async () => {
  const initSuccess = await init();

  if (!initSuccess) {
    callBtn.disabled = true;
    console.error('Initialization failed. Cannot start chat.');
    return;
  }

  const joinBtnSuccess = await registerJoinButton();
  if (!joinBtnSuccess) devDebug('Join button registration failed');

  // Render saved contacts list in lobby
  renderContactsList(lobbyDiv).catch((e) => {
    console.warn('Failed to render contacts list:', e);
  });

  // Start listening for incoming calls on any saved/recent room ids
  startListeningForSavedRooms().catch((e) =>
    console.warn('Failed to start saved-room listeners', e)
  );

  // Auto-join if room parameter exists
  const autoJoinedSuccessfully = await autoJoinFromUrl();
  if (autoJoinedSuccessfully) return;

  updateStatus('Ready. Click "Start New Chat" to begin.');
};

// Handle page leave
window.addEventListener('beforeunload', async (e) => {
  // Trigger browser's generic "leave page?" dialog if in active call (in PROD)
  if (import.meta.env.PROD && pc && pc.connectionState === 'connected') {
    e.preventDefault();
    e.returnValue = // NOTE: Modern browsers ignore returnValue text
      'You are in an active call. Are you sure you want to leave?';
    return e.returnValue;
  }

  await cleanup();
});

// ============================================================================
// HANG UP / CLEANUP
// ============================================================================

let isHangingUp = false;

async function hangUp() {
  if (isHangingUp) return;
  isHangingUp = true;

  console.debug('Hanging up...');

  // Hide calling UI if still visible
  hideCallingUI();

  // Capture partner info before cleanup for contact save
  const partnerToSave = partnerUserId;
  const roomToSave = currentRoomId;

  try {
    await RoomService.leaveRoom(getUserId());
  } catch (err) {
    console.warn('leaveRoom failed during hangUp:', err);
  }

  // Clean up remote stream
  cleanupRemoteStream();
  if (remoteVideoEl) {
    remoteVideoEl.srcObject = null;
  }

  if (pc) {
    pc.close();
    pc = null;
  }

  // Reset SDP tracking so next call can process fresh SDPs
  lastAnswerSdp = null;
  lastOfferSdp = null;

  // Reset UI
  exitCallMode();

  updateStatus('Disconnected. Click "Start New Chat" to begin.');

  // Prompt to save contact after hanging up (if partner was present)
  if (partnerToSave && roomToSave) {
    // Small delay so UI settles before prompt
    setTimeout(() => {
      saveContact(partnerToSave, roomToSave, lobbyDiv).catch((e) => {
        console.warn('Failed to save contact:', e);
      });
    }, 500);
  }

  // Reset partner/room tracking
  partnerUserId = null;
  currentRoomId = null;

  isHangingUp = false;
}

async function cleanup() {
  await hangUp();

  cleanupMediaControls();

  removeAllRTDBListeners();

  // await RoomService.leaveRoom(getUserId());
  RoomService.cleanupListeners();

  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((err) => console.error(err));
  }

  if (messagesUI && messagesUI.cleanup) {
    messagesUI.cleanup();
    messagesUI = null;
  }

  // Reset state
  role = null;
  lastAnswerSdp = null;
  lastOfferSdp = null;

  // Clear URL parameter
  window.history.replaceState({}, document.title, window.location.pathname);

  currentRoomLink = null;
  sharedVideoEl.src = '';
  syncStatus.textContent = '';

  cleanupLocalStream();
  cleanupLocalVideoOnlyStream();
  if (localVideoEl) {
    localVideoEl.srcObject = null;
  }
  if (remoteVideoEl) {
    remoteVideoEl.srcObject = null;
  }

  exitWatchMode();
  setLastWatched('none');
  destroyYouTubePlayer();
  setYouTubeReady(false);

  cleanupSearchUI();
  cleanupFunctions.forEach((cleanupFn) => cleanupFn());
}
