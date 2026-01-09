// src/messaging/transports/rtdb-transport.js
// Firebase Realtime Database messaging transport implementation

import { MessagingTransport } from './messaging-transport.js';
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
import { getLoggedInUserId, getCurrentUser } from '../../firebase/auth.js';

// Message limit per conversation to control storage costs
const MAX_MESSAGES_PER_CONVERSATION = 100;

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
   * Generate a deterministic conversation ID for two users
   * Uses sorted user IDs to ensure the same ID regardless of who initiates
   * @param {string} userId1 - First user ID
   * @param {string} userId2 - Second user ID
   * @returns {string} Conversation ID (e.g., "user1_user2")
   * @private
   */
  _getConversationId(userId1, userId2) {
    return [userId1, userId2].sort().join('_');
  }

  /**
   * Send a message to a contact via RTDB
   * @param {string} contactId - Recipient's user ID
   * @param {string} text - Message text
   * @returns {Promise<void>}
   */
  async send(contactId, text) {
    const fromUserId = getLoggedInUserId();
    if (!fromUserId) {
      throw new Error('Cannot send message: not logged in');
    }

    const user = getCurrentUser();
    const fromName = user?.displayName || 'Guest User';
    const conversationId = this._getConversationId(fromUserId, contactId);

    // Write to shared conversation node
    const messageRef = push(
      ref(rtdb, `conversations/${conversationId}/messages`)
    );

    await set(messageRef, {
      text,
      from: fromUserId,
      fromName,
      sentAt: serverTimestamp(),
      read: false,
    });

    // Clean up old messages if limit exceeded (best-effort, non-blocking)
    this._cleanupOldMessages(conversationId).catch((err) => {
      console.warn('[RTDBTransport] Failed to cleanup old messages:', err);
    });
  }

  /**
   * Listen to messages with a specific contact (both sent and received)
   * Fetches existing messages AND listens for new ones
   * Optimized: Single bulk read for history + listener for new messages
   * @param {string} contactId - Contact's user ID
   * @param {Function} onMessage - Callback(text, messageData, isSentByMe) for each message
   * @returns {Function} Unsubscribe function to stop listening
   */
  listen(contactId, onMessage) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) {
      console.warn('[RTDBTransport] Cannot listen to messages: not logged in');
      return () => {}; // Return no-op unsubscribe
    }

    const conversationId = this._getConversationId(myUserId, contactId);
    const conversationRef = ref(rtdb, `conversations/${conversationId}/messages`);

    // Track seen message IDs to prevent duplicates from race condition
    const seenMessageIds = new Set();

    // Set up listener for new messages FIRST (before fetching history)
    const messageCallback = (snapshot) => {
      const msgId = snapshot.key;
      const msg = snapshot.val();
      if (!msg || seenMessageIds.has(msgId)) return;

      seenMessageIds.add(msgId);
      const isSentByMe = msg.from === myUserId;
      onMessage(msg.text, msg, isSentByMe);
    };

    onChildAdded(conversationRef, messageCallback);

    // Fetch existing messages with single read (async, non-blocking)
    get(conversationRef)
      .then((snapshot) => {
        if (!snapshot.exists()) return;

        const messages = snapshot.val();
        // Sort by timestamp to display in chronological order
        const sortedMessages = Object.entries(messages).sort(
          (a, b) => (a[1].sentAt || 0) - (b[1].sentAt || 0)
        );

        // Process each existing message
        sortedMessages.forEach(([msgId, msg]) => {
          if (seenMessageIds.has(msgId)) return; // Skip if already processed by listener

          seenMessageIds.add(msgId);
          const isSentByMe = msg.from === myUserId;
          onMessage(msg.text, msg, isSentByMe);
        });
      })
      .catch((err) => {
        console.warn('[RTDBTransport] Failed to load message history:', err);
      });

    // Return cleanup function
    return () => {
      off(conversationRef, 'child_added', messageCallback);
    };
  }

  /**
   * Get unread message count from a specific contact
   * @param {string} contactId - Contact's user ID
   * @returns {Promise<number>} Number of unread messages
   */
  async getUnreadCount(contactId) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return 0;

    const conversationId = this._getConversationId(myUserId, contactId);
    const conversationRef = ref(rtdb, `conversations/${conversationId}/messages`);
    const { get } = await import('firebase/database');

    try {
      const snapshot = await get(conversationRef);
      if (!snapshot.exists()) return 0;

      const messages = snapshot.val();
      // Count unread messages that were sent by the contact (not by me)
      return Object.values(messages).filter(
        (msg) => !msg.read && msg.from === contactId
      ).length;
    } catch (err) {
      console.warn('[RTDBTransport] Failed to get unread count:', err);
      return 0;
    }
  }

  /**
   * Mark all unread messages from a contact as read
   * Optimized: Single multi-path update instead of N separate writes
   * @param {string} contactId - Contact's user ID
   * @returns {Promise<void>}
   */
  async markAsRead(contactId) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return;

    const conversationId = this._getConversationId(myUserId, contactId);
    const conversationRef = ref(rtdb, `conversations/${conversationId}/messages`);

    try {
      const snapshot = await get(conversationRef);
      if (!snapshot.exists()) return;

      const messages = snapshot.val();
      const updates = {};

      // Build multi-path update object for all unread messages
      Object.entries(messages).forEach(([msgId, msg]) => {
        if (!msg.read && msg.from === contactId) {
          updates[`conversations/${conversationId}/messages/${msgId}/read`] = true;
        }
      });

      // Single atomic update for all messages (1 write instead of N)
      if (Object.keys(updates).length > 0) {
        await update(ref(rtdb), updates);
      }
    } catch (err) {
      console.warn('[RTDBTransport] Failed to mark messages as read:', err);
    }
  }

  /**
   * Listen for unread count changes from a contact
   * Useful for badge updates without opening a full session
   * @param {string} contactId - Contact's user ID
   * @param {Function} onCountChange - Callback(count) called when unread count changes
   * @returns {Function} Unsubscribe function to stop listening
   */
  listenToUnreadCount(contactId, onCountChange) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) {
      console.warn('[RTDBTransport] Cannot listen to unread count: not logged in');
      return () => {}; // Return no-op unsubscribe
    }

    const conversationId = this._getConversationId(myUserId, contactId);
    const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);

    // Shared callback for both new messages and status changes
    const updateCount = async () => {
      try {
        const count = await this.getUnreadCount(contactId);
        onCountChange(count);
      } catch (err) {
        console.warn('[RTDBTransport] Failed to get unread count:', err);
      }
    };

    // Listen for new messages from the contact
    const onAddedCallback = async (snapshot) => {
      const msg = snapshot.val();
      if (!msg) return;

      // Update count when new unread message arrives from contact
      if (msg.from === contactId && !msg.read) {
        await updateCount();
      }
    };

    // Listen for message status changes (e.g., read status)
    const onChangedCallback = async (snapshot) => {
      const msg = snapshot.val();
      if (!msg) return;

      // Update count when message from contact is marked as read
      if (msg.from === contactId) {
        await updateCount();
      }
    };

    // Start listening for both new messages and changes
    onChildAdded(messagesRef, onAddedCallback);
    onChildChanged(messagesRef, onChangedCallback);

    // Return cleanup function that removes both listeners
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
      (a, b) => (a[1].sentAt || 0) - (b[1].sentAt || 0)
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
      `[RTDBTransport] Cleaned up ${toDelete} old messages from conversation ${conversationId}`
    );
  }
}
