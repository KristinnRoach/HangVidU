import { describe, expect, it } from 'vitest';
import {
  ConversationNodeSchema,
  EventMessagePayloadSchema,
  MessageEnvelopeSchema,
  createGroupConversationId,
  resolveDirectConversationId,
} from '../schema.js';

describe('messaging-next schema', () => {
  it('resolves stable direct conversation ids with sorted participants', () => {
    expect(resolveDirectConversationId('user-b', 'user-a')).toBe(
      'user-a_user-b',
    );
  });

  it('creates generated group conversation ids', () => {
    expect(createGroupConversationId('group-123')).toBe('group:group-123');
  });

  it('parses conversation metadata without shared draft state', () => {
    const node = ConversationNodeSchema.parse({
      conversationId: 'user-a_user-b',
      kind: 'direct',
      participants: {
        'user-a': {
          userId: 'user-a',
          joinedAt: 1,
        },
        'user-b': {
          userId: 'user-b',
          joinedAt: 1,
        },
      },
      createdAt: 1,
      updatedAt: 2,
    });

    expect(node.deliveryPolicy).toBe('persistent');
    expect(node.participants['user-a'].role).toBe('member');
  });

  it('requires every message envelope to carry conversation id and delivery', () => {
    const message = MessageEnvelopeSchema.parse({
      messageId: 'msg-1',
      conversationId: 'group:team_1',
      senderId: 'user-a',
      senderName: 'User A',
      sentAt: 10,
      delivery: 'private',
      payload: {
        type: 'text',
        text: 'hello privately',
      },
    });

    expect(message.conversationId).toBe('group:team_1');
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

  it('accepts legacy file payloads for read-side rendering', () => {
    const message = MessageEnvelopeSchema.parse({
      messageId: 'msg-1',
      conversationId: 'user-a_user-b',
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
    });

    expect(message.payload.type).toBe('file');
  });
});
