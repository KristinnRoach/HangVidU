import { getUser, getUserId } from '../../auth/index.js';
import { getPushNotifications } from '../push-notifications/index.js';
import CallController from './call-controller.js';
import { contactsService } from '../contacts/index.js';
import RoomService from './room.js';
import { getDiagnosticLogger } from '../../shared/utils/dev/diagnostic-logger.js';
import { getDeterministicRoomId } from '../../shared/utils/room-id.js';
import { getElements } from '../../elements.js';
import { getLocalStream } from '../../shared/media/state.js';
import { setupRemoteStream } from '../../shared/media/stream.js';
import { setupWatchSync } from '../watch/watch-sync.js';
import { showCopyLinkModal } from '../../shared/components/modal/copyLinkModal.js';
import { devDebug } from '../../shared/utils/dev/dev-utils.js';
import { listenForIncomingOnRoom } from './room-listeners.js';
import { showOutgoingCallUI } from './outgoing-call-session.js';
import {
  initLocalStreamAndMedia,
  handleMediaPermissionError,
} from '../../shared/media/WIP-init-local-media.js';

// TODO: WIP decoupling considerations:
// - Circular import: this file imports listenForIncomingOnRoom from room-listeners.js,
//   which imports joinOrCreateRoomWithId from this file. Works at runtime (lazy calls)
//   but signals these two are tightly coupled — consider merging or routing through app bus.
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

  return true;
}

function isRoomAlreadyExistsError(error) {
  return String(error?.message || error).includes('Room already exists');
}

async function answerExistingRoom(customRoomId, audioOnly) {
  devDebug('Room was created concurrently; retrying as joiner...');
  getDiagnosticLogger().log('ROOM', 'CREATE_RACE_RETRY_JOIN', {
    roomId: customRoomId,
  });

  const result = await CallController.answerCall({
    roomId: customRoomId,
    ...getCallOptions(null, { audioOnly }),
  });

  return applyCallResult(result, false);
}

async function createOrAnswerExistingRoom(
  customRoomId,
  { audioOnly = false, showLinkModal = false } = {},
) {
  try {
    const result = await CallController.createCall(
      getCallOptions(customRoomId, { audioOnly }),
    );

    return applyCallResult(result, showLinkModal);
  } catch (error) {
    if (!isRoomAlreadyExistsError(error)) throw error;
    return answerExistingRoom(customRoomId, audioOnly);
  }
}

export async function joinOrCreateRoomWithId(
  customRoomId,
  {
    forceInitiator = false,
    allowCreate = forceInitiator,
    audioOnly = false,
  } = {},
) {
  try {
    await initLocalStreamAndMedia({ audioOnly });
  } catch (error) {
    console.error('Failed to initialize local media stream:', error);
    handleMediaPermissionError(error);
    return false;
  }

  const startTime = Date.now();

  if (forceInitiator) {
    getDiagnosticLogger().logRoomCreation(
      customRoomId,
      true,
      {
        creationTime: startTime,
        listenerAttachTime: startTime,
        timeDiff: 0,
      },
      {
        trigger: 'force_initiator',
        reason: 'calling_saved_contact',
      },
    );

    return createOrAnswerExistingRoom(customRoomId, {
      audioOnly,
      showLinkModal: false,
    });
  }

  let status = await RoomService.checkRoomStatus(customRoomId);

  if (status.exists && !status.hasMembers) {
    const maxRetries = 3;
    let attempt = 0;
    while (attempt < maxRetries && !status.hasMembers) {
      await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
      status = await RoomService.checkRoomStatus(customRoomId);
      attempt++;
    }
  }

  if (!status.exists || !status.hasMembers) {
    if (!allowCreate) {
      devDebug('Target room is no longer active; aborting join flow.');
      getDiagnosticLogger().log('ROOM', 'JOIN_ABORTED', {
        roomId: customRoomId,
        roomExists: status.exists,
        memberCount: status.memberCount || 0,
      });
      return false;
    }

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

    return createOrAnswerExistingRoom(customRoomId, {
      audioOnly,
      showLinkModal: true,
    });
  }

  devDebug('Joining room...');
  getDiagnosticLogger().log('ROOM', 'JOINING_EXISTING', {
    roomId: customRoomId,
    memberCount: status.memberCount,
    roomExists: status.exists,
  });

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

  listenForIncomingOnRoom(roomId);

  const success = await joinOrCreateRoomWithId(roomId, {
    forceInitiator: true,
    audioOnly,
  }).catch((e) => {
    console.warn('[CALL] Failed to join or create room:', e);
    return false;
  });

  if (success) {
    contactsService.updateLastInteraction(contactId).catch(() => {});

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
      return false;
    }

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
  }

  return success;
}
