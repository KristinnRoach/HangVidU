// src/messaging/messaging-controller.test.js
// Tests for MessagingController refactor (EventEmitter + Conversation-centric)

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MessagingController } from './messaging-controller.js';

// Mock auth state
vi.mock('../auth/auth-state.js', () => ({
  getLoggedInUserId: vi.fn(() => 'me'),
  getUser: vi.fn(() => ({ uid: 'me' })),
}));

// Mock transport for testing
class MockTransport {
  constructor() {
    this.sentMessages = [];
    this.listeners = new Map();
  }

  resolveConversationId(participantIds) {
    // For testing, just join them
    return participantIds.sort().join('_');
  }

  async sendToConversation(conversationId, text) {
    this.sentMessages.push({ conversationId, text });
  }

  listenToConversation(conversationId, onMessage) {
    this.listeners.set(conversationId, onMessage);
    return () => this.listeners.delete(conversationId);
  }

  async getUnreadCountForConversation(conversationId) {
    return 0;
  }

  async markAsReadForConversation(conversationId) {
    // No-op for mock
  }

  listenToUnreadCountForConversation(conversationId, onCountChange) {
    return () => {};
  }

  // Test helper: simulate receiving a message
  simulateMessage(conversationId, text, msgData = {}, isSentByMe = false) {
    const listener = this.listeners.get(conversationId);
    if (listener) {
      listener(text, { text, ...msgData }, isSentByMe);
    }
  }
}

describe('MessagingController', () => {
  let controller;
  let mockTransport;

  beforeEach(() => {
    mockTransport = new MockTransport();
    controller = new MessagingController(mockTransport);
  });

  it('should instantiate without errors', () => {
    expect(controller).toBeDefined();
    expect(controller.transport).toBe(mockTransport);
    expect(controller.sessions).toBeInstanceOf(Map);
  });

  it('should throw if transport is missing', () => {
    expect(() => new MessagingController()).toThrow('transport implementation');
  });

  it('should resolve conversation IDs', () => {
    const cid = controller.resolveConversationId(['userB', 'userA']);
    expect(cid).toBe('userA_userB');
  });

  it('should open a session successfully', () => {
    const session = controller.openSession('contactA');

    expect(session).toBeDefined();
    expect(session.conversationId).toBe('contactA_me');
    expect(typeof session.send).toBe('function');
    expect(typeof session.markAsRead).toBe('function');
    expect(typeof session.getUnreadCount).toBe('function');
    expect(typeof session.close).toBe('function');
  });

  it('should return existing session if already open', () => {
    const session1 = controller.openSession('contactA');
    const session2 = controller.openSession('contactA');

    expect(session1).toBe(session2);
    expect(controller.sessions.size).toBe(1);
  });

  it('should send message through transport', async () => {
    const session = controller.openSession('contactA');

    await session.send('Hello!');

    expect(mockTransport.sentMessages).toHaveLength(1);
    expect(mockTransport.sentMessages[0]).toEqual({
      conversationId: 'contactA_me',
      text: 'Hello!',
    });
  });

  it('should emit message:received when message received via transport', () => {
    const spy = vi.fn();
    controller.on('message:received', spy);

    controller.openSession('contactA');

    // Simulate receiving a message
    mockTransport.simulateMessage(
      'contactA_me',
      'Test message',
      { messageId: 'm1' },
      false,
    );

    expect(spy).toHaveBeenCalledWith({
      conversationId: 'contactA_me',
      text: 'Test message',
      msgData: { text: 'Test message', messageId: 'm1' },
      isSentByMe: false,
    });
  });

  it('should close session and stop listening', () => {
    const session = controller.openSession('contactA');

    expect(controller.sessions.size).toBe(1);
    expect(mockTransport.listeners.size).toBe(1);

    session.close();

    expect(controller.sessions.size).toBe(0);
    expect(mockTransport.listeners.size).toBe(0);
  });

  it('should close all sessions', () => {
    controller.openSession('u1');
    controller.openSession('u2');
    controller.openSession('u3');

    expect(controller.sessions.size).toBe(3);

    controller.closeAllSessions();

    expect(controller.sessions.size).toBe(0);
    expect(mockTransport.listeners.size).toBe(0);
  });

  it('should get unread count without requiring a session', async () => {
    const count = await controller.getUnreadCount('conv_123');
    expect(count).toBe(0);
  });

  it('should validate contactId when opening session', () => {
    expect(() => controller.openSession('')).toThrow('non-empty string');
    expect(() => controller.openSession(null)).toThrow('non-empty string');
    expect(() => controller.openSession(123)).toThrow('non-empty string');
  });

  it('should validate text when sending message', async () => {
    const session = controller.openSession('contactA');
    await expect(session.send('')).rejects.toThrow('string');
    await expect(session.send(null)).rejects.toThrow('string');
  });

  describe('History Caching & LRU', () => {
    it('should cache messages in session history', () => {
      const session = controller.openSession('contactA');
      mockTransport.simulateMessage('contactA_me', 'M1', { messageId: '1' });
      mockTransport.simulateMessage('contactA_me', 'M2', { messageId: '2' });

      expect(session.history).toHaveLength(2);
      expect(session.history[0].text).toBe('M1');
      expect(session.history[1].text).toBe('M2');
    });

    it('should update reactions in cached history', () => {
      const session = controller.openSession('contactA');
      mockTransport.simulateMessage('contactA_me', 'Hello', {
        messageId: 'm1',
      });

      // Simulate reaction update
      mockTransport.simulateMessage('contactA_me', '', {
        messageId: 'm1',
        _reactionUpdate: true,
        reactions: { like: { user1: true } },
      });

      expect(session.history[0].msgData.reactions).toEqual({
        like: { user1: true },
      });
    });

    it('should evict oldest session when limit is exceeded', () => {
      // Open 5 sessions
      controller.openSession('u1');
      controller.openSession('u2');
      controller.openSession('u3');
      controller.openSession('u4');
      controller.openSession('u5');

      expect(controller.sessions.size).toBe(5);
      expect(controller.sessionOrder[0]).toBe('me_u1');

      // Open 6th session
      controller.openSession('u6');

      expect(controller.sessions.size).toBe(5);
      expect(controller.sessions.has('me_u1')).toBe(false);
      expect(controller.sessionOrder[0]).toBe('me_u2');
      expect(controller.sessionOrder[4]).toBe('me_u6');
    });

    it('should update MRU order when re-opening an existing session', () => {
      controller.openSession('u1');
      controller.openSession('u2');
      controller.openSession('u3');

      expect(controller.sessionOrder).toEqual(['me_u1', 'me_u2', 'me_u3']);

      // Re-open u1
      controller.openSession('u1');

      expect(controller.sessionOrder).toEqual(['me_u2', 'me_u3', 'me_u1']);
    });
  });
});
