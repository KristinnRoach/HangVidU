import { For, Show, createMemo } from 'solid-js';
import { Spinner } from '../components/app/Spinner';
import { useI18n } from '../shared/i18n';
import { getLoggedInUserId } from '../auth/index.js';
import { getContactLabel, getContactsStore } from '../stores/contactsStore.js';
import {
  conversationListSeeded,
  conversationListState,
  getLastReadAt,
} from '../stores/conversation-list-state';
import { openConversation } from '../stores/conversationStore';
import PresenceIndicator from '../features/presence/components/PresenceIndicator';
import { StartCallButton } from '../features/call/components/CallControls';

type ConversationRow = {
  conversationId: string;
  kind: 'direct' | 'group';
  label: string | null;
  peerUserId?: string;
  remoteParticipantIds: string[];
  hasUnread: boolean;
};

const MAX_NAME_CHARS = 18;

function shortName(name: string): string {
  return name.length > MAX_NAME_CHARS
    ? name.slice(0, MAX_NAME_CHARS - 2) + '..'
    : name;
}

function memberNameJoin(
  members: { user_id: string; display_name: string | null }[],
  me: string | null,
): string {
  return members
    .filter((member) => member.user_id !== me)
    .map((member) => member.display_name)
    .filter((name): name is string => Boolean(name))
    .map(shortName)
    .join(', ');
}

function createConversationRows() {
  const contactsState = getContactsStore();

  return createMemo<ConversationRow[]>(() => {
    const me = getLoggedInUserId();
    const listState = conversationListState();

    return [...listState.values()]
      .flatMap((summary) => {
        if (!summary.kind) return [];
        const remoteParticipantIds = summary.members
          .map((member) => member.user_id)
          .filter((id) => id !== me);
        const peer = summary.members.find((member) => member.user_id !== me);
        const peerUserId =
          summary.kind === 'direct' ? peer?.user_id : undefined;
        const contact = peerUserId ? contactsState.byId[peerUserId] : null;
        const label =
          summary.kind === 'direct'
            ? (contact ? getContactLabel(contact) : null) ||
              peer?.display_name ||
              null
            : summary.title || memberNameJoin(summary.members, me) || null;
        const lastReadAt = getLastReadAt(summary.conversationId);
        const hasUnread =
          Boolean(me) &&
          summary.latestSenderId !== null &&
          summary.latestSenderId !== me &&
          summary.latestSentAt > lastReadAt;

        return [
          {
            row: {
              conversationId: summary.conversationId,
              kind: summary.kind,
              label,
              peerUserId,
              remoteParticipantIds,
              hasUnread,
            },
            sortKey: summary.latestSentAt,
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
    <div class="conversations-container">
      <Show when={!isLoading()} fallback={<Spinner size={32} />}>
        <Show
          when={rows().length > 0}
          fallback={
            <div class="conversations-list empty">
              <p>{t('contact.none')}</p>
            </div>
          }
        >
          <div class="conversations-list">
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
    openConversation({
      conversationId: props.row.conversationId,
      kind: props.row.kind,
      remoteParticipantIds: props.row.remoteParticipantIds,
      displayUI: true,
      nickname: label(),
    });
  };

  return (
    <div class="conversation-entry">
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
        type="button"
        class="contact-name"
        data-conversation-id={props.row.conversationId}
        onClick={onOpenConversation}
        aria-label={label()}
      >
        {shortName(label())}
      </button>
      <Show when={props.row.hasUnread}>
        <span
          class="unread-badge"
          aria-live="polite"
          aria-atomic="true"
          role="status"
          aria-label={t('contact.unread')}
        >
          <span aria-hidden="true">•</span>
        </span>
      </Show>
      <Show when={props.row.peerUserId}>
        {(peerUserId) => <PresenceIndicator userId={peerUserId()} />}
      </Show>
    </div>
  );
}
