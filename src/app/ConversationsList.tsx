import { For, Show, createMemo } from 'solid-js';
import { Spinner } from '../components/Spinner';
import { useI18n } from '@shared/i18n';
import { getLoggedInUserId } from '../auth/index.js';
import {
  conversationLabel,
  conversationListSeeded,
  conversationListState,
  conversationPeers,
  getLastReadAt,
  shortName,
} from '../stores/conversation/conversation-list-state';
import { openConversation } from '../stores/conversation/conversation-store';
import { PresenceIndicator } from '../features/presence/components/PresenceIndicator';
import { StartCallButton } from '../features/call/index.js';

type ConversationRow = {
  conversationId: string;
  kind: 'direct' | 'group';
  label: string | null;
  peerUserId?: string;
  hasUnread: boolean;
};

function createConversationRows() {
  return createMemo<ConversationRow[]>(() => {
    const me = getLoggedInUserId();
    const listState = conversationListState();

    return [...listState.values()]
      .flatMap((conversation) => {
        if (!conversation.kind) return [];
        const peerUserId =
          conversation.kind === 'direct'
            ? conversationPeers(conversation)[0]
            : undefined;
        const label = conversationLabel(conversation);
        const lastReadAt = getLastReadAt(conversation.conversationId);
        const hasUnread =
          Boolean(me) &&
          conversation.latestSenderId !== null &&
          conversation.latestSenderId !== me &&
          conversation.latestSentAt > lastReadAt;

        return [
          {
            row: {
              conversationId: conversation.conversationId,
              kind: conversation.kind,
              label,
              peerUserId,
              hasUnread,
            },
            sortKey: conversation.latestSentAt,
            sortLabel: (label ?? '').toLowerCase(),
          },
        ];
      })
      .sort(
        (a, b) =>
          b.sortKey - a.sortKey || a.sortLabel.localeCompare(b.sortLabel),
      )
      .map(({ row }) => row);
  });
}

export default function ConversationsList() {
  const { t } = useI18n();
  const rows = createConversationRows();
  const isLoading = () => !conversationListSeeded();

  return (
    <div class='conversations-container'>
      <Show when={!isLoading()} fallback={<Spinner size={32} />}>
        <Show
          when={rows().length > 0}
          fallback={
            <div class='conversations-list empty'>
              <p>{t('contact.none')}</p>
            </div>
          }
        >
          <div class='conversations-list'>
            <For each={rows()}>{(row) => <ConversationRow row={row} />}</For>
          </div>
        </Show>
      </Show>
    </div>
  );
}

/** One conversation row. DM rows get call + presence affordances. */
function ConversationRow(props: { row: ConversationRow }) {
  const { t } = useI18n();
  const label = () => props.row.label ?? t('shared.unknown');

  const onOpenConversation = () => {
    openConversation(props.row.conversationId, { displayUI: true });
  };

  return (
    <div class='conversation-entry'>
      <Show when={props.row.peerUserId}>
        {(peerUserId) => (
          <StartCallButton
            calleeId={peerUserId()}
            calleeName={label()}
            audioOnly={false}
          />
        )}
      </Show>
      <button
        type='button'
        class='contact-name'
        data-conversation-id={props.row.conversationId}
        onClick={onOpenConversation}
        aria-label={label()}
      >
        {shortName(label())}
      </button>
      <Show when={props.row.hasUnread}>
        <span
          class='unread-badge'
          aria-live='polite'
          aria-atomic='true'
          role='status'
          aria-label={t('contact.unread')}
        >
          <span aria-hidden='true'>•</span>
        </span>
      </Show>
      <Show when={props.row.peerUserId}>
        {(peerUserId) => <PresenceIndicator userId={peerUserId()} />}
      </Show>
    </div>
  );
}
