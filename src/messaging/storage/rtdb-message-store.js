// src/messaging/storage/rtdb-message-store.js
// Firebase RTDB implementation of MessageStore.
//
// Storage path: conversations/{conversationId}/messages/{messageId}
//
// conversationId contract (see docs/dev/conversation-id-contract.md):
//   - conversationId is treated as an OPAQUE, stable identifier.
//   - No runtime code derives participants by parsing the conversationId.
//   - Membership authority: conversations/{conversationId}/members/{uid} = true
//   - Reverse index:        users/{uid}/conversations/{conversationId}   = true
//   - 1:1 dedup index:      users/{uid}/directConversations/{otherUid}   = conversationId
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
import { getUserId } from '../../auth/auth-state.js';

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
  /**
   * Resolve a deterministic conversationId for a 1:1 direct conversation.
   *
   * LEGACY NOTE: This produces a uid1_uid2 key that encodes participant UIDs.
   * It exists for backward compatibility with existing conversations only.
   * Do NOT parse the returned ID to derive participants — use the members
   * collection (conversations/{id}/members) as the authority instead.
   * For new conversation types (groups, etc.) use ensureConversation() with
   * an externally-generated opaque ID.
   *
   * @param {string[]} participantIds - Exactly 2 user IDs for a direct chat
   * @returns {string} Deterministic conversation ID (opaque to callers)
   */
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

    // Ensure membership nodes exist (idempotent, best-effort)
    // Note: ensureConversation() should have been called by the controller
    // before the first write. This call is a safety net for legacy flows.
    this._ensureMembers(conversationId).catch((err) =>
      console.warn('[RTDBMessageStore] ensureMembers failed:', err),
    );

    // Storage transform: replace client timestamp with server timestamp
    await set(messageRef, { ...fields, sentAt: serverTimestamp() });

    // Best-effort cleanup (non-blocking)
    this._cleanup(conversationId).catch((err) =>
      console.warn('[RTDBMessageStore] Cleanup failed:', err),
    );
  }

  async addReaction(conversationId, messageId, reactionType) {
    const myUserId = getUserId();
    if (!myUserId) throw new Error('Cannot add reaction: missing user id');
    const path = `conversations/${conversationId}/messages/${messageId}/reactions/${reactionType}/${myUserId}`;
    await set(ref(rtdb, path), true);
  }

  async removeReaction(conversationId, messageId, reactionType) {
    const myUserId = getUserId();
    if (!myUserId) throw new Error('Cannot remove reaction: missing user id');
    const path = `conversations/${conversationId}/messages/${messageId}/reactions/${reactionType}/${myUserId}`;
    await set(ref(rtdb, path), null);
  }

  async markAsRead(conversationId) {
    const myUserId = getUserId();
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
    const myUserId = getUserId();
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

    if (!getUserId()) {
      console.warn('[RTDBMessageStore] Cannot fetch history: missing user id');
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
    const myUserId = getUserId();
    if (!myUserId) {
      console.warn('[RTDBMessageStore] Cannot listen: missing user id');
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
    const myUserId = getUserId();
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

  /**
   * Ensure membership and index nodes exist for a conversation.
   *
   * This is the canonical conversation-bootstrap method. Call it once when
   * opening or creating a conversation with known participants; it is idempotent
   * and safe to call every time selectConversation runs.
   *
   * Writes atomically (multi-path update):
   *   conversations/{id}/members/{uid}              = true  (membership authority)
   *   users/{uid}/conversations/{id}                = true  (reverse index)
   *   users/{uid}/directConversations/{otherUid}    = id    (1:1 dedup index, 2-party only)
   *
   * Does NOT parse conversationId — participantIds must be supplied explicitly.
   *
   * @param {string} conversationId
   * @param {string[]} participantIds - All participant UIDs (including self)
   * @returns {Promise<void>}
   */
  async ensureConversation(conversationId, participantIds) {
    if (!conversationId || !participantIds || participantIds.length < 2) {
      console.warn('[RTDBMessageStore] ensureConversation: invalid args', {
        conversationId,
        participantIds,
      });
      return;
    }

    const membersRef = ref(rtdb, `conversations/${conversationId}/members`);
    const snap = await get(membersRef);
    // Early return: if any members exist, assume the full bootstrap (membership +
    // reverse indexes + directConversations) was written atomically in a prior call.
    // If the directConversations index was missing from an older bootstrap, run
    // scripts/migrate-conversation-members.js to backfill it.
    //
    // Race condition note: two concurrent first-time callers could both see no
    // members and both proceed to write. Because all written values are idempotent
    // (true / same conversationId) this results in duplicate writes but no data
    // corruption. If atomic guarantees are needed, move this to a Cloud Function.
    if (snap.exists()) return;

    const updates = {};
    for (const uid of participantIds) {
      updates[`conversations/${conversationId}/members/${uid}`] = true;
      updates[`users/${uid}/conversations/${conversationId}`] = true;
    }

    // For 1:1 direct conversations, also write the dedup index so future
    // opaque-ID lookups can find the existing conversation without parsing the ID.
    if (participantIds.length === 2) {
      const [a, b] = participantIds;
      updates[`users/${a}/directConversations/${b}`] = conversationId;
      updates[`users/${b}/directConversations/${a}`] = conversationId;
    }

    await update(ref(rtdb), updates);
  }

  /**
   * Fallback membership bootstrap — used only when participantIds are not
   * available at the call site (legacy write path).
   *
   * LEGACY — do not extend or rely on this method for new features.
   * It can only recover membership for legacy uid1_uid2 conversation IDs.
   * Prefer calling ensureConversation() before the first write instead.
   *
   * @param {string} conversationId
   * @private
   */
  async _ensureMembers(conversationId) {
    const membersRef = ref(
      rtdb,
      `conversations/${conversationId}/members`,
    );
    const snap = await get(membersRef);
    if (snap.exists()) return;

    // We cannot derive participants from an opaque ID.
    // Log a warning so callers know they should call ensureConversation() instead.
    console.warn(
      '[RTDBMessageStore] _ensureMembers: members missing for conversation and no participants supplied.',
      conversationId,
      'Call ensureConversation(id, participantIds) before the first write.',
    );
  }

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
