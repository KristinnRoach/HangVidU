const EXT_TO_MIME = {
  '.mkv': 'video/matroska',
  '.avi': 'video/x-msvideo',
  '.flv': 'video/x-flv',
  '.wmv': 'video/x-ms-wmv',
};

/**
 * Derive a video MIME type from a filename extension.
 * Returns null if the extension isn't in the known map.
 *
 * @param {string|undefined|null} fileName
 * @returns {string|null}
 */
export function mimeFromExtension(fileName) {
  if (!fileName) return null;
  const dot = fileName.lastIndexOf('.');
  if (dot === -1) return null;
  const ext = fileName.slice(dot).toLowerCase();
  return EXT_TO_MIME[ext] || null;
}

/**
 * Check if a MIME type or File/Blob is a video type.
 * Falls back to filename extension when MIME is empty.
 *
 * @param {string|undefined|null} mimeType
 * @param {File|Blob|undefined|null} fileObj
 * @param {string[]} [allowedPrefixes]
 * @returns {boolean}
 */
export function isVideoMime(
  mimeType,
  fileObj,
  allowedPrefixes = ['video/'],
) {
  const metaType = (mimeType || '').toLowerCase();
  const fileType = (fileObj?.type || '').toLowerCase();
  const extType = (mimeFromExtension(fileObj?.name) || '').toLowerCase();
  return allowedPrefixes.some(
    (prefix) =>
      metaType.startsWith(prefix) ||
      fileType.startsWith(prefix) ||
      extType.startsWith(prefix),
  );
}
