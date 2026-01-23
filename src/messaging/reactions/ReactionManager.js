// src/messaging/reactions/ReactionManager.js
// Core reaction management logic

import { REACTION_CONFIG, getReactionEmoji } from './ReactionConfig.js';

/**
 * ReactionManager - Manages reactions for messages
 * 
 * Responsibilities:
 * - Track reactions per message
 * - Add/remove reactions
 * - Provide reaction data for rendering
 * 
 * Design principles:
 * - Data-focused: manages reaction state, not UI
 * - Simple API: easy to use from UI layer
 * - Extensible: easy to add new reaction types
 */
export class ReactionManager {
  constructor() {
    // Map of messageId -> { reactionType -> count }
    this.reactions = new Map();
  }

  /**
   * Add a reaction to a message
   * @param {string} messageId - Unique identifier for the message
   * @param {string} reactionType - Type of reaction (e.g., 'heart')
   * @returns {Object} Updated reaction data for the message
   */
  addReaction(messageId, reactionType = REACTION_CONFIG.defaultReaction) {
    if (!messageId) {
      throw new Error('messageId is required');
    }

    // Get or create reactions for this message
    if (!this.reactions.has(messageId)) {
      this.reactions.set(messageId, {});
    }

    const messageReactions = this.reactions.get(messageId);
    
    // Increment count for this reaction type
    messageReactions[reactionType] = (messageReactions[reactionType] || 0) + 1;

    return this.getReactions(messageId);
  }

  /**
   * Remove a reaction from a message
   * @param {string} messageId - Unique identifier for the message
   * @param {string} reactionType - Type of reaction to remove
   * @returns {Object} Updated reaction data for the message
   */
  removeReaction(messageId, reactionType = REACTION_CONFIG.defaultReaction) {
    if (!messageId) {
      throw new Error('messageId is required');
    }

    const messageReactions = this.reactions.get(messageId);
    if (!messageReactions) {
      return {};
    }

    // Decrement count
    if (messageReactions[reactionType] > 0) {
      messageReactions[reactionType]--;
      
      // Remove entry if count reaches 0
      if (messageReactions[reactionType] === 0) {
        delete messageReactions[reactionType];
      }
    }

    // Clean up if no reactions left
    if (Object.keys(messageReactions).length === 0) {
      this.reactions.delete(messageId);
    }

    return this.getReactions(messageId);
  }

  /**
   * Get all reactions for a message
   * @param {string} messageId - Unique identifier for the message
   * @returns {Object} Reaction data { reactionType: count }
   */
  getReactions(messageId) {
    return this.reactions.get(messageId) || {};
  }

  /**
   * Check if a message has any reactions
   * @param {string} messageId - Unique identifier for the message
   * @returns {boolean} True if message has reactions
   */
  hasReactions(messageId) {
    const reactions = this.reactions.get(messageId);
    return !!(reactions && Object.keys(reactions).length > 0);
  }

  /**
   * Get reaction count for a specific reaction type
   * @param {string} messageId - Unique identifier for the message
   * @param {string} reactionType - Type of reaction
   * @returns {number} Count of reactions
   */
  getReactionCount(messageId, reactionType) {
    const messageReactions = this.reactions.get(messageId);
    return messageReactions ? (messageReactions[reactionType] || 0) : 0;
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
