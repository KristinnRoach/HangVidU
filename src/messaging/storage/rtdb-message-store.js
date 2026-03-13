// src/messaging/storage/rtdb-message-store.js
// Firebase RTDB implementation of MessageStore.
//
// Storage path: conversations/{conversationId}/messages/{messageId}
//
// Responsibilities:
//   Downstream: transform canonical MessageSchema objects for RTDB (e.g. serverTimestamp)
//   Upstream:   parse raw RTDB data into canonical objects, call registered callbacks
//   Internal:   RTDB-specific concerns (cleanup, indexing) — transparent to controller

import { MessageStore } from './message-store.js';
import { parseMessage } from '../schema.js';
import {
  ref,
  set,
  update,
  get,
  query,
  orderByKey,
  startAfter,
  onChildAdded,
  onChildChanged,
  off,
  serverTimestamp,
} from 'firebase/database';
import { rtdb } from '../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId } from '../../auth/auth-state.js';

const MAX_MESSAGES = 100;

/**
 * Normalize reactions from RTDB format { emoji: { uid: true } } to { emoji: [uid] }
 */
function normalizeReactions(reactions) {
  if (!reactions || typeof reactions !== 'object') return {};
  const result = {};
  for (const [type, users] of Object.entries(reactions)) {
    if (users && typeof users === 'object') {
      result[type] = Array.isArray(users) ? users : Object.keys(users);
    }
  }
  return result;
}

export class RTDBMessageStore extends MessageStore {
  resolveConversationId(participantIds) {
    if (!participantIds || participantIds.length < 2) {
      throw new Error('resolveConversationId requires at least 2 participants');
    }
    return participantIds
      .map((p) => String(p || '').trim())
      .sort()
      .join('_');
  }

  // ── Downstream (commands) ─────────────────────────────────────────────

  async write(conversationId, message) {
    const { messageId, ...fields } = message;
    const messageRef = ref(
      rtdb,
      `conversations/${conversationId}/messages/${messageId}`,
    );

    // Storage transform: replace client timestamp with server timestamp
    await set(messageRef, { ...fields, sentAt: serverTimestamp() });

    // Best-effort cleanup (non-blocking)
    this._cleanup(conversationId).catch((err) =>
      console.warn('[RTDBMessageStore] Cleanup failed:', err),
    );
  }

