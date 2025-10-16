// youtube-player-adapter.js - YouTube player abstraction layer

// ===== STATE =====
const state = {
  // Active adapters by container ID
  adapters: new Map(),
};

// ===== YOUTUBE PLAYER ADAPTER CLASS =====

/**
 * YouTubePlayerAdapter - Provides consistent interface for YouTube player interactions
 * Handles player state management, event queuing, and API error handling
 */
export class YouTubePlayerAdapter {
  constructor(containerId) {
    this.containerId = containerId;
    this.player = null;
    this.isReady = false;
    this.isPlayerLoaded = false;

    // Event queue for when player is not ready
    this.eventQueue = [];
    this.maxQueueSize = 50;

    // Player state tracking
    this.playerState = {
      currentTime: 0,
      duration: 0,
      playerState: 'unstarted',
      videoId: null,
      lastUpdate: 0,
    };

    // Event listeners management
    this.eventListeners = new Map();
    this.stateChangeCallbacks = [];
    this.readyCallbacks = [];
    this.errorCallbacks = [];

    // Error handling
    this.lastError = null;
    this.errorRetryCount = 0;
    this.maxRetryAttempts = 3;

    // Player validation
    this.validationInterval = null;
    this.validationFrequency = 5000; // 5 seconds

    if (import.meta.env.DEV) {
      console.log('YouTubePlayerAdapter created for container:', containerId);
    }
  }

  // ===== PUBLIC API =====

  /**
   * Initialize YouTube player with video ID
   * @param {string} videoId - YouTube video ID
   * @param {Object} options - Player options
   * @returns {Promise<boolean>} Success status
   */
  async initializePlayer(videoId, options = {}) {
    if (!videoId) {
      throw new Error('Video ID is required for player initialization');
    }

    try {
      // Clean up existing player if any
      if (this.player) {
        this.cleanup();
      }

      // Ensure YouTube API is loaded
      await this.ensureYouTubeAPILoaded();

      // Create player container if it doesn't exist
      this.createPlayerContainer();

      // Default player options
      const playerOptions = {
        height: options.height || '360',
        width: options.width || '640',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          disablekb: 0,
          enablejsapi: 1,
          fs: 1,
          modestbranding: 1,
          rel: 0,
          ...options.playerVars,
        },
        events: {
          onReady: this.handlePlayerReady.bind(this),
          onStateChange: this.handleStateChange.bind(this),
          onError: this.handlePlayerError.bind(this),
        },
      };

      // Create YouTube player
      this.player = new YT.Player(this.containerId, playerOptions);
      this.playerState.videoId = videoId;
      this.isPlayerLoaded = true;

      if (import.meta.env.DEV) {
        console.log('YouTube player initialized with video:', videoId);
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize YouTube player:', error);
      this.lastError = error;
      return false;
    }
  }

  /**
   * Play video at optional specific time
   * @param {number} [currentTime] - Time to seek to before playing
   * @returns {Promise<boolean>} Success status
   */
  async play(currentTime) {
    if (!this.isReady) {
      this.queueEvent({ type: 'play', currentTime });
      return false;
    }

    try {
      // Seek to specific time if provided
      if (typeof currentTime === 'number' && currentTime >= 0) {
        const timeDiff = Math.abs(this.playerState.currentTime - currentTime);
        if (timeDiff > 2) {
          // Only seek if difference is significant
          this.player.seekTo(currentTime, true);
          await this.waitForSeek(currentTime);
        }
      }

      // Play the video
      this.player.playVideo();

      // Update internal state
      this.updatePlayerState();

      if (import.meta.env.DEV) {
        console.log(
          'YouTube player play command executed',
          currentTime ? `at ${currentTime}s` : ''
        );
      }

      return true;
    } catch (error) {
      console.error('Failed to play YouTube video:', error);
      this.handleAPIError(error);
      return false;
    }
  }

