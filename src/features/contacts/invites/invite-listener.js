import { getLoggedInUserId, getLoggedInUserToken } from '../../../auth/index.js';
import { showErrorToast, showSuccessToast } from '../../../components/base-legacy/toast.js';
import { getHangViduApiBaseUrl } from '../../../infra/hangvidu-api-url.js';
import { subscribeToUserMailbox } from '../../../realtime/user-mailbox';
import { dispatchCommand } from '../../../shared/events/index.js';
import { reloadContacts } from '../../../stores/contactsStore.js';
import {
  acceptContactRequest,
  declineContactRequest,
  listIncomingContactRequests,
} from '../../../stores/userDirectoryStore.js';

const pendingNotificationIds = new Set();

async function showRequestNotification(request) {
  const fromUserId = request?.fromId;
  if (!fromUserId) return;
  const notificationId = `invite-${fromUserId}`;
  if (pendingNotificationIds.has(notificationId)) return;
  pendingNotificationIds.add(notificationId);
  const inviteData = { fromName: request.fromName || 'User' };

  dispatchCommand('cmd:app-notifications:invite:add', {
    notificationId,
    fromUserId,
    inviteData,
    onAccept: async () => {
      try {
        await acceptContactRequest(fromUserId);
        await reloadContacts();
        showSuccessToast(`✅ ${inviteData.fromName} added to contacts!`);
        dispatchCommand('cmd:app-notifications:invite:remove', {
          notificationId,
        });
      } catch (error) {
        console.error('[CONTACT REQUESTS] Failed to accept request:', error);
        showErrorToast('Failed to add contact. Please try again.');
      } finally {
        pendingNotificationIds.delete(notificationId);
      }
    },
    onDecline: async () => {
      try {
        await declineContactRequest(fromUserId);
        dispatchCommand('cmd:app-notifications:invite:remove', {
          notificationId,
        });
      } catch (error) {
        console.error('[CONTACT REQUESTS] Failed to decline request:', error);
      } finally {
        pendingNotificationIds.delete(notificationId);
      }
    },
  });
}

async function syncIncomingRequests() {
  const requests = await listIncomingContactRequests();
  const activeNotificationIds = new Set();
  for (const request of requests) {
    if (request?.fromId) activeNotificationIds.add(`invite-${request.fromId}`);
    await showRequestNotification(request);
  }
  for (const notificationId of pendingNotificationIds) {
    if (activeNotificationIds.has(notificationId)) continue;
    dispatchCommand('cmd:app-notifications:invite:remove', { notificationId });
    pendingNotificationIds.delete(notificationId);
  }
  await reloadContacts();
}

export function setupInviteListener() {
  void syncIncomingRequests().catch((error) =>
    console.warn('[CONTACT REQUESTS] Initial sync failed:', error),
  );

  const unsubscribe = subscribeToUserMailbox(
    {
      localUID: getLoggedInUserId(),
      baseUrl: getHangViduApiBaseUrl(),
      getToken: getLoggedInUserToken,
    },
    (envelope) => {
      if (envelope.t !== 'contact_request') return;
      void syncIncomingRequests().catch((error) =>
        console.warn('[CONTACT REQUESTS] Live sync failed:', error),
      );
    },
  );

  return () => {
    try {
      unsubscribe();
    } finally {
      // Dismiss still-pending invite notifications so their accept/decline
      // callbacks can't fire under the next session (logout / account switch).
      for (const notificationId of pendingNotificationIds) {
        dispatchCommand('cmd:app-notifications:invite:remove', {
          notificationId,
        });
      }
      pendingNotificationIds.clear();
    }
  };
}
