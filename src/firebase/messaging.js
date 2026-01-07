// src/firebase/messaging.js
// Simple RTDB-based messaging for offline/async communication

import {
  ref,
  push,
  set,
  onChildAdded,
  off,
  serverTimestamp,
  update,
} from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getCurrentUser } from './auth.js';

// Track active message sessions (one per contact, max one active)
export const activeMessageSessions = new Map();

/**
 * Generate a deterministic conversation ID for two users.
 * Uses sorted user IDs to ensure the same conversation ID regardless of who initiates.
 *
 * @param {string} userId1 - First user ID
 * @param {string} userId2 - Second user ID
 * @returns {string} Conversation ID (e.g., "user1_user2")
 */
function getConversationId(userId1, userId2) {
  return [userId1, userId2].sort().join('_');
}

/**
 * Send a message to a contact via RTDB.
 * Messages are stored in a shared conversation node.
 *
 * @param {string} toUserId - Recipient's user ID
 * @param {string} text - Message text
 * @returns {Promise<void>}
 */
// Message limit per conversation to control storage costs
const MAX_MESSAGES_PER_CONVERSATION = 100;

export async function sendMessageToRTDB(toUserId, text) {
  const fromUserId = getLoggedInUserId();
  if (!fromUserId) {
    console.warn('Cannot send message: not logged in');
    return;
  }

  const user = getCurrentUser();
  const fromName = user?.displayName || 'Guest User';

  // Get conversation ID for both users
  const conversationId = getConversationId(fromUserId, toUserId);

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
  cleanupOldMessages(conversationId).catch((err) => {
    console.warn('Failed to cleanup old messages:', err);
  });
}

/**
 * Remove oldest messages if conversation exceeds MAX_MESSAGES_PER_CONVERSATION.
 * Runs async without blocking send operation.
 */
async function cleanupOldMessages(conversationId) {
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
    `[MESSAGING] Cleaned up ${toDelete} old messages from conversation ${conversationId}`
  );
}

/**
 * Listen to messages with a specific contact (both sent and received).
 * Fetches existing messages AND listens for new ones.
 * Automatically marks received messages as read when UI is open.
 *
 * @param {string} contactUserId - Contact's user ID
 * @param {Function} onMessage - Callback(text, messageData, isSentByMe) called for each message
 * @param {Function} [isUIOpen] - Optional callback that returns true if messages UI is currently open
 * @returns {Function} Unsubscribe function to stop listening
 */
export function listenToContactMessages(contactUserId, onMessage, isUIOpen) {
  const myUserId = getLoggedInUserId();
  if (!myUserId) {
    console.warn('Cannot listen to messages: not logged in');
    return () => {};
  }

  // Get conversation ID for both users
  const conversationId = getConversationId(myUserId, contactUserId);

  // Listen to shared conversation node
  const conversationRef = ref(rtdb, `conversations/${conversationId}/messages`);

  // Handle all messages in the conversation
  const messageCallback = (snapshot) => {
    const msg = snapshot.val();
    if (!msg) return;

    const isSentByMe = msg.from === myUserId;

    // Trigger callback with message data
    onMessage(msg.text, msg, isSentByMe);

    // Mark received messages as read ONLY if UI is open
    if (!isSentByMe && !msg.read) {
      const shouldMarkRead = isUIOpen ? isUIOpen() : true; // Default to true if not provided
      if (shouldMarkRead) {
        update(snapshot.ref, { read: true }).catch((err) => {
          console.warn('Failed to mark message as read:', err);
        });
      }
    }
  };

  // Listen to conversation
  onChildAdded(conversationRef, messageCallback);

  // Return cleanup function
  return () => {
    off(conversationRef, 'child_added', messageCallback);
  };
}

/**
 * Get unread message count from a specific contact.
 *
 * @param {string} fromUserId - Contact's user ID
 * @returns {Promise<number>} Number of unread messages
 */
export async function getUnreadCount(fromUserId) {
  const myUserId = getLoggedInUserId();
  if (!myUserId) return 0;

  const conversationId = getConversationId(myUserId, fromUserId);
  const conversationRef = ref(rtdb, `conversations/${conversationId}/messages`);
  const { get } = await import('firebase/database');

  try {
    const snapshot = await get(conversationRef);
    if (!snapshot.exists()) return 0;

    const messages = snapshot.val();
    // Count unread messages that were sent by the contact (not by me)
    return Object.values(messages).filter(
      (msg) => !msg.read && msg.from === fromUserId
    ).length;
  } catch (err) {
    console.warn('Failed to get unread count:', err);
    return 0;
  }
}

/**
 * Mark all unread messages from a contact as read.
 *
 * @param {string} fromUserId - Contact's user ID
 * @returns {Promise<void>}
 */
export async function markMessagesAsRead(fromUserId) {
  const myUserId = getLoggedInUserId();
  if (!myUserId) return;

  const conversationId = getConversationId(myUserId, fromUserId);
  const conversationRef = ref(rtdb, `conversations/${conversationId}/messages`);
  const { get } = await import('firebase/database');

  try {
    const snapshot = await get(conversationRef);
    if (!snapshot.exists()) return;

    const messages = snapshot.val();
    const updatePromises = [];

    // Mark all unread messages from the contact as read
    Object.entries(messages).forEach(([msgId, msg]) => {
      if (!msg.read && msg.from === fromUserId) {
        const msgRef = ref(rtdb, `conversations/${conversationId}/messages/${msgId}`);
        updatePromises.push(update(msgRef, { read: true }));
      }
    });

    await Promise.all(updatePromises);
  } catch (err) {
    console.warn('Failed to mark messages as read:', err);
  }
}

/**
 * Get the currently active messaging session (if any).
 * @returns {Object|undefined} Active session object or undefined
 */
export function getActiveMessageSession() {
  return Array.from(activeMessageSessions.values())[0];
}

/**
 * Close and cleanup a specific message session.
 * @param {string} contactId - Contact's user ID
 */
export function closeMessageSession(contactId) {
  const session = activeMessageSessions.get(contactId);
  if (session) {
    session.unsubscribe();
    session.messagesUI.cleanup();
    activeMessageSessions.delete(contactId);
  }
}

/**
 * Close all active message sessions.
 */
export function closeAllMessageSessions() {
  activeMessageSessions.forEach((session) => {
    session.unsubscribe();
    session.messagesUI.cleanup();
  });
  activeMessageSessions.clear();
}
