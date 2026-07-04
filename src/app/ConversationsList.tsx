import { For, Show, createMemo } from 'solid-js';
import { Spinner } from '../components/app/Spinner';
import { useI18n } from '../shared/i18n';
import { getLoggedInUserId } from '../auth/index.js';
import {
  getContactLabel,
  getContactsStore,
  type Contact,
} from '../stores/contactsStore.js';
import {
  conversationListState,
  getLastReadAt,
} from '../stores/conversation-list-state';
import { openDirectConversation } from '../stores/conversationStore';
import PresenceIndicator from '../features/presence/components/PresenceIndicator';
import { StartCallButton } from '../features/call/components/CallControls';

type ConversationRow = {
  id: string;
  label: string | null;
  hasUnread: boolean;
};

const MAX_NAME_CHARS = 18;

function shortName(name: string): string {
  return name.length > MAX_NAME_CHARS
    ? name.slice(0, MAX_NAME_CHARS - 2) + '..'
    : name;
}

/**
 * Contacts × conversation activity × read markers → MRU-sorted rows with
 * unread flags. DM-only for now: one row per contact.
 */
function createConversationRows() {
  const contactsState = getContactsStore();

  return createMemo<ConversationRow[]>(() => {
    const me = getLoggedInUserId();
    const listState = conversationListState(); // reactive: row id -> list state

    return Object.values(contactsState.byId)
      .map((contact: Contact) => {
        const id = contact.contactId ?? '';
        const act = listState.get(id);
        const lastReadAt = act ? getLastReadAt(act.conversationId) : 0;
        const hasUnread =
          !!act &&
          Boolean(me) &&
          act.latestSenderId !== null &&
          act.latestSenderId !== me &&
          act.latestSentAt > lastReadAt;
        const label = getContactLabel(contact);

        return {
          row: { id, label, hasUnread },
          sortKey: act?.latestSentAt || contact.savedAt || 0,
          sortLabel: (label ?? '').toLowerCase(),
        };
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
  const contactsState = getContactsStore();
  const rows = createConversationRows();
  const isLoading = () =>
    contactsState.status === 'idle' || contactsState.status === 'loading';

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

/** One DM row: call button, name (opens the conversation), unread + presence. */
function ConversationRow(props: { row: ConversationRow }) {
  const { t } = useI18n();
  const label = () => props.row.label ?? t('shared.unknown');

  const onOpenConversation = () => {
    if (!props.row.id) return;
    // The opaque DM conversation id is resolved from the contact id inside the
    // store (resolve-or-create) — see openDirectConversation.
    void openDirectConversation(props.row.id, {
      displayUI: true,
      nickname: label(),
    });
  };

  return (
    <div class="conversation-entry">
      <StartCallButton
        calleeId={props.row.id}
        calleeName={label()}
        audioOnly={false}
      />
      <button
        type="button"
        class="contact-name"
        data-contact-id={props.row.id}
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
      <PresenceIndicator userId={props.row.id} />
    </div>
  );
}
