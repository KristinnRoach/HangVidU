import { appBus } from '../app/app-bus.js';
import {
  removeRTDBListenersForRoom,
} from '../storage/fb-rtdb/rtdb.js';
import { getUserId } from '../auth/auth-state.js';
import { getDiagnosticLogger } from '../utils/dev/diagnostic-logger.js';
import { devDebug } from '../utils/dev/dev-utils.js';
import { contactsService } from '../contacts/contacts-service.js';
import RoomService from './room.js';
import CallController from './call-controller.js';
import { getPushNotifications } from '../push-notifications/index.js';
import { ringtoneManager } from '../media/audio/ringtone-manager.js';
import { callIndicators } from '../ui/utils/call-indicators.js';
import {
  showIncomingCallUI,
  resolveIncomingCallUI,
  dismissActiveIncomingCallUI,
} from '../ui/components/calling/incoming-call.js';

// Track which roomIds we've already attached incoming listeners for
const listeningRoomIds = new Set();

// Track incoming call listener cleanup functions for each room
// Map<roomId, Array<() => void>>
const incomingListenerCleanups = new Map();

// Track RTDB listener cleanups for incoming call UI promise coordination
// Map<roomId, { cancel: () => void, answer: () => void }>
const incomingCallPromiseCleanups = new Map();

let runtime = null;

/**
 * @param {{
 *   isRoomCallFresh: (roomId: string) => Promise<boolean>,
 *   joinOrCreateRoomWithId: (roomId: string, options?: object) => Promise<boolean>,
 * }} config
 */
export function setupRoomListeners(config) {
  runtime = config;
}

function getRuntime() {
  if (
    !runtime ||
    typeof runtime.isRoomCallFresh !== 'function' ||
    typeof runtime.joinOrCreateRoomWithId !== 'function'
  ) {
    throw new Error(
      'room listeners require setupRoomListeners({ isRoomCallFresh, joinOrCreateRoomWithId }) before use',
    );
  }

  return runtime;
}

/**
 * Remove incoming call listeners for a specific room
 * @param {string} roomId - Room ID to clean up listeners for
 */
