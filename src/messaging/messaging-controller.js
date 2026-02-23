import { RTDBMessagingTransport } from './transports/rtdb-transport.js';
import { EventEmitter } from '../utils/event-emitter.js';
import { getLoggedInUserId } from '../auth/auth-state.js';

/**
 * MessagingController - Core messaging API
 *
 * Provides a clean, minimal interface for messaging operations:
 * - Open/close messaging sessions for conversations
 * - Send messages through active sessions
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
    this.sessions = new Map(); // conversationId -> session object
    this.sessionOrder = []; // conversationId list, from oldest to newest (MRU)

    this.on('session:opened', ({ session }) => {
      // Touch session to update MRU order
      this._touchSession(session.conversationId);
    });

    this.on('session:closed', ({ conversationId }) => {
      // Sync sessionOrder when a session is closed anywhere
      this.sessionOrder = this.sessionOrder.filter(
        (id) => id !== conversationId,
      );
    });

    // NOTE: UI → controller bridging moved to a centralized bootstrap module
    // to avoid controller coupling to DOM. See src/bootstrap/ui-to-controller-bridges.js
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
   * Helper: Add a message to the session's internal history cache.
   * Keeps the last 50 messages for instant UI re-hydration.
   */
  cacheHistory(session, messageEvent) {
    if (!session.history) session.history = [];

    // Avoid duplicates
    const isDuplicate = session.history.some(
      (m) => m.msgData.messageId === messageEvent.msgData.messageId,
    );
    if (isDuplicate) return;

    session.history.push(messageEvent);

    // Hard limit on history size to prevent memory bloat
    if (session.history.length > 50) {
      session.history.shift();
    }
  }

  /**
   * Helper: Update reactions for a message in the cached history.
   */
  updateCachedHistoryReactions(session, messageId, reactions) {
    if (!session.history) return;
    const message = session.history.find(
      (m) => m.msgData.messageId === messageId,
    );
    if (message) {
      message.msgData.reactions = reactions;
    }
  }

  /**
   * Internal: Update session MRU order and handle eviction.
   * Keeps only the 5 most recently used sessions open.
   */
  _touchSession(conversationId) {
    // Move to end of MRU list (newest)
    this.sessionOrder = this.sessionOrder.filter((id) => id !== conversationId);
    this.sessionOrder.push(conversationId);

    // Evict oldest if limit exceeded
    if (this.sessionOrder.length > 5) {
      const oldestId = this.sessionOrder.shift();
      console.debug('[MessagingController] Evicting oldest session:', oldestId);
      this.closeSession(oldestId);
    }
  }

  /**
   * Open a messaging session for a conversation
   *
   * Only one session per conversation is allowed. If a session already exists,
   * it will be returned instead of creating a new one.
   *
   * @param {string} contactId -
   * @param {string} contactName -
   * @returns {Object} Session object with methods: send, markAsRead, getUnreadCount, close
   */
  openSession(contactId, contactName) {
    if (!contactId || typeof contactId !== 'string') {
      throw new Error('contactId must be a non-empty string');
    }

    const conversationId = this.resolveConversationIdFromContact(contactId);

    if (!conversationId || typeof conversationId !== 'string') {
      throw new Error('conversationId must be a non-empty string');
    }

    // Return existing session if already open
    if (this.sessions.has(conversationId)) {
      console.debug(
        '[MessagingController] Session already open for conversation:',
        conversationId,
      );

      const session = this.sessions.get(conversationId);
      this.emit('session:opened', { session });
      return session;
    }

    // Create session object
    const session = {
      conversationId,
      contactId,
      contactName,
      history: [], // Cached messages for instant re-hydration

      send: (text) => {
        if (!text || typeof text !== 'string') {
          return Promise.reject(new Error('Message text must be a string'));
        }
        return this.transport.sendToConversation(conversationId, text);
      },

      sendFile: (file) => {
        // Note: Transport sendFile still uses contactId internally for some logic,
        // we might need to refactor it to sendFileToConversation too.
        // For now, if we have a 1:1 session, we can derive the contactId.
        if (typeof this.transport.sendFile !== 'function') {
          return Promise.reject(
            new Error('Transport does not support file messages'),
          );
        }
        // TODO: Update transport to support sendFileToConversation
        // For 1:1 compatibility:
        const participants = conversationId.split('_');
        const myId = getLoggedInUserId();
        const contactIdFromCid = participants.find((p) => p !== myId);
        return this.transport.sendFile(contactIdFromCid, file);
      },

      markAsRead: () => {
        return this.transport.markAsReadForConversation(conversationId);
      },

      getUnreadCount: () => {
        return this.transport.getUnreadCountForConversation(conversationId);
      },

      close: () => {
        this.closeSession(conversationId);
      },

      addReaction: (messageId, reactionType) => {
        return this.transport.addReactionToConversation(
          conversationId,
          messageId,
          reactionType,
        );
      },

      removeReaction: (messageId, reactionType) => {
        return this.transport.removeReactionFromConversation(
          conversationId,
          messageId,
          reactionType,
        );
      },

      getReactions: (messageId) => {
        return this.transport.getReactionsForConversation(
          conversationId,
          messageId,
        );
      },

      _unsubscribe: null, // assigned below after listener is attached
    };

    // Add session to map, touch it for MRU, and emit event
    this.sessions.set(conversationId, session);
    this.emit('session:opened', { session });

    // Start listening to messages via transport
    const unsubscribe = this.transport.listenToConversation(
      conversationId,
      (text, msgData, isSentByMe) => {
        const messageEvent = { conversationId, text, msgData, isSentByMe };

        // 1. Cache the message (even if background)
        this.cacheHistory(session, messageEvent);

        // 2. Cache reaction updates
        if (msgData._reactionUpdate) {
          this.updateCachedHistoryReactions(
            session,
            msgData.messageId,
            msgData.reactions,
          );
        }

        // 3. Emit general message event for active UI
        this.emit('message:received', messageEvent);

        // Notify if unread count changes
        if (!isSentByMe) {
          this.transport
            .getUnreadCountForConversation(conversationId)
            .then((count) => {
              this.emit('unread:changed', { conversationId, count });
            })
            .catch((err) =>
              console.warn(
                '[MessagingController] Failed to get unread count:',
                err,
              ),
            );
        }

        // Emit specific reaction update event if applicable
        if (msgData._reactionUpdate) {
          this.emit('reaction:updated', {
            conversationId,
            messageId: msgData.messageId,
            reactions: msgData.reactions,
          });
        }
      },
    );

    session._unsubscribe = unsubscribe;

    return session;
  }

  /**
   * Close a specific messaging session
   * @param {string} conversationId - Conversation ID
   */
  closeSession(conversationId) {
    const session = this.sessions.get(conversationId);
    if (session) {
      if (session._unsubscribe) session._unsubscribe();
      this.sessions.delete(conversationId);
      this.emit('session:closed', { conversationId });
    }
  }

  getSession(conversationId) {
    return this.sessions.get(conversationId);
  }

  getAllSessions() {
    return Array.from(this.sessions.values());
  }

  closeAllSessions() {
    const conversationIds = Array.from(this.sessions.keys());
    conversationIds.forEach((conversationId) => {
      this.closeSession(conversationId);
    });
  }

  /**
   * Convenience helpers for unread counts
   */
  async getUnreadCount(conversationId) {
    return this.transport.getUnreadCountForConversation(conversationId);
  }

  listenToUnreadCount(conversationId, onCountChange) {
    return this.transport.listenToUnreadCountForConversation(
      conversationId,
      onCountChange,
    );
  }

  async sendCallEventMessage(conversationId, eventType, metadata = {}) {
    // TODO: refactor transport to support writeCallEventToConversation
    const participants = conversationId.split('_');
    const myId = getLoggedInUserId();
    const contactId = participants.find((p) => p !== myId);
    return this.transport.writeCallEventMessage(contactId, eventType, metadata);
  }
}

export const messagingController = new MessagingController(
  new RTDBMessagingTransport(),
);
