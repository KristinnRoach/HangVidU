// Configurable reaction types and settings

/**
 * Default reaction types available in the application
 * Can be extended or customized as needed
 */
export const DEFAULT_REACTIONS = {
  heart: '❤️',
  thumbsUp: '👍',
  laugh: '😂',
};

/**
 * Default configuration for reaction behavior. Pass a partial override to
 * `createReactions(config)` to customize the emoji set or gesture timings
 * per instance instead of mutating this shared default.
 */
export const DEFAULT_CONFIG = {
  // Double-tap detection settings
  doubleTapDelay: 300, // milliseconds between taps to count as double-tap

  // Long-press detection settings
  longPressDelay: 500, // milliseconds to trigger long-press

  // Default reaction type for double-tap
  defaultReaction: 'heart',

  // Maximum reactions per message (0 = unlimited)
  maxReactionsPerMessage: 0,

  // Enable/disable reaction animations
  enableAnimations: true,

  // Available reaction types and their emoji
  reactions: DEFAULT_REACTIONS,

  // Optional: redirect the reaction container into a child of the attached
  // element (e.g. a message bubble). (element) => HTMLElement. Defaults to
  // mounting on the attached element itself.
  mountInto: null,
};

/**
 * Get the emoji for a reaction type
 * @param {string} reactionType - The reaction type key
 * @param {Record<string, string>} [reactions] - Reaction type -> emoji map
 * @returns {string} The emoji for the reaction type
 */
export function getReactionEmoji(reactionType, reactions = DEFAULT_REACTIONS) {
  return Object.hasOwn(reactions, reactionType)
    ? reactions[reactionType]
    : reactionType;
}

/**
 * Get all available reaction types
 * @param {Record<string, string>} [reactions] - Reaction type -> emoji map
 * @returns {Object} Object mapping reaction types to emojis
 */
export function getAvailableReactions(reactions = DEFAULT_REACTIONS) {
  return {
    ...(reactions && typeof reactions === 'object'
      ? reactions
      : DEFAULT_REACTIONS),
  };
}
