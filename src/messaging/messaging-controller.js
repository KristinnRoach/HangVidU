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
   * @param {Object} transport - Transport implementation (RTDBMessagingTransport, etc.)
   */
  constructor(transport) {
    if (!transport) {
      throw new Error('MessagingController requires a transport implementation');
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
      console.warn(`[MessagingController] Session already open for ${contactId}`);
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
        if (!isSentByMe && onUnreadChange && typeof onUnreadChange === 'function') {
          this.transport.getUnreadCount(contactId)
            .then(count => onUnreadChange(count))
            .catch(err => console.warn('[MessagingController] Failed to get unread count:', err));
        }
      }
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
          return Promise.reject(new Error('Message text must be a non-empty string'));
        }
        return this.transport.send(contactId, text);
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
}

/**
 * Default messaging controller instance using RTDB transport
 * Can be replaced with a different transport for testing or privacy settings
 */
export const messagingController = new MessagingController(
  new RTDBMessagingTransport()
);
