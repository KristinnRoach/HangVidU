// sync-manager.js - Core sync coordination and event management

// ===== STATE =====
const state = {
  // Active sync managers by room ID
  managers: new Map(),
};

// ===== SYNC MANAGER CLASS =====

/**
 * SyncManager - Coordinates sync events between users and manages sync state
 * Handles event validation, deduplication, and sync loop prevention
 */
export class SyncManager {
  constructor(roomId, playerAdapter, transport) {
    this.roomId = roomId;
    this.playerAdapter = playerAdapter;
    this.transport = transport;

    // Sync state management
    this.syncState = {
      isSyncing: false,
      lastSyncTime: 0,
      pendingEvents: [],
      eventHistory: new Map(), // eventId -> { timestamp, processed }
      syncLoopTimeout: null,
      failedEvents: new Map(), // eventId -> { event, attempts, lastAttempt, error }
      retryQueue: [],
      // Conflict resolution state
      conflictResolution: {
        lastLocalAction: null, // { type, timestamp, data }
        lastRemoteAction: null, // { type, timestamp, data }
        conflictWindow: 3000, // 3 seconds window for conflict detection
        rapidActionBuffer: [], // Buffer for rapid successive actions
        rapidActionWindow: 1000, // 1 second window for rapid action detection
        maxRapidActions: 5, // Max actions in rapid window before throttling
      },
      // State validation and recovery
      stateValidation: {
        lastValidState: null, // Last known good sync state
        validationInterval: 5000, // 5 seconds between validations
        validationTimeout: null,
        recoveryAttempts: 0,
        maxRecoveryAttempts: 3,
        stateChecksum: null, // Checksum of current state for validation
      },
    };

    // Event validation and deduplication
    this.eventValidation = {
      maxEventAge: 10000, // 10 seconds
      syncLoopPreventionWindow: 2000, // 2 seconds
      maxPendingEvents: 50,
    };

    // Retry configuration
    this.retryConfig = {
      maxRetries: 3,
      baseDelay: 1000, // 1 second
      maxDelay: 8000, // 8 seconds
      retryIntervals: [1000, 2000, 4000], // Exponential backoff: 1s, 2s, 4s
    };

    // Error categorization for retry logic
    this.errorCategories = {
      transient: [
        'NetworkError',
        'TimeoutError',
        'ConnectionError',
        'TemporaryFailure',
        'RateLimitError',
      ],
      permanent: [
        'ValidationError',
        'AuthenticationError',
        'PermissionError',
        'InvalidRoomError',
        'UnsupportedError',
      ],
    };

    // Event listeners for cleanup
    this.eventListeners = [];

    // Initialize transport listeners
    this.setupTransportListeners();

    // Start state validation timer
    this.startStateValidation();

    if (import.meta.env.DEV) {
      console.log('SyncManager initialized for room:', roomId);
    }
  }

  // ===== PUBLIC API =====

  /**
   * Send sync event to remote peer
   * @param {string} eventType - Type of sync event ('play', 'pause', 'seek')
   * @param {Object} data - Event data
   * @returns {Promise<boolean>} Success status
   */
  async sendSyncEvent(eventType, data) {
    // Prevent sending events during sync processing
    if (this.syncState.isSyncing) {
      if (import.meta.env.DEV) {
        console.log('Skipping sync event during sync processing:', eventType);
      }
      return false;
    }

    // Check for rapid action throttling
    if (this.shouldThrottleRapidAction(eventType)) {
      if (import.meta.env.DEV) {
        console.log('Throttling rapid action:', eventType);
      }
      return false;
    }

    // Record local action for conflict resolution
    this.recordLocalAction(eventType, data);

    // Create sync event with validation data
    const syncEvent = this.createSyncEvent(eventType, data);

    // Validate event before sending
    if (!this.validateSyncEvent(syncEvent)) {
      console.warn('Invalid sync event rejected:', syncEvent);
      return false;
    }

    // Check for sync loop prevention
    if (this.isEventInLoopPreventionWindow(syncEvent.eventId)) {
      if (import.meta.env.DEV) {
        console.log('Preventing sync loop for event:', syncEvent.eventId);
      }
      return false;
    }

    // Mark as syncing to prevent loops
    this.setSyncingState(true);

    try {
      // Attempt to send with retry logic
      const success = await this.sendWithRetry(syncEvent);

      if (success) {
        // Record event in history for deduplication
        this.recordEventInHistory(syncEvent);
        this.syncState.lastSyncTime = Date.now();

        if (import.meta.env.DEV) {
          console.log('Sync event sent successfully:', eventType, data);
        }
      } else {
        // Add to retry queue for later retry attempts
        const error = new Error('Sync event failed after all retry attempts');
        error.name = 'SyncFailureError';
        this.addFailedEventToRetryQueue(
          syncEvent,
          error,
          this.retryConfig.maxRetries
        );
      }

      return success;
    } catch (error) {
      console.error('Failed to send sync event:', error);

      // Add to retry queue if it's a transient error
      this.addFailedEventToRetryQueue(
        syncEvent,
        error,
        this.retryConfig.maxRetries
      );

      return false;
    } finally {
      // Clear syncing state after delay to prevent immediate loops
      this.clearSyncingStateWithDelay();
    }
  }

