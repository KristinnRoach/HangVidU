// src/messaging/transports/rtdb-transport.js
// Firebase Realtime Database messaging transport implementation

import { MessagingTransport } from './messaging-transport.js';
import { compressImage } from '../../media/image-compress.js';
import {
  ref,
  push,
  set,
  update,
  get,
  onChildAdded,
  onChildChanged,
  off,
  serverTimestamp,
} from 'firebase/database';
import { rtdb } from '../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getUser } from '../../auth/auth-state.js';

// Message limit per conversation to control storage costs
const MAX_MESSAGES_PER_CONVERSATION = 100;

// Max file size for RTDB file messages (1MB before base64 encoding)
const MAX_FILE_SIZE = 1 * 1024 * 1024;

/**
 * Convert a File/Blob to a base64 data URL string.
 * @param {File} file
 * @returns {Promise<string>} base64 data URL
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * RTDBMessagingTransport - Firebase RTDB implementation
 *
 * Stores messages in Firebase Realtime Database under:
 * `/conversations/{conversationId}/messages/{messageId}`
 *
 * Features:
 * - Deterministic conversation IDs (sorted user IDs)
 * - Automatic cleanup of old messages
 * - Read/unread tracking
 * - Real-time message listening
 */
export class RTDBMessagingTransport extends MessagingTransport {
  /**
   * Resolve a conversation ID for the given participants.
   * For 1:1, use sorted user IDs.
   * @param {string[]} participantIds - List of user IDs
   * @returns {string} Conversation ID
   */
  resolveConversationId(participantIds) {
    if (!participantIds || participantIds.length < 2) {
      throw new Error('resolveConversationId requires at least 2 participants');
    }

    // Coerce all participant IDs to strings and trim whitespace to avoid
    // accidental non-string values (e.g. numeric 0) sneaking into the ID.
    const normalized = participantIds.map((p) => {
      if (p === null || p === undefined) return '' + p;
      // Preserve values but coerce to string
      return String(p).trim();
    });

    // Diagnose suspicious IDs early to help track down corruption sources
    const hasSuspicious = normalized.some((id) => id === '' || id === '0');
    if (hasSuspicious) {
      console.warn(
        '[RTDBTransport] resolveConversationId called with suspicious participantIds',
        {
          original: participantIds,
          normalized,
        },
      );
    }

    return normalized.sort().join('_');
  }

  /**
   * @deprecated Use resolveConversationId
   * @private
   */
  _getConversationId(userId1, userId2) {
    return this.resolveConversationId([userId1, userId2]);
  }

  /**
   * @deprecated Use sendToConversation
   */
  async send(contactId, text) {
    const fromUserId = getLoggedInUserId();
    if (!fromUserId) throw new Error('Cannot send message: not logged in');
    const conversationId = this.resolveConversationId([fromUserId, contactId]);
    return this.sendToConversation(conversationId, text);
  }

  async sendToConversation(conversationId, text) {
    const fromUserId = getLoggedInUserId();
    if (!fromUserId) {
      throw new Error('Cannot send message: not logged in');
    }

    const user = getUser();
    const fromName = user?.displayName || 'Guest User';

    // Write to shared conversation node
    const messageRef = push(
      ref(rtdb, `conversations/${conversationId}/messages`),
    );

    await set(messageRef, {
      text,
      from: fromUserId,
      fromName,
      sentAt: serverTimestamp(),
      read: false,
    });

    // Clean up old messages if limit exceeded
    this._cleanupOldMessages(conversationId).catch((err) => {
      console.warn('[RTDBTransport] Failed to cleanup old messages:', err);
    });
  }

