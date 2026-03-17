// src/messaging/messaging-controller.js

import { RTDBMessageStore } from './storage/rtdb-message-store.js';
import { fileToBase64 } from '../utils/file-to-base64.js';
import { compressImage } from '../media/image-compress.js';
import { EventEmitter } from '../utils/event-emitter.js';
import { getUserId } from '../auth/auth-state.js';
import { getUserProfile } from '../user/profile.js';
import {
  createFileMessage,
  createTextMessage,
  createEventMessage,
} from './message-factory.js';

// Max file size for file messages (1MB before base64 encoding)
const MAX_FILE_SIZE = 1 * 1024 * 1024;

/**
 * @typedef {Object} MessageEvent
 * @property {string} conversationId
 * @property {Object} message
 */

/**
 * @typedef {Object} ConversationState
 * @property {string} conversationId
 * @property {string[]} remoteParticipantIds
 * @property {Object|null} profile
 * @property {MessageEvent[]} history
 * @property {(() => void)|null} _unsubscribe
 */

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
 * - Store-agnostic: Easy to swap implementations
 * - UI-decoupled: Controller doesn't know about UI components
 */
export class MessagingController extends EventEmitter {
  /**
   * Create a messaging controller
   * @param {Object} store - Store implementation (RTDBMessagingStore, etc.)
   */
  constructor(store) {
    super();
    if (!store) {
      throw new Error(
        'MessagingController requires a MessageStore implementation',
      );
    }

    this.store = store;
    /** @type {Map<string, ConversationState>} */
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
    return this.store.resolveConversationId(participantIds);
  }

