import { createSignal, Show, createEffect, onCleanup, onMount } from 'solid-js';

import { User, PhoneCall, MessageCircle, Mail } from 'lucide-solid';
import { useP2PContext } from '../shared/p2p-context.js';
import { useAuth } from '../auth/solid-auth.js';
import { dispatchCommand, handleCommand } from '../shared/events/index.js';

import AppTitle from './app/AppTitle.jsx';
import AuthControls from './auth/AuthControls.jsx';
import AddContactButton from './contacts/AddContactButton.jsx';
import NotificationsToggle from './app/NotificationsToggle.jsx';
import LegalFooter from './app/LegalFooter.jsx';
import LocaleToggle from './app/LocaleToggle.jsx';

import PublicHomepage from './app/PublicHomepage.jsx';
import ContactsList from './contacts/ContactsList';
import ActiveCallRoom from '../features/call/components/ActiveCallRoom';
import ConversationPanel from '../features/messaging-next/ConversationPanel';
import CallDialogs from '../features/call/components/CallDialogs.jsx';

import mainStyles from './MainContent.module.css';
import topbarStyles from './TopBar.module.css';

// Legacy:
import { useP2PFileTransferBridge } from '../features/file-transfer/useP2PFileTransferBridge.js';
import {
  useLegacyI18nElements,
  useLegacyIcons,
  useLegacyMessagesUIReady,
  useP2PRuntimeDiagnostics,
} from '../app/useLegacyMountEffects.js';
import { isMessagingNextEnabled } from '../features/messaging-next/feature-flag.js';
import type { ConversationSelection } from '../features/messaging-next/interfaces.js';
import type { UserId } from '../features/messaging-next/types.js';

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
  const { authState, isLoggedIn, isLoggingIn, isLoggingOut } = useAuth();
  const initialView: ViewMode = isLoggedIn() ? 'contacts' : 'home';

  const [activeView, setActiveView] = createSignal<ViewMode>(initialView);
  const [selectedConversation, setSelectedConversation] =
    createSignal<ConversationSelection | null>(null);

  function openConversation(selection: ConversationSelection) {
    if (messagingNext) {
      setSelectedConversation(selection);
      if (selection.displayUI !== false) {
        setActiveView('messaging');
      }
      return;
    }

    dispatchCommand('cmd:messaging:conversation:select', selection);
  }

  onMount(() => {
    if (!messagingNext) return;

    // TODO: replace both dispatch and handler with { selectConversation } = useMessaging() ?
    const ac = new AbortController();
    handleCommand(
      'cmd:messaging:conversation:select',
      (selection: ConversationSelection) => {
        openConversation(selection);
      },
      { signal: ac.signal },
    );

    onCleanup(() => ac.abort());
  });

  // Active view - On p2p state changes:
  createEffect(() => {
    // Uncomment for debugging:
    const prevView = activeView();
    console.warn('P2P state:', p2p.state());
    console.warn('View:', prevView);

    // On call join:
    const justJoinedCall = p2p.state() === 'joined' && prevView !== 'call';
    if (justJoinedCall) {
      setActiveView('call');
    }
    // On call end:
    const justLeftCall = p2p.state() === 'closed' && prevView === 'call';
    if (justLeftCall) {
      // setActiveView(isLoggedIn() ? 'contacts' : 'home'); // avoid using auth state here?
      setActiveView('contacts');
    }

    // Uncomment for debugging:
    const wasViewChanged = prevView !== activeView();
    wasViewChanged && console.warn('View: UPDATED', activeView());
    !wasViewChanged && console.warn('View: NO-OP');
  });

  // Active view - On auth state changes:
  createEffect(() => {
    // Uncomment for debugging:
    const prevView = activeView();
    console.warn('Auth state:', authState().status);
    console.warn('View:', prevView);

    // TODO: Replace this with proper Loading UI
    isLoggingIn() && setActiveView('contacts');
    isLoggingOut() && setActiveView('home');

    // Not in a call:
    if (isLoggedIn()) {
      setActiveView((prev) => (prev === 'home' ? 'contacts' : prev));
    } else {
      setActiveView((prev) => (prev === 'contacts' ? 'home' : prev));
    }

    // Uncomment for debugging:
    const wasViewChanged = prevView !== activeView();
    wasViewChanged && console.warn('View: UPDATED', activeView());
    !wasViewChanged && console.warn('View: NO-OP');
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
    <div class={mainStyles.layoutWrapper}>
      <TopBar
        activeView={activeView()}
        setActiveView={setActiveView}
        isInCall={p2p.state() !== 'idle'}
      />
      <div id='onetap-container' />

      <main id='main-content' class={mainStyles.mainContent}>
        <div id='lobby' class={mainStyles.lobby}>
          <CallDialogs />

          {/* Currently using CSS display for exclusive rendering to keep stateful components mounted
        TODO: Consider refactoring to use SolidJS Match + Switch */}

          <div
            hidden={activeView() !== 'home' || isLoggedIn()}
            class={mainStyles.activeViewContainer}
          >
            <PublicHomepage />
          </div>

          <Show when={p2p.state() !== 'idle'}>
            <div
              hidden={activeView() !== 'call'}
              class={mainStyles.activeViewContainer}
            >
              <ActiveCallRoom />
            </div>
          </Show>

          <div
            hidden={activeView() !== 'contacts' || !isLoggedIn()}
            class={mainStyles.activeViewContainer}
          >
            <ContactsList onOpenConversation={openConversation} />
          </div>

          <Show when={messagingNext}>
            {/* TODO: remove "Show" when messaging-next is fully rolled out and legacy messaging UI is removed */}
            <div
              hidden={activeView() !== 'messaging'}
              class={mainStyles.activeViewContainer}
            >
              <ConversationPanel
                selection={selectedConversation()}
                myUserId={(authState().user?.uid as UserId | undefined) ?? null}
              />
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
    <header id='top-bar' class={topbarStyles.topBar}>
      <div id='top-bar-left' class={`${topbarStyles.topBarLeft} animated-flex`}>
        <AppTitle />
        <AuthControls />
      </div>

      {/* Temp Navigation/Test buttons to demonstrate switching */}
      <nav class={topbarStyles.topNav}>
        {/* <button onClick={() => props.setActiveView?.('home')}>Home</button> */}
        <Show when={props.isInCall}>
          <button
            title='View Active Call'
            onClick={() => props.setActiveView('call')}
          >
            <PhoneCall />
          </button>
        </Show>

        <Show when={isLoggedIn()} fallback={null}>
          <button
            title='Contacts'
            onClick={() => props.setActiveView('contacts')}
          >
            <User />
          </button>
          <button
            title='Messages'
            onClick={() => props.setActiveView('messaging')}
          >
            <Mail />
          </button>
        </Show>
      </nav>

      <div class={topbarStyles.topBarRight}>
        {props.activeView === 'contacts' && <AddContactButton />}
        <NotificationsToggle />
        {/* <YouTubeSearchControls /> */}
      </div>
    </header>
  );
}
