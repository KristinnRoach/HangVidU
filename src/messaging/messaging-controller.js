import { RTDBMessagingTransport } from './transports/rtdb-transport.js';
import { parseMessage } from './schema.js';
import { EventEmitter } from '../utils/event-emitter.js';
import { getLoggedInUserId } from '../auth/auth-state.js';

/**
 * MessagingController - Core messaging API
 *
 * Provides a clean, minimal interface for messaging operations:
 * - Open/close messaging conversations
 * - Send messages and files
 * - Add/remove reactions
 * - Mark as read
 * - Listen to incoming messages and unread count changes
 * - Track unread counts
 * - Abstract transport layer (RTDB, DataChannel, etc.)
 * - Emits events for real-time updates
 *
 * Design principles:
 * - Event-driven: Emits events instead of relying on deep callbacks
 * - Session-based: Clean lifecycle (open → use → close)
 * - Transport-agnostic: Easy to swap implementations
 * - UI-decoupled: Controller doesn't know about UI components
 */
export class MessagingController extends EventEmitter {
  /**
   * Create a messaging controller
   * @param {Object} transport - Transport implementation (RTDBMessagingTransport, etc.)
   */
  constructor(transport) {
    super();
    if (!transport) {
      throw new Error(
        'MessagingController requires a transport implementation',
      );
    }

    this.transport = transport;
    this.conversations = new Map(); // conversationId -> internal conversation state
    this.conversationOrder = []; // conversationId list, from oldest to newest (MRU)
  }

  /**
   * Resolve a conversation ID for the given participants.
   * Currently supports 1:1 via sorted user IDs.
   * @param {string[]} participantIds - List of user IDs
   * @returns {string} Conversation ID
   */
  resolveConversationId(participantIds) {
    return this.transport.resolveConversationId(participantIds);
  }

  /**
   * Convenience: resolve 1:1 conversation ID for current user and contact
   * @param {string} contactId
   * @returns {string}
   */
  resolveConversationIdFromContact(contactId) {
    const myUserId = getLoggedInUserId();
    if (!myUserId)
      throw new Error('Cannot resolve conversation: not logged in');
    return this.resolveConversationId([myUserId, contactId]);
  }

  /**
   * Helper: Add a message to the conversation's internal history cache.
   * Keeps the last 50 messages for instant UI re-hydration.
   */
  cacheHistory(conversationState, messageEvent) {
    if (!conversationState.history) conversationState.history = [];

    // Avoid duplicates
    const isDuplicate = conversationState.history.some(
      (m) => m.parsedMessage.messageId === messageEvent.parsedMessage.messageId,
    );
    if (isDuplicate) return;

    conversationState.history.push(messageEvent);

    // Hard limit on history size to prevent memory bloat
    if (conversationState.history.length > 50) {
      conversationState.history.shift();
    }
  }

  /**
   * Helper: Update reactions for a message in the cached history.
   */
  updateCachedHistoryReactions(conversationState, messageId, reactions) {
    if (!conversationState.history) return;
    const message = conversationState.history.find(
      (m) => m.parsedMessage.messageId === messageId,
    );
    if (message) {
      message.parsedMessage.reactions = reactions;
    }
  }

  /**
   * Internal: Update conversation MRU order and handle eviction.
   * Keeps only the 5 most recently used conversations open.
   */
  _touchConversation(conversationId) {
    // Move to end of MRU list (newest)
    this.conversationOrder = this.conversationOrder.filter(
      (id) => id !== conversationId,
    );
    this.conversationOrder.push(conversationId);

    // Evict oldest if limit exceeded
    if (this.conversationOrder.length > 5) {
      const oldestId = this.conversationOrder.shift();
      console.debug(
        '[MessagingController] Evicting oldest conversation:',
        oldestId,
      );
      this.closeConversation(oldestId);
    }
  }

