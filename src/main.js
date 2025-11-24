// main.js

// ============================================================================
// HANGVIDU - P2P VIDEO CHAT WITH WATCH-TOGETHER MODE
// ============================================================================

import './initSentry.js'; // Initialize Sentry

import '@fortawesome/fontawesome-free/css/all.min.css';
import { set, get, remove } from 'firebase/database';
import {
  removeAllRTDBListeners,
  removeRTDBListenersForRoom,
  getUserRecentCallsRef,
  getUserRecentCallRef,
} from './storage/fb-rtdb/rtdb.js';
import {
  getLoggedInUserId,
  getUserId,
  onAuthChange,
  authReady,
} from './firebase/auth.js';

import { initializeAuthUI } from './components/auth/AuthComponent.js';

import {
  showElement,
  hideElement,
  isElementInPictureInPicture,
  placeInSmallFrame,
  removeFromSmallFrame,
} from './utils/ui/ui-utils.js';

import { clearUrlParam } from './utils/url.js';
import {
  enterWatchMode,
  exitWatchMode,
  isRemoteVideoVideoActive,
} from './components/ui/watch-mode.js';
import { enterCallMode, exitCallMode } from './components/ui/call-mode.js';
import { setupShowHideOnInactivity } from './utils/ui/showHideOnInactivity.js';

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

import { initJoinRoomForm } from './components/lobby/join-room.js';

import CallController from './webrtc/call-controller.js';

import {
  localVideoEl,
  remoteVideoEl,
  sharedVideoEl,
  callBtn,
  hangUpBtn,
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
  lobbyCallBtn,
  titleAuthBar,
  // createLinkBtn,
  // copyLinkBtn,
  getElements,
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
import { addDebugUpdateButton } from './components/notifications/debug-notifications.js';

import { setUpLocalStream, setupRemoteStream } from './media/stream.js';

// OLD: Removed - now using CallController.createCall() and CallController.answerCall()
// import { createCall, answerCall } from './webrtc/call-flow.js';

import {
  getLocalStream,
  setLocalStream,
  cleanupLocalStream,
  getRemoteStream,
  cleanupRemoteStream,
  cleanupLocalVideoOnlyStream,
} from './media/state.js';

import {
  copyToClipboard,
  showCopyLinkModal,
} from './components/modal/copyLinkModal.js';
import {
  devDebug,
  setDevDebugEnabled,
  tempWarn,
} from './utils/dev/dev-utils.js';

import RoomService from './room.js';
import { getDiagnosticLogger } from './utils/dev/diagnostic-logger.js';
import confirmDialog from './components/base/confirm-dialog.js';

// Quick access to enable / disable dev debug logs
setDevDebugEnabled(true);
getDiagnosticLogger().disable();

// ============================================================================
// GLOBAL STATE
// ============================================================================

// Call state now managed by CallController - use CallController.getState()
// to access pc, dataChannel, partnerId, role, messagesUI, roomId, roomLink

let cleanupFunctions = [];

// ============================================================================
// INITIALIZATION & MEDIA SETUP
// ============================================================================

async function init() {
  initUI();
  // exitCallMode(); // Ensure UI is in initial state

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
    devDebug('Error: Required UI elements not found.');
    return false;
  }

  try {
    if (import.meta.env.VITE_DISABLE_PWA === '0') {
      const { setupPWA } = await import('./pwa/PWA.js');
      await setupPWA();
    }

    initializeSearchUI();
    addKeyListeners();

    // Wait for auth initialization (persistence + redirect processing) before setting up auth UI
    await authReady;

    const authComponent = initializeAuthUI(titleAuthBar);
    if (authComponent) cleanupFunctions.push(authComponent.dispose);

    await initLocalStreamAndMedia(); // Todo: lazy init on first call?

    // Add debug button for testing update notification (dev only)
    addDebugUpdateButton();

    return true;
  } catch (error) {
    console.error('Failed to get user media:', error);
    devDebug('Error: Please allow camera and microphone access.');
    return false;
  }
}

// Todo: remove flag or finialize usage
let hasInitLocalStreamAndMedia = false;

