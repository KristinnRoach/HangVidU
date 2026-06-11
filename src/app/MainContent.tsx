import { createSignal, createMemo, createEffect, on, Show } from 'solid-js';
import { createAutoHide } from '../shared/createAutoHide';

import { User, PhoneCall, Mail } from 'lucide-solid';
import { useP2PContext } from '../shared/p2p-context.js';
import { useAuth } from '../auth/solid-auth';
import { useI18n } from '../shared/i18n';

import AppTitle from '../components/app/AppTitle';
import AuthControls from '../auth/components/AuthControls';
import AddContactButton from '../features/contacts/components/AddContactButton';
import NotificationsToggle from '../features/notifications/components/NotificationsToggle';
import InstallButton from '../features/pwa/InstallButton';
import LegalFooter from '../components/app/LegalFooter';
import LocaleToggle from '../components/app/LocaleToggle';

import PublicHomepage from '../components/app/PublicHomepage';
import ContactsList from '../features/contacts/components/ContactsList';
import ActiveCallRoom from '../features/call/components/ActiveCallRoom';
import ConversationPanel from '../features/messaging-next/ConversationPanel';
import CallDialogs from '../features/call/components/CallDialogs';
import { StartCallButton } from '../features/call/components/CallControls';

import { LoadBoundary } from '../components/app/LoadBoundary';
import { Spinner } from '../components/app/Spinner';

import mainStyles from './MainContent.module.css';
import topbarStyles from './TopBar.module.css';

import type { ConversationSelection } from '../features/messaging-next/interfaces.js';
import type { UserId } from '../features/messaging-next/types.js';
import { resolveContactIdFromDirectConversationId } from '../shared/utils/direct-conversation-id';
import { selection as selectedConversation } from '../stores/selectedConversationStore';

type ViewMode = 'home' | 'call' | 'contacts' | 'messaging';

export default function MainContent() {
  const p2p = useP2PContext();
  const { isAuthInitialized, user, isLoggedIn, isLoggingIn, isLoggingOut } =
    useAuth();

  const [userView, setUserView] = createSignal<ViewMode>('contacts');

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

  // Selection-driven view switch: external openers (push-nav, future
  // deep links) set the selection; we flip the view unless explicitly
  // told not to (displayUI: false, used by ContactsList autoselect).
  createEffect(
    on(
      selectedConversation,
      (sel) => {
        if (sel && sel.displayUI !== false) setUserView('messaging');
      },
      { defer: true },
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

  const headerVisible = createAutoHide(3000, () => p2p.state() !== 'idle');

  const isConnecting = () => {
    const s = p2p.state();
    return s === 'creating' || s === 'watching' || s === 'joining';
  };
  const showAuthenticatedUi = createMemo(() => isLoggedIn() && !isLoggingOut());

  return (
    <div class={mainStyles.layoutWrapper}>
      <LoadBoundary
        loading={!isAuthInitialized()}
        fallback={
          <div class={mainStyles.loading}>
            <Spinner />
          </div>
        }
      >
        <TopBar
          activeView={activeView()}
          setActiveView={navigate}
          selectedConversation={selectedConversation() ?? undefined}
          isInCall={p2p.state() !== 'idle'}
          showAuthenticatedUi={showAuthenticatedUi()}
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
          <Show when={showAuthenticatedUi()}>
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
              class={mainStyles.activeViewContainer + ' ' + mainStyles.contacts}
            >
              <ContactsList />
            </div>

            <div
              hidden={activeView() !== 'messaging'}
              class={mainStyles.activeViewContainer + ' ' + mainStyles.chat}
            >
              <ConversationPanel
                selection={selectedConversation()}
                myUserId={(user()?.uid as UserId | undefined) ?? null}
              />
            </div>
          </Show>
        </main>

        <Show when={activeView() === 'home' || activeView() === 'contacts'}>
          <div class={mainStyles.footer}>
            <LegalFooter />
            <LocaleToggle />
          </div>
        </Show>
      </LoadBoundary>
    </div>
  );
}

interface TopBarProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  selectedConversation?: ConversationSelection;
  isInCall: boolean;
  showAuthenticatedUi: boolean;
  visible: boolean;
}

function TopBar(props: TopBarProps) {
  const { user } = useAuth();
  const { t } = useI18n();

  const calleeId = createMemo(() => {
    // Selection carries participant ids; conversation ids are opaque.
    // Legacy `a_b` parsing remains only as a fallback for selections that
    // arrive without participants (old push deep links).
    const remoteId = props.selectedConversation?.remoteParticipantIds?.[0];
    if (remoteId) return remoteId;
    const conversationId = props.selectedConversation?.conversationId;
    const uid = user()?.uid;
    if (!conversationId || !uid) return null;
    return resolveContactIdFromDirectConversationId(conversationId, uid);
  });

  const isViewSelected = (view: ViewMode) => props.activeView === view;
  const getNavItemClass = (view: ViewMode) => {
    if (!isViewSelected(view)) return topbarStyles.navItem;
    return `${topbarStyles.navItem} ${topbarStyles.selected}`;
  };

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

        <Show when={props.showAuthenticatedUi && user()?.uid}>
          <div class={getNavItemClass('contacts')}>
            <button
              type='button'
              class={
                props.activeView === 'contacts'
                  ? topbarStyles.navBtnSelected
                  : topbarStyles.navBtn
              }
              title={t('nav.contacts')}
              aria-label={t('nav.contacts')}
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

          <div class={getNavItemClass('messaging')}>
            <button
              type='button'
              class={
                props.activeView === 'messaging'
                  ? topbarStyles.navBtnSelected
                  : topbarStyles.navBtn
              }
              title={t('nav.messages')}
              aria-label={t('nav.messages')}
              onClick={() => props.setActiveView('messaging')}
            >
              <Mail />
            </button>

            <div
              class={topbarStyles.toolbar}
              hidden={props.activeView !== 'messaging'}
            >
              <Show when={!props.isInCall && calleeId()}>
                {(resolvedCalleeId) => (
                  <>
                    <StartCallButton
                      audioOnly={false}
                      calleeId={resolvedCalleeId()}
                      calleeName={
                        props?.selectedConversation?.contactNickName ||
                        undefined
                      }
                    />
                    {/* 
                    // TODO: fix audio only call UX before uncommenting
                    <StartCallButton
                      audioOnly={true}
                      calleeId={resolvedCalleeId()}
                      calleeName={
                        props?.selectedConversation?.contactNickName ||
                        undefined
                      }
                    /> */}
                  </>
                )}
              </Show>
            </div>
          </div>
        </Show>

        <Show when={props.isInCall}>
          <button
            type='button'
            class={
              props.activeView === 'call'
                ? topbarStyles.navBtnSelected
                : topbarStyles.navBtn
            }
            title={t('nav.active_call')}
            aria-label={t('nav.active_call')}
            onClick={() => props.setActiveView('call')}
          >
            <PhoneCall />
          </button>
        </Show>
      </nav>

      {/* <YouTubeSearchControls /> */}

      <div class={topbarStyles.stickyRight}>
        <InstallButton />
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