  /**
   * Pause video at optional specific time
   * @param {number} [currentTime] - Time to seek to before pausing
   * @returns {Promise<boolean>} Success status
   */
  async pause(currentTime) {
    if (!this.isReady) {
      this.queueEvent({ type: 'pause', currentTime });
      return false;
    }

    try {
      // Seek to specific time if provided
      if (typeof currentTime === 'number' && currentTime >= 0) {
        const timeDiff = Math.abs(this.playerState.currentTime - currentTime);
        if (timeDiff > 2) {
          // Only seek if difference is significant
          this.player.seekTo(currentTime, true);
          await this.waitForSeek(currentTime);
        }
      }

      // Pause the video
      this.player.pauseVideo();

      // Update internal state
      this.updatePlayerState();

      if (import.meta.env.DEV) {
        console.log(
          'YouTube player pause command executed',
          currentTime ? `at ${currentTime}s` : ''
        );
      }

      return true;
    } catch (error) {
      console.error('Failed to pause YouTube video:', error);
      this.handleAPIError(error);
      return false;
    }
  }

  /**
   * Seek to specific time in video
   * @param {number} time - Time in seconds
   * @returns {Promise<boolean>} Success status
   */
  async seekTo(time) {
    if (!this.isReady) {
      this.queueEvent({ type: 'seek', time });
      return false;
    }

    if (typeof time !== 'number' || time < 0) {
      console.warn('Invalid seek time:', time);
      return false;
    }

    try {
      this.player.seekTo(time, true);
      await this.waitForSeek(time);

      // Update internal state
      this.updatePlayerState();

      if (import.meta.env.DEV) {
        console.log('YouTube player seek command executed to:', time);
      }

      return true;
    } catch (error) {
      console.error('Failed to seek YouTube video:', error);
      this.handleAPIError(error);
      return false;
    }
  }

  /**
   * Get current playback time
   * @returns {number} Current time in seconds
   */
  getCurrentTime() {
    if (!this.isReady || !this.player) {
      return this.playerState.currentTime;
    }

    try {
      const currentTime = this.player.getCurrentTime();
      this.playerState.currentTime = currentTime || 0;
      return this.playerState.currentTime;
    } catch (error) {
      console.warn('Failed to get current time:', error);
      return this.playerState.currentTime;
    }
  }

  /**
   * Get current player state
   * @returns {string} Player state ('unstarted', 'ended', 'playing', 'paused', 'buffering', 'cued')
   */
  getPlayerState() {
    if (!this.isReady || !this.player) {
      return this.playerState.playerState;
    }

    try {
      const state = this.player.getPlayerState();
      const stateMap = {
        [YT.PlayerState.UNSTARTED]: 'unstarted',
        [YT.PlayerState.ENDED]: 'ended',
        [YT.PlayerState.PLAYING]: 'playing',
        [YT.PlayerState.PAUSED]: 'paused',
        [YT.PlayerState.BUFFERING]: 'buffering',
        [YT.PlayerState.CUED]: 'cued',
      };

      this.playerState.playerState = stateMap[state] || 'unknown';
      return this.playerState.playerState;
    } catch (error) {
      console.warn('Failed to get player state:', error);
      return this.playerState.playerState;
    }
  }

  /**
   * Get video duration
   * @returns {number} Duration in seconds
   */
  getDuration() {
    if (!this.isReady || !this.player) {
      return this.playerState.duration;
    }

    try {
      const duration = this.player.getDuration();
      this.playerState.duration = duration || 0;
      return this.playerState.duration;
    } catch (error) {
      console.warn('Failed to get duration:', error);
      return this.playerState.duration;
    }
  }

  /**
   * Get complete player state information
   * @returns {Object} Complete player state
   */
  getCompleteState() {
    this.updatePlayerState();
    return {
      ...this.playerState,
      isReady: this.isReady,
      isPlayerLoaded: this.isPlayerLoaded,
      queuedEvents: this.eventQueue.length,
      lastError: this.lastError,
    };
  }

  /**
   * Check if player is ready for operations
   * @returns {boolean} Ready status
   */
  isPlayerReady() {
    return this.isReady && this.player && this.isPlayerLoaded;
  }

  // ===== EVENT HANDLING =====

