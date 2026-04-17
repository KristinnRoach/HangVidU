// setup/setupContactsList.js
//
// Bridges imperative domain state into the reactive contacts-list store.
// - contacts state -> contacts store rows (rebuild on every evt:contacts:state:changed)
// - per-row unread -> cmd:messaging:conversation:unread-count-listen + evt listen
//
// Presence is watched self-sufficiently inside <PresenceIndicator/> per row.
// All bridges teardown via the returned cleanup function.

import { produce } from 'solid-js/store';
import { subscribe, dispatchCommand } from '../shared/events/index.js';
import { getAllContactsSorted } from '../features/contacts/index.js';
import { setupContactsAppBusHandlers } from '../features/contacts/contacts-command-handlers.js';
import { setContacts } from '../app/components/ContactsList.jsx';

/**
 * @typedef {Object} ContactRow
 * @property {string} id
 * @property {string|null} name
 * @property {string|null} roomId
 * @property {string|null} conversationId
 * @property {number} unreadCount
 */

/** @returns {ContactRow[]} */
function readContactsFromState() {
  return getAllContactsSorted().map((c) => ({
    id: c.contactId || '',
    name: c.contactNickName ?? null,
    roomId: c.roomId ?? null,
    conversationId: c.conversationId ?? null,
    unreadCount: 0,
  }));
}

/**
 * Wire the reactive contacts store to domain events. Returns a teardown fn.
 *
 * @returns {() => void}
 */
export function setupContactsList() {
  /** @type {Map<string, () => void>} unreadTeardowns per-conversation */
  const unreadTeardowns = new Map();
  /** @type {Map<string, number>} lastSeenUnreadByConversation */
  const lastUnreadByConv = new Map();

  function addUnreadListener(conversationId) {
    if (!conversationId || unreadTeardowns.has(conversationId)) return;

    const offEvt = subscribe(
      'evt:messaging:conversation:unread-count-changed',
      ({ conversationId: updatedConversationId, unreadCount }) => {
        if (updatedConversationId !== conversationId) return;
        lastUnreadByConv.set(conversationId, unreadCount);
        setContacts(
          produce((arr) => {
            for (const row of arr) {
              if (row.conversationId === conversationId) {
                row.unreadCount = unreadCount;
              }
            }
          }),
        );
      },
    );

    dispatchCommand('cmd:messaging:conversation:unread-count-listen', {
      conversationId,
    });

    unreadTeardowns.set(conversationId, () => {
      offEvt();
      dispatchCommand('cmd:messaging:conversation:unread-count-unlisten', {
        conversationId,
      });
    });
  }

  function removeUnreadListener(conversationId) {
    const teardown = unreadTeardowns.get(conversationId);
    if (!teardown) return;
    teardown();
    unreadTeardowns.delete(conversationId);
    lastUnreadByConv.delete(conversationId);
  }

  function reconcile() {
    const rows = readContactsFromState();
    const freshConvIds = new Set(
      rows.map((r) => r.conversationId).filter(Boolean),
    );

    // Preserve last-known unread counts across rebuilds.
    for (const row of rows) {
      if (row.conversationId && lastUnreadByConv.has(row.conversationId)) {
        row.unreadCount = lastUnreadByConv.get(row.conversationId);
      }
    }

    setContacts(
      produce((arr) => {
        arr.length = 0;
        for (const row of rows) arr.push(row);
      }),
    );

    // Add listeners for new conversations
    for (const row of rows) {
      if (row.conversationId && !unreadTeardowns.has(row.conversationId)) {
        addUnreadListener(row.conversationId);
      }
    }

    // Remove listeners for conversations no longer present
    for (const conversationId of [...unreadTeardowns.keys()]) {
      if (!freshConvIds.has(conversationId)) {
        removeUnreadListener(conversationId);
      }
    }
  }

  // Register contacts-owned command handlers (cmd:contacts:contact:edit).
  // Idempotent — safe if setup is called multiple times.
  const teardownContactsHandlers = setupContactsAppBusHandlers();

  // Initial hydration + subscribe to future state changes.
  reconcile();
  const offState = subscribe('evt:contacts:state:changed', () => {
    reconcile();
  });

  return () => {
    offState();
    teardownContactsHandlers();
    for (const teardown of unreadTeardowns.values()) {
      try {
        teardown();
      } catch (e) {
        console.warn('[setupContactsList] teardown failed:', e);
      }
    }
    unreadTeardowns.clear();
    lastUnreadByConv.clear();
    setContacts(
      produce((arr) => {
        arr.length = 0;
      }),
    );
  };
}
