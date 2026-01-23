// src/messaging/reactions/ReactionUI.js
// UI rendering and interaction handling for reactions

import { REACTION_CONFIG, getReactionEmoji } from './ReactionConfig.js';

/**
 * ReactionUI - Handles reaction UI rendering and interactions
 * 
 * Responsibilities:
 * - Render reaction display on messages
 * - Handle double-tap detection
 * - Trigger reaction animations
 * 
 * Design principles:
 * - DOM-focused: creates and manages reaction UI elements
 * - Event-driven: responds to user interactions
 * - Decoupled: works with any ReactionManager instance
 */
export class ReactionUI {
  /**
   * Create a ReactionUI instance
   * @param {ReactionManager} reactionManager - The reaction manager instance
   */
  constructor(reactionManager) {
    this.reactionManager = reactionManager;
    this.doubleTapTimers = new Map(); // messageElement -> timestamp of last tap
  }

  /**
   * Enable double-tap reactions on a message element
   * @param {HTMLElement} messageElement - The message DOM element
   * @param {string} messageId - Unique identifier for the message
   * @param {Function} onReactionChange - Callback when reaction is added/removed
   */
  enableDoubleTap(messageElement, messageId, onReactionChange) {
    if (!messageElement || !messageId) {
      console.warn('[ReactionUI] Invalid parameters for enableDoubleTap');
      return;
    }

    // Use touchend for mobile, click for desktop
    const eventType = 'ontouchstart' in window ? 'touchend' : 'click';
    
    const handleTap = (e) => {
      // Don't trigger on interactive elements (links, buttons)
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        return;
      }

      const now = Date.now();
      const lastTap = this.doubleTapTimers.get(messageElement);

      if (lastTap && (now - lastTap) < REACTION_CONFIG.doubleTapDelay) {
        // Double-tap detected!
        e.preventDefault();
        this.handleDoubleTap(messageElement, messageId, onReactionChange);
        this.doubleTapTimers.delete(messageElement);
      } else {
        // First tap or too slow
        this.doubleTapTimers.set(messageElement, now);
      }
    };

    messageElement.addEventListener(eventType, handleTap, { passive: false });
    
    // Store cleanup function on element for later removal if needed
    messageElement._reactionCleanup = () => {
      messageElement.removeEventListener(eventType, handleTap);
      this.doubleTapTimers.delete(messageElement);
    };
  }

  /**
   * Handle double-tap on a message
   * @param {HTMLElement} messageElement - The message DOM element
   * @param {string} messageId - Unique identifier for the message
   * @param {Function} onReactionChange - Callback when reaction is added
   */
  handleDoubleTap(messageElement, messageId, onReactionChange) {
    // Add reaction to manager
    const reactions = this.reactionManager.addReaction(
      messageId,
      REACTION_CONFIG.defaultReaction
    );

    // Update UI
    this.renderReactions(messageElement, messageId, reactions);

    // Show animation
    if (REACTION_CONFIG.enableAnimations) {
      this.showReactionAnimation(messageElement, REACTION_CONFIG.defaultReaction);
    }

    // Notify callback
    if (onReactionChange && typeof onReactionChange === 'function') {
      onReactionChange(reactions);
    }
  }

  /**
   * Render reaction display on a message
   * @param {HTMLElement} messageElement - The message DOM element
   * @param {string} messageId - Unique identifier for the message
   * @param {Object} reactions - Reaction data { reactionType: count }
   */
  renderReactions(messageElement, messageId, reactions) {
    // Find or create reaction container
    let reactionContainer = messageElement.querySelector('.message-reactions');
    
    if (!reactionContainer) {
      reactionContainer = document.createElement('div');
      reactionContainer.className = 'message-reactions';
      messageElement.appendChild(reactionContainer);
    }

    // Clear existing reactions
    reactionContainer.innerHTML = '';

    // Render each reaction type
    for (const [reactionType, count] of Object.entries(reactions)) {
      if (count > 0) {
        const reactionBadge = this.createReactionBadge(reactionType, count);
        reactionContainer.appendChild(reactionBadge);
      }
    }

    // Hide container if no reactions
    if (Object.keys(reactions).length === 0) {
      reactionContainer.style.display = 'none';
    } else {
      reactionContainer.style.display = '';
    }
  }

  /**
   * Create a reaction badge element
   * @param {string} reactionType - Type of reaction
   * @param {number} count - Number of reactions
   * @returns {HTMLElement} The reaction badge element
   */
  createReactionBadge(reactionType, count) {
    const badge = document.createElement('span');
    badge.className = 'reaction-badge';
    badge.dataset.reactionType = reactionType;
    
    const emoji = getReactionEmoji(reactionType);
    badge.textContent = count > 1 ? `${emoji} ${count}` : emoji;
    
    return badge;
  }

  /**
   * Show reaction animation (floating emoji)
   * @param {HTMLElement} messageElement - The message DOM element
   * @param {string} reactionType - Type of reaction
   */
  showReactionAnimation(messageElement, reactionType) {
    const emoji = getReactionEmoji(reactionType);
    const animation = document.createElement('div');
    animation.className = 'reaction-animation';
    animation.textContent = emoji;
    
    // Position relative to message
    const rect = messageElement.getBoundingClientRect();
    animation.style.position = 'fixed';
    animation.style.left = `${rect.left + rect.width / 2}px`;
    animation.style.top = `${rect.top + rect.height / 2}px`;
    
    document.body.appendChild(animation);
    
    // Remove after animation completes
    setTimeout(() => {
      animation.remove();
    }, 1000);
  }

  /**
   * Cleanup reactions for a message element
   * @param {HTMLElement} messageElement - The message DOM element
   */
  cleanup(messageElement) {
    if (messageElement._reactionCleanup) {
      messageElement._reactionCleanup();
    }
  }
}
