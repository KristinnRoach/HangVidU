import {
  BlobSource,
  Input,
  ALL_FORMATS,
  CanvasSink,
  AudioBufferSink,
} from 'mediabunny';

/**
 * ProgressivePlayer enables playback of video files as chunks arrive during transfer.
 *
 * Key features:
 * - Detects 25% download threshold for playback readiness
 * - Works with streaming chunks from FileTransfer
 * - Integrates with existing watch-sync infrastructure
 * - Minimal memory footprint using MediaBunny's efficient streaming
 *
 * @example
 * const player = new ProgressivePlayer(fileMetadata, videoElement);
 * player.onPlaybackReady = () => {
 *   console.log('Ready to play at 25%');
 * };
 * player.addChunk(chunkData, chunkIndex);
 * if (player.canPlay()) {
 *   await player.startPlayback();
 * }
 */
export class ProgressivePlayer {
  /**
   * Creates a new ProgressivePlayer instance.
   *
   * @param {Object} metadata - File metadata from FILE_META message
   * @param {string} metadata.fileId - Unique file identifier
   * @param {string} metadata.name - File name
   * @param {number} metadata.size - Total file size in bytes
   * @param {string} metadata.mimeType - MIME type (e.g., 'video/mp4')
   * @param {number} metadata.totalChunks - Total number of chunks
   * @param {HTMLVideoElement} videoElement - Video element for playback
   */
  constructor(metadata, videoElement) {
    this.metadata = metadata;
    this.videoElement = videoElement;

    /** @type {(Uint8Array|null)[]} Received chunks array */
    this.chunks = [];

    /** @type {number} Total number of chunks expected */
    this.totalChunks = metadata.totalChunks;

    /** @type {number} Playback readiness threshold (25% = 0.25) */
    this.canPlayThreshold = 0.25;

    /** @type {boolean} Whether playback is ready to start */
    this.isPlaybackReady = false;

    /** @type {boolean} Whether playback has been started */
    this.isPlaybackStarted = false;

    // MediaBunny components
    /** @type {Input|null} MediaBunny Input instance */
    this.input = null;

    /** @type {CanvasSink|null} Video frame sink */
    this.videoSink = null;

    /** @type {AudioBufferSink|null} Audio buffer sink */
    this.audioSink = null;

    /** @type {AsyncGenerator<import('mediabunny').WrappedCanvas>|null} Video frame iterator */
    this.videoIterator = null;

    /** @type {AsyncGenerator<import('mediabunny').WrappedAudioBuffer>|null} Audio buffer iterator */
    this.audioIterator = null;

    /** @type {number} Race condition prevention counter */
    this.asyncId = 0;

    /** @type {AudioContext|null} Web Audio API context */
    this.audioContext = null;

    /** @type {GainNode|null} Audio gain node for volume control */
    this.gainNode = null;

    /** @type {HTMLCanvasElement|null} Canvas for video rendering */
    this.canvas = null;

    /** @type {CanvasRenderingContext2D|null} Canvas 2D context */
    this.canvasContext = null;

    /** @type {import('mediabunny').WrappedCanvas|null} Next video frame to render */
    this.nextFrame = null;

    /** @type {number} Current playback time in seconds */
    this.playbackTime = 0;

    /** @type {number} Total duration in seconds */
    this.duration = 0;

    /** @type {boolean} Whether playback is currently playing */
    this.playing = false;

    /** @type {number|null} Audio context start time */
    this.audioContextStartTime = null;

    /** @type {number} Playback time when play was started */
    this.playbackTimeAtStart = 0;

    /** @type {Set<AudioBufferSourceNode>} Queued audio nodes */
    this.queuedAudioNodes = new Set();

    // Callbacks
    /** @type {Function|null} Called when playback becomes ready (25% threshold) */
    this.onPlaybackReady = null;

    /** @type {Function|null} Called when playback encounters an error */
    this.onError = null;

    /** @type {Function|null} Called with progress updates (0-1) */
    this.onProgress = null;
  }

