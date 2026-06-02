import { createRoot, createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { createConversationActions } from '../conversation.actions.js';
import { createConversationState } from '../conversation.state.js';
import {
  loadConversationHistory,
  useConversation,
} from '../use-conversation.js';

function envelope(overrides) {
  return {
    messageId: 'msg-1',
    conversationId: 'conversation-1',
    senderId: 'user-a',
    sentAt: 1,
    delivery: 'persistent',
    payload: {
      type: 'text',
      text: 'hello',
    },
    ...overrides,
  };
}

describe('messaging-next useConversation', () => {
  it('loads message history in chronological order regardless of repository order', async () => {
    const repository = {
      loadMessages: () => [
        envelope({ messageId: 'msg-3', sentAt: 3 }),
        envelope({ messageId: 'msg-1', sentAt: 1 }),
        envelope({ messageId: 'msg-2', sentAt: 2 }),
      ],
    };

    const loaded = await loadConversationHistory(repository, 'conversation-1');

    expect(loaded.map((msg) => msg.id)).toEqual(['msg-1', 'msg-2', 'msg-3']);
  });

  it('maps legacy file envelopes into chat attachments', async () => {
    const repository = {
      loadMessages: () => [
        envelope({
          payload: {
            type: 'file',
            fileName: 'demo.png',
            mimeType: 'image/png',
            fileSize: 123,
            data: 'data:image/png;base64,abc',
          },
        }),
      ],
    };

    const loaded = await loadConversationHistory(repository, 'conversation-1');

    expect(loaded[0]).toMatchObject({
      id: 'msg-1',
      text: '',
      attachment: {
        type: 'file',
        fileName: 'demo.png',
        mimeType: 'image/png',
        fileSize: 123,
        data: 'data:image/png;base64,abc',
      },
    });
  });

  it('starts reaction subscriptions only after history is ready', async () => {
    const store = createConversationState();
    const actions = createConversationActions(store);
    actions.startConversation({ conversationId: 'conversation-1' }, 'me');

    const repository = {
      subscribeReactions: vi.fn(() => () => {}),
      send: vi.fn(),
    };

    await new Promise((resolve) => {
      createRoot((dispose) => {
        const [historyReady, setHistoryReady] = createSignal(false);
        useConversation({
          repository,
          store,
          actions,
          historyReady,
        });

        queueMicrotask(() => {
          expect(repository.subscribeReactions).not.toHaveBeenCalled();

          setHistoryReady(true);

          queueMicrotask(() => {
            expect(repository.subscribeReactions).toHaveBeenCalledWith(
              'conversation-1',
              expect.any(Function),
            );
            dispose();
            resolve();
          });
        });
      });
    });
  });

  it('uses a reserved persistent id for the optimistic message and send payload', async () => {
    const store = createConversationState();
    const actions = createConversationActions(store);
    actions.startConversation({ conversationId: 'conversation-1' }, 'me');
    actions.setDraft('hello');

    const repository = {
      createMessageId: vi.fn(() => 'reserved-1'),
      subscribeReactions: vi.fn(() => () => {}),
      send: vi.fn(() => ({ id: 'reserved-1', sentAt: 10 })),
    };

    await useConversation({
      repository,
      store,
      actions,
    }).send();

    expect(repository.createMessageId).toHaveBeenCalledWith('conversation-1');
    expect(repository.send).toHaveBeenCalledWith(
      expect.objectContaining({
        messageId: 'reserved-1',
        conversationId: 'conversation-1',
        senderId: 'me',
        payload: { type: 'text', text: 'hello' },
      }),
    );
    expect(store.state.messages.map((message) => message.id)).toEqual([
      'reserved-1',
    ]);
    expect(store.state.messages[0].status).toBe('sent');
  });

  it('sends file payloads with optimistic attachment metadata', async () => {
    const store = createConversationState();
    const actions = createConversationActions(store);
    actions.startConversation({ conversationId: 'conversation-1' }, 'me');
    actions.setDraft('caption');

    const repository = {
      createMessageId: vi.fn(() => 'reserved-file-1'),
      subscribeReactions: vi.fn(() => () => {}),
      send: vi.fn(() => ({ id: 'reserved-file-1', sentAt: 10 })),
    };

    await useConversation({
      repository,
      store,
      actions,
    }).send({
      type: 'file',
      fileName: 'demo.webp',
      mimeType: 'image/webp',
      fileSize: 123,
      data: 'data:image/webp;base64,abc',
      text: 'caption',
    });

    expect(repository.send).toHaveBeenCalledWith(
      expect.objectContaining({
        messageId: 'reserved-file-1',
        conversationId: 'conversation-1',
        senderId: 'me',
        payload: {
          type: 'file',
          fileName: 'demo.webp',
          mimeType: 'image/webp',
          fileSize: 123,
          data: 'data:image/webp;base64,abc',
          text: 'caption',
        },
      }),
    );
    expect(store.state.draft).toBe('');
    expect(store.state.messages[0]).toMatchObject({
      id: 'reserved-file-1',
      text: 'caption',
      status: 'sent',
      attachment: {
        type: 'file',
        fileName: 'demo.webp',
        mimeType: 'image/webp',
        fileSize: 123,
        data: 'data:image/webp;base64,abc',
      },
    });
  });
});
