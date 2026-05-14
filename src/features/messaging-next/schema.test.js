import { describe, expect, it } from 'vitest';
import {
  ConversationNodeSchema,
  EventMessagePayloadSchema,
  MessageEnvelopeSchema,
  createGroupConversationId,
  resolveDirectConversationId,
} from './schema.js';

describe('messaging-next schema', () => {
  it('resolves stable direct conversation ids with sorted participants', () => {
    expect(resolveDirectConversationId('user-b', 'user-a')).toBe(
      'dm:user-a:user-b',
    );
  });

  it('creates generated group conversation ids', () => {
    expect(createGroupConversationId('group_123')).toBe('grp:group_123');
  });

  it('keeps drafts on conversation nodes outside the message stream', () => {
    const node = ConversationNodeSchema.parse({
      conversationId: 'dm:user-a:user-b',
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
      draft: {
        text: 'not sent yet',
        updatedAt: 3,
      },
    });

    expect(node.deliveryPolicy).toBe('persistent');
    expect(node.draft?.text).toBe('not sent yet');
    expect(node.participants['user-a'].role).toBe('member');
  });

  it('defaults missing conversation drafts to null', () => {
    const node = ConversationNodeSchema.parse({
      conversationId: 'grp:team_1',
      kind: 'group',
      participants: {
        owner: {
          userId: 'owner',
          role: 'owner',
          joinedAt: 1,
        },
      },
      createdAt: 1,
      updatedAt: 1,
    });

    expect(node.draft).toBeNull();
  });

  it('requires every message envelope to carry conversation id and delivery', () => {
    const message = MessageEnvelopeSchema.parse({
      messageId: 'msg-1',
      conversationId: 'grp:team_1',
      senderId: 'user-a',
      senderName: 'User A',
      createdAt: 10,
      delivery: 'private',
      payload: {
        type: 'text',
        text: 'hello privately',
      },
    });

    expect(message.conversationId).toBe('grp:team_1');
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

  it('rejects file payloads until the file-message contract is designed', () => {
    expect(() =>
      MessageEnvelopeSchema.parse({
        messageId: 'msg-1',
        conversationId: 'dm:user-a:user-b',
        senderId: 'user-a',
        createdAt: 10,
        delivery: 'persistent',
        payload: {
          type: 'file',
          fileName: 'demo.png',
        },
      }),
    ).toThrow();
  });
});
