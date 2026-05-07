import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';

import { devDebug, setDevDebugEnabled } from './shared/utils/dev/dev-utils.js';
import { initializeAppCheckDeferred } from './shared/vendors/firebase.js';
import { initI18n, onLocaleChange } from './shared/i18n/index.js';
import { setupContacts } from './setup/setupContacts.js';
import { setupAuth } from './setup/setupAuth.js';
import { setupAppRoot } from './setup/setupAppRoot.js';
import { setupMainAppBusListeners } from './setup/setupMainAppBusListeners.js';
import { messagingController } from './features/messaging/messaging-controller.js';

import { setLogger } from '@kidlib/p2p';
import { useP2PRoom } from '@kidlib/p2p/solid';

import { initPushNotifications } from './features/push-notifications/push-notifications.js';
import { useCallFlow } from './useCallFlow.js';

import MainLayout from './components/MainLayout.jsx';
import { setupMessagingAppBusHandlers } from './features/messaging/messaging-command-handlers.js';
import CallDialogs from './components/dialogs/CallDialogs.jsx';
import {
  initMessagesUI,
  getMessagesUI,
} from './features/messaging/components/messages-ui.js';
import { initIcons } from './shared/components/ui/icons.js';
import { initializeElements, updateI18nElements } from './elements.js';
import { FileTransferController } from './features/file-transfer/file-transfer-controller.js';
import { P2PRoomFileTransport } from './features/file-transfer/transport/p2p-room-file-transport.js';
import {
  cleanupDefaultReceiveStore,
  createDefaultReceiveStore,
  probeDefaultReceiveStore,
} from './features/file-transfer/receive-stores/default-receive-store.js';

setDevDebugEnabled(true);
initializeAppCheckDeferred();
await initI18n();
await setupAuth();
await setupContacts();
setupAppRoot();
setupMainAppBusListeners();
setupMessagingAppBusHandlers({ messagingController });

// Initialize push notifications (permission requests happen on auth change)
initPushNotifications().catch((error) => {
  console.error('[APP] Push notifications init:', error);
});

/**
 * SolidJS app shell.
 * WIP - Migrating imperative UI modules behind this root
 */
export default function App() {
  const p2p = useP2PRoom();
  const callFlow = useCallFlow({ p2p });
  const [messagesUIReady, setMessagesUIReady] = createSignal(false);
  const [dataChannelRevision, setDataChannelRevision] = createSignal(0);
  const cleanupFns: (() => void)[] = [];
  let cleanupFileTransfer: (() => void) | undefined;
  let activeFileTransferKey = '';
  let isDisposed = false;

  function clearFileTransferController() {
    cleanupFileTransfer?.();
    cleanupFileTransfer = undefined;
    activeFileTransferKey = '';
    if (messagesUIReady()) {
      getMessagesUI()?.setFileTransferController(null);
    }
  }

  createEffect(() => {
    const room = p2p.room();
    if (!room) return;

    const bumpDataChannelRevision = () => {
      setDataChannelRevision((revision) => revision + 1);
    };

    const cleanups = [
      room.on('dataChannel', bumpDataChannelRevision),
      room.on('dataChannelOpen', bumpDataChannelRevision),
      room.on('dataChannelClose', bumpDataChannelRevision),
      room.on('memberLeft', bumpDataChannelRevision),
      room.on('membersChanged', bumpDataChannelRevision),
    ];

    onCleanup(() => {
      cleanups.forEach((cleanup) => cleanup());
    });
  });

  createEffect(() => {
    const room = p2p.room();
    dataChannelRevision();

    const dataChannels = p2p.dataChannels();
    const members = p2p.members();

    if (!messagesUIReady() || !room || p2p.state() !== 'joined') {
      clearFileTransferController();
      return;
    }

    const remoteMembers = members.filter(
      (memberId) => memberId !== room.peerId,
    );
    if (remoteMembers.length !== 1) {
      clearFileTransferController();
      return;
    }

    const memberId = remoteMembers[0];
    const channel = dataChannels.get(memberId);
    if (channel?.readyState !== 'open') {
      clearFileTransferController();
      return;
    }

    const nextKey = `${room.roomId ?? ''}:${room.peerId}:${memberId}`;
    if (activeFileTransferKey === nextKey) return;

    clearFileTransferController();

    const controller = new FileTransferController({
      transport: new P2PRoomFileTransport({ room, memberId }),
      createReceiveStore: createDefaultReceiveStore,
      cleanupReceiveStores: cleanupDefaultReceiveStore,
    });

    activeFileTransferKey = nextKey;
    cleanupFileTransfer = () => controller.cleanup();
    getMessagesUI()?.setFileTransferController(controller);
  });

  onMount(async () => {
    if (isDisposed) return;
    devDebug('[APP] Start of onMount');
    setLogger((...args) => console.info('[P2P]', ...args));

    initializeElements(); // Legacy imperative UI init - to be migrated
    updateI18nElements(); // Legacy - Hydrate i18n attributes in index.html and re-hydrate on locale change
    const unsubscribeLocaleChange = onLocaleChange(() => updateI18nElements());
    probeDefaultReceiveStore().then((available) => {
      console.info(`[FileTransferController] Is OPFS available: ${available}`);
    });
    initMessagesUI(); // Legacy messages UI - to be migrated
    setMessagesUIReady(true);
    initIcons(); // Legacy icons init - to be migrated
    const cleanupCallFlow = callFlow.setup();
    cleanupFns.push(cleanupCallFlow, unsubscribeLocaleChange);

    devDebug('[APP] End of onMount');
  });

  onCleanup(() => {
    isDisposed = true;
    clearFileTransferController();
    cleanupFns.forEach((fn) => fn());
  });

  return (
    <div>
      <MainLayout p2p={p2p} />
      <CallDialogs callFlow={callFlow} />
    </div>
  );
}