  /**
   * Adds a chunk as it arrives from FileTransfer.
   *
   * @param {Uint8Array} chunk - Chunk data
   * @param {number} index - Chunk index
   */
  addChunk(chunk, index) {
    this.chunks[index] = chunk;

    // Check if we've hit 25% threshold
    if (!this.isPlaybackReady && this.canPlay()) {
      this.isPlaybackReady = true;
      if (this.onPlaybackReady) {
        this.onPlaybackReady();
      }
    }

    // Report progress
    if (this.onProgress) {
      const progress = this.getProgress();
      this.onProgress(progress);
    }
  }

  /**
   * Checks if enough chunks have been received for playback to start.
   *
   * @returns {boolean} True if playback can start
   */
  canPlay() {
    const receivedCount = this.chunks.filter((c) => c).length;
    return receivedCount >= this.totalChunks * this.canPlayThreshold;
  }

  /**
   * Gets the current download progress.
   *
   * @returns {number} Progress from 0 to 1
   */
  getProgress() {
    const receivedCount = this.chunks.filter((c) => c).length;
    return receivedCount / this.totalChunks;
  }

  /**
   * Starts playback using MediaBunny.
   * Should be called after canPlay() returns true.
   *
   * @returns {Promise<void>}
   * @throws {Error} If playback cannot be started
   */
  async startPlayback() {
    if (this.isPlaybackStarted) {
      console.warn('[ProgressivePlayer] Playback already started');
      return;
    }

    if (!this.canPlay()) {
      throw new Error(
        'Cannot start playback: not enough chunks received (need 25%)',
      );
    }

    try {
      this.isPlaybackStarted = true;

      // Create partial blob from received chunks
      const receivedChunks = this.chunks.filter((c) => c);
      const partialBlob = new Blob(receivedChunks, {
        type: this.metadata.mimeType,
      });

      // Create MediaBunny Input from blob
      const source = new BlobSource(partialBlob);
      this.input = new Input({
        source,
        formats: ALL_FORMATS,
      });

      // Get duration
      this.duration = await this.input.computeDuration();

      // Get tracks
      const videoTrack = await this.input.getPrimaryVideoTrack();
      const audioTrack = await this.input.getPrimaryAudioTrack();

      if (!videoTrack && !audioTrack) {
        throw new Error('No video or audio track found');
      }

      // Validate tracks can be decoded
      if (videoTrack) {
        if (videoTrack.codec === null) {
          throw new Error('Unsupported video codec');
        }
        if (!(await videoTrack.canDecode())) {
          throw new Error('Unable to decode video track');
        }
      }

      if (audioTrack) {
        if (audioTrack.codec === null) {
          throw new Error('Unsupported audio codec');
        }
        if (!(await audioTrack.canDecode())) {
          throw new Error('Unable to decode audio track');
        }
      }

      // Setup audio context
      if (audioTrack) {
        // eslint-disable-next-line no-undef
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext({
          sampleRate: audioTrack.sampleRate,
        });
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
      }

      // Setup video sink
      if (videoTrack) {
        this.videoSink = new CanvasSink(videoTrack, {
          poolSize: 2, // Only need current and next frame
          fit: 'contain',
          alpha: await videoTrack.canBeTransparent(),
        });

        // Setup canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = videoTrack.displayWidth;
        this.canvas.height = videoTrack.displayHeight;
        this.canvasContext = this.canvas.getContext('2d');

        // Replace video element with canvas
        this.videoElement.style.display = 'none';
        this.videoElement.parentNode.insertBefore(
          this.canvas,
          this.videoElement,
        );
      }

      // Setup audio sink
      if (audioTrack) {
        this.audioSink = new AudioBufferSink(audioTrack);
      }

      // Start video iterator
      await this.startVideoIterator();

      // Start rendering loop
      this.render();

      console.log('[ProgressivePlayer] Playback started successfully');
    } catch (error) {
      console.error('[ProgressivePlayer] Failed to start playback:', error);
      this.isPlaybackStarted = false;
      if (this.onError) {
        this.onError(error);
      }
      throw error;
    }
  }