// Reset flag to allow stream re-initialization after cleanup
export function resetLocalStreamInitFlag() {
  hasInitLocalStreamAndMedia = false;
}

async function initLocalStreamAndMedia() {
  if (hasInitLocalStreamAndMedia) return;
  hasInitLocalStreamAndMedia = true;

  await setUpLocalStream(localVideoEl);

  initializeMediaControls({
    getLocalStream,
    getLocalVideo: () => localVideoEl,
    getRemoteVideo: () => remoteVideoEl,
    getPeerConnection: () => CallController.getState().pc,
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
      if (localBoxEl && !(isWatchModeActive() && isRemoteVideoVideoActive())) {
        showElement(localBoxEl);
      }
    });
  }
}

function initUI() {
  hideElement(remoteBoxEl);
  hideElement(localBoxEl);
  hideElement(sharedBoxEl);
  hideElement(chatControls);
  // hideElement(lobbyDiv);
}

// ============================================================================
// CALL SETUP HELPERS
// ============================================================================

// Helper to build call options
function getCallOptions(targetRoomId = null) {
  return {
    localStream: getLocalStream(),
    localVideoEl,
    remoteVideoEl,
    mutePartnerBtn,
    setupRemoteStream,
    setupWatchSync,
    targetRoomId,
  };
}

/**
 * Helper to apply call result and update global state
 * Note: CallController also stores this state internally
 * TODO: Migrate remaining code to use CallController.getState() instead of globals
 */
function applyCallResult(result, showLinkModal = false) {
  if (!result.success) return false;

  // DON'T hide calling UI here - it should stay visible until call is answered
  // hideCallingUI() is called in onCallAnswered() when connection is established

  // CallController already has all state via createCall/answerCall
  // No need to store in globals anymore

  if (showLinkModal && result.roomLink) {
    showCopyLinkModal(result.roomLink, {
      onCopy: () => devDebug('Link ready! Share with your partner.'),
      onCancel: () =>
        devDebug(
          'Link ready! Use the copy button to use it, or create a new one.'
        ),
    });
  }

  // copyLinkBtn.disabled = false;
  return true;
}

export async function joinOrCreateRoomWithId(
  customRoomId,
  { forceInitiator = false } = {}
) {
  try {
    // Always ensure local stream is initialized
    await initLocalStreamAndMedia();
  } catch (error) {
    console.error('Failed to initialize local media stream:', error);
    devDebug('Error: Could not initialize camera/mic.');
    return false;
  }

  const startTime = Date.now();

  // If caller explicitly wants to initiate (e.g., calling a saved contact),
  // create a fresh offer in this room regardless of existing state.
  if (forceInitiator) {
    getDiagnosticLogger().logRoomCreation(
      customRoomId,
      true,
      {
        creationTime: startTime,
        listenerAttachTime: startTime, // Will be updated when listener attaches
        timeDiff: 0,
      },
      {
        trigger: 'force_initiator',
        reason: 'calling_saved_contact',
      }
    );

    await initLocalStreamAndMedia();

    //  const result = await createCall(getCallOptions(customRoomId));
    const result = await CallController.createCall(
      getCallOptions(customRoomId)
    );

    return applyCallResult(result, false);
  }

  // Check room status with retry to handle race condition
  let status = await RoomService.checkRoomStatus(customRoomId);

  // If room exists but appears empty, wait briefly and check again
  // to handle the race where User A just created room but member data isn't written yet
  if (status.exists && !status.hasMembers) {
    const maxRetries = 3;
    let attempt = 0;
    while (attempt < maxRetries && !status.hasMembers) {
      await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1))); // 250ms, 500ms, 750ms
      status = await RoomService.checkRoomStatus(customRoomId);
      attempt++;
    }
  }

  // Room doesn't exist OR is empty → create as initiator
  if (!status.exists || !status.hasMembers) {
    getDiagnosticLogger().logRoomCreation(
      customRoomId,
      true,
      {
        creationTime: startTime,
        listenerAttachTime: startTime,
        timeDiff: 0,
      },
      {
        trigger: 'room_empty_or_nonexistent',
        roomExists: status.exists,
        memberCount: status.memberCount || 0,
      }
    );

    await initLocalStreamAndMedia();

    const result = await CallController.createCall(
      getCallOptions(customRoomId)
    );
    return applyCallResult(result, true); // Show modal when creating via join form
  }

  // Room exists with members → join as joiner
  devDebug('Joining room...');
  getDiagnosticLogger().log('ROOM', 'JOINING_EXISTING', {
    roomId: customRoomId,
    memberCount: status.memberCount,
    roomExists: status.exists,
  });

  const result = await CallController.answerCall({
    roomId: customRoomId,
    ...getCallOptions(),
  });
  return applyCallResult(result, false);
}

