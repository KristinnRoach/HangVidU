/**
 * Validates that a URL is safe to use in href attributes.
 * Allows: http://, https://, blob:, data: (with caution for data:)
 * Rejects: javascript:, vbscript:, other dangerous protocols
 *
 * @param {string} url - The URL to validate
 * @param {Object} [options] - Validation options
 * @param {boolean} [options.allowData] - Allow data: URLs (default: false)
 * @returns {boolean} True if the URL is safe to use
 */
export function isSafeUrl(url, { allowData = false } = {}) {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    // Handle blob URLs (no protocol resolution needed)
    if (url.startsWith('blob:')) {
      return true;
    }

    // Handle data URLs (with caution)
    if (url.startsWith('data:')) {
      return allowData;
    }

    // For other URLs, parse and validate protocol
    const parsed = new URL(url, window.location.href);
    const protocol = parsed.protocol;

    // Only allow http and https
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    // Invalid URL
    return false;
  }
}

/**
 * Validates that a URL is safe for download href.
 * More permissive than isSafeUrl - allows blob: and data: URLs for file downloads.
 *
 * @param {string} url - The URL to validate
 * @returns {boolean} True if the URL is safe for download
 */
export function isSafeDownloadUrl(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // blob: and data: are safe for download links
  if (url.startsWith('blob:') || url.startsWith('data:')) {
    return true;
  }

  return isSafeUrl(url);
}
