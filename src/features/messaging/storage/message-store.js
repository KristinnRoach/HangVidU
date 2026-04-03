// src/messaging/storage/message-store.js
// Abstract base class defining the storage contract.
//
// FLOW:
//   Downstream (commands):  Controller → store.method(completeMessageObject)
//   Upstream (events):      Store → registered callbacks → Controller emits events → UI
//
// Contract:
//   - Controller passes complete, validated MessageSchema objects downstream
//   - Store calls registered callbacks with complete, validated MessageSchema objects upstream
//   - Store may transform data for its backend (e.g. serverTimestamp) — transparent to controller
//   - Store never knows about UI or EventEmitter

/**
 * @abstract
 */
export class MessageStore {
  /**
   * Resolve a deterministic conversation ID for the given participants.
   * @param {string[]} participantIds
   * @returns {string}
   */
  resolveConversationId(participantIds) {
    throw new Error('Not implemented');
  }

  // ── Downstream (commands) ─────────────────────────────────────────────

  /**
   * Persist a message.
   * @param {string} conversationId
   * @param {Object} message - Complete, validated MessageSchema object (includes messageId)
   * @returns {Promise<void>}
   */
  async write(conversationId, message) {
    throw new Error('Not implemented');
  }

  /**
   * Add a reaction to a message.
   * @param {string} conversationId
   * @param {string} messageId
   * @param {string} reactionType
   * @returns {Promise<void>}
   */
  async addReaction(conversationId, messageId, reactionType) {
    throw new Error('Not implemented');
  }

  /**
   * Remove a reaction from a message.
   * @param {string} conversationId
   * @param {string} messageId
   * @param {string} reactionType
   * @returns {Promise<void>}
   */
  async removeReaction(conversationId, messageId, reactionType) {
    throw new Error('Not implemented');
  }

  /**
   * Mark all messages from others as read.
   * @param {string} conversationId
   * @returns {Promise<void>}
   */
  async markAsRead(conversationId) {
    throw new Error('Not implemented');
  }

  /**
   * Get current unread count.
   * @param {string} conversationId
   * @returns {Promise<number>}
   */
  async getUnreadCount(conversationId) {
    throw new Error('Not implemented');
  }

  /**
   * Fetch full message history for a conversation (one-time read).
   * Returns all messages (both local and remote), parsed and validated.
   * @param {string} conversationId
   * @returns {Promise<{messages: Object[], lastKey: string|null}>}
   *   messages: validated MessageSchema objects in chronological order
   *   lastKey: key of the last message (used as cursor for live listeners)
   */
  async fetchHistory(conversationId) {
    throw new Error('Not implemented');
  }

  // ── Upstream (callbacks) ──────────────────────────────────────────────
  // Each distinct event type gets its own listener method.
  // Returns an unsubscribe function.

  /**
   * Listen for new messages from other users.
   * Must NOT emit the sender's own messages.
   * @param {string} conversationId
   * @param {function(Object): void} callback - Called with validated MessageSchema object
   * @param {Object} [opts]
   * @param {string|null} [opts.afterKey] - Only listen for messages added after this key
   *   (implementation-specific: used to avoid replaying already-fetched history)
   * @returns {function(): void} Unsubscribe
   */
  onMessage(conversationId, callback, opts) {
    throw new Error('Not implemented');
  }

  /**
   * Listen for reaction changes on any message in the conversation.
   * @param {string} conversationId
   * @param {function({messageId: string, reactions: Object}): void} callback
   * @returns {function(): void} Unsubscribe
   */
  onReactionUpdate(conversationId, callback) {
    throw new Error('Not implemented');
  }

  /**
   * Listen for unread count changes.
   * @param {string} conversationId
   * @param {function(number, string[]): void} callback - (unreadCount, newlyReadMsgIds)
   * @returns {function(): void} Unsubscribe
   */
  onUnreadChange(conversationId, callback) {
    throw new Error('Not implemented');
  }
}
