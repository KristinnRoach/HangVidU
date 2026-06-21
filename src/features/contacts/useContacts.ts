import { createEffect, onMount } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { getLoggedInUserId } from '../../auth/index.js';
import { getContactsStore } from '../../stores/contactsStore.js';
import {
  conversationActivity,
  getLastReadAt,
  startConversationActivity,
} from '../../stores/conversation-activity';

type ContactRow = {
  id: string;
  name: string | null;
  hasUnread: boolean;
};

export function useContacts() {
  const contactsState = getContactsStore();
  const [contacts, setContacts] = createStore<ContactRow[]>([]);

  startConversationActivity();

  onMount(() => {
    createEffect(() => {
      const me = getLoggedInUserId();
      const activity = conversationActivity(); // reactive: participant uid -> activity

      const rows: ContactRow[] = Object.values(contactsState.byId)
        .map((c: any) => {
          const contactId: string = c.contactId ?? '';
          const act = activity.get(contactId);
          const lastReadAt = act ? getLastReadAt(act.conversationId) : 0;
          const hasUnread =
            !!act &&
            Boolean(me) &&
            act.latestSenderId !== null &&
            act.latestSenderId !== me &&
            act.latestSentAt > lastReadAt;
          return {
            id: contactId,
            name: c.contactNickName ?? null,
            hasUnread,
            _sortKey: act?.latestSentAt || c?.savedAt || 0,
            _name: (c?.contactNickName || '').toLowerCase(),
          };
        })
        .sort((a, b) => {
          if (a._sortKey !== b._sortKey) return b._sortKey - a._sortKey;
          return a._name.localeCompare(b._name);
        })
        .map(({ _sortKey, _name, ...row }) => row);

      setContacts(
        produce((arr: ContactRow[]) => {
          arr.length = 0;
          for (const row of rows) arr.push(row);
        }),
      );
    });
  });

  return {
    contacts,
    isLoading: () =>
      contactsState.status === 'idle' || contactsState.status === 'loading',
  };
}
