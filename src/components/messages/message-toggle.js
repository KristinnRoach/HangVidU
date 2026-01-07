// src/components/messages/message-toggle.js
// Reusable message toggle button with unread badge

import createComponent from '../../utils/dom/component.js';

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
      unreadCount: initialUnreadCount,
    },
    template: `
      <div class="messages-toggle-btn"${id ? ` id="${id}"` : ''}>
        <button onclick="handleToggle">
          ${icon}
          <span class="notification-badge">
            ${'${'}unreadCount${'}'}
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
    className: 'messages-toggle-container',
    autoAppend: false,
  });

  // Control badge visibility and animation based on unreadCount
  let initialBadge = toggleContainer.querySelector('.notification-badge');
  if (initialBadge) {
    initialBadge.style.display = 'none'; // Initially hidden
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
      toggleContainer.unreadCount = count;
    },

    /**
     * Clear the badge (set count to 0)
     */
    clearBadge() {
      toggleContainer.unreadCount = 0;
    },

    /**
     * Cleanup: remove from DOM and dispose component
     */
    cleanup() {
      if (toggleContainer && toggleContainer.parentNode) {
        toggleContainer.parentNode.removeChild(toggleContainer);
      }
      toggleContainer.dispose();
    },
  };
}
