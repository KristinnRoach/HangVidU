// src/features/connect/connection-monitor.js - Enhanced connection monitoring

import {
  validateVideoStream,
  analyzeMediaStream,
  monitorVideoStream,
} from '../../utils/video/stream-validator.js';

/**
 * Enhanced connection monitor that validates actual media streaming
 */
export class ConnectionMonitor {
  constructor(options = {}) {
    this.options = {
      videoValidationTimeout: 8000,
      monitorInterval: 3000,
      ...options,
    };

    this.state = {
      connectionState: 'idle', // idle, connecting, validating, connected, failed
      videoValidated: false,
      audioValidated: false,
    };

    this.callbacks = {
      onStatusUpdate: null,
      onConnectionStateChange: null,
      onValidationComplete: null,
    };

    this.monitors = {
      video: null,
      connection: null,
    };
  }

  /**
   * Set callback functions
   */
  setCallbacks({
    onStatusUpdate,
    onConnectionStateChange,
    onValidationComplete,
  }) {
    this.callbacks.onStatusUpdate = onStatusUpdate;
    this.callbacks.onConnectionStateChange = onConnectionStateChange;
    this.callbacks.onValidationComplete = onValidationComplete;
  }

  /**
   * Start monitoring a remote video connection
   */
  async startMonitoring(remoteVideoElement, peerConnection) {
    this.updateConnectionState('connecting');
    this.updateStatus('Establishing connection...');

    // Monitor peer connection state
    this.monitorPeerConnection(peerConnection);

    // Wait for remote stream and validate it
    try {
      // Give more time for the stream to stabilize
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await this.validateRemoteVideo(remoteVideoElement);
      this.updateConnectionState('connected');

      if (this.state.videoValidated) {
        this.updateStatus('Connected! Video streaming successfully.');
      } else {
        this.updateStatus('Connected, but video stream has issues)');
      }
      // Start continuous monitoring with less aggressive settings
      this.startContinuousMonitoring(remoteVideoElement);

      this.callbacks.onValidationComplete?.({
        success: true,
        videoValidated: this.state.videoValidated,
        audioValidated: this.state.audioValidated,
      });
    } catch (error) {
      // Don't fail the connection for validation issues - just log and continue
      if (import.meta.env.DEV) {
        console.warn(
          'Video validation failed, but continuing connection:',
          error.message
        );
      }

      this.updateConnectionState('connected');
      this.updateStatus('Connected! (Video validation skipped)');

      this.callbacks.onValidationComplete?.({
        success: true,
        videoValidated: false,
        audioValidated: false,
        warning: error.message,
      });
    }
  }

  /**
   * Validate remote video stream
   */
  async validateRemoteVideo(videoElement) {
    this.updateConnectionState('validating');
    this.updateStatus('Validating video stream...');

    // Use more lenient validation settings
    const result = await validateVideoStream(videoElement, {
      timeout: this.options.videoValidationTimeout,
      checkInterval: 1000, // Less frequent checks
      minWidth: 16, // Lower minimum dimensions
      minHeight: 16,
      blackThreshold: 5, // More lenient black frame detection
    });

    if (!result.isValid) {
      // For certain validation failures, just warn instead of failing
      if (result.reason === 'frozen' || result.reason === 'timeout') {
        if (import.meta.env.DEV) {
          console.warn(`Video validation warning: ${result.message}`);
        }
        // Continue with connection but mark as not validated
        this.state.videoValidated = false;
      } else {
        throw new Error(`Video validation failed: ${result.message}`);
      }
    } else {
      this.state.videoValidated = true;
    }

    // Also analyze the stream
    if (videoElement.srcObject) {
      const streamAnalysis = analyzeMediaStream(videoElement.srcObject);
      this.state.audioValidated = streamAnalysis.audioEnabled;

      if (import.meta.env.DEV) {
        console.log('Stream analysis:', streamAnalysis);
        console.log('Video validation result:', result);
      }
    }

    return result;
  }

  /**
   * Monitor peer connection state changes
   */
  monitorPeerConnection(peerConnection) {
    if (!peerConnection) return;

    peerConnection.onconnectionstatechange = () => {
      const state = peerConnection.connectionState;

      if (import.meta.env.DEV) {
        console.log('Peer connection state:', state);
      }

      switch (state) {
        case 'connected':
          // Don't update to connected yet - wait for video validation
          break;

        case 'disconnected':
          this.updateConnectionState('reconnecting');
          this.updateStatus('Connection lost. Attempting to reconnect...');
          break;

        case 'failed':
          this.updateConnectionState('failed');
          this.updateStatus('Connection failed. Please try again.');
          break;

        case 'closed':
          this.updateConnectionState('idle');
          this.updateStatus('Connection closed.');
          this.cleanup();
          break;
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      const iceState = peerConnection.iceConnectionState;

      if (import.meta.env.DEV) {
        console.log('ICE connection state:', iceState);
      }

      if (iceState === 'failed') {
        this.handleConnectionFailure('ICE connection failed');
      }
    };
  }

  /**
   * Start continuous monitoring of video stream
   */
  startContinuousMonitoring(videoElement) {
    this.monitors.video = monitorVideoStream(
      videoElement,
      (status) => this.handleVideoMonitorUpdate(status),
      {
        checkInterval: this.options.monitorInterval * 2, // Less frequent monitoring
        maxFailures: 5, // More tolerance for failures
        autoRecover: true,
      }
    );
  }

  /**
   * Handle video monitor updates
   */
  handleVideoMonitorUpdate(status) {
    switch (status.status) {
      case 'valid':
        // Video is healthy - no action needed
        break;

      case 'warning':
        // Only show warnings in dev mode to avoid spamming users
        if (import.meta.env.DEV) {
          console.warn(`Video monitor warning: ${status.message}`);
        }
        break;

      case 'failed':
        // Don't fail the entire connection for video validation issues
        if (import.meta.env.DEV) {
          console.warn(`Video monitor failed: ${status.message}`);
        }
        // Just log the issue but keep connection as connected
        break;

      case 'recovered':
        if (import.meta.env.DEV) {
          console.log('Video stream recovered');
        }
        break;
    }
  }

  /**
   * Handle general connection failure
   */
  handleConnectionFailure(reason) {
    this.updateConnectionState('failed');
    this.updateStatus(`Connection failed: ${reason}`);
    this.cleanup();
  }

  /**
   * Update connection state
   */
  updateConnectionState(newState) {
    const oldState = this.state.connectionState;
    this.state.connectionState = newState;

    if (oldState !== newState) {
      this.callbacks.onConnectionStateChange?.(newState, oldState);
    }
  }

  /**
   * Update status message
   */
  updateStatus(message) {
    this.callbacks.onStatusUpdate?.(message);
  }

  /**
   * Get current state
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Clean up monitors and listeners
   */
  cleanup() {
    if (this.monitors.video) {
      this.monitors.video();
      this.monitors.video = null;
    }

    // Reset state
    this.state.connectionState = 'idle';
    this.state.videoValidated = false;
    this.state.audioValidated = false;
  }
}
