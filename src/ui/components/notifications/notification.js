import createComponent from '../../../ui/component-system/component.js';

/**
 * Template builder for notifications with optional header.
 * Renders header section only if provided.
 *
 * @param {Object} options - Configuration
 * @param {string} [options.header] - Optional HTML for header (icon/title/dismiss)
 * @param {string} options.body - HTML for body content (message/details, already rendered)
 * @param {string} options.actions - HTML for action buttons (already rendered)
 * @returns {string} Complete template HTML
 */
export function buildTemplate({ header, body, actions }) {
  return `
    <div class="notification-content">
      ${header ? `<div class="notification-header">${header}</div>` : ''}
      <div class="notification-body">
        ${body}
      </div>
      <div class="notification-actions">
        ${actions}
      </div>
    </div>
  `;
}

/**
 * Generic notification factory using createComponent.
 * Provides sensible defaults for notification-style components.
 * @param {Object} options - Configuration options
 * @param {string} options.template - HTML template for notification content
 * @param {Object} options.handlers - Event handlers map
 * @param {string} [options.className='notification'] - CSS class for the notification
 * @param {HTMLElement} [options.parent=document.body] - Parent element to append to
 * @param {Object} [options.initialProps={}] - Initial props for the component
 * @returns {HTMLElement} The notification component with dispose method and markAsRead()
 */
export function createNotification({
  template,
  handlers = {},
  className = 'notification',
  parent = document.body,
  initialProps = {},
  ...otherOptions
}) {
  const component = createComponent({
    template,
    handlers,
    className,
    parent,
    initialProps: { isRead: false, ...initialProps },
    containerTag: 'div',
    autoAppend: false, // Manager will handle appending
    ...otherOptions,
  });

  // Add markAsRead method
  component.markAsRead = () => {
    if (!component.isRead) {
      component.isRead = true;
      component.classList.remove('unread');
    }
  };

  // Set initial unread class
  if (!component.isRead) {
    component.classList.add('unread');
  }

  // Listen for isRead changes
  component.onPropUpdated('isRead', (isRead) => {
    if (isRead) {
      component.classList.remove('unread');
    } else {
      component.classList.add('unread');
    }
  });

  return component;
}