export function removeIncomingListenersForRoom(roomId) {
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
export function removeAllIncomingListeners() {
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

export function getIncomingListenerCount() {
  return listeningRoomIds.size;
}

/**
 * Listen for incoming member joins on a given roomId and log them.
 */
export function listenForIncomingOnRoom(roomId) {
  if (!roomId) return;

  const { isRoomCallFresh, joinOrCreateRoomWithId } = getRuntime();

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
      const joinedContactId = snapshot.key;
      if (!joinedContactId) {
        console.error(
          '[LISTENER] memberJoined snapshot missing key:',
          snapshot,
        );
        return;
      }
      if (joinedContactId === getUserId()) {
        devDebug(
          `[LISTENER] Ignoring memberJoined event for self (${joinedContactId}) in room ${roomId}`,
        );
        return;
      }

      const memberData = snapshot.val ? snapshot.val() : null;
      const currentUserId = getUserId();

      devDebug(`incoming call from ${joinedContactId} for room ${roomId}`);
      getDiagnosticLogger().logMemberJoinEvent(
        roomId,
        joinedContactId,
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
        joinedContactId,
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
          `Ignoring stale incoming call from ${joinedContactId} for room ${roomId}`,
        );
        getDiagnosticLogger().logNotificationDecision(
          'REJECT',
          'stale_call',
          roomId,
          {
            age,
            validationMethod,
            joiningUserId: joinedContactId,
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
            joiningUserId: joinedContactId,
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
          joiningUserId: joinedContactId,
          freshnessResult,
        },
      );

      const pushController = getPushNotifications();
      const usePushOnlyForBackgroundCall =
        !!pushController?.isNotificationEnabled?.() &&
        !!pushController?.shouldSendNotification?.();

      if (import.meta.env.DEV && usePushOnlyForBackgroundCall) {
        getDiagnosticLogger().logNotificationDecision(
          'DEFER',
          'background_push_only',
          roomId,
          {
            joiningUserId: joinedContactId,
            pushNotificationsEnabled: true,
          },
        );
        console.log(
          '[CALL] Background incoming call detected, using push-only notification path',
          {
            roomId,
            joiningUserId: joinedContactId,
          },
        );
        return;
      }

      const callerContact = await contactsService.getContactByRoomId(roomId);
      // TODO: Centralize caller display-name fallback policy once ownership is settled.
      const callerName =
        callerContact?.contactName || joinedContactId || 'Unknown';

      // Start incoming call ringtone and visual indicators
      ringtoneManager.playIncoming();
      callIndicators.startCallIndicators(callerName);

      let accept = false;
      try {
        // Show incoming call UI and await user action OR external state changes
        accept = await new Promise((resolve) => {
          // Set up listener for caller cancellation
          const cancelCleanup = RoomService.onCallCancelled(roomId, (snap) => {
            if (snap.exists()) {
              devDebug(`[LISTENER] Caller cancelled call for room ${roomId}`);
              resolveIncomingCallUI(roomId, 'caller_cancelled');
              resolve('caller_cancelled');
            }
          });

          // Set up listener for answer (call answered elsewhere)
          const answerCleanup = RoomService.onAnswerAdded(roomId, () => {
            devDebug(`[LISTENER] Call answered elsewhere for room ${roomId}`);
            resolveIncomingCallUI(roomId, 'answered_elsewhere');
            resolve('answered_elsewhere');
          });

          // Show UI with callbacks for accept/reject
          showIncomingCallUI(
            { roomId, from: callerName },
            () => resolve(true), // onAccept
            () => resolve(false), // onReject
          );

          // Store listener cleanups for later removal
          incomingCallPromiseCleanups.set(roomId, {
            cancel: cancelCleanup,
            answer: answerCleanup,
          });
        });
      } finally {
        // Clean up RTDB listeners for this incoming call
        if (incomingCallPromiseCleanups.has(roomId)) {
          const promiseCleanups = incomingCallPromiseCleanups.get(roomId);
          if (promiseCleanups.cancel) promiseCleanups.cancel();
          if (promiseCleanups.answer) promiseCleanups.answer();
          incomingCallPromiseCleanups.delete(roomId);
        }

        // Stop ringtone and visual indicators after user responds (or on error)
        ringtoneManager.stop();
        callIndicators.stopCallIndicators();
      }

      if (accept === true) {
        appBus.emit('call:incoming:accepted', {
          roomId,
          contactId: joinedContactId,
        });

        // Remove incoming call listeners before starting active call
        // This prevents duplicate listener firing (incoming vs active call listeners)
        removeIncomingListenersForRoom(roomId);

        // Dismiss any call notifications for this room
        const pushNotificationController = getPushNotifications?.();
        if (pushNotificationController?.isNotificationEnabled()) {
          await pushNotificationController
            .dismissCallNotifications(roomId)
            .catch(() => {});
        }

        getDiagnosticLogger().logNotificationDecision(
          'ACCEPT',
          'user_accepted',
          roomId,
          {
            joiningUserId: joinedContactId,
          },
        );
        // Update lastInteractionAt for answered incoming call
        contactsService
          .getContactByRoomId(roomId)
          .then((c) => {
            if (c?.contactId)
              contactsService.updateLastInteraction(c.contactId);
          })
          .catch(() => {});

        joinOrCreateRoomWithId(roomId).catch((e) => {
          console.warn('Failed to answer incoming call:', e);
          devDebug('Failed to answer incoming call.');
          getDiagnosticLogger().logFirebaseOperation(
            'join_room_on_accept',
            false,
            e,
            {
              roomId,
              joiningUserId: joinedContactId,
            },
          );
        });
      } else if (accept === 'caller_cancelled') {
        devDebug('Incoming call cancelled by caller');
        // UI is already dismissed by cancellation handler
        // No rejection message needed, just log it
        getDiagnosticLogger().logNotificationDecision(
          'DISMISS',
          'caller_cancelled',
          roomId,
          {
            joiningUserId: joinedContactId,
          },
        );
      } else if (accept === 'answered_elsewhere') {
        devDebug('Incoming call answered elsewhere');
        // Call was accepted in another instance
        getDiagnosticLogger().logNotificationDecision(
          'DISMISS',
          'answered_elsewhere',
          roomId,
          {
            joiningUserId: joinedContactId,
          },
        );
      } else {
        // User rejected the call
        devDebug('Incoming call rejected by user');

        // Dismiss any call notifications for this room
        const pushNotificationController = getPushNotifications?.();
        if (pushNotificationController?.isNotificationEnabled()) {
          await pushNotificationController
            .dismissCallNotifications(roomId)
            .catch(() => {});
        }

        getDiagnosticLogger().logNotificationDecision(
          'REJECT',
          'user_rejected',
          roomId,
          {
            joiningUserId: joinedContactId,
          },
        );

        // Send a direct rejection signal so the caller gets immediate feedback (no 30s timeout)
        try {
          await RoomService.rejectCall(roomId, getUserId(), 'user_rejected');
        } catch (e) {
          console.warn('Failed to signal rejection via RTDB:', e);
        }

        // Caller writes the unanswered call message to chat via call:unanswered event.
        // No message written from the callee side.
      }
    },
  );

  cleanups.push(memberJoinedCleanup);

  // INCOMING CALL cancellation listener
  // Fires when caller cancels BEFORE callee accepts
  // Dismisses incoming dialog and removes recent call entry
  const callCancelledCleanup = RoomService.onCallCancelled(
    roomId,
    async (snapshot) => {
      const data =
        snapshot && typeof snapshot.val === 'function' ? snapshot.val() : null;
      if (!data) return;

      // Stop ringtone and visual indicators when call is cancelled
      ringtoneManager.stop();
      callIndicators.stopCallIndicators();

      // ! Dismiss any call notifications for this room
      try {
        const pushNotificationController = getPushNotifications
          ? getPushNotifications()
          : null;
        if (pushNotificationController?.isNotificationEnabled()) {
          await pushNotificationController
            .dismissCallNotifications(roomId)
            .catch(() => {});
        }
      } catch (_) {
        // best-effort; do not block cancellation flow on notification errors
      }

      try {
        // Dismiss incoming call UI for this room
        dismissActiveIncomingCallUI(roomId);

        // Dismiss legacy confirmDialog (for testing/rollback)
        const { dismissActiveConfirmDialog } =
          await import('../ui/components/base/confirm-dialog.js');
        if (typeof dismissActiveConfirmDialog === 'function') {
          dismissActiveConfirmDialog();
        }
      } catch (_) {
        // best-effort
      }

      // Clean up incoming listeners for this room to prevent stale listener firing
      // UNLESS it is a saved contact - then we want to keep listening
      let savedContact = null;
      try {
        savedContact = await contactsService.getContactByRoomId(roomId);
      } catch (e) {
        console.warn('[LISTENER] Failed to check saved contact:', e);
      }
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
    },
  );

  cleanups.push(callCancelledCleanup);

  // Listen for member leaves: if the room becomes empty after a leave,
  // remove this saved recent call for the current user so they don't keep
  // an incoming notification for a non-existent partner.
  const memberLeftCleanup = RoomService.onMemberLeft(roomId, async (snapshot) => {
    const leavingUserId = snapshot.key;
    const currentUserId = getUserId();

    // Ignore our own leaves
    if (!leavingUserId || leavingUserId === currentUserId) return;

    try {
      const status = await RoomService.checkRoomStatus(roomId);
      // If no members remain, remove the saved recent call for this client
      // and clean up the incoming listeners for this room (UNLESS saved contact)
      if (!status.hasMembers) {
        const savedContact = await contactsService.getContactByRoomId(roomId);
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

  cleanups.push(memberLeftCleanup);
  incomingListenerCleanups.set(roomId, cleanups);
}
