import { isVideoMime } from '../utils/is-video-mime.js';
import {
  handleVideoSelection,
  createWatchRequest,
  acceptWatchRequest,
  cancelWatchRequest,
} from '../firebase/watch-sync.js';
import {
  registerVideoForServing,
  isSwServingSupported,
} from '../file-transfer/video-serving.js';
import { devDebug } from '../utils/dev/dev-utils.js';

/**
 * Creates a watch-file handler that manages video file state and
 * watch-together coordination. No UI — returns structured data
 * for the caller to render.
 *
 * @returns {Object} Handler API
 */
export function createWatchFileHandler() {
  /** @type {Map<string, File>} files sent by this user, keyed by name */
  const sentFiles = new Map();

  // ---------------------------------------------------------------------------
  // Received video detection
  // ---------------------------------------------------------------------------

  /**
   * Check if a received file is a video.
   * If so, returns info for the caller to render (download URL, file ref).
   * Does NOT trigger any UI or side effects.
   *
   * @param {{ file: File, name: string, mimeType: string }} params
   * @returns {{ isVideo: true, name: string, file: File, mimeType: string, downloadUrl: string } | { isVideo: false }}
   */
  function checkReceivedFile({ file, name, mimeType }) {
    if (!isVideoMime(mimeType, file)) return { isVideo: false };

    const downloadUrl = URL.createObjectURL(file);
    const effectiveMimeType = mimeType || file.type;

    return { isVideo: true, name, file, mimeType: effectiveMimeType, downloadUrl };
  }

  // ---------------------------------------------------------------------------
  // Watch-together actions (receiver-initiated)
  // ---------------------------------------------------------------------------

  /**
   * Receiver requests watch-together for a received video file.
   * Loads the video locally and sends a watch request to the sender.
   *
   * @param {{ file: File, name: string, mimeType: string, opfsId?: string }} params
   * @returns {Promise<{ ok: true } | { ok: false, reason: string }>}
   */
  async function requestWatchTogether({ file, name, mimeType, opfsId }) {
    const effectiveMimeType = mimeType || file.type;

    // Resolve video source (SW-served URL or raw blob)
    let videoSource;
    if (opfsId && isSwServingSupported()) {
      try {
        videoSource = await registerVideoForServing(opfsId, effectiveMimeType);
        devDebug('[WatchFileHandler] Serving video via SW at:', videoSource);
      } catch (err) {
        console.warn('[WatchFileHandler] SW registration failed, using blob:', err);
        videoSource = file;
      }
    } else {
      videoSource = file;
    }

    // Load video into the player
    const loaded = await handleVideoSelection(videoSource, effectiveMimeType);
    if (!loaded) return { ok: false, reason: 'failed_load' };

    // Send watch request to remote peer
    const requested = await createWatchRequest(name, file);
    if (!requested) return { ok: false, reason: 'request_failed' };

    return { ok: true };
  }

  // ---------------------------------------------------------------------------
  // Watch-together actions (sender-side, responding to remote request)
  // ---------------------------------------------------------------------------

  /**
   * Look up a sent file by name. Returns the File if still in memory, null otherwise.
   * @param {string} fileName
   * @returns {File | null}
   */
  function getSentFile(fileName) {
    return sentFiles.get(fileName) ?? null;
  }

  /**
   * Accept an incoming watch-together request from the remote peer.
   * @param {File} file
   * @returns {Promise<boolean>} true if video loaded successfully
   */
  async function acceptWatch(file) {
    return acceptWatchRequest(file);
  }

  /**
   * Decline an incoming watch-together request.
   */
  async function declineWatch() {
    await cancelWatchRequest();
  }

  // ---------------------------------------------------------------------------
  // Sent file tracking
  // ---------------------------------------------------------------------------

  /**
   * Track a sent file. If it's a video, stores it for potential watch-together requests.
   * Returns info for the caller to render a sent-file message, or null if not a video.
   *
   * @param {File} file
   * @returns {{ isVideo: true, name: string, downloadUrl: string } | null}
   */
  function trackSentFile(file) {
    if (!isVideoMime(file.type, file)) return null;

    sentFiles.set(file.name, file);
    const downloadUrl = URL.createObjectURL(file);

    return { isVideo: true, name: file.name, downloadUrl };
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  function reset() {
    sentFiles.clear();
  }

  return {
    checkReceivedFile,
    requestWatchTogether,
    getSentFile,
    acceptWatch,
    declineWatch,
    trackSentFile,
    reset,
  };
}