  /**
   * Convenience: resolve 1:1 conversation ID for current user and contact
   * @param {string} contactId
   * @returns {string}
   */
  resolveConversationIdFromContactId(contactId) {
    const myUserId = getUserId();
    if (!myUserId)
      throw new Error('Cannot resolve conversation ID: missing user id');

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
      (m) => m.message.messageId === messageEvent.message.messageId,
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
      (m) => m.message.messageId === messageId,
    );
    if (message) {
      message.message.reactions = reactions;
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
   * Get the currently selected conversation ID.
   *
   * This is defined as the most recently used (MRU) conversation, i.e. the
   * last entry in {@link conversationOrder}, or {@code null} when there are
   * no open conversations.
   *
   * NOTE: This behavior is relied on by external callers and should be
   * covered by unit tests for both:
   *   - the empty case (no conversations -> returns null), and
   *   - the non-empty case (returns the MRU conversation ID).
   *
   * @returns {string|null}
   */
  getSelectedConversationId() {
    return this.conversationOrder.length > 0
      ? this.conversationOrder[this.conversationOrder.length - 1]
      : null;
  }

  /**
   * Convenience helper to get the remote contact ID for the currently selected 1:1 conversation.
   * Returns null if there is no selected conversation, if the conversation is not 1:1, or if the conversation state is missing.
   * Relies on the convention that remoteParticipantIds contains only the other participant(s) excluding self.
   * @returns {string|null} Remote contact ID or null if not available
   */
  getRemoteContactIdForSelected1on1Conversation() {
    const conversationId = this.getSelectedConversationId();
    const conversationState = this.conversations.get(conversationId);
    if (!conversationState) return null;

    if (conversationState.remoteParticipantIds.length !== 1) {
      console.warn(
        '[MessagingController] Conversation is not 1:1, cannot determine remote contact ID:',
        conversationId,
      );
      return null;
    }

    return conversationState.remoteParticipantIds[0];
  }

  /**
   * Select a messaging conversation
   *
   * If a conversation already exists, it will be resumed instead of creating a new one.
   * Fetches history from the store or cache if available, seeds the cache, then attaches live listeners.
   * Emits 'conversation:ready' when data is available.
   *
   * @param {string} conversationId - Conversation ID
   * @param {Object} [options]
   * @param {string[]} [options.remoteParticipantIds] - User IDs of other participants (excludes self)
   * @param {boolean} [options.displayUI] - Whether to open the conversation panel
   */
  async selectConversation(
    conversationId,
    { remoteParticipantIds = [], displayUI = false } = {},
  ) {
    if (!conversationId || typeof conversationId !== 'string') {
      throw new Error('conversationId must be a non-empty string');
    }

    // Return early if already open (resume instead of re-open)
    if (this.conversations.has(conversationId)) {
      console.debug(
        '[MessagingController] Conversation already open:',
        conversationId,
      );

      const conversationState = this.conversations.get(conversationId);

      this._touchConversation(conversationId);
      this.emit('conversation:ready', {
        conversationId,
        remoteParticipantIds: conversationState.remoteParticipantIds,
        displayUI,
        history: Array.isArray(conversationState.history)
          ? [...conversationState.history]
          : [],
        profile: conversationState.profile,
      });

      // Re-emit cached profile so UI can update after conversation switch
      if (conversationState.profile) {
        this.emit('conversation:meta-updated', {
          conversationId,
          profile: conversationState.profile,
        });
      }

      return;
    }

    // Create internal conversation state (not exposed to callers)
    const conversationState = {
      conversationId,
      remoteParticipantIds,
      profile: null,
      history: [],
      _unsubscribe: null,
    };

    // Add conversation to map before async work — removed on failure below
    this.conversations.set(conversationId, conversationState);

    const subscriptions = [];
    try {
      // 1. Fetch full history (all messages, local + remote)
      const { messages, lastKey } =
        await this.store.fetchHistory(conversationId);

      for (const message of messages) {
        this.cacheHistory(conversationState, { conversationId, message });
      }

      // 2. Attach live listeners (after fetch, using lastKey cursor to avoid replay)
      const offMessage = this.store.onMessage(
        conversationId,
        (message) => {
          const messageEvent = { conversationId, message };
          this.cacheHistory(conversationState, messageEvent);
          this.emit('message:received', messageEvent);
        },
        { afterKey: lastKey },
      );
      subscriptions.push(offMessage);

      const offReaction = this.store.onReactionUpdate(
        conversationId,
        ({ messageId, reactions }) => {
          this.updateCachedHistoryReactions(
            conversationState,
            messageId,
            reactions,
          );
          this.emit('reaction:updated', {
            conversationId,
            messageId,
            reactions,
          });
        },
      );
      subscriptions.push(offReaction);

      const offUnread = this.store.onUnreadChange(
        conversationId,
        (unreadCount, newlyReadMsgIds = []) => {
          this.emit('unread:changed', {
            conversationId,
            unreadCount,
            newlyReadMsgIds,
          });
        },
      );
      subscriptions.push(offUnread);

      conversationState._unsubscribe = () => {
        subscriptions.forEach((off) => off());
      };
    } catch (err) {
      subscriptions.forEach((off) => {
        try {
          off();
        } catch {}
      });
      this.conversations.delete(conversationId);
      throw err;
    }

    // 3. Emit after cache is seeded — UI can render history immediately
    this._touchConversation(conversationId);

    this.emit('conversation:ready', {
      conversationId,
      remoteParticipantIds,
      displayUI,
      history: Array.isArray(conversationState.history)
        ? [...conversationState.history]
        : [],
      profile: conversationState.profile,
    });

    // 4. Fetch participant info used to display chat avatars etc - async, non-blocking
    // Needs updating when support for multi participant chats added (currently just fetches single users info)
    this._fetchParticipantProfile(remoteParticipantIds[0]).then((profile) => {
      this._updateConversationMeta(conversationId, profile);
    });
  }

  /**
   * Update cached data for a conversation and emit meta update event.
   * @param {string} conversationId
   * @param {Object|null} data
   * @private
   */
  _updateConversationMeta(conversationId, data) {
    const state = this.conversations.get(conversationId);
    if (!state || !data) return;

    state.profile = data; // Todo: replace with explicit properties for each participant in prep for multi-chat support
    this.emit('conversation:meta-updated', { conversationId, profile: data });
  }

  getSelectedConversationState() {
    const conversationId = this.getSelectedConversationId();
    return this.conversations.get(conversationId) || null;
  }

  // getSelectedConversationPhotoUrl() {
  //   const conversationId = this.getSelectedConversationId();
  //   const state = this.conversations.get(conversationId);
  //   return state?.profile?.photoURL || null;
  // }

  // getSelectedConversationDisplayName() {
  //   const conversationId = this.getSelectedConversationId();
  //   const state = this.conversations.get(conversationId);
  //   return state?.profile?.displayName || null;
  // }

  // getSelectedConversationMetadata() {
  //   const conversationId = this.getSelectedConversationId();
  //   const state = this.conversations.get(conversationId);
  //   if (!state) return null;

  //   const meta = {
  //     id: state.conversationId,
  //     participants: {
  //       self: {
  //         userId: getUserId(),
  //       },
  //       remote: {
  //         [state.remoteParticipantIds[0]]: {
  //           displayName: state.profile.displayName,
  //           photoURL: state.profile.photoURL,
  //         },
  //       },
  //     },
  //   };

  //   return meta;
  // }

  /**
   * Fetch and cache a user profile for a conversation.
   * Emits 'conversation:meta-updated' when resolved.
   * @param {string} participantId
   * @private
   */
  async _fetchParticipantProfile(participantId) {
    try {
      const profile = await getUserProfile(participantId);
      return profile;
    } catch (e) {
      console.warn(
        '[MessagingController] Failed to fetch profile for participant:',
        participantId,
        e,
      );
    }
  }

  /**
   * Persist a message and cache it locally.
   * Throws on write failure. Does not return — caller already holds the message.
   * @param {string} conversationId
   * @param {Object} message - Complete, validated message object
   * @private
   */
  async _writeAndCache(conversationId, message) {
    await this.store.write(conversationId, message);

    // Cache locally (store.onMessage skips own messages, so we cache here)
    const conversationState = this.conversations.get(conversationId);
    this.cacheHistory(conversationState, {
      conversationId,
      message,
    });
  }

  /**
   * Send a text message to an open conversation.
   * Returns the message so the caller can render it immediately
   * (sender doesn't wait for store echo).
   * @param {string} conversationId - Conversation ID
   * @param {string} text - Message text
   * @returns {Promise<Object>} Validated message object
   */
  async send(conversationId, text) {
    if (!this.conversations.has(conversationId)) {
      throw new Error(`No open conversation: ${conversationId}`);
    }

    if (!text || typeof text !== 'string') {
      throw new Error('Message text must be a string');
    }

    const message = createTextMessage(text);
    await this._writeAndCache(conversationId, message);
    this._touchConversation(conversationId);
    this.emit('message:sent', { conversationId, message });
    return message;
  }

  /**
   * Send a file to an open conversation.
   * Handles image compression and base64 encoding before writing.
   * @param {string} conversationId - Conversation ID
   * @param {File} file - File to send
   * @returns {Promise<Object>} Validated message object
   */
  async sendFile(conversationId, file) {
    if (!this.conversations.has(conversationId)) {
      throw new Error(`No open conversation: ${conversationId}`);
    }

    // Compress images (base64 adds ~33% overhead)
    if (file.type.startsWith('image/')) {
      const compressed = await compressImage(file);
      if (compressed) {
        file = compressed;
      } else if (file.size > MAX_FILE_SIZE) {
        throw new Error(
          `Image too large to compress under ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
        );
      }
    } else if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
      );
    }

    const base64 = await fileToBase64(file);
    const message = createFileMessage({
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      data: base64,
    });

    await this._writeAndCache(conversationId, message);
    this._touchConversation(conversationId);
    this.emit('message:sent', { conversationId, message });

    return message;
  }

  /**
   * Mark a conversation as read
   * @param {string} conversationId - Conversation ID
   */
  async markAsRead(conversationId) {
    if (!this.conversations.has(conversationId)) {
      throw new Error(`No open conversation: ${conversationId}`);
    }

    return this.store.markAsRead(conversationId);
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

    return this.store.addReaction(conversationId, messageId, type);
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

    return this.store.removeReaction(conversationId, messageId, type);
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
    return this.store.getUnreadCount(conversationId);
  }

  listenToUnreadCount(conversationId, onCountChange, onMessageRead) {
    return this.store.onUnreadChange(
      conversationId,
      onCountChange,
      onMessageRead,
    );
  }

  /**
   * Send an event message (e.g. missed call, rejected call).
   * @param {string} conversationId - Conversation ID
   * @param {string} eventType - Event type
   * @param {Object} [details] - Event-specific details
   * @param {Object} [overrides] - Optional field overrides (e.g. { from })
   */
  async sendEventMessage(
    conversationId,
    eventType,
    details = {},
    overrides = {},
  ) {
    const message = createEventMessage(eventType, details, overrides);
    await this._writeAndCache(conversationId, message);
  }
}

export const messagingController = new MessagingController(
  new RTDBMessageStore(),
);
