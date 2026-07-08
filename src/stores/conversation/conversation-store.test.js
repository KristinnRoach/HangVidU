import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  getLoggedInUserId: vi.fn(),
  getLoggedInUserProfile: vi.fn(),
  createMessageSyncRepository: vi.fn(),
  markConversationRead: vi.fn(),
  recordConversationListMessage: vi.fn(),
  ensureDirectConversationListed: vi.fn(),
  refreshConversationListState: vi.fn(),
  conversationListState: vi.fn(() => new Map()),
  resolveDirectConversationId: vi.fn(),
  getContactById: vi.fn(),
  cacheContactConversationId: vi.fn(),
  uploadConversationFile: vi.fn(),
  deleteConversationFile: vi.fn(),
  sendMessageNotification: vi.fn(),
  compressImage: vi.fn(),
}));

vi.mock('../../auth/index.js', () => ({
  getLoggedInUserId: mocks.getLoggedInUserId,
}));
vi.mock('../user-profile-store', () => ({
  getLoggedInUserProfile: mocks.getLoggedInUserProfile,
}));
vi.mock('./conversation-list-state', () => ({
  markConversationRead: mocks.markConversationRead,
  recordConversationListMessage: mocks.recordConversationListMessage,
  ensureDirectConversationListed: mocks.ensureDirectConversationListed,
  refreshConversationListState: mocks.refreshConversationListState,
  conversationListState: mocks.conversationListState,
  conversationPeers: (conversation) =>
    conversation.members
      .map((member) => member.user_id)
      .filter((id) => id !== mocks.getLoggedInUserId()),
}));
vi.mock('./conversations-client', () => ({
  resolveDirectConversationId: mocks.resolveDirectConversationId,
  getConversationsClient: () => ({}),
}));
vi.mock('./message-sync.js', () => ({
  createMessageSyncRepository: mocks.createMessageSyncRepository,
}));
vi.mock('../contacts-store.js', () => ({
  getContactById: mocks.getContactById,
  getContactLabel: (contact) => contact?.nickname ?? null,
  cacheContactConversationId: mocks.cacheContactConversationId,
}));
vi.mock('../files-store.js', () => ({
  uploadConversationFile: mocks.uploadConversationFile,
  deleteConversationFile: mocks.deleteConversationFile,
}));
vi.mock('../../features/push-notifications/index.js', () => ({
  getPushNotifications: () => ({
    sendMessageNotification: mocks.sendMessageNotification,
  }),
}));
vi.mock('@lib/media/image-compress.js', () => ({
  compressImage: mocks.compressImage,
}));

function envelope(overrides) {
  return {
    messageId: 'msg-1',
    conversationId: 'conversation-1',
    senderId: 'user-a',
    sentAt: 1,
    delivery: 'persistent',
    reactions: [],
    payload: { type: 'text', text: 'hello' },
    ...overrides,
  };
}

