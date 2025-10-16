// src/features/connect/connection-state-manager.js - Enhanced connection state handling

/**
 * Manages WebRTC connection states with proper error handling and recovery
 */
export class ConnectionStateManager {
  constructor(peerConnection, role, options = {}) {
    this.peerConnection = peerConnection;
    this.role = role; // 'initiator' or 'joiner'
    this.options = {
      connectionTimeout: 30000,
      reconnectAttempts: 3,
      reconnectDelay: 2000,
      ...options,
    };

    this.state = {
      current: 'new',
      previous: null,
      startTime: Date.now(),
      reconnectAttempt: 0,
      lastError: null,
    };

    this.callbacks = {
      onStateChange: null,
      onConnected: null,
      onDisconnected: null,
      onFailed: null,
      onReconnecting: null,
    };

    this.timers = {
      connectionTimeout: null,
      reconnectTimer: null,
    };

    this.setupStateMonitoring();
  }

  /**
   * Set callback functions
   */
  setCallbacks(callbacks) {
    Object.assign(this.callbacks, callbacks);
  }

  /**
   * Set up connection state monitoring
   */
  setupStateMonitoring() {
    // Monitor peer connection state
    this.peerConnection.onconnectionstatechange = () => {
      this.handleConnectionStateChange(this.peerConnection.connectionState);
    };

    // Monitor ICE connection state
    this.peerConnection.oniceconnectionstatechange = () => {
      this.handleICEConnectionStateChange(
        this.peerConnection.iceConnectionState
      );
    };

    // Set connection timeout
    this.startConnectionTimeout();
  }

  /**
   * Handle peer connection state changes
   */
  handleConnectionStateChange(newState) {
    const oldState = this.state.current;
    this.updateState(newState);

    if (import.meta.env.DEV) {
      console.log(`Peer connection state: ${oldState} → ${newState}`);
    }

    switch (newState) {
      case 'connecting':
        this.handleConnecting();
        break;

      case 'connected':
        this.handleConnected();
        break;

      case 'disconnected':
        this.handleDisconnected();
        break;

      case 'failed':
        this.handleFailed();
        break;

      case 'closed':
        this.handleClosed();
        break;
    }

    this.callbacks.onStateChange?.(newState, oldState);
  }

  /**
   * Handle ICE connection state changes
   */
  handleICEConnectionStateChange(iceState) {
    if (import.meta.env.DEV) {
      console.log(`ICE connection state: ${iceState}`);
    }

    switch (iceState) {
      case 'checking':
        // ICE connectivity checks are in progress
        break;

      case 'connected':
        // ICE connectivity checks have succeeded
        this.clearConnectionTimeout();
        break;

      case 'completed':
        // ICE gathering and connectivity checks are complete
        break;

      case 'failed':
        // ICE connectivity checks have failed
        this.handleICEFailed();
        break;

      case 'disconnected':
        // ICE connection has been lost
        this.handleICEDisconnected();
        break;

      case 'closed':
        // ICE connection has been closed
        break;
    }
  }

  /**
   * Handle connecting state
   */
  handleConnecting() {
    this.clearReconnectTimer();
    this.startConnectionTimeout();
  }

  /**
   * Handle connected state
   */
  handleConnected() {
    this.clearConnectionTimeout();
    this.clearReconnectTimer();
    this.state.reconnectAttempt = 0;
    this.state.lastError = null;

    const connectionTime = Date.now() - this.state.startTime;

    if (import.meta.env.DEV) {
      console.log(`Connection established in ${connectionTime}ms`);
    }

    this.callbacks.onConnected?.(connectionTime);
  }

  /**
   * Handle disconnected state
   */
  handleDisconnected() {
    this.callbacks.onDisconnected?.();

    // Attempt reconnection if not at max attempts
    if (this.state.reconnectAttempt < this.options.reconnectAttempts) {
      this.scheduleReconnect();
    } else {
      this.handleFailed('Max reconnection attempts reached');
    }
  }

  /**
   * Handle failed state
   */
  handleFailed(reason = 'Connection failed') {
    this.clearConnectionTimeout();
    this.clearReconnectTimer();

    this.state.lastError = reason;

    if (import.meta.env.DEV) {
      console.error(`Connection failed: ${reason}`);
    }

    this.callbacks.onFailed?.(reason);
  }

  /**
   * Handle closed state
   */
  handleClosed() {
    this.clearConnectionTimeout();
    this.clearReconnectTimer();

    if (import.meta.env.DEV) {
      console.log('Connection closed');
    }
  }

  /**
   * Handle ICE connection failure
   */
  handleICEFailed() {
    this.handleFailed('ICE connection failed');
  }

