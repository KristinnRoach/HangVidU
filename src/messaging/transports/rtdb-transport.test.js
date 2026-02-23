// src/messaging/transports/rtdb-transport.test.js
// Minimal smoke tests for RTDBMessagingTransport

import { describe, it, expect, beforeEach } from 'vitest';
import { RTDBMessagingTransport } from './rtdb-transport.js';
import { MessagingTransport } from './messaging-transport.js';

describe('RTDBMessagingTransport', () => {
  let transport;

  beforeEach(() => {
    transport = new RTDBMessagingTransport();
  });

  it('should instantiate without errors', () => {
    expect(transport).toBeDefined();
  });

  it('should extend MessagingTransport', () => {
    expect(transport).toBeInstanceOf(MessagingTransport);
  });

  it('should have all required methods', () => {
    expect(typeof transport.send).toBe('function');
    expect(typeof transport.listen).toBe('function');
    expect(typeof transport.getUnreadCount).toBe('function');
    expect(typeof transport.markAsRead).toBe('function');
  });

  describe('_getConversationId', () => {
    it('should generate deterministic conversation ID', () => {
      const id1 = transport._getConversationId('alice', 'bob');
      const id2 = transport._getConversationId('bob', 'alice');

      // Should be the same regardless of order
      expect(id1).toBe(id2);

      // Should be sorted
      expect(id1).toBe('alice_bob');
    });

    it('should sort user IDs alphabetically', () => {
      const id1 = transport._getConversationId('zebra', 'aardvark');
      expect(id1).toBe('aardvark_zebra');

      const id2 = transport._getConversationId('user123', 'user456');
      expect(id2).toBe('user123_user456');
    });
  });

  describe('listen', () => {
    it('should return unsubscribe function when not logged in', () => {
      const unsubscribe = transport.listen('user123', () => {});
      expect(typeof unsubscribe).toBe('function');

      // Should not throw when called
      expect(() => unsubscribe()).not.toThrow();
    });
  });

  describe('getUnreadCount', () => {
    it('should return 0 when not logged in', async () => {
      const count = await transport.getUnreadCount('user123');
      expect(count).toBe(0);
    });
  });

  describe('markAsRead', () => {
    it('should not throw when not logged in', async () => {
      await expect(transport.markAsRead('user123')).resolves.not.toThrow();
    });
  });

  describe('send', () => {
    it('should throw when not logged in', async () => {
      await expect(transport.send('user123', 'Hello')).rejects.toThrow(
        'not logged in',
      );
    });
  });
});