  /**
   * Add state change event listener
   * @param {Function} callback - Callback function
   * @returns {Function} Cleanup function
   */
  onStateChange(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    this.stateChangeCallbacks.push(callback);

    // Return cleanup function
    return () => {
      const index = this.stateChangeCallbacks.indexOf(callback);
      if (index > -1) {
        this.stateChangeCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Add ready event listener
   * @param {Function} callback - Callback function
   * @returns {Function} Cleanup function
   */
  onReady(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    // If already ready, call immediately
    if (this.isReady) {
      try {
        callback();
      } catch (error) {
        console.error('Error in ready callback:', error);
      }
      return () => {}; // No-op cleanup
    }

    this.readyCallbacks.push(callback);

    // Return cleanup function
    return () => {
      const index = this.readyCallbacks.indexOf(callback);
      if (index > -1) {
        this.readyCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Add error event listener
   * @param {Function} callback - Callback function
   * @returns {Function} Cleanup function
   */
  onError(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    this.errorCallbacks.push(callback);

    // Return cleanup function
    return () => {
      const index = this.errorCallbacks.indexOf(callback);
      if (index > -1) {
        this.errorCallbacks.splice(index, 1);
      }
    };
  }

  // ===== EVENT QUEUE MANAGEMENT =====

  /**
   * Queue event for when player becomes ready
   * @param {Object} event - Event to queue
   */
  queueEvent(event) {
    if (!event || !event.type) {
      console.warn('Invalid event for queuing:', event);
      return;
    }

    // Prevent queue overflow
    if (this.eventQueue.length >= this.maxQueueSize) {
      console.warn('Event queue full, removing oldest event');
      this.eventQueue.shift();
    }

    // Add priority handling - seek events have higher priority
    const eventWithMetadata = {
      ...event,
      timestamp: Date.now(),
      priority: this.getEventPriority(event.type),
      retryCount: 0,
    };

    // Insert event based on priority
    this.insertEventByPriority(eventWithMetadata);

    if (import.meta.env.DEV) {
      console.log(
        'Event queued:',
        event.type,
        `(${this.eventQueue.length} in queue)`
      );
    }
  }

  /**
   * Get event priority for queue ordering
   * @param {string} eventType - Type of event
   * @returns {number} Priority (higher number = higher priority)
   */
  getEventPriority(eventType) {
    const priorities = {
      seek: 3, // Highest priority - user wants to jump to specific time
      pause: 2, // Medium priority - immediate feedback expected
      play: 1, // Lower priority - can be delayed slightly
    };
    return priorities[eventType] || 0;
  }

  /**
   * Insert event into queue based on priority
   * @param {Object} event - Event with priority metadata
   */
  insertEventByPriority(event) {
    // Find insertion point based on priority
    let insertIndex = this.eventQueue.length;
    for (let i = 0; i < this.eventQueue.length; i++) {
      if (this.eventQueue[i].priority < event.priority) {
        insertIndex = i;
        break;
      }
    }

    this.eventQueue.splice(insertIndex, 0, event);
  }

  /**
   * Process all queued events with enhanced error handling
   * @returns {Promise<number>} Number of events processed
   */
  async processEventQueue() {
    if (!this.isReady || this.eventQueue.length === 0) {
      return 0;
    }

    const eventsToProcess = [...this.eventQueue];
    this.eventQueue = [];

    let processedCount = 0;
    const failedEvents = [];

    if (import.meta.env.DEV) {
      console.log(`Processing ${eventsToProcess.length} queued events`);
    }

    for (const event of eventsToProcess) {
      try {
        // Check if event is not too old (10 seconds)
        if (Date.now() - event.timestamp > 10000) {
          if (import.meta.env.DEV) {
            console.log('Skipping old queued event:', event.type);
          }
          continue;
        }

        // Check retry count
        if (event.retryCount >= 3) {
          if (import.meta.env.DEV) {
            console.log('Skipping event after max retries:', event.type);
          }
          continue;
        }

        let success = false;
        switch (event.type) {
          case 'play':
            success = await this.play(event.currentTime);
            break;
          case 'pause':
            success = await this.pause(event.currentTime);
            break;
          case 'seek':
            success = await this.seekTo(event.time);
            break;
          default:
            console.warn('Unknown queued event type:', event.type);
            continue;
        }

        if (success) {
          processedCount++;
        } else {
          // Add to failed events for potential retry
          event.retryCount = (event.retryCount || 0) + 1;
          failedEvents.push(event);
        }

        // Add small delay between events to prevent overwhelming the API
        if (eventsToProcess.length > 1) {
          await this.delay(100);
        }
      } catch (error) {
        console.error('Error processing queued event:', error);

        // Handle YouTube API specific errors
        if (this.isYouTubeAPIError(error)) {
          event.retryCount = (event.retryCount || 0) + 1;
          if (event.retryCount < 3) {
            failedEvents.push(event);
          }
        }
      }
    }

    // Re-queue failed events that can be retried
    if (failedEvents.length > 0) {
      if (import.meta.env.DEV) {
        console.log(
          `Re-queuing ${failedEvents.length} failed events for retry`
        );
      }

      // Add failed events back to queue with delay
      setTimeout(() => {
        failedEvents.forEach((event) => {
          this.eventQueue.push(event);
        });
      }, 1000);
    }

    if (import.meta.env.DEV) {
      console.log(
        `Processed ${processedCount}/${eventsToProcess.length} queued events`
      );
    }

    return processedCount;
  }

  /**
   * Check if error is a YouTube API error that can be retried
   * @param {Error} error - Error to check
   * @returns {boolean} True if retryable YouTube API error
   */
  isYouTubeAPIError(error) {
    if (!error) return false;

    const retryableErrors = [
      'HTML5 player error',
      'NetworkError',
      'TimeoutError',
      'Service unavailable',
    ];

    return retryableErrors.some(
      (retryableError) =>
        error.message.includes(retryableError) ||
        error.name.includes(retryableError)
    );
  }

  /**
   * Promise-based delay utility
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise} Promise that resolves after delay
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Clear all queued events
   */
  clearEventQueue() {
    const clearedCount = this.eventQueue.length;
    this.eventQueue = [];

    if (import.meta.env.DEV && clearedCount > 0) {
      console.log(`Cleared ${clearedCount} queued events`);
    }
  }

  // ===== CLEANUP =====

  // ===== BIDIRECTIONAL EVENT HANDLING =====

  /**
   * Set up bidirectional event handling for sync
   * @param {Function} onLocalAction - Callback for local user actions
   * @returns {Function} Cleanup function
   */
  setupBidirectionalSync(onLocalAction) {
    if (typeof onLocalAction !== 'function') {
      throw new Error('onLocalAction callback is required');
    }

    // Track if we're processing a remote sync to prevent loops
    let isProcessingRemoteSync = false;

    // Enhanced state change handler for sync
    const syncStateChangeHandler = (event) => {
      // Skip if we're processing a remote sync event
      if (isProcessingRemoteSync) {
        return;
      }

      const { stateData } = event;
      if (!stateData) return;

      // Only emit sync events for user-initiated actions
      const syncableStates = ['playing', 'paused'];
      if (syncableStates.includes(stateData.playerState)) {
        const syncEvent = {
          type: stateData.playerState === 'playing' ? 'play' : 'pause',
          currentTime: stateData.currentTime,
          timestamp: stateData.timestamp,
          source: 'local',
        };

        try {
          onLocalAction(syncEvent);
        } catch (error) {
          console.error('Error in local action callback:', error);
        }
      }
    };

    // Add the sync handler
    const cleanupStateChange = this.onStateChange(syncStateChangeHandler);

    // Method to process remote sync events
    const processRemoteSync = async (syncEvent) => {
      isProcessingRemoteSync = true;

      try {
        switch (syncEvent.type) {
          case 'play':
            await this.play(syncEvent.currentTime);
            break;
          case 'pause':
            await this.pause(syncEvent.currentTime);
            break;
          case 'seek':
            await this.seekTo(syncEvent.currentTime);
            break;
        }
      } catch (error) {
        console.error('Error processing remote sync:', error);
      } finally {
        // Clear the flag after a delay to prevent immediate loops
        setTimeout(() => {
          isProcessingRemoteSync = false;
        }, 1000);
      }
    };

    // Return cleanup function and remote sync processor
    return {
      cleanup: () => {
        cleanupStateChange();
        isProcessingRemoteSync = false;
      },
      processRemoteSync,
    };
  }

  /**
   * Enable user controls for bidirectional interaction
   * @param {HTMLElement} [controlsContainer] - Container for custom controls
   * @returns {Object} Control methods and cleanup
   */
  enableUserControls(controlsContainer) {
    const controls = {
      play: () => this.play(),
      pause: () => this.pause(),
      seek: (time) => this.seekTo(time),
      getCurrentTime: () => this.getCurrentTime(),
      getState: () => this.getPlayerState(),
    };

    // If container provided, create custom controls
    if (controlsContainer) {
      this.createCustomControls(controlsContainer, controls);
    }

    return {
      controls,
      cleanup: () => {
        if (controlsContainer) {
          controlsContainer.innerHTML = '';
        }
      },
    };
  }

  /**
   * Create custom control buttons
   * @param {HTMLElement} container - Container element
   * @param {Object} controls - Control methods
   */
  createCustomControls(container, controls) {
    container.innerHTML = `
      <div class="youtube-custom-controls" style="margin: 10px 0; text-align: center;">
        <button id="yt-play-btn" style="margin: 0 5px; padding: 8px 16px;">Play</button>
        <button id="yt-pause-btn" style="margin: 0 5px; padding: 8px 16px;">Pause</button>
        <input id="yt-seek-input" type="range" min="0" max="100" value="0" 
               style="margin: 0 10px; width: 200px;" />
        <span id="yt-time-display" style="margin-left: 10px;">0:00 / 0:00</span>
      </div>
    `;

    // Add event listeners
    const playBtn = container.querySelector('#yt-play-btn');
    const pauseBtn = container.querySelector('#yt-pause-btn');
    const seekInput = container.querySelector('#yt-seek-input');
    const timeDisplay = container.querySelector('#yt-time-display');

    playBtn?.addEventListener('click', controls.play);
    pauseBtn?.addEventListener('click', controls.pause);

    seekInput?.addEventListener('input', (e) => {
      const duration = this.getDuration();
      const seekTime = (e.target.value / 100) * duration;
      controls.seek(seekTime);
    });

    // Update controls periodically
    const updateControls = () => {
      if (!this.isReady) return;

      const currentTime = this.getCurrentTime();
      const duration = this.getDuration();
      const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

      if (seekInput) seekInput.value = progress;
      if (timeDisplay) {
        timeDisplay.textContent = `${this.formatTime(
          currentTime
        )} / ${this.formatTime(duration)}`;
      }
    };

    const controlsInterval = setInterval(updateControls, 1000);

    // Store cleanup function
    this.eventListeners.set('customControls', () => {
      clearInterval(controlsInterval);
    });
  }

  /**
   * Format time in MM:SS format
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // ===== CLEANUP =====

  /**
   * Clean up player and resources
   */
  cleanup() {
    // Clear validation interval
    if (this.validationInterval) {
      clearInterval(this.validationInterval);
      this.validationInterval = null;
    }

    // Clear event queue
    this.clearEventQueue();

    // Clean up event listeners
    this.eventListeners.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        console.warn('Error during event listener cleanup:', error);
      }
    });

    // Clear callbacks
    this.stateChangeCallbacks = [];
    this.readyCallbacks = [];
    this.errorCallbacks = [];
    this.eventListeners.clear();

    // Destroy YouTube player
    if (this.player && typeof this.player.destroy === 'function') {
      try {
        this.player.destroy();
      } catch (error) {
        console.warn('Error destroying YouTube player:', error);
      }
    }

    // Reset state
    this.player = null;
    this.isReady = false;
    this.isPlayerLoaded = false;
    this.lastError = null;
    this.errorRetryCount = 0;

    // Reset player state
    this.playerState = {
      currentTime: 0,
      duration: 0,
      playerState: 'unstarted',
      videoId: null,
      lastUpdate: 0,
    };

    // Remove from global state
    state.adapters.delete(this.containerId);

    if (import.meta.env.DEV) {
      console.log(
        'YouTubePlayerAdapter cleaned up for container:',
        this.containerId
      );
    }
  }

  // ===== PRIVATE METHODS =====

  /**
   * Ensure YouTube API is loaded with retry logic
   * @returns {Promise<void>}
   */
  async ensureYouTubeAPILoaded() {
    return new Promise((resolve, reject) => {
      // Check if YouTube API is already loaded
      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }

      // Check if API is currently loading
      if (window.onYouTubeIframeAPIReady) {
        // API is loading, wait for it
        const originalCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          originalCallback();
          resolve();
        };
        return;
      }

      // Load YouTube API with error handling
      this.loadYouTubeAPIWithRetry().then(resolve).catch(reject);
    });
  }

  /**
   * Load YouTube API with retry mechanism
   * @param {number} attempt - Current attempt number
   * @returns {Promise<void>}
   */
  async loadYouTubeAPIWithRetry(attempt = 1) {
    const maxAttempts = 3;

    return new Promise((resolve, reject) => {
      // Set up API ready callback
      window.onYouTubeIframeAPIReady = () => {
        if (import.meta.env.DEV) {
          console.log('YouTube API loaded successfully');
        }
        resolve();
      };

      // Create and load script
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';

      script.onerror = async () => {
        if (attempt < maxAttempts) {
          if (import.meta.env.DEV) {
            console.warn(
              `YouTube API load failed, retrying (${attempt}/${maxAttempts})`
            );
          }

          // Remove failed script
          script.remove();

          // Wait before retry
          await this.delay(1000 * attempt);

          // Retry
          try {
            await this.loadYouTubeAPIWithRetry(attempt + 1);
            resolve();
          } catch (error) {
            reject(error);
          }
        } else {
          const error = new Error(
            'Failed to load YouTube API after all retry attempts'
          );
          error.name = 'YouTubeAPILoadError';
          reject(error);
        }
      };

      // Add script to document
      document.head.appendChild(script);

      // Timeout for this attempt
      setTimeout(() => {
        if (attempt >= maxAttempts) {
          const error = new Error(
            'YouTube API load timeout after all attempts'
          );
          error.name = 'YouTubeAPITimeoutError';
          reject(error);
        }
      }, 10000);
    });
  }

  /**
   * Create player container element
   */
  createPlayerContainer() {
    let container = document.getElementById(this.containerId);

    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      document.body.appendChild(container);
    }

    // Clear existing content
    container.innerHTML = '';
  }