  async addReaction(conversationId, messageId, reactionType) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) throw new Error('Cannot add reaction: not logged in');
    const path = `conversations/${conversationId}/messages/${messageId}/reactions/${reactionType}/${myUserId}`;
    await set(ref(rtdb, path), true);
  }

  async removeReaction(conversationId, messageId, reactionType) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) throw new Error('Cannot remove reaction: not logged in');
    const path = `conversations/${conversationId}/messages/${messageId}/reactions/${reactionType}/${myUserId}`;
    await set(ref(rtdb, path), null);
  }

  async markAsRead(conversationId) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return;

    try {
      const snapshot = await get(
        ref(rtdb, `conversations/${conversationId}/messages`),
      );
      if (!snapshot.exists()) return;

      const updates = {};
      Object.entries(snapshot.val()).forEach(([msgId, msg]) => {
        if (!msg.read && msg.from !== myUserId) {
          updates[`conversations/${conversationId}/messages/${msgId}/read`] =
            true;
        }
      });
      if (Object.keys(updates).length > 0) await update(ref(rtdb), updates);
    } catch (err) {
      console.warn('[RTDBMessageStore] Mark as read failed:', err);
    }
  }

  async getUnreadCount(conversationId) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return 0;

    try {
      const snapshot = await get(
        ref(rtdb, `conversations/${conversationId}/messages`),
      );
      if (!snapshot.exists()) return 0;
      return Object.values(snapshot.val()).filter(
        (msg) => !msg.read && msg.from !== myUserId,
      ).length;
    } catch (err) {
      console.warn('[RTDBMessageStore] Unread count failed:', err);
      return 0;
    }
  }

  async fetchHistory(conversationId) {
    if (!conversationId) {
      console.warn('fetchHistory requires conversationId');
      return { messages: [], lastKey: null };
    }

    if (!getLoggedInUserId()) {
      console.warn('[RTDBMessageStore] Cannot fetch history: not logged in');
      return { messages: [], lastKey: null };
    }

    const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);
    const snapshot = await get(messagesRef);

    if (!snapshot.exists()) return { messages: [], lastKey: null };

    const messages = [];
    let lastKey = null;

    // snapshot.forEach preserves key order (chronological for push IDs)
    snapshot.forEach((child) => {
      lastKey = child.key;
      try {
        const parsed = parseMessage(child.val(), child.key);
        if (parsed) messages.push(parsed);
      } catch (err) {
        console.warn(
          '[RTDBMessageStore] History parse failed:',
          child.key,
          err,
        );
      }
    });

    return { messages, lastKey };
  }

  // ── Upstream (callbacks) ──────────────────────────────────────────────

  /**
   * Listen for new remote messages.
   * @param {string} conversationId
   * @param {function(Object): void} callback
   * @param {Object} [opts]
   * @param {string|null} [opts.afterKey] - Start listening after this RTDB key.
   *   Firebase onChildAdded replays all existing children when attached;
   *   afterKey prevents re-emitting messages already loaded by fetchHistory().
   * @returns {function(): void} Unsubscribe
   */
  onMessage(conversationId, callback, { afterKey = null } = {}) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) {
      console.warn('[RTDBMessageStore] Cannot listen: not logged in');
      return () => {};
    }

    const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);
    const listenRef = afterKey
      ? query(messagesRef, orderByKey(), startAfter(afterKey))
      : messagesRef;

    const handler = (snapshot) => {
      const raw = snapshot.val();
      if (!raw || raw.from === myUserId) return;
      try {
        const parsed = parseMessage(raw, snapshot.key);
        if (parsed) callback(parsed);
      } catch (err) {
        console.warn('[RTDBMessageStore] Parse failed:', snapshot.key, err);
      }
    };

    onChildAdded(listenRef, handler);
    return () => off(listenRef, 'child_added', handler);
  }

  onReactionUpdate(conversationId, callback) {
    const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);

    const handler = (snapshot) => {
      const raw = snapshot.val();
      if (!raw || raw.reactions === undefined) return;
      callback({
        messageId: snapshot.key,
        reactions: normalizeReactions(raw.reactions),
      });
    };

    onChildChanged(messagesRef, handler);
    return () => off(messagesRef, 'child_changed', handler);
  }

  onUnreadChange(conversationId, callback) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return () => {};

    const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);
    const readState = new Map();

    const updateCount = async (newlyReadMsgIds = []) => {
      try {
        const count = await this.getUnreadCount(conversationId);
        callback(count, newlyReadMsgIds);
      } catch (err) {
        console.warn('[RTDBMessageStore] Unread listen failed:', err);
      }
    };

    const onAdded = async (snapshot) => {
      const msg = snapshot.val();
      if (!msg) return;
      readState.set(snapshot.key, !!msg.read);
      if (msg.from !== myUserId && !msg.read) await updateCount();
    };

    const onChanged = async (snapshot) => {
      const msg = snapshot.val();
      if (!msg) return;
      const msgId = snapshot.key;
      const prev = readState.get(msgId) || false;
      const curr = !!msg.read;
      readState.set(msgId, curr);
      if (!prev && curr) await updateCount([msgId]);
    };

    onChildAdded(messagesRef, onAdded);
    onChildChanged(messagesRef, onChanged);

    return () => {
      off(messagesRef, 'child_added', onAdded);
      off(messagesRef, 'child_changed', onChanged);
    };
  }

  // ── Internal ──────────────────────────────────────────────────────────

  async _cleanup(conversationId) {
    const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);
    const snapshot = await get(messagesRef);
    if (!snapshot.exists()) return;

    const messages = snapshot.val();
    const keys = Object.keys(messages);
    if (keys.length <= MAX_MESSAGES) return;

    const sorted = Object.entries(messages).sort(
      (a, b) => (a[1].sentAt || 0) - (b[1].sentAt || 0),
    );
    const updates = {};
    for (let i = 0; i < keys.length - MAX_MESSAGES; i++) {
      updates[`conversations/${conversationId}/messages/${sorted[i][0]}`] =
        null;
    }
    await update(ref(rtdb), updates);
  }
}
