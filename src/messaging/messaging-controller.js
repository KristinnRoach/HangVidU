// src/messaging/messaging-controller.js
// Unified messaging API with transport abstraction

import { RTDBMessagingTransport } from './transports/rtdb-transport.js';

/**
 * MessagingController - Core messaging API
 *
 * Provides a clean, minimal interface for messaging operations:
 * - Open/close messaging sessions with contacts
 * - Send messages through active sessions
 * - Track unread counts
 * - Abstract transport layer (RTDB, DataChannel, etc.)
 *
 * Design principles:
 * - Session-based: Clean lifecycle (open → use → close)
 * - Transport-agnostic: Easy to swap implementations
 * - UI-decoupled: Controller doesn't know about UI components
 */
export class MessagingController {
  /**
   * Create a messaging controller
   * @param {Object} transport - Transport implementation for text messages (RTDBMessagingTransport, etc.)
   */
  constructor(transport) {
    if (!transport) {
      throw new Error(
        'MessagingController requires a transport implementation',
      );
    }

    this.transport = transport;
    this.sessions = new Map(); // contactId -> session object
  }

  /**
   * Open a messaging session with a contact
   *
   * Only one session per contact is allowed. If a session already exists,
   * it will be returned instead of creating a new one.
   *
   * @param {string} contactId - Contact's user ID
   * @param {Object} options - Session options
   * @param {Function} options.onMessage - Callback(text, msgData, isSentByMe) for incoming messages
   * @param {Function} [options.onUnreadChange] - Optional callback(count) when unread count changes
   * @returns {Object} Session object with methods: send, markAsRead, getUnreadCount, close
   *
   * @example
   * const session = controller.openSession('user123', {
   *   onMessage: (text, msgData, isSentByMe) => {
   *     console.log(isSentByMe ? `You: ${text}` : `Them: ${text}`);
   *   }
   * });
   *
   * await session.send('Hello!');
   * await session.markAsRead();
   * const count = await session.getUnreadCount();
   * session.close();
   */
  openSession(contactId, { onMessage, onUnreadChange } = {}) {
    // Validate inputs
    if (!contactId || typeof contactId !== 'string') {
      throw new Error('contactId must be a non-empty string');
    }

    // Return existing session if already open
    if (this.sessions.has(contactId)) {
      console.info(
        `[MessagingController] Session already open for ${contactId}`,
      );
      return this.sessions.get(contactId);
    }

    // Start listening to messages via transport
    const unsubscribe = this.transport.listen(
      contactId,
      (text, msgData, isSentByMe) => {
        // Forward to onMessage callback
        if (onMessage && typeof onMessage === 'function') {
          onMessage(text, msgData, isSentByMe);
        }

        // Notify unread count changes (only for received messages)
        if (
          !isSentByMe &&
          onUnreadChange &&
          typeof onUnreadChange === 'function'
        ) {
          this.transport
            .getUnreadCount(contactId)
            .then((count) => onUnreadChange(count))
            .catch((err) =>
              console.warn(
                '[MessagingController] Failed to get unread count:',
                err,
              ),
            );
        }
      },
    );

    // Create session object
    const session = {
      contactId,

      /**
       * Send a message to this contact
       * @param {string} text - Message text
       * @returns {Promise<void>}
       */
      send: (text) => {
        if (!text || typeof text !== 'string') {
          return Promise.reject(
            new Error('Message text must be a non-empty string'),
          );
        }
        return this.transport.send(contactId, text);
      },

      /**
       * Send a small file as an RTDB message (base64-encoded, max currently defined in rtdb-transport).
       * Works without an active call.
       * @param {File} file - File to send
       * @returns {Promise<void>}
       */
      sendFile: (file) => {
        return this.sendFileMessage(contactId, file);
      },

      /**
       * Mark all unread messages from this contact as read
       * @returns {Promise<void>}
       */
      markAsRead: () => {
        return this.transport.markAsRead(contactId);
      },

      /**
       * Get current unread message count from this contact
       * @returns {Promise<number>}
       */
      getUnreadCount: () => {
        return this.transport.getUnreadCount(contactId);
      },

      /**
       * Close this session and stop listening for messages
       */
      close: () => {
        this.closeSession(contactId);
      },

      /**
       * Add a reaction to a message
       * @param {string} messageId - Message ID to react to
       * @param {string} reactionType - Type of reaction (e.g., 'heart')
       * @returns {Promise<void>}
       */
      addReaction: (messageId, reactionType) => {
        return this.transport.addReaction(contactId, messageId, reactionType);
      },

      /**
       * Remove a reaction from a message
       * @param {string} messageId - Message ID
       * @param {string} reactionType - Type of reaction to remove
       * @returns {Promise<void>}
       */
      removeReaction: (messageId, reactionType) => {
        return this.transport.removeReaction(
          contactId,
          messageId,
          reactionType,
        );
      },

      /**
       * Check if current user has reacted with a specific type
       * @param {string} messageId - Message ID
       * @param {string} reactionType - Type of reaction to check
       * @returns {Promise<boolean>}
       */
      hasMyReaction: (messageId, reactionType) => {
        return this.transport.hasMyReaction(contactId, messageId, reactionType);
      },

      /**
       * Get all reactions for a message
       * @param {string} messageId - Message ID
       * @returns {Promise<Object>} Reactions object { reactionType: [userIds] }
       */
      getReactions: (messageId) => {
        return this.transport.getReactions(contactId, messageId);
      },

      // Internal: unsubscribe function from transport
      _unsubscribe: unsubscribe,
    };

    // Store session
    this.sessions.set(contactId, session);

    return session;
  }

