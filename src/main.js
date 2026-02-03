// main.js

// ============================================================================
// HANGVIDU - P2P VIDEO CHAT WITH WATCH-TOGETHER MODE
// ============================================================================

import './initSentry.js';
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
  getCurrentUserAsync,
} from './firebase/auth.js';

import { clearUrlParam } from './utils/url.js';

import { messagingController } from './messaging/messaging-controller.js';

import { getDeterministicRoomId } from './utils/room-id.js';

import { ringtoneManager } from './media/audio/ringtone-manager.js';

import CallController from './webrtc/call-controller.js';

import {
  localVideoEl,
  remoteVideoEl,
  sharedVideoEl,
  callBtn,
  hangUpBtn,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  remotePipBtn,
  micBtn,
  cameraBtn,
  switchCameraBtn,
  exitWatchModeBtn,
  chatControls,
  localBoxEl,
  remoteBoxEl,
  sharedBoxEl,
  lobbyDiv,
  lobbyCallBtn,
  titleAuthBar,
  pasteJoinBtn,
  addContactBtn,
  testNotificationsBtn,
  getElements,
} from './elements.js';

import {
  setupWatchSync,
  isWatchModeActive,
  getLastWatched,
  setLastWatched,
} from './firebase/watch-sync.js';

import { setUpLocalStream, setupRemoteStream } from './media/stream.js';

import {
  hasLocalStream,
  getLocalStream,
  setLocalStream,
  cleanupLocalStream,
  cleanupRemoteStream,
  cleanupLocalVideoOnlyStream,
} from './media/state.js';

import { devDebug, isDev, setDevDebugEnabled } from './utils/dev/dev-utils.js';

import RoomService from './room.js';
import { getDiagnosticLogger } from './utils/dev/diagnostic-logger.js';

import {
  listenForInvites,
  listenForAcceptedInvites,
  acceptInvite,
  declineInvite,
  cleanupInviteListeners,
} from './contacts/invitations.js';

import {
  captureReferral,
  processReferral,
} from './contacts/referral-handler.js';

import {
  getContactByRoomId,
  saveContactData,
  updateLastInteraction,
} from './components/contacts/contacts.js';

// TODO: inAppNotificationManager VS pushNotificationController - Compare and clarify distinction or combine!
import { inAppNotificationManager } from './components/notifications/in-app-notification-manager.js';
import { pushNotificationController } from './notifications/push-notification-controller.js';

// ____ UI RELATED IMPORTS - REFACTOR IN PROGRESS ____
import './ui/state.js'; // Initialize UI state (sets body data-view attribute)
import { initUI } from './ui/init-ui.js';
import { bindCallUI } from './ui/bind-call-ui.js';

import {
  onWatchModeEntered,
  onWatchModeExited,
} from './ui/watch-lifecycle-ui.js';

import {
  saveContact,
  renderContactsList,
  getContacts,
  resolveCallerName,
  cleanupContacts,
} from './components/contacts/contacts.js';

import {
  destroyYouTubePlayer,
  pauseYouTubeVideo,
  isYTVisible,
  showYouTubePlayer,
  hideYouTubePlayer,
  setYouTubeReady,
} from './media/youtube/youtube-player.js';

import {
  initializeMediaControls,
  cleanupMediaControls,
} from './media/media-controls.js';
import {
  cleanupSearchUI,
  initializeSearchUI,
} from './media/youtube/youtube-search.js';

import { createNotificationsToggle } from './components/notifications/notifications-toggle.js';
import { showSuccessToast, showErrorToast } from './utils/ui/toast.js';
import { createInviteNotification } from './components/notifications/invite-notification.js';

import { showElement, hideElement, exitPiP } from './utils/ui/ui-utils.js';
import { initializeAuthUI } from './components/auth/AuthComponent.js';
import { messagesUI } from './components/messages/messages-ui.js';
import confirmDialog from './components/base/confirm-dialog.js';
import { showAddContactModal } from './components/contacts/add-contact-modal.js';
import { callIndicators } from './utils/ui/call-indicators.js';
import {
  copyToClipboard,
  showCopyLinkModal,
} from './components/modal/copyLinkModal.js';

