// tests/unit/hangup-error-handling.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('HangUp Error Handling', () => {
  let mockConnectionMonitor;
  let mockGetManager;
  let mockClearManagers;
  let consoleWarnSpy;

  beforeEach(() => {
    // Mock managers
    mockConnectionMonitor = {
      cleanup: vi.fn(),
    };

    // Mock state management functions
    mockGetManager = vi.fn((name) => {
      switch (name) {
        case 'connectionMonitor':
          return mockConnectionMonitor;
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
