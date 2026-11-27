import { createSignal, createMemo, createEffect, on, Show } from 'solid-js';
import { createAutoHide } from '@shared/createAutoHide';

import { useP2PContext } from '@shared/p2p-context.js';
import { useAuth } from '@auth';

import LegalFooter from '../components/LegalFooter';
import LocaleToggle from '../components/LocaleToggle';

import PublicHomepage from './PublicHomepage';
import TopBar, { type ViewMode } from './TopBar';
import { ActiveCallRoom, CallDialogs, useCallHandshake } from '@features/call';
import ConversationsList from './ConversationsList';
import { ConversationPanel } from '@features/conversations';

import { LoadBoundary } from '../components/LoadBoundary';
import { Spinner } from '../components/Spinner';
import {
  conversationListSeeded,
  conversationListState,
  type Conversation,
} from '../stores/conversation/conversation-list-state';

import mainStyles from './MainContent.module.css';

import {
  loadSelectedConversationId,
  openConversation,
  selectedConversation,
  selection,
} from '../stores/conversation/conversation-store';

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
    // Guests can join room-link calls.
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

  const { media: callMedia } = useCallHandshake();
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
          visible={headerVisible.visible()}
        />

        <main id='main-content' class={mainStyles.mainContent}>
          <CallDialogs />

          {/* CSS display toggles keep stateful views mounted across nav. */}

          <div
            hidden={activeView() !== 'home'}
            class={mainStyles.activeViewContainer}
          >
            <PublicHomepage />
          </div>

          {/* Call room renders for guests too (room-link calls). */}
          <Show when={p2p.state() !== 'idle'}>
            <div
              class={`${mainStyles.activeViewContainer} ${mainStyles.callView}`}
            >
              <Show
                when={callMedia()}
                keyed
                fallback={
                  <div class={mainStyles.callLoading}>
                    <Spinner />
                  </div>
                }
              >
                {(media) => (
                  <ActiveCallRoom
                    media={media}
                    holdTopBar={headerVisible.hold}
                  />
                )}
              </Show>
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
            <LocaleToggle />
            <LegalFooter />
          </div>
        </Show>
      </LoadBoundary>
    </div>
  );
}
