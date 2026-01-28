// toast.js - Simple toast notification system

/**
 * Show a toast notification message.
 * @param {string} message - The message to display
 * @param {Object} options - Toast options
 * @param {number} options.duration - Duration in ms (default: 3000)
 * @param {string} options.type - Toast type: 'success', 'info', 'warning', 'error' (default: 'info')
 * @param {string} options.position - Position: 'top', 'bottom' (default: 'bottom')
 */
export function showToast(message, options = {}) {
  const { duration = 3000, type = 'info', position = 'bottom' } = options;

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type} toast-${position}`;
  toast.textContent = message;

  // Add to DOM
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('toast-show');
  });

  // Remove after duration
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => {
      toast.remove();
    }, 300); // Wait for fade-out animation
  }, duration);
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
