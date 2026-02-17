// SW-side handler for serving video files from OPFS via virtual URLs.
// Intercepts fetch requests matching /_video-serve/{fileId} and serves
// byte ranges directly from OPFS, enabling streaming <video> playback.

const OPFS_DIR_NAME = 'file-transfers';
const VIDEO_SERVE_PREFIX = '/_video-serve/';

// Map of fileId -> mimeType, populated via postMessage from main thread
const mimeTypes = new Map();

/**
 * Register a video file's MIME type (called from message handler).
 * @param {string} fileId
 * @param {string} mimeType
 */
export function registerVideo(fileId, mimeType) {
  mimeTypes.set(fileId, mimeType);
}

/**
 * Unregister a video file (called from message handler).
 * @param {string} fileId
 */
export function unregisterVideo(fileId) {
  mimeTypes.delete(fileId);
}

/**
 * Check if a fetch request URL matches our video serve pattern.
 * @param {URL} url
 * @returns {boolean}
 */
export function isVideoServeRequest(url) {
  return url.pathname.startsWith(VIDEO_SERVE_PREFIX);
}

/**
 * Extract fileId from a video serve URL.
 * @param {URL} url
 * @returns {string}
 */
function extractFileId(url) {
  return decodeURIComponent(url.pathname.slice(VIDEO_SERVE_PREFIX.length));
}

/**
 * Handle a fetch event for a video serve URL.
 * Returns a Response with proper range support, or null if the fileId is unregistered.
 * @param {Request} request
 * @returns {Promise<Response|null>}
 */
export async function handleVideoFetch(request) {
  const url = new URL(request.url);
  const fileId = extractFileId(url);

  if (!mimeTypes.has(fileId)) {
    return null; // Not registered — let it fall through
  }

  const contentType = mimeTypes.get(fileId);

  let file;
  try {
    const root = await navigator.storage.getDirectory();
    const dir = await root.getDirectoryHandle(OPFS_DIR_NAME);
    const handle = await dir.getFileHandle(fileId);
    file = await handle.getFile();
  } catch (err) {
    return new Response('File not found in OPFS', { status: 404 });
  }

  const fileSize = file.size;
  const rangeHeader = request.headers.get('Range');

  if (!rangeHeader) {
    // Full file response
    return new Response(file.stream(), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(fileSize),
        'Accept-Ranges': 'bytes',
      },
    });
  }

  // Parse Range header: bytes=start-end
  const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
  if (!match) {
    return new Response('Invalid Range header', {
      status: 416,
      headers: { 'Content-Range': `bytes */${fileSize}` },
    });
  }

  const start = parseInt(match[1], 10);
  const end = match[2] ? Math.min(parseInt(match[2], 10), fileSize - 1) : fileSize - 1;

  if (start >= fileSize || start > end) {
    return new Response('Range Not Satisfiable', {
      status: 416,
      headers: { 'Content-Range': `bytes */${fileSize}` },
    });
  }

  const sliceBlob = file.slice(start, end + 1);
  const contentLength = end - start + 1;

  return new Response(sliceBlob.stream(), {
    status: 206,
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(contentLength),
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
    },
  });
}
