import { isVideoMime, mimeFromExtension } from '../utils/is-video-mime.js';
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
import {
  convertToMp4,
  promptUserForEac3Support,
  trackNeedsAc3Decoder,
} from '../media/convert/index.js';
import { devDebug } from '../utils/dev/dev-utils.js';

const MKV_MIMES = new Set(['video/x-matroska', 'video/matroska']);

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

  /** @type {Map<string, string>} object URLs for sent files, keyed by name (for cleanup) */
  const sentFileObjectUrls = new Map();

  /**
   * Resolve the effective MIME type, falling back to extension-based detection.
   * @param {string} mimeType
   * @param {File} file
   * @param {string} name
   * @returns {string}
   */
  function resolveEffectiveMime(mimeType, file, name) {
    return mimeType || file.type || mimeFromExtension(name) || '';
  }

  /**
   * Convert an MKV file to MP4 for playback. If the first pass drops audio
   * due to AC3/EAC3, prompts the user and retries with WASM decoder.
   *
   * @param {File|Blob} file
   * @returns {Promise<{ file: Blob, mimeType: string, noAudio: boolean }>}
   */
  async function convertMkvForPlayback(file) {
    const result = await convertToMp4(file);

    if (result.hasAudio || result.droppedAudioCodecs.length === 0) {
      return {
        file: result.blob,
        mimeType: 'video/mp4',
        noAudio: !result.hasAudio,
      };
    }

    // Audio was dropped — check if AC3/EAC3 WASM decoder can help
    const hasAc3 = result.droppedAudioCodecs.some((codec) =>
      trackNeedsAc3Decoder(new Set([codec])),
    );
    if (hasAc3 && promptUserForEac3Support()) {
      const retryResult = await convertToMp4(file, { withAc3: true });
      return {
        file: retryResult.blob,
        mimeType: 'video/mp4',
        noAudio: !retryResult.hasAudio,
      };
    }

    return {
      file: result.blob,
      mimeType: 'video/mp4',
      noAudio: true,
    };
  }

  // ---------------------------------------------------------------------------
  // Received video detection
  // ---------------------------------------------------------------------------

  /**
   * Check if a received file is a video.
   * If so, returns info for the caller to render (download URL, file ref).
   * Does not perform any UI updates or conversion. For video files, this
   * allocates a temporary object URL (`downloadUrl`) and returns a
   * `revokeDownloadUrl` callback that callers must invoke when the URL is
   * no longer needed to release the associated resources.
   *
   * @param {{ file: File, name: string, mimeType: string }} params
   * @returns {{ isVideo: true, name: string, file: File, mimeType: string, downloadUrl: string, revokeDownloadUrl: () => void } | { isVideo: false }}
   */
  function checkReceivedFile({ file, name, mimeType }) {
    const effectiveMimeType = resolveEffectiveMime(mimeType, file, name);
    if (!isVideoMime(effectiveMimeType, file)) {
      devDebug('[WatchFileHandler] Not a video file:', {
        name,
        mimeType,
        fileType: file.type,
        effectiveMimeType,
      });
      return { isVideo: false };
    }

    const downloadUrl = URL.createObjectURL(file);
    return {
      isVideo: true,
      name,
      file,
      mimeType: effectiveMimeType,
      downloadUrl,
      revokeDownloadUrl: () => URL.revokeObjectURL(downloadUrl),
    };
  }

  // ---------------------------------------------------------------------------
  // Watch-together actions (receiver-initiated)
  // ---------------------------------------------------------------------------

  /**
   * Receiver requests watch-together for a received video file.
   * Converts MKV→MP4 on demand, loads the video, and sends a watch request.
   *
   * @param {{ file: File, name: string, mimeType: string, opfsId?: string }} params
   * @returns {Promise<{ ok: true, noAudio: boolean } | { ok: false, reason: string }>}
   */
  async function requestWatchTogether({ file, name, mimeType, opfsId }) {
    let effectiveFile = file;
    let effectiveMimeType = mimeType || file.type;
    let noAudio = false;

    // Convert MKV→MP4 on demand
    if (MKV_MIMES.has(effectiveMimeType)) {
      try {
        const converted = await convertMkvForPlayback(file);
        effectiveFile = converted.file;
        effectiveMimeType = converted.mimeType;
        noAudio = converted.noAudio;
        devDebug('[WatchFileHandler] MKV→MP4 conversion complete', { noAudio });
      } catch (err) {
        console.warn('[WatchFileHandler] MKV→MP4 conversion failed:', err);
        return { ok: false, reason: 'failed_load' };
      }
    }

    // Resolve video source (SW-served URL or raw blob)
    let videoSource;
    if (opfsId && !MKV_MIMES.has(mimeType) && isSwServingSupported()) {
      try {
        videoSource = await registerVideoForServing(opfsId, effectiveMimeType);
        devDebug('[WatchFileHandler] Serving video via SW at:', videoSource);
      } catch (err) {
        console.warn(
          '[WatchFileHandler] SW registration failed, using blob:',
          err,
        );
        videoSource = effectiveFile;
      }
    } else {
      videoSource = effectiveFile;
    }

    // Load video into the player
    const loaded = await handleVideoSelection(videoSource, effectiveMimeType);
    if (!loaded) {
      console.warn('[WatchFileHandler] handleVideoSelection failed', {
        name,
        effectiveMimeType,
        sourceType: typeof videoSource,
      });
      return { ok: false, reason: 'failed_load' };
    }

    // Send watch request to remote peer
    const requested = await createWatchRequest(name, file);
    if (!requested) return { ok: false, reason: 'request_failed' };

    return { ok: true, noAudio };
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
   * Converts MKV→MP4 on demand if needed.
   * @param {File} file
   * @returns {Promise<boolean>} true if video loaded successfully
   */
  async function acceptWatch(file) {
    const mime = resolveEffectiveMime(file.type, file, file.name);
    if (MKV_MIMES.has(mime)) {
      try {
        const converted = await convertMkvForPlayback(file);
        return acceptWatchRequest(converted.file);
      } catch (err) {
        console.warn('[WatchFileHandler] MKV conversion failed on accept:', err);
      }
    }
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
    const effectiveMimeType = resolveEffectiveMime(file.type, file, file.name);
    if (!isVideoMime(effectiveMimeType, file)) {
      devDebug('[WatchFileHandler] Sent file not a video:', {
        name: file.name,
        fileType: file.type,
        effectiveMimeType,
      });
      return null;
    }

    const existingUrl = sentFileObjectUrls.get(file.name);
    if (existingUrl) URL.revokeObjectURL(existingUrl);

    sentFiles.set(file.name, file);
    const downloadUrl = URL.createObjectURL(file);
    sentFileObjectUrls.set(file.name, downloadUrl);

    return { isVideo: true, name: file.name, downloadUrl };
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  function reset() {
    for (const url of sentFileObjectUrls.values()) {
      URL.revokeObjectURL(url);
    }
    sentFileObjectUrls.clear();
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
