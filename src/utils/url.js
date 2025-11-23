// src/utils/url.js

/**
 * Clear a URL parameter from the current page URL
 * @param {string} param - The parameter name to remove (defaults to 'room')
 */
export function clearUrlParam(param = 'room') {
  const url = new URL(window.location);
  url.searchParams.delete(param);
  window.history.replaceState({}, '', url);
}
