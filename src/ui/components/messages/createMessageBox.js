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
  const ua =
    typeof navigator === 'undefined'
      ? ''
      : navigator.userAgent || navigator.vendor || '';
  const isIOS =
    (/iPad|iPhone|iPod/.test(ua) ||
      (/Macintosh/.test(ua) &&
        typeof navigator.maxTouchPoints === 'number' &&
        navigator.maxTouchPoints > 1)) &&
    !window.MSStream;
  const messagesBoxContainer = document.createElement('div');
  messagesBoxContainer.innerHTML = `
    <div id="messages-box" class="messages-box hidden">
      
      <div id="messages"></div>
    

      <form id="messages-form" class="input-bar">

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

  if (isIOS) {
    let lockedScrollY = 0;
    let viewportSyncActive = false;
    let viewportSyncFrame = 0;

    const syncToVisualViewport = () => {
      const vv = window.visualViewport;
      if (!vv || !viewportSyncActive) return;

      const margin = 16;
      const width = Math.max(280, vv.width - margin * 2);
      const height = Math.max(240, vv.height - margin * 2);

      messagesBox.style.top = `${Math.round(vv.offsetTop + margin)}px`;
      messagesBox.style.left = `${Math.round(vv.offsetLeft + margin)}px`;
      messagesBox.style.right = 'auto';
      messagesBox.style.bottom = 'auto';
      messagesBox.style.width = `${Math.round(width)}px`;
      messagesBox.style.maxWidth = `${Math.round(width)}px`;
      messagesBox.style.height = `${Math.round(height)}px`;
      messagesBox.style.maxHeight = `${Math.round(height)}px`;

      if (Math.abs(window.scrollY - lockedScrollY) > 1) {
        window.scrollTo(0, lockedScrollY);
      }
    };

    const scheduleViewportSync = () => {
      if (!viewportSyncActive || viewportSyncFrame) return;
      viewportSyncFrame = requestAnimationFrame(() => {
        viewportSyncFrame = 0;
        syncToVisualViewport();
      });
    };

    const stopViewportSync = () => {
      viewportSyncActive = false;
      if (viewportSyncFrame) {
        cancelAnimationFrame(viewportSyncFrame);
        viewportSyncFrame = 0;
      }
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          'resize',
          scheduleViewportSync,
        );
        window.visualViewport.removeEventListener(
          'scroll',
          scheduleViewportSync,
        );
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      messagesBox.style.top = '';
      messagesBox.style.left = '';
      messagesBox.style.right = '';
      messagesBox.style.bottom = '';
      messagesBox.style.width = '';
      messagesBox.style.maxWidth = '';
      messagesBox.style.height = '';
      messagesBox.style.maxHeight = '';
      window.scrollTo(0, lockedScrollY);
    };

    messagesInput.addEventListener('focus', () => {
      lockedScrollY = window.scrollY;
      viewportSyncActive = true;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      if (window.visualViewport) {
        window.visualViewport.addEventListener(
          'resize',
          scheduleViewportSync,
        );
        window.visualViewport.addEventListener(
          'scroll',
          scheduleViewportSync,
        );
      }
      scheduleViewportSync();
    });

    messagesInput.addEventListener('blur', () => {
      requestAnimationFrame(stopViewportSync);
    });
  }

  return {
    messagesBoxContainer,
    messagesBox,
    messagesMessages,
    messagesForm,
    messagesInput,
    resetInputHeight,
  };
}
