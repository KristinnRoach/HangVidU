import { createEffect, onCleanup, onMount } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { getLoggedInUserId } from '../../auth/index.js';
import { getContactsStore } from '../../stores/contactsStore.js';
import type { ConversationActivity } from '../messaging-next/interfaces.js';
import { createMessagingRuntime } from '../messaging-next/messaging-runtime.js';

type ContactRow = {
  id: string;
  name: string | null;
  conversationId: string | null;
  hasUnread: boolean;
};

const EMPTY_ACTIVITY: ConversationActivity = {
  latestSentAt: 0,
  latestSenderId: null,
  lastReadAt: 0,
};

export function useContacts() {
  const contactsState = getContactsStore();
  const [contacts, setContacts] = createStore<ContactRow[]>([]);
  const [activity, setActivity] = createStore<
    Record<string, ConversationActivity>
  >({});
  const runtime = createMessagingRuntime();

  const activityWatchers = new Map<string, () => void>();
  let activityWatchUserId: string | null = null;
  let activityWatchGeneration = 0;

  function clearActivity() {
    setActivity(
      produce((current) => {
        for (const conversationId of Object.keys(current)) {
          delete current[conversationId];
        }
      }),
    );
  }

  function stopActivityWatchers() {
    for (const unsubscribe of activityWatchers.values()) unsubscribe();
    activityWatchers.clear();
  }

  onMount(() => {
    createEffect(() => {
      const userId = getLoggedInUserId();

      const rows: ContactRow[] = Object.values(contactsState.byId)
        .map((c: any) => {
          const conversationId: string | null = c.conversationId ?? null;
          const act = conversationId
            ? (activity[conversationId] ?? EMPTY_ACTIVITY)
            : EMPTY_ACTIVITY;
          const sortKey = act.latestSentAt || c?.savedAt || 0;
          const hasUnread =
            Boolean(userId) &&
            act.latestSenderId !== null &&
            act.latestSenderId !== userId &&
            act.latestSentAt > act.lastReadAt;
          return {
            id: c.contactId ?? '',
            name: c.contactNickName ?? null,
            conversationId,
            hasUnread,
            _sortKey: sortKey,
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

    createEffect(() => {
      const userId = getLoggedInUserId();
      const generation = ++activityWatchGeneration;
      const conversationIds = new Set(
        Object.values(contactsState.byId)
          .map((c: any) => c?.conversationId as string | null | undefined)
          .filter((id): id is string => Boolean(id)),
      );

      if (!userId) {
        stopActivityWatchers();
        clearActivity();
        activityWatchUserId = null;
        return;
      }

      if (activityWatchUserId !== userId) {
        stopActivityWatchers();
        clearActivity();
        activityWatchUserId = userId;
      }

      for (const [conversationId, unsubscribe] of activityWatchers) {
        if (!conversationIds.has(conversationId)) {
          unsubscribe();
          activityWatchers.delete(conversationId);
          setActivity(produce((a) => void delete a[conversationId]));
        }
      }

      for (const conversationId of conversationIds) {
        if (activityWatchers.has(conversationId)) continue;

        const result = runtime.messageRepository.watchConversationActivity(
          conversationId,
          userId,
          (next) => {
            if (
              generation !== activityWatchGeneration ||
              activityWatchUserId !== userId ||
              !conversationIds.has(conversationId)
            )
              return;
            setActivity(conversationId, next);
          },
          (error) => {
            console.warn('[contacts] activity watch failed', {
              conversationId,
              error,
            });
          },
        );

        if (typeof result === 'function') {
          activityWatchers.set(conversationId, result);
        } else {
          void result
            .then((unsubscribe) => {
              if (
                generation === activityWatchGeneration &&
                activityWatchUserId === userId &&
                conversationIds.has(conversationId)
              ) {
                activityWatchers.set(conversationId, unsubscribe);
              } else {
                unsubscribe();
              }
            })
            .catch((error) => {
              if (
                generation !== activityWatchGeneration ||
                activityWatchUserId !== userId
              )
                return;
              console.warn('[contacts] activity watch failed', {
                conversationId,
                error,
              });
            });
        }
      }
    });
  });

  onCleanup(() => {
    activityWatchGeneration += 1;
    stopActivityWatchers();
    clearActivity();
  });

  return { contacts };
}
