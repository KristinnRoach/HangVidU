/**
 * VideoProcessor - Wrapper around MediaBunny for video metadata extraction
 *
 * This class provides a simple interface for extracting metadata from video files
 * using the MediaBunny library. It handles browser compatibility checks and
 * graceful error handling.
 *
 * @example
 * ```javascript
 * if (VideoProcessor.isSupported()) {
 *   const processor = new VideoProcessor();
 *   const metadata = await processor.getMetadata(videoFile);
 *   console.log(`Duration: ${metadata.duration}s`);
 * }
 * ```
 */

import { Input, BlobSource, ALL_FORMATS } from 'mediabunny';

/**
 * @typedef {Object} VideoMetadata
 * @property {number} duration - Duration in seconds
 * @property {Object} resolution - Video resolution
 * @property {number} resolution.width - Width in pixels
 * @property {number} resolution.height - Height in pixels
 * @property {string} format - Container format (e.g., 'mp4', 'webm', 'mkv')
 * @property {Object} codecs - Codec information
 * @property {string|null} codecs.video - Video codec (e.g., 'avc', 'vp9', 'av1')
 * @property {string|null} codecs.audio - Audio codec (e.g., 'aac', 'opus', 'mp3')
 * @property {number} fileSize - File size in bytes
 * @property {string} fileName - Original file name
 */

export class VideoProcessor {
  /**
   * Check if MediaBunny is supported in the current browser.
   *
   * MediaBunny requires WebAssembly and WebCodecs API support.
   * This method checks for both before attempting to use the library.
   *
   * @returns {boolean} True if MediaBunny is supported
   *
   * @example
   * ```javascript
   * if (VideoProcessor.isSupported()) {
   *   // Safe to use VideoProcessor
   * } else {
   *   console.warn('MediaBunny not supported in this browser');
   * }
   * ```
   */
  static isSupported() {
    // Check for WebAssembly support
    if (typeof WebAssembly === 'undefined') {
      return false;
    }

    // Check for WebCodecs API support (required by MediaBunny)
    if (typeof VideoDecoder === 'undefined') {
      return false;
    }

    return true;
  }

  /**
   * Extract metadata from a video file.
   *
   * This method uses MediaBunny to parse the video file and extract
   * comprehensive metadata including duration, resolution, format, and codecs.
   *
   * The extraction is performed without loading the entire file into memory,
   * making it efficient even for large files (5GB+).
   *
   * @param {File} file - Video file to extract metadata from
   * @returns {Promise<VideoMetadata>} Extracted metadata
   * @throws {Error} If the file cannot be parsed or is not a valid video
   *
   * @example
   * ```javascript
   * const processor = new VideoProcessor();
   * try {
   *   const metadata = await processor.getMetadata(videoFile);
   *   console.log(`Video: ${metadata.resolution.width}x${metadata.resolution.height}`);
   *   console.log(`Duration: ${Math.floor(metadata.duration / 60)}m ${Math.floor(metadata.duration % 60)}s`);
   * } catch (error) {
   *   console.error('Failed to extract metadata:', error);
   * }
   * ```
   */
  async getMetadata(file) {
    // Create MediaBunny Input from the file
    const input = new Input({
      source: new BlobSource(file),
      formats: ALL_FORMATS,
    });

    try {
      // Extract duration
      const duration = await input.computeDuration();

      // Get video tracks
      const videoTracks = await input.getVideoTracks();
      const primaryVideoTrack = videoTracks[0] || null;

      // Get audio tracks
      const audioTracks = await input.getAudioTracks();
      const primaryAudioTrack = audioTracks[0] || null;

      // Get format information
      const format = await input.getFormat();

      // Build metadata object
      const metadata = {
        duration,
        resolution: {
          width: primaryVideoTrack?.displayWidth || 0,
          height: primaryVideoTrack?.displayHeight || 0,
        },
        format: format.name.toLowerCase(),
        codecs: {
          video: primaryVideoTrack?.codec || null,
          audio: primaryAudioTrack?.codec || null,
        },
        fileSize: file.size,
        fileName: file.name,
      };

      // Cleanup
      input.dispose();

      return metadata;
    } catch (error) {
      // Ensure cleanup even on error
      input.dispose();
      throw new Error(`Failed to extract video metadata: ${error.message}`);
    }
  }
}
