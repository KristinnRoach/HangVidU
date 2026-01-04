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
  const messageRef = push(ref(rtdb, `conversations/${conversationId}/messages`));

  await set(messageRef, {
    text,
    from: fromUserId,
    fromName,
    sentAt: serverTimestamp(),
    read: false,
  });
}

/**
 * Listen to messages with a specific contact (both sent and received).
 * Fetches existing messages AND listens for new ones.
 * Automatically marks received messages as read.
 *
 * @param {string} contactUserId - Contact's user ID
 * @param {Function} onMessage - Callback(text, messageData, isSentByMe) called for each message
 * @returns {Function} Unsubscribe function to stop listening
 */
export function listenToContactMessages(contactUserId, onMessage) {
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

    // Mark received messages as read
    if (!isSentByMe && !msg.read) {
      update(snapshot.ref, { read: true }).catch((err) => {
        console.warn('Failed to mark message as read:', err);
      });
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
