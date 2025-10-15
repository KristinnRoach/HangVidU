// src/features/session/page-reload-manager.js - Handle page reload during calls

import {
  saveState,
  loadState,
  clearState,
} from '../../storage/localStorage.js';
import { updateState, getState } from '../../app/state.js';

/**
 * Manages page reload scenarios to maintain call continuity
 */
export class PageReloadManager {
  constructor() {
    this.isRestoring = false;
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
  saveCurrentSession() {
    const currentState = getState();

    // Only save if we're in an active session
    if (!currentState.room.id) {
      return;
    }

    const sessionData = {
      // Room information
      roomId: currentState.room.id,
      isInitiator: currentState.room.isInitiator,
      partnerOnline: currentState.room.partnerOnline,

      // Connection state
      connectionState: currentState.connection,
      wasConnected: currentState.connection === 'connected',

      // Media state
      isAudioMuted: currentState.ui.isAudioMuted,
      isVideoOn: currentState.ui.isVideoOn,
      currentFacingMode: currentState.ui.currentFacingMode,

      // Watch mode state
      watchMode: currentState.ui.watchMode,
      streamUrl: currentState.sync.streamUrl,

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

    // Check if we were actually connected
    if (!savedState.wasConnected) {
      if (import.meta.env.DEV) {
        console.log('Session was not connected, not restoring');
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

    try {
      this.restorationCallbacks.onStatusUpdate?.('Restoring session...');

      // Update app state
      updateState({
        room: {
          id: savedState.roomId,
          isInitiator: savedState.isInitiator,
          partnerOnline: savedState.partnerOnline,
        },
        connection: 'reconnecting',
        ui: {
          isAudioMuted: savedState.isAudioMuted,
          isVideoOn: savedState.isVideoOn,
          currentFacingMode: savedState.currentFacingMode,
          watchMode: savedState.watchMode,
        },
        sync: {
          streamUrl: savedState.streamUrl || '',
          isSyncing: false,
        },
      });

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
      updateState({
        connection: 'idle',
        room: { id: null, isInitiator: false, partnerOnline: false },
      });

      return { success: false, reason: error.message };
    } finally {
      this.isRestoring = false;
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
          isInitiator: savedState.isInitiator,
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
  setupAutoSave() {
    // Save state periodically during active sessions
    const saveInterval = setInterval(() => {
      const currentState = getState();
      if (currentState.room.id && currentState.connection !== 'idle') {
        this.saveCurrentSession();
      }
    }, 10000); // Save every 10 seconds

    // Save state before page unload
    const handleBeforeUnload = () => {
      this.saveCurrentSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Save state when page becomes hidden (mobile/tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        this.saveCurrentSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Return cleanup function
    return () => {
      clearInterval(saveInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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
    updateState({
      connection: 'idle',
      room: { id: null, isInitiator: false, partnerOnline: false },
      ui: { watchMode: false },
      sync: { streamUrl: '', isSyncing: false },
    });
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
            isInitiator: savedState.isInitiator,
            sessionAge: savedState.lastActivity
              ? Date.now() - savedState.lastActivity
              : null,
            wasConnected: savedState.wasConnected,
          }
        : null,
    };
  }
}
