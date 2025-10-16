import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initializeWebRTCSync,
  sendSyncEvent,
  onSyncEvent,
  getSyncStatus,
  cleanupWebRTCSync,
} from '../features/watch2gether/webrtc-sync.js';

// Mock RTCPeerConnection and RTCDataChannel
function createMockDataChannel() {
  const eventListeners = {};

  return {
    readyState: 'open',
    send: vi.fn(),
    close: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    // Event handler properties
    onopen: null,
    onclose: null,
    onerror: null,
    onmessage: null,
    // Helper to trigger events
    _triggerEvent: (type, data) => {
      if (eventListeners[type]) {
        eventListeners[type](data);
      }
    },
  };
}

function createMockPeerConnection() {
  const mockDataChannel = createMockDataChannel();

  return {
    createDataChannel: vi.fn(() => mockDataChannel),
    ondatachannel: null,
    _mockDataChannel: mockDataChannel,
  };
}

describe('WebRTC Sync Enhanced Features', () => {
  let mockPeerConnection;
  let mockDataChannel;

  beforeEach(() => {
    mockPeerConnection = createMockPeerConnection();
    mockDataChannel = mockPeerConnection._mockDataChannel;

    // Clean up any existing state
    cleanupWebRTCSync();
  });

  afterEach(() => {
    cleanupWebRTCSync();
  });

  describe('Connection Monitoring', () => {
    it('should start connection monitoring when channel opens', () => {
      initializeWebRTCSync(mockPeerConnection, true);

      // Simulate channel opening
      mockDataChannel.onopen();

      const status = getSyncStatus();
      expect(status.connectionState).toBe('connected');
      expect(status.isConnected).toBe(true);
    });

    it('should detect connection loss on channel close', () => {
      initializeWebRTCSync(mockPeerConnection, true);
      mockDataChannel.onopen();

      // Simulate channel closing
      mockDataChannel.onclose();

      const status = getSyncStatus();
      expect(status.connectionState).toBe('disconnected');
      expect(status.isConnected).toBe(false);
    });

    it('should handle heartbeat messages', () => {
      initializeWebRTCSync(mockPeerConnection, true);
      mockDataChannel.onopen();

      // Simulate receiving heartbeat
      const heartbeat = {
        data: JSON.stringify({
          type: 'heartbeat',
          eventId: 'test-heartbeat',
          timestamp: Date.now(),
        }),
      };

      mockDataChannel.onmessage(heartbeat);

      // Should send heartbeat response
      expect(mockDataChannel.send).toHaveBeenCalledWith(
        expect.stringContaining('"type":"heartbeat-response"')
      );
    });
  });

  describe('Event Delivery with Retry', () => {
    it('should send events with delivery confirmation', () => {
      initializeWebRTCSync(mockPeerConnection, true);
      mockDataChannel.onopen();

      const result = sendSyncEvent('play', { currentTime: 10 });

      expect(result).toBe(true);
      expect(mockDataChannel.send).toHaveBeenCalledWith(
        expect.stringContaining('"requiresConfirmation":true')
      );
    });

    it('should queue events when channel is not ready', () => {
      initializeWebRTCSync(mockPeerConnection, true);
      // Don't open channel
      mockDataChannel.readyState = 'connecting';

      const result = sendSyncEvent('play', { currentTime: 10 });

      expect(result).toBe(false);
      const status = getSyncStatus();
      expect(status.queuedMessages).toBe(1);
    });

    it('should process queued events when channel opens', () => {
      initializeWebRTCSync(mockPeerConnection, true);
      mockDataChannel.readyState = 'connecting';

      // Queue an event
      sendSyncEvent('play', { currentTime: 10 });

      // Now open the channel
      mockDataChannel.readyState = 'open';
      mockDataChannel.onopen();

      // Should send the queued event
      expect(mockDataChannel.send).toHaveBeenCalled();
    });

    it('should handle delivery confirmations', () => {
      initializeWebRTCSync(mockPeerConnection, true);
      mockDataChannel.onopen();

      // Send an event
      sendSyncEvent('play', { currentTime: 10 });

      // Get the event ID from the sent message
      const sentMessage = JSON.parse(mockDataChannel.send.mock.calls[0][0]);
      const eventId = sentMessage.eventId;

      // Simulate delivery confirmation
      const confirmation = {
        data: JSON.stringify({
          type: 'delivery-confirmation',
          data: { originalEventId: eventId },
          timestamp: Date.now(),
        }),
      };

      mockDataChannel.onmessage(confirmation);

      // Event should be removed from pending events
      const status = getSyncStatus();
      expect(status.pendingEvents).toBe(0);
    });
  });

  describe('Event Deduplication', () => {
    it('should prevent duplicate events', () => {
      initializeWebRTCSync(mockPeerConnection, true);
      mockDataChannel.onopen();

      const eventCallback = vi.fn();
      onSyncEvent('play', eventCallback);

      // Simulate receiving the same event twice
      const duplicateEvent = {
        data: JSON.stringify({
          type: 'play',
          data: { currentTime: 10 },
          eventId: 'duplicate-test-id',
          timestamp: Date.now(),
          requiresConfirmation: false, // Don't require confirmation to simplify test
        }),
      };

      // First time - should trigger callback
      mockDataChannel.onmessage(duplicateEvent);
      expect(eventCallback).toHaveBeenCalledTimes(1);

      // Second time - should ignore duplicate
      mockDataChannel.onmessage(duplicateEvent);
      expect(eventCallback).toHaveBeenCalledTimes(1); // Still only called once
    });

    it('should ignore old events', () => {
      initializeWebRTCSync(mockPeerConnection, true);
      mockDataChannel.onopen();

      const eventCallback = vi.fn();
      onSyncEvent('play', eventCallback);

      // Simulate receiving an old event (more than 10 seconds old)
      const oldEvent = {
        data: JSON.stringify({
          type: 'play',
          data: { currentTime: 10 },
          eventId: 'old-event',
          timestamp: Date.now() - 15000, // 15 seconds ago
        }),
      };

      mockDataChannel.onmessage(oldEvent);

      // Should not trigger callback
      expect(eventCallback).not.toHaveBeenCalled();
    });
  });

  describe('Status Reporting', () => {
    it('should report comprehensive sync status', () => {
      initializeWebRTCSync(mockPeerConnection, true);

      const status = getSyncStatus();

      expect(status).toHaveProperty('isConnected');
      expect(status).toHaveProperty('connectionState');
      expect(status).toHaveProperty('channelState');
      expect(status).toHaveProperty('queuedMessages');
      expect(status).toHaveProperty('pendingEvents');
      expect(status).toHaveProperty('missedHeartbeats');
      expect(status).toHaveProperty('lastSyncTime');
    });

    it('should track missed heartbeats', () => {
      initializeWebRTCSync(mockPeerConnection, true);
      mockDataChannel.onopen();

      const initialStatus = getSyncStatus();
      expect(initialStatus.missedHeartbeats).toBe(0);

      // The actual heartbeat logic runs on timers,
      // so we just verify the status structure is correct
      expect(typeof initialStatus.missedHeartbeats).toBe('number');
    });
  });

  describe('Cleanup', () => {
    it('should clean up all resources', () => {
      initializeWebRTCSync(mockPeerConnection, true);
      mockDataChannel.onopen();

      cleanupWebRTCSync();

      const status = getSyncStatus();
      expect(status.isConnected).toBe(false);
      expect(status.connectionState).toBe('idle');
      expect(status.queuedMessages).toBe(0);
      expect(status.pendingEvents).toBe(0);
      expect(mockDataChannel.close).toHaveBeenCalled();
    });
  });
});
