// modal.js

import { t } from '../../i18n/index.js';

/**
 * Modern Copy Link Modal
 * Creates and shows a modal dialog for copying links
 */

// Inject styles once
let stylesInjected = false;

// Create dialog element
function createDialog(link, options) {
  const dialog = document.createElement('dialog');
  dialog.className = 'copy-link-dialog';

  const content = document.createElement('div');
  content.className = 'copy-link-dialog__content';

  // Title
  const title = document.createElement('h2');
  title.className = 'copy-link-dialog__title';
  title.textContent = options.title;
  content.appendChild(title);

  // Input container
  const inputContainer = document.createElement('div');
  inputContainer.className = 'copy-link-dialog__input-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'copy-link-dialog__input';
  input.value = link;
  input.readOnly = true;
  input.setAttribute('aria-label', t('dialog.share.link_label'));
  inputContainer.appendChild(input);
  content.appendChild(inputContainer);

  // Button group
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'copy-link-dialog__buttons';

  const copyButton = document.createElement('button');
  copyButton.className =
    'copy-link-dialog__button copy-link-dialog__button--primary';
  copyButton.textContent = options.buttonText;
  copyButton.autofocus = true;

  const cancelButton = document.createElement('button');
  cancelButton.className =
    'copy-link-dialog__button copy-link-dialog__button--secondary';
  cancelButton.textContent = options.cancelText;

  buttonGroup.appendChild(copyButton);
  buttonGroup.appendChild(cancelButton);
  content.appendChild(buttonGroup);

  // Feedback message
  const feedback = document.createElement('p');
  feedback.className = 'copy-link-dialog__feedback';
  feedback.setAttribute('aria-live', 'polite');
  content.appendChild(feedback);

  dialog.appendChild(content);

  return { dialog, input, copyButton, cancelButton, feedback };
}

/**
 * Show a modal dialog for copying a link
 * @param {string} link - The link to copy
 * @param {Object} options - Configuration options
 * @param {string} options.title - Modal title (default: "Share this link")
 * @param {string} options.buttonText - Copy button text (default: "Copy")
 * @param {string} options.cancelText - Cancel button text (default: "Cancel")
 * @param {string} options.successMessage - Success message (default: "✓ Copied to clipboard!")
 * @param {string} options.errorMessage - Error message (default: "Failed to copy. Click the link to select it manually.")
 * @param {boolean} options.autoClose - Auto-close after successful copy (default: true)
 * @param {number} options.autoCloseDelay - Delay before auto-close in ms (default: 1200)
 * @param {Function} options.onCopy - Callback after successful copy
 * @param {Function} options.onCancel - Callback when user cancels or closes without copying
 */
export function showCopyLinkModal(link, options = {}) {
  // Default options
  const config = {
    title: t('dialog.share.title'),
    buttonText: t('shared.copy'),
    cancelText: t('shared.cancel'),
    successMessage: `✓ ${t('dialog.share.copied')}`,
    errorMessage: t('dialog.share.copy_failed'),
    autoClose: true,
    autoCloseDelay: 1200,
    onCopy: null,
    onError: null,
    onCancel: null,
    onClose: null,
    ...options,
  };

  // Inject styles if needed
  injectStyles();

  // Create dialog elements
  const { dialog, input, copyButton, cancelButton, feedback } = createDialog(
    link,
    config
  );

  // Ensure dialog support
  ensureDialogSupport(dialog);

  let copied = false;

  // Handle copy
  const handleCopy = async () => {
    const success = await copyToClipboard(link, input);

    if (success) {
      copied = true;
      feedback.textContent = config.successMessage;
      feedback.classList.remove('copy-link-dialog__feedback--error');

      // Call onCopy callback
      if (config.onCopy) {
        config.onCopy(link);
      }

      // Auto-close if enabled
      if (config.autoClose) {
        setTimeout(() => {
          dialog.close();
        }, config.autoCloseDelay);
      }
    } else {
      feedback.textContent = config.errorMessage;
      feedback.classList.add('copy-link-dialog__feedback--error');

      // Make input selectable for manual copy
      input.readOnly = false;
      input.addEventListener('click', () => {
        input.select();
      });

      // Call onError callback
      if (config.onError) {
        config.onError();
      }
    }
  };

  // Event listeners
  copyButton.addEventListener('click', handleCopy);

  cancelButton.addEventListener('click', () => {
    if (config.onCancel) {
      config.onCancel();
    }
    dialog.close();
  });

  // Handle Enter key
  dialog.addEventListener('keydown', (e) => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.metaKey
    ) {
      e.preventDefault();
      handleCopy();
    }
  });

  // Cleanup on close
  dialog.addEventListener('close', () => {
    if (!copied && config.onCancel) {
      config.onCancel();
    }
    if (config.onClose) {
      config.onClose();
    }

    // Remove dialog from DOM after close animation
    setTimeout(() => {
      dialog.remove();
    }, 300);
  });

  // Add to DOM and show
  document.body.appendChild(dialog);
  dialog.showModal();

  // Return dialog instance for manual control if needed
  return dialog;
}