  /**
   * Handle incoming sync event from remote peer
   * @param {Object} syncEvent - Received sync event
   * @returns {Promise<boolean>} Processing success status
   */
  async handleRemoteSyncEvent(syncEvent) {
    try {
      // Validate incoming event
      if (!this.validateSyncEvent(syncEvent)) {
        console.warn('Invalid remote sync event rejected:', syncEvent);
        return false;
      }

      // Check for duplicate events
      if (this.isEventAlreadyProcessed(syncEvent.eventId)) {
        if (import.meta.env.DEV) {
          console.log('Ignoring duplicate sync event:', syncEvent.eventId);
        }
        return false;
      }

      // Check event age
      if (this.isEventTooOld(syncEvent)) {
        if (import.meta.env.DEV) {
          console.log(
            'Ignoring old sync event:',
            syncEvent.type,
            Date.now() - syncEvent.timestamp,
            'ms old'
          );
        }
        return false;
      }

      // Record remote action for conflict resolution
      this.recordRemoteAction(syncEvent);

      // Check for conflicts with recent local actions
      if (this.hasConflictWithLocalAction(syncEvent)) {
        const lastLocal = this.syncState.conflictResolution.lastLocalAction;
        const resolution = this.resolveConflict(lastLocal, syncEvent);

        if (import.meta.env.DEV) {
          console.log(
            'Conflict detected and resolved:',
            resolution.reason,
            '-> use',
            resolution.action
          );
        }

        // If local action wins, ignore remote event
        if (resolution.action === 'local') {
          if (import.meta.env.DEV) {
            console.log('Local action takes precedence, ignoring remote event');
          }
          return true; // Return true as this is expected behavior
        }

        // If remote action wins, continue processing
        // (merge actions are handled in processSyncEvent if needed)
      }

      // Handle special sync events
      if (syncEvent.type === 'resync-request') {
        return await this.handleResyncRequest(syncEvent);
      }

      if (syncEvent.type === 'state-validation') {
        return await this.handleStateValidation(syncEvent);
      }

      // Mark as syncing to prevent loops
      this.setSyncingState(true);

      // Record event as processed
      this.recordEventInHistory(syncEvent, true);

      // Process the sync event
      const success = await this.processSyncEvent(syncEvent);

      if (success) {
        this.syncState.lastSyncTime = Date.now();

        if (import.meta.env.DEV) {
          console.log(
            'Remote sync event processed:',
            syncEvent.type,
            syncEvent.data
          );
        }
      }

      return success;
    } catch (error) {
      console.error('Error handling remote sync event:', error);
      return false;
    } finally {
      // Clear syncing state after delay
      this.clearSyncingStateWithDelay();
    }
  }

  /**
   * Get current sync state information
   * @returns {Object} Sync state
   */
  getSyncState() {
    return {
      roomId: this.roomId,
      isSyncing: this.syncState.isSyncing,
      lastSyncTime: this.syncState.lastSyncTime,
      pendingEvents: this.syncState.pendingEvents.length,
      eventHistorySize: this.syncState.eventHistory.size,
      failedEvents: this.syncState.failedEvents.size,
      retryQueueSize: this.syncState.retryQueue.length,
      transportConnected: this.transport?.isConnected?.() || false,
    };
  }

  /**
   * Retry failed sync operations
   * @returns {Promise<number>} Number of events successfully retried
   */
  async retryFailedSyncOperations() {
    if (this.syncState.retryQueue.length === 0) {
      return 0;
    }

    let successCount = 0;
    const eventsToRetry = [...this.syncState.retryQueue];
    this.syncState.retryQueue = [];

    if (import.meta.env.DEV) {
      console.log(`Retrying ${eventsToRetry.length} failed sync operations`);
    }

    for (const eventId of eventsToRetry) {
      const failedEventData = this.syncState.failedEvents.get(eventId);
      if (!failedEventData) continue;

      const { event, attempts, error } = failedEventData;

      // Check if error is still categorized as transient
      if (this.categorizeError(error) !== 'transient') {
        this.syncState.failedEvents.delete(eventId);
        continue;
      }

      // Check if we've exceeded max retries
      if (attempts >= this.retryConfig.maxRetries) {
        this.syncState.failedEvents.delete(eventId);
        if (import.meta.env.DEV) {
          console.warn(
            `Giving up on failed event after ${attempts} attempts:`,
            eventId
          );
        }
        continue;
      }

      try {
        const success = await this.sendWithRetry(event, attempts + 1);
        if (success) {
          this.syncState.failedEvents.delete(eventId);
          successCount++;
          if (import.meta.env.DEV) {
            console.log(`Successfully retried failed event: ${eventId}`);
          }
        } else {
          // Update failure record
          failedEventData.attempts = attempts + 1;
          failedEventData.lastAttempt = Date.now();
        }
      } catch (error) {
        // Update failure record with new error
        failedEventData.attempts = attempts + 1;
        failedEventData.lastAttempt = Date.now();
        failedEventData.error = error;
      }
    }

    return successCount;
  }

