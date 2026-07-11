import { describe, expect, it } from 'vite-plus/test';
import {
  ConversationIdSchema,
  MessageEnvelopeSchema,
  SystemMessagePayloadSchema,
} from './schema.js';

describe('conversations schema', () => {
  it('normalizes and rejects blank conversation ids', () => {
    expect(ConversationIdSchema.parse(' conversation-1 ')).toBe(
      'conversation-1',
    );
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

  it.each(['call.unanswered', 'call.declined'])(
    'supports the %s system message payload',
    (systemType) => {
      const payload = SystemMessagePayloadSchema.parse({
        type: 'system',
        systemType,
        callerUId: 'user-a',
      });

      expect(payload.callerUId).toBe('user-a');
    },
  );

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
