// dom-utils.js

export const isDOMReady = () => document.readyState !== 'loading';

/**
 * Utility to run a callback when the DOM is fully loaded.
 * @param {function} callback - The function to execute when DOM is ready.
 */
export function onDOMReady(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

/**
 * Escape HTML special characters to prevent XSS.
 * Uses the browser's built-in textContent encoding, plus quote escaping
 * for safe use inside HTML attributes.
 * @param {string} str - Raw string to escape.
 * @returns {string} Escaped string safe for HTML content and attributes.
 */
export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