import {
  onCallAnswered,
  isRoomCallFresh,
} from './components/calling/calling-ui.js';
import { isRemoteVideoVideoActive } from './ui/legacy/watch-mode.js';
import { onCallConnected, onCallDisconnected } from './ui/call-lifecycle-ui.js';

import { addDebugUpdateButton } from './components/notifications/debug-notifications.js';
// ____ UI END ____

// Import and call iOS PWA redirect helper
import { redirectIOSPWAToHosting } from './utils/env/redirectIOSPWA.js';
redirectIOSPWAToHosting();

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

    // Load PWA update testing utility in development
    if (import.meta.env.DEV) {
      import('./pwa/test-update.js').catch(() => {
        // Silently fail if module not available
      });
    }

    initializeSearchUI();
    addKeyListeners();

    // Wait for auth initialization (persistence + redirect processing) before setting up auth UI
    await authReady;

    const authComponent = initializeAuthUI(titleAuthBar);
    if (authComponent) cleanupFunctions.push(authComponent.dispose);

    // Stream is now lazily initialized when user starts/joins a call
    // This prevents Bluetooth headphones from entering "call mode" on page load

    // Add debug button for testing update notification (dev only)
    addDebugUpdateButton();

    // Initialize notification system for production (PWA updates, etc.)
    const topRightMenu = document.querySelector('.top-right-menu');
    if (topRightMenu) {
      const notificationsToggle = createNotificationsToggle({
        parent: topRightMenu,
        hideWhenAllRead: true, // Hide when no notifications in prod
      });
      inAppNotificationManager.setToggle(notificationsToggle);
    }

    // Initialize FCM push notifications
    try {
      const fcmInitialized = await pushNotificationController.initialize();
      if (fcmInitialized) {
        console.log('[MAIN] FCM notifications initialized successfully');

        // Note: Permission requests are handled in onAuthChange after user logs in.
        // This ensures:
        // 1. Auth is ready and user is logged in (FCM token can be stored)
        // 2. Permission request happens from user interaction context (better browser support)
        // 3. No permission requests for anonymous/logged-out users
      } else {
        console.warn('[MAIN] FCM notifications failed to initialize');

        if (!pushNotificationController.isNotificationSupported()) {
          const { showPushUnsupportedNotification } =
            await import('./components/notifications/push-unsupported-notification.js');
          showPushUnsupportedNotification();
        }
      }
    } catch (error) {
      console.error('[MAIN] FCM initialization error:', error);
    }

    // DEBUG: Expose pushNotificationController to window for testing
    window.pushNotificationController = pushNotificationController;
    // Backward compatibility
    window.notificationController = pushNotificationController;
    window.getLoggedInUserId = getLoggedInUserId;

    return true;
  } catch (error) {
    console.error('Initialization error:', error, error && error.stack);
    devDebug('Error: Failed to initialize application.');
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
    getPeerConnection: () => CallController.getPeerConnection(),
    setLocalStream,

    micBtn,
    cameraBtn,
    switchCameraBtn,
    mutePartnerBtn,
    fullscreenPartnerBtn,
    remotePipBtn,
  });

  if (localVideoEl) {
    localVideoEl.addEventListener(
      'enterpictureinpicture',
      () => localBoxEl && hideElement(localBoxEl),
    );

    localVideoEl.addEventListener('leavepictureinpicture', () => {
      if (localBoxEl && !(isWatchModeActive() && isRemoteVideoVideoActive())) {
        showElement(localBoxEl);
      }
    });
  }
}

// ============================================================================
// CALL SETUP HELPERS
// ============================================================================

function handleMediaPermissionError(error) {
  if (
    error?.name === 'NotAllowedError' ||
    error?.name === 'PermissionDeniedError'
  ) {
    alert(
      'Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.',
    );
  }
  resetLocalStreamInitFlag();
}

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

  if (showLinkModal && result.roomLink) {
    showCopyLinkModal(result.roomLink, {
      onCopy: () => devDebug('Link ready! Share with your partner.'),
      onCancel: () =>
        devDebug(
          'Link ready! Use the copy button to use it, or create a new one.',
        ),
    });
  }

  // copyLinkBtn.disabled = false;
  return true;
}