  /**
   * Close a specific messaging session
   * @param {string} contactId - Contact's user ID
   */
  closeSession(contactId) {
    const session = this.sessions.get(contactId);
    if (session) {
      // Stop listening
      if (session._unsubscribe && typeof session._unsubscribe === 'function') {
        session._unsubscribe();
      }

      // Remove from active sessions
      this.sessions.delete(contactId);
    }
  }

  /**
   * Get an active session (if it exists)
   * @param {string} contactId - Contact's user ID
   * @returns {Object|undefined} Session object or undefined
   */
  getSession(contactId) {
    return this.sessions.get(contactId);
  }

  /**
   * Get all active sessions
   * @returns {Array<Object>} Array of session objects
   */
  getAllSessions() {
    return Array.from(this.sessions.values());
  }

  /**
   * Close all active messaging sessions
   */
  closeAllSessions() {
    this.sessions.forEach((session) => {
      if (session._unsubscribe && typeof session._unsubscribe === 'function') {
        session._unsubscribe();
      }
    });
    this.sessions.clear();
  }

  /**
   * Get unread count for a contact (convenience method, doesn't require an open session)
   * @param {string} contactId - Contact's user ID
   * @returns {Promise<number>}
   */
  async getUnreadCount(contactId) {
    if (!contactId || typeof contactId !== 'string') {
      throw new Error('contactId must be a non-empty string');
    }
    return this.transport.getUnreadCount(contactId);
  }

  /**
   * Listen for unread count changes from a contact
   * Useful for badge updates without opening a full messaging session
   * @param {string} contactId - Contact's user ID
   * @param {Function} onCountChange - Callback(count) called when unread count changes
   * @returns {Function} Unsubscribe function to stop listening
   */
  listenToUnreadCount(contactId, onCountChange) {
    if (!contactId || typeof contactId !== 'string') {
      throw new Error('contactId must be a non-empty string');
    }
    if (typeof onCountChange !== 'function') {
      throw new Error('onCountChange must be a function');
    }
    return this.transport.listenToUnreadCount(contactId, onCountChange);
  }

  // ========================================================================
  // CALL EVENT METHODS
  // ========================================================================

  /**
   * Send a call event message to a contact
   * Used to record missed calls, rejected calls, etc. in chat history
   * @param {string} contactId - Contact's user ID
   * @param {string} eventType - Event type ('missed_call' or 'rejected_call')
   * @param {Object} metadata - Event metadata (roomId, callerId, callerName)
   * @returns {Promise<void>}
   */
  async sendCallEventMessage(contactId, eventType, metadata = {}) {
    if (!contactId || typeof contactId !== 'string') {
      throw new Error('contactId must be a non-empty string');
    }
    if (!eventType || typeof eventType !== 'string') {
      throw new Error('eventType must be a non-empty string');
    }
    return this.transport.writeCallEventMessage(contactId, eventType, metadata);
  }

  // ========================================================================
  // RTDB FILE MESSAGE METHODS (small files, no active call needed)
  // ========================================================================

  /**
   * Send a small file as an RTDB message (base64-encoded).
   * Works without an active WebRTC call — just needs an authenticated user.
   * @param {string} contactId - Recipient's user ID
   * @param {File} file - File to send (max size defined in rtdb-transport)
   * @returns {Promise<void>}
   */
  async sendFileMessage(contactId, file) {
    if (!contactId || typeof contactId !== 'string') {
      throw new Error('contactId must be a non-empty string');
    }
    if (!file) {
      throw new Error('file is required');
    }
    if (typeof this.transport.sendFile !== 'function') {
      throw new Error('Transport does not support file messages');
    }
    return this.transport.sendFile(contactId, file);
  }

}

/**
 * Default messaging controller instance using RTDB transport
 * Can be replaced with a different transport for testing or privacy settings
 */
export const messagingController = new MessagingController(
  new RTDBMessagingTransport(),
);
