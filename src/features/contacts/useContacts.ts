import { createEffect, onCleanup, onMount } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { getLoggedInUserId } from '../../auth/index.js';
import {
  getContactsStore,
  recordInteractionByConversation,
} from '../../stores/contactsStore.js';
import { createMessagingRuntime } from '../messaging-next/messaging-runtime.js';

type ContactRow = {
  id: string;
  name: string | null;
  conversationId: string | null;
  hasUnread: boolean;
};

export function useContacts() {
  const contactsState = getContactsStore();
  const [contacts, setContacts] = createStore<ContactRow[]>([]);
  const [unread, setUnread] = createStore<Record<string, boolean>>({});
  const runtime = createMessagingRuntime();

  const unreadWatchers = new Map<string, () => void>();

  function stopUnreadWatchers() {
    for (const unsubscribe of unreadWatchers.values()) unsubscribe();
    unreadWatchers.clear();
  }

  onMount(() => {
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
          hasUnread: c.conversationId
            ? (unread[c.conversationId] ?? false)
            : false,
        }));

      setContacts(
        produce((arr: ContactRow[]) => {
          arr.length = 0;
          for (const row of rows) arr.push(row);
        }),
      );
    });

    createEffect(() => {
      const userId = getLoggedInUserId();
      const conversationIds = new Set(
        contacts
          .map((row) => row.conversationId)
          .filter((id): id is string => Boolean(id)),
      );

      if (!userId) {
        stopUnreadWatchers();
        return;
      }

      for (const [conversationId, unsubscribe] of unreadWatchers) {
        if (!conversationIds.has(conversationId)) {
          unsubscribe();
          unreadWatchers.delete(conversationId);
        }
      }

      for (const conversationId of conversationIds) {
        if (unreadWatchers.has(conversationId)) continue;

        const result = runtime.messageRepository.watchHasUnread(
          conversationId,
          userId,
          (hasUnread) => {
            setUnread(conversationId, hasUnread);
            if (hasUnread) {
              void recordInteractionByConversation(conversationId);
            }
          },
          (error) => {
            console.warn('[contacts] unread watch failed', {
              conversationId,
              error,
            });
          },
        );

        if (typeof result === 'function') {
          unreadWatchers.set(conversationId, result);
        } else {
          void result.then((unsubscribe) => {
            if (conversationIds.has(conversationId)) {
              unreadWatchers.set(conversationId, unsubscribe);
            } else {
              unsubscribe();
            }
          });
        }
      }
    });
  });

  onCleanup(() => {
    stopUnreadWatchers();
  });

  return { contacts };
}
