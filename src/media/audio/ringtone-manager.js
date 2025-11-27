/**
 * Ringtone Manager Module
 *
 * Singleton managing ringtone playback lifecycle across the application.
 * Ensures only one ringtone plays at a time and provides centralized control.
 */

import { AudioPlayer } from './audio-player.js';

/**
 * Ringtone Manager Singleton
 */
class RingtoneManager {
  constructor({ incomingSrc, outgoingSrc, volume } = {}) {
    this.incomingSrc = incomingSrc ?? '/sounds/incoming.mp3';
    this.outgoingSrc = outgoingSrc ?? '/sounds/outgoing.mp3';
    this.defaultVolume = volume ?? 0.7;
    this.currentPlayer = null;
    this.currentType = null; // 'incoming', 'outgoing', or null
  }

  /**
   * Configure ringtone settings
   * @param {Object} options - Configuration options
   * @param {string} [options.incomingSrc] - Path or URL to incoming ringtone
   * @param {string} [options.outgoingSrc] - Path or URL to outgoing ringtone
   * @param {number} [options.volume] - Volume level (0.0 to 1.0)
   */
  configure({ incomingSrc, outgoingSrc, volume } = {}) {
    if (incomingSrc !== undefined) this.incomingSrc = incomingSrc;
    if (outgoingSrc !== undefined) this.outgoingSrc = outgoingSrc;
    if (volume !== undefined) this.defaultVolume = volume;
  }

  /**
   * Set incoming ringtone from URL or path
   * @param {string} url - URL or path to audio file
   */
  setIncomingRingtone(url) {
    this.incomingSrc = url;
  }

  /**
   * Set outgoing ringtone from URL or path
   * @param {string} url - URL or path to audio file
   */
  setOutgoingRingtone(url) {
    this.outgoingSrc = url;
  }

  /**
   * Set ringtone volume
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  setVolume(volume) {
    this.defaultVolume = volume;
  }

  /**
   * Play incoming call ringtone (looped)
   * @returns {Promise<boolean>} True if playback started successfully
   */
  async playIncoming() {
    return this._play('incoming', this.incomingSrc);
  }

  /**
   * Play outgoing call ringtone (looped)
   * @returns {Promise<boolean>} True if playback started successfully
   */
  async playOutgoing() {
    return this._play('outgoing', this.outgoingSrc);
  }

  /**
   * Internal method to play a ringtone
   * @private
   * @param {string} type - Type of ringtone ('incoming' or 'outgoing')
   * @param {string} src - Path to audio file
   * @returns {Promise<boolean>}
   */
  async _play(type, src) {
    // Stop any currently playing ringtone first
    this.stop();

    try {
      // Create new player with looping enabled
      this.currentPlayer = new AudioPlayer(src, {
        loop: true,
        volume: this.defaultVolume,
      });

      this.currentType = type;

      // Attempt to play
      const success = await this.currentPlayer.play();

      if (success) {
        console.log(`[Ringtone] Playing ${type} ringtone`);
      } else {
        console.warn(
          `[Ringtone] Failed to start ${type} ringtone (likely autoplay blocked)`
        );
        // Clean up failed player
        this.currentPlayer?.dispose();
        this.currentPlayer = null;
        this.currentType = null;
      }

      return success;
    } catch (err) {
      console.error(`[Ringtone] Error playing ${type} ringtone:`, err);
      this.currentPlayer?.dispose();
      this.currentPlayer = null;
      this.currentType = null;
      return false;
    }
  }

  /**
   * Stop the currently playing ringtone
   */
  stop() {
    if (this.currentPlayer) {
      console.log(`[Ringtone] Stopping ${this.currentType} ringtone`);
      this.currentPlayer.stop();
      this.currentPlayer.dispose();
      this.currentPlayer = null;
      this.currentType = null;
    }
  }

  /**
   * Check if a ringtone is currently playing
   * @returns {boolean}
   */
  isPlaying() {
    return this.currentPlayer?.isPlaying ?? false;
  }

  /**
   * Get the type of currently playing ringtone
   * @returns {string|null} 'incoming', 'outgoing', or null
   */
  getCurrentType() {
    return this.currentType;
  }
}

// Export singleton instance
export const ringtoneManager = new RingtoneManager();
