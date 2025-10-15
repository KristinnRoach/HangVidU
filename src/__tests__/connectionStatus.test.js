import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  setConnectionStatus,
  listenForPartnerReconnection,
  clearConnectionStatus,
} from '../features/connect/connectionStatus.js';

// Mock Firebase
vi.mock('../storage/firebaseRealTimeDB.js', () => {
  const mockRef = {
    set: vi.fn(() => Promise.resolve()),
    on: vi.fn(),
    off: vi.fn(),
    remove: vi.fn(() => Promise.resolve()),
  };

  const mockDb = {
    ref: vi.fn(() => mockRef),
  };

  return { db: mockDb };
});

import { db } from '../storage/firebaseRealTimeDB.js';

describe('Firebase connection status helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('setConnectionStatus', () => {
    it('should set connection status in Firebase', async () => {
      await setConnectionStatus('room123', 'initiator', 'connected');

      expect(db.ref).toHaveBeenCalledWith(
        'rooms/room123/connections/initiator'
      );
      expect(db.ref().set).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'connected',
          timestamp: expect.any(Number),
        })
      );
    });

    it('should handle reconnecting status', async () => {
      await setConnectionStatus('room456', 'joiner', 'reconnecting');

      expect(db.ref).toHaveBeenCalledWith('rooms/room456/connections/joiner');
      expect(db.ref().set).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'reconnecting',
        })
      );
    });

    it('should do nothing if roomId is missing', async () => {
      await setConnectionStatus(null, 'initiator', 'connected');
      expect(db.ref).not.toHaveBeenCalled();
    });

    it('should do nothing if role is missing', async () => {
      await setConnectionStatus('room123', null, 'connected');
      expect(db.ref).not.toHaveBeenCalled();
    });
  });

  describe('listenForPartnerReconnection', () => {
    it('should listen to partner status (initiator listens to joiner)', () => {
      const callback = vi.fn();

      listenForPartnerReconnection('room123', 'initiator', callback);

      expect(db.ref).toHaveBeenCalledWith(
        'rooms/room123/connections/joiner/status'
      );
      expect(db.ref().on).toHaveBeenCalledWith('value', expect.any(Function));
    });

    it('should listen to partner status (joiner listens to initiator)', () => {
      const callback = vi.fn();

      listenForPartnerReconnection('room123', 'joiner', callback);

      expect(db.ref).toHaveBeenCalledWith(
        'rooms/room123/connections/initiator/status'
      );
      expect(db.ref().on).toHaveBeenCalledWith('value', expect.any(Function));
    });

    it('should call callback when partner status is "reconnecting"', () => {
      const callback = vi.fn();
      let capturedListener;

      db.ref().on.mockImplementation((event, listener) => {
        capturedListener = listener;
      });

      listenForPartnerReconnection('room123', 'initiator', callback);

      // Simulate Firebase snapshot
      const mockSnapshot = { val: () => 'reconnecting' };
      capturedListener(mockSnapshot);

      expect(callback).toHaveBeenCalled();
    });

    it('should not call callback for other status values', () => {
      const callback = vi.fn();
      let capturedListener;

      db.ref().on.mockImplementation((event, listener) => {
        capturedListener = listener;
      });

      listenForPartnerReconnection('room123', 'initiator', callback);

      const mockSnapshot = { val: () => 'connected' };
      capturedListener(mockSnapshot);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should return cleanup function that removes listener', () => {
      const callback = vi.fn();

      const cleanup = listenForPartnerReconnection(
        'room123',
        'initiator',
        callback
      );
      cleanup();

      expect(db.ref().off).toHaveBeenCalledWith('value', expect.any(Function));
    });

    it('should return null if roomId is missing', () => {
      const callback = vi.fn();
      const result = listenForPartnerReconnection(null, 'initiator', callback);
      expect(result).toBeNull();
    });

    it('should return null if role is missing', () => {
      const callback = vi.fn();
      const result = listenForPartnerReconnection('room123', null, callback);
      expect(result).toBeNull();
    });
  });

  describe('clearConnectionStatus', () => {
    it('should remove connection status from Firebase', async () => {
      await clearConnectionStatus('room123', 'initiator');

      expect(db.ref).toHaveBeenCalledWith(
        'rooms/room123/connections/initiator'
      );
      expect(db.ref().remove).toHaveBeenCalled();
    });

    it('should do nothing if roomId is missing', async () => {
      await clearConnectionStatus(null, 'initiator');
      expect(db.ref).not.toHaveBeenCalled();
    });

    it('should do nothing if role is missing', async () => {
      await clearConnectionStatus('room123', null);
      expect(db.ref).not.toHaveBeenCalled();
    });
  });
});
