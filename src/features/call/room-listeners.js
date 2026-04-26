import { get, onValue, remove } from 'firebase/database';
import {
  dispatchCommand,
  dispatchCommandAndAwait,
  publish,
} from '../../shared/events/index.js';
import {
  removeRTDBListenersForRoom,
  getRoomOfferRef,
} from '../../shared/storage/fb-rtdb/rtdb.js';
import {
  getCurrentUserAsync,
  getLoggedInUserId,
  getUserId,
} from '../../auth/index.js';
import { getDiagnosticLogger } from '../../shared/utils/dev/diagnostic-logger.js';
import { devDebug } from '../../shared/utils/dev/dev-utils.js';
import {
  contactsService,
  getContactByRoomId,
  getAllContacts,
} from '../contacts/index.js';
import { getDeterministicRoomId } from '../../shared/utils/room-id.js';
import RoomService from './room.js';
import CallController from './call-controller.js';
import { getPushNotifications } from '../push-notifications/index.js';
import { ringtoneManager } from '../../shared/media/audio/ringtone-manager.js';
import { callIndicators } from '../../shared/components/ui/utils/call-indicators.js';
import { dismissActiveConfirmDialog } from '../../shared/components/base/confirm-dialog.js';
import { isRoomCallFresh } from './WIP-isRoomCallFresh.js';

import { answerIncomingCallInRoom } from './WIP-start-call-refactor.js';

// TODO: WIP decoupling considerations:
/*
  Import: contactsService                                                           
  Domain: contacts                                                                  
  Issue: Cross-domain. Used for getContactByRoomId to look up caller name and decide
                                                                                  
    whether to preserve listeners.                                                
  ────────────────────────────────────────                                          
  Import: showIncomingCallUI, resolveIncomingCallUI, dismissActiveIncomingCallUI  
  Domain: UI/calling                                                                
  Issue: Direct UI manipulation from call logic. This is the worst coupling —       
    room-listeners.js orchestrates the incoming call dialog, ringtone, and call
    indicators directly.                                                            
  ────────────────────────────────────────                       
  Import: ringtoneManager                                                           
  Domain: media/audio
  Issue: UI presentation concern, same issue as above.                              
  ────────────────────────────────────────                       
  Import: callIndicators
  Domain: UI/utils
  Issue: UI presentation concern.
  ────────────────────────────────────────
  Import: getPushNotifications                                                      
  Domain: push-notifications
  Issue: Cross-domain, but arguably part of the call notification flow.             
  ────────────────────────────────────────                       
  Import: messagingController (via sendEventMessage inside the listener)            
  Domain: messaging
  Issue: Cross-domain. Used to write missed/rejected call messages to chat.         
  ────────────────────────────────────────                       
  Import: answerIncomingCallInRoom
  Domain: WIP call orchestration (now uses direct imports, no startup order issue)

  This file is really doing three things: (1) RTDB listener management, (2) incoming
   call UI orchestration, (3) cross-domain side effects (contacts lookup, messaging
  writes, push notifications). 

  Appbus contract must be clarified and standardized first,
  and the whole call module needs to clarify and separate concerns 
*/

// Track which roomIds we've already attached incoming listeners for
const listeningRoomIds = new Set();

// Track incoming call listener cleanup functions for each room
// Map<roomId, Array<() => void>>
const incomingListenerCleanups = new Map();

// Track RTDB listener cleanups for incoming call UI promise coordination
// Map<roomId, { cancel: () => void, answer: () => void, resolve: (result: boolean|string) => void }>
const incomingCallPromiseCleanups = new Map();

// Map of roomId -> resolver used to dismiss/settle the active dialog
const activeIncomingCallResolvers = new Map();

function showIncomingCallDialog(
  roomId,
  callerName,
  onAccept,
  onReject,
  { audioOnly = false } = {},
) {
  if (!roomId || activeIncomingCallResolvers.has(roomId)) return;

  const cleanup = () => {
    activeIncomingCallResolvers.delete(roomId);
    try {
      dispatchCommand('cmd:dialog:incoming-call:close', { roomId });
    } catch (error) {
      console.warn(
        '[room-listeners] failed to close incoming call dialog:',
        error,
      );
    }
  };

  const resolver = (result) => {
    try {
      cleanup();
    } catch (_) {}
    return result;
  };

  activeIncomingCallResolvers.set(roomId, resolver);

  dispatchCommandAndAwait('cmd:dialog:incoming-call:open', {
    roomId,
    callerName,
    audioOnly,
    onAccept: async () => {
      try {
        if (onAccept) await onAccept();
      } finally {
        cleanup();
      }
    },
    onDecline: async () => {
      try {
        if (onReject) await onReject();
      } finally {
        cleanup();
      }
    },
  }).catch((error) => {
    cleanup();
    try {
      if (onReject) onReject();
    } catch (rejectError) {
      console.warn(
        '[room-listeners] failed to settle incoming call after dialog-open failure:',
        rejectError,
      );
    }
    console.warn(
      '[room-listeners] failed to open incoming call dialog:',
      error,
    );
  });
}

