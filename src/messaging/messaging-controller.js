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
      (m) => m.parsedMessage.messageId === messageEvent.parsedMessage.messageId,
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
      (m) => m.parsedMessage.messageId === messageId,
    );
    if (message) {
      message.parsedMessage.reactions = reactions;
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
      this._touchSession(session.conversationId);
      this.emit('session:resumed', { session });

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
        if (typeof this.transport.sendFile !== 'function') {
          return Promise.reject(
            new Error('Transport does not support file messages'),
          );
        }
        // Update to use conversationId or roomId if multi participant chat support is added
        return this.transport.sendFile(contactId, file);
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

    // Start listening to messages via transport
    const unsubscribe = this.transport.listen(
      conversationId,
      (parsedMessage) => {
        // messageEvent is the wrapper the controller emits to listeners/UI.
        // Shape: { conversationId: string, parsedMessage: Object }
        // - `conversationId` is the deterministic conversation identifier
        // - `parsedMessage` is the parsed message object (conforms to ParsedMessageSchema
        //    produced by the transport/parser)
        const messageEvent = { conversationId, parsedMessage };

        // 1. Cache the message (even if background)
        this.cacheHistory(session, messageEvent);

        // 2. Cache reaction updates
        if (parsedMessage._reactionUpdate) {
          this.updateCachedHistoryReactions(
            session,
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
      // (unreadCount, newlyReadMsgIds = []) => {
      //   this.emit('unread:changed', {
      //     conversationId,
      //     unreadCount,
      //     newlyReadMsgIds,
      //   });
      // },
    );

    session._unsubscribe = () => {
      unsubscribe();
      unsubscribeUnread();
    };

    this._touchSession(session.conversationId);
    this.emit('session:opened', { session });

    return session;
  }

  /**
   * Display a session in the UI by emitting the appropriate event.
   * Must be called after openSession() to trigger UI updates.
   * @param {string} conversationId - Conversation ID
   */
  displaySession(conversationId) {
    const session = this.sessions.get(conversationId);
    if (!session) {
      throw new Error(`Cannot display non-existent session: ${conversationId}`);
    }

    this.emit('session:display', { session });
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
      this.sessionOrder = this.sessionOrder.filter(
        (id) => id !== conversationId,
      );
      this.emit('session:closed', { conversationId });
    } else {
      console.warn(
        '[MessagingController] Attempted to close non-existent session:',
        conversationId,
      );
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
