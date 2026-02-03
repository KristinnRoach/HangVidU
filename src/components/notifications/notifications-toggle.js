import createComponent from '../../utils/dom/component.js';

/**
 * Creates a notifications toggle button that shows/hides based on notification count.
 * Uses CSS anchor positioning for notification panels.
 * @param {Object} options - Configuration
 * @param {HTMLElement} options.parent - Parent element to append to
 * @param {Object} [options.manager] - Notification manager instance (for default toggle behavior)
 * @param {Function} [options.onClick] - Optional click handler (overrides default toggle behavior)
 * @returns {HTMLElement} Component with methods: show(), hide(), setUnread(count), setManager(manager)
 */
export function createNotificationsToggle({
  parent,
  manager = null,
  onClick = null,
  hideWhenAllRead = false,
} = {}) {
  let notificationManager = manager;

  const component = createComponent({
    initialProps: {
      unreadCount: 0,
      isHidden: true,
    },
    template: `
      <button
        class="notifications-toggle-btn"
        title="Notifications"
        onclick="handleClick"
      >
        <i class="fa fa-bell"></i>
        <span class="notification-badge">
          [[unreadCount]]
        </span>
      </button>
    `,
    handlers: {
      handleClick: () => {
        // Custom onClick takes precedence, otherwise use default toggle behavior
        if (onClick) {
          onClick();
        } else if (notificationManager) {
          notificationManager.toggleList();
        }
      },
    },
    className: 'notifications-toggle-container',
    parent,
  });

  // Manually control badge visibility based on unreadCount
  let initialBadge = component.querySelector('.notification-badge');
  if (initialBadge) {
    initialBadge.style.display = 'none'; // Initially hidden
  }

  component.onPropUpdated('unreadCount', (count) => {
    // Re-query badge each time since re-renders create new elements
    const badge = component.querySelector('.notification-badge');
    if (badge) {
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  });

  // Helper methods
  component.show = () => {
    component.isHidden = false;
    component.style.display = 'block';
  };

  component.hide = () => {
    component.isHidden = true;
    component.style.display = 'none';
  };

  component.setUnread = (count) => {
    component.unreadCount = count;
    if (count > 0) {
      component.show();
    } else {
      hideWhenAllRead && component.hide();
    }
  };

  component.setManager = (manager) => {
    notificationManager = manager;
  };

  return component;
}
