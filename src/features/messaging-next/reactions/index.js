// src/messaging/reactions/index.js
// Main export file for reaction functionality

export { ReactionManager } from './ReactionManager.js';
export { ReactionUI } from './ReactionUI.js';
export {
  attachReactions,
  syncReactionSummaries,
} from './attachReactions.js';
export {
  DEFAULT_REACTIONS,
  REACTION_CONFIG,
  getReactionEmoji,
  getAvailableReactions,
} from './ReactionConfig.js';
