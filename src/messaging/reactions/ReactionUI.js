// src/messaging/reactions/ReactionUI.js
// UI rendering and interaction handling for reactions

import {
  REACTION_CONFIG,
  getReactionEmoji,
  getAvailableReactions,
} from './ReactionConfig.js';

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
    this.longPressTimers = new Map(); // messageElement -> timeout id
    this.activePicker = null; // Currently open picker element
    this.activePickerMessageElement = null; // Message element that picker belongs to
  }

  /**
   * Enable reaction interactions on a message element
   * - Double-tap: adds default reaction (heart)
   * - Long-press: shows reaction picker
   * @param {HTMLElement} messageElement - The message DOM element
   * @param {string} messageId - Unique identifier for the message
   * @param {Function} onReactionChange - Async callback(reactionType, messageElement, messageId) when reaction is toggled
   */
  enableDoubleTap(messageElement, messageId, onReactionChange) {
    if (!messageElement || !messageId) {
      console.warn('[ReactionUI] Invalid parameters for enableDoubleTap');
      return;
    }

    const isTouchDevice = 'ontouchstart' in window;

    // --- Double-tap detection ---
    const tapEvent = isTouchDevice ? 'touchend' : 'click';

    const handleTap = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        return;
      }

      const now = Date.now();
      const lastTap = this.doubleTapTimers.get(messageElement);

      if (lastTap && now - lastTap < REACTION_CONFIG.doubleTapDelay) {
        e.preventDefault();
        this.handleDoubleTap(messageElement, messageId, onReactionChange);
        this.doubleTapTimers.delete(messageElement);
      } else {
        this.doubleTapTimers.set(messageElement, now);
      }
    };

    // --- Long-press detection ---
    const startLongPress = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        return;
      }

      const timerId = setTimeout(() => {
        this.showPicker(messageElement, messageId, onReactionChange);
      }, REACTION_CONFIG.longPressDelay || 500);

      this.longPressTimers.set(messageElement, timerId);
    };

    const cancelLongPress = () => {
      const timerId = this.longPressTimers.get(messageElement);
      if (timerId) {
        clearTimeout(timerId);
        this.longPressTimers.delete(messageElement);

        // Only re-enable selection if picker wasn't shown (cancelled early)
        // If picker was shown, hidePicker() will re-enable selection
        if (!this.activePicker) {
          messageElement.style.userSelect = '';
          messageElement.style.webkitUserSelect = '';
        }
      }
    };

    // Attach event listeners
    messageElement.addEventListener(tapEvent, handleTap, { passive: false });

    if (isTouchDevice) {
      messageElement.addEventListener('touchstart', startLongPress, {
        passive: true,
      });
      messageElement.addEventListener('touchend', cancelLongPress, {
        passive: true,
      });
      messageElement.addEventListener('touchmove', cancelLongPress, {
        passive: true,
      });
      messageElement.addEventListener('touchcancel', cancelLongPress, {
        passive: true,
      });
    } else {
      messageElement.addEventListener('mousedown', startLongPress);
      messageElement.addEventListener('mouseup', cancelLongPress);
      messageElement.addEventListener('mouseleave', cancelLongPress);
    }

    // Store cleanup function
    messageElement._reactionCleanup = () => {
      messageElement.removeEventListener(tapEvent, handleTap);
      if (isTouchDevice) {
        messageElement.removeEventListener('touchstart', startLongPress);
        messageElement.removeEventListener('touchend', cancelLongPress);
        messageElement.removeEventListener('touchmove', cancelLongPress);
        messageElement.removeEventListener('touchcancel', cancelLongPress);
      } else {
        messageElement.removeEventListener('mousedown', startLongPress);
        messageElement.removeEventListener('mouseup', cancelLongPress);
        messageElement.removeEventListener('mouseleave', cancelLongPress);
      }
      this.doubleTapTimers.delete(messageElement);
      cancelLongPress();
    };
  }

  /**
   * Handle double-tap on a message
   * @param {HTMLElement} messageElement - The message DOM element
   * @param {string} messageId - Unique identifier for the message
   * @param {Function} onReactionChange - Async callback to handle toggle logic
   */
  async handleDoubleTap(messageElement, messageId, onReactionChange) {
    const reactionType = REACTION_CONFIG.defaultReaction;

    // Delegate to callback which has access to session/transport for checking user's reaction state
    if (onReactionChange) {
      await onReactionChange(reactionType, messageElement, messageId);
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
      // Prefer to attach reactions to the message bubble (`.message-text`) so
      // they position relative to the bubble instead of the full-width p.
      const textContainer = messageElement.querySelector('.message-text');
      if (textContainer) {
        textContainer.appendChild(reactionContainer);
      } else {
        messageElement.appendChild(reactionContainer);
      }
    }

    // Clear existing reactions
    reactionContainer.innerHTML = '';

    // Check if there are any reactions with count > 0
    const hasActiveReactions = Object.values(reactions).some(
      (count) => count > 0,
    );

    if (!hasActiveReactions) {
      reactionContainer.style.display = 'none';
      return;
    }

    reactionContainer.style.display = '';

    // Render each reaction type (just show emoji, no count for 1:1 chats)
    for (const [reactionType, count] of Object.entries(reactions)) {
      if (count > 0) {
        const reactionBadge = this.createReactionBadge(reactionType);
        reactionContainer.appendChild(reactionBadge);
      }
    }
  }

  /**
   * Create a reaction badge element
   * @param {string} reactionType - Type of reaction
   * @returns {HTMLElement} The reaction badge element
   */
  createReactionBadge(reactionType) {
    const badge = document.createElement('span');
    badge.className = 'reaction-badge';
    badge.dataset.reactionType = reactionType;
    badge.textContent = getReactionEmoji(reactionType);
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
   * Show reaction picker near a message
   * @param {HTMLElement} messageElement - The message DOM element
   * @param {string} messageId - Unique identifier for the message
   * @param {Function} onReactionChange - Callback when reaction is selected
   */
  showPicker(messageElement, messageId, onReactionChange) {
    // Close any existing picker
    this.hidePicker();

    const picker = document.createElement('div');
    picker.className = 'reaction-picker';

    const reactions = getAvailableReactions();
    for (const [type, emoji] of Object.entries(reactions)) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'reaction-picker-btn';
      btn.textContent = emoji;
      btn.dataset.reactionType = type;

      btn.addEventListener('click', async (e) => {
        e.stopPropagation();

        // Delegate to callback (same pattern as double-tap)
        if (onReactionChange) {
          await onReactionChange(type, messageElement, messageId);
        }

        this.hidePicker();
      });

      picker.appendChild(btn);
    }

    // Position picker near the message
    const rect = messageElement.getBoundingClientRect();
    picker.style.position = 'fixed';
    picker.style.left = `${rect.left + rect.width / 2}px`;
    picker.style.top = `${rect.top - 8}px`;

    document.body.appendChild(picker);
    this.activePicker = picker;
    this.activePickerMessageElement = messageElement; // Track which message this picker belongs to

    // Close picker when clicking outside
    const closeOnOutsideClick = (e) => {
      if (!picker.contains(e.target)) {
        this.hidePicker();
        document.removeEventListener('click', closeOnOutsideClick, true);
      }
    };
    // Delay to avoid immediate close from the long-press release
    setTimeout(() => {
      document.addEventListener('click', closeOnOutsideClick, true);
    }, 0);
  }

  /**
   * Hide the active reaction picker
   */
  hidePicker() {
    if (this.activePicker) {
      this.activePicker.remove();
      this.activePicker = null;

      // Re-enable text selection on the message element
      if (this.activePickerMessageElement) {
        this.activePickerMessageElement.style.userSelect = '';
        this.activePickerMessageElement.style.webkitUserSelect = '';
        this.activePickerMessageElement = null;
      }
    }
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
