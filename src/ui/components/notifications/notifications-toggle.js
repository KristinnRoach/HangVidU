import createComponent from '../../../ui/component-system/component.js';
import { t, onLocaleChange } from '../../../i18n/index.js';

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
      count: 0,
      unreadCount: 0,
      isHidden: true,
    },
    template: `
      <button
        class="notifications-toggle-btn"
        title="[[t:notification.toggle]]"
        onclick="handleClick"
        data-count="[[count]]"
      >
        <i class="fa fa-bell"></i>
        <span class="notification-badge">
          [[unreadCount]]
        </span>
      </button>
    `,
    templateFns: { t: { resolve: t, onChange: onLocaleChange } },
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

  // Manually set initial state
  const initialBtn = component.querySelector('.notifications-toggle-btn');
  const initialBadge = component.querySelector('.notification-badge');

  if (initialBtn) {
    initialBtn.disabled = component.count === 0; // Disabled when no notifications exist
  }

  if (initialBadge) {
    initialBadge.style.display = 'none'; // Initially hidden
  }

  // Update badge visibility and button disabled state after every render
  // (fires on re-renders from prop changes OR locale changes)
  component.onRender((props) => {
    const badge = component.querySelector('.notification-badge');
    if (badge) {
      badge.style.display = props.unreadCount > 0 ? 'flex' : 'none';
    }

    const btn = component.querySelector('.notifications-toggle-btn');
    if (btn) {
      btn.disabled = props.count === 0; // Disabled only when list is empty
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

  component.setCount = (count) => {
    component.count = count;
  };

  component.setUnread = (unreadCount) => {
    component.unreadCount = unreadCount;
    if (unreadCount > 0) {
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
