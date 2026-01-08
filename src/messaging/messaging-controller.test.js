// src/messaging/messaging-controller.test.js
// Minimal smoke tests for MessagingController

import { describe, it, expect, beforeEach } from 'vitest';
import { MessagingController } from './messaging-controller.js';

// Mock transport for testing
class MockTransport {
  constructor() {
    this.sentMessages = [];
    this.listeners = new Map();
  }

  async send(contactId, text) {
    this.sentMessages.push({ contactId, text });
  }

  listen(contactId, onMessage) {
    this.listeners.set(contactId, onMessage);
    return () => this.listeners.delete(contactId);
  }

  async getUnreadCount(contactId) {
    return 0;
  }

  async markAsRead(contactId) {
    // No-op for mock
  }

  // Test helper: simulate receiving a message
  simulateMessage(contactId, text, msgData = {}, isSentByMe = false) {
    const listener = this.listeners.get(contactId);
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

  it('should open a session successfully', () => {
    const session = controller.openSession('user123', {
      onMessage: () => {},
    });

    expect(session).toBeDefined();
    expect(session.contactId).toBe('user123');
    expect(typeof session.send).toBe('function');
    expect(typeof session.markAsRead).toBe('function');
    expect(typeof session.getUnreadCount).toBe('function');
    expect(typeof session.close).toBe('function');
  });

  it('should return existing session if already open', () => {
    const session1 = controller.openSession('user123', {
      onMessage: () => {},
    });
    const session2 = controller.openSession('user123', {
      onMessage: () => {},
    });

    expect(session1).toBe(session2);
    expect(controller.sessions.size).toBe(1);
  });

  it('should send message through transport', async () => {
    const session = controller.openSession('user123', {
      onMessage: () => {},
    });

    await session.send('Hello!');

    expect(mockTransport.sentMessages).toHaveLength(1);
    expect(mockTransport.sentMessages[0]).toEqual({
      contactId: 'user123',
      text: 'Hello!',
    });
  });

  it('should trigger onMessage callback when message received', () => {
    const messages = [];
    const session = controller.openSession('user123', {
      onMessage: (text, msgData, isSentByMe) => {
        messages.push({ text, isSentByMe });
      },
    });

    // Simulate receiving a message
    mockTransport.simulateMessage('user123', 'Test message', {}, false);

    expect(messages).toHaveLength(1);
    expect(messages[0]).toEqual({
      text: 'Test message',
      isSentByMe: false,
    });
  });

  it('should close session and stop listening', () => {
    const session = controller.openSession('user123', {
      onMessage: () => {},
    });

    expect(controller.sessions.size).toBe(1);
    expect(mockTransport.listeners.size).toBe(1);

    session.close();

    expect(controller.sessions.size).toBe(0);
    expect(mockTransport.listeners.size).toBe(0);
  });

  it('should close all sessions', () => {
    controller.openSession('user1', { onMessage: () => {} });
    controller.openSession('user2', { onMessage: () => {} });
    controller.openSession('user3', { onMessage: () => {} });

    expect(controller.sessions.size).toBe(3);

    controller.closeAllSessions();

    expect(controller.sessions.size).toBe(0);
    expect(mockTransport.listeners.size).toBe(0);
  });

  it('should get unread count without requiring a session', async () => {
    const count = await controller.getUnreadCount('user123');
    expect(count).toBe(0);
  });

  it('should validate contactId when opening session', () => {
    expect(() => controller.openSession('')).toThrow('non-empty string');
    expect(() => controller.openSession(null)).toThrow('non-empty string');
    expect(() => controller.openSession(123)).toThrow('non-empty string');
  });

  it('should validate text when sending message', async () => {
    const session = controller.openSession('user123', {
      onMessage: () => {},
    });

    await expect(session.send('')).rejects.toThrow('non-empty string');
    await expect(session.send(null)).rejects.toThrow('non-empty string');
    await expect(session.send(123)).rejects.toThrow('non-empty string');
  });
});
