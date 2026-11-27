import { createMemo, Show } from 'solid-js';
import { User, PhoneCall, Mail, ChevronLeft } from 'lucide-solid';

import { AuthControls, useAuth } from '@auth';
import { AddContactButton } from '@features/contacts';
import { NotificationsToggle } from '@features/notifications';
import { StartCallButton } from '@features/call';
import { useI18n } from '@shared/i18n';
import { useP2PContext } from '@shared/p2p-context.js';

import AppLogo from '../components/AppLogo';
import IdentityBadge from '../components/IdentityBadge';
import InstallButton from '../components/InstallButton';
import { getLoggedInUserProfile } from '../stores/user-profile-store.js';
import {
  conversationLabel,
  conversationListState,
  conversationPeers,
  type Conversation,
} from '../stores/conversation/conversation-list-state';

import topbarStyles from './TopBar.module.css';

export type ViewMode = 'home' | 'call' | 'contacts' | 'conversations';

interface TopBarProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  selectedConversation?: Conversation;
  isInCall: boolean;
  showAuthenticatedUi: boolean;
  visible: boolean;
}

export default function TopBar(props: TopBarProps) {
  const { user } = useAuth();
  const { t } = useI18n();
  const p2p = useP2PContext();

  // Contact calls use a conversation ID as the room ID. Room-link calls
  // use a fresh room ID with no conversation to look up.
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
        [topbarStyles.hidden!]: !props.visible,
        [topbarStyles.overlay!]: props.isInCall,
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
          class='max-w-60 shrink-0 overflow-hidden'
          classList={{
            'invisible max-w-0 opacity-0': !(
              isViewSelected('contacts') || isViewSelected('home')
            ),
          }}
        >
          <AuthControls />
        </div>
      </div>

      <nav class={topbarStyles.topNav}>
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

      <div class={topbarStyles.stickyRight}>
        <InstallButton />
        <NotificationsToggle />
      </div>
    </header>
  );
}
