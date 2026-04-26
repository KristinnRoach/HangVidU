import { getUser, getUserId } from '../../auth/index.js';
import { getPushNotifications } from '../push-notifications/index.js';
import CallController from './call-controller.js';
import { contactsService } from '../contacts/index.js';
import { getDiagnosticLogger } from '../../shared/utils/dev/diagnostic-logger.js';
import { getDeterministicRoomId } from '../../shared/utils/room-id.js';
import { getElements } from '../../elements.js';
import { getLocalStream } from '../../shared/media/state.js';
import { setupRemoteStream } from '../../shared/media/stream.js';
import { setupWatchSync } from '../watch/watch-sync.js';
import { showCopyLinkModal } from '../../shared/components/modal/copyLinkModal.js';
import { devDebug } from '../../shared/utils/dev/dev-utils.js';
import { showOutgoingCallUI } from './outgoing-call-session.js';
import {
  initLocalStream,
  handleMediaPermissionError,
} from '../../shared/media/WIP-init-local-media.js';

// TODO: WIP decoupling considerations:
// - Cross-domain: contactsService (contacts), getPushNotifications (push),
//   showCopyLinkModal (UI), showCallingUI (UI) — all cross-domain orchestration.
// - This file is a candidate for renaming to call-orchestration.js once stable.

export function getCallOptions(
  targetRoomId = null,
  { audioOnly = false } = {},
) {
  const { localVideoEl, remoteVideoEl, mutePartnerBtn } = getElements();
  return {
    localStream: getLocalStream(),
    localVideoEl,
    remoteVideoEl,
    mutePartnerBtn,
    setupRemoteStream,
    setupWatchSync,
    targetRoomId,
    audioOnly,
  };
}

export function applyCallResult(result, showLinkModal = false) {
  if (!result?.success) {
    return { success: false, role: result?.role || null, result };
  }

  if (showLinkModal && result.roomLink) {
    showCopyLinkModal(result.roomLink, {
      onCopy: () => devDebug('Link ready! Share with your partner.'),
      onCancel: () =>
        devDebug(
          'Link ready! Use the copy button to use it, or create a new one.',
        ),
    });
  }

  return { success: true, role: result.role || null, result };
}

async function ensureLocalMedia(audioOnly) {
  try {
    await initLocalStream({ audioOnly });
  } catch (error) {
    console.error('Failed to initialize local media stream:', error);
    handleMediaPermissionError(error);
    return false;
  }
  return true;
}

export async function startOutgoingCallInRoom(
  customRoomId,
  { audioOnly = false, showLinkModal = false } = {},
) {
  if (!(await ensureLocalMedia(audioOnly))) {
    return { success: false, role: null, result: null };
  }

  const startTime = Date.now();
  getDiagnosticLogger().logRoomCreation(
    customRoomId,
    true,
    {
      creationTime: startTime,
      listenerAttachTime: startTime,
      timeDiff: 0,
    },
    {
      trigger: 'outgoing_call',
      reason: 'calling_saved_contact',
    },
  );

  const result = await CallController.createCall(
    getCallOptions(customRoomId, { audioOnly }),
  );

  return applyCallResult(result, showLinkModal);
}

export async function answerIncomingCallInRoom(
  customRoomId,
  { audioOnly = false } = {},
) {
  if (!(await ensureLocalMedia(audioOnly))) {
    return { success: false, role: null, result: null };
  }

  const result = await CallController.answerCall({
    roomId: customRoomId,
    ...getCallOptions(null, { audioOnly }),
  });
  return applyCallResult(result, false);
}

export async function callContact(
  contactId,
  contactNickName,
  roomId = null,
  { audioOnly = false } = {},
) {
  const myUserId = getUserId();
  if (contactId && myUserId === contactId) {
    console.warn('[CALL] Cannot call yourself');
    return false;
  }

  if (!roomId && contactId) {
    if (myUserId) {
      try {
        roomId = getDeterministicRoomId(myUserId, contactId);
        console.log('[CALL] Generated deterministic room ID:', roomId);
      } catch (e) {
        console.error('[CALL] Failed to generate room ID:', e);
        return false;
      }
    }
  }

  if (!roomId) {
    console.error('[CALL] Cannot initiate call: No Room ID available');
    return false;
  }

  const callStart = await startOutgoingCallInRoom(roomId, {
    audioOnly,
  }).catch((e) => {
    console.warn('[CALL] Failed to start outgoing call:', e);
    return { success: false, role: null };
  });

  if (callStart.success) {
    contactsService.updateLastInteraction(contactId).catch(() => {});

    const me = getUser();
    const callerName = me?.userName || me?.email || myUserId;
    const pushCall = getPushNotifications()?.sendIncomingCall({
      targetUserId: contactId,
      roomId,
      callerId: myUserId,
      callerName,
    });

    if (pushCall) {
      pushCall
        .then((pushResult) => {
          if (!pushResult?.ok) {
            console.warn('[CALL] Call-start push notification did not succeed');
          }
        })
        .catch((error) => {
          console.warn('[CALL] Failed to send push notification:', error);
        });
    }

    if (callStart.role === 'initiator') {
      try {
        await showOutgoingCallUI(roomId, contactNickName, {
          audioOnly,
          onCancel: (reason) => {
            CallController.hangUp({ reason }).catch((e) => {
              console.warn('[CALL] hangUp after cancel/timeout failed:', e);
            });
          },
          onHide: () => {}, // onCallingEnded,
        });
      } catch (error) {
        console.warn('[CALL] Failed to show calling UI:', error);
        await CallController.hangUp({ reason: 'calling_ui_show_failed' }).catch(
          () => {},
        );
        return { success: false, role: callStart.role };
      }
    }
  }

  return callStart;
}
