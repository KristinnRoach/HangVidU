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
  constructor() {
    this.currentPlayer = null;
    this.currentType = null; // 'incoming', 'outgoing', or null
  }

  /**
   * Play incoming call ringtone (looped)
   * @returns {Promise<boolean>} True if playback started successfully
   */
  async playIncoming() {
    return this._play('incoming', '/sounds/incoming.mp3');
  }

  /**
   * Play outgoing call ringtone (looped)
   * @returns {Promise<boolean>} True if playback started successfully
   */
  async playOutgoing() {
    return this._play('outgoing', '/sounds/outgoing.mp3');
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
        volume: 0.7, // 70% volume - not too loud
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
