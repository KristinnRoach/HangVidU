// src/components/messages/createMessageToggle.js
// Reusable message toggle button with unread badge

import createComponent from '../../../ui/component-system/component.js';

/**
 * Creates a reusable message toggle button with badge functionality
 * @param {Object} options
 * @param {HTMLElement} options.parent - Where to append the toggle
 * @param {Function} options.onToggle - Callback when toggle is clicked
 * @param {string} [options.icon='💬'] - Icon to display
 * @param {number} [options.initialUnreadCount=0] - Initial badge count
 * @param {string} [options.id] - Optional ID for the toggle button (for CSS anchor positioning)
 * @returns {Object} API with methods to control the toggle
 */
export function createMessageToggle({
  parent,
  onToggle,
  icon = '💬',
  initialUnreadCount = 0,
  id = null,
  startHidden = false,
} = {}) {
  if (!parent) {
    console.error('createMessageToggle: parent element is required');
    return null;
  }

  if (typeof onToggle !== 'function') {
    console.error('createMessageToggle: onToggle callback is required');
    return null;
  }

  // Create the toggle button component
  const toggleContainer = createComponent({
    initialProps: {
      icon,
      unreadCount: initialUnreadCount,
    },
    // HENDA: <div class="messages-toggle-btn"${id ? ` id="${id}"` : ''}>
    template: `
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          [[icon]]
          <span class="notification-badge">
            [[unreadCount]]
          </span>
        </button>
      </div>
    `,
    handlers: {
      handleToggle: (e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      },
    },
    className: 'messages-toggle-container' + (startHidden ? ' hidden' : ''),
    autoAppend: false,
  });

  // Prefer assigning attributes via DOM APIs rather than interpolating into template
  if (id && toggleContainer && typeof id === 'string') {
    try {
      toggleContainer.id = id;
    } catch (e) {
      console.warn(
        'createMessageToggle: failed to set id on toggleContainer',
        e,
      );
    }
  }

  // Control badge visibility based on initial unreadCount
  let initialBadge = toggleContainer.querySelector('.notification-badge');
  if (initialBadge) {
    initialBadge.style.display = initialUnreadCount > 0 ? 'flex' : 'none';
  }

  toggleContainer.onPropUpdated('unreadCount', (count) => {
    // Re-query badge each time since re-renders create new elements
    const badge = toggleContainer.querySelector('.notification-badge');
    if (badge) {
      badge.style.display = count > 0 ? 'flex' : 'none';
    }

    // Trigger animation when count increases
    if (count > 0) {
      const btn = toggleContainer.querySelector('.messages-toggle-btn');
      if (btn) {
        btn.classList.add('new-message');
        setTimeout(() => {
          btn.classList.remove('new-message');
        }, 4000);
      }
    }
  });

  // Append to parent
  parent.appendChild(toggleContainer);

  // Public API
  return {
    element: toggleContainer,

    /**
     * Set the unread count badge
     * @param {number} count - New unread count
     */
    setUnreadCount(count) {
      let n = Number(count);
      if (!Number.isFinite(n) || n < 0) n = 0;
      toggleContainer.unreadCount = n;
    },

    /**
     * Clear the badge (set count to 0)
     */
    clearBadge() {
      // Route through setUnreadCount to ensure normalization
      this.setUnreadCount(0);
    },

    /**
     * Cleanup: remove from DOM and dispose component
     */
    cleanup() {
      // Dispose first so any onCleanup handlers run while the element
      // still exists, then ensure it's removed from the DOM.
      if (toggleContainer && typeof toggleContainer.dispose === 'function') {
        try {
          toggleContainer.dispose();
        } catch (e) {
          console.warn('createMessageToggle: error during dispose()', e);
        }
      }
      if (toggleContainer && toggleContainer.parentNode) {
        try {
          toggleContainer.parentNode.removeChild(toggleContainer);
        } catch (e) {
          /* ignored */
        }
      }
    },
  };
}
