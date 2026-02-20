import { t, onLocaleChange } from '../../../i18n/index.js';
import { initIcons } from '../../icons.js';

/**
 * Creates the messages box DOM structure and initializes textarea auto-grow behavior.
 * Appends the box to document.body and returns references to key elements.
 * Handles virtual keyboard overlay and field-sizing CSS property support.
 *
 * @returns {Object} DOM element references
 * @returns {HTMLElement} .messagesBoxContainer - Root container div
 * @returns {HTMLElement} .messagesBox - The #messages-box main container
 * @returns {HTMLElement} .messagesMessages - The #messages div for message display
 * @returns {HTMLElement} .messagesForm - The #messages-form submit form
 * @returns {HTMLElement} .messagesInput - The #messages-input textarea
 * @returns {Function|null} .resetInputHeight - Function to reset textarea height, or null if not needed
 */
export function createMessageBox() {
  const messagesBoxContainer = document.createElement('div');
  messagesBoxContainer.innerHTML = `
    <div id="messages-box" class="messages-box hidden">
      
      <div id="messages"></div>
    

      <form id="messages-form">

        <textarea id="messages-input" placeholder="" rows="1"></textarea>

        <div class="message-attachments">
          <input type="file" id="file-input" style="display: none" />
          <button type="button" id="attach-file-btn" title="">
            <i data-lucide="paperclip" aria-hidden="true"></i>
          </button>
        </div>
        
        <button type="submit" class="send-button" aria-label="${t('shared.send')}">
          <i data-lucide="send" aria-hidden="true"></i>
          <span class="send-button__label"></span>
        </button>
      </form>

    </div>
  `;
  document.body.appendChild(messagesBoxContainer);
  initIcons(messagesBoxContainer);

  const messagesBox = messagesBoxContainer.querySelector('#messages-box');
  const messagesMessages = messagesBoxContainer.querySelector('#messages');
  const messagesForm = messagesBoxContainer.querySelector('#messages-form');
  const messagesInput = messagesBoxContainer.querySelector('#messages-input');
  const attachFileBtn = messagesBoxContainer.querySelector('#attach-file-btn');
  const submitBtn = messagesBoxContainer.querySelector('.send-button');

  // Update i18n attributes on locale change
  const updateI18n = () => {
    if (messagesInput) messagesInput.placeholder = t('message.placeholder');
    if (attachFileBtn) attachFileBtn.title = t('message.attach');
    if (submitBtn) submitBtn.setAttribute('aria-label', t('shared.send'));
  };

  // Set initial values
  updateI18n();

  // Subscribe to locale changes
  onLocaleChange(updateI18n);

  // Prevent viewport resize/shift when virtual keyboard appears on mobile
  if ('virtualKeyboard' in navigator) {
    navigator.virtualKeyboard.overlaysContent = true;
  }

  // Check for native field-sizing support (Chrome/Edge 123+)
  const supportsFieldSizing = CSS.supports?.('field-sizing', 'content');

  // JS fallback for auto-grow textarea (browsers without field-sizing)
  let resetInputHeight = null;
  if (
    messagesInput &&
    messagesInput.tagName === 'TEXTAREA' &&
    !supportsFieldSizing
  ) {
    const adjustInputHeight = () => {
      messagesInput.style.height = 'auto';
      messagesInput.style.height = `${messagesInput.scrollHeight}px`;
    };
    messagesInput.addEventListener('input', adjustInputHeight, {
      passive: true,
    });
    // Expose reset function for use after clearing input
    resetInputHeight = () => {
      messagesInput.style.height = '';
    };
    // Initialize height after layout settles
    requestAnimationFrame(() => {
      requestAnimationFrame(adjustInputHeight);
    });
  }

  // TODO: Proper fix for autoscroll on mobile when THIS specific text input is focused (keyboard open)
  // if (isMobileDevice()) {
  //   messagesInput.addEventListener('focus', () => {
  //     document.body.style.overflow = 'hidden';
  //     document.body.style.position = 'fixed';
  //     document.body.style.width = '100%';
  //   });

  //   messagesInput.addEventListener('blur', () => {
  //     document.body.style.overflow = '';
  //     document.body.style.position = '';
  //     document.body.style.width = '';
  //   });
  // }

  return {
    messagesBoxContainer,
    messagesBox,
    messagesMessages,
    messagesForm,
    messagesInput,
    resetInputHeight,
  };
}
