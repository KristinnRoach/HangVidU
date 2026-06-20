import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createD1MessageRepository } from './d1.ts';

// Fake D1MessageClient: in-memory message log + a settable live-broadcast hook.
function createFakeClient() {
  let broadcast = null;
  const loaded = [];
  return {
    loaded,
    emit: (msg) => broadcast?.(msg),
    loadMessages: vi.fn(async () => loaded.slice()),
    sendMessage: vi.fn(),
    subscribe: vi.fn((_id, onMessage) => {
      broadcast = onMessage;
      return () => {
        broadcast = null;
      };
    }),
  };
}

const wire = (over) => ({
  id: 'm',
  conversationId: 'c1',
  senderId: 'other',
  kind: 'text',
  body: 'hi',
  attachments: [],
  sentAt: 100,
  ...over,
});

describe('d1 adapter watchConversationActivity', () => {
  beforeEach(() => {
    try {
      localStorage.clear();
    } catch {
      // jsdom-less env: ignore
    }
  });

  it('advances latest* on each live broadcast (newest wins)', async () => {
    const client = createFakeClient();
    const repo = createD1MessageRepository(client);
    const seen = [];

    const off = repo.watchConversationActivity('c1', 'me', (a) => seen.push(a));
    await Promise.resolve();

    client.emit(wire({ sentAt: 200, senderId: 'other' }));
    client.emit(wire({ sentAt: 150, senderId: 'other' })); // older: ignored

    const last = seen.at(-1);
    expect(last.latestSentAt).toBe(200);
    expect(last.latestSenderId).toBe('other');
    off();
  });

  it('markConversationRead clears past the newest message and re-emits live', async () => {
    const client = createFakeClient();
    const repo = createD1MessageRepository(client);
    const seen = [];

    repo.watchConversationActivity('c1', 'me', (a) => seen.push(a));
    await Promise.resolve();
    client.emit(wire({ sentAt: 500, senderId: 'other' }));

    repo.markConversationRead('c1', 'me');

    const last = seen.at(-1);
    // lastReadAt is never earlier than the newest message, so the unread
    // test (latestSentAt > lastReadAt) is false: badge cleared.
    expect(last.lastReadAt).toBeGreaterThanOrEqual(500);
    expect(last.lastReadAt).toBeGreaterThanOrEqual(last.latestSentAt);
  });
});
