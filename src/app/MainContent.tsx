import { createSignal, createMemo, createEffect, on, Show } from 'solid-js';
import { createAutoHide } from '@shared/createAutoHide';

import { User, PhoneCall, Mail, ChevronLeft } from 'lucide-solid';
import { useP2PContext } from '@shared/p2p-context.js';
import { AuthControls, useAuth } from '@auth';
import { useI18n } from '@shared/i18n';

import AppLogo from '@components/AppLogo';
import { getLoggedInUserProfile } from '@stores/user-profile-store.js';
import { AddContactButton } from '@features/contacts';
import { NotificationsToggle } from '@features/notifications';
import InstallButton from '@components/InstallButton';
import LegalFooter from '@components/LegalFooter';
import LocaleToggle from '@components/LocaleToggle';

import PublicHomepage from './PublicHomepage';
// Injected as a child: PublicHomepage (components layer) can't import
// features/realtime, which the lobby needs.
import {
  CallLobby,
  ActiveCallRoom,
  CallDialogs,
  StartCallButton,
} from '@features/call';
import ConversationsList from './ConversationsList';
import { ConversationPanel } from '@features/conversations';

import { LoadBoundary } from '@components/LoadBoundary';
import { Spinner } from '@components/Spinner';
import IdentityBadge from '@components/IdentityBadge';
import {
  conversationLabel,
  conversationListSeeded,
  conversationListState,
  conversationPeers,
  type Conversation,
} from '@stores/conversation/conversation-list-state';

import mainStyles from './MainContent.module.css';
import topbarStyles from './TopBar.module.css';

import {
  loadSelectedConversationId,
  openConversation,
  selectedConversation,
  selection,
} from '@stores/conversation/conversation-store';

type ViewMode = 'home' | 'call' | 'contacts' | 'conversations';

