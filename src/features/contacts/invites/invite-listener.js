import {
  listenForInvites,
  listenForAcceptedInvites,
  acceptInvite,
  declineInvite,
} from './invitations.js';
import { dispatchCommand } from '../../../shared/events/index.js';
import {
  showSuccessToast,
  showErrorToast,
} from '../../../components/base-legacy/toast.js';

// TODO: WIP decoupling considerations:
// createInviteNotification, inAppNotificationManager, showSuccessToast/showErrorToast
// — these are all notification/UI presentation concerns.
// Consider publishing events (publish('contact:invite:received', ...),
// publish('contact:invite:accepted', ...)) and let a notification-side listener
// handle the presentation.

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
    const notificationId = `invite-${fromUserId}`;

    dispatchCommand('cmd:app-notifications:invite:add', {
      notificationId,
      fromUserId,
      inviteData,
      onAccept: async () => {
        try {
          await acceptInvite(fromUserId, inviteData);
          console.log('[INVITATIONS] Contact added:', inviteData.fromName);
          showSuccessToast(`✅ ${inviteData.fromName} added to contacts!`);

          // Remove notification after successful accept
          dispatchCommand('cmd:app-notifications:invite:remove', {
            notificationId,
          });
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
          dispatchCommand('cmd:app-notifications:invite:remove', {
            notificationId,
          });
        } catch (e) {
          console.error('[INVITATIONS] Failed to decline invite:', e);
        } finally {
          isProcessingInvite = false;
          processNextInvite();
        }
      },
    });
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
export function setupInviteListener() {
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

    // Show success toast
    showSuccessToast(
      `✅ ${acceptData.acceptedByName} is now in your contacts!`,
    );
  });
}
