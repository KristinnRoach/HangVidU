import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  SyncManager,
  createSyncManager,
  getSyncManager,
  cleanupSyncManager,
} from '../features/watch2gether/sync-manager.js';

// Mock transport for testing
function createMockTransport() {
  const eventListeners = new Map();

  return {
    isConnected: vi.fn(() => true),
    sendEvent: vi.fn().mockResolvedValue(true),
    onEvent: vi.fn((eventType, callback) => {
      if (!eventListeners.has(eventType)) {
        eventListeners.set(eventType, new Set());
      }
      eventListeners.get(eventType).add(callback);

      // Return cleanup function
      return () => {
        const listeners = eventListeners.get(eventType);
        if (listeners) {
          listeners.delete(callback);
        }
      };
    }),
    // Helper to simulate incoming events
    _simulateEvent: (eventType, data) => {
      const listeners = eventListeners.get('*') || new Set();
      listeners.forEach((callback) => callback(data));
    },
  };
}

// Mock player adapter for testing
function createMockPlayerAdapter() {
  return {
    play: vi.fn().mockResolvedValue(true),
    pause: vi.fn().mockResolvedValue(true),
    seekTo: vi.fn().mockResolvedValue(true),
    getCurrentTime: vi.fn(() => 0),
    getPlayerState: vi.fn(() => 'paused'),
  };
}

