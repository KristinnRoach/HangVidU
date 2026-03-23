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
  /** @type {Map<string, File>} local watchable files, keyed by fileId */
  const watchableFiles = new Map();

  /** @type {Map<string, string>} object URLs for local watchable files, keyed by fileId (for cleanup) */
  const watchableFileObjectUrls = new Map();

  /**
   * Register a local watchable video file under a strict fileId.
   * @param {{ fileId: string, file: File, name: string }} params
   * @returns {string} object URL
   */
  function registerWatchableFile({ fileId, file, name }) {
    watchableFiles.set(fileId, file);

    const existingUrl = watchableFileObjectUrls.get(fileId);
    if (existingUrl) URL.revokeObjectURL(existingUrl);

    const downloadUrl = URL.createObjectURL(file);
    watchableFileObjectUrls.set(fileId, downloadUrl);
    return downloadUrl;
  }

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

    if (result.hasOutputAudio || result.droppedAudioCodecs.length === 0) {
      return {
        file: result.blob,
        mimeType: 'video/mp4',
        noAudio: result.hadInputAudio && !result.hasOutputAudio,
      };
    }

    // Audio was dropped — check if AC3/EAC3 WASM decoder can help
    const hasAc3 = result.droppedAudioCodecs.some((codec) =>
      trackNeedsAc3Decoder(new Set([codec])),
    );
    if (hasAc3 && promptUserForEac3Support()) {
      try {
        const retryResult = await convertToMp4(file, { withAc3: true });
        return {
          file: retryResult.blob,
          mimeType: 'video/mp4',
          noAudio: retryResult.hadInputAudio && !retryResult.hasOutputAudio,
        };
      } catch (err) {
        console.warn(
          '[WatchFileHandler] AC3 retry failed, falling back to first-pass MP4:',
          err,
        );
      }
    }

    return {
      file: result.blob,
      mimeType: 'video/mp4',
      noAudio: result.hadInputAudio && !result.hasOutputAudio,
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
   * @param {{ fileId: string, file: File, name: string, mimeType: string, isOpfsBacked: boolean }} params
   * @returns {{ isVideo: true, fileId: string, name: string, file: File, mimeType: string, isOpfsBacked: boolean, downloadUrl: string, revokeDownloadUrl: () => void } | { isVideo: false }}
   */
  function checkReceivedFile({ fileId, file, name, mimeType, isOpfsBacked }) {
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

    const downloadUrl = registerWatchableFile({ fileId, file, name });
    return {
      isVideo: true,
      fileId,
      name,
      file,
      mimeType: effectiveMimeType,
      isOpfsBacked,
      downloadUrl,
      revokeDownloadUrl: () => {
        const currentUrl = watchableFileObjectUrls.get(fileId);
        if (currentUrl === downloadUrl) {
          watchableFileObjectUrls.delete(fileId);
        }
        URL.revokeObjectURL(downloadUrl);
      },
    };
  }

  // ---------------------------------------------------------------------------
  // Watch-together actions (receiver-initiated)
  // ---------------------------------------------------------------------------

  /**
   * Receiver requests watch-together for a received video file.
   * Converts MKV→MP4 on demand, loads the video, and sends a watch request.
   *
   * @param {{ fileId: string, file: File, name: string, mimeType: string, isOpfsBacked?: boolean }} params
   * @returns {Promise<{ ok: true, noAudio: boolean } | { ok: false, reason: string }>}
   */
  async function requestWatchTogether({
    fileId,
    file,
    name,
    mimeType,
    isOpfsBacked = false,
  }) {
    let effectiveFile = file;
    let effectiveMimeType = resolveEffectiveMime(mimeType, file, name);
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
    const wasConverted = effectiveFile !== file;
    if (
      fileId &&
      isOpfsBacked &&
      !wasConverted &&
      !MKV_MIMES.has(effectiveMimeType) &&
      isSwServingSupported()
    ) {
      try {
        videoSource = await registerVideoForServing(fileId, effectiveMimeType);
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
    const requested = await createWatchRequest(fileId, name);
    if (!requested) return { ok: false, reason: 'request_failed' };

    return { ok: true, noAudio };
  }

  // ---------------------------------------------------------------------------
  // Watch-together actions (sender-side, responding to remote request)
  // ---------------------------------------------------------------------------

  /**
   * Look up a local watchable file by fileId. Returns the File if still in memory, null otherwise.
   * @param {string} fileId
   * @returns {File | null}
   */
  function getWatchableFile(fileId) {
    return watchableFiles.get(fileId) ?? null;
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
        console.warn(
          '[WatchFileHandler] MKV conversion failed on accept:',
          err,
        );
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
   * @param {{ fileId: string, file: File }} params
   * @returns {{ isVideo: true, fileId: string, name: string, downloadUrl: string } | null}
   */
  function trackSentFile({ fileId, file }) {
    const effectiveMimeType = resolveEffectiveMime(file.type, file, file.name);
    if (!isVideoMime(effectiveMimeType, file)) {
      devDebug('[WatchFileHandler] Sent file not a video:', {
        name: file.name,
        fileType: file.type,
        effectiveMimeType,
      });
      return null;
    }

    const downloadUrl = registerWatchableFile({
      fileId,
      file,
      name: file.name,
    });

    return { isVideo: true, fileId, name: file.name, downloadUrl };
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  function reset() {
    for (const url of watchableFileObjectUrls.values()) {
      URL.revokeObjectURL(url);
    }
    watchableFileObjectUrls.clear();
    watchableFiles.clear();
  }

  return {
    checkReceivedFile,
    requestWatchTogether,
    getWatchableFile,
    acceptWatch,
    declineWatch,
    trackSentFile,
    reset,
  };
}