  /**
   * Open a messaging conversation
   *
   * Only one conversation per contactId is allowed. If a conversation already exists,
   * it will be resumed instead of creating a new one. Emits 'conversation:opened' event
   * with plain data { conversationId, contactId, contactName }.
   *
   * @param {string} contactId - Contact ID
   * @param {string} contactName - Optional contact name
   */
  openConversation(contactId, contactName) {
    if (!contactId || typeof contactId !== 'string') {
      throw new Error('contactId must be a non-empty string');
    }

    const conversationId = this.resolveConversationIdFromContact(contactId);

    if (!conversationId || typeof conversationId !== 'string') {
      throw new Error('conversationId must be a non-empty string');
    }

    // Return early if already open (resume instead of re-open)
    if (this.conversations.has(conversationId)) {
      console.debug(
        '[MessagingController] Conversation already open:',
        conversationId,
      );

      this._touchConversation(conversationId);
      this.emit('conversation:resumed', {
        conversationId,
        contactId,
        contactName,
      });

      return;
    }

    // Create internal conversation state (not exposed to callers)
    const conversationState = {
      conversationId,
      contactId,
      contactName,
      history: [], // Cached messages for instant re-hydration
      _unsubscribe: null,
    };

    // Add conversation to map
    this.conversations.set(conversationId, conversationState);

    // Start listening to messages via transport
    const unsubscribe = this.transport.listen(
      conversationId,
      (parsedMessage) => {
        // messageEvent is the wrapper the controller emits to listeners/UI.
        // Shape: { conversationId: string, parsedMessage: Object }
        const messageEvent = { conversationId, parsedMessage };

        // 1. Cache the message (even if background)
        this.cacheHistory(conversationState, messageEvent);

        // 2. Cache reaction updates
        if (parsedMessage._reactionUpdate) {
          this.updateCachedHistoryReactions(
            conversationState,
            parsedMessage.messageId,
            parsedMessage.reactions,
          );
        }

        // 3. Emit general message event for active UI (skip for reaction-only updates)
        if (!parsedMessage._reactionUpdate) {
          this.emit('message:received', messageEvent);
        }

        // Notify if unread count changes
        const isFromMe = parsedMessage.from === getLoggedInUserId();
        if (!isFromMe) {
          this.transport
            .getUnreadCountForConversation(conversationId)
            .then((unreadCount) => {
              this.emit('unread:changed', { conversationId, unreadCount });
            })
            .catch((err) =>
              console.warn(
                '[MessagingController] Failed to get unread count:',
                err,
              ),
            );
        }

        // Emit specific reaction update event if applicable
        if (parsedMessage._reactionUpdate) {
          this.emit('reaction:updated', {
            conversationId,
            messageId: parsedMessage.messageId,
            reactions: parsedMessage.reactions,
          });
        }
      },
    );

    const unsubscribeUnread = this.transport.listenToUnreadCountForConversation(
      conversationId,
      (unreadCount, newlyReadMsgIds = []) => {
        this.emit('unread:changed', {
          conversationId,
          unreadCount,
          newlyReadMsgIds,
        });
      },
    );

    conversationState._unsubscribe = () => {
      unsubscribe();
      unsubscribeUnread();
    };

    this._touchConversation(conversationId);
    this.emit('conversation:opened', {
      conversationId,
      contactId,
      contactName,
    });
  }

  /**
   * Display a conversation in the UI by emitting the appropriate event.
   * Must be called after openConversation() to trigger UI updates.
   * @param {string} conversationId - Conversation ID
   */
  displayConversation(conversationId) {
    const conversationState = this.conversations.get(conversationId);
    if (!conversationState) {
      throw new Error(
        `Cannot display non-existent conversation: ${conversationId}`,
      );
    }

    this.emit('conversation:display', {
      conversationId,
      contactId: conversationState.contactId,
      contactName: conversationState.contactName,
    });
  }

  /**
   * Send a message to an open conversation.
   * Returns the ParsedMessage so the caller can render it immediately
   * (sender doesn't wait for RTDB echo).
   * @param {string} conversationId - Conversation ID
   * @param {string} text - Message text
   * @returns {Promise<Object>} ParsedMessage for immediate rendering
   */
  async send(conversationId, text) {
    if (!this.conversations.has(conversationId)) {
      throw new Error(`No open conversation: ${conversationId}`);
    }

    if (!text || typeof text !== 'string') {
      throw new Error('Message text must be a string');
    }

    const { messageId, messageData } =
      await this.transport.sendToConversation(conversationId, text);

    const parsed = parseMessage(messageData, messageId);

    // Cache locally (listener skips own messages, so we cache here)
    const conversationState = this.conversations.get(conversationId);
    this.cacheHistory(conversationState, {
      conversationId,
      parsedMessage: parsed,
    });

    return parsed;
  }

