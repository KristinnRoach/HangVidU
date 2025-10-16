// src/features/session/page-reload-manager.js - Handle page reload during calls

import {
  saveState,
  loadState,
  clearState,
} from '../../storage/localStorage.js';
import { getRoomId, getRole } from '../connect/connection.js';

/**
 * Manages page reload scenarios to maintain call continuity
 */
export class PageReloadManager {
  constructor() {
    this.isRestoring = false;
    this.autoSaveCleanup = null;
    this.restorationCallbacks = {
      onMediaRestore: null,
      onConnectionRestore: null,
      onUIRestore: null,
      onStatusUpdate: null,
    };
  }

  /**
   * Set callbacks for restoration process
   */
  setCallbacks(callbacks) {
    Object.assign(this.restorationCallbacks, callbacks);
  }

  /**
   * Save current session state before page unload
   */
  saveCurrentSession(connectionMonitor = null, getFeatureState = {}) {
    const roomId = getRoomId();
    const role = getRole();

    // Only save if we're in an active session
    if (!roomId) {
      return;
    }

    const sessionData = {
      // Room information
      roomId: roomId,
      role: role,
      isInitiator: role === 'initiator', // Backward compatibility

      // Connection state (from ConnectionMonitor if available)
      connectionState: this.getConnectionState(connectionMonitor),
      wasConnected: this.getWasConnected(connectionMonitor),

      // Media state (from feature modules)
      isAudioMuted: getFeatureState.getIsAudioMuted?.() || false,
      isVideoOn: getFeatureState.getIsVideoOn?.() || true,
      currentFacingMode: getFeatureState.getCurrentFacingMode?.() || 'user',

      // Watch mode state (from feature modules)
      watchMode: getFeatureState.getWatchMode?.() || false,
      streamUrl: getFeatureState.getStreamUrl?.() || '',

      // Timestamps
      sessionStartTime: Date.now(),
      lastActivity: Date.now(),
    };

    saveState(sessionData);

    if (import.meta.env.DEV) {
      console.log('Session saved for page reload:', sessionData);
    }
  }

  /**
   * Check if we should attempt session restoration
   */
  shouldRestoreSession() {
    const savedState = loadState();

    if (!savedState || !savedState.roomId) {
      return false;
    }

    // Check if session is recent enough (within 5 minutes)
    const sessionAge = Date.now() - savedState.lastActivity;
    const maxSessionAge = 5 * 60 * 1000; // 5 minutes

    if (sessionAge > maxSessionAge) {
      if (import.meta.env.DEV) {
        console.log(
          'Session too old, not restoring:',
          sessionAge / 1000,
          'seconds'
        );
      }
      clearState();
      return false;
    }

    // Check if we were at least attempting to connect
    // Allow restoration for any non-idle state (connecting, connected, reconnecting, disconnected)
    if (!savedState.connectionState || savedState.connectionState === 'idle') {
      if (import.meta.env.DEV) {
        console.log('Session was idle, not restoring');
      }
      return false;
    }

    return true;
  }

  /**
   * Restore session after page reload
   */
  async restoreSession() {
    const savedState = loadState();

    if (!savedState) {
      return { success: false, reason: 'No saved state' };
    }

    this.isRestoring = true;
    this.pauseAutoSave();

    try {
      this.restorationCallbacks.onStatusUpdate?.('Restoring session...');

      // Feature module state will be restored via callbacks // TODO: Clarify this comment! Is this implemented?

      // Restore media first
      const mediaRestored = await this.restoreMedia(savedState);
      if (!mediaRestored) {
        throw new Error('Failed to restore media');
      }

      // Restore UI state
      this.restoreUI(savedState);

      // Attempt to restore connection
      const connectionRestored = await this.restoreConnection(savedState);
      if (!connectionRestored) {
        throw new Error('Failed to restore connection');
      }

      this.restorationCallbacks.onStatusUpdate?.(
        'Session restored successfully!'
      );

      if (import.meta.env.DEV) {
        console.log('Session restoration completed successfully');
      }

      return { success: true };
    } catch (error) {
      console.error('Session restoration failed:', error);
      this.restorationCallbacks.onStatusUpdate?.(
        `Restoration failed: ${error.message}`
      );

      // Clear invalid state
      clearState();

      return { success: false, reason: error.message };
    } finally {
      this.isRestoring = false;
      this.resumeAutoSave();
    }
  }

