import createComponent from '../../utils/dom/component.js';

/**
 * Generic notification factory using createComponent.
 * Provides sensible defaults for notification-style components.
 * @param {Object} options - Configuration options
 * @param {string} options.template - HTML template for notification content
 * @param {Object} options.handlers - Event handlers map
 * @param {string} [options.className='notification'] - CSS class for the notification
 * @param {HTMLElement} [options.parent=document.body] - Parent element to append to
 * @param {Object} [options.initialProps={}] - Initial props for the component
 * @returns {HTMLElement} The notification component with dispose method
 */
export function createNotification({
  template,
  handlers = {},
  className = 'notification',
  parent = document.body,
  initialProps = {},
  ...otherOptions
}) {
  return createComponent({
    template,
    handlers,
    className,
    parent,
    initialProps,
    containerTag: 'div',
    autoAppend: false, // Manager will handle appending
    ...otherOptions,
  });
}
