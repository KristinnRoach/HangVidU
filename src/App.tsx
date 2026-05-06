import { onMount, Show } from 'solid-js';

import { devDebug } from './shared/utils/dev/dev-utils.js';
import { initializeAppCheckDeferred } from './shared/vendors/firebase.js';
import { initI18n } from './shared/i18n/index.js';
import { setupContacts } from './setup/setupContacts.js';
import { setupAuth } from './setup/setupAuth.js';
import { setupInitPreflight } from './setup/setupInitPreflight.js';
import { setupAppRoot } from './setup/setupAppRoot.js';
import { setupMainAppBusListeners } from './setup/setupMainAppBusListeners.js';
import { messagingController } from './features/messaging/messaging-controller.js';
import { getCallService } from './call-service.js';

import { setLogger } from '@kidlib/p2p';
import { useP2PRoom } from '@kidlib/p2p/solid';
import { createFirebaseRoomSignaling } from './features/signaling/firebase-room-signaling.js';

import { getUserId } from './auth/auth-state.js';
import { getPushNotifications } from './features/push-notifications/push-notifications.js';
import { setupCallFlow } from './useCallFlow.js';
import { showPushUnsupportedNotification } from './features/notifications/index.js';

import MainLayout from './components/MainLayout.jsx';
import { setupMessagingAppBusHandlers } from './features/messaging/messaging-command-handlers.js';
import OutgoingCallDialog from './components/dialogs/OutgoingCallDialog.jsx';
import IncomingCallDialog from './components/dialogs/IncomingCallDialog.jsx';
import {
  outgoingCall,
  incomingCall,
  setOutgoingCall,
  setIncomingCall,
} from './components/dialogs/state.js';

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

  function handleCancelOutgoing() {
    const call = outgoingCall();
    const svc = getCallService();
    if (!call || !svc) return;
    setOutgoingCall(null);
    svc
      .cancelOutgoingCall({ recipientUID: call.contactId, roomId: call.roomId })
      .catch((err) => {
        console.error('Error cancelling outgoing call:', err);
      });
  }

  function handleAcceptIncoming() {
    const call = incomingCall();
    const svc = getCallService();
    if (!call || !svc) return;
    setIncomingCall(null);
    svc
      .acceptIncomingCall({ fromUID: call.from, roomId: call.roomId })
      .then(() => enterRoom(call.roomId, getUserId()))
      .catch((err) => {
        console.error('Error accepting incoming call:', err);
        exitActiveRoom();
      });
  }

  function handleDeclineIncoming() {
    const call = incomingCall();
    const svc = getCallService();
    if (!call || !svc) return;
    setIncomingCall(null);
    svc
      .rejectIncomingCall({ fromUID: call.from, roomId: call.roomId })
      .catch((err) => {
        console.error('Error declining incoming call:', err);
      });
  }

  onMount(async () => {
    // Remove most of these when Solid-ified:
    console.info('Mounting app...');
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

    initP2P();
    setupCallFlow({ enterRoom, exitActiveRoom });

    devDebug('End of onMount');
  });

  return (
    <div>
      <MainLayout p2p={p2p} />
      <Show when={outgoingCall()}>
        {(call) => (
          <OutgoingCallDialog
            calleeName={call().contactId}
            onCancel={handleCancelOutgoing}
          />
        )}
      </Show>
      <Show when={incomingCall()}>
        {(call) => (
          <IncomingCallDialog
            callerName={call().from}
            onAccept={handleAcceptIncoming}
            onDecline={handleDeclineIncoming}
          />
        )}
      </Show>
    </div>
  );
}