  /**
   * Handle player ready event
   */
  handlePlayerReady() {
    this.isReady = true;
    this.updatePlayerState();

    // Start validation interval
    this.startPlayerValidation();

    if (import.meta.env.DEV) {
      console.log('YouTube player ready');
    }

    // Call ready callbacks
    this.readyCallbacks.forEach((callback) => {
      try {
        callback();
      } catch (error) {
        console.error('Error in ready callback:', error);
      }
    });

    // Process queued events
    this.processEventQueue();
  }

  /**
   * Handle player state change events with bidirectional sync support
   * @param {Object} event - YouTube player state change event
   */
  handleStateChange(event) {
    this.updatePlayerState();

    const stateMap = {
      [YT.PlayerState.UNSTARTED]: 'unstarted',
      [YT.PlayerState.ENDED]: 'ended',
      [YT.PlayerState.PLAYING]: 'playing',
      [YT.PlayerState.PAUSED]: 'paused',
      [YT.PlayerState.BUFFERING]: 'buffering',
      [YT.PlayerState.CUED]: 'cued',
    };

    const currentState = stateMap[event.data] || 'unknown';

    if (import.meta.env.DEV) {
      console.log('YouTube player state changed:', currentState);
    }

    // Emit structured state change event for sync purposes
    const stateChangeData = {
      playerState: currentState,
      currentTime: this.getCurrentTime(),
      duration: this.getDuration(),
      timestamp: Date.now(),
      videoId: this.playerState.videoId,
    };

    // Call state change callbacks with enhanced data
    this.stateChangeCallbacks.forEach((callback) => {
      try {
        callback({
          ...event,
          stateData: stateChangeData,
        });
      } catch (error) {
        console.error('Error in state change callback:', error);
      }
    });
  }

