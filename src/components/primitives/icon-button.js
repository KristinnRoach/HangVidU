// src/components/primitives/icon-button.js

// Primitive icon button component using createComponent
// Props:
// - title: string (button title/tooltip)
// - iconHtml: string (raw HTML for icon, e.g., '<i class="fa fa-phone"></i>')
// - disabledAttr: '' | 'disabled' (use 'disabled' to disable the button)
// - id: optional id attribute
// - btnClass: CSS class(es) for styling
// - onClick: optional click handler

import createComponent from '../../utils/dom/component.js';

export function createIconButton({
  title = '',
  iconHtml = '',
  disabledAttr = '',
  id = '',
  btnClass = 'chat-btn',
  onClick = null,
  parent = null,
} = {}) {
  const template = `
      <button id="${'${'}id${'}'}" class="${'${'}btnClass${'}'}" title="${'${'}title${'}'}" ${'${'}disabledAttr${'}'} onclick="handleClick">
        ${'${'}iconHtml${'}'}
      </button>
    `;

  return createComponent({
    initialProps: { title, iconHtml, disabledAttr, id, btnClass },
    template,
    handlers: {
      handleClick: onClick,
    },
    parent,
  });
}

export default createIconButton;