export async function joinOrCreateRoomWithId(
  customRoomId,
  { forceInitiator = false } = {},
) {
  try {
    await initLocalStreamAndMedia();
  } catch (error) {
    console.error('Failed to initialize local media stream:', error);
    handleMediaPermissionError(error);
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
      },
    );

    const result = await CallController.createCall(
      getCallOptions(customRoomId),
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
      },
    );

    const result = await CallController.createCall(
      getCallOptions(customRoomId),
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

/**
 * Unified function to initiate a call to a contact.
 * Handles room generation, RTDB updates, UI triggers, and push notifications.
 *
 * @param {string} contactId - The ID of the contact to call
 * @param {string} contactName - The name of the contact
 * @param {string} [roomId] - Existing room ID (generated if not provided)
 * @returns {Promise<boolean>} Success status
 */
export async function callContact(contactId, contactName, roomId = null) {
  // If no roomId is provided, try to generate a deterministic one
  if (!roomId && contactId) {
    const myUserId = getUserId();
    if (myUserId) {
      try {
        roomId = getDeterministicRoomId(myUserId, contactId);
        console.log('[CALL] Generated deterministic room ID:', roomId);
        // Persist it so both sides use the same room next time
        await saveContactData(contactId, contactName, roomId);
      } catch (e) {
        console.error('[CALL] Failed to generate or save room ID:', e);
        return false;
      }
    }
  }

  if (!roomId) {
    console.error('[CALL] Cannot initiate call: No Room ID available');
    return false;
  }

  // Ensure listener is active for this room before calling
  listenForIncomingOnRoom(roomId);

  // Force initiator role to ensure fresh call nodes in RTDB
  const success = await joinOrCreateRoomWithId(roomId, {
    forceInitiator: true,
  }).catch((e) => {
    console.warn('[CALL] Failed to join or create room:', e);
    return false;
  });

  if (success) {
    // Update metadata
    updateLastInteraction(contactId).catch(() => {});

    // Trigger UI (Calling Modal)
    const { showCallingUI } = await import(
      './components/calling/calling-ui.js'
    );
    await showCallingUI(roomId, contactName);

    // Send push notification
    try {
      const currentUser = await getCurrentUserAsync();
      const callerName =
        currentUser?.displayName || currentUser?.email || getLoggedInUserId();

      await pushNotificationController.sendCallNotification(contactId, {
        roomId,
        callerId: getLoggedInUserId(),
        callerName,
      });
      console.log('[CALL] Push notification sent to:', contactName);
    } catch (error) {
      console.warn('[CALL] Failed to send push notification:', error);
    }
  }

  return success;
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
    `[LISTENER] Removing all incoming listeners (${listeningRoomIds.size} rooms)`,
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
      `[LISTENER] Listener already tracked for room: ${roomId}, re-attaching to ensure it's active`,
    );
    // Remove from tracking so we can re-attach
    listeningRoomIds.delete(roomId);
    // Also remove any existing RTDB listeners for this room
    removeRTDBListenersForRoom(roomId);
  }

  devDebug(
    `[LISTENER] Attaching listener for room: ${roomId} (total: ${
      listeningRoomIds.size + 1
    })`,
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
    },
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
          },
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
        // fall back to room-scoped createdAt (publicly readable)
        if (!isFresh) {
          const roomFresh = await isRoomCallFresh(roomId);
          isFresh = roomFresh;
          validationMethod = roomFresh ? 'roomCreatedAt' : 'failed';
          age = null; // joinedAt-based age not applicable for this fallback
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
          },
        );

        if (!isFresh) {
          devDebug(
            `Ignoring stale incoming call from ${joiningUserId} for room ${roomId}`,
          );
          getDiagnosticLogger().logNotificationDecision(
            'REJECT',
            'stale_call',
            roomId,
            {
              age,
              validationMethod,
              joiningUserId,
            },
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
            },
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
          },
        );

        // Resolve caller name from contacts
        const callerName = await resolveCallerName(roomId, joiningUserId);

        // Start incoming call ringtone and visual indicators
        ringtoneManager.playIncoming();
        callIndicators.startCallIndicators(callerName);

        let accept = false;
        try {
          accept = await confirmDialog(
            `Incoming call from ${callerName}.\n\nAccept?`,
          );
        } finally {
          // Stop ringtone and visual indicators after user responds (or on error)
          ringtoneManager.stop();
          callIndicators.stopCallIndicators();
        }

        if (accept) {
          // Remove incoming call listeners before starting active call
          // This prevents duplicate listener firing (incoming vs active call listeners)
          removeIncomingListenersForRoom(roomId);

          // Dismiss any call notifications for this room
          if (pushNotificationController.isNotificationEnabled()) {
            await pushNotificationController.dismissCallNotifications(roomId);
          }

          getDiagnosticLogger().logNotificationDecision(
            'ACCEPT',
            'user_accepted',
            roomId,
            {
              joiningUserId,
            },
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
              },
            );
          });
        } else {
          devDebug('Incoming call rejected by user');

          // Dismiss any call notifications for this room
          if (pushNotificationController.isNotificationEnabled()) {
            await pushNotificationController.dismissCallNotifications(roomId);
          }

          getDiagnosticLogger().logNotificationDecision(
            'REJECT',
            'user_rejected',
            roomId,
            {
              joiningUserId,
            },
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
    },
  );

  // INCOMING CALL cancellation listener
  // Fires when caller cancels BEFORE callee accepts
  // Dismisses incoming dialog and removes recent call entry
  RoomService.onCallCancelled(roomId, async (snapshot) => {
    const data =
      snapshot && typeof snapshot.val === 'function' ? snapshot.val() : null;
    if (!data) return;

    // Stop ringtone and visual indicators when call is cancelled
    ringtoneManager.stop();
    callIndicators.stopCallIndicators();

    // Dismiss any call notifications for this room
    if (pushNotificationController.isNotificationEnabled()) {
      await pushNotificationController
        .dismissCallNotifications(roomId)
        .catch(() => {});
    }

    try {
      const { dismissActiveConfirmDialog } =
        await import('./components/base/confirm-dialog.js');
      if (typeof dismissActiveConfirmDialog === 'function') {
        dismissActiveConfirmDialog();
      }
    } catch (_) {
      // best-effort
    }

    await removeRecentCall(roomId).catch(() => {});

    // Clean up incoming listeners for this room to prevent stale listener firing
    // UNLESS it is a saved contact - then we want to keep listening
    const savedContact = await getContactByRoomId(roomId);
    if (!savedContact) {
      removeIncomingListenersForRoom(roomId);
    } else {
      devDebug(
        `[LISTENER] Preserving listener for saved contact room: ${roomId} after cancellation`,
      );
    }

    devDebug(
      `[LISTENER] Incoming call cancelled by caller for room: ${roomId}`,
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
      // and clean up the incoming listeners for this room (UNLESS saved contact)
      if (!status.hasMembers) {
        await removeRecentCall(roomId);

        const savedContact = await getContactByRoomId(roomId);
        if (!savedContact) {
          removeIncomingListenersForRoom(roomId);
          devDebug(
            `Removed saved recent call and listeners for room ${roomId} because it is now empty`,
          );
        } else {
          devDebug(
            `Removed recent call but PRESERVED listeners for saved contact room ${roomId}`,
          );
        }
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
              () => {},
            );
            continue;
          }
          toListen.add(roomId);
        }
      }

      // Also include saved contacts' roomIds (or deterministic room IDs)
      try {
        const contacts = await getContacts();
        Object.entries(contacts || {}).forEach(([contactId, c]) => {
          if (c?.roomId) {
            toListen.add(c.roomId);
          } else if (contactId && loggedInUid) {
            // Generate deterministic room ID for contacts without explicit roomId
            try {
              const deterministicRoomId = getDeterministicRoomId(
                loggedInUid,
                contactId,
              );
              toListen.add(deterministicRoomId);
            } catch (e) {
              // Skip if unable to generate
            }
          }
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
        },
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
    // Also include saved contacts' roomIds (or deterministic room IDs)
    try {
      const contacts = await getContacts();
      const guestUserId = getUserId(); // Get guest user ID
      Object.entries(contacts || {}).forEach(([contactId, c]) => {
        if (c?.roomId) {
          toListen.add(c.roomId);
        } else if (contactId && guestUserId) {
          // Generate deterministic room ID for contacts without explicit roomId
          try {
            const deterministicRoomId = getDeterministicRoomId(
              guestUserId,
              contactId,
            );
            toListen.add(deterministicRoomId);
          } catch (e) {
            // Skip if unable to generate
          }
        }
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

  // TODO: refactor UI key handling
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
            onWatchModeExited();
          } else {
            showYouTubePlayer();
            onWatchModeEntered();
          }
        } else if (getLastWatched() === 'url' || getLastWatched() === 'file') {
          if (isSharedVideoVisible()) {
            hideElement(sharedBoxEl);
            onWatchModeExited();
          } else {
            showElement(sharedBoxEl);
            onWatchModeEntered();
          }
        }
      }
    }

    // Hide media player when pressing 'Escape', if player is visible
    if (event.key === 'Escape') {
      if (isWatchModeActive()) {
        if (getLastWatched() === 'yt' && isYTVisible()) {
          pauseYouTubeVideo();
          hideYouTubePlayer();
        } else if (getLastWatched() === 'url' && isSharedVideoVisible()) {
          sharedVideoEl.pause();
          hideElement(sharedBoxEl);
        } else if (getLastWatched() === 'file' && isSharedVideoVisible()) {
          sharedVideoEl.pause();
          hideElement(sharedBoxEl);
        }
        onWatchModeExited();
      }
    }
  });

  keyListenersAdded = true;
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

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
  try {
    await initLocalStreamAndMedia();
    const result = await CallController.createCall(getCallOptions());
    applyCallResult(result, true);
  } catch (error) {
    console.error('Failed to start call:', error);
    handleMediaPermissionError(error);
  }
};

