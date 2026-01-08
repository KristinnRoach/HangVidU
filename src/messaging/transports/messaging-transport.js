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
   * Send a message to a contact
   * @param {string} contactId - Recipient's user ID
   * @param {string} text - Message text
   * @returns {Promise<void>}
   * @abstract
   */
  async send(contactId, text) {
    throw new Error('MessagingTransport.send() must be implemented by subclass');
  }

  /**
   * Listen for messages with a contact (both sent and received)
   * @param {string} contactId - Contact's user ID
   * @param {Function} onMessage - Callback(text, msgData, isSentByMe) called for each message
   * @returns {Function} Unsubscribe function to stop listening
   * @abstract
   */
  listen(contactId, onMessage) {
    throw new Error('MessagingTransport.listen() must be implemented by subclass');
  }

  /**
   * Get unread message count from a specific contact
   * @param {string} contactId - Contact's user ID
   * @returns {Promise<number>} Number of unread messages
   * @abstract
   */
  async getUnreadCount(contactId) {
    throw new Error('MessagingTransport.getUnreadCount() must be implemented by subclass');
  }

  /**
   * Mark all messages from a contact as read
   * @param {string} contactId - Contact's user ID
   * @returns {Promise<void>}
   * @abstract
   */
  async markAsRead(contactId) {
    throw new Error('MessagingTransport.markAsRead() must be implemented by subclass');
  }

  /**
   * Listen for unread count changes from a contact
   * @param {string} contactId - Contact's user ID
   * @param {Function} onCountChange - Callback(count) called when unread count changes
   * @returns {Function} Unsubscribe function to stop listening
   * @abstract
   */
  listenToUnreadCount(contactId, onCountChange) {
    throw new Error('MessagingTransport.listenToUnreadCount() must be implemented by subclass');
  }
}
