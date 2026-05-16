import { createSignal, Show, createEffect } from 'solid-js';

import AppTitle from './app/AppTitle.jsx';
import AuthControls from './auth/AuthControls.jsx';
import AddContactButton from './contacts/AddContactButton.jsx';
import NotificationsToggle from './app/NotificationsToggle.jsx';
import LegalFooter from './app/LegalFooter.jsx';
import LocaleToggle from './app/LocaleToggle.jsx';

import PublicHomepage from './app/PublicHomepage.jsx';
import ContactsList from './contacts/ContactsList';
import ActiveCallRoom from '../features/call/components/ActiveCallRoom';
import { useP2PContext } from '../shared/p2p-context.js';
import { isMessagingNextEnabled } from '../features/messaging-next/feature-flag.js';
import ConversationPanel from '../features/messaging-next/ConversationPanel';
import CallDialogs from '../features/call/components/CallDialogs.jsx';
import styles from './MainContent.module.css';

// legacy imports:
import { useP2PFileTransferBridge } from '../features/file-transfer/useP2PFileTransferBridge.js';
import {
  useLegacyI18nElements,
  useLegacyIcons,
  useLegacyMessagesUIReady,
  useP2PRuntimeDiagnostics,
} from '../app/useLegacyMountEffects.js';
import { useAuth } from '../auth/solid-auth.js';

// type ViewMode = 'home' | 'call' | 'contacts' | 'messaging';

const VIEWS = {
  home: PublicHomepage,
  call: ActiveCallRoom,
  contacts: ContactsList,
  messaging: ConversationPanel,
} as const;

type ViewMode = keyof typeof VIEWS;

const messagingNext = isMessagingNextEnabled();

export default function MainContent() {
  const p2p = useP2PContext();
  const { isLoggedIn } = useAuth();
  const initialView: ViewMode = isLoggedIn() ? 'contacts' : 'home';

  const [activeView, setActiveView] = createSignal<ViewMode>(initialView);

  createEffect(() => {
    // Contacts vs home view:
    if (isLoggedIn()) {
      setActiveView((prev) => (prev === 'home' ? 'contacts' : prev));
    } else {
      setActiveView((prev) => (prev === 'contacts' ? 'home' : prev));
    }

    // Call view:
    if (p2p.state() === 'joined') {
      setActiveView('call');
    }
    if (p2p.state() === 'idle' && activeView() === 'call') {
      setActiveView(isLoggedIn() ? 'contacts' : 'home');
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

  console.log('isloggedin', isLoggedIn());

  return (
    <div class={styles.layoutWrapper}>
      <TopBar
        activeView={activeView()}
        setActiveView={setActiveView}
        isInCall={p2p.state() !== 'idle'}
      />
      <div id='onetap-container' />

      <main id='main-content' class={styles.mainContent}>
        <div id='lobby' class={styles.lobby}>
          <CallDialogs />

          {/* Currently using CSS display for exclusive rendering to keep stateful components mounted
        TODO: Consider refactoring to use SolidJS Match + Switch */}

          <div
            hidden={activeView() !== 'home' || isLoggedIn()}
            class={styles.activeViewContainer}
          >
            <PublicHomepage />
          </div>

          <Show when={p2p.state() !== 'idle'}>
            <div
              hidden={activeView() !== 'call'}
              class={styles.activeViewContainer}
            >
              <ActiveCallRoom />
            </div>
          </Show>

          <div
            hidden={activeView() !== 'contacts' || !isLoggedIn()}
            class={styles.activeViewContainer}
          >
            <ContactsList />
          </div>

          <Show when={messagingNext}>
            {/* TODO: remove "Show" when messaging-next is fully rolled out and legacy messaging UI is removed */}
            <div
              hidden={activeView() !== 'messaging'}
              class={styles.activeViewContainer}
            >
              <ConversationPanel onFocus={() => setActiveView('messaging')} />
            </div>
          </Show>
        </div>
      </main>

      <Show when={activeView() === 'home' || activeView() === 'contacts'}>
        <LegalFooter />
        <LocaleToggle />
      </Show>
    </div>
  );
}

interface TopBarProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  isInCall: boolean;
}

function TopBar(props: TopBarProps) {
  const { isLoggedIn } = useAuth();

  return (
    <header id='top-bar' class='top-bar'>
      <div id='top-bar-left' class='top-bar-left animated-flex'>
        <AppTitle />
        <AuthControls />
      </div>

      {/* Temp Navigation/Test buttons to demonstrate switching */}
      <nav class={styles.topNav}>
        {/* <button onClick={() => props.setActiveView?.('home')}>Home</button> */}
        <Show when={props.isInCall}>
          <button onClick={() => props.setActiveView('call')}>Call</button>
        </Show>

        <Show when={isLoggedIn()}>
          <button onClick={() => props.setActiveView('contacts')}>
            Contacts
          </button>
          <button onClick={() => props.setActiveView('messaging')}>
            Messaging
          </button>
        </Show>
      </nav>

      <div class='top-bar-right'>
        <AddContactButton />
        <NotificationsToggle />
        {/* <YouTubeSearchControls /> */}
      </div>
    </header>
  );
}