  /**
   * Handle player error events
   * @param {Object} event - YouTube player error event
   */
  handlePlayerError(event) {
    const errorCode = event.data;
    const errorMessages = {
      2: 'Invalid video ID',
      5: 'HTML5 player error',
      100: 'Video not found or private',
      101: 'Video not allowed in embedded players',
      150: 'Video not allowed in embedded players',
    };

    const error = new Error(
      errorMessages[errorCode] || `YouTube player error: ${errorCode}`
    );
    error.code = errorCode;
    error.name = 'YouTubePlayerError';

    this.lastError = error;
    this.handleAPIError(error);

    if (import.meta.env.DEV) {
      console.error('YouTube player error:', error.message);
    }

    // Call error callbacks
    this.errorCallbacks.forEach((callback) => {
      try {
        callback(error);
      } catch (callbackError) {
        console.error('Error in error callback:', callbackError);
      }
    });
  }

  /**
   * Handle API errors with retry logic
   * @param {Error} error - Error to handle
   */
  handleAPIError(error) {
    this.lastError = error;

    // Check if error is retryable
    const retryableErrors = [
      'NetworkError',
      'TimeoutError',
      'HTML5 player error',
    ];
    const isRetryable = retryableErrors.some(
      (retryableError) =>
        error.message.includes(retryableError) ||
        error.name.includes(retryableError)
    );

    if (isRetryable && this.errorRetryCount < this.maxRetryAttempts) {
      this.errorRetryCount++;

      if (import.meta.env.DEV) {
        console.log(
          `Retrying after error (attempt ${this.errorRetryCount}/${this.maxRetryAttempts}):`,
          error.message
        );
      }

      // Retry after delay
      setTimeout(() => {
        this.processEventQueue();
      }, 1000 * this.errorRetryCount);
    } else {
      this.errorRetryCount = 0;
    }
  }