// ============================================================================
// RECENT CALLS (24h TTL) + INCOMING CALL LISTENERS
// ============================================================================

// Track which roomIds we've already attached incoming listeners for
const listeningRoomIds = new Set();

// Track incoming call listener cleanup functions for each room
// Map<roomId, Array<() => void>>
const incomingListenerCleanups = new Map();

/**
 * Remove incoming call listeners for a specific room
 * @param {string} roomId - Room ID to clean up listeners for
 */
function removeIncomingListenersForRoom(roomId) {
  if (!roomId) return;

  devDebug(`[LISTENER] Removing incoming listeners for room: ${roomId}`);

  // Remove from RTDB listener tracking
  removeRTDBListenersForRoom(roomId);

  // Remove from our tracking sets
  listeningRoomIds.delete(roomId);
  incomingListenerCleanups.delete(roomId);

  getDiagnosticLogger().log('LISTENER', 'INCOMING_CLEANUP', {
    roomId,
    remainingListeners: listeningRoomIds.size,
  });
}

/**
 * Remove all incoming call listeners (e.g., on logout)
 */
function removeAllIncomingListeners() {
  devDebug(
    `[LISTENER] Removing all incoming listeners (${listeningRoomIds.size} rooms)`
  );

  // Get all room IDs before clearing
  const roomIds = Array.from(listeningRoomIds);

  // Clean up each room's listeners
  roomIds.forEach((roomId) => {
    removeRTDBListenersForRoom(roomId);
  });

  // Clear tracking
  listeningRoomIds.clear();
  incomingListenerCleanups.clear();

  getDiagnosticLogger().log('LISTENER', 'ALL_INCOMING_CLEANUP', {
    roomsCleared: roomIds.length,
  });
}

/**
 * Save a recent call for the current user (RTDB if logged in, localStorage otherwise).
 * Expires after 24 hours (expiresAt timestamp).
 */
