// src/messaging/transports/rtdb-transport.js
// Firebase Realtime Database messaging transport implementation

import { MessagingTransport } from './messaging-transport.js';
import {
  ref,
  push,
  set,
  update,
  onChildAdded,
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

    // Handle all messages in the conversation
    const messageCallback = (snapshot) => {
      const msg = snapshot.val();
      if (!msg) return;

      const isSentByMe = msg.from === myUserId;

      // Trigger callback with message data
      onMessage(msg.text, msg, isSentByMe);
    };

    // Start listening to conversation
    onChildAdded(conversationRef, messageCallback);

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
   * @param {string} contactId - Contact's user ID
   * @returns {Promise<void>}
   */
  async markAsRead(contactId) {
    const myUserId = getLoggedInUserId();
    if (!myUserId) return;

    const conversationId = this._getConversationId(myUserId, contactId);
    const conversationRef = ref(rtdb, `conversations/${conversationId}/messages`);
    const { get } = await import('firebase/database');

    try {
      const snapshot = await get(conversationRef);
      if (!snapshot.exists()) return;

      const messages = snapshot.val();
      const updatePromises = [];

      // Mark all unread messages from the contact as read
      Object.entries(messages).forEach(([msgId, msg]) => {
        if (!msg.read && msg.from === contactId) {
          const msgRef = ref(
            rtdb,
            `conversations/${conversationId}/messages/${msgId}`
          );
          updatePromises.push(update(msgRef, { read: true }));
        }
      });

      await Promise.all(updatePromises);
    } catch (err) {
      console.warn('[RTDBTransport] Failed to mark messages as read:', err);
    }
  }

  /**
   * Remove oldest messages if conversation exceeds MAX_MESSAGES_PER_CONVERSATION
   * Runs async without blocking send operation
   * @param {string} conversationId - Conversation ID
   * @returns {Promise<void>}
   * @private
   */
  async _cleanupOldMessages(conversationId) {
    const { get, remove } = await import('firebase/database');
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

    for (let i = 0; i < toDelete; i++) {
      const [msgId] = sortedMessages[i];
      await remove(
        ref(rtdb, `conversations/${conversationId}/messages/${msgId}`)
      );
    }

    console.log(
      `[RTDBTransport] Cleaned up ${toDelete} old messages from conversation ${conversationId}`
    );
  }
}
