// Main-thread module for serving OPFS video files via Service Worker.
// Provides a simple API: register a completed OPFS file and get back
// a virtual URL that <video> can use with full range-request support.

const VIDEO_SERVE_PREFIX = '/_video-serve/';

/**
 * Check if SW video serving is available.
 * Requires an active (controlling) service worker.
 * @returns {boolean}
 */
export function isSwServingSupported() {
  return !!navigator.serviceWorker?.controller;
}

/**
 * Register a completed OPFS file for SW serving.
 * Sends a message to the SW with the fileId and mimeType so
 * it can respond to fetch requests for the virtual URL.
 * @param {string} fileId - The OPFS file identifier (matches StreamingFileWriter.fileId)
 * @param {string} mimeType - The video MIME type (e.g. 'video/mp4')
 * @returns {Promise<string>} Virtual URL like /_video-serve/{fileId}
 */
export async function registerVideoForServing(fileId, mimeType) {
  const sw = navigator.serviceWorker?.controller;
  if (!sw) {
    throw new Error('No active service worker');
  }

  sw.postMessage({
    type: 'REGISTER_VIDEO',
    fileId,
    mimeType,
  });

  return VIDEO_SERVE_PREFIX + encodeURIComponent(fileId);
}

/**
 * Unregister a video file from SW serving.
 * @param {string} fileId
 */
export function unregisterVideo(fileId) {
  const sw = navigator.serviceWorker?.controller;
  if (!sw) return;

  sw.postMessage({
    type: 'UNREGISTER_VIDEO',
    fileId,
  });
}

/**
 * Check if a URL is a SW-served video URL.
 * @param {string} url
 * @returns {boolean}
 */
export function isSwVideoUrl(url) {
  return typeof url === 'string' && url.startsWith(VIDEO_SERVE_PREFIX);
}