  /**
   * Handle ICE disconnection
   */
  handleICEDisconnected() {
    // ICE disconnection might be temporary, wait for peer connection state
    if (import.meta.env.DEV) {
      console.warn('ICE connection disconnected');
    }
  }

  /**
   * Schedule reconnection attempt
   */
  scheduleReconnect() {
    this.state.reconnectAttempt++;

    const delay =
      this.options.reconnectDelay *
      Math.pow(2, this.state.reconnectAttempt - 1);

    if (import.meta.env.DEV) {
      console.log(
        `Scheduling reconnection attempt ${this.state.reconnectAttempt}/${this.options.reconnectAttempts} in ${delay}ms`
      );
    }

    this.callbacks.onReconnecting?.(
      this.state.reconnectAttempt,
      this.options.reconnectAttempts
    );

    this.timers.reconnectTimer = setTimeout(() => {
      this.attemptReconnection();
    }, delay);
  }

  /**
   * Attempt to reconnect
   */
  async attemptReconnection() {
    if (import.meta.env.DEV) {
      console.log(
        `Attempting reconnection ${this.state.reconnectAttempt}/${this.options.reconnectAttempts} (${this.role})`
      );
    }

    try {
      // Restart ICE
      await this.peerConnection.restartIce();

      // Only initiator initiates SDP renegotiation for ICE restart
      if (this.role === 'initiator') {
        // Perform SDP renegotiation for ICE restart
        const offer = await this.peerConnection.createOffer({
          iceRestart: true,
        });
        await this.peerConnection.setLocalDescription(offer);

        // Send the new offer through signaling
        if (this.callbacks.onIceRestart) {
          try {
            await this.callbacks.onIceRestart(offer);
          } catch (signalingError) {
            console.error('ICE restart signaling failed:', signalingError);
            throw signalingError;
          }
        } else {
          console.warn('No onIceRestart callback provided for signaling');
        }
      }
      // Joiner will respond to incoming ICE restart offer through existing offer listener

      // Reset start time for timeout calculation
      this.state.startTime = Date.now();
      this.startConnectionTimeout();
    } catch (error) {
      console.error('Reconnection attempt failed:', error);
      this.handleDisconnected();
    }
  }

  /**
   * Start connection timeout
   */
  startConnectionTimeout() {
    this.clearConnectionTimeout();

    this.timers.connectionTimeout = setTimeout(() => {
      if (this.state.current !== 'connected') {
        this.handleFailed('Connection timeout');
      }
    }, this.options.connectionTimeout);
  }

  /**
   * Clear connection timeout
   */
  clearConnectionTimeout() {
    if (this.timers.connectionTimeout) {
      clearTimeout(this.timers.connectionTimeout);
      this.timers.connectionTimeout = null;
    }
  }

  /**
   * Clear reconnect timer
   */
  clearReconnectTimer() {
    if (this.timers.reconnectTimer) {
      clearTimeout(this.timers.reconnectTimer);
      this.timers.reconnectTimer = null;
    }
  }

  /**
   * Update internal state
   */
  updateState(newState) {
    this.state.previous = this.state.current;
    this.state.current = newState;
  }

  /**
   * Get current state information
   */
  getState() {
    return {
      ...this.state,
      peerConnectionState: this.peerConnection.connectionState,
      iceConnectionState: this.peerConnection.iceConnectionState,
      iceGatheringState: this.peerConnection.iceGatheringState,
      connectionTime: Date.now() - this.state.startTime,
    };
  }

  /**
   * Force reconnection
   */
  async forceReconnect() {
    if (import.meta.env.DEV) {
      console.log('Forcing reconnection...');
    }

    this.state.reconnectAttempt = 0;
    await this.attemptReconnection();
  }

  /**
   * Clean up timers and listeners
   */
  cleanup() {
    // Clear timers
    this.clearConnectionTimeout();
    this.clearReconnectTimer();

    // Remove WebRTC event listeners to prevent memory leaks
    if (this.peerConnection) {
      this.peerConnection.onconnectionstatechange = null;
      this.peerConnection.oniceconnectionstatechange = null;
    }

    // Clear callback references to prevent memory leaks
    this.callbacks = {
      onStateChange: null,
      onConnected: null,
      onDisconnected: null,
      onFailed: null,
      onReconnecting: null,
      onIceRestart: null,
    };

    // Reset state
    this.state = {
      current: 'closed',
      previous: this.state.current,
      startTime: Date.now(),
      reconnectAttempt: 0,
      lastError: null,
    };

    if (import.meta.env.DEV) {
      console.log('Connection state manager cleaned up');
    }
  }
}
