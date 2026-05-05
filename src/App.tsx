import { onMount } from 'solid-js';

import { rtdb } from './shared/storage/fb-rtdb/rtdb.js';
import { devDebug } from './shared/utils/dev/dev-utils.js';
import { initializeAppCheckDeferred } from './shared/vendors/firebase.js';
import { initI18n } from './shared/i18n/index.js';
import { setupContacts } from './setup/setupContacts.js';
import { setupAuth } from './setup/setupAuth.js';
import { setupInitPreflight } from './setup/setupInitPreflight.js';
import { setupAppRoot } from './setup/setupAppRoot.js';
import { setupMainAppBusListeners } from './setup/setupMainAppBusListeners.js';
import { messagingController } from './features/messaging/messaging-controller.js';
import { initCallService, getCallService } from './call-service.js';

import { setLogger } from '@kidlib/p2p';
import { useP2PRoom } from '@kidlib/p2p/solid';
import { createFirebaseRoomSignaling } from './features/call/signaling/firebase-room-signaling';

import { getUser, getUserId } from './auth/auth-state.js';
import { handleCommand } from './shared/events/index.js';
import { getPushNotifications } from './features/push-notifications/push-notifications.js';
import { showPushUnsupportedNotification } from './features/notifications/index.js';

import MainLayout from './components/MainLayout.jsx';
import { setupMessagingAppBusHandlers } from './features/messaging/messaging-command-handlers.js';

function initP2P() {
  setLogger((...args) => {
    console.info('[P2P]', ...args);
  });
}

/**
 * SolidJS app shell.
 * WIP - Migrating imperative UI modules behind this root
 */
export default function App() {
  const p2p = useP2PRoom();

  async function enterRoom(
    roomId: string,
    localUserId: string,
    getLocalStream: () => Promise<MediaStream> = () =>
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }),
    memberCapacity = 2,
  ) {
    const room = await p2p.join({
      roomId,
      peerId: localUserId,
      createSignaling: createFirebaseRoomSignaling,
      getLocalStream,
      memberCapacity, // 2 for 1:1 calls, can increase for group calls
    });

    import.meta.env.DEV &&
      room &&
      console.debug(
        `Active room: ${room.roomId}, members: ${room.members.join(', ')}`,
      );

    return room;
  }

  async function exitActiveRoom() {
    p2p.close();

    const svc = getCallService();
    if (svc) {
      await Promise.all([svc.endActiveCall(), svc.clearOutgoingCallResponse()]);
    }
  }

  onMount(async () => {
    // Remove most of these when Solid-ified:
    console.info('Mounting app.. rtdb:', rtdb);
    setupInitPreflight();
    initializeAppCheckDeferred();
    await initI18n();
    await setupAuth();
    setupAppRoot();
    setupMainAppBusListeners();
    await setupContacts();
    setupMessagingAppBusHandlers({ messagingController });

    // Initialize push notifications (permission requests happen on auth change)
    const pushController = getPushNotifications();
    try {
      const pushInitialized = await pushController.initialize();
      if (!pushInitialized && !pushController.isNotificationSupported()) {
        showPushUnsupportedNotification();
      }
    } catch (error) {
      console.error('[APP.onMount()] Push notifications init:', error);
    }

    const localUID = getUserId();
    const callService = initCallService({ localUID, rtdb });
    initP2P();

    handleCommand('cmd:room:initiate:call', async ({ contactId }) => {
      const outgoingRoomId = callService.sendOutgoingCallInvite({
        recipientUID: contactId,
      });

      // todo: Send push notification
      // todo: Show outgoing call UI + start audio + indicators

      const me = getUser();
      const callerName = me?.userName || me?.email || localUID;
      const pushCall = getPushNotifications()?.sendIncomingCall({
        targetUserId: contactId,
        roomId: outgoingRoomId,
        callerId: localUID,
        callerName,
      });

      if (pushCall) {
        pushCall
          .then((pushResult) => {
            if (!pushResult?.ok) {
              console.warn(
                '[CALL] Call-start push notification did not succeed',
              );
            }
          })
          .catch((error) => {
            console.warn('[CALL] Failed to send push notification:', error);
          });
      }

      console.debug('Initiated outgoing call invite:', {
        contactId,
        outgoingRoomId,
      });
    });

    handleCommand('cmd:room:exit:call', () => {
      exitActiveRoom().catch((err) => {
        console.error('Error exiting room:', err);
      });
    });

    callService.onIncomingCall((call) => {
      if (!call) return;
      console.debug('Received incoming call invite:', { call });
      if (call) {
        const shouldAccept = window.confirm(
          `Incoming call from ${call.from}. Accept?`,
        );
        if (shouldAccept) {
          callService
            .acceptIncomingCall({ fromUID: call.from, roomId: call.roomId })
            .then(() => {
              enterRoom(call.roomId, localUID).catch((err) => {
                console.error('Error entering room after accepting call:', err);
              });
            })
            .catch((err) => {
              console.error('Error accepting incoming call:', err);
              exitActiveRoom();
            });
        } else {
          console.debug('User declined incoming call invite');
        }
      }
    });

    callService.onOutgoingCallResponse((response) => {
      if (!response) return;
      console.debug('Received outgoing call response:', { response });

      // todo: Hide outgoing call UI + stop audio + indicators
      if (response) {
        // Clear immediately so stale data doesn't re-trigger on next page load
        callService.clearOutgoingCallResponse();
        if (response.responseType === 'accepted') {
          enterRoom(response.roomId, localUID).catch((err) => {
            console.error(
              'Error entering room after outgoing call accepted:',
              err,
            );
            exitActiveRoom();
          });
        } else if (response.responseType === 'rejected') {
          window.alert(`Your call  was rejected.`);
        }
      }
    });

    devDebug('End of onMount');
  });

  return (
    <div>
      <MainLayout p2p={p2p} />
    </div>
  );
}
