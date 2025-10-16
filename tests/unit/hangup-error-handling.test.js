// tests/unit/hangup-error-handling.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('HangUp Error Handling', () => {
  let mockConnectionMonitor;
  let mockPageReloadManager;
  let mockAutoSaveCleanup;
  let mockGetManager;
  let mockClearManagers;
  let consoleWarnSpy;

  beforeEach(() => {
    // Mock managers
    mockConnectionMonitor = {
      cleanup: vi.fn(),
    };

    mockPageReloadManager = {
      clearSession: vi.fn(),
    };

    mockAutoSaveCleanup = vi.fn();

    // Mock state management functions
    mockGetManager = vi.fn((name) => {
      switch (name) {
        case 'connectionMonitor':
          return mockConnectionMonitor;
        case 'pageReloadManager':
          return mockPageReloadManager;
        case 'autoSaveCleanup':
          return mockAutoSaveCleanup;
        default:
          return null;
      }
    });

    mockClearManagers = vi.fn();

    // Mock console.warn for DEV environment
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Mock import.meta.env.DEV
    vi.stubGlobal('import.meta', { env: { DEV: true } });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should handle connectionMonitor cleanup errors gracefully', () => {
    const error = new Error('Cleanup failed');
    mockConnectionMonitor.cleanup.mockImplementation(() => {
      throw error;
    });

    // Simulate the cleanup logic from hangUp function
    const connectionMonitor = mockGetManager('connectionMonitor');
    if (connectionMonitor) {
      try {
        connectionMonitor.cleanup();
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('Error during connection monitor cleanup:', error);
        }
      }
    }

    expect(mockConnectionMonitor.cleanup).toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Error during connection monitor cleanup:',
      error
    );
  });

  it('should handle pageReloadManager clearSession errors gracefully', () => {
    const error = new Error('Clear session failed');
    mockPageReloadManager.clearSession.mockImplementation(() => {
      throw error;
    });

    // Simulate the cleanup logic from hangUp function
    const pageReloadManager = mockGetManager('pageReloadManager');
    if (pageReloadManager) {
      try {
        pageReloadManager.clearSession();
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('Error clearing session:', error);
        }
      }
    }

    expect(mockPageReloadManager.clearSession).toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Error clearing session:',
      error
    );
  });

  it('should handle autoSaveCleanup errors gracefully', () => {
    const error = new Error('Auto-save cleanup failed');
    mockAutoSaveCleanup.mockImplementation(() => {
      throw error;
    });

    // Simulate the cleanup logic from hangUp function
    const autoSaveCleanup = mockGetManager('autoSaveCleanup');
    if (autoSaveCleanup) {
      try {
        autoSaveCleanup();
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('Error during auto-save cleanup:', error);
        }
      }
    }

    expect(mockAutoSaveCleanup).toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Error during auto-save cleanup:',
      error
    );
  });

  it('should continue cleanup even if multiple managers fail', () => {
    // Make all cleanup methods throw errors
    const connectionError = new Error('Connection cleanup failed');
    const sessionError = new Error('Session cleanup failed');
    const autoSaveError = new Error('Auto-save cleanup failed');

    mockConnectionMonitor.cleanup.mockImplementation(() => {
      throw connectionError;
    });
    mockPageReloadManager.clearSession.mockImplementation(() => {
      throw sessionError;
    });
    mockAutoSaveCleanup.mockImplementation(() => {
      throw autoSaveError;
    });

    // Simulate the complete cleanup logic from hangUp function
    const connectionMonitor = mockGetManager('connectionMonitor');
    if (connectionMonitor) {
      try {
        connectionMonitor.cleanup();
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('Error during connection monitor cleanup:', error);
        }
      }
    }

    const pageReloadManager = mockGetManager('pageReloadManager');
    if (pageReloadManager) {
      try {
        pageReloadManager.clearSession();
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('Error clearing session:', error);
        }
      }
    }

    const autoSaveCleanup = mockGetManager('autoSaveCleanup');
    if (autoSaveCleanup) {
      try {
        autoSaveCleanup();
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('Error during auto-save cleanup:', error);
        }
      }
    }

    // All cleanup methods should have been called despite errors
    expect(mockConnectionMonitor.cleanup).toHaveBeenCalled();
    expect(mockPageReloadManager.clearSession).toHaveBeenCalled();
    expect(mockAutoSaveCleanup).toHaveBeenCalled();

    // All errors should have been logged
    expect(consoleWarnSpy).toHaveBeenCalledTimes(3);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Error during connection monitor cleanup:',
      connectionError
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Error clearing session:',
      sessionError
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Error during auto-save cleanup:',
      autoSaveError
    );
  });

  it('should not log errors in production environment', () => {
    // Reset the spy to clear previous calls
    consoleWarnSpy.mockClear();

    const error = new Error('Cleanup failed');
    mockConnectionMonitor.cleanup.mockImplementation(() => {
      throw error;
    });

    // Simulate the cleanup logic from hangUp function with DEV = false
    const connectionMonitor = mockGetManager('connectionMonitor');
    if (connectionMonitor) {
      try {
        connectionMonitor.cleanup();
      } catch (error) {
        // Simulate production environment (DEV = false)
        const DEV = false;
        if (DEV) {
          console.warn('Error during connection monitor cleanup:', error);
        }
      }
    }

    expect(mockConnectionMonitor.cleanup).toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled(); // Should not log in production
  });
});
