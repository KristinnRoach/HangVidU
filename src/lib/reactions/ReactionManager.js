// Core reaction state: aggregate counts per message, plus which key (if any)
// the local actor has selected.

import { DEFAULT_CONFIG } from './ReactionConfig.js';

/**
 * ReactionManager - Manages aggregate reaction counts for messages and the
 * local actor's currently-selected reaction key.
 *
 * Design principles:
 * - Data-focused: manages reaction state, not UI
 * - One reaction per actor: selecting a new key replaces the previous one
 * - getReactions() returns counts for UI; remote aggregates hydrate directly
 *   via syncFromSummaries()
 */
export class ReactionManager {
  constructor(config = DEFAULT_CONFIG) {
    this.config = config;
    // Map of messageId -> { counts: Object.create(null) keyed by reactionType, myKey: string|null }
    this.reactions = new Map();
  }

  /**
   * Select a reaction for a message, replacing the actor's previous one.
   * @param {string} messageId - Unique identifier for the message
   * @param {string} reactionType - Type of reaction (e.g., 'heart')
   * @returns {Object} Updated reaction counts { reactionType: count }
   */
  addReaction(messageId, reactionType = this.config.defaultReaction) {
    if (!messageId) {
      throw new Error('messageId is required');
    }

    const entry = this.reactions.get(messageId) ?? {
      counts: Object.create(null),
      myKey: null,
    };

    if (entry.myKey === reactionType) {
      return this.getReactions(messageId);
    }

    if (entry.myKey) {
      entry.counts[entry.myKey] = Math.max(
        0,
        (entry.counts[entry.myKey] ?? 1) - 1,
      );
      if (entry.counts[entry.myKey] === 0) delete entry.counts[entry.myKey];
    }
    entry.counts[reactionType] = (entry.counts[reactionType] ?? 0) + 1;
    entry.myKey = reactionType;

    this.reactions.set(messageId, entry);
    return this.getReactions(messageId);
  }

  /**
   * Remove the local actor's reaction from a message.
   * @param {string} messageId - Unique identifier for the message
   * @returns {Object} Updated reaction counts { reactionType: count }
   */
  removeReaction(messageId) {
    if (!messageId) {
      throw new Error('messageId is required');
    }

    const entry = this.reactions.get(messageId);
    if (!entry?.myKey) {
      return this.getReactions(messageId);
    }

    entry.counts[entry.myKey] = Math.max(
      0,
      (entry.counts[entry.myKey] ?? 1) - 1,
    );
    if (entry.counts[entry.myKey] === 0) delete entry.counts[entry.myKey];
    entry.myKey = null;

    if (Object.keys(entry.counts).length === 0) {
      this.reactions.delete(messageId);
    }

    return this.getReactions(messageId);
  }

  /**
   * Get the reaction type the local actor has on a message (or null if none)
   * @param {string} messageId - Unique identifier for the message
   * @returns {string|null} Reaction type or null
   */
  getUserReactionType(messageId) {
    return this.reactions.get(messageId)?.myKey ?? null;
  }

  /**
   * Get all reactions for a message as counts
   * @param {string} messageId - Unique identifier for the message
   * @returns {Object} Reaction data { reactionType: count }
   */
  getReactions(messageId) {
    return { ...this.reactions.get(messageId)?.counts };
  }

  /**
   * Hydrate aggregate counts and the local actor's reaction from server
   * summaries (authoritative; replaces local state for the message).
   * @param {string} messageId - Unique identifier for the message
   * @param {Array<{key: string, count: number, reactedByMe: boolean}>} summaries
   */
  syncFromSummaries(messageId, summaries) {
    if (!messageId) {
      throw new Error('messageId is required');
    }

    const counts = Object.create(null);
    let myKey = null;
    for (const { key, count, reactedByMe } of summaries ?? []) {
      if (!key || count <= 0) continue;
      counts[key] = count;
      if (reactedByMe) myKey = key;
    }

    if (Object.keys(counts).length > 0) {
      this.reactions.set(messageId, { counts, myKey });
    } else {
      this.reactions.delete(messageId);
    }
  }

  /**
   * Check if a message has any reactions
   * @param {string} messageId - Unique identifier for the message
   * @returns {boolean} True if message has reactions
   */
  hasReactions(messageId) {
    const entry = this.reactions.get(messageId);
    return !!(entry && Object.keys(entry.counts).length > 0);
  }

  /**
   * Get reaction count for a specific reaction type
   * @param {string} messageId - Unique identifier for the message
   * @param {string} reactionType - Type of reaction
   * @returns {number} Count of reactions
   */
  getReactionCount(messageId, reactionType) {
    return this.reactions.get(messageId)?.counts[reactionType] ?? 0;
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
