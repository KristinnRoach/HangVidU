// toast.js - Simple toast notification system

import { isDev } from '../../utils/dev/dev-utils.js';

/**
 * Show a toast notification message.
 * @param {string} message - The message to display
 * @param {Object} options - Toast options
 * @param {number} options.duration - Duration in ms (default: 3000)
 * @param {string} options.type - Toast type: 'success', 'info', 'warning', 'error' (default: 'info')
 * @param {string} options.position - Position: 'top', 'bottom' (default: 'bottom')
 * @param {Function} options.onClick - Click handler. When set, toast becomes clickable and dismisses on click.
 */
export function showToast(message, options = {}) {
  const {
    duration = 6000,
    type = 'info',
    position = 'bottom',
    onClick,
  } = options;

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type} toast-${position}`;
  toast.textContent = message;

  if (onClick) {
    toast.classList.add('toast-clickable');
    toast.addEventListener('click', () => {
      onClick();
      dismiss();
    });
  }

  // Add to DOM
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('toast-show');
  });

  // Shared dismiss logic
  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }

  // Remove after duration
  setTimeout(dismiss, duration);
}

if (isDev()) {
  // Add to window for easy testing via browser console
  window.toast = showToast;
  window.successToast = showSuccessToast;
  window.errorToast = showErrorToast;
  window.infoToast = showInfoToast;
  window.warningToast = showWarningToast;
  console.log('Toast functions loaded! Try: successToast("Hello!")');
}

/**
 * Show a success toast (green).
 */
export function showSuccessToast(message, options = {}) {
  showToast(message, { ...options, type: 'success' });
}

/**
 * Show an error toast (red).
 */
export function showErrorToast(message, options = {}) {
  showToast(message, { ...options, type: 'error' });
}

/**
 * Show an info toast (blue).
 */
export function showInfoToast(message, options = {}) {
  showToast(message, { ...options, type: 'info' });
}

/**
 * Show a warning toast (yellow).
 */
export function showWarningToast(message, options = {}) {
  showToast(message, { ...options, type: 'warning' });
}