  /**
   * Write a call event message to the conversation
   * Used for missed calls, rejected calls, etc.
   * @param {string} contactId - Contact's user ID
   * @param {string} eventType - Event type ('missed_call' or 'rejected_call')
   * @param {Object} metadata - Event metadata
   * @param {string} metadata.roomId - The call's room ID (for deduplication)
   * @param {string} metadata.callerId - Who initiated the call
   * @param {string} metadata.callerName - Caller's display name
   * @returns {Promise<void>}
   */
  async writeCallEventMessage(contactId, eventType, metadata = {}) {
    const fromUserId = getLoggedInUserId();
    if (!fromUserId) {
      throw new Error('Cannot write call event: not logged in');
    }

    const conversationId = this._getConversationId(fromUserId, contactId);

    // Write to shared conversation node
    const messageRef = push(
      ref(rtdb, `conversations/${conversationId}/messages`),
    );

    await set(messageRef, {
      type: 'call_event',
      eventType,
      callId: metadata.roomId || null,
      callerId: metadata.callerId || fromUserId,
      callerName: metadata.callerName || 'Someone',
      from: fromUserId,
      sentAt: serverTimestamp(),
      read: false,
    });

    // Clean up old messages if limit exceeded (best-effort, non-blocking)
    this._cleanupOldMessages(conversationId).catch((err) => {
      console.warn('[RTDBTransport] Failed to cleanup old messages:', err);
    });
  }

  /**
   * @deprecated Use listenToConversation
   */
  listen(contactId, onMessage) {
    console.warn(
      '[RTDBTransport] listen(contactId) is deprecated. Use listenToConversation(conversationId) instead.',
    );
    const myUserId = getLoggedInUserId();
    if (!myUserId) return () => {};
    const conversationId = this.resolveConversationId([myUserId, contactId]);
    return this.listenToConversation(conversationId, onMessage);
  }

