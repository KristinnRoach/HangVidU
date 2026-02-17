/**
 * Utility to check if a MIME type or File/Blob is a video type.
 * Accepts a configurable list of allowed video MIME prefixes.
 *
 * @param {string|undefined|null} mimeType - The MIME type string to check (can be undefined/null).
 * @param {File|Blob|undefined|null} fileObj - Optional File/Blob to check .type property.
 * @param {string[]} [allowedPrefixes] - Array of allowed video MIME prefixes (default: ['video/']).
 * @returns {boolean}
 */
export function isVideoMime(mimeType, fileObj, allowedPrefixes = ['video/']) {
  const metaType = (mimeType || '').toLowerCase();
  const fileType = (fileObj?.type || '').toLowerCase();
  return allowedPrefixes.some(
    (prefix) => metaType.startsWith(prefix) || fileType.startsWith(prefix),
  );
}
