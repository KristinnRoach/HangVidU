import { useP2PRoom } from '@kidlib/p2p/solid';

import { useCallFlow } from './features/call/useCallFlow.js';

import MainLayout from './components/MainLayout.jsx';
import CallDialogs from './features/call/components/CallDialogs.jsx';
import { setupAppRuntime } from './app/setupAppRuntime.js';
import { useAppMountEffects } from './app/useAppMountEffects.js';
import { useP2PFileTransferBridge } from './features/file-transfer/useP2PFileTransferBridge.js';
import { createFirebaseRoomSignaling } from './features/signaling/firebase-room-signaling.js';
import { P2PProvider } from './shared/p2p-context.js';

await setupAppRuntime();

/**
 * SolidJS app shell.
 * WIP - Migrating imperative UI modules behind this root
 */
export default function App() {
  const p2p = useP2PRoom();
  const callFlow = useCallFlow({
    p2p,
    createSignaling: createFirebaseRoomSignaling,
  });
  const { messagesUIReady } = useAppMountEffects({ callFlow });
  useP2PFileTransferBridge({ p2p, messagesUIReady });

  return (
    <P2PProvider value={p2p}>
      <MainLayout />
      <CallDialogs callFlow={callFlow} />
    </P2PProvider>
  );
}