  /**
   * Creates a new video frame iterator and renders the first frame.
   * Cherry-picked from MediaBunny example.
   *
   * @private
   * @returns {Promise<void>}
   */
  async startVideoIterator() {
    if (!this.videoSink) {
      return;
    }

    this.asyncId++;

    // Dispose of current iterator
    await this.videoIterator?.return();

    // Create new iterator
    this.videoIterator = this.videoSink.canvases(this.getPlaybackTime());

    // Get first two frames
    const firstFrame = (await this.videoIterator.next()).value ?? null;
    const secondFrame = (await this.videoIterator.next()).value ?? null;

    this.nextFrame = secondFrame;

    if (firstFrame && this.canvasContext) {
      // Draw first frame
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasContext.drawImage(firstFrame.canvas, 0, 0);
    }
  }

  /**
   * Render loop - updates canvas with video frames.
   * Cherry-picked from MediaBunny example.
   *
   * @private
   * @param {boolean} requestFrame - Whether to request next animation frame
   */
  render(requestFrame = true) {
    if (this.isPlaybackStarted && this.canvasContext) {
      const playbackTime = this.getPlaybackTime();

      // Check if we've reached the end
      if (playbackTime >= this.duration) {
        this.pause();
        this.playbackTimeAtStart = this.duration;
      }

      // Check if current playback time has caught up to next frame
      if (this.nextFrame && this.nextFrame.timestamp <= playbackTime) {
        this.canvasContext.clearRect(
          0,
          0,
          this.canvas.width,
          this.canvas.height,
        );
        this.canvasContext.drawImage(this.nextFrame.canvas, 0, 0);
        this.nextFrame = null;

        // Request next frame
        void this.updateNextFrame();
      }
    }

    if (requestFrame) {
      requestAnimationFrame(() => this.render());
    }
  }

  /**
   * Iterates over video frames until finding one in the future.
   * Cherry-picked from MediaBunny example.
   *
   * @private
   * @returns {Promise<void>}
   */
  async updateNextFrame() {
    const currentAsyncId = this.asyncId;

    while (true) {
      const newNextFrame = (await this.videoIterator.next()).value ?? null;
      if (!newNextFrame) {
        break;
      }

      if (currentAsyncId !== this.asyncId) {
        break;
      }

      const playbackTime = this.getPlaybackTime();
      if (newNextFrame.timestamp <= playbackTime) {
        // Draw immediately
        this.canvasContext.clearRect(
          0,
          0,
          this.canvas.width,
          this.canvas.height,
        );
        this.canvasContext.drawImage(newNextFrame.canvas, 0, 0);
      } else {
        // Save for later
        this.nextFrame = newNextFrame;
        break;
      }
    }
  }

  /**
   * Gets the current playback time in seconds.
   * Cherry-picked from MediaBunny example.
   *
   * @returns {number} Current playback time
   */
  getPlaybackTime() {
    if (this.playing && this.audioContext) {
      // Use audio context clock for perfect sync
      return (
        this.audioContext.currentTime -
        this.audioContextStartTime +
        this.playbackTimeAtStart
      );
    } else {
      return this.playbackTimeAtStart;
    }
  }

  /**
   * Starts or resumes playback.
   *
   * @returns {Promise<void>}
   */
  async play() {
    if (!this.isPlaybackStarted) {
      throw new Error('Cannot play: playback not started');
    }

    if (this.playing) {
      return;
    }

    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    if (this.getPlaybackTime() === this.duration) {
      // Restart from beginning
      this.playbackTimeAtStart = 0;
      await this.startVideoIterator();
    }

    if (this.audioContext) {
      this.audioContextStartTime = this.audioContext.currentTime;
    }
    this.playing = true;

    // Start audio iterator
    if (this.audioSink) {
      await this.audioIterator?.return();
      this.audioIterator = this.audioSink.buffers(this.getPlaybackTime());
      void this.runAudioIterator();
    }
  }

