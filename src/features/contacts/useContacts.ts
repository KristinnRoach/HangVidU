import { createEffect, onCleanup, onMount } from 'solid-js';
import { createStore, produce, reconcile } from 'solid-js/store';
import { getLoggedInUserId } from '../../auth/index.js';
import { getContactsStore } from '../../stores/contactsStore.js';
import { loadConversationsList } from '../../stores/conversations-list.js';
import type { ConversationActivity } from '../messaging-next/interfaces.js';
import {
  createMessagingRuntime,
  getMessageBackend,
} from '../messaging-next/messaging-runtime.js';

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
  const backend = getMessageBackend();
  const [contacts, setContacts] = createStore<ContactRow[]>([]);
  // Activity keyed by conversationId (opaque under d1, legacy derived under rtdb).
  const [activity, setActivity] = createStore<
    Record<string, ConversationActivity>
  >({});
  // d1 only: contactId (other member's userId) → opaque conversationId.
  const [convIdByContact, setConvIdByContact] = createStore<
    Record<string, string>
  >({});
  const runtime = createMessagingRuntime();

  // ─── Shared: build the rendered rows from contacts + activity ──────────────
  onMount(() => {
    createEffect(() => {
      const userId = getLoggedInUserId();

      const rows: ContactRow[] = Object.values(contactsState.byId)
        .map((c: any) => {
          const contactId: string = c.contactId ?? '';
          const conversationId: string | null =
            backend === 'd1'
              ? (convIdByContact[contactId] ?? null)
              : (c.conversationId ?? null);
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
            id: contactId,
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

    if (backend === 'd1') {
      setupD1ActivityLoad();
    } else {
      setupRtdbActivityWatchers();
    }
  });

  // ─── d1: one-shot list() per (user, contacts-change). No live push until the
  //     conversation DO (Slice E); the list refreshes on reload / contact change.
  let loadGeneration = 0;
  function setupD1ActivityLoad() {
    createEffect(() => {
      const userId = getLoggedInUserId();
      // Track contacts so the list refetches when a contact is added/removed.
      void Object.keys(contactsState.byId).length;

      if (!userId) {
        setActivity(reconcile({}));
        setConvIdByContact(reconcile({}));
        return;
      }

      const generation = ++loadGeneration;
      void loadConversationsList()
        .then((entries) => {
          if (generation !== loadGeneration) return;
          const nextActivity: Record<string, ConversationActivity> = {};
          const nextConvId: Record<string, string> = {};
          for (const entry of entries) {
            if (entry.kind !== 'direct') continue;
            const other = entry.members.find((m) => m.user_id !== userId);
            if (!other) continue;
            nextActivity[entry.id] = entry.activity;
            nextConvId[other.user_id] = entry.id;
          }
          setActivity(reconcile(nextActivity));
          setConvIdByContact(reconcile(nextConvId));
        })
        .catch((error) => {
          if (generation !== loadGeneration) return;
          console.warn('[contacts] conversation list load failed', error);
        });
    });
  }

  // ─── rtdb: per-conversation activity watchers (legacy path, unchanged) ──────
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

  function setupRtdbActivityWatchers() {
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
  }

  onCleanup(() => {
    activityWatchGeneration += 1;
    loadGeneration += 1;
    stopActivityWatchers();
    clearActivity();
  });

  return { contacts };
}
