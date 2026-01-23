// src/messaging/reactions/ReactionConfig.js
// Configurable reaction types and settings

/**
 * Default reaction types available in the application
 * Can be extended or customized as needed
 */
export const DEFAULT_REACTIONS = {
  heart: '❤️',
  // Placeholder for future reactions - easy to extend
  // thumbsUp: '👍',
  // laugh: '😂',
  // surprise: '😮',
};

/**
 * Configuration for reaction behavior
 */
export const REACTION_CONFIG = {
  // Double-tap detection settings
  doubleTapDelay: 300, // milliseconds between taps to count as double-tap
  
  // Default reaction type for double-tap
  defaultReaction: 'heart',
  
  // Maximum reactions per message (0 = unlimited)
  maxReactionsPerMessage: 0,
  
  // Enable/disable reaction animations
  enableAnimations: true,
};

/**
 * Get the emoji for a reaction type
 * @param {string} reactionType - The reaction type key
 * @returns {string} The emoji for the reaction type
 */
export function getReactionEmoji(reactionType) {
  return DEFAULT_REACTIONS[reactionType] || DEFAULT_REACTIONS.heart;
}

/**
 * Get all available reaction types
 * @returns {Object} Object mapping reaction types to emojis
 */
export function getAvailableReactions() {
  return { ...DEFAULT_REACTIONS };
}
