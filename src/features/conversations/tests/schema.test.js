import { describe, expect, it } from 'vitest';
import {
  ConversationIdSchema,
  EventMessagePayloadSchema,
  MessageEnvelopeSchema,
} from '../schema.js';

describe('conversations schema', () => {
  it('normalizes and rejects blank conversation ids', () => {
    expect(ConversationIdSchema.parse(' conversation-1 ')).toBe('conversation-1');
    expect(() => ConversationIdSchema.parse('   ')).toThrow();
  });

  it('requires every message envelope to carry conversation id and delivery', () => {
    const message = MessageEnvelopeSchema.parse({
      messageId: 'msg-1',
      conversationId: 'conversation-1',
      senderId: 'user-a',
      senderName: 'User A',
      sentAt: 10,
      delivery: 'private',
      payload: {
        type: 'text',
        text: 'hello privately',
      },
    });

    expect(message.conversationId).toBe('conversation-1');
    expect(message.sentAt).toBe(10);
    expect(message.delivery).toBe('private');
  });

  it('supports the unanswered call event payload', () => {
    const payload = EventMessagePayloadSchema.parse({
      type: 'event',
      eventType: 'evt:call:session:unanswered',
      details: {
        callId: 'room-123',
      },
    });

    expect(payload.details?.callId).toBe('room-123');
  });

  it('accepts R2-backed file payloads', () => {
    const message = MessageEnvelopeSchema.parse({
      messageId: 'msg-1',
      conversationId: 'conversation-1',
      senderId: 'user-a',
      sentAt: 10,
      delivery: 'persistent',
      payload: {
        type: 'file',
        fileName: 'demo.png',
        mimeType: 'image/png',
        fileSize: 123,
        storage: {
          provider: 'r2',
          bucket: 'hangvidu-files',
          key: 'conversation-files/conversation-1/msg-1',
        },
      },
    });

    expect(message.payload.type).toBe('file');
  });

  it('rejects inline file payloads', () => {
    expect(() =>
      MessageEnvelopeSchema.parse({
        messageId: 'msg-1',
        conversationId: 'conversation-1',
        senderId: 'user-a',
        sentAt: 10,
        delivery: 'persistent',
        payload: {
          type: 'file',
          fileName: 'demo.png',
          mimeType: 'image/png',
          fileSize: 123,
          data: 'data:image/png;base64,abc',
        },
      }),
    ).toThrow();
  });
});
