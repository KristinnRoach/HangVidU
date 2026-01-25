// src/messaging/reactions/ReactionManager.js
// Core reaction management logic with per-user tracking

import { REACTION_CONFIG, getReactionEmoji } from './ReactionConfig.js';

/**
 * ReactionManager - Manages reactions for messages with per-user tracking
 *
 * Responsibilities:
 * - Track reactions per message per user
 * - Add/remove reactions
 * - Provide reaction data for rendering
 *
 * Design principles:
 * - Data-focused: manages reaction state, not UI
 * - Per-user tracking: supports group chats and accurate toggles
 * - Backward compatible: getReactions() returns counts for UI
 */
export class ReactionManager {
  constructor() {
    // Map of messageId -> { reactionType -> Set<userId> }
    this.reactions = new Map();
  }

  /**
   * Add a reaction to a message for a specific user
   * @param {string} messageId - Unique identifier for the message
   * @param {string} reactionType - Type of reaction (e.g., 'heart')
   * @param {string} userId - User adding the reaction
   * @returns {Object} Updated reaction counts { reactionType: count }
   */
  addReaction(messageId, reactionType = REACTION_CONFIG.defaultReaction, userId) {
    if (!messageId) {
      throw new Error('messageId is required');
    }

    // Get or create reactions for this message
    if (!this.reactions.has(messageId)) {
      this.reactions.set(messageId, {});
    }

    const messageReactions = this.reactions.get(messageId);

    // Get or create Set for this reaction type
    if (!messageReactions[reactionType]) {
      messageReactions[reactionType] = new Set();
    }

    // Add userId to the set (if provided)
    if (userId) {
      messageReactions[reactionType].add(userId);
    } else {
      // Legacy fallback: generate a unique placeholder
      messageReactions[reactionType].add(`_anon_${Date.now()}_${Math.random()}`);
    }

    return this.getReactions(messageId);
  }

  /**
   * Remove a reaction from a message for a specific user
   * @param {string} messageId - Unique identifier for the message
   * @param {string} reactionType - Type of reaction to remove
   * @param {string} userId - User removing the reaction
   * @returns {Object} Updated reaction counts { reactionType: count }
   */
  removeReaction(messageId, reactionType = REACTION_CONFIG.defaultReaction, userId) {
    if (!messageId) {
      throw new Error('messageId is required');
    }

    const messageReactions = this.reactions.get(messageId);
    if (!messageReactions) {
      return {};
    }

    const userSet = messageReactions[reactionType];
    if (!userSet || userSet.size === 0) {
      return this.getReactions(messageId);
    }

    // Remove userId from the set
    if (userId) {
      userSet.delete(userId);
    } else {
      // Legacy fallback: remove one arbitrary entry (backward compat with count-based API)
      console.debug('[ReactionManager] removeReaction called without userId - using legacy fallback');
      const firstEntry = userSet.values().next().value;
      if (firstEntry) {
        userSet.delete(firstEntry);
      }
    }

    // Remove entry if set is empty
    if (userSet.size === 0) {
      delete messageReactions[reactionType];
    }

    // Clean up if no reactions left
    if (Object.keys(messageReactions).length === 0) {
      this.reactions.delete(messageId);
    }

    return this.getReactions(messageId);
  }

  /**
   * Check if a user has a specific reaction on a message
   * @param {string} messageId - Unique identifier for the message
   * @param {string} reactionType - Type of reaction
   * @param {string} userId - User to check
   * @returns {boolean} True if user has this reaction
   */
  hasUserReaction(messageId, reactionType, userId) {
    const messageReactions = this.reactions.get(messageId);
    if (!messageReactions || !messageReactions[reactionType]) {
      return false;
    }
    return messageReactions[reactionType].has(userId);
  }

  /**
   * Get the reaction type a user has on a message (or null if none)
   * @param {string} messageId - Unique identifier for the message
   * @param {string} userId - User to check
   * @returns {string|null} Reaction type or null
   */
  getUserReactionType(messageId, userId) {
    const messageReactions = this.reactions.get(messageId);
    if (!messageReactions) {
      return null;
    }

    for (const [type, userSet] of Object.entries(messageReactions)) {
      if (userSet.has(userId)) {
        return type;
      }
    }
    return null;
  }

  /**
   * Get all reactions for a message as counts (backward compatible)
   * @param {string} messageId - Unique identifier for the message
   * @returns {Object} Reaction data { reactionType: count }
   */
  getReactions(messageId) {
    const messageReactions = this.reactions.get(messageId);
    if (!messageReactions) {
      return {};
    }

    // Convert Sets to counts
    const counts = {};
    for (const [type, userSet] of Object.entries(messageReactions)) {
      counts[type] = userSet.size;
    }
    return counts;
  }

  /**
   * Sync reaction state from remote data
   * @param {string} messageId - Unique identifier for the message
   * @param {Object} reactions - Remote reactions { type: [userIds] }
   */
  syncFromRemote(messageId, reactions) {
    if (!messageId) {
      throw new Error('messageId is required');
    }

    // Clear existing reactions for this message
    this.reactions.delete(messageId);

    if (!reactions || Object.keys(reactions).length === 0) {
      return;
    }

    // Rebuild from remote data
    const messageReactions = {};
    for (const [type, users] of Object.entries(reactions)) {
      if (Array.isArray(users) && users.length > 0) {
        messageReactions[type] = new Set(users);
      }
    }

    if (Object.keys(messageReactions).length > 0) {
      this.reactions.set(messageId, messageReactions);
    }
  }

  /**
   * Check if a message has any reactions
   * @param {string} messageId - Unique identifier for the message
   * @returns {boolean} True if message has reactions
   */
  hasReactions(messageId) {
    const messageReactions = this.reactions.get(messageId);
    return !!(messageReactions && Object.keys(messageReactions).length > 0);
  }

  /**
   * Get reaction count for a specific reaction type
   * @param {string} messageId - Unique identifier for the message
   * @param {string} reactionType - Type of reaction
   * @returns {number} Count of reactions
   */
  getReactionCount(messageId, reactionType) {
    const messageReactions = this.reactions.get(messageId);
    if (!messageReactions || !messageReactions[reactionType]) {
      return 0;
    }
    return messageReactions[reactionType].size;
  }

  /**
   * Clear all reactions for a message
   * @param {string} messageId - Unique identifier for the message
   */
  clearReactions(messageId) {
    this.reactions.delete(messageId);
  }

  /**
   * Clear all reactions (useful for cleanup/testing)
   */
  clearAll() {
    this.reactions.clear();
  }
}
