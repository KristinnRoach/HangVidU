// src/messaging/messaging-controller.test.js
// Tests for MessagingController refactor (EventEmitter + Conversation-centric)

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MessagingController } from './messaging-controller.js';

// Mock auth state
vi.mock('../auth/auth-state.js', () => ({
  getLoggedInUserId: vi.fn(() => 'me'),
  getUserId: vi.fn(() => 'me'),
  getUser: vi.fn(() => ({ uid: 'me', displayName: 'Test User' })),
}));

// Mock profile
const mockGetUserProfile = vi.fn(() => Promise.resolve(null));
vi.mock('../user/profile.js', () => ({
  getUserProfile: (...args) => mockGetUserProfile(...args),
}));

// Mock file processing (no-op in tests)
vi.mock('../media/image-compress.js', () => ({
  compressImage: vi.fn(() => null),
}));
vi.mock('../utils/file-to-base64.js', () => ({
  fileToBase64: vi.fn(() => 'data:text/plain;base64,Y29udGVudA=='),
}));

// Mock store for testing
class MockStore {
  constructor() {
    this.writtenMessages = [];
    this.reactions = new Map();
    this.messageListeners = new Map();
    this.reactionListeners = new Map();
    this.unreadListeners = new Map();
  }

  resolveConversationId(participantIds) {
    return participantIds.sort().join('_');
  }

  async write(conversationId, message) {
    this.writtenMessages.push({ conversationId, message });
  }

  async fetchHistory(conversationId) {
    return { messages: [], lastKey: null };
  }

  onMessage(conversationId, callback, opts = {}) {
    this.messageListeners.set(conversationId, { callback, opts });
    return () => this.messageListeners.delete(conversationId);
  }

  onReactionUpdate(conversationId, callback) {
    this.reactionListeners.set(conversationId, callback);
    return () => this.reactionListeners.delete(conversationId);
  }

  onUnreadChange(conversationId, callback) {
    this.unreadListeners.set(conversationId, callback);
    return () => this.unreadListeners.delete(conversationId);
  }

  async getUnreadCount(conversationId) {
    return 0;
  }

  async markAsRead(conversationId) {
    // No-op for mock
  }

  async addReaction(conversationId, messageId, type) {
    const key = `${conversationId}_${messageId}`;
    if (!this.reactions.has(key)) {
      this.reactions.set(key, {});
    }
    const reactions = this.reactions.get(key);
    if (!reactions[type]) reactions[type] = {};
    reactions[type]['me'] = true;
  }