function resolveIncomingCallDialog(roomId, result) {
  const resolver = activeIncomingCallResolvers.get(roomId);
  if (resolver) {
    resolver(result);
  }
}

function dismissIncomingCallDialog(roomId) {
  if (roomId && activeIncomingCallResolvers.has(roomId)) {
    activeIncomingCallResolvers.delete(roomId);
    try {
      dispatchCommand('cmd:dialog:incoming-call:close', { roomId });
    } catch (error) {
      console.warn(
        '[room-listeners] failed to close incoming call dialog:',
        error,
      );
    }
    return true;
  }
  return false;
}

function settleIncomingCallWait(roomId, result = 'listener_removed') {
  const pending = incomingCallPromiseCleanups.get(roomId);
  if (!pending) return false;

  pending.cancel?.();
  pending.answer?.();
  resolveIncomingCallDialog(roomId, result);
  pending.resolve?.(result);
  incomingCallPromiseCleanups.delete(roomId);
  return true;
}

/**
 * Settle the pending incoming-call wait for a room.
 * Returns true if a pending wait was found and resolved.
 */
export function settleIncomingCallWaitForRoom(roomId, result) {
  return settleIncomingCallWait(roomId, result);
}

const MISSING_OFFER_WAIT_MS = 5000;

/**
 * Post Phase 1.6, `createRoomMetadata` commits members atomically before
 * `peer.start()` writes the offer SDP, so `member-joined` can fire before
 * the offer lands in RTDB. Give the offer a short window to arrive before
 * skipping. See DEFERRED_ISSUES.md ("Offer-write timing race").
 * @returns {Promise<object|null>} the offer value, or null on timeout.
 */
function waitForRoomOffer(roomId, timeoutMs = MISSING_OFFER_WAIT_MS) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        unsubscribe();
      } catch (_) {}
      resolve(value);
    };
    const unsubscribe = onValue(getRoomOfferRef(roomId), (snapshot) => {
      const val = snapshot.val();
      if (val) finish(val);
    });
    const timer = setTimeout(() => finish(null), timeoutMs);
  });
}

async function evaluateIncomingCallPreconditions({
  roomId,
  joinedContactId,
  currentUserId,
  memberData,
}) {
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

  if (!isFresh) {
    const roomFresh = await isRoomCallFresh(roomId);
    isFresh = roomFresh;
    validationMethod = roomFresh ? 'roomCreatedAt' : 'failed';
    age = null;
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
    console.warn('[CALL][INCOMING] skip: stale call', {
      roomId,
      joiningUserId: joinedContactId,
      validationMethod,
      age,
    });
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
    return { canProceed: false };
  }

  let roomData;
  try {
    roomData = await RoomService.getRoomData(roomId);
  } catch (e) {
    console.warn('[CALL][INCOMING] skip: room read failed', {
      roomId,
      joiningUserId: joinedContactId,
      error: e,
    });
    getDiagnosticLogger().logNotificationDecision(
      'REJECT',
      'room_read_failed',
      roomId,
      {
        joiningUserId: joinedContactId,
        error: e,
      },
    );
    return { canProceed: false };
  }

  if (!roomData || typeof roomData !== 'object') {
    console.warn('[CALL][INCOMING] skip: invalid room state', {
      roomId,
      joiningUserId: joinedContactId,
    });
    getDiagnosticLogger().logNotificationDecision(
      'REJECT',
      'invalid_room_state',
      roomId,
      {
        joiningUserId: joinedContactId,
      },
    );
    return { canProceed: false };
  }

  let hasOffer = !!roomData.offer;
  const hasAnswer = !!roomData.answer;
  const offerCreator = roomData.createdBy;
  const isOutgoingForCurrentUser = offerCreator === currentUserId;
  const callDirection = isOutgoingForCurrentUser ? 'OUTGOING' : 'INCOMING';

  // Tolerate the Phase 1.6 offer-write race: when members arrive before the
  // offer, briefly wait for the initiator's offer to land before skipping.
  if (!hasOffer && !hasAnswer && !isOutgoingForCurrentUser) {
    const lateOffer = await waitForRoomOffer(roomId);
    if (lateOffer) {
      roomData.offer = lateOffer;
      hasOffer = true;
    }
  }

  let skipReason = 'not_answerable_offer_state';
  if (!hasOffer) {
    skipReason = 'missing_offer';
  } else if (hasAnswer) {
    skipReason = isOutgoingForCurrentUser
      ? 'outgoing_call_already_answered'
      : 'incoming_offer_already_answered_elsewhere';
  } else if (isOutgoingForCurrentUser) {
    skipReason = 'outgoing_offer_created_by_current_user';
  }
  if (!hasOffer || hasAnswer || offerCreator === currentUserId) {
    console.info(
      `[CALL][${callDirection}] skip: ${skipReason} (offer not answerable as incoming)`,
      {
        roomId,
        joiningUserId: joinedContactId,
        callDirection,
        skipReason,
        hasOffer,
        hasAnswer,
        offerCreator,
        currentUserId,
      },
    );
    getDiagnosticLogger().logNotificationDecision(
      'REJECT',
      'not_answerable_offer_state',
      roomId,
      {
        joiningUserId: joinedContactId,
        callDirection,
        skipReason,
        hasOffer,
        hasAnswer,
        offerCreator,
        currentUserId,
      },
    );
    return { canProceed: false };
  }

  const state = CallController.getState();
  const inActiveCall = !!state.pc && state.pc.connectionState === 'connected';
  if (inActiveCall) {
    console.warn('[CALL][INCOMING] skip: already in active call', {
      roomId,
      joiningUserId: joinedContactId,
      currentCallState: state.pc?.connectionState,
    });
    getDiagnosticLogger().logNotificationDecision(
      'REJECT',
      'already_in_call',
      roomId,
      {
        joiningUserId: joinedContactId,
        currentCallState: state.pc?.connectionState,
      },
    );
    return { canProceed: false };
  }

  return {
    canProceed: true,
    freshnessResult,
    audioOnly: !!roomData.audioOnly,
  };
}