async function saveRecentCall(roomId) {
  const now = Date.now();
  const expiresAt = now + 24 * 60 * 60 * 1000; // 24 hours
  const loggedInUid = getLoggedInUserId();

  if (loggedInUid) {
    const userRecentRef = getUserRecentCallRef(loggedInUid, roomId);
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
      await remove(getUserRecentCallRef(loggedInUid, roomId));
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
export function listenForIncomingOnRoom(roomId) {
  if (!roomId) return;

  devDebug(`[LISTENER] Attempting to attach listener for room: ${roomId}`);

  // Check if already listening, but allow re-attachment
  // Firebase RTDB handles duplicate listeners internally, so this is safe
  if (listeningRoomIds.has(roomId)) {
    devDebug(
      `[LISTENER] Listener already tracked for room: ${roomId}, re-attaching to ensure it's active`
    );
    // Remove from tracking so we can re-attach
    listeningRoomIds.delete(roomId);
    // Also remove any existing RTDB listeners for this room
    removeRTDBListenersForRoom(roomId);
  }

  devDebug(
    `[LISTENER] Attaching listener for room: ${roomId} (total: ${
      listeningRoomIds.size + 1
    })`
  );

  listeningRoomIds.add(roomId);

  // Track cleanup functions for this room
  const cleanups = [];

  getDiagnosticLogger().logListenerAttachment(
    roomId,
    'member_join',
    listeningRoomIds.size,
    {
      action: 'incoming_call_listener_attached',
    }
  );

  // Use RoomService's member listener helper
  const memberJoinedCleanup = RoomService.onMemberJoined(
    roomId,
    async (snapshot) => {
      const joiningUserId = snapshot.key;
      const memberData = snapshot.val ? snapshot.val() : null;
      const currentUserId = getUserId();
      if (joiningUserId && joiningUserId !== currentUserId) {
        devDebug(`incoming call from ${joiningUserId} for room ${roomId}`);

        getDiagnosticLogger().logMemberJoinEvent(
          roomId,
          joiningUserId,
          memberData || {},
          {
            detectedBy: 'incoming_call_listener',
            currentUserId,
          }
        );

        // Prefer the member's joinedAt as the primary freshness signal (real-time join)
        const joinedAt =
          memberData && typeof memberData.joinedAt === 'number'
            ? memberData.joinedAt
            : null;
        const CALL_FRESH_MS = 20000;

        let isFresh = false;
        let validationMethod = 'none';
        let age = 0;

        if (joinedAt) {
          age = Date.now() - joinedAt;
          isFresh = age < CALL_FRESH_MS;
          validationMethod = 'joinedAt';
        }

        // If joinedAt isn't present or seems old (e.g., listener attached late),
        // fall back to caller-scoped outgoing marker (for logged-in callers),
        // or room-scoped createdAt (for guests)
        if (!isFresh) {
          const outgoingFresh = await isOutgoingCallFresh(
            joiningUserId,
            roomId
          );
          const roomFresh = await isRoomCallFresh(roomId);
          isFresh = outgoingFresh || roomFresh;
          validationMethod = outgoingFresh
            ? 'outgoingState'
            : roomFresh
            ? 'roomCreatedAt'
            : 'failed';
        }

        const freshnessResult = {
          isFresh,
          method: validationMethod,
          age,
          reason: isFresh ? 'call_is_fresh' : 'call_is_stale',
        };

        getDiagnosticLogger().logIncomingCallEvent(
          joiningUserId,
          roomId,
          freshnessResult,
          {
            memberData,
            joinedAt,
            CALL_FRESH_MS,
          }
        );

        if (!isFresh) {
          devDebug(
            `Ignoring stale incoming call from ${joiningUserId} for room ${roomId}`
          );
          getDiagnosticLogger().logNotificationDecision(
            'REJECT',
            'stale_call',
            roomId,
            {
              age,
              validationMethod,
              joiningUserId,
            }
          );
          return;
        }

        // Minimal prompt to accept or reject the incoming call.
        // Only prompt if we're not already in an active call and the room is in a valid offer state.
        // Check offer/answer state before showing dialog
        let roomData;
        try {
          roomData = await RoomService.getRoomData(roomId);
        } catch (e) {
          return; // Room may have been deleted
        }

        if (!roomData || typeof roomData !== 'object') return;

        const hasOffer = !!roomData.offer;
        const hasAnswer = !!roomData.answer;
        const offerCreator = roomData.createdBy;
        if (!hasOffer || hasAnswer || offerCreator === currentUserId) return;

        const state = CallController.getState();
        const inActiveCall =
          !!state.pc && state.pc.connectionState === 'connected';
        if (inActiveCall) {
          getDiagnosticLogger().logNotificationDecision(
            'REJECT',
            'already_in_call',
            roomId,
            {
              joiningUserId,
              currentCallState: state.pc?.connectionState,
            }
          );
          return;
        }

        getDiagnosticLogger().logNotificationDecision(
          'SHOW',
          'fresh_call_detected',
          roomId,
          {
            joiningUserId,
            freshnessResult,
          }
        );

        const accept = await confirmDialog(
          `Incoming call from ${joiningUserId} for room ${roomId}.\n\nAccept?`
        );

        if (accept) {
          // Remove incoming call listeners before starting active call
          // This prevents duplicate listener firing (incoming vs active call listeners)
          removeIncomingListenersForRoom(roomId);

          getDiagnosticLogger().logNotificationDecision(
            'ACCEPT',
            'user_accepted',
            roomId,
            {
              joiningUserId,
            }
          );
          joinOrCreateRoomWithId(roomId).catch((e) => {
            console.warn('Failed to answer incoming call:', e);
            devDebug('Failed to answer incoming call.');
            getDiagnosticLogger().logFirebaseOperation(
              'join_room_on_accept',
              false,
              e,
              {
                roomId,
                joiningUserId,
              }
            );
          });
        } else {
          devDebug('Incoming call rejected by user');
          getDiagnosticLogger().logNotificationDecision(
            'REJECT',
            'user_rejected',
            roomId,
            {
              joiningUserId,
            }
          );

          // Send a direct rejection signal so the caller gets immediate feedback (no 30s timeout)
          try {
            await RoomService.rejectCall(roomId, getUserId(), 'user_rejected');
          } catch (e) {
            console.warn('Failed to signal rejection via RTDB:', e);
          }

          // Clean up recent call state for this client
          await removeRecentCall(roomId).catch((e) => {
            console.warn('Failed to remove recent call on rejection:', e);
          });
        }
      }
    }
  );

  // INCOMING CALL cancellation listener
  // Fires when caller cancels BEFORE callee accepts
  // Dismisses incoming dialog and removes recent call entry
  RoomService.onCallCancelled(roomId, async (snapshot) => {
    const data =
      snapshot && typeof snapshot.val === 'function' ? snapshot.val() : null;
    if (!data) return;
    try {
      const { dismissActiveConfirmDialog } = await import(
        './components/base/confirm-dialog.js'
      );
      if (typeof dismissActiveConfirmDialog === 'function') {
        dismissActiveConfirmDialog();
      }
    } catch (_) {
      // best-effort
    }
    await removeRecentCall(roomId).catch(() => {});
    devDebug(
      `[LISTENER] Incoming call cancelled by caller for room: ${roomId}`
    );
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
      // and clean up the incoming listeners for this room
      if (!status.hasMembers) {
        await removeRecentCall(roomId);
        removeIncomingListenersForRoom(roomId);
        devDebug(
          `Removed saved recent call and listeners for room ${roomId} because it is now empty`
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
  const startTime = Date.now();
  getDiagnosticLogger().log('LISTENER', 'STARTUP_BEGIN', {
    timestamp: startTime,
    currentListenerCount: listeningRoomIds.size,
  });

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
  getDiagnosticLogger().log('LISTENER', 'AUTH_STATE_DETERMINED', {
    isLoggedIn: !!loggedInUid,
    userId: loggedInUid || 'guest',
  });

  if (loggedInUid) {
    const userRecentRef = getUserRecentCallsRef(loggedInUid);
    try {
      const snap = await get(userRecentRef);
      const val = snap.exists() ? snap.val() : null;
      const toListen = new Set();

      if (val) {
        for (const [roomId, meta] of Object.entries(val)) {
          if (!meta || (meta.expiresAt && meta.expiresAt < Date.now())) {
            // remove expired
            await remove(getUserRecentCallRef(loggedInUid, roomId)).catch(
              () => {}
            );
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

      getDiagnosticLogger().log('LISTENER', 'STARTUP_COMPLETE', {
        storage: 'rtdb',
        roomsToListen: Array.from(toListen),
        totalListeners: listeningRoomIds.size,
        duration: Date.now() - startTime,
      });
    } catch (e) {
      console.warn('Failed to read recent calls from RTDB', e);
      getDiagnosticLogger().logFirebaseOperation(
        'read_recent_calls',
        false,
        e,
        {
          storage: 'rtdb',
          userId: loggedInUid,
        }
      );
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

    getDiagnosticLogger().log('LISTENER', 'STARTUP_COMPLETE', {
      storage: 'localStorage',
      roomsToListen: Array.from(toListen),
      totalListeners: listeningRoomIds.size,
      duration: Date.now() - startTime,
      expiredRoomsRemoved: Object.keys(obj || {}).length - toListen.size,
    });
  } catch (e) {
    console.warn('Failed to read recent calls from localStorage', e);
    getDiagnosticLogger().logFirebaseOperation('read_recent_calls', false, e, {
      storage: 'localStorage',
    });
  }
}

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
        const state = CallController.getState();
        if (state.messagesUI) {
          state.messagesUI.toggleMessages();
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
  const state = CallController.getState();
  if (state.roomLink) {
    const success = await copyToClipboard(state.roomLink);
    if (success) {
      devDebug('Link copied to clipboard!');
      alert('Link copied!');
    } else {
      devDebug('Failed to copy link to clipboard.');
    }
  }
}

const handleCall = async () => {
  await initLocalStreamAndMedia();
  // const result = await createCall(getCallOptions());
  const result = await CallController.createCall(getCallOptions());
  applyCallResult(result, true);
};

callBtn.onclick = handleCall;
lobbyCallBtn.onclick = handleCall;

// createLinkBtn.onclick = async () => {
//   const result = await createCall(getCallOptions());
//   applyCallResult(result, true);
// };

// copyLinkBtn.onclick = async () => await handleCopyLink();

hangUpBtn.onclick = async () => {
  console.debug('Hanging up...');

  // Call CallController.hangUp (emits cancellation and performs cleanup)
  // The 'cleanup' event handler will handle all UI updates including contact save prompt
  await CallController.hangUp({ emitCancel: true, reason: 'user_hung_up' });
};

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

  devDebug('Auto-joined room from URL');
  return success;
}

// ============================================================================
// INITIALIZE ON PAGE LOAD
// ============================================================================

// Import and call iOS PWA redirect helper before any other initialization
import { redirectIOSPWAToHosting } from './utils/env/redirectIOSPWA.js';
redirectIOSPWAToHosting();

window.onload = async () => {
  const initSuccess = await init();

  if (!initSuccess) {
    callBtn.disabled = true;
    console.error('Initialization failed. Cannot start chat.');
    return;
  }

  const onJoinRoomSubmit = async (roomInputString) => {
    const inputRoomId = normalizeRoomInput(roomInputString || '');
    if (!inputRoomId) {
      devDebug('Please enter a valid Room ID');
      return false;
    }

    const mediaReady = await waitForLocalStream(5000);
    if (!mediaReady) {
      devDebug('Waiting for camera/mic to be ready...');
      return false;
    }

    try {
      return await joinOrCreateRoomWithId(inputRoomId);
    } catch (error) {
      console.error('Failed to join or create room:', error);
      devDebug('Error joining room. Please try again.');
      return false;
    }
  };

  // Initialize join room form
  // const joinRoomContainer = document.getElementById('join-room-container');
  // if (joinRoomContainer) {
  //   initJoinRoomForm(joinRoomContainer, onJoinRoomSubmit);
  // }

  // Start listening for incoming calls on any saved/recent room ids FIRST
  await startListeningForSavedRooms().catch((e) =>
    console.warn('Failed to start saved-room listeners', e)
  );

  // Then render saved contacts list in lobby (now listeners are ready)
  renderContactsList(lobbyDiv).catch((e) => {
    console.warn('Failed to render contacts list:', e);
  });

  // Re-render contacts on auth changes so private contacts are hidden on logout
  // Also clean up incoming listeners on logout to prevent accumulation
  let previousAuthState = null;
  const unsubscribeAuthContacts = onAuthChange(async ({ isLoggedIn, user }) => {
    try {
      // Track state changes to differentiate initial load from actual logout
      const isInitialLoad = previousAuthState === null;
      const isActualLogout = previousAuthState === true && !isLoggedIn;
      const isActualLogin = previousAuthState === false && isLoggedIn;

      previousAuthState = isLoggedIn;

      await renderContactsList(lobbyDiv);

      // Only clean up on actual logout (not initial load)
      if (isActualLogout) {
        devDebug('[AUTH] User logged out - cleaning up incoming listeners');
        removeAllIncomingListeners();
      } else if (isActualLogin) {
        // On login, re-attach listeners for saved rooms
        devDebug('[AUTH] User logged in - re-attaching incoming listeners');
        await startListeningForSavedRooms().catch((e) =>
          console.warn('Failed to re-attach saved-room listeners on login', e)
        );
      } else if (isInitialLoad && isLoggedIn) {
        // If user is already logged in on initial load (e.g., after redirect)
        devDebug('[AUTH] Initial load with logged-in user');
        // Listeners already attached by startListeningForSavedRooms, no action needed
      }
    } catch (e) {
      console.warn('Failed to handle auth change:', e);
    }
  });
  cleanupFunctions.push(() => {
    try {
      if (typeof unsubscribeAuthContacts === 'function')
        unsubscribeAuthContacts();
    } catch (_) {}
  });

  // Auto-join if room parameter exists
  const autoJoinedSuccessfully = await autoJoinFromUrl();
  if (autoJoinedSuccessfully) return;

  devDebug('Ready. Click "Start New Chat" to begin.');
};

// Handle page leave
window.addEventListener('beforeunload', async (e) => {
  // Trigger browser's generic "leave page?" dialog if in active call (in PROD)
  const state = CallController.getState();
  if (
    import.meta.env.PROD &&
    state.pc &&
    state.pc.connectionState === 'connected'
  ) {
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

// ============================================================================
// CALLCONTROLLER EVENT SUBSCRIPTIONS
// ============================================================================

// Subscribe to CallController memberJoined event - handles partner joining
CallController.on('memberJoined', ({ memberId, roomId }) => {
  console.debug('CallController memberJoined event', { memberId, roomId });

  CallController.setPartnerId(memberId);
  enterCallMode();
  onCallAnswered().catch((e) =>
    console.warn('Failed to clear calling state:', e)
  );
  saveRecentCall(roomId).catch((e) =>
    console.warn('Failed to save recent call:', e)
  );
});

// Subscribe to CallController memberLeft event - handles partner leaving
CallController.on('memberLeft', ({ memberId }) => {
  console.debug('CallController memberLeft event', { memberId });
  console.info('Partner has left the call');
});

// Subscribe to CallController cleanup event - handles ALL cleanup UI updates
CallController.on('cleanup', ({ roomId, reason }) => {
  console.debug('CallController cleanup event', { roomId, reason });

  // Perform all UI cleanup
  hideCallingUI();
  cleanupRemoteStream();
  exitCallMode();
  devDebug('Disconnected. Click "Start New Chat" to begin.');
  clearUrlParam();
});

// Subscribe to CallController cleanup event - shows contact save prompt for both users
CallController.on('cleanup', ({ roomId, partnerId, reason }) => {
  console.debug('CallController cleanup event', {
    roomId,
    partnerId,
    reason,
  });

  // Prompt to save contact after cleanup (if partner was present)
  // This fires for BOTH users regardless of who initiated the hangup
  if (partnerId && roomId) {
    // Small delay so UI settles before prompt
    setTimeout(() => {
      saveContact(partnerId, roomId, lobbyDiv).catch((e) => {
        console.warn('Failed to save contact after cleanup:', e);
      });
    }, 500);
  }
});

// ============================================================================

async function cleanup() {
  // Call CallController.hangUp for page unload
  await CallController.hangUp({ emitCancel: true, reason: 'page_unload' });

  cleanupMediaControls();

  removeAllRTDBListeners();

  // await RoomService.leaveRoom(getUserId());
  // Global teardown: safe to remove all listeners on page unload

  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((err) => console.error(err));
  }

  const state = CallController.getState();
  if (state.messagesUI && state.messagesUI.cleanup) {
    state.messagesUI.cleanup();
  }

  // CallController.hangUp() already reset all call state
  // No need to reset globals anymore

  // Clear URL parameter
  window.history.replaceState({}, document.title, window.location.pathname);
  sharedVideoEl.src = '';

  // Note: Local stream cleanup is now handled by CallController.cleanupCall()
  // Only clean up if CallController hasn't already (e.g., page unload)
  cleanupLocalStream();
  cleanupLocalVideoOnlyStream();
  if (localVideoEl && localVideoEl.srcObject) {
    localVideoEl.srcObject = null;
  }
  if (remoteVideoEl && remoteVideoEl.srcObject) {
    remoteVideoEl.srcObject = null;
  }

  exitWatchMode();
  clearUrlParam();
  setLastWatched('none');
  destroyYouTubePlayer();
  setYouTubeReady(false);

  cleanupSearchUI();
  cleanupFunctions.forEach((cleanupFn) => cleanupFn());
}
