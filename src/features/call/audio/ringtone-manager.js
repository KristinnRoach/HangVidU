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
  constructor({ incomingSrc, outgoingSrc, busySrc, volume } = {}) {
    const baseUrl = import.meta.env.BASE_URL;
    this.incomingSrc = incomingSrc ?? `${baseUrl}sounds/incoming.default.mp3`;
    this.outgoingSrc = outgoingSrc ?? `${baseUrl}sounds/outgoing.default.mp3`;
    this.busySrc = busySrc ?? `${baseUrl}sounds/busy.default.opus`;
    this.defaultVolume = volume ?? 0.4; // 0.0 to 1.0;
    this.currentPlayer = null;
    this.currentType = null; // 'incoming', 'outgoing', 'busy', or null
    this.previousAudioSessionType = null;
  }

  /**
   * Configure ringtone settings
   * @param {Object} options - Configuration options
   * @param {string} [options.incomingSrc] - Path or URL to incoming ringtone
   * @param {string} [options.outgoingSrc] - Path or URL to outgoing ringtone
   * @param {string} [options.busySrc] - Path or URL to busy tone
   * @param {number} [options.volume] - Volume level (0.0 to 1.0)
   */
  configure({ incomingSrc, outgoingSrc, busySrc, volume } = {}) {
    if (incomingSrc !== undefined) this.incomingSrc = incomingSrc;
    if (outgoingSrc !== undefined) this.outgoingSrc = outgoingSrc;
    if (busySrc !== undefined) this.busySrc = busySrc;
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
   * Set busy tone from URL or path
   * @param {string} url - URL or path to audio file
   */
  setBusyRingtone(url) {
    this.busySrc = url;
  }

  /**
   * Set ringtone volume
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  setVolume(volume) {
    this.defaultVolume = Math.max(0, Math.min(1, volume));
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
  async playOutgoing({ audioOnly } = {}) {
    return this._play('outgoing', this.outgoingSrc, {
      beforePlayback: () => this._setOutgoingAudioSession({ audioOnly }),
    });
  }

  /**
   * Play busy tone (non-looped by default)
   * @returns {Promise<boolean>} True if playback started successfully
   */
  async playBusy({ loop = false } = {}) {
    return this._play('busy', this.busySrc, { loop });
  }

  /**
   * Prefer the handset/voice-call audio route for audio-only outgoing ringing
   * when the browser exposes Audio Session controls.
   */
  _setOutgoingAudioSession({ audioOnly } = {}) {
    const audioSession = globalThis.navigator?.audioSession;
    if (!audioSession || !audioOnly) {
      this.previousAudioSessionType = null;
      return;
    }

    this.previousAudioSessionType = audioSession.type ?? null;

    try {
      audioSession.type = 'play-and-record';
    } catch (err) {
      console.warn(
        '[Ringtone] Failed to set audio session for audio-only call',
        err,
      );
      this.previousAudioSessionType = null;
    }
  }

  _restoreAudioSession() {
    const audioSession = globalThis.navigator?.audioSession;
    if (!audioSession || this.previousAudioSessionType == null) {
      this.previousAudioSessionType = null;
      return;
    }

    try {
      audioSession.type = this.previousAudioSessionType;
    } catch (err) {
      console.warn('[Ringtone] Failed to restore audio session type', err);
    } finally {
      this.previousAudioSessionType = null;
    }
  }

  /**
   * Internal method to play a ringtone
   * @private
   * @param {string} type - Type of ringtone ('incoming', 'outgoing', or 'busy')
   * @param {string|string[]} src - Path or URL to audio file, or fallback list
   * @returns {Promise<boolean>}
   */
  async _play(type, src, { loop = true, beforePlayback } = {}) {
    // Stop any currently playing ringtone first
    this.stop();
    beforePlayback?.();

    const sources = Array.isArray(src) ? src : [src];

    for (const source of sources) {
      try {
        // Create new player with looping enabled
        this.currentPlayer = new AudioPlayer(source, {
          loop: loop,
          volume: this.defaultVolume,
        });

        this.currentType = type;

        // Attempt to play
        const success = await this.currentPlayer.play();

        if (success) {
          if (import.meta.env.DEV) {
            console.log(`[Ringtone] Playing ${type} ringtone`);
          }
          return true;
        }

        console.warn(
          `[Ringtone] Failed to start ${type} ringtone (likely autoplay blocked)`,
        );
        this.currentPlayer?.dispose();
        this.currentPlayer = null;
        this.currentType = null;
      } catch (err) {
        console.error(`[Ringtone] Error playing ${type} ringtone:`, err);
        this.currentPlayer?.dispose();
        this.currentPlayer = null;
        this.currentType = null;
      }
    }

    return false;
  }

  /**
   * Stop the currently playing ringtone
   */
  stop() {
    this._restoreAudioSession();

    if (this.currentPlayer) {
      if (import.meta.env.DEV) {
        console.log(`[Ringtone] Stopping ${this.currentType} ringtone`);
      }
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
   * @returns {string|null} 'incoming', 'outgoing', 'busy', or null
   */
  getCurrentType() {
    return this.currentType;
  }
}

// Export singleton instance
export const ringtoneManager = new RingtoneManager();