function decideIncomingNotificationStrategy({
  pushController,
  roomId,
  joinedContactId,
}) {
  const usePushForBackgroundCall =
    !!pushController?.isNotificationEnabled?.() &&
    !!pushController?.shouldSendNotification?.();

  if (usePushForBackgroundCall) {
    getDiagnosticLogger().logNotificationDecision(
      'DEFER',
      'background_push_and_inapp',
      roomId,
      {
        joiningUserId: joinedContactId,
        pushNotificationsEnabled: true,
      },
    );
    console.log(
      '[CALL] Background incoming call detected, push notification expected, continuing in-app incoming UI path',
      {
        roomId,
        joiningUserId: joinedContactId,
      },
    );
  }
}

async function handleIncomingCallAccepted({
  roomId,
  joinedContactId,
  audioOnly = false,
}) {
  publish('evt:call:incoming:accepted', {
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
      .catch((error) => {
        console.warn('[CALL][INCOMING] warn: notification dismiss failed', {
          roomId,
          error,
        });
      });
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
  const contact = getContactByRoomId(roomId);
  if (contact?.contactId) {
    contactsService.updateLastInteraction(contact.contactId).catch(() => {});
  }

  const callStart = await answerIncomingCallInRoom(roomId, {
    audioOnly,
  }).catch((e) => {
    console.warn('Failed to answer incoming call:', e);
    getDiagnosticLogger().logFirebaseOperation(
      'join_room_on_accept',
      false,
      e,
      {
        roomId,
        joiningUserId: joinedContactId,
      },
    );
    return { success: false, role: null };
  });

  if (!callStart.success) {
    console.warn('[CALL] Join failed after accepting incoming call', {
      roomId,
    });
    publish('evt:room:lifecycle:join-or-create-failed', { roomId });
  }
}

/**
 * Remove incoming call listeners for a specific room
 * @param {string} roomId - Room ID to clean up listeners for
 */
export function removeIncomingListenersForRoom(roomId) {
  if (!roomId) return;

  devDebug(`[LISTENER] Removing incoming listeners for room: ${roomId}`);
  settleIncomingCallWait(roomId);

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

  Array.from(incomingCallPromiseCleanups.keys()).forEach((roomId) => {
    settleIncomingCallWait(roomId);
  });

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

  devDebug(`[LISTENER] Attempting to attach listener for room: ${roomId}`);

  // Check if already listening, but allow re-attachment
  // Firebase RTDB handles duplicate listeners internally, so this is safe
  if (listeningRoomIds.has(roomId)) {
    settleIncomingCallWait(roomId);
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
          `[LISTENER] Ignoring participant-joined snapshot for self (${joinedContactId}) in room ${roomId}`,
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

      const preconditions = await evaluateIncomingCallPreconditions({
        roomId,
        joinedContactId,
        currentUserId,
        memberData,
      });

      if (!preconditions.canProceed) {
        devDebug(
          `Ignoring incoming call from ${joinedContactId} for room ${roomId}`,
        );
        return;
      }

      getDiagnosticLogger().logNotificationDecision(
        'SHOW',
        'fresh_call_detected',
        roomId,
        {
          joiningUserId: joinedContactId,
          freshnessResult: preconditions.freshnessResult,
        },
      );

      const pushController = getPushNotifications();
      decideIncomingNotificationStrategy({
        pushController,
        roomId,
        joinedContactId,
      });

      const callerContact = getContactByRoomId(roomId);
      const callerName =
        callerContact?.contactNickName || joinedContactId || 'Unknown';

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
              resolveIncomingCallDialog(roomId, 'caller_cancelled');
              resolve('caller_cancelled');
            }
          });

          // Set up listener for answer (call answered elsewhere)
          const answerCleanup = RoomService.onAnswerAdded(roomId, () => {
            devDebug(`[LISTENER] Call answered elsewhere for room ${roomId}`);
            resolveIncomingCallDialog(roomId, 'answered_elsewhere');
            resolve('answered_elsewhere');
          });

          // Show UI with callbacks for accept/reject
          showIncomingCallDialog(
            roomId,
            callerName,
            () => resolve(true), // onAccept
            () => resolve(false), // onReject
            { audioOnly: preconditions.audioOnly },
          );

          // Store listener cleanups for later removal
          incomingCallPromiseCleanups.set(roomId, {
            cancel: cancelCleanup,
            answer: answerCleanup,
            resolve,
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

      if (accept === true || accept === 'notification_click_answer') {
        await handleIncomingCallAccepted({
          roomId,
          joinedContactId,
          audioOnly: preconditions.audioOnly,
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
            .catch((error) => {
              console.warn(
                '[CALL][INCOMING] warn: notification dismiss failed',
                {
                  roomId,
                  error,
                },
              );
            });
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

        // Caller writes the unanswered call message to chat via evt:call:session:unanswered event.
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
            .catch((error) => {
              console.warn(
                '[CALL][INCOMING] warn: notification dismiss failed',
                {
                  roomId,
                  error,
                },
              );
            });
        }
      } catch (_) {
        // best-effort; do not block cancellation flow on notification errors
      }

      try {
        // Dismiss incoming call UI for this room
        dismissIncomingCallDialog(roomId);

        // Dismiss legacy confirmDialog (for testing/rollback)
        dismissActiveConfirmDialog();
      } catch (_) {
        // best-effort
      }

      // Clean up incoming listeners for this room to prevent stale listener firing
      // UNLESS it is a saved contact - then we want to keep listening
      let savedContact = null;
      try {
        savedContact = getContactByRoomId(roomId);
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
  const memberLeftCleanup = RoomService.onMemberLeft(
    roomId,
    async (snapshot) => {
      const leavingUserId = snapshot.key;
      const currentUserId = getUserId();

      // Ignore our own leaves
      if (!leavingUserId || leavingUserId === currentUserId) return;

      try {
        const status = await RoomService.checkRoomStatus(roomId);
        // If no members remain, remove the saved recent call for this client
        // and clean up the incoming listeners for this room (UNLESS saved contact)
        if (!status.hasMembers) {
          const savedContact = getContactByRoomId(roomId);
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
    },
  );

  cleanups.push(memberLeftCleanup);
  incomingListenerCleanups.set(roomId, cleanups);
}

/**
 * Read saved recent calls (RTDB or localStorage), remove expired entries,
 * and attach incoming listeners for each valid room id.
 */
export async function startListeningForSavedRooms() {
  const startTime = Date.now();
  const toListen = new Set();
  getDiagnosticLogger().log('LISTENER', 'STARTUP_BEGIN', {
    timestamp: startTime,
    currentListenerCount: getIncomingListenerCount(),
  });

  // Ensure auth state is initialized before deciding storage location
  // This prevents a race where we read localStorage as a guest before auth is ready
  try {
    await getCurrentUserAsync();
  } catch (e) {
    // non-fatal
  }

  const loggedInUid = getLoggedInUserId();
  getDiagnosticLogger().log('LISTENER', 'AUTH_STATE_DETERMINED', {
    isLoggedIn: !!loggedInUid,
    userId: loggedInUid || 'guest',
  });

  if (loggedInUid) {
    try {
      const contacts = getAllContacts();
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
      totalListeners: getIncomingListenerCount(),
      duration: Date.now() - startTime,
    });
    return;
  }

  // Guest: localStorage
  try {
    const contacts = getAllContacts();
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

  getDiagnosticLogger().log('LISTENER', 'STARTUP_COMPLETE', {
    storage: 'localStorage',
    roomsToListen: Array.from(toListen),
    totalListeners: getIncomingListenerCount(),
    duration: Date.now() - startTime,
  });
}
