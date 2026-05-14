import { Show } from 'solid-js';

import PublicHomepage from './app/PublicHomepage.jsx';
import ContactsList from './contacts/ContactsList';
import ActiveCallRoom from '../features/call/components/ActiveCallRoom.jsx';
import { useP2PContext } from '../shared/p2p-context.js';

// legacy imports:
import { useP2PFileTransferBridge } from '../features/file-transfer/useP2PFileTransferBridge.js';
import { useAppMountEffects } from '../app/useAppMountEffects.js';

export default function MainContent() {
  const p2p = useP2PContext();

  // START - legacy setup, will be refactored:
  const { messagesUIReady } = useAppMountEffects();
  useP2PFileTransferBridge({
    messagesUIReady,
  });
  // END - legacy setup, will be refactored:

  return (
    <main id='main-content'>
      <div class='relative-wrapper'>
        <div id='lobby' class='lobby'>
          <PublicHomepage />
          <Show when={p2p.state() !== 'idle'}>
            <ActiveCallRoom />
          </Show>
          <ContactsList />
        </div>
      </div>
    </main>
  );
}
