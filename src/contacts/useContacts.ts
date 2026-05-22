import { createEffect, onCleanup, onMount } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { subscribe } from '../shared/events/index.js';
import { getContactsStore } from '../stores/contact-store.js';

type ContactRow = {
  id: string;
  name: string | null;
  conversationId: string | null;
  unreadCount: number;
};

export function useContacts() {
  const contactsState = getContactsStore();
  const [contacts, setContacts] = createStore<ContactRow[]>([]);
  const [unread, setUnread] = createStore<Record<string, number>>({});

  let offUnread: (() => void) | null = null;

  onMount(() => {
    offUnread = subscribe(
      'evt:messaging:conversation:unread-count-changed',
      ({
        conversationId,
        unreadCount,
      }: {
        conversationId: string;
        unreadCount: number;
      }) => setUnread(conversationId, unreadCount),
    ) as () => void;

    createEffect(() => {
      const rows: ContactRow[] = Object.values(contactsState.byId)
        .sort((a: any, b: any) => {
          const aTime = a?.lastInteractionAt || a?.savedAt || 0;
          const bTime = b?.lastInteractionAt || b?.savedAt || 0;
          if (aTime !== bTime) return bTime - aTime;
          const aName = (a?.contactNickName || '').toLowerCase();
          const bName = (b?.contactNickName || '').toLowerCase();
          return aName.localeCompare(bName);
        })
        .map((c: any) => ({
          id: c.contactId ?? '',
          name: c.contactNickName ?? null,
          conversationId: c.conversationId ?? null,
          unreadCount: c.conversationId ? (unread[c.conversationId] ?? 0) : 0,
        }));

      setContacts(
        produce((arr: ContactRow[]) => {
          arr.length = 0;
          for (const row of rows) arr.push(row);
        }),
      );
    });
  });

  onCleanup(() => offUnread?.());

  return { contacts };
}
