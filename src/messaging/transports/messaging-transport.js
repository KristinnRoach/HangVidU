// src/messaging/transports/messaging-transport.js
// Base class defining the messaging transport interface

/**
 * MessagingTransport - Base class for messaging transport implementations
 *
 * Defines the contract that all messaging transports must implement.
 * Transport implementations handle the actual sending/receiving of messages
 * through different channels (RTDB, WebRTC DataChannel, etc.).
 *
 * @abstract
 */
export class MessagingTransport {
  /**
   * Send a message to a conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} text - Message text
   * @returns {Promise<void>}
   * @abstract
   */
  async sendToConversation(conversationId, text) {
    throw new Error('MessagingTransport.sendToConversation() must be implemented by subclass');
  }

  /**
   * Listen for messages in a conversation
   * @param {string} conversationId - Conversation ID
   * @param {Function} onMessage - Callback(text, msgData, isSentByMe) called for each message
   * @returns {Function} Unsubscribe function to stop listening
   * @abstract
   */
  listenToConversation(conversationId, onMessage) {
    throw new Error('MessagingTransport.listenToConversation() must be implemented by subclass');
  }

  /**
   * Get unread message count for a conversation
   * @param {string} conversationId - Conversation ID
   * @returns {Promise<number>} Number of unread messages
   * @abstract
   */
  async getUnreadCountForConversation(conversationId) {
    throw new Error('MessagingTransport.getUnreadCountForConversation() must be implemented by subclass');
  }

  /**
   * Mark all messages in a conversation as read
   * @param {string} conversationId - Conversation ID
   * @returns {Promise<void>}
   * @abstract
   */
  async markAsReadForConversation(conversationId) {
    throw new Error('MessagingTransport.markAsReadForConversation() must be implemented by subclass');
  }

  /**
   * Listen for unread count changes in a conversation
   * @param {string} conversationId - Conversation ID
   * @param {Function} onCountChange - Callback(count) called when unread count changes
   * @returns {Function} Unsubscribe function to stop listening
   * @abstract
   */
  listenToUnreadCountForConversation(conversationId, onCountChange) {
    throw new Error('MessagingTransport.listenToUnreadCountForConversation() must be implemented by subclass');
  }

  /**
   * Resolve a conversation ID for the given participants
   * @param {string[]} participantIds - List of user IDs
   * @returns {string} Conversation ID
   */
  resolveConversationId(participantIds) {
    throw new Error('MessagingTransport.resolveConversationId() must be implemented by subclass');
  }

  // ========================================================================
  // REACTIONS
  // ========================================================================

  /**
   * Add a reaction to a message in a conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} messageId - Message ID to react to
   * @param {string} reactionType - Type of reaction (e.g., 'heart')
   * @returns {Promise<void>}
   * @abstract
   */
  async addReactionToConversation(conversationId, messageId, reactionType) {
    throw new Error('MessagingTransport.addReactionToConversation() must be implemented by subclass');
  }

  /**
   * Remove a reaction from a message in a conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} messageId - Message ID to remove reaction from
   * @param {string} reactionType - Type of reaction to remove
   * @returns {Promise<void>}
   * @abstract
   */
  async removeReactionFromConversation(conversationId, messageId, reactionType) {
    throw new Error('MessagingTransport.removeReactionFromConversation() must be implemented by subclass');
  }

  /**
   * Get reactions for a message in a conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} messageId - Message ID
   * @returns {Promise<Object>} Reactions object { reactionType: [userIds] }
   * @abstract
   */
  async getReactionsForConversation(conversationId, messageId) {
    throw new Error('MessagingTransport.getReactionsForConversation() must be implemented by subclass');
  }
}