  /**
   * Add failed event to retry queue
   * @param {Object} event - Failed sync event
   * @param {Error} error - Error that caused failure
   * @param {number} attempts - Number of attempts made
   */
  addFailedEventToRetryQueue(event, error, attempts = 1) {
    // Only queue transient errors for retry
    if (this.categorizeError(error) !== 'transient') {
      return;
    }

    const failedEventData = {
      event,
      attempts,
      lastAttempt: Date.now(),
      error,
    };

    this.syncState.failedEvents.set(event.eventId, failedEventData);

    // Add to retry queue if not already there
    if (!this.syncState.retryQueue.includes(event.eventId)) {
      this.syncState.retryQueue.push(event.eventId);
    }

    if (import.meta.env.DEV) {
      console.log(
        `Added failed event to retry queue: ${event.eventId} (${attempts} attempts)`
      );
    }
  }

  /**
   * Handle resync request from remote peer
   * @param {Object} syncEvent - Resync request event
   * @returns {Promise<boolean>} True if handled successfully
   */
  async handleResyncRequest(syncEvent) {
    if (import.meta.env.DEV) {
      console.log('Received resync request from peer:', syncEvent.data.reason);
    }

    try {
      // Get current player state
      const currentState = await this.getCurrentPlayerState();
      if (!currentState) {
        return false;
      }

      // Send current state to peer
      const resyncResponse = this.createSyncEvent('resync-response', {
        currentTime: currentState.currentTime,
        isPlaying: currentState.isPlaying,
        timestamp: currentState.timestamp,
      });

      return await this.transport.sendEvent('resync-response', resyncResponse);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error handling resync request:', error);
      }
      return false;
    }
  }

  /**
   * Handle state validation request from remote peer
   * @param {Object} syncEvent - State validation event
   * @returns {Promise<boolean>} True if handled successfully
   */
  async handleStateValidation(syncEvent) {
    if (import.meta.env.DEV) {
      console.log('Received state validation request from peer');
    }

    try {
      const currentState = await this.getCurrentPlayerState();
      if (!currentState) {
        return false;
      }

      const remoteState = syncEvent.data;
      const timeDiff = Math.abs(
        currentState.currentTime - remoteState.currentTime
      );
      const stateMismatch = currentState.isPlaying !== remoteState.isPlaying;

      // If states are significantly different, send correction
      if (timeDiff > 2 || stateMismatch) {
        if (import.meta.env.DEV) {
          console.log('State mismatch detected, sending correction');
        }

        const correctionEvent = this.createSyncEvent('state-correction', {
          currentTime: currentState.currentTime,
          isPlaying: currentState.isPlaying,
          timestamp: currentState.timestamp,
          reason: timeDiff > 2 ? 'time_mismatch' : 'state_mismatch',
        });

        return await this.transport.sendEvent(
          'state-correction',
          correctionEvent
        );
      }

      return true;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error handling state validation:', error);
      }
      return false;
    }
  }

  /**
   * Clean up sync manager resources
   */
  cleanup() {
    // Clear any pending timeouts
    if (this.syncState.syncLoopTimeout) {
      clearTimeout(this.syncState.syncLoopTimeout);
    }

    // Clear state validation timer
    if (this.syncState.stateValidation.validationTimeout) {
      clearInterval(this.syncState.stateValidation.validationTimeout);
    }

    // Clean up event listeners
    this.eventListeners.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        console.warn('Error during event listener cleanup:', error);
      }
    });

    // Clear state
    this.syncState.pendingEvents = [];
    this.syncState.eventHistory.clear();
    this.syncState.failedEvents.clear();
    this.syncState.retryQueue = [];
    this.syncState.conflictResolution.rapidActionBuffer = [];
    this.eventListeners = [];

    // Remove from global state
    state.managers.delete(this.roomId);

    if (import.meta.env.DEV) {
      console.log('SyncManager cleaned up for room:', this.roomId);
    }
  }

  // ===== CONFLICT RESOLUTION METHODS =====

  /**
   * Resolve conflicts between simultaneous local and remote actions
   * @param {Object} localAction - Local action being performed
   * @param {Object} remoteAction - Remote action received
   * @returns {Object} Resolution decision { action: 'local'|'remote'|'merge', reason: string }
   */
  resolveConflict(localAction, remoteAction) {
    const timeDiff = Math.abs(localAction.timestamp - remoteAction.timestamp);

    // If actions are not simultaneous (outside conflict window), no conflict
    if (timeDiff > this.syncState.conflictResolution.conflictWindow) {
      return {
        action:
          remoteAction.timestamp > localAction.timestamp ? 'remote' : 'local',
        reason: 'sequential_actions',
      };
    }

    // Handle simultaneous actions based on type and timestamp
    if (localAction.type === remoteAction.type) {
      // Same action type - use most recent timestamp
      if (remoteAction.timestamp > localAction.timestamp) {
        return { action: 'remote', reason: 'remote_more_recent' };
      } else if (localAction.timestamp > remoteAction.timestamp) {
        return { action: 'local', reason: 'local_more_recent' };
      } else {
        // Exact same timestamp - use room ID as tiebreaker
        const localPriority = this.roomId.charCodeAt(0) % 2 === 0;
        return {
          action: localPriority ? 'local' : 'remote',
          reason: 'timestamp_tie_broken',
        };
      }
    }

    // Different action types - resolve based on priority
    const actionPriority = { seek: 3, pause: 2, play: 1 };
    const localPriority = actionPriority[localAction.type] || 0;
    const remotePriority = actionPriority[remoteAction.type] || 0;

    if (remotePriority > localPriority) {
      return { action: 'remote', reason: 'remote_higher_priority' };
    } else if (localPriority > remotePriority) {
      return { action: 'local', reason: 'local_higher_priority' };
    } else {
      // Same priority - use timestamp
      return {
        action:
          remoteAction.timestamp > localAction.timestamp ? 'remote' : 'local',
        reason: 'same_priority_timestamp',
      };
    }
  }

  /**
   * Check if current action should be throttled due to rapid successive actions
   * @param {string} actionType - Type of action being performed
   * @returns {boolean} True if action should be throttled
   */
  shouldThrottleRapidAction(actionType) {
    const now = Date.now();
    const buffer = this.syncState.conflictResolution.rapidActionBuffer;
    const window = this.syncState.conflictResolution.rapidActionWindow;
    const maxActions = this.syncState.conflictResolution.maxRapidActions;

    // Clean old actions from buffer
    while (buffer.length > 0 && now - buffer[0].timestamp > window) {
      buffer.shift();
    }

    // Check if we're exceeding rapid action limit
    if (buffer.length >= maxActions) {
      if (import.meta.env.DEV) {
        console.log(
          `Throttling rapid ${actionType} action (${buffer.length} actions in ${window}ms)`
        );
      }
      return true;
    }

    // Add current action to buffer
    buffer.push({ type: actionType, timestamp: now });
    return false;
  }

  /**
   * Record local action for conflict resolution
   * @param {string} actionType - Type of action
   * @param {Object} actionData - Action data
   */
  recordLocalAction(actionType, actionData) {
    this.syncState.conflictResolution.lastLocalAction = {
      type: actionType,
      timestamp: Date.now(),
      data: actionData,
    };
  }

  /**
   * Record remote action for conflict resolution
   * @param {Object} syncEvent - Remote sync event
   */
  recordRemoteAction(syncEvent) {
    this.syncState.conflictResolution.lastRemoteAction = {
      type: syncEvent.type,
      timestamp: syncEvent.timestamp,
      data: syncEvent.data,
    };
  }

  /**
   * Check if there's a potential conflict with recent local action
   * @param {Object} remoteAction - Remote action to check
   * @returns {boolean} True if conflict detected
   */
  hasConflictWithLocalAction(remoteAction) {
    const lastLocal = this.syncState.conflictResolution.lastLocalAction;
    if (!lastLocal) return false;

    const timeDiff = Math.abs(remoteAction.timestamp - lastLocal.timestamp);
    return timeDiff <= this.syncState.conflictResolution.conflictWindow;
  }

  // ===== STATE VALIDATION AND RECOVERY METHODS =====

  /**
   * Start periodic state validation
   */
  startStateValidation() {
    const validation = this.syncState.stateValidation;

    if (validation.validationTimeout) {
      clearInterval(validation.validationTimeout);
    }

    validation.validationTimeout = setInterval(() => {
      this.validateSyncState();
    }, validation.validationInterval);
  }

  /**
   * Validate current sync state and trigger recovery if needed
   * @returns {Promise<boolean>} True if state is valid or recovery succeeded
   */
  async validateSyncState() {
    try {
      const currentState = await this.getCurrentPlayerState();
      if (!currentState) {
        if (import.meta.env.DEV) {
          console.warn('Unable to get current player state for validation');
        }
        return false;
      }

      // Calculate state checksum for comparison
      const currentChecksum = this.calculateStateChecksum(currentState);
      const validation = this.syncState.stateValidation;

      // Store first valid state as baseline
      if (!validation.lastValidState) {
        validation.lastValidState = { ...currentState };
        validation.stateChecksum = currentChecksum;
        return true;
      }

      // Check for significant state drift
      const stateDrift = this.detectStateDrift(
        validation.lastValidState,
        currentState
      );

      if (stateDrift.isDrifted) {
        if (import.meta.env.DEV) {
          console.warn('Sync state drift detected:', stateDrift.reason);
        }

        // Attempt recovery
        const recovered = await this.recoverSyncState(currentState, stateDrift);

        if (recovered) {
          validation.lastValidState = { ...currentState };
          validation.stateChecksum = currentChecksum;
          validation.recoveryAttempts = 0;
          return true;
        } else {
          validation.recoveryAttempts++;

          if (validation.recoveryAttempts >= validation.maxRecoveryAttempts) {
            if (import.meta.env.DEV) {
              console.error(
                'Max recovery attempts reached, sync state may be corrupted'
              );
            }
            // Reset recovery attempts and continue
            validation.recoveryAttempts = 0;
          }
          return false;
        }
      }

      // Update valid state
      validation.lastValidState = { ...currentState };
      validation.stateChecksum = currentChecksum;
      return true;
    } catch (error) {
      console.error('Error during sync state validation:', error);
      return false;
    }
  }

  /**
   * Get current player state for validation
   * @returns {Promise<Object|null>} Current player state
   */
  async getCurrentPlayerState() {
    if (!this.playerAdapter) return null;

    try {
      return {
        currentTime: await this.playerAdapter.getCurrentTime(),
        isPlaying: (await this.playerAdapter.getPlayerState()) === 'playing',
        timestamp: Date.now(),
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Error getting player state:', error);
      }
      return null;
    }
  }

  /**
   * Calculate checksum for state comparison
   * @param {Object} state - Player state
   * @returns {string} State checksum
   */
  calculateStateChecksum(state) {
    const stateString = JSON.stringify({
      currentTime: Math.round(state.currentTime * 10) / 10, // Round to 1 decimal
      isPlaying: state.isPlaying,
    });

    // Simple hash function for checksum
    let hash = 0;
    for (let i = 0; i < stateString.length; i++) {
      const char = stateString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  /**
   * Detect if sync state has drifted significantly
   * @param {Object} lastValidState - Last known valid state
   * @param {Object} currentState - Current state
   * @returns {Object} Drift detection result
   */
  detectStateDrift(lastValidState, currentState) {
    const timeDiff = currentState.timestamp - lastValidState.timestamp;
    const expectedTime =
      lastValidState.currentTime +
      (lastValidState.isPlaying ? timeDiff / 1000 : 0);
    const actualTime = currentState.currentTime;
    const timeDrift = Math.abs(expectedTime - actualTime);

    // Significant time drift (more than 5 seconds)
    if (timeDrift > 5) {
      return {
        isDrifted: true,
        reason: 'time_drift',
        expectedTime,
        actualTime,
        drift: timeDrift,
      };
    }

    // Unexpected play state changes
    if (lastValidState.isPlaying !== currentState.isPlaying) {
      const stateChangeAge = timeDiff;
      // If state changed without recent sync event, it might be drift
      if (
        stateChangeAge > 2000 &&
        Date.now() - this.syncState.lastSyncTime > 2000
      ) {
        return {
          isDrifted: true,
          reason: 'unexpected_state_change',
          lastState: lastValidState.isPlaying,
          currentState: currentState.isPlaying,
        };
      }
    }

    return { isDrifted: false };
  }

  /**
   * Attempt to recover from sync state drift
   * @param {Object} currentState - Current player state
   * @param {Object} driftInfo - Information about detected drift
   * @returns {Promise<boolean>} True if recovery succeeded
   */
  async recoverSyncState(currentState, driftInfo) {
    if (import.meta.env.DEV) {
      console.log('Attempting sync state recovery:', driftInfo.reason);
    }

    try {
      // For time drift, request resync from remote peer
      if (driftInfo.reason === 'time_drift') {
        return await this.requestResyncFromPeer();
      }

      // For unexpected state changes, validate with remote peer
      if (driftInfo.reason === 'unexpected_state_change') {
        return await this.validateStateWithPeer(currentState);
      }

      return false;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error during sync state recovery:', error);
      }
      return false;
    }
  }

  /**
   * Request resync from remote peer
   * @returns {Promise<boolean>} True if resync request succeeded
   */
  async requestResyncFromPeer() {
    const resyncEvent = this.createSyncEvent('resync-request', {
      timestamp: Date.now(),
      reason: 'state_drift_detected',
    });

    try {
      const success = await this.transport.sendEvent(
        'resync-request',
        resyncEvent
      );
      if (import.meta.env.DEV && success) {
        console.log('Resync request sent to peer');
      }
      return success;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to send resync request:', error);
      }
      return false;
    }
  }

  /**
   * Validate current state with remote peer
   * @param {Object} currentState - Current player state
   * @returns {Promise<boolean>} True if validation succeeded
   */
  async validateStateWithPeer(currentState) {
    const validationEvent = this.createSyncEvent('state-validation', {
      currentTime: currentState.currentTime,
      isPlaying: currentState.isPlaying,
      timestamp: currentState.timestamp,
    });

    try {
      const success = await this.transport.sendEvent(
        'state-validation',
        validationEvent
      );
      if (import.meta.env.DEV && success) {
        console.log('State validation request sent to peer');
      }
      return success;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to send state validation request:', error);
      }
      return false;
    }
  }

  // ===== PRIVATE METHODS =====

  /**
   * Create a sync event with proper structure and validation data
   * @param {string} eventType - Event type
   * @param {Object} data - Event data
   * @returns {Object} Formatted sync event
   */
  createSyncEvent(eventType, data) {
    return {
      type: eventType,
      data: data || {},
      timestamp: Date.now(),
      eventId: this.generateEventId(),
      roomId: this.roomId,
    };
  }

  /**
   * Validate sync event structure and content
   * @param {Object} event - Sync event to validate
   * @returns {boolean} Validation result
   */
  validateSyncEvent(event) {
    // Check required fields
    if (!event || typeof event !== 'object') {
      return false;
    }

    if (!event.type || typeof event.type !== 'string') {
      return false;
    }

    if (!event.eventId || typeof event.eventId !== 'string') {
      return false;
    }

    if (!event.timestamp || typeof event.timestamp !== 'number') {
      return false;
    }

    // Validate event type
    const validEventTypes = [
      'play',
      'pause',
      'seek',
      'url-share',
      'connection',
      'resync-request',
      'resync-response',
      'state-validation',
      'state-correction',
    ];
    if (!validEventTypes.includes(event.type)) {
      return false;
    }

    // Validate data structure based on event type
    if (!this.validateEventData(event.type, event.data)) {
      return false;
    }

    return true;
  }

  /**
   * Validate event data based on event type
   * @param {string} eventType - Event type
   * @param {Object} data - Event data
   * @returns {boolean} Validation result
   */
  validateEventData(eventType, data) {
    if (!data || typeof data !== 'object') {
      return false;
    }

    switch (eventType) {
      case 'play':
      case 'pause':
        return typeof data.currentTime === 'number' && data.currentTime >= 0;

      case 'seek':
        return typeof data.currentTime === 'number' && data.currentTime >= 0;

      case 'url-share':
        return typeof data.url === 'string' && data.url.length > 0;

      case 'connection':
        return typeof data.connected === 'boolean';

      case 'resync-request':
        return typeof data.reason === 'string';

      case 'resync-response':
      case 'state-validation':
      case 'state-correction':
        return (
          typeof data.currentTime === 'number' &&
          typeof data.isPlaying === 'boolean' &&
          typeof data.timestamp === 'number'
        );

      default:
        return true; // Allow unknown event types with any data
    }
  }

  /**
   * Check if event is within sync loop prevention window
   * @param {string} eventId - Event ID to check
   * @returns {boolean} True if in prevention window
   */
  isEventInLoopPreventionWindow(eventId) {
    const eventRecord = this.syncState.eventHistory.get(eventId);
    if (!eventRecord) return false;

    const timeSinceEvent = Date.now() - eventRecord.timestamp;
    return timeSinceEvent < this.eventValidation.syncLoopPreventionWindow;
  }

  /**
   * Check if event has already been processed
   * @param {string} eventId - Event ID to check
   * @returns {boolean} True if already processed
   */
  isEventAlreadyProcessed(eventId) {
    const eventRecord = this.syncState.eventHistory.get(eventId);
    return eventRecord && eventRecord.processed;
  }

  /**
   * Check if event is too old to process
   * @param {Object} event - Sync event
   * @returns {boolean} True if too old
   */
  isEventTooOld(event) {
    const age = Date.now() - event.timestamp;
    return age > this.eventValidation.maxEventAge;
  }

  /**
   * Record event in history for deduplication
   * @param {Object} event - Sync event
   * @param {boolean} processed - Whether event was processed
   */
  recordEventInHistory(event, processed = false) {
    this.syncState.eventHistory.set(event.eventId, {
      timestamp: event.timestamp,
      processed: processed,
      type: event.type,
    });

    // Clean up old entries to prevent memory leaks
    this.cleanupEventHistory();
  }

  /**
   * Clean up old entries from event history
   */
  cleanupEventHistory() {
    const now = Date.now();
    const maxAge = this.eventValidation.maxEventAge * 2; // Keep history longer than validation window

    for (const [eventId, record] of this.syncState.eventHistory.entries()) {
      if (now - record.timestamp > maxAge) {
        this.syncState.eventHistory.delete(eventId);
      }
    }
  }

  /**
   * Set syncing state with timeout management
   * @param {boolean} syncing - Syncing state
   */
  setSyncingState(syncing) {
    this.syncState.isSyncing = syncing;

    if (syncing && this.syncState.syncLoopTimeout) {
      clearTimeout(this.syncState.syncLoopTimeout);
      this.syncState.syncLoopTimeout = null;
    }
  }

  /**
   * Clear syncing state after delay to prevent immediate loops
   */
  clearSyncingStateWithDelay() {
    if (this.syncState.syncLoopTimeout) {
      clearTimeout(this.syncState.syncLoopTimeout);
    }

    this.syncState.syncLoopTimeout = setTimeout(() => {
      this.syncState.isSyncing = false;
      this.syncState.syncLoopTimeout = null;
    }, this.eventValidation.syncLoopPreventionWindow);
  }

  /**
   * Send sync event with enhanced retry logic and error categorization
   * @param {Object} syncEvent - Event to send
   * @param {number} attempt - Current attempt number
   * @returns {Promise<boolean>} Success status
   */
  async sendWithRetry(syncEvent, attempt = 1) {
    try {
      // Attempt to send through transport
      const success = await this.transport.sendEvent(syncEvent.type, syncEvent);

      if (success) {
        if (attempt > 1 && import.meta.env.DEV) {
          console.log(`Sync event succeeded on attempt ${attempt}`);
        }
        return true;
      }

      // Handle failed send (no exception thrown)
      const error = new Error('Transport send returned false');
      error.name = 'TransportError';
      return this.handleRetryLogic(syncEvent, error, attempt);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(`Sync event send attempt ${attempt} failed:`, error);
      }

      return this.handleRetryLogic(syncEvent, error, attempt);
    }
  }

  /**
   * Handle retry logic with error categorization and exponential backoff
   * @param {Object} syncEvent - Event to send
   * @param {Error} error - Error that occurred
   * @param {number} attempt - Current attempt number
   * @returns {Promise<boolean>} Success status
   */
  async handleRetryLogic(syncEvent, error, attempt) {
    // Categorize the error
    const errorCategory = this.categorizeError(error);

    // Don't retry permanent errors
    if (errorCategory === 'permanent') {
      if (import.meta.env.DEV) {
        console.warn(
          `Permanent error detected, not retrying: ${error.name} - ${error.message}`
        );
      }
      return false;
    }

    // Check if we have retries left
    if (attempt >= this.retryConfig.maxRetries) {
      if (import.meta.env.DEV) {
        console.error(
          `Max retries (${this.retryConfig.maxRetries}) exceeded for sync event:`,
          syncEvent.type,
          `Error: ${error.name} - ${error.message}`
        );
      }

      // Record the final failure for potential later retry
      this.recordSyncFailure(syncEvent, error, attempt);
      return false;
    }

    // Calculate delay using exponential backoff
    const delay = this.calculateRetryDelay(attempt);

    if (import.meta.env.DEV) {
      console.log(
        `Retrying sync event in ${delay}ms (attempt ${attempt + 1}/${
          this.retryConfig.maxRetries
        }) - Error: ${error.name}`
      );
    }

    // Wait for the calculated delay
    await this.delay(delay);

    // Retry the operation
    return this.sendWithRetry(syncEvent, attempt + 1);
  }

  /**
   * Categorize error as transient or permanent for retry logic
   * @param {Error} error - Error to categorize
   * @returns {string} 'transient', 'permanent', or 'unknown'
   */
  categorizeError(error) {
    if (!error || !error.name) {
      return 'unknown';
    }

    const errorName = error.name;

    // Check for transient errors
    if (this.errorCategories.transient.includes(errorName)) {
      return 'transient';
    }

    // Check for permanent errors
    if (this.errorCategories.permanent.includes(errorName)) {
      return 'permanent';
    }

    // Check error message for common patterns
    const errorMessage = (error.message || '').toLowerCase();

    // Transient error patterns
    const transientPatterns = [
      'network',
      'timeout',
      'connection',
      'temporary',
      'rate limit',
      'service unavailable',
      'server error',
      'internal error',
    ];

    // Permanent error patterns
    const permanentPatterns = [
      'invalid',
      'unauthorized',
      'forbidden',
      'not found',
      'bad request',
      'validation',
      'permission denied',
    ];

    for (const pattern of transientPatterns) {
      if (errorMessage.includes(pattern)) {
        return 'transient';
      }
    }

    for (const pattern of permanentPatterns) {
      if (errorMessage.includes(pattern)) {
        return 'permanent';
      }
    }

    // Default to transient for unknown errors to allow retry
    return 'transient';
  }

  /**
   * Calculate retry delay using exponential backoff
   * @param {number} attempt - Current attempt number (1-based)
   * @returns {number} Delay in milliseconds
   */
  calculateRetryDelay(attempt) {
    // Use predefined intervals for first few attempts
    if (attempt <= this.retryConfig.retryIntervals.length) {
      return this.retryConfig.retryIntervals[attempt - 1];
    }

    // Fall back to exponential backoff for additional attempts
    const exponentialDelay =
      this.retryConfig.baseDelay * Math.pow(2, attempt - 1);
    return Math.min(exponentialDelay, this.retryConfig.maxDelay);
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
   * Record a sync failure for potential later retry
   * @param {Object} syncEvent - Failed sync event
   * @param {Error} error - Error that caused failure
   * @param {number} attempts - Number of attempts made
   */
  recordSyncFailure(syncEvent, error, attempts) {
    // Only record transient failures that might succeed later
    if (this.categorizeError(error) === 'transient') {
      this.addFailedEventToRetryQueue(syncEvent, error, attempts);
    } else if (import.meta.env.DEV) {
      console.warn(
        `Permanent failure recorded for sync event ${syncEvent.eventId}:`,
        error.name,
        error.message
      );
    }
  }

  /**
   * Process incoming sync event through player adapter
   * @param {Object} syncEvent - Event to process
   * @returns {Promise<boolean>} Processing success
   */
  async processSyncEvent(syncEvent) {
    if (!this.playerAdapter) {
      console.warn('No player adapter available for sync event processing');
      return false;
    }

    try {
      const { type, data } = syncEvent;

      switch (type) {
        case 'play':
          return await this.playerAdapter.play(data.currentTime);

        case 'pause':
          return await this.playerAdapter.pause(data.currentTime);

        case 'seek':
          return await this.playerAdapter.seekTo(data.currentTime);

        case 'url-share':
          // URL sharing is typically handled at a higher level
          return true;

        case 'connection':
          // Connection events are informational
          return true;

        case 'resync-response':
          // Apply remote state from resync response
          if (data.isPlaying) {
            await this.playerAdapter.play(data.currentTime);
          } else {
            await this.playerAdapter.pause(data.currentTime);
          }
          return true;

        case 'state-correction':
          // Apply state correction from peer
          if (import.meta.env.DEV) {
            console.log('Applying state correction:', data.reason);
          }
          if (data.isPlaying) {
            await this.playerAdapter.play(data.currentTime);
          } else {
            await this.playerAdapter.pause(data.currentTime);
          }
          return true;

        default:
          console.warn('Unknown sync event type:', type);
          return false;
      }
    } catch (error) {
      console.error('Error processing sync event:', error);
      return false;
    }
  }

  /**
   * Setup transport event listeners
   */
  setupTransportListeners() {
    if (!this.transport || typeof this.transport.onEvent !== 'function') {
      console.warn('Transport does not support event listeners');
      return;
    }

    // Listen for all sync events from transport
    const cleanup = this.transport.onEvent('*', (eventData) => {
      // Handle incoming sync events
      if (eventData && eventData.type) {
        this.handleRemoteSyncEvent(eventData);
      }
    });

    this.eventListeners.push(cleanup);
  }

  /**
   * Generate unique event identifier
   * @returns {string} Unique event ID
   */
  generateEventId() {
    return `${this.roomId}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 11)}`;
  }
}