  /**
   * Update internal player state
   */
  updatePlayerState() {
    if (!this.isReady || !this.player) {
      return;
    }

    try {
      this.playerState.currentTime = this.getCurrentTime();
      this.playerState.duration = this.getDuration();
      this.playerState.playerState = this.getPlayerState();
      this.playerState.lastUpdate = Date.now();
    } catch (error) {
      console.warn('Error updating player state:', error);
    }
  }

  /**
   * Wait for seek operation to complete
   * @param {number} targetTime - Target seek time
   * @returns {Promise<void>}
   */
  async waitForSeek(targetTime) {
    return new Promise((resolve) => {
      const checkSeek = () => {
        const currentTime = this.getCurrentTime();
        const timeDiff = Math.abs(currentTime - targetTime);

        if (timeDiff < 1) {
          // Within 1 second is close enough
          resolve();
        } else {
          setTimeout(checkSeek, 100); // Check again in 100ms
        }
      };

      // Start checking after a short delay
      setTimeout(checkSeek, 100);

      // Timeout after 3 seconds
      setTimeout(resolve, 3000);
    });
  }

  /**
   * Start player validation interval
   */
  startPlayerValidation() {
    if (this.validationInterval) {
      clearInterval(this.validationInterval);
    }

    this.validationInterval = setInterval(() => {
      this.validatePlayerState();
    }, this.validationFrequency);
  }

