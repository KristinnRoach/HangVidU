import { createSignal, createMemo, createEffect, on, Show } from 'solid-js';
import { createAutoHide } from '../shared/createAutoHide';

import { User, PhoneCall, Mail } from 'lucide-solid';
import { useP2PContext } from '../shared/p2p-context.js';
import { useAuth } from '../auth/solid-auth';

import AppTitle from './app/AppTitle.jsx';
import AuthControls from '../auth/components/AuthControls.jsx';
import AddContactButton from '../features/contacts/components/AddContactButton.jsx';
import NotificationsToggle from './app/NotificationsToggle.jsx';
import LegalFooter from './app/LegalFooter.jsx';
import LocaleToggle from './app/LocaleToggle.jsx';

import PublicHomepage from './app/PublicHomepage.jsx';
import ContactsList from '../features/contacts/components/ContactsList.jsx';
import ActiveCallRoom from '../features/call/components/ActiveCallRoom';
import ConversationPanel from '../features/messaging-next/ConversationPanel';
import CallDialogs from '../features/call/components/CallDialogs.jsx';
import { LoadBoundary } from './app/LoadBoundary';
import { Spinner } from './app/Spinner';

import mainStyles from './MainContent.module.css';
import topbarStyles from './TopBar.module.css';

import type { ConversationSelection } from '../features/messaging-next/interfaces.js';
import type { UserId } from '../features/messaging-next/types.js';

type ViewMode = 'home' | 'call' | 'contacts' | 'messaging';

export default function MainContent() {
  const p2p = useP2PContext();
  const { isAuthReady, user, isLoggedIn, isLoggingIn, isLoggingOut } =
    useAuth();

  const [userView, setUserView] = createSignal<ViewMode>('contacts');
  const [selectedConversation, setSelectedConversation] =
    createSignal<ConversationSelection | null>(null);

  // Switch into the call view on call-start, and out on call-end.
  // Edge-triggered: doesn't override user nav while a call is ongoing.
  createEffect(
    on(
      () => p2p.state(),
      (state, prev) => {
        if (state !== 'idle' && prev !== 'joined') {
          setUserView('call');
        } else if (prev === 'joined' && state !== 'joined') {
          setUserView((v) => (v === 'call' ? 'contacts' : v));
        }
      },
    ),
  );

  // Sanitize against auth + p2p. TODO: replace transition cases with
  // proper Loading UI.
  const activeView = createMemo<ViewMode>(() => {
    if (isLoggingOut()) return 'home';
    if (!isLoggedIn() && !isLoggingIn()) return 'home';
    if (userView() === 'call' && p2p.state() === 'idle') return 'contacts';
    return userView();
  });

  function navigate(view: ViewMode) {
    setUserView(view);
  }

  function openConversation(selection: ConversationSelection) {
    setSelectedConversation(selection);
    if (selection.displayUI !== false) setUserView('messaging');
  }

  const headerVisible = createAutoHide(3000, () => p2p.state() !== 'idle');

  const isConnecting = () => {
    const s = p2p.state();
    return s === 'creating' || s === 'watching' || s === 'joining';
  };

  return (
    <div class={mainStyles.layoutWrapper}>
      <LoadBoundary
        loading={!isAuthReady()}
        fallback={
          <div class={mainStyles.loading}>
            <Spinner />
          </div>
        }
      >
        <TopBar
          activeView={activeView()}
          setActiveView={navigate}
          isInCall={p2p.state() !== 'idle'}
          visible={headerVisible()}
        />

        <div id='onetap-container' />

        <main id='main-content' class={mainStyles.mainContent}>
          <CallDialogs />

          {/* CSS display toggles keep stateful views mounted across nav. */}

          <div
            hidden={activeView() !== 'home'}
            class={mainStyles.activeViewContainer}
          >
            <PublicHomepage />
          </div>
          <Show when={isLoggedIn()}>
            <Show when={p2p.state() !== 'idle'}>
              <div class={mainStyles.activeViewContainer}>
                <LoadBoundary
                  loading={isConnecting()}
                  fallback={
                    <div class={mainStyles.callLoading}>
                      <Spinner />
                    </div>
                  }
                >
                  <ActiveCallRoom />
                </LoadBoundary>
              </div>
            </Show>

            <div
              hidden={activeView() !== 'contacts'}
              class={mainStyles.activeViewContainer}
            >
              <ContactsList onOpenConversation={openConversation} />
            </div>

            <div
              hidden={activeView() !== 'messaging'}
              class={mainStyles.activeViewContainer}
            >
              <ConversationPanel
                selection={selectedConversation()}
                myUserId={(user()?.uid as UserId | undefined) ?? null}
              />
            </div>
          </Show>
        </main>

        <Show when={activeView() === 'home' || activeView() === 'contacts'}>
          <LegalFooter />
          <LocaleToggle />
        </Show>
      </LoadBoundary>
    </div>
  );
}

interface TopBarProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  isInCall: boolean;
  visible: boolean;
}

function TopBar(props: TopBarProps) {
  const { isLoggedIn } = useAuth();

  return (
    <header
      id='top-bar'
      class={topbarStyles.topBar}
      classList={{
        [topbarStyles.hidden]: !props.visible,
        [topbarStyles.overlay]: props.isInCall,
      }}
    >
      <div id='top-bar-left' class={`${topbarStyles.stickyLeft} animated-flex`}>
        <AppTitle />
        <AuthControls />
      </div>

      {/* Temp Navigation/Test buttons to demonstrate switching */}
      <nav class={topbarStyles.topNav}>
        {/* <button onClick={() => props.setActiveView?.('home')}>Home</button> */}

        <Show when={isLoggedIn()} fallback={null}>
          <div class={topbarStyles.navItem}>
            <button
              type='button'
              class={topbarStyles.navBtn}
              title='Contacts'
              onClick={() => props.setActiveView('contacts')}
            >
              <User />
            </button>
            <div
              class={topbarStyles.toolbar}
              hidden={props.activeView !== 'contacts'}
            >
              <AddContactButton />
            </div>
          </div>

          <div class={topbarStyles.navItem}>
            <button
              type='button'
              class={topbarStyles.navBtn}
              title='Messages'
              onClick={() => props.setActiveView('messaging')}
            >
              <Mail />
            </button>
          </div>
        </Show>

        <Show when={props.isInCall}>
          <button
            type='button'
            class={topbarStyles.navItem}
            title='View Active Call'
            onClick={() => props.setActiveView('call')}
          >
            <PhoneCall />
          </button>
        </Show>
      </nav>

      {/* <YouTubeSearchControls /> */}

      <div class={topbarStyles.stickyRight}>
        <NotificationsToggle />
      </div>
    </header>
  );
}

//  if (!selection) {
//       const { contacts } = useContactsList();
//       if (contacts.length > 0) {
//         const firstConv = contacts[0].conversationId;
//         if (firstConv) {
//           openConversation({ conversationId: firstConv });
//         }
//       }
//     }