  /**
   * Restore media devices and streams
   */
  async restoreMedia(savedState) {
    try {
      this.restorationCallbacks.onStatusUpdate?.(
        'Restoring camera and microphone...'
      );

      const mediaResult = await this.restorationCallbacks.onMediaRestore?.({
        isAudioMuted: savedState.isAudioMuted,
        isVideoOn: savedState.isVideoOn,
        currentFacingMode: savedState.currentFacingMode,
      });

      if (!mediaResult || !mediaResult.success) {
        throw new Error('Media restoration failed');
      }

      if (import.meta.env.DEV) {
        console.log('Media restored successfully');
      }

      return true;
    } catch (error) {
      console.error('Failed to restore media:', error);
      return false;
    }
  }

  /**
   * Restore connection to the room
   */
  async restoreConnection(savedState) {
    try {
      this.restorationCallbacks.onStatusUpdate?.('Reconnecting to room...');

      const connectionResult =
        await this.restorationCallbacks.onConnectionRestore?.({
          roomId: savedState.roomId,
          role:
            savedState.role ||
            (savedState.isInitiator ? 'initiator' : 'joiner'),
          isInitiator: savedState.isInitiator, // Backward compatibility
          wasConnected: savedState.wasConnected,
        });

      if (!connectionResult || !connectionResult.success) {
        throw new Error('Connection restoration failed');
      }

      if (import.meta.env.DEV) {
        console.log('Connection restored successfully');
      }

      return true;
    } catch (error) {
      console.error('Failed to restore connection:', error);
      return false;
    }
  }

  /**
   * Restore UI state
   */
  restoreUI(savedState) {
    try {
      this.restorationCallbacks.onUIRestore?.({
        isAudioMuted: savedState.isAudioMuted,
        isVideoOn: savedState.isVideoOn,
        watchMode: savedState.watchMode,
        streamUrl: savedState.streamUrl,
      });

      if (import.meta.env.DEV) {
        console.log('UI state restored');
      }
    } catch (error) {
      console.error('Failed to restore UI:', error);
    }
  }

  /**
   * Set up automatic state saving
   */
  setupAutoSave(getConnectionMonitor = () => null) {
    // Don't start auto-save if currently restoring
    if (this.isRestoring) {
      return () => {}; // Return no-op cleanup
    }

    let saveInterval = null;

    // Create interval that respects restoration state
    const startInterval = () => {
      if (saveInterval) return; // Already running

      saveInterval = setInterval(() => {
        // Skip saving if restoring or paused
        if (this.isRestoring || this._autoSavePaused) {
          return;
        }

        const roomId = getRoomId();
        const connectionMonitor = getConnectionMonitor();
        if (roomId && this.getConnectionState(connectionMonitor) !== 'idle') {
          this.saveCurrentSession(connectionMonitor);
        }
      }, 10000); // Save every 10 seconds
    };

    const stopInterval = () => {
      if (saveInterval) {
        clearInterval(saveInterval);
        saveInterval = null;
      }
    };

    // Start the interval
    startInterval();

    // Save state before page unload (but not during restoration)
    const handleBeforeUnload = () => {
      if (!this.isRestoring) {
        this.saveCurrentSession();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Save state when page becomes hidden (mobile/tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden && !this.isRestoring) {
        this.saveCurrentSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Return cleanup function
    return () => {
      stopInterval();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }

  /**
   * Pause auto-save during restoration
   */
  pauseAutoSave() {
    this._autoSavePaused = true;
  }

  /**
   * Resume auto-save after restoration
   */
  resumeAutoSave() {
    this._autoSavePaused = false;
  }

  /**
   * Check if currently restoring
   */
  isCurrentlyRestoring() {
    return this.isRestoring;
  }

  /**
   * Clear saved session
   */
  clearSession() {
    clearState();
  }

  /**
   * Get connection state from ConnectionMonitor if available, fallback to 'idle'
   */
  getConnectionState(connectionMonitor) {
    if (connectionMonitor) {
      const monitorState = connectionMonitor.getState();
      return monitorState.connectionState || 'idle';
    }
    return 'idle';
  }

  /**
   * Determine if connection was established based on ConnectionMonitor state
   */
  getWasConnected(connectionMonitor) {
    if (connectionMonitor) {
      const monitorState = connectionMonitor.getState();
      return (
        monitorState.connectionState === 'connected' ||
        monitorState.videoValidated
      );
    }
    return false;
  }

  /**
   * Get restoration status for debugging
   */
  getRestorationInfo() {
    const savedState = loadState();
    return {
      hasSavedState: !!savedState,
      shouldRestore: this.shouldRestoreSession(),
      isRestoring: this.isRestoring,
      savedState: savedState
        ? {
            roomId: savedState.roomId,
            role:
              savedState.role ||
              (savedState.isInitiator ? 'initiator' : 'joiner'),
            isInitiator: savedState.isInitiator, // Backward compatibility
            sessionAge: savedState.lastActivity
              ? Date.now() - savedState.lastActivity
              : null,
            wasConnected: savedState.wasConnected,
          }
        : null,
    };
  }
}
