// src/features/connect/connection-monitor.js - Enhanced connection monitoring

import { validateVideoStream, analyzeMediaStream, monitorVideoStream } from '../../utils/video/stream-validator.js';

/**
 * Enhanced connection monitor that validates actual media streaming
 */
export class ConnectionMonitor {
  constructor(options = {}) {
    this.options = {
      videoValidationTimeout: 8000,
      maxRetries: 3,
      retryDelay: 2000,
      monitorInterval: 3000,
      ...options
    };
    
    this.state = {
      connectionState: 'idle', // idle, connecting, validating, connected, failed
      videoValidated: false,
      audioValidated: false,
      retryCount: 0,
      lastError: null
    };
    
    this.callbacks = {
      onStatusUpdate: null,
      onConnectionStateChange: null,
      onValidationComplete: null
    };
    
    this.monitors = {
      video: null,
      connection: null
    };
  }
  
  /**
   * Set callback functions
   */
  setCallbacks({ onStatusUpdate, onConnectionStateChange, onValidationComplete }) {
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
      await this.validateRemoteVideo(remoteVideoElement);
      this.updateConnectionState('connected');
      this.updateStatus('Connected! Video streaming successfully.');
      
      // Start continuous monitoring
      this.startContinuousMonitoring(remoteVideoElement);
      
      this.callbacks.onValidationComplete?.({
        success: true,
        videoValidated: this.state.videoValidated,
        audioValidated: this.state.audioValidated
      });
      
    } catch (error) {
      this.handleValidationFailure(error, remoteVideoElement, peerConnection);
    }
  }
  
  /**
   * Validate remote video stream
   */
  async validateRemoteVideo(videoElement) {
    this.updateConnectionState('validating');
    this.updateStatus('Validating video stream...');
    
    const result = await validateVideoStream(videoElement, {
      timeout: this.options.videoValidationTimeout,
      checkInterval: 500,
      minWidth: 32,
      minHeight: 32
    });
    
    if (!result.isValid) {
      throw new Error(`Video validation failed: ${result.message}`);
    }
    
    this.state.videoValidated = true;
    
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
        checkInterval: this.options.monitorInterval,
        maxFailures: 2,
        autoRecover: true
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
        this.updateStatus(`Connection issue: ${status.message}`);
        break;
        
      case 'failed':
        this.updateConnectionState('failed');
        this.updateStatus(`Video stream failed: ${status.message}`);
        break;
        
      case 'recovered':
        this.updateConnectionState('connected');
        this.updateStatus('Connected! Video streaming successfully.');
        break;
    }
  }
  
  /**
   * Handle validation failure with retry logic
   */
  async handleValidationFailure(error, videoElement, peerConnection) {
    this.state.lastError = error;
    this.state.retryCount++;
    
    if (this.state.retryCount <= this.options.maxRetries) {
      this.updateStatus(`Connection issue detected. Retrying... (${this.state.retryCount}/${this.options.maxRetries})`);
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, this.options.retryDelay));
      
      try {
        await this.validateRemoteVideo(videoElement);
        this.updateConnectionState('connected');
        this.updateStatus('Connected! Video streaming successfully.');
        this.startContinuousMonitoring(videoElement);
        
        this.callbacks.onValidationComplete?.({
          success: true,
          videoValidated: this.state.videoValidated,
          audioValidated: this.state.audioValidated,
          retriesUsed: this.state.retryCount
        });
        
      } catch (retryError) {
        await this.handleValidationFailure(retryError, videoElement, peerConnection);
      }
    } else {
      // Max retries exceeded
      this.updateConnectionState('failed');
      this.updateStatus('Connection failed: Unable to establish video stream. Please try again.');
      
      this.callbacks.onValidationComplete?.({
        success: false,
        error: error.message,
        retriesUsed: this.state.retryCount
      });
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
    this.state.retryCount = 0;
    this.state.lastError = null;
  }
}