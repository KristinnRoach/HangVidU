import { createSignal, Show, createEffect } from 'solid-js';

import { User, PhoneCall, Mail } from 'lucide-solid';
import { useP2PContext } from '../shared/p2p-context.js';
import { useAuth } from '../auth/solid-auth.js';

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

import mainStyles from './MainContent.module.css';
import topbarStyles from './TopBar.module.css';

import type { ConversationSelection } from '../features/messaging-next/interfaces.js';
import type { UserId } from '../features/messaging-next/types.js';

// Legacy:
import {
  useLegacyI18nElements,
  useLegacyIcons,
  useP2PRuntimeDiagnostics,
} from '../app/useLegacyMountEffects.js';

const VIEWS = {
  home: PublicHomepage,
  call: ActiveCallRoom,
  contacts: ContactsList,
  messaging: ConversationPanel,
} as const;

type ViewMode = keyof typeof VIEWS;

export default function MainContent() {
  const p2p = useP2PContext();
  const { authState, isLoggedIn, isLoggingIn, isLoggingOut } = useAuth();
  const initialView: ViewMode = isLoggedIn() ? 'contacts' : 'home';

  const [activeView, setActiveView] = createSignal<ViewMode>(initialView);
  const [selectedConversation, setSelectedConversation] =
    createSignal<ConversationSelection | null>(null);

  function openConversation(selection: ConversationSelection) {
    setSelectedConversation(selection);
    if (selection.displayUI !== false) {
      setActiveView('messaging');
    }
  }

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
  // TODO: Consider refactoring to use SolidJS Match + Switch
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
  useLegacyIcons();
  // END - legacy setup, will be refactored:

  return (
    <div class={mainStyles.layoutWrapper}>
      <TopBar
        activeView={activeView()}
        setActiveView={setActiveView}
        isInCall={p2p.state() !== 'idle'}
      />

      <div id='onetap-container' />

      <main id='main-content' class={mainStyles.mainContent}>
        <CallDialogs />

        {/* Currently using CSS display for exclusive rendering (keeps stateful components mounted) */}

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

        <div
          hidden={activeView() !== 'messaging'}
          class={mainStyles.activeViewContainer}
        >
          <ConversationPanel
            selection={selectedConversation()}
            myUserId={(authState().user?.uid as UserId | undefined) ?? null}
          />
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
    <Show when={!props.isInCall}>
      <header id='top-bar' class={topbarStyles.topBar}>
        <div
          id='top-bar-left'
          class={`${topbarStyles.stickyLeft} animated-flex`}
        >
          <AppTitle />
          <AuthControls />
        </div>

        {/* Temp Navigation/Test buttons to demonstrate switching */}
        <nav class={topbarStyles.topNav}>
          {/* <button onClick={() => props.setActiveView?.('home')}>Home</button> */}
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
        </nav>

        {/* <YouTubeSearchControls /> */}

        <div class={topbarStyles.stickyRight}>
          <NotificationsToggle />
        </div>
      </header>
    </Show>
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
