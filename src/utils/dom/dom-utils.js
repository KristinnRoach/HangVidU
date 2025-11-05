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
