import { createSignal, createMemo, createEffect, on, Show } from 'solid-js';
import { createAutoHide } from '../shared/createAutoHide';

import { User, PhoneCall, Mail, ChevronLeft } from 'lucide-solid';
import { useP2PContext } from '../shared/p2p-context.js';
import { useAuth } from '../auth/solid-auth';
import { getLoggedInUserId } from '../auth/index.js';
import { useI18n } from '../shared/i18n';

import AppLogo from '../components/app/AppLogo';
import AuthControls from '../auth/components/AuthControls';
import { getLoggedInUserProfile } from '../stores/userProfileStore.js';
import AddContactButton from '../features/contacts/components/AddContactButton';
import NotificationsToggle from '../features/notifications/components/NotificationsToggle';
import InstallButton from '../features/pwa/InstallButton';
import LegalFooter from '../components/app/LegalFooter';
import LocaleToggle from '../components/app/LocaleToggle';

import PublicHomepage from '../components/app/PublicHomepage';
// Injected as a child: PublicHomepage (components layer) can't import
// features/realtime, which the lobby needs.
import CallLobby from '../features/call/components/CallLobby';
import ConversationsList from './ConversationsList';
import ActiveCallRoom from '../features/call/components/ActiveCallRoom';
import ConversationPanel from '../features/conversations/components/ConversationPanel';
import CallDialogs from '../features/call/components/CallDialogs';
import { StartCallButton } from '../features/call/components/CallControls';

import { LoadBoundary } from '../components/app/LoadBoundary';
import { Spinner } from '../components/app/Spinner';
import IdentityBadge from '../components/app/IdentityBadge';
import {
  conversationListSeeded,
  conversationListState,
  type ConversationSummary,
} from '../stores/conversation-list-state';
import {
  getContactById,
  getContactLabel,
  getContactsStore,
} from '../stores/contactsStore.js';

import mainStyles from './MainContent.module.css';
import topbarStyles from './TopBar.module.css';

import {
  loadSelectedConversationId,
  openConversation,
  selection as selectedConversation,
  type ConversationSelection,
} from '../stores/conversationStore';

type ViewMode = 'home' | 'call' | 'contacts' | 'conversations';

export default function MainContent() {
  const p2p = useP2PContext();
  const { isAuthInitialized, isLoggedIn, isLoggingIn, isLoggingOut } =
    useAuth();
  const contactsState = getContactsStore();

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
      selectedConversation,
      (sel) => {
        if (sel && sel.displayUI !== false) setUserView('conversations');
      },
      { defer: true },
    ),
  );

  function getConversationLabel(summary: ConversationSummary): string | null {
    const me = getLoggedInUserId();
    if (summary.kind === 'direct') {
      const peer = summary.members.find((member) => member.user_id !== me);
      const contact = peer ? contactsState.byId[peer.user_id] : null;
      return (
        (contact ? getContactLabel(contact) : null) ||
        peer?.display_name ||
        null
      );
    }
    return (
      summary.title ||
      summary.members
        .filter((member) => member.user_id !== me)
        .map((member) => member.display_name)
        .filter((name): name is string => Boolean(name))
        .join(', ') ||
      null
    );
  }

  function openSummary(summary: ConversationSummary): void {
    if (!summary.kind) return;
    const me = getLoggedInUserId();
    openConversation({
      conversationId: summary.conversationId,
      kind: summary.kind,
      remoteParticipantIds: summary.members
        .map((member) => member.user_id)
        .filter((id) => id !== me),
      nickname: getConversationLabel(summary),
      displayUI: false,
    });
  }

  function getDefaultConversation(): ConversationSummary | null {
    return (
      [...conversationListState().values()]
        .filter((summary) => Boolean(summary.kind))
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
    if (selectedConversation()) return;
    if (!conversationListSeeded()) return;

    const storedConversationId = loadSelectedConversationId();
    const storedSummary = storedConversationId
      ? conversationListState().get(storedConversationId)
      : null;
    if (storedSummary) {
      openSummary(storedSummary);
      return;
    }

    const summary = getDefaultConversation();
    if (!summary) return;

    openSummary(summary);
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

        <main id="main-content" class={mainStyles.mainContent}>
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
  selectedConversation?: ConversationSelection;
  isInCall: boolean;
  showAuthenticatedUi: boolean;
  visible: boolean;
}

function TopBar(props: TopBarProps) {
  const { user } = useAuth();
  const { t } = useI18n();

  const calleeId = createMemo(() => {
    if (props.selectedConversation?.kind !== 'direct') return null;
    return props.selectedConversation.remoteParticipantIds?.[0] ?? null;
  });

  // Whose identity the top bar shows: the selected conversation's contact
  // while in the conversations view, the local user otherwise.
  const identity = createMemo(() => {
    if (props.activeView === 'conversations' || props.activeView === 'call') {
      const id = calleeId();
      const contact = id ? getContactById(id) : null;
      const name =
        (contact && getContactLabel(contact)) ||
        props.selectedConversation?.nickname;
      if (name) return { name, photoUrl: null };
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
      id="top-bar"
      class={topbarStyles.topBar}
      classList={{
        [topbarStyles.hidden]: !props.visible,
        [topbarStyles.overlay]: props.isInCall,
      }}
    >
      <div id="top-bar-left" class={`${topbarStyles.stickyLeft} animated-flex`}>
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
          class="max-w-60 overflow-hidden"
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
              type="button"
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
              type="button"
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
                      calleeName={
                        props?.selectedConversation?.nickname || undefined
                      }
                    />
                    {/*
                    // TODO: fix audio only call UX before uncommenting
                    <StartCallButton
                      audioOnly={true}
                      calleeId={resolvedCalleeId()}
                      calleeName={
                        props?.selectedConversation?.nickname ||
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
            type="button"
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
