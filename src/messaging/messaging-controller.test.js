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
    this.reactions = new Map();
    this.listeners = new Map();
    this.files = [];
  }

  resolveConversationId(participantIds) {
    // For testing, just join them
    return participantIds.sort().join('_');
  }

  async sendToConversation(conversationId, text) {
    this.sentMessages.push({ conversationId, text });
    const messageId = `msg_${Date.now()}_${this.sentMessages.length}`;
    return {
      messageId,
      messageData: {
        type: 'text',
        text,
        from: 'me',
        fromName: 'Test User',
        sentAt: Date.now(),
        read: false,
      },
    };
  }

  async sendFile(contactId, file) {
    this.files.push({ contactId, file });
  }

  listen(conversationId, onMessage) {
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

  async addReactionToConversation(conversationId, messageId, type) {
    const key = `${conversationId}_${messageId}`;
    if (!this.reactions.has(key)) {
      this.reactions.set(key, {});
    }
    const reactions = this.reactions.get(key);
    if (!reactions[type]) reactions[type] = {};
    reactions[type]['me'] = true;
  }

  async removeReactionFromConversation(conversationId, messageId, type) {
    const key = `${conversationId}_${messageId}`;
    if (this.reactions.has(key)) {
      const reactions = this.reactions.get(key);
      if (reactions[type]) {
        delete reactions[type]['me'];
        if (Object.keys(reactions[type]).length === 0) {
          delete reactions[type];
        }
      }
    }
  }

  // Test helper: simulate receiving a message
  simulateMessage(conversationId, text, parsedMessage = {}) {
    const listener = this.listeners.get(conversationId);
    if (listener) {
      listener({
        text,
        from: parsedMessage.from || 'other-user',
        ...parsedMessage,
      });
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
    expect(controller.conversations).toBeInstanceOf(Map);
  });

  it('should throw if transport is missing', () => {
    expect(() => new MessagingController()).toThrow('transport implementation');
  });

  it('should resolve conversation IDs', () => {
    const cid = controller.resolveConversationId(['userB', 'userA']);
    expect(cid).toBe('userA_userB');
  });

  it('should open a conversation successfully', () => {
    const spy = vi.fn();
    controller.on('conversation:opened', spy);

    controller.openConversation('contactA', 'Alice');

    expect(spy).toHaveBeenCalledWith({
      conversationId: 'contactA_me',
      contactId: 'contactA',
      contactName: 'Alice',
    });
    expect(controller.conversations.size).toBe(1);
  });

  it('should not re-emit if conversation already open', () => {
    const spy = vi.fn();
    controller.on('conversation:opened', spy);
    controller.on('conversation:resumed', spy);

    controller.openConversation('contactA', 'Alice');
    controller.openConversation('contactA', 'Alice');

    // Should emit opened once, then resumed on second call
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should send message through transport and return ParsedMessage', async () => {
    controller.openConversation('contactA');
    const parsed = await controller.send('contactA_me', 'Hello!');

    // Transport received the message
    expect(mockTransport.sentMessages).toHaveLength(1);
    expect(mockTransport.sentMessages[0]).toEqual({
      conversationId: 'contactA_me',
      text: 'Hello!',
    });

    // Returns a ParsedMessage for immediate rendering
    expect(parsed).toBeDefined();
    expect(parsed.text).toBe('Hello!');
    expect(parsed.from).toBe('me');
    expect(parsed.messageId).toBeDefined();

    // Message is cached in history
    const history = controller.getHistory('contactA_me');
    expect(history).toHaveLength(1);
    expect(history[0].parsedMessage.text).toBe('Hello!');
  });

  it('should throw when sending to non-open conversation', async () => {
    await expect(controller.send('nonexistent_conv', 'Hello')).rejects.toThrow(
      'No open conversation',
    );
  });

  it('should validate text when sending message', async () => {
    controller.openConversation('contactA');
    await expect(controller.send('contactA_me', '')).rejects.toThrow('string');
    await expect(controller.send('contactA_me', null)).rejects.toThrow('string');
  });

  it('should emit message:received when message received via transport', () => {
    const spy = vi.fn();
    controller.on('message:received', spy);

    controller.openConversation('contactA');

    // Simulate receiving a message
    mockTransport.simulateMessage('contactA_me', 'Test message', {
      messageId: 'm1',
    });

    expect(spy).toHaveBeenCalledWith({
      conversationId: 'contactA_me',
      parsedMessage: {
        text: 'Test message',
        from: 'other-user',
        messageId: 'm1',
      },
    });
  });

  it('should close conversation and stop listening', () => {
    controller.openConversation('contactA');

    expect(controller.conversations.size).toBe(1);
    expect(mockTransport.listeners.size).toBe(1);

    controller.closeConversation('contactA_me');

    expect(controller.conversations.size).toBe(0);
    expect(mockTransport.listeners.size).toBe(0);
  });

  it('should close all conversations', () => {
    controller.openConversation('u1');
    controller.openConversation('u2');
    controller.openConversation('u3');

    expect(controller.conversations.size).toBe(3);

    controller.closeAllConversations();

    expect(controller.conversations.size).toBe(0);
    expect(mockTransport.listeners.size).toBe(0);
  });

  it('should get unread count without requiring conversation open', async () => {
    const count = await controller.getUnreadCount('conv_123');
    expect(count).toBe(0);
  });

  it('should validate contactId when opening conversation', () => {
    expect(() => controller.openConversation('')).toThrow('non-empty string');
    expect(() => controller.openConversation(null)).toThrow('non-empty string');
    expect(() => controller.openConversation(123)).toThrow('non-empty string');
  });

  it('should mark conversation as read', async () => {
    controller.openConversation('contactA');
    await controller.markAsRead('contactA_me');

    expect(mockTransport.markAsReadForConversation).toBeTruthy();
  });

  it('should throw when marking non-open conversation as read', async () => {
    await expect(controller.markAsRead('nonexistent')).rejects.toThrow(
      'No open conversation',
    );
  });

  it('should send file through transport', async () => {
    controller.openConversation('contactA');
    const file = new File(['content'], 'test.txt');

    await controller.sendFile('contactA_me', file);

    expect(mockTransport.files).toHaveLength(1);
    expect(mockTransport.files[0].contactId).toBe('contactA');
    expect(mockTransport.files[0].file).toBe(file);
  });

  it('should throw when sending file to non-open conversation', async () => {
    const file = new File(['content'], 'test.txt');
    await expect(
      controller.sendFile('nonexistent', file),
    ).rejects.toThrow('No open conversation');
  });

  it('should add reaction', async () => {
    controller.openConversation('contactA');
    await controller.addReaction('contactA_me', 'msg1', 'like');

    const key = 'contactA_me_msg1';
    expect(mockTransport.reactions.has(key)).toBe(true);
  });

  it('should throw when adding reaction to non-open conversation', async () => {
    await expect(
      controller.addReaction('nonexistent', 'msg1', 'like'),
    ).rejects.toThrow('No open conversation');
  });

  it('should remove reaction', async () => {
    controller.openConversation('contactA');
    await controller.addReaction('contactA_me', 'msg1', 'like');
    await controller.removeReaction('contactA_me', 'msg1', 'like');

    const key = 'contactA_me_msg1';
    expect(mockTransport.reactions.get(key)).toEqual({});
  });

  it('should return cached history', () => {
    controller.openConversation('contactA');
    mockTransport.simulateMessage('contactA_me', 'M1', { messageId: '1' });
    mockTransport.simulateMessage('contactA_me', 'M2', { messageId: '2' });

    const history = controller.getHistory('contactA_me');
    expect(history).toHaveLength(2);
    expect(history[0].parsedMessage.text).toBe('M1');
    expect(history[1].parsedMessage.text).toBe('M2');
  });

  it('should return empty history for non-open conversation', () => {
    const history = controller.getHistory('nonexistent');
    expect(history).toEqual([]);
  });

  describe('History Caching & MRU', () => {
    it('should cache messages in conversation history', () => {
      controller.openConversation('contactA');
      mockTransport.simulateMessage('contactA_me', 'M1', { messageId: '1' });
      mockTransport.simulateMessage('contactA_me', 'M2', { messageId: '2' });

      const history = controller.getHistory('contactA_me');
      expect(history).toHaveLength(2);
      expect(history[0].parsedMessage.text).toBe('M1');
      expect(history[1].parsedMessage.text).toBe('M2');
    });

    it('should update reactions in cached history', () => {
      controller.openConversation('contactA');
      mockTransport.simulateMessage('contactA_me', 'Hello', {
        messageId: 'm1',
      });

      // Simulate reaction update
      mockTransport.simulateMessage('contactA_me', '', {
        messageId: 'm1',
        _reactionUpdate: true,
        reactions: { like: { user1: true } },
      });

      const history = controller.getHistory('contactA_me');
      expect(history[0].parsedMessage.reactions).toEqual({
        like: { user1: true },
      });
    });

    it('should evict oldest conversation when limit is exceeded', () => {
      // Open 5 conversations
      controller.openConversation('u1');
      controller.openConversation('u2');
      controller.openConversation('u3');
      controller.openConversation('u4');
      controller.openConversation('u5');

      expect(controller.conversations.size).toBe(5);
      expect(controller.conversationOrder[0]).toBe('me_u1');

      // Open 6th conversation
      controller.openConversation('u6');

      expect(controller.conversations.size).toBe(5);
      expect(controller.conversations.has('me_u1')).toBe(false);
      expect(controller.conversationOrder[0]).toBe('me_u2');
      expect(controller.conversationOrder[4]).toBe('me_u6');
    });

    it('should update MRU order when re-opening an existing conversation', () => {
      controller.openConversation('u1');
      controller.openConversation('u2');
      controller.openConversation('u3');

      expect(controller.conversationOrder).toEqual(['me_u1', 'me_u2', 'me_u3']);

      // Re-open u1
      controller.openConversation('u1');

      expect(controller.conversationOrder).toEqual(['me_u2', 'me_u3', 'me_u1']);
    });
  });
});
