// src/ui/components/base/button/icon-button.js

import createComponent from '../../../../ui/component-system/component.js';
import { initIcons } from '../../../icons.js';

/**
 * Creates a reactive icon button using createComponent.
 * @param {Object} options - Button configuration
 * @param {string} [options.title=''] - Button title/tooltip
 * @param {string} [options.iconHtml=''] - Raw HTML for icon (e.g., '<i class="fa fa-phone"></i>')
 * @param {string} [options.disabledAttr=''] - '' (enabled) or 'disabled' (disabled)
 * @param {string} [options.id=''] - Optional id attribute
 * @param {string} [options.btnClass='chat-btn'] - CSS class(es)
 * @param {string} [options.lucideIcon=''] - Lucide icon name (takes precedence over iconHtml)
 * @param {Function} [options.onClick=null] - Click handler
 * @param {HTMLElement} [options.parent=null] - Parent element to append to
 * @returns {HTMLElement} Component element with reactive props
 */
export function createIconButton({
  title = '',
  iconHtml = '',
  disabledAttr = '',
  id = '',
  className = '',
  lucideIcon = '',
  onClick = null,
  onMount = null,
  parent = null,
} = {}) {
  const component = createComponent({
    initialProps: { 
      title, 
      iconHtml: lucideIcon ? `<i data-lucide="${lucideIcon}"></i>` : iconHtml, 
      disabledAttr, 
      id 
    },
    template: `
      <button id="[[id]]" title="[[title]]" [[disabledAttr]] onclick="handleClick">
        [[iconHtml]]
      </button>
    `,
    className,
    handlers: {
      handleClick: onClick,
    },
    onMount: (el) => {
      initIcons(el);
      if (onMount) onMount(el);
    },
    parent,
  });

  component.onRender((props) => {
    initIcons(component);
  });

  return component;
}

export default createIconButton;
