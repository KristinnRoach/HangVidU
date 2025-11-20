// src/components/design/icon-button.js
import createComponent from '../../../utils/dom/component.js';

/**
 * Creates a reactive icon button using createComponent.
 * @param {Object} options - Button configuration
 * @param {string} [options.title=''] - Button title/tooltip
 * @param {string} [options.iconHtml=''] - Raw HTML for icon (e.g., '<i class="fa fa-phone"></i>')
 * @param {string} [options.disabledAttr=''] - '' (enabled) or 'disabled' (disabled)
 * @param {string} [options.id=''] - Optional id attribute
 * @param {string} [options.btnClass='chat-btn'] - CSS class(es)
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
  onClick = null,
  onMount = null,
  parent = null,
} = {}) {
  const template = `
      <button id="${'${'}id${'}'}" title="${'${'}title${'}'}" ${'${'}disabledAttr${'}'} onclick="handleClick">
        ${'${'}iconHtml${'}'}
      </button>
    `;

  return createComponent({
    initialProps: { title, iconHtml, disabledAttr, id },
    template,
    className,
    handlers: {
      handleClick: onClick,
    },
    onMount,
    parent,
  });
}

export default createIconButton;
