import CallController from './call-controller.js';
import { contactsService, renderContactsList } from '../contacts/index.js';
import { getUserId, getUser } from '../../auth/index.js';
import { getPushNotifications } from '../push-notifications/index.js';
import { cleanupRemoteStream } from '../../media/state.js';
import { clearUrlParam } from '../../utils/url.js';
import { onOutgoingCallAnswered } from './components/outgoing-call.js';
import { promptAndRefreshContactSave } from '../../app/contact-save-flow.js';
import { devDebug } from '../../utils/dev/dev-utils.js';
import { publish } from '../../events/index.js';
import { listenForIncomingOnRoom } from './room-listeners.js';

// TODO: WIP decoupling considerations:
/*
  ┌──────────────────────┬────────────────────┬──────────────────────────────────┐
  │        Import        │       Domain       │              Issue               │
  ├──────────────────────┼────────────────────┼──────────────────────────────────┤
  │                      │                    │ Cross-domain. Handles            │
  │ contactsService      │ contacts           │ post-hangup contact save flow    │
  │                      │                    │ and missed call lookup.          │  
  ├──────────────────────┼────────────────────┼──────────────────────────────────┤
  │ onCallAnswered       │ UI/calling         │ UI state transition from         │  
  │                      │                    │ call-domain logic.               │
  ├──────────────────────┼────────────────────┼──────────────────────────────────┤  
  │ renderContactsList   │ UI/contacts        │ UI rendering triggered by call   │
  │                      │                    │ events.                          │  
  ├──────────────────────┼────────────────────┼──────────────────────────────────┤  
  │ cleanupRemoteStream  │ media              │ Arguably same domain (call       │
  │                      │                    │ cleanup)?                        │  
  ├──────────────────────┼────────────────────┼──────────────────────────────────┤
  │                      │                    │ Cross-domain, for missed call    │  
  │ getPushNotifications │ push-notifications │ notifications and notification   │
  │                      │                    │ dismissal.                       │  
  └──────────────────────┴────────────────────┴──────────────────────────────────┘
*/

/**
 * Wire CallController business-logic event handlers.
 *
 * UI-side handlers live in bind-call-ui.js; these handle
 * cross-domain side effects (messaging, contacts, push, media cleanup).
 */
/**
 * @param {{ lobbyElement: HTMLElement }} options
 */
export function setupCallControllerEventWiring(options = {}) {
  const { lobbyElement } = options;

  // Business logic for memberJoined (UI handled in bind-call-ui.js)
  CallController.on('memberJoined', ({ memberId, roomId }) => {
    console.debug('CallController memberJoined event', { memberId, roomId });

    CallController.setPartnerId(memberId);

    // below is cb from UI module - TODO: clarify / refactor
    onOutgoingCallAnswered().catch((e) =>
      console.warn('Failed to clear calling state:', e),
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

      // Handle Missed Call - Push notification and chat message
      // Trigger if: initiator, no partner joined, never established connection, and valid room
      const isMissedCall =
        role === 'initiator' && !partnerId && !wasConnected && roomId;

      if (isMissedCall) {
        console.log('[MAIN] Potential missed call detected for room:', roomId);
        try {
          const contact = await contactsService.getContactByRoomId(roomId);
          if (contact && contact.contactId) {
            const me = getUser();
            const callerName = me?.userName || 'Friend';

            publish('call:unanswered', {
              roomId,
              contactId: contact.contactId,
            });

            // Send push notification to the contact (callee)
            console.log(
              `[MAIN] Sending missed call push notification to ${contact.contactNickName} (${contact.contactId})`,
            );
            try {
              await getPushNotifications()?.sendMissedCall({
                targetUserId: contact.contactId,
                roomId,
                callerId: getUserId(),
                callerName,
              });
            } catch (pushError) {
              console.warn(
                '[MAIN] Failed to send missed call push notification:',
                pushError,
              );
            }
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
      if (roomId && getPushNotifications()?.isNotificationEnabled()) {
        getPushNotifications()
          .dismissCallNotifications(roomId)
          .catch((error) => {
            console.warn('[MAIN] Failed to dismiss call notifications:', error);
          });
      }

      cleanupRemoteStream();
      clearUrlParam();

      // Re-render contacts list so sort order reflects updated lastInteractionAt
      renderContactsList(lobbyElement).catch(() => {});

      // Re-attach incoming listener so the next call on this room is detected
      if (roomId && reason !== 'page_unload') {
        listenForIncomingOnRoom(roomId);
      }

      // Prompt to save contact after cleanup (if partner was present)
      if (partnerId && roomId) {
        setTimeout(() => {
          contactsService
            .handleHangUp(partnerId, roomId)
            .then((result) => {
              if (result.action === 'prompt-save') {
                promptAndRefreshContactSave(
                  partnerId,
                  roomId,
                  lobbyElement,
                ).catch((e) => {
                  console.warn('Failed to show save contact prompt:', e);
                });
              }
            })
            .catch((e) => {
              console.warn('Failed to handle hang-up contact flow:', e);
            });
        }, 500);
      }
    },
  );
}