describe('conversation-store', () => {
  /** Captured per test by the fake repository. */
  let watch;
  let repo;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    const storage = new Map();
    vi.stubGlobal('localStorage', {
      getItem: (key) => storage.get(String(key)) ?? null,
      setItem: (key, value) => storage.set(String(key), String(value)),
      removeItem: (key) => storage.delete(String(key)),
    });

    watch = { emit: null, error: null, unsubscribed: false };
    repo = {
      createMessageId: vi.fn(() => 'reserved-1'),
      loadMessages: vi.fn(() => []),
      watchRecentMessages: vi.fn((conversationId, onMessages, onError) => {
        watch.emit = onMessages;
        watch.error = onError;
        return () => {
          watch.unsubscribed = true;
        };
      }),
      send: vi.fn(() => ({ id: 'reserved-1', sentAt: 10 })),
      markConversationRead: vi.fn(),
      setMyReaction: vi.fn(),
    };
    mocks.createMessageSyncRepository.mockReturnValue(repo);

    mocks.getLoggedInUserId.mockReturnValue('me');
    mocks.getLoggedInUserProfile.mockReturnValue({ displayName: 'Me' });
    mocks.getContactById.mockReturnValue({
      contactId: 'contact-1',
      conversationId: 'conversation-1',
    });
    mocks.conversationListState.mockReturnValue(
      new Map([
        [
          'conversation-1',
          {
            conversationId: 'conversation-1',
            kind: 'direct',
            title: null,
            members: [
              { user_id: 'contact-1', display_name: null, joined_at: 0 },
            ],
            latestSentAt: 0,
            latestSenderId: null,
          },
        ],
      ]),
    );
  });

  it('persists the selected conversation id for direct opens', async () => {
    const store = await import('./conversation-store.js');

    await store.openDirectConversation('contact-1', { displayUI: false });

    expect(store.loadSelectedConversationId()).toBe('conversation-1');
    expect(repo.watchRecentMessages).toHaveBeenCalledWith(
      'conversation-1',
      expect.any(Function),
      expect.any(Function),
    );
  });

  it('persists selections opened by raw conversation id', async () => {
    const store = await import('./conversation-store.js');

    store.openConversation('group-1', { displayUI: true });

    expect(store.loadSelectedConversationId()).toBe('group-1');
    // Unknown id: the list reseeds so kind/members/label fill in.
    expect(mocks.refreshConversationListState).toHaveBeenCalled();
  });

  it('merges watcher snapshots in chronological order and maps file envelopes', async () => {
    const store = await import('./conversation-store.js');
    await store.openDirectConversation('contact-1');

    watch.emit([
      envelope({ messageId: 'msg-3', sentAt: 3 }),
      envelope({ messageId: 'msg-1', sentAt: 1 }),
      envelope({
        messageId: 'msg-2',
        sentAt: 2,
        payload: {
          type: 'file',
          fileName: 'demo.png',
          mimeType: 'image/png',
          fileSize: 123,
          storage: {
            provider: 'r2',
            bucket: 'hangvidu-files',
            key: 'conversation-files/conversation-1/msg-2',
          },
        },
      }),
      envelope({
        messageId: 'sys-1',
        sentAt: 4,
        payload: { type: 'system', systemType: 'noop' },
      }),
    ]);

    const state = store.getConversationState();
    expect(state.history).toBe('ready');
    expect(state.messages.map((msg) => msg.id)).toEqual([
      'msg-1',
      'msg-2',
      'msg-3',
    ]);
    expect(state.messages[1].attachment).toMatchObject({
      type: 'file',
      fileName: 'demo.png',
      storage: { provider: 'r2', bucket: 'hangvidu-files' },
    });
  });

  it('records DM activity for the latest watcher message', async () => {
    const store = await import('./conversation-store.js');
    await store.openDirectConversation('contact-1');

    watch.emit([envelope({ messageId: 'msg-1', sentAt: 5 })]);

    expect(mocks.recordConversationListMessage).toHaveBeenCalledWith(
      'conversation-1',
      5,
      'user-a',
    );
  });

  it('sends the draft under a reserved persistent id and clears it', async () => {
    const store = await import('./conversation-store.js');
    await store.openDirectConversation('contact-1');
    store.setConversationDraft('hello');

    const result = await store.sendMessage();

    expect(result).toBe(true);
    expect(repo.createMessageId).toHaveBeenCalledWith('conversation-1');
    expect(repo.send).toHaveBeenCalledWith(
      expect.objectContaining({
        messageId: 'reserved-1',
        conversationId: 'conversation-1',
        senderId: 'me',
        senderName: 'Me',
        payload: { type: 'text', text: 'hello' },
      }),
    );
    const state = store.getConversationState();
    expect(state.draft).toBe('');
    expect(state.messages.map((msg) => msg.id)).toEqual(['reserved-1']);
    expect(state.messages[0].status).toBe('sent');
    expect(mocks.sendMessageNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        recipientIds: ['contact-1'],
        conversationId: 'conversation-1',
        conversationKind: 'direct',
        messageText: 'hello',
      }),
    );
  });

  it('dedupes the watcher echo against the in-flight optimistic message', async () => {
    const store = await import('./conversation-store.js');
    await store.openDirectConversation('contact-1');
    store.setConversationDraft('hello');

    let resolveSend;
    repo.send.mockReturnValue(
      new Promise((resolve) => {
        resolveSend = resolve;
      }),
    );

    const sending = store.sendMessage();
    // Live echo lands before the send acknowledgement (same reserved id).
    watch.emit([
      envelope({ messageId: 'reserved-1', senderId: 'me', sentAt: 10 }),
    ]);
    resolveSend({ id: 'reserved-1', sentAt: 10 });
    await sending;

    const state = store.getConversationState();
    expect(state.messages.map((msg) => msg.id)).toEqual(['reserved-1']);
    expect(state.messages[0].status).toBe('sent');
  });

  it('marks the optimistic message failed when the send rejects', async () => {
    const store = await import('./conversation-store.js');
    await store.openDirectConversation('contact-1');
    store.setConversationDraft('hello');
    repo.send.mockRejectedValue(new Error('offline'));

    const result = await store.sendMessage();

    expect(result).toBe(false);
    const state = store.getConversationState();
    expect(state.messages[0].status).toBe('failed');
    expect(mocks.sendMessageNotification).not.toHaveBeenCalled();
  });

  it('isolates push notification failures from the send result', async () => {
    const store = await import('./conversation-store.js');
    await store.openDirectConversation('contact-1');
    store.setConversationDraft('hello');
    mocks.sendMessageNotification.mockImplementationOnce(() => {
      throw new Error('push unavailable');
    });

    await expect(store.sendMessage()).resolves.toBe(true);
  });

  it('persists drafts per conversation and restores them on reopen', async () => {
    vi.useFakeTimers();
    try {
      const store = await import('./conversation-store.js');
      await store.openDirectConversation('contact-1');

      store.setConversationDraft('unsent thought');
      vi.advanceTimersByTime(300);

      mocks.getContactById.mockReturnValue({
        contactId: 'contact-2',
        conversationId: 'conversation-2',
      });
      await store.openDirectConversation('contact-2');
      expect(store.getConversationState().draft).toBe('');

      mocks.getContactById.mockReturnValue({
        contactId: 'contact-1',
        conversationId: 'conversation-1',
      });
      await store.openDirectConversation('contact-1');
      expect(store.getConversationState().draft).toBe('unsent thought');
    } finally {
      vi.useRealTimers();
    }
  });

  it('reset stops the watch and clears all conversation state', async () => {
    const store = await import('./conversation-store.js');
    await store.openDirectConversation('contact-1');
    watch.emit([envelope()]);

    store.resetConversationStore();

    expect(watch.unsubscribed).toBe(true);
    expect(store.selection()).toBeNull();
    const state = store.getConversationState();
    expect(state.conversationId).toBeNull();
    expect(state.messages).toEqual([]);
    expect(state.history).toBe('idle');
  });
});