  /**
   * Validate player state and handle issues
   */
  validatePlayerState() {
    if (!this.isReady || !this.player) {
      return;
    }

    try {
      // Check if player is still functional
      const currentTime = this.player.getCurrentTime();
      const playerState = this.player.getPlayerState();

      // Update our state
      this.updatePlayerState();

      // Reset error count on successful validation
      this.errorRetryCount = 0;
    } catch (error) {
      console.warn('Player validation failed:', error);
      this.handleAPIError(error);
    }
  }
}

// ===== PUBLIC FACTORY FUNCTIONS =====

/**
 * Create or get existing YouTubePlayerAdapter for a container
 * @param {string} containerId - Container element ID
 * @returns {YouTubePlayerAdapter} Adapter instance
 */
export function createYouTubePlayerAdapter(containerId) {
  if (!containerId) {
    throw new Error('Container ID is required');
  }

  // Check if adapter already exists
  if (state.adapters.has(containerId)) {
    const existing = state.adapters.get(containerId);
    console.warn(
      'YouTubePlayerAdapter already exists for container:',
      containerId
    );
    return existing;
  }

  // Create new adapter
  const adapter = new YouTubePlayerAdapter(containerId);
  state.adapters.set(containerId, adapter);

  return adapter;
}

/**
 * Get existing YouTubePlayerAdapter for a container
 * @param {string} containerId - Container element ID
 * @returns {YouTubePlayerAdapter|null} Adapter instance or null
 */
export function getYouTubePlayerAdapter(containerId) {
  return state.adapters.get(containerId) || null;
}

/**
 * Clean up YouTubePlayerAdapter for a container
 * @param {string} containerId - Container element ID
 */
export function cleanupYouTubePlayerAdapter(containerId) {
  const adapter = state.adapters.get(containerId);
  if (adapter) {
    adapter.cleanup();
  }
}

/**
 * Clean up all YouTubePlayerAdapters
 */
export function cleanupAllYouTubePlayerAdapters() {
  for (const adapter of state.adapters.values()) {
    adapter.cleanup();
  }
  state.adapters.clear();
}
