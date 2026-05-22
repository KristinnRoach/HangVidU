import { onCleanup, onMount } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { subscribe } from '../../shared/events/index.js';
import { getAllContactsSorted } from './index.js';

type ContactRow = {
  id: string;
  name: string | null;
  conversationId: string | null;
  unreadCount: number;
};

export function useContacts() {
  const [contacts, setContacts] = createStore<ContactRow[]>([]);
  const unreadTeardowns = new Map<string, () => void>();
  const lastUnreadByConv = new Map<string, number>();

  function addUnreadListener(conversationId: string) {
    if (unreadTeardowns.has(conversationId)) return;

    const off = subscribe(
      'evt:messaging:conversation:unread-count-changed',
      ({
        conversationId: updatedId,
        unreadCount,
      }: {
        conversationId: string;
        unreadCount: number;
      }) => {
        if (updatedId !== conversationId) return;
        lastUnreadByConv.set(conversationId, unreadCount);
        setContacts(
          produce((arr: ContactRow[]) => {
            for (const row of arr) {
              if (row.conversationId === conversationId)
                row.unreadCount = unreadCount;
            }
          }),
        );
      },
    );

    if (lastUnreadByConv.has(conversationId)) {
      const cached = lastUnreadByConv.get(conversationId)!;
      setContacts(
        produce((arr: ContactRow[]) => {
          for (const row of arr) {
            if (row.conversationId === conversationId) row.unreadCount = cached;
          }
        }),
      );
    }

    unreadTeardowns.set(conversationId, off as () => void);
  }

  function removeUnreadListener(conversationId: string) {
    const teardown = unreadTeardowns.get(conversationId);
    if (!teardown) return;
    teardown();
    unreadTeardowns.delete(conversationId);
    lastUnreadByConv.delete(conversationId);
  }

  function reconcile() {
    const rows: ContactRow[] = getAllContactsSorted().map((c) => ({
      id: c.contactId ?? '',
      name: c.contactNickName ?? null,
      conversationId: c.conversationId ?? null,
      unreadCount: lastUnreadByConv.get(c.conversationId ?? '') ?? 0,
    }));

    const freshConvIds = new Set(
      rows
        .map((r) => r.conversationId)
        .filter((id): id is string => Boolean(id)),
    );

    setContacts(
      produce((arr: ContactRow[]) => {
        arr.length = 0;
        for (const row of rows) arr.push(row);
      }),
    );

    for (const row of rows) {
      if (row.conversationId && !unreadTeardowns.has(row.conversationId)) {
        addUnreadListener(row.conversationId);
      }
    }

    for (const conversationId of [...unreadTeardowns.keys()]) {
      if (!freshConvIds.has(conversationId)) {
        removeUnreadListener(conversationId);
      }
    }
  }

  onMount(() => {
    reconcile();
    const offContactsState = subscribe('evt:contacts:state:changed', reconcile);

    onCleanup(() => {
      offContactsState();
      for (const teardown of unreadTeardowns.values()) {
        try {
          teardown();
        } catch {}
      }
      unreadTeardowns.clear();
      lastUnreadByConv.clear();
    });
  });

  return { contacts };
}