  /**
   * Send a file to an open conversation
   * @param {string} conversationId - Conversation ID
   * @param {File} file - File to send
   */
  async sendFile(conversationId, file) {
    if (!this.conversations.has(conversationId)) {
      throw new Error(`No open conversation: ${conversationId}`);
    }

    if (typeof this.transport.sendFile !== 'function') {
      throw new Error('Transport does not support file messages');
    }

    // Resolve contactId from internal state
    const conversationState = this.conversations.get(conversationId);
    const contactId = conversationState.contactId;

    return this.transport.sendFile(contactId, file);
  }

  /**
   * Mark a conversation as read
   * @param {string} conversationId - Conversation ID
   */
  async markAsRead(conversationId) {
    if (!this.conversations.has(conversationId)) {
      throw new Error(`No open conversation: ${conversationId}`);
    }

    return this.transport.markAsReadForConversation(conversationId);
  }

  /**
   * Add a reaction to a message in an open conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} messageId - Message ID
   * @param {string} type - Reaction type (emoji, etc.)
   */
  async addReaction(conversationId, messageId, type) {
    if (!this.conversations.has(conversationId)) {
      throw new Error(`No open conversation: ${conversationId}`);
    }

    return this.transport.addReactionToConversation(
      conversationId,
      messageId,
      type,
    );
  }

  /**
   * Remove a reaction from a message in an open conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} messageId - Message ID
   * @param {string} type - Reaction type (emoji, etc.)
   */
  async removeReaction(conversationId, messageId, type) {
    if (!this.conversations.has(conversationId)) {
      throw new Error(`No open conversation: ${conversationId}`);
    }

    return this.transport.removeReactionFromConversation(
      conversationId,
      messageId,
      type,
    );
  }

  /**
   * Get cached message history for a conversation
   * @param {string} conversationId - Conversation ID
   * @returns {Array} Cached messages
   */
  getHistory(conversationId) {
    const conversationState = this.conversations.get(conversationId);
    return conversationState ? [...conversationState.history] : [];
  }

  /**
   * Close a specific messaging conversation
   * @param {string} conversationId - Conversation ID
   */
  closeConversation(conversationId) {
    const conversationState = this.conversations.get(conversationId);
    if (conversationState) {
      if (conversationState._unsubscribe) conversationState._unsubscribe();
      this.conversations.delete(conversationId);
      this.conversationOrder = this.conversationOrder.filter(
        (id) => id !== conversationId,
      );
      this.emit('conversation:closed', { conversationId });
    } else {
      console.warn(
        '[MessagingController] Attempted to close non-existent conversation:',
        conversationId,
      );
    }
  }

  getConversation(conversationId) {
    // Return internal state for compatibility, but mark as private
    return this.conversations.get(conversationId);
  }

  getAllConversations() {
    return Array.from(this.conversations.values());
  }

  closeAllConversations() {
    const conversationIds = Array.from(this.conversations.keys());
    conversationIds.forEach((conversationId) => {
      this.closeConversation(conversationId);
    });
  }

  /**
   * Convenience helpers for unread counts
   */
  async getUnreadCount(conversationId) {
    return this.transport.getUnreadCountForConversation(conversationId);
  }

  listenToUnreadCount(conversationId, onCountChange, onMessageRead) {
    return this.transport.listenToUnreadCountForConversation(
      conversationId,
      onCountChange,
      onMessageRead,
    );
  }

  async sendCallEventMessage(contactId, eventType, metadata = {}) {
    return this.transport.writeCallEventMessage(contactId, eventType, metadata);
  }
}

export const messagingController = new MessagingController(
  new RTDBMessagingTransport(),
);