  listenToConversation(conversationId, onMessage) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) {
      console.warn('[RTDBTransport] Cannot listen to messages: not logged in');
      return () => {};
    }

    const conversationRef = ref(
      rtdb,
      `conversations/${conversationId}/messages`,
    );

    const seenMessageIds = new Set();

    const messageCallback = (snapshot) => {
      const msgId = snapshot.key;
      const msg = snapshot.val();
      if (!msg || seenMessageIds.has(msgId)) return;

      seenMessageIds.add(msgId);
      const isSentByMe = msg.from === myUserId;
      const msgData = { ...msg, messageId: msgId };
      onMessage(msg.text, msgData, isSentByMe);
    };

    const reactionCallback = (snapshot) => {
      const msgId = snapshot.key;
      const msg = snapshot.val();
      if (!msg || !seenMessageIds.has(msgId)) return;

      if (msg.reactions !== undefined) {
        const isSentByMe = msg.from === myUserId;
        const msgData = { ...msg, messageId: msgId, _reactionUpdate: true };
        onMessage(msg.text, msgData, isSentByMe);
      }
    };

    onChildAdded(conversationRef, messageCallback);
    onChildChanged(conversationRef, reactionCallback);

    return () => {
      off(conversationRef, 'child_added', messageCallback);
      off(conversationRef, 'child_changed', reactionCallback);
    };
  }

  /**
   * Get unread message count for a conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} [fromContactId] - Optional: Only count messages from this user
   * @returns {Promise<number>} Number of unread messages
   */
  async getUnreadCountForConversation(conversationId, fromContactId) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return 0;

    const conversationRef = ref(
      rtdb,
      `conversations/${conversationId}/messages`,
    );

    try {
      const snapshot = await get(conversationRef);
      if (!snapshot.exists()) return 0;

      const messages = snapshot.val();
      // Count unread messages not sent by me.
      // If fromContactId is provided, filter specifically for that sender.
      return Object.values(messages).filter(
        (msg) =>
          !msg.read &&
          msg.from !== myUserId &&
          (!fromContactId || msg.from === fromContactId),
      ).length;
    } catch (err) {
      console.warn('[RTDBTransport] Failed to get unread count:', err);
      return 0;
    }
  }

  /**
   * @deprecated Use markAsReadForConversation
   */
  async markAsRead(contactId) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return;
    const conversationId = this.resolveConversationId([myUserId, contactId]);
    return this.markAsReadForConversation(conversationId, contactId);
  }

  async markAsReadForConversation(conversationId, fromContactId) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return;

    const conversationRef = ref(
      rtdb,
      `conversations/${conversationId}/messages`,
    );

    try {
      const snapshot = await get(conversationRef);
      if (!snapshot.exists()) return;

      const messages = snapshot.val();
      const updates = {};

      Object.entries(messages).forEach(([msgId, msg]) => {
        // Mark as read if not sent by me.
        // If fromContactId is provided, only mark messages from that sender.
        if (
          !msg.read &&
          msg.from !== myUserId &&
          (!fromContactId || msg.from === fromContactId)
        ) {
          updates[`conversations/${conversationId}/messages/${msgId}/read`] =
            true;
        }
      });

      if (Object.keys(updates).length > 0) {
        await update(ref(rtdb), updates);
      }
    } catch (err) {
      console.warn('[RTDBTransport] Failed to mark messages as read:', err);
    }
  }

  /**
   * @deprecated Use listenToUnreadCountForConversation
   */
  listenToUnreadCount(contactId, onCountChange) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return () => {};
    const conversationId = this.resolveConversationId([myUserId, contactId]);
    return this.listenToUnreadCountForConversation(
      conversationId,
      onCountChange,
    );
  }

  listenToUnreadCountForConversation(conversationId, onCountChange) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) {
      console.warn(
        '[RTDBTransport] Cannot listen to unread count: not logged in',
      );
      return () => {};
    }

    const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);

    const updateCount = async () => {
      try {
        const count = await this.getUnreadCountForConversation(conversationId);
        onCountChange(count);
      } catch (err) {
        console.warn('[RTDBTransport] Failed to get unread count:', err);
      }
    };

    const onAddedCallback = async (snapshot) => {
      const msg = snapshot.val();
      if (!msg) return;
      if (msg.from !== myUserId && !msg.read) {
        await updateCount();
      }
    };

    const onChangedCallback = async (snapshot) => {
      const msg = snapshot.val();
      if (!msg) return;
      if (msg.from !== myUserId) {
        await updateCount();
      }
    };

    onChildAdded(messagesRef, onAddedCallback);
    onChildChanged(messagesRef, onChangedCallback);

    return () => {
      off(messagesRef, 'child_added', onAddedCallback);
      off(messagesRef, 'child_changed', onChangedCallback);
    };
  }

  /**
   * Remove oldest messages if conversation exceeds MAX_MESSAGES_PER_CONVERSATION
   * Runs async without blocking send operation
   * Optimized: Single multi-path update instead of N separate deletes
   * @param {string} conversationId - Conversation ID
   * @returns {Promise<void>}
   * @private
   */
  async _cleanupOldMessages(conversationId) {
    const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);

    const snapshot = await get(messagesRef);
    if (!snapshot.exists()) return;

    const messages = snapshot.val();
    const messageCount = Object.keys(messages).length;

    if (messageCount <= MAX_MESSAGES_PER_CONVERSATION) return;

    // Delete oldest messages (keep newest MAX_MESSAGES_PER_CONVERSATION)
    const toDelete = messageCount - MAX_MESSAGES_PER_CONVERSATION;
    const sortedMessages = Object.entries(messages).sort(
      (a, b) => (a[1].sentAt || 0) - (b[1].sentAt || 0),
    );

    // Build multi-path update object with null values (null = delete in Firebase)
    const updates = {};
    for (let i = 0; i < toDelete; i++) {
      const [msgId] = sortedMessages[i];
      updates[`conversations/${conversationId}/messages/${msgId}`] = null;
    }

    // Single atomic update to delete all old messages (1 write instead of N)
    await update(ref(rtdb), updates);

    console.log(
      `[RTDBTransport] Cleaned up ${toDelete} old messages from conversation ${conversationId}`,
    );
  }

  // ========================================================================
  // FILE MESSAGES
  // ========================================================================

  /**
   * Send a file as a message via RTDB (base64-encoded).
   * For small files only — capped at MAX_FILE_SIZE bytes before encoding.
   * @param {string} contactId - Recipient's user ID
   * @param {File} file - File to send
   * @returns {Promise<void>}
   */
  async sendFile(contactId, file) {
    const fromUserId = getLoggedInUserId();
    if (!fromUserId) {
      throw new Error('Cannot send file: not logged in');
    }

    // Always compress images — even files under MAX_FILE_SIZE need it
    // because base64 encoding adds ~33% overhead
    if (file.type.startsWith('image/')) {
      const compressed = await compressImage(file);
      if (compressed) {
        file = compressed;
      } else if (file.size > MAX_FILE_SIZE) {
        throw new Error(
          `Image too large to compress under ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
        );
      }
      // If compression returned null but file is small enough, send original
    } else if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
      );
    }

    const user = getUser();
    const fromName = user?.displayName || 'Guest User';
    const conversationId = this._getConversationId(fromUserId, contactId);

    // Read file as base64
    const base64 = await fileToBase64(file);

    const messageRef = push(
      ref(rtdb, `conversations/${conversationId}/messages`),
    );

    await set(messageRef, {
      type: 'file',
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      data: base64,
      from: fromUserId,
      fromName,
      sentAt: serverTimestamp(),
      read: false,
    });

    this._cleanupOldMessages(conversationId).catch((err) => {
      console.warn('[RTDBTransport] Failed to cleanup old messages:', err);
    });
  }

  // ========================================================================
  // REACTIONS
  // ========================================================================

  /**
   * @deprecated Use addReactionToConversation
   */
  async addReaction(contactId, messageId, reactionType) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) throw new Error('Cannot add reaction: not logged in');
    const conversationId = this.resolveConversationId([myUserId, contactId]);
    return this.addReactionToConversation(
      conversationId,
      messageId,
      reactionType,
    );
  }

  async addReactionToConversation(conversationId, messageId, reactionType) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) {
      throw new Error('Cannot add reaction: not logged in');
    }

    const reactionPath = `conversations/${conversationId}/messages/${messageId}/reactions/${reactionType}/${myUserId}`;
    await set(ref(rtdb, reactionPath), true);
  }

  /**
   * @deprecated Use removeReactionFromConversation
   */
  async removeReaction(contactId, messageId, reactionType) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) throw new Error('Cannot remove reaction: not logged in');
    const conversationId = this.resolveConversationId([myUserId, contactId]);
    return this.removeReactionFromConversation(
      conversationId,
      messageId,
      reactionType,
    );
  }

  async removeReactionFromConversation(
    conversationId,
    messageId,
    reactionType,
  ) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) {
      throw new Error('Cannot remove reaction: not logged in');
    }

    const reactionPath = `conversations/${conversationId}/messages/${messageId}/reactions/${reactionType}/${myUserId}`;
    await set(ref(rtdb, reactionPath), null);
  }

  /**
   * @deprecated Use getReactionsForConversation
   */
  async getReactions(contactId, messageId) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return {};
    const conversationId = this.resolveConversationId([myUserId, contactId]);
    return this.getReactionsForConversation(conversationId, messageId);
  }

  async getReactionsForConversation(conversationId, messageId) {
    const reactionsRef = ref(
      rtdb,
      `conversations/${conversationId}/messages/${messageId}/reactions`,
    );

    try {
      const snapshot = await get(reactionsRef);
      if (!snapshot.exists()) return {};

      const reactionsData = snapshot.val();
      const result = {};
      for (const [type, users] of Object.entries(reactionsData)) {
        result[type] = Object.keys(users);
      }
      return result;
    } catch (err) {
      console.warn('[RTDBTransport] Failed to get reactions:', err);
      return {};
    }
  }

  /**
   * Check if current user has reacted with a specific type
   * @param {string} contactId - Contact's user ID
   * @param {string} messageId - Message ID
   * @param {string} reactionType - Type of reaction to check
   * @returns {Promise<boolean>}
   */
  async hasMyReaction(contactId, messageId, reactionType) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return false;

    const conversationId = this._getConversationId(myUserId, contactId);
    const reactionPath = `conversations/${conversationId}/messages/${messageId}/reactions/${reactionType}/${myUserId}`;

    try {
      const snapshot = await get(ref(rtdb, reactionPath));
      return snapshot.exists();
    } catch (err) {
      return false;
    }
  }
}
