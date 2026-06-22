// UI rendering and interaction handling for reactions

import {
  DEFAULT_CONFIG,
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
  constructor(reactionManager, config = DEFAULT_CONFIG) {
    this.reactionManager = reactionManager;
    this.config = config;
    this.activePicker = null; // Currently open picker element
    this.activePickerMessageElement = null; // Message element that picker belongs to
    this.pickerSetupTimer = null; // Pending setTimeout id for the outside-click listener
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
      // Host can redirect the container into a child (e.g. a message bubble)
      // via config.mountInto; defaults to the element itself.
      const mount = this.config.mountInto?.(messageElement) ?? messageElement;
      mount.appendChild(reactionContainer);
    }

    // Clear existing reactions
    reactionContainer.innerHTML = '';

    // Check if there are any reactions with count > 0
    const hasActiveReactions = Object.values(reactions).some(
      (count) => count > 0,
    );

    if (!hasActiveReactions) {
      reactionContainer.hidden = true;
      return;
    }

    reactionContainer.hidden = false;

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
    badge.textContent = getReactionEmoji(reactionType, this.config.reactions);
    return badge;
  }

  /**
   * Show reaction animation (floating emoji)
   * @param {HTMLElement} messageElement - The message DOM element
   * @param {string} reactionType - Type of reaction
   */
  showReactionAnimation(messageElement, reactionType) {
    const emoji = getReactionEmoji(reactionType, this.config.reactions);
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

    const reactions = getAvailableReactions(this.config.reactions);
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
          await onReactionChange(type, messageElement, messageId, 'picker');
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
    this.pickerSetupTimer = setTimeout(() => {
      this.pickerSetupTimer = null;
      const closePicker = (event) => {
        if (event.type === 'keydown' && event.key !== 'Escape') return;
        if (event.type !== 'keydown' && picker.contains(event.target)) return;
        this.hidePicker();
      };
      document.addEventListener('pointerdown', closePicker);
      document.addEventListener('keydown', closePicker);
      this.pickerCleanup = () => {
        document.removeEventListener('pointerdown', closePicker);
        document.removeEventListener('keydown', closePicker);
      };
    }, 0);
  }

  /**
   * Hide the active reaction picker
   */
  hidePicker() {
    if (this.pickerSetupTimer) {
      clearTimeout(this.pickerSetupTimer);
      this.pickerSetupTimer = null;
    }

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

    // Cleanup the outside click listener
    if (this.pickerCleanup) {
      this.pickerCleanup();
      this.pickerCleanup = null;
    }
  }
}