function injectStyles() {
  if (stylesInjected) return;

  const style = document.createElement('style');
  style.textContent = `
    .copy-link-dialog {
      border: none;
      border-radius: 12px;
      padding: 0;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      max-width: 90vw;
      width: 480px;

      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      background: #1a1a1a;
      color: #ccc;
    }

    .copy-link-dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
    }

    .copy-link-dialog__content {
      padding: 24px;
    }

    .copy-link-dialog__title {
      margin: 0 0 20px 0;
      font-size: 1.5rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .copy-link-dialog__input-container {
      margin-bottom: 20px;
    }

    .copy-link-dialog__input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      font-family: monospace;
      background-color: #f8f8f8;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    .copy-link-dialog__input:focus {
      outline: none;
      border-color: #4a90e2;
    }

    .copy-link-dialog__buttons {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .copy-link-dialog__button {
      padding: 10px 24px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .copy-link-dialog__button--primary {
      background-color: #4a90e2;
      color: white;
    }

    .copy-link-dialog__button--primary:hover {
      background-color: #357abd;
    }

    .copy-link-dialog__button--primary:active {
      transform: scale(0.98);
    }

    .copy-link-dialog__button--secondary {
      background-color: #e0e0e0;
      color: #333;
    }

    .copy-link-dialog__button--secondary:hover {
      background-color: #d0d0d0;
    }

    .copy-link-dialog__feedback {
      margin: 12px 0 0 0;
      font-size: 0.875rem;
      min-height: 1.2em;
      color: #4a90e2;
      font-weight: 500;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .copy-link-dialog__feedback:empty {
      display: none;
    }

    .copy-link-dialog__feedback--error {
      color: #e74c3c;
    }
  `;

  document.head.appendChild(style);
  stylesInjected = true;
}

// Polyfill for older browsers (very rare in 2025)
function ensureDialogSupport(dialog) {
  if (!dialog.showModal) {
    dialog.showModal = function () {
      this.setAttribute('open', '');
      this.style.display = 'block';
      this.style.position = 'fixed';
      this.style.top = '50%';
      this.style.left = '50%';
      this.style.transform = 'translate(-50%, -50%)';
      // Use CSS variable for z-index
      const zIndex = getComputedStyle(document.documentElement)
        .getPropertyValue('--z-ui-overlay')
        .trim();
      this.style.zIndex = zIndex || '1000'; // Fallback to 1000 if variable not found
    };

    dialog.close = function () {
      this.removeAttribute('open');
      this.style.display = 'none';
    };
  }
}

// Copy to clipboard with fallback
export async function copyToClipboard(text, inputElement = null) {
  // Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Clipboard API failed, using fallback:', err);
      return false;
    }
  }

  if (!inputElement) return false;
  // Fallback for older browsers
  try {
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);
    const successful = document.execCommand('copy');
    return successful;
  } catch (err) {
    console.error('Fallback copy failed:', err);
    return false;
  }
}

/* ====== Usage examples ======

// Basic usage
import { showCopyLinkModal } from './modal.js';

// Simple - just the link
showCopyLinkModal('https://example.com/page');

// With custom options
showCopyLinkModal('https://example.com/page', {
  title: 'Share with friends',
  buttonText: 'Copy Link',
  autoClose: true
});

// With callbacks
showCopyLinkModal('https://example.com/page', {
  onCopy: (link) => {
    console.log('Copied:', link);
    // Track analytics, etc.
  },
  onError: () => {
    console.log('Copy failed, user will select manually');
  },
  onCancel: () => {
    console.log('User cancelled or closed without copying');
  },
  onClose: () => {
    console.log('Modal closed');
  }
});

// Advanced customization
showCopyLinkModal('https://example.com/page', {
  title: 'Compartir enlace',
  buttonText: 'Copiar',
  cancelText: 'Cancelar',
  successMessage: '¡Copiado!',
  errorMessage: 'Error al copiar',
  autoClose: false
});

*/
