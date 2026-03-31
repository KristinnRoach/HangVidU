import {
  listenForInvites,
  listenForAcceptedInvites,
  acceptInvite,
  declineInvite,
} from './invitations.js';
import { createInviteNotification } from '../ui/components/notifications/invite-notification.js';
import { inAppNotificationManager } from '../ui/components/notifications/in-app-notification-manager.js';
import { showSuccessToast, showErrorToast } from '../ui/utils/toast.js';
import { renderContactsList } from './components/contacts-list.js';

// TODO: WIP decoupling considerations:
// createInviteNotification, inAppNotificationManager, showSuccessToast/showErrorToast
// — these are all notification/UI presentation concerns.
// Consider emitting events (appBus.emit('contact:invite:received', ...),
// appBus.emit('contact:invite:accepted', ...)) and let a notification-side listener
// handle the presentation.

// Queue for incoming invites (can be used by notification system later)
const pendingInvites = [];
let isProcessingInvite = false;

/**
 * Process the next invite in the queue.
 * Shows invite notification in the notification list.
 */
async function processNextInvite(lobbyElement) {
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
          await renderContactsList(lobbyElement).catch(() => {});
          showSuccessToast(`✅ ${inviteData.fromName} added to contacts!`);

          // Remove notification after successful accept
          inAppNotificationManager.remove(`invite-${fromUserId}`);
        } catch (e) {
          console.error('[INVITATIONS] Failed to accept invite:', e);
          showErrorToast('Failed to add contact. Please try again.');
          // Keep notification visible on error
        } finally {
          isProcessingInvite = false;
          processNextInvite(lobbyElement);
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
          processNextInvite(lobbyElement);
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
    processNextInvite(lobbyElement);
  }
}

/**
 * Set up listener for incoming contact invitations.
 * Queues invites and processes them one at a time.
 */
export function setupInviteListener(lobbyElement) {
  listenForInvites((fromUserId, inviteData) => {
    pendingInvites.push({ fromUserId, inviteData });
    processNextInvite(lobbyElement);
  });

  // Listen for accepted invites (when someone accepts your invite)
  listenForAcceptedInvites(async (acceptedByUserId, acceptData) => {
    console.log(
      '[INVITATIONS] Your invite was accepted by:',
      acceptData.acceptedByName,
    );

    // Refresh contacts list to show new contact
    await renderContactsList(lobbyElement).catch(() => {});

    // Show success toast
    showSuccessToast(
      `✅ ${acceptData.acceptedByName} is now in your contacts!`,
    );
  });
}