  /**
   * Pauses playback.
   */
  pause() {
    if (!this.playing) {
      return;
    }

    this.playbackTimeAtStart = this.getPlaybackTime();
    this.playing = false;

    // Stop audio iterator
    void this.audioIterator?.return();
    this.audioIterator = null;

    // Stop all queued audio nodes
    for (const node of this.queuedAudioNodes) {
      node.stop();
    }
    this.queuedAudioNodes.clear();
  }

  /**
   * Seeks to a specific time in the video.
   *
   * @param {number} seconds - Time to seek to in seconds
   * @returns {Promise<void>}
   */
  async seek(seconds) {
    if (!this.isPlaybackStarted) {
      throw new Error('Cannot seek: playback not started');
    }

    const wasPlaying = this.playing;

    if (wasPlaying) {
      this.pause();
    }

    this.playbackTimeAtStart = Math.max(0, Math.min(seconds, this.duration));

    await this.startVideoIterator();

    if (wasPlaying && this.playbackTimeAtStart < this.duration) {
      await this.play();
    }
  }

  /**
   * Runs the audio iterator, scheduling audio buffers for playback.
   * Cherry-picked from MediaBunny example.
   *
   * @private
   * @returns {Promise<void>}
   */
  async runAudioIterator() {
    if (!this.audioSink || !this.audioContext || !this.gainNode) {
      return;
    }

    try {
      for await (const { buffer, timestamp } of this.audioIterator) {
        const node = this.audioContext.createBufferSource();
        node.buffer = buffer;
        node.connect(this.gainNode);

        const startTimestamp =
          this.audioContextStartTime + timestamp - this.playbackTimeAtStart;

        // Schedule audio playback
        if (startTimestamp >= this.audioContext.currentTime) {
          // Starts in the future
          node.start(startTimestamp);
        } else {
          // Starts in the past - play remaining portion
          node.start(
            this.audioContext.currentTime,
            this.audioContext.currentTime - startTimestamp,
          );
        }

        this.queuedAudioNodes.add(node);
        node.onended = () => {
          this.queuedAudioNodes.delete(node);
        };

        // Backpressure: slow down if too far ahead
        if (timestamp - this.getPlaybackTime() >= 1) {
          await new Promise((resolve) => {
            const id = setInterval(() => {
              if (timestamp - this.getPlaybackTime() < 1) {
                clearInterval(id);
                resolve();
              }
            }, 100);
          });
        }
      }
    } catch (error) {
      // Iterator was likely canceled
      if (this.playing) {
        console.error('[ProgressivePlayer] Audio iterator error:', error);
      }
    }
  }

  /**
   * Cleans up resources and stops playback.
   * Cherry-picked pattern from MediaBunny example.
   */
  cleanup() {
    // Increment asyncId to cancel ongoing operations
    this.asyncId++;

    // Stop playback
    if (this.playing) {
      this.pause();
    }

    // Dispose iterators
    void this.videoIterator?.return();
    void this.audioIterator?.return();

    // Close audio context
    if (this.audioContext) {
      void this.audioContext.close();
    }

    // Dispose input
    if (this.input) {
      this.input.dispose();
    }

    // Remove canvas
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }

    // Show video element again
    if (this.videoElement) {
      this.videoElement.style.display = '';
    }

    // Clear chunks
    this.chunks = [];

    // Reset state
    this.isPlaybackReady = false;
    this.isPlaybackStarted = false;
    this.input = null;
    this.videoSink = null;
    this.audioSink = null;
    this.videoIterator = null;
    this.audioIterator = null;
    this.audioContext = null;
    this.gainNode = null;
    this.canvas = null;
    this.canvasContext = null;
    this.nextFrame = null;
    this.queuedAudioNodes.clear();

    console.log('[ProgressivePlayer] Cleanup complete');
  }
}
