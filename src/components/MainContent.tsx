import { createSignal, Show, createEffect } from 'solid-js';

import PublicHomepage from './app/PublicHomepage.jsx';
import ContactsList from './contacts/ContactsList';
import ActiveCallRoom from '../features/call/components/ActiveCallRoom';
import { useP2PContext } from '../shared/p2p-context.js';
import { isMessagingNextEnabled } from '../features/messaging-next/feature-flag.js';
import ConversationPanel from '../features/messaging-next/ConversationPanel';
import CallDialogs from '../features/call/components/CallDialogs.jsx';

// legacy imports:
import { useP2PFileTransferBridge } from '../features/file-transfer/useP2PFileTransferBridge.js';
import {
  useLegacyI18nElements,
  useLegacyIcons,
  useLegacyMessagesUIReady,
  useP2PRuntimeDiagnostics,
} from '../app/useLegacyMountEffects.js';

type ViewMode = 'home' | 'call' | 'contacts' | 'messaging';

const messagingNext = isMessagingNextEnabled();

export default function MainContent() {
  const p2p = useP2PContext();

  const [activeView, setActiveView] = createSignal<ViewMode>('home');

  // Automatically switch to call view when connected/joining
  createEffect(() => {
    if (p2p.state() === 'joined') {
      setActiveView('call');
    }
  });

  // START - legacy setup, will be refactored:
  useLegacyI18nElements();
  useP2PRuntimeDiagnostics();
  const messagesUIReady = useLegacyMessagesUIReady();
  useLegacyIcons();

  if (!messagingNext) {
    useP2PFileTransferBridge({
      messagesUIReady,
    });
  }
  // END - legacy setup, will be refactored:

  return (
    <main id='main-content'>
      <div class='relative-wrapper'>
        <div id='lobby' class='lobby'>
          {/* Navigation/Test buttons just to demonstrate switching */}
          <nav>
            <button onClick={() => setActiveView('home')}>Home</button>
            <button onClick={() => setActiveView('call')}>Call</button>
            <button onClick={() => setActiveView('contacts')}>Contacts</button>
            <button onClick={() => setActiveView('messaging')}>Messages</button>
          </nav>

          <CallDialogs />

          {/* Use CSS display for exclusive rendering to keep stateful components mounted */}
          <div hidden={activeView() !== 'home'}>
            <PublicHomepage />
          </div>

          <Show when={p2p.state() !== 'idle'}>
            <div hidden={activeView() !== 'call'}>
              <ActiveCallRoom />
            </div>
          </Show>

          <div hidden={activeView() !== 'contacts'}>
            <ContactsList />
          </div>

          <Show when={messagingNext}>
            <div class='stretch-height' hidden={activeView() !== 'messaging'}>
              <ConversationPanel onFocus={() => setActiveView('messaging')} />
            </div>
          </Show>

          {/* <PublicHomepage />
          <Show when={p2p.state() !== 'idle'}>
            <ActiveCallRoom />
          </Show>
          <ContactsList />
          <Show when={messagingNext}>
            <ConversationPanel />
          </Show> */}
        </div>
      </div>
    </main>
  );
}
