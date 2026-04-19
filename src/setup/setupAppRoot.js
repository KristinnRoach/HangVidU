//
// Bridges imperative domain state into the Solid app root's UI state.
// Start narrow with contacts; expand this file as more UI surfaces migrate.

import { produce } from 'solid-js/store';
import { subscribe, dispatchCommand } from '../shared/events/index.js';
import { getAllContactsSorted } from '../features/contacts/index.js';
import { setContacts } from '../components/contacts/ContactsList.jsx';

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
 * Wire app-root UI state to domain events. Returns a teardown fn.
 *
 * @returns {() => void}
 */
export function setupAppRoot() {
  /** @type {Map<string, () => void>} */
  const unreadTeardowns = new Map();
  /** @type {Map<string, number>} */
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

  function reconcileContacts() {
    const rows = readContactsFromState();
    const freshConvIds = new Set(
      rows.map((r) => r.conversationId).filter(Boolean),
    );

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

  reconcileContacts();
  const offContactsState = subscribe('evt:contacts:state:changed', () => {
    reconcileContacts();
  });

  return () => {
    offContactsState();
    for (const teardown of unreadTeardowns.values()) {
      try {
        teardown();
      } catch (e) {
        console.warn('[setupAppRoot] teardown failed:', e);
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
