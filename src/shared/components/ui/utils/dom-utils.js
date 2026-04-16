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