// ===== PUBLIC FACTORY FUNCTIONS =====

/**
 * Create or get existing SyncManager for a room
 * @param {string} roomId - Room identifier
 * @param {Object} playerAdapter - Player adapter instance
 * @param {Object} transport - Transport instance
 * @returns {SyncManager} SyncManager instance
 */
export function createSyncManager(roomId, playerAdapter, transport) {
  // Check if manager already exists
  if (state.managers.has(roomId)) {
    const existing = state.managers.get(roomId);
    console.warn('SyncManager already exists for room:', roomId);
    return existing;
  }

  // Create new manager
  const manager = new SyncManager(roomId, playerAdapter, transport);
  state.managers.set(roomId, manager);

  return manager;
}

/**
 * Get existing SyncManager for a room
 * @param {string} roomId - Room identifier
 * @returns {SyncManager|null} SyncManager instance or null
 */
export function getSyncManager(roomId) {
  return state.managers.get(roomId) || null;
}

/**
 * Clean up SyncManager for a room
 * @param {string} roomId - Room identifier
 */
export function cleanupSyncManager(roomId) {
  const manager = state.managers.get(roomId);
  if (manager) {
    manager.cleanup();
  }
}

/**
 * Clean up all SyncManagers
 */
export function cleanupAllSyncManagers() {
  for (const manager of state.managers.values()) {
    manager.cleanup();
  }
  state.managers.clear();
}
