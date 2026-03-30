import { getUser, getUserId } from '../auth/auth-state.js';
import { getPushNotifications } from '../push-notifications/index.js';
import CallController from './call-controller.js';
import { contactsService } from '../contacts/contacts-service.js';
import RoomService from './room.js';
import { getDiagnosticLogger } from '../utils/dev/diagnostic-logger.js';
import { getDeterministicRoomId } from '../utils/room-id.js';

// STARTUP_ORDER_DEPENDANCY: main.js must call setupWIPStartCallRefactor()
// before any module uses the exported wrapper functions below.
let api = null;

function getConfiguredApi() {
  if (!api) {
    throw new Error(
      'WIP start-call refactor requires setupWIPStartCallRefactor(...) before use',
    );
  }

  return api;
}

/**
 * Temporary extraction of start-call logic from main.js.
 * This keeps behavior intact while making the remaining coupling explicit.
 */
export function createWIPStartCallRefactor({
  initLocalStreamAndMedia,
  handleMediaPermissionError,
  getLocalStream,
  localVideoEl,
  remoteVideoEl,
  mutePartnerBtn,
  setupRemoteStream,
  setupWatchSync,
  showCopyLinkModal,
  devDebug,
  listenForIncomingOnRoom,
}) {
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

    return true;
  }

  async function joinOrCreateRoomWithId(
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

      const result = await CallController.createCall(
        getCallOptions(customRoomId),
      );

      return applyCallResult(result, false);
    }

    let status = await RoomService.checkRoomStatus(customRoomId);

    if (status.exists && !status.hasMembers) {
      const maxRetries = 3;
      let attempt = 0;
      while (attempt < maxRetries && !status.hasMembers) {
        await new Promise((resolve) =>
          setTimeout(resolve, 250 * (attempt + 1)),
        );
        status = await RoomService.checkRoomStatus(customRoomId);
        attempt++;
      }
    }

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

      return applyCallResult(result, true);
    }

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

  async function callContact(contactId, contactName, roomId = null) {
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
    }).catch((e) => {
      console.warn('[CALL] Failed to join or create room:', e);
      return false;
    });

    if (success) {
      contactsService.updateLastInteraction(contactId).catch(() => {});

      try {
        const me = getUser();
        const callerName = me?.displayName || me?.email || myUserId;
        const pushResult = await getPushNotifications().sendIncomingCall({
          targetUserId: contactId,
          roomId,
          callerId: myUserId,
          callerName,
        });
        if (!pushResult?.ok) {
          console.warn('[CALL] Call-start push notification did not succeed');
        }
      } catch (error) {
        console.warn('[CALL] Failed to send push notification:', error);
      }

      try {
        const [{ showCallingUI }, { onCallingStarted, onCallingEnded }] =
          await Promise.all([
            import('../ui/components/calling/calling-ui.js'),
            import('../ui/core/call-lifecycle-ui.js'),
          ]);
        onCallingStarted();
        await showCallingUI(roomId, contactName, {
          onCancel: (reason) => {
            CallController.hangUp({ reason }).catch((e) => {
              console.warn('[CALL] hangUp after cancel/timeout failed:', e);
            });
          },
          onHide: onCallingEnded,
        });
      } catch (e) {
        console.warn('[CALL] Failed to load calling UI:', e);
      }
    }

    return success;
  }

  return {
    getCallOptions,
    applyCallResult,
    joinOrCreateRoomWithId,
    callContact,
  };
}

export function setupWIPStartCallRefactor(config) {
  api = createWIPStartCallRefactor(config);
  return api;
}

export function getCallOptions(...args) {
  return getConfiguredApi().getCallOptions(...args);
}

export function applyCallResult(...args) {
  return getConfiguredApi().applyCallResult(...args);
}

export function joinOrCreateRoomWithId(...args) {
  return getConfiguredApi().joinOrCreateRoomWithId(...args);
}

export function callContact(...args) {
  return getConfiguredApi().callContact(...args);
}