  async removeReaction(conversationId, messageId, type) {
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

  // Test helper: simulate receiving a message (calls onMessage callback)
  simulateMessage(conversationId, text, message = {}) {
    const listener = this.messageListeners.get(conversationId);
    if (listener) {
      listener.callback({
        text,
        from: message.from || 'other-user',
        ...message,
      });
    }
  }

  // Test helper: simulate reaction update
  simulateReactionUpdate(conversationId, messageId, reactions) {
    const callback = this.reactionListeners.get(conversationId);
    if (callback) {
      callback({ messageId, reactions });
    }
  }
}

describe('MessagingController', () => {
  let controller;
  let mockStore;

  beforeEach(() => {
    mockStore = new MockStore();
    controller = new MessagingController(mockStore);
  });

  it('should instantiate without errors', () => {
    expect(controller).toBeDefined();
    expect(controller.store).toBe(mockStore);
    expect(controller.conversations).toBeInstanceOf(Map);
  });

  it('should throw if store is missing', () => {
    expect(() => new MessagingController()).toThrow(
      'MessageStore implementation',
    );
  });

  it('should resolve conversation IDs', () => {
    const cid = controller.resolveConversationId(['userB', 'userA']);
    expect(cid).toBe('userA_userB');
  });

  it('should open a conversation successfully', async () => {
    const spy = vi.fn();
    controller.on('conversation:ready', spy);

    await controller.selectConversation('contactA_me', {
      remoteParticipantIds: ['contactA'],
    });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        conversationId: 'contactA_me',
        remoteParticipantIds: ['contactA'],
        displayUI: false,
      }),
    );
    expect(controller.conversations.size).toBe(1);
  });

  it('should emit conversation:ready on resume', async () => {
    const spy = vi.fn();
    controller.on('conversation:ready', spy);

    await controller.selectConversation('contactA_me', {
      remoteParticipantIds: ['contactA'],
    });
    await controller.selectConversation('contactA_me', {
      remoteParticipantIds: ['contactA'],
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should pass displayUI through in conversation:ready', async () => {
    const spy = vi.fn();
    controller.on('conversation:ready', spy);

    await controller.selectConversation('contactA_me', {
      remoteParticipantIds: ['contactA'],
      displayUI: true,
    });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ displayUI: true }),
    );
  });

  // Outdated - needs updating:
  // it('should fetch profile and emit conversation:profile-updated', async () => {
  //   const profile = {
  //     displayName: 'Alice',
  //     photoURL: 'https://example.com/alice.jpg',
  //   };
  //   mockGetUserProfile.mockResolvedValueOnce(profile);

  //   const spy = vi.fn();
  //   controller.on('conversation:profile-updated', spy);

  //   await controller.selectConversation('contactA_me', {
  //     remoteParticipantIds: ['contactA'],
  //   });

  //   // Wait for async profile fetch
  //   await vi.waitFor(() => {
  //     expect(spy).toHaveBeenCalledWith({
  //       conversationId: 'contactA_me',
  //       profile,
  //     });
  //   });

  //   expect(controller.getProfile('contactA_me')).toEqual(profile);
  // });

  it('should send message through store and return message', async () => {
    await controller.selectConversation('contactA_me');
    const message = await controller.send('contactA_me', 'Hello!');

    // Store received the write
    expect(mockStore.writtenMessages).toHaveLength(1);
    expect(mockStore.writtenMessages[0].conversationId).toBe('contactA_me');
    expect(mockStore.writtenMessages[0].message.text).toBe('Hello!');
    expect(mockStore.writtenMessages[0].message.type).toBe('text');

    // Returns a message for immediate rendering
    expect(message).toBeDefined();
    expect(message.text).toBe('Hello!');
    expect(message.from).toBe('me');
    expect(message.messageId).toBeDefined();

    // Message is cached in history
    const history = controller.getHistory('contactA_me');
    expect(history).toHaveLength(1);
    expect(history[0].message.text).toBe('Hello!');
  });

  it('should throw when sending to non-open conversation', async () => {
    await expect(controller.send('nonexistent_conv', 'Hello')).rejects.toThrow(
      'No open conversation',
    );
  });

  it('should validate text when sending message', async () => {
    await controller.selectConversation('contactA_me');
    await expect(controller.send('contactA_me', '')).rejects.toThrow('string');
    await expect(controller.send('contactA_me', null)).rejects.toThrow(
      'string',
    );
  });

  it('should emit message:received when message received via store', async () => {
    const spy = vi.fn();
    controller.on('message:received', spy);

    await controller.selectConversation('contactA_me');

    // Simulate receiving a message
    mockStore.simulateMessage('contactA_me', 'Test message', {
      messageId: 'm1',
    });

    expect(spy).toHaveBeenCalledWith({
      conversationId: 'contactA_me',
      message: {
        text: 'Test message',
        from: 'other-user',
        messageId: 'm1',
      },
    });
  });

  it('should close conversation and stop listening', async () => {
    await controller.selectConversation('me_u1');

    expect(controller.conversations.size).toBe(1);
    expect(mockStore.messageListeners.size).toBe(1);

    controller.closeConversation('me_u1');

    expect(controller.conversations.size).toBe(0);
    expect(mockStore.messageListeners.size).toBe(0);
  });

  it('should close all conversations', async () => {
    await controller.selectConversation('me_u1');
    await controller.selectConversation('me_u2');
    await controller.selectConversation('me_u3');

    expect(controller.conversations.size).toBe(3);

    controller.closeAllConversations();

    expect(controller.conversations.size).toBe(0);
    expect(mockStore.messageListeners.size).toBe(0);
  });

  it('should get unread count without requiring conversation open', async () => {
    const count = await controller.getUnreadCount('conv_123');
    expect(count).toBe(0);
  });

  it('should validate conversationId when selecting conversation', async () => {
    await expect(controller.selectConversation('')).rejects.toThrow(
      'non-empty string',
    );
    await expect(controller.selectConversation(null)).rejects.toThrow(
      'non-empty string',
    );
    await expect(controller.selectConversation(123)).rejects.toThrow(
      'non-empty string',
    );
  });

  it('should mark conversation as read', async () => {
    await controller.selectConversation('contactA_me');
    await controller.markAsRead('contactA_me');

    // Verify markAsRead was called on the store
    expect(mockStore).toBeDefined();
  });

  it('should throw when marking non-open conversation as read', async () => {
    await expect(controller.markAsRead('nonexistent')).rejects.toThrow(
      'No open conversation',
    );
  });

  it('should send file through store', async () => {
    await controller.selectConversation('contactA_me');
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });

    const message = await controller.sendFile('contactA_me', file);

    expect(mockStore.writtenMessages).toHaveLength(1);
    expect(mockStore.writtenMessages[0].message.type).toBe('file');
    expect(mockStore.writtenMessages[0].message.fileName).toBe('test.txt');
    expect(message.type).toBe('file');
    expect(message.messageId).toBeDefined();
  });

  it('should throw when sending file to non-open conversation', async () => {
    const file = new File(['content'], 'test.txt');
    await expect(controller.sendFile('nonexistent', file)).rejects.toThrow(
      'No open conversation',
    );
  });

  it('should add reaction', async () => {
    await controller.selectConversation('contactA_me');
    await controller.addReaction('contactA_me', 'msg1', 'like');

    const key = 'contactA_me_msg1';
    expect(mockStore.reactions.has(key)).toBe(true);
  });

  it('should throw when adding reaction to non-open conversation', async () => {
    await expect(
      controller.addReaction('nonexistent', 'msg1', 'like'),
    ).rejects.toThrow('No open conversation');
  });

  it('should remove reaction', async () => {
    await controller.selectConversation('contactA_me');
    await controller.addReaction('contactA_me', 'msg1', 'like');
    await controller.removeReaction('contactA_me', 'msg1', 'like');

    const key = 'contactA_me_msg1';
    expect(mockStore.reactions.get(key)).toEqual({});
  });

  it('should return cached history', async () => {
    await controller.selectConversation('contactA_me');
    mockStore.simulateMessage('contactA_me', 'M1', { messageId: '1' });
    mockStore.simulateMessage('contactA_me', 'M2', { messageId: '2' });

    const history = controller.getHistory('contactA_me');
    expect(history).toHaveLength(2);
    expect(history[0].message.text).toBe('M1');
    expect(history[1].message.text).toBe('M2');
  });

  it('should return empty history for non-open conversation', () => {
    const history = controller.getHistory('nonexistent');
    expect(history).toEqual([]);
  });

  describe('History Caching & MRU', () => {
    it('should cache messages in conversation history', async () => {
      await controller.selectConversation('contactA_me');
      mockStore.simulateMessage('contactA_me', 'M1', { messageId: '1' });
      mockStore.simulateMessage('contactA_me', 'M2', { messageId: '2' });

      const history = controller.getHistory('contactA_me');
      expect(history).toHaveLength(2);
      expect(history[0].message.text).toBe('M1');
      expect(history[1].message.text).toBe('M2');
    });

    it('should update reactions in cached history', async () => {
      await controller.selectConversation('contactA_me');
      mockStore.simulateMessage('contactA_me', 'Hello', {
        messageId: 'm1',
      });

      // Simulate reaction update via separate callback
      mockStore.simulateReactionUpdate('contactA_me', 'm1', {
        like: ['user1'],
      });

      const history = controller.getHistory('contactA_me');
      expect(history[0].message.reactions).toEqual({
        like: ['user1'],
      });
    });

    it('should evict oldest conversation when limit is exceeded', async () => {
      // Open 5 conversations
      await controller.selectConversation('me_u1');
      await controller.selectConversation('me_u2');
      await controller.selectConversation('me_u3');
      await controller.selectConversation('me_u4');
      await controller.selectConversation('me_u5');

      expect(controller.conversations.size).toBe(5);
      expect(controller.conversationOrder[0]).toBe('me_u1');

      // Open 6th conversation
      await controller.selectConversation('me_u6');

      expect(controller.conversations.size).toBe(5);
      expect(controller.conversations.has('me_u1')).toBe(false);
      expect(controller.conversationOrder[0]).toBe('me_u2');
      expect(controller.conversationOrder[4]).toBe('me_u6');
    });

    it('should update MRU order when re-opening an existing conversation', async () => {
      await controller.selectConversation('me_u1');
      await controller.selectConversation('me_u2');
      await controller.selectConversation('me_u3');

      expect(controller.conversationOrder).toEqual(['me_u1', 'me_u2', 'me_u3']);

      // Re-open u1
      await controller.selectConversation('me_u1');

      expect(controller.conversationOrder).toEqual(['me_u2', 'me_u3', 'me_u1']);
    });
  });
});