callBtn.onclick = handleCall;
lobbyCallBtn.onclick = handleCall;

// Paste & Join: read clipboard, extract room ID, and join
if (pasteJoinBtn) {
  if (navigator.clipboard && navigator.clipboard.readText) {
    pasteJoinBtn.onclick = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        const roomId = normalizeRoomInput(clipboardText);

        if (!roomId) {
          alert('No valid room link found in clipboard.');
          return;
        }

        await joinOrCreateRoomWithId(roomId);
      } catch (error) {
        // Clipboard access denied or other error
        if (error.name === 'NotAllowedError') {
          alert(
            'Clipboard access denied. Please allow clipboard access or paste the link manually.',
          );
        } else {
          console.error('Paste & Join failed:', error);
          alert('Failed to read clipboard. Please try again.');
        }
      }
    };
  } else {
    pasteJoinBtn.style.display = 'none';
    console.warn(
      'Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).',
    );
  }
}

// Add Contact button
if (addContactBtn) {
  addContactBtn.onclick = async () => {
    await showAddContactModal();
  };
}

// Test Notifications button (development/testing only)
if (isDev() && testNotificationsBtn) {
  showElement(testNotificationsBtn);
  testNotificationsBtn.onclick = async () => {
    try {
      console.log('[TEST] Testing notification permissions...');

      const result = await pushNotificationController.requestPermission({
        title: 'Enable Push Notifications',
        explain:
          'Get notified of incoming calls and messages even when HangVidU is closed.',
        onGranted: () => {
          console.log('[TEST] Notifications granted!');
          alert(
            "✅ Push notifications enabled! You'll now receive notifications for incoming calls.",
          );
        },
        onDenied: (reason) => {
          console.log('[TEST] Notifications denied:', reason);
          if (reason === 'silent-block') {
            alert(
              '❌ Notifications were blocked silently. Please enable them manually in your browser settings.',
            );
          } else if (reason === 'already-denied') {
            alert(
              '❌ Notifications were previously denied. Please enable them in your browser settings.',
            );
          } else {
            alert(
              '❌ Notifications were denied. You can enable them later in your browser settings.',
            );
          }
        },
        onDismissed: () => {
          console.log('[TEST] Notification prompt dismissed');
          alert(
            '⚠️ Notification prompt was dismissed. You can try again anytime.',
          );
        },
      });

      console.log('[TEST] Permission result:', result);

      // If already enabled, show current status
      if (pushNotificationController.isNotificationEnabled()) {
        alert('✅ Push notifications are already enabled!');
      }
    } catch (error) {
      console.error('[TEST] Error testing notifications:', error);
      alert('❌ Error testing notifications: ' + error.message);
    }
  };
}