describe('SyncManager', () => {
  let mockTransport;
  let mockPlayerAdapter;
  let syncManager;
  const roomId = 'test-room-123';

  beforeEach(() => {
    mockTransport = createMockTransport();
    mockPlayerAdapter = createMockPlayerAdapter();
    syncManager = new SyncManager(roomId, mockPlayerAdapter, mockTransport);
  });

  describe('Event Validation', () => {
    it('should validate sync events correctly', async () => {
      // Valid event should succeed
      const result = await syncManager.sendSyncEvent('play', {
        currentTime: 10.5,
      });
      expect(result).toBe(true);
      expect(mockTransport.sendEvent).toHaveBeenCalled();
    });

    it('should reject invalid event types', async () => {
      const result = await syncManager.sendSyncEvent('invalid-type', {
        currentTime: 10,
      });
      expect(result).toBe(false);
      expect(mockTransport.sendEvent).not.toHaveBeenCalled();
    });

    it('should reject events with invalid data', async () => {
      const result = await syncManager.sendSyncEvent('play', {
        currentTime: 'invalid',
      });
      expect(result).toBe(false);
      expect(mockTransport.sendEvent).not.toHaveBeenCalled();
    });
  });

  describe('Event Deduplication', () => {
    it('should prevent duplicate events', async () => {
      // Create a sync event manually to test deduplication
      const syncEvent = {
        type: 'play',
        data: { currentTime: 10 },
        timestamp: Date.now(),
        eventId: 'test-event-123',
        roomId: roomId,
      };

      // Process the event first time
      const result1 = await syncManager.handleRemoteSyncEvent(syncEvent);
      expect(result1).toBe(true);

      // Try to process the same event again
      const result2 = await syncManager.handleRemoteSyncEvent(syncEvent);
      expect(result2).toBe(false); // Should be rejected as duplicate
    });

    it('should reject events that are too old', async () => {
      const oldEvent = {
        type: 'play',
        data: { currentTime: 10 },
        timestamp: Date.now() - 15000, // 15 seconds ago
        eventId: 'old-event-123',
        roomId: roomId,
      };

      const result = await syncManager.handleRemoteSyncEvent(oldEvent);
      expect(result).toBe(false);
    });
  });

  describe('Sync Loop Prevention', () => {
    it('should prevent sync loops during active syncing', async () => {
      // Start a sync operation
      const promise1 = syncManager.sendSyncEvent('play', { currentTime: 10 });

      // Try to send another event immediately (should be prevented)
      const result2 = await syncManager.sendSyncEvent('pause', {
        currentTime: 10,
      });

      expect(result2).toBe(false); // Should be prevented due to active syncing

      // Wait for first operation to complete
      await promise1;
    });

    it('should allow events after sync loop prevention window', async () => {
      // Send first event
      await syncManager.sendSyncEvent('play', { currentTime: 10 });

      // Wait for sync loop prevention window to pass
      await new Promise((resolve) => setTimeout(resolve, 2100)); // 2.1 seconds

      // Should allow new event now
      const result = await syncManager.sendSyncEvent('pause', {
        currentTime: 15,
      });
      expect(result).toBe(true);
    });
  });

  describe('State Management', () => {
    it('should track sync state correctly', () => {
      const state = syncManager.getSyncState();

      expect(state.roomId).toBe(roomId);
      expect(state.isSyncing).toBe(false);
      expect(state.pendingEvents).toBe(0);
      expect(typeof state.lastSyncTime).toBe('number');
    });

    it('should update last sync time after successful events', async () => {
      const initialState = syncManager.getSyncState();
      const initialTime = initialState.lastSyncTime;

      await syncManager.sendSyncEvent('play', { currentTime: 10 });

      const updatedState = syncManager.getSyncState();
      expect(updatedState.lastSyncTime).toBeGreaterThan(initialTime);
    });
  });

  describe('Event Processing', () => {
    it('should process play events correctly', async () => {
      const playEvent = {
        type: 'play',
        data: { currentTime: 25.5 },
        timestamp: Date.now(),
        eventId: 'play-event-123',
        roomId: roomId,
      };

      const result = await syncManager.handleRemoteSyncEvent(playEvent);

      expect(result).toBe(true);
      expect(mockPlayerAdapter.play).toHaveBeenCalledWith(25.5);
    });

    it('should process pause events correctly', async () => {
      const pauseEvent = {
        type: 'pause',
        data: { currentTime: 30.2 },
        timestamp: Date.now(),
        eventId: 'pause-event-123',
        roomId: roomId,
      };

      const result = await syncManager.handleRemoteSyncEvent(pauseEvent);

      expect(result).toBe(true);
      expect(mockPlayerAdapter.pause).toHaveBeenCalledWith(30.2);
    });

    it('should process seek events correctly', async () => {
      const seekEvent = {
        type: 'seek',
        data: { currentTime: 45.8 },
        timestamp: Date.now(),
        eventId: 'seek-event-123',
        roomId: roomId,
      };

      const result = await syncManager.handleRemoteSyncEvent(seekEvent);

      expect(result).toBe(true);
      expect(mockPlayerAdapter.seekTo).toHaveBeenCalledWith(45.8);
    });
  });

  describe('Retry Logic', () => {
    it('should retry failed sync operations with exponential backoff', async () => {
      // Mock transport to fail first two attempts, succeed on third
      let attemptCount = 0;
      mockTransport.sendEvent.mockImplementation(() => {
        attemptCount++;
        if (attemptCount < 3) {
          return Promise.resolve(false); // Fail first two attempts
        }
        return Promise.resolve(true); // Succeed on third attempt
      });

      const result = await syncManager.sendSyncEvent('play', {
        currentTime: 10,
      });

      expect(result).toBe(true);
      expect(mockTransport.sendEvent).toHaveBeenCalledTimes(3);
    });

    it('should categorize errors correctly', () => {
      // Test transient errors
      const networkError = new Error('Network connection failed');
      networkError.name = 'NetworkError';
      expect(syncManager.categorizeError(networkError)).toBe('transient');

      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'TimeoutError';
      expect(syncManager.categorizeError(timeoutError)).toBe('transient');

      // Test permanent errors
      const validationError = new Error('Invalid data');
      validationError.name = 'ValidationError';
      expect(syncManager.categorizeError(validationError)).toBe('permanent');

      const authError = new Error('Unauthorized');
      authError.name = 'AuthenticationError';
      expect(syncManager.categorizeError(authError)).toBe('permanent');

      // Test unknown errors (should default to transient)
      const unknownError = new Error('Unknown error');
      unknownError.name = 'UnknownError';
      expect(syncManager.categorizeError(unknownError)).toBe('transient');
    });

    it('should calculate retry delays correctly', () => {
      // Test predefined intervals
      expect(syncManager.calculateRetryDelay(1)).toBe(1000); // 1s
      expect(syncManager.calculateRetryDelay(2)).toBe(2000); // 2s
      expect(syncManager.calculateRetryDelay(3)).toBe(4000); // 4s

      // Test exponential backoff for additional attempts
      expect(syncManager.calculateRetryDelay(4)).toBe(8000); // 8s (capped at maxDelay)
    });

    it('should not retry permanent errors', async () => {
      // Mock transport to throw permanent error
      const permanentError = new Error('Invalid room');
      permanentError.name = 'ValidationError';
      mockTransport.sendEvent.mockRejectedValue(permanentError);

      const result = await syncManager.sendSyncEvent('play', {
        currentTime: 10,
      });

      expect(result).toBe(false);
      expect(mockTransport.sendEvent).toHaveBeenCalledTimes(1); // Should not retry
    });

    it('should add failed events to retry queue', async () => {
      // Mock transport to always fail
      mockTransport.sendEvent.mockResolvedValue(false);

      const initialState = syncManager.getSyncState();
      expect(initialState.failedEvents).toBe(0);

      await syncManager.sendSyncEvent('play', { currentTime: 10 });

      const finalState = syncManager.getSyncState();
      expect(finalState.failedEvents).toBe(1);
      expect(finalState.retryQueueSize).toBe(1);
    });

    it('should retry failed operations from queue', async () => {
      // Mock transport to fail initially but succeed on retry
      let callCount = 0;
      mockTransport.sendEvent.mockImplementation(() => {
        callCount++;
        // Fail first call, succeed on subsequent calls
        return Promise.resolve(callCount > 1);
      });

      // Create a failed event by directly adding to retry queue
      const failedEvent = {
        type: 'play',
        data: { currentTime: 10 },
        timestamp: Date.now(),
        eventId: 'test-failed-event',
        roomId: 'test-room-123',
      };

      // Add to failed events with fewer attempts so it can be retried
      syncManager.addFailedEventToRetryQueue(
        failedEvent,
        new Error('Test error'),
        1
      );

      // Verify event is in failed queue
      let state = syncManager.getSyncState();
      expect(state.failedEvents).toBe(1);
      expect(state.retryQueueSize).toBe(1);

      // Retry failed operations
      const retriedCount = await syncManager.retryFailedSyncOperations();

      expect(retriedCount).toBe(1);

      // Verify failed queue is cleared
      state = syncManager.getSyncState();
      expect(state.failedEvents).toBe(0);
      expect(state.retryQueueSize).toBe(0);
    });
  });

  describe('Cleanup', () => {
    it('should clean up resources properly', () => {
      const initialState = syncManager.getSyncState();
      expect(initialState.eventHistorySize).toBeGreaterThanOrEqual(0);

      syncManager.cleanup();

      const finalState = syncManager.getSyncState();
      expect(finalState.eventHistorySize).toBe(0);
      expect(finalState.failedEvents).toBe(0);
      expect(finalState.retryQueueSize).toBe(0);
    });
  });
});

describe('SyncManager Factory Functions', () => {
  let mockTransport;
  let mockPlayerAdapter;
  const roomId = 'factory-test-room';

  beforeEach(() => {
    mockTransport = createMockTransport();
    mockPlayerAdapter = createMockPlayerAdapter();
  });

  it('should create new SyncManager', () => {
    const manager = createSyncManager(roomId, mockPlayerAdapter, mockTransport);

    expect(manager).toBeInstanceOf(SyncManager);
    expect(manager.roomId).toBe(roomId);
  });

  it('should retrieve existing SyncManager', () => {
    const manager1 = createSyncManager(
      roomId,
      mockPlayerAdapter,
      mockTransport
    );
    const manager2 = getSyncManager(roomId);

    expect(manager2).toBe(manager1);
  });

  it('should clean up SyncManager', () => {
    const manager = createSyncManager(roomId, mockPlayerAdapter, mockTransport);
    expect(getSyncManager(roomId)).toBe(manager);

    cleanupSyncManager(roomId);
    expect(getSyncManager(roomId)).toBeNull();
  });
});