export default function MainContent() {
  const p2p = useP2PContext();
  const { isAuthInitialized, isLoggedIn, isLoggingIn, isLoggingOut } =
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
  // told not to (displayUI: false, used by the autoselect effect below).
  createEffect(
    on(
      selection,
      (sel) => {
        if (sel?.displayUI) setUserView('conversations');
      },
      { defer: true },
    ),
  );

  function getDefaultConversation(): Conversation | null {
    return (
      [...conversationListState().values()]
        .filter((conversation) => Boolean(conversation.kind))
        .sort((a, b) => b.latestSentAt - a.latestSentAt)
        .at(0) ?? null
    );
  }

  // Sanitize against auth + p2p. TODO: replace transition cases with
  // proper Loading UI.
  const activeView = createMemo<ViewMode>(() => {
    if (isLoggingOut()) return 'home';
    // Guests can be in a call (room-link calls from the WIP homepage).
    if (!isLoggedIn() && !isLoggingIn()) {
      return p2p.state() !== 'idle' ? 'call' : 'home';
    }
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

  createEffect(() => {
    if (!showAuthenticatedUi()) return;
    if (selection()) return;
    if (!conversationListSeeded()) return;

    const storedConversationId = loadSelectedConversationId();
    const stored = storedConversationId
      ? conversationListState().get(storedConversationId)
      : null;
    const conversation = stored ?? getDefaultConversation();
    if (!conversation?.kind) return;

    openConversation(conversation.conversationId, { displayUI: false });
  });

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

        <main id='main-content' class={mainStyles.mainContent}>
          <CallDialogs />

          {/* CSS display toggles keep stateful views mounted across nav. */}

          <div
            hidden={activeView() !== 'home'}
            class={mainStyles.activeViewContainer}
          >
            <PublicHomepage>
              <CallLobby />
            </PublicHomepage>
          </div>

          {/* Call room renders for guests too (room-link calls). */}
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

          <Show when={showAuthenticatedUi()}>
            <div
              hidden={activeView() !== 'contacts'}
              class={mainStyles.activeViewContainer + ' ' + mainStyles.contacts}
            >
              <ConversationsList />
            </div>

            <div
              hidden={activeView() !== 'conversations'}
              class={mainStyles.activeViewContainer + ' ' + mainStyles.chat}
            >
              <ConversationPanel visible={activeView() === 'conversations'} />
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
  selectedConversation?: Conversation;
  isInCall: boolean;
  showAuthenticatedUi: boolean;
  visible: boolean;
}

function TopBar(props: TopBarProps) {
  const { user } = useAuth();
  const { t } = useI18n();
  const p2p = useP2PContext();

  // The call room handle IS the conversationId (see resolveCallRoomId), so
  // the active call's conversation is a lookup, not extra state. Null for
  // guest room-link calls whose room isn't in the user's conversation list.
  const callConversation = createMemo(() => {
    const roomId = p2p.room()?.roomId;
    return roomId ? (conversationListState().get(roomId) ?? null) : null;
  });

  const calleeId = createMemo(() => {
    const conversation = props.selectedConversation;
    if (conversation?.kind !== 'direct') return null;
    return conversationPeers(conversation)[0] ?? null;
  });

  const selectedLabel = () =>
    props.selectedConversation
      ? conversationLabel(props.selectedConversation)
      : null;

  // Whose identity the top bar shows: the active call's conversation in the
  // call view, the selected conversation's in the conversations view, the
  // local user otherwise.
  const identity = createMemo(() => {
    const conversation =
      props.activeView === 'call'
        ? callConversation()
        : props.activeView === 'conversations'
          ? (props.selectedConversation ?? null)
          : null;
    if (conversation) {
      return { name: conversationLabel(conversation), photoUrl: null };
    }
    const profile = getLoggedInUserProfile();
    return {
      name:
        profile?.displayName ||
        profile?.username ||
        profile?.email ||
        t('auth.guest_user'),
      photoUrl: profile?.photoURL,
    };
  });

  const isViewSelected = (view: ViewMode) => props.activeView === view;
  const getNavItemClass = (view: ViewMode) => {
    if (!isViewSelected(view)) return topbarStyles.navItem;
    return `${topbarStyles.navItem} ${topbarStyles.selected}`;
  };

  return (
    <header
      id='top-bar'
      data-visible={props.visible}
      class={topbarStyles.topBar}
      classList={{
        [topbarStyles.hidden]: !props.visible,
        [topbarStyles.overlay]: props.isInCall,
      }}
    >
      <div id='top-bar-left' class={`${topbarStyles.stickyLeft} animated-flex`}>
        <AppLogo />
        {/* keyed: remount on name change so the badge's entry
            animation replays when the shown identity swaps */}
        <Show when={props.showAuthenticatedUi && identity().name} keyed>
          {(name) => (
            <IdentityBadge name={name} photoUrl={identity().photoUrl} />
          )}
        </Show>
        {/* Collapsed instead of unmounted (Show) so the parent's
            animated-flex transition applies; hidden outside contacts/home
            to avoid accidental logout. */}
        <div
          class='max-w-60 overflow-hidden'
          classList={{
            'invisible max-w-0 opacity-0': !(
              isViewSelected('contacts') || isViewSelected('home')
            ),
          }}
        >
          <AuthControls />
        </div>
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
              {props.activeView === 'conversations' ? (
                <ChevronLeft />
              ) : (
                <User />
              )}
            </button>
            <div
              class={topbarStyles.toolbar}
              hidden={props.activeView !== 'contacts'}
            >
              <AddContactButton />
            </div>
          </div>

          <div class={getNavItemClass('conversations')}>
            <button
              type='button'
              class={
                props.activeView === 'conversations'
                  ? topbarStyles.navBtnSelected
                  : topbarStyles.navBtn
              }
              title={t('nav.messages')}
              aria-label={t('nav.messages')}
              onClick={() => props.setActiveView('conversations')}
            >
              <Mail />
            </button>

            <div
              class={topbarStyles.toolbar}
              hidden={props.activeView !== 'conversations'}
            >
              <Show when={!props.isInCall && calleeId()}>
                {(resolvedCalleeId) => (
                  <>
                    <StartCallButton
                      audioOnly={false}
                      calleeId={resolvedCalleeId()}
                      calleeName={selectedLabel() || undefined}
                    />
                    {/*
                    // TODO: fix audio only call UX before uncommenting
                    <StartCallButton
                      audioOnly={true}
                      calleeId={resolvedCalleeId()}
                      calleeName={selectedLabel() || undefined}
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