if (exitWatchModeBtn) {
  // TODO: refactor UI
  exitWatchModeBtn.onclick = () => {
    if (getLastWatched() === 'yt') {
      pauseYouTubeVideo();
      hideYouTubePlayer();
    } else if (getLastWatched() === 'url' || getLastWatched() === 'file') {
      sharedVideoEl.pause();

      // Revoke blob URL to free memory (only if it's a blob)
      if (sharedVideoEl.src.startsWith('blob:')) {
        URL.revokeObjectURL(sharedVideoEl.src);
        // sharedVideoEl.removeAttribute('src');
        // sharedVideoEl.load();
      }

      hideElement(sharedBoxEl);
    }
    onWatchModeExited();
  };
}

// TODO: refactor UI (actions?)
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
  if (hasLocalStream()) return true;
  const start = Date.now();
  return new Promise((resolve) => {
    const check = () => {
      if (hasLocalStream()) return resolve(true);
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
    onCallDisconnected(); // reset UI state
  }

  devDebug('Auto-joined room from URL');
  return success;
}

// ============================================================================
// CONTACT INVITATIONS
// ============================================================================

// Queue for incoming invites (can be used by notification system later)
const pendingInvites = [];
let isProcessingInvite = false;

/**
 * Process the next invite in the queue.
 * Shows invite notification in the notification list.
 */
async function processNextInvite() {
  if (isProcessingInvite || pendingInvites.length === 0) return;

  isProcessingInvite = true;
  const { fromUserId, inviteData } = pendingInvites.shift();

  try {
    // Create invite notification
    const inviteNotification = createInviteNotification({
      fromUserId,
      inviteData,
      onAccept: async () => {
        try {
          await acceptInvite(fromUserId, inviteData);
          console.log('[INVITATIONS] Contact added:', inviteData.fromName);
          await renderContactsList(lobbyDiv).catch(() => {});
          showSuccessToast(`✅ ${inviteData.fromName} added to contacts!`);

          // Remove notification after successful accept
          inAppNotificationManager.remove(`invite-${fromUserId}`);
        } catch (e) {
          console.error('[INVITATIONS] Failed to accept invite:', e);
          showErrorToast('Failed to add contact. Please try again.');
          // Keep notification visible on error
        } finally {
          isProcessingInvite = false;
          processNextInvite();
        }
      },
      onDecline: async () => {
        try {
          await declineInvite(fromUserId);
          console.log('[INVITATIONS] Invite declined');

          // Remove notification after decline
          inAppNotificationManager.remove(`invite-${fromUserId}`);
        } catch (e) {
          console.error('[INVITATIONS] Failed to decline invite:', e);
        } finally {
          isProcessingInvite = false;
          processNextInvite();
        }
      },
    });

    // Add to notification manager
    inAppNotificationManager.add(`invite-${fromUserId}`, inviteNotification);

    // Show the notification list if it's hidden
    if (!inAppNotificationManager.isListVisible()) {
      inAppNotificationManager.showList();
    }
  } catch (error) {
    console.error('[INVITATIONS] Failed to process invite:', error);
    isProcessingInvite = false;
    processNextInvite();
  }
}

/**
 * Set up listener for incoming contact invitations.
 * Queues invites and processes them one at a time.
 */
function setupInviteListener() {
  listenForInvites((fromUserId, inviteData) => {
    pendingInvites.push({ fromUserId, inviteData });
    processNextInvite();
  });

  // Listen for accepted invites (when someone accepts your invite)
  listenForAcceptedInvites(async (acceptedByUserId, acceptData) => {
    console.log(
      '[INVITATIONS] Your invite was accepted by:',
      acceptData.acceptedByName,
    );

    // Refresh contacts list to show new contact
    await renderContactsList(lobbyDiv).catch(() => {});

    // Show success toast
    showSuccessToast(
      `✅ ${acceptData.acceptedByName} is now in your contacts!`,
    );
  });
}

// ============================================================================
// INITIALIZE ON PAGE LOAD
// ============================================================================

window.onload = async () => {
  // Capture referral link BEFORE auth (stores referrer ID in localStorage)
  await captureReferral();

  const initSuccess = await init();

  if (!initSuccess) {
    if (callBtn) {
      callBtn.disabled = true;
      callBtn.title =
        'Initialization failed. Please reload the page or check your camera/microphone permissions.';
    }
    console.error(
      'Initialization failed. Call functionality disabled. Please reload the page.',
    );
    alert(
      'Hangvidu could not initialize properly.\n\n' +
        'Please check your camera/microphone permissions and reload the page.',
    );
    return;
  }

  // UI handlers (business logic handlers registered separately below)
  bindCallUI(CallController);

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
    console.warn('Failed to start saved-room listeners', e),
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
        devDebug(
          '[AUTH] User logged out - cleaning up messaging and listeners',
        );

        // Clear messages UI to prevent previous user's messages from being visible
        messagesUI.reset();

        // Close all messaging sessions (stops RTDB listeners for old user's conversations)
        messagingController.closeAllSessions();

        // Disable notifications and clean up FCM tokens
        if (pushNotificationController.isNotificationEnabled()) {
          await pushNotificationController.disable().catch((error) => {
            console.warn(
              '[AUTH] Failed to disable notifications on logout:',
              error,
            );
          });
        }

        removeAllIncomingListeners();
        cleanupInviteListeners();
      } else if (isActualLogin) {
        // On login, re-attach listeners for saved rooms FIRST (before notification setup)
        // so incoming calls are detected immediately
        devDebug('[AUTH] User logged in - re-attaching incoming listeners');

        // Process referral if user signed up via referral link
        await processReferral().catch((e) =>
          console.warn('[REFERRAL] Failed to process referral on login:', e),
        );

        // Re-render contacts after referral processing (may have added a new contact)
        await renderContactsList(lobbyDiv).catch(() => {});

        await startListeningForSavedRooms().catch((e) =>
          console.warn('Failed to re-attach saved-room listeners on login', e),
        );
        // Start listening for contact invites
        setupInviteListener();

        // Enable push notifications (requestPermission handles all states:
        // granted → enable, default → prompt, denied → noop)
        await pushNotificationController
          .requestPermission()
          .catch((e) =>
            console.warn('[AUTH] Push notification setup failed:', e),
          );
      } else if (isInitialLoad && isLoggedIn) {
        // If user is already logged in on initial load (e.g., after redirect)
        devDebug('[AUTH] Initial load with logged-in user');

        // Process referral if user signed up via referral link
        await processReferral().catch((e) =>
          console.warn(
            '[REFERRAL] Failed to process referral on initial load:',
            e,
          ),
        );

        // Listeners already attached by startListeningForSavedRooms, no action needed
        // Start listening for contact invites
        setupInviteListener();

        // Enable push notifications for already-logged-in user
        await pushNotificationController
          .requestPermission()
          .catch((e) =>
            console.warn('[AUTH] Push notification setup failed:', e),
          );
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
// CALLCONTROLLER EVENT SUBSCRIPTIONS
// ============================================================================

// Business logic for memberJoined (UI handled in bind-call-ui.js)
CallController.on('memberJoined', ({ memberId, roomId }) => {
  console.debug('CallController memberJoined event', { memberId, roomId });

  CallController.setPartnerId(memberId);

  // TODO: refactor UI
  // Show messages toggle for file transfer during call
  messagesUI.showMessagesToggle();

  // Open contact messaging UI with partner
  messagesUI.openContactMessages(memberId, memberId); // Use memberId as name for now

  // onCallConnected(); // ! Moved to bind-call-ui.js

  onCallAnswered().catch((e) =>
    console.warn('Failed to clear calling state:', e),
  );
  saveRecentCall(roomId).catch((e) =>
    console.warn('Failed to save recent call:', e),
  );
});

// Subscribe to CallController memberLeft event - handles partner leaving
CallController.on('memberLeft', ({ memberId }) => {
  devDebug('CallController memberLeft event', { memberId });
  console.info('Partner has left the call');
});

// Business logic for cleanup (UI handled in bind-call-ui.js)
CallController.on(
  'cleanup',
  async ({ roomId, partnerId, reason, role, wasConnected }) => {
    devDebug('CallController cleanup event', {
      roomId,
      partnerId,
      reason,
      role,
      wasConnected,
    });

    // UI cleanup
    // hideCallingUI(); // ! Moved to bind-call-ui.js
    // onCallDisconnected(); // ! Moved to bind-call-ui.js

    // UI cleanup
    // hideCallingUI(); // ! Moved to bind-call-ui.js
    // onCallDisconnected(); // ! Moved to bind-call-ui.js

    // Handle Missed Call Notification
    // Trigger if: initiator, no partner joined, never established connection, and valid room
    const isMissedCall =
      role === 'initiator' && !partnerId && !wasConnected && roomId;

    if (isMissedCall) {
      console.log('[MAIN] Potential missed call detected for room:', roomId);
      try {
        // Dynamic import to avoid circular dependency (main.js <-> contacts.js)
        const { getContactByRoomId } = await import(
          './components/contacts/contacts.js'
        );
        const contact = await getContactByRoomId(roomId);
        if (contact && contact.contactId) {
          const { getCurrentUser } = await import('./firebase/auth.js');
          const me = getCurrentUser();
          const callerName = me?.displayName || 'Friend';

          // Send push notification to the contact
          console.log(
            `[MAIN] Sending missed call push notification to ${contact.contactName} (${contact.contactId})`,
          );
          await pushNotificationController.sendMissedCallNotification(
            contact.contactId,
            {
              roomId,
              callerId: getUserId(),
              callerName,
            },
          );

          // Show in-app missed call notification
          const { createMissedCallNotification } =
            await import('./components/notifications/missed-call-notification.js');
          const notificationId = `missed-call-${contact.contactId}-${Date.now()}`;
          const missedCallNotification = createMissedCallNotification({
            callerId: contact.contactId,
            callerName: contact.contactName,
            roomId,
            onCallBack: async () => {
              // Reuse existing callContact flow
              await callContact(contact.contactId, contact.contactName);
              // Remove notification after initiating call
              inAppNotificationManager.remove(notificationId);
            },
            onDismiss: () => {
              inAppNotificationManager.remove(notificationId);
            },
          });

          inAppNotificationManager.add(notificationId, missedCallNotification);
          console.log('[MAIN] In-app missed call notification added');
        } else {
          console.log(
            '[MAIN] No saved contact found for room, skipping missed call notification',
          );
        }
      } catch (e) {
        console.warn('[MAIN] Failed to handle missed call:', e);
      }
    }

    // Clean up call notifications for this room
    if (roomId && pushNotificationController.isNotificationEnabled()) {
      pushNotificationController
        .dismissCallNotifications(roomId)
        .catch((error) => {
          console.warn('[MAIN] Failed to dismiss call notifications:', error);
        });
    }

    // UI cleanup
    // hideCallingUI(); // ! Moved to bind-call-ui.js
    // onCallDisconnected(); // ! Moved to bind-call-ui.js

    // Clean up messages UI if present
    const state = CallController.getState();
    if (state.messagesUI && typeof state.messagesUI.cleanup === 'function') {
      state.messagesUI.cleanup();
      state.messagesUI = null;
    }

    cleanupRemoteStream();
    clearUrlParam();

    // Re-attach incoming listener so the next call on this room is detected
    if (roomId && reason !== 'page_unload') {
      listenForIncomingOnRoom(roomId);
    }

    // Prompt to save contact after cleanup (if partner was present)
    if (partnerId && roomId) {
      setTimeout(() => {
        saveContact(partnerId, roomId, lobbyDiv).catch((e) => {
          console.warn('Failed to save contact after cleanup:', e);
        });
      }, 500);
    }
  },
);

// ============================================================================
// HANG UP / CLEANUP
// ============================================================================

async function cleanup() {
  // Call CallController.hangUp for page unload
  await CallController.hangUp({ emitCancel: true, reason: 'page_unload' });

  // Global teardown: safe to remove all listeners on page unload
  cleanupMediaControls();
  removeAllRTDBListeners();
  cleanupContacts();

  exitPiP();

  const state = CallController.getState();
  if (state.messagesUI && state.messagesUI.cleanup) {
    state.messagesUI.cleanup();
  }

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

  // TODO: refactor UI (teardown)
  onWatchModeExited();
  setLastWatched('none');
  destroyYouTubePlayer();
  cleanupSearchUI();

  clearUrlParam();
  setYouTubeReady(false);

  cleanupFunctions.forEach((cleanupFn) => cleanupFn());
}
