/**
 * Generic utility to handle browser-specific API fallbacks.
 * This function attempts to call the standardized API first,
 * and falls back to vendor-prefixed versions if available.
 *
 * @param {Object} context - The object containing the API (e.g., document, navigator).
 * @param {string} methodName - The standardized method name (e.g., 'requestFullscreen').
 * @param {Array} args - Arguments to pass to the method.
 * @returns {Promise|undefined} - Returns a Promise if the method is asynchronous, or undefined otherwise.
 */
export async function callWithFallback(context, methodName, args = []) {
  const vendorPrefixes = ['webkit', 'ms'];

  if (typeof context[methodName] === 'function') {
    return context[methodName](...args);
  }

  for (const prefix of vendorPrefixes) {
    const prefixedMethod = `${prefix}${methodName
      .charAt(0)
      .toUpperCase()}${methodName.slice(1)}`;
    if (typeof context[prefixedMethod] === 'function') {
      return context[prefixedMethod](...args);
    }
  }

  console.warn(`No supported method found for ${methodName}`);
}

/**
 * Example usage for Fullscreen API:
 *
 * import { callWithFallback } from './browserFallback';
 *
 * async function requestFullscreen(element) {
 *   try {
 *     await callWithFallback(element, 'requestFullscreen');
 *   } catch (error) {
 *     console.error('Failed to enter fullscreen mode:', error);
 *   }
 * }
 */
