/**
 * Audio Player Module
 *
 * Low-level wrapper around HTMLAudioElement for reliable audio playback
 * with autoplay policy handling and resource cleanup.
 */

export class AudioPlayer {
  /**
   * Create a new audio player
   * @param {string} src - Path to audio file
   * @param {Object} options - Player configuration
   * @param {boolean} options.loop - Whether to loop the audio (default: false)
   * @param {number} options.volume - Volume level 0-1 (default: 0.5)
   */
  constructor(src, { loop = false, volume = 0.5 } = {}) {
    this.src = src;
    this.audio = new Audio(src);
    this.audio.loop = loop;
    this.audio.volume = Math.max(0, Math.min(1, volume)); // Clamp 0-1
    this.isPlaying = false;

    // Track error state
    this.audio.onerror = (e) => {
      console.error(`[AudioPlayer] Failed to load audio: ${src}`, e);
      this.isPlaying = false;
    };

    // Track playback state
    this.audio.onplay = () => {
      this.isPlaying = true;
    };

    this.audio.onpause = () => {
      this.isPlaying = false;
    };

    this.audio.onended = () => {
      this.isPlaying = false;
    };
  }

  /**
   * Play the audio
   * Handles browser autoplay policies with graceful degradation
   * @returns {Promise<boolean>} True if playback started, false if blocked
   */
  async play() {
    if (this.isPlaying) {
      return true; // Already playing
    }

    try {
      await this.audio.play();
      this.isPlaying = true;
      return true;
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        // Autoplay blocked - user interaction required
        console.warn(
          '[AudioPlayer] Autoplay blocked - user interaction required first',
          { src: this.src }
        );
      } else if (err.name === 'NotSupportedError') {
        // Audio format not supported
        console.error('[AudioPlayer] Audio format not supported', {
          src: this.src,
        });
      } else {
        // Other playback error
        console.error('[AudioPlayer] Playback error:', err);
      }
      this.isPlaying = false;
      return false;
    }
  }

  /**
   * Stop the audio and reset to beginning
   */
  stop() {
    if (!this.audio) return;

    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }

  /**
   * Pause the audio without resetting position
   */
  pause() {
    if (!this.audio) return;

    this.audio.pause();
    this.isPlaying = false;
  }

  /**
   * Set volume (0-1)
   * @param {number} volume - Volume level between 0 and 1
   */
  setVolume(volume) {
    if (!this.audio) return;

    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Get current volume (0-1)
   * @returns {number}
   */
  getVolume() {
    return this.audio?.volume ?? 0;
  }

  /**
   * Clean up resources
   * Call this when done with the player to prevent memory leaks
   */
  dispose() {
    this.stop();

    if (this.audio) {
      this.audio.onerror = null;
      this.audio.onplay = null;
      this.audio.onpause = null;
      this.audio.onended = null;
      this.audio.src = '';
      this.audio = null;
    }

    this.isPlaying = false;
  }
}
