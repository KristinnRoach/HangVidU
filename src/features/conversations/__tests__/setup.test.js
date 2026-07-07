import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => {
  const handlers = new Map();
  const register = (eventName, handler, options = {}) => {
    handlers.set(eventName, handler);
    const unsubscribe = () => handlers.delete(eventName);
    if (options.signal) {
      if (options.signal.aborted) unsubscribe();
      else
        options.signal.addEventListener('abort', unsubscribe, { once: true });
    }
    return unsubscribe;
  };
  return {
    handlers,
    subscribe: vi.fn(register),
    startConversationListSync: vi.fn(),
    stopConversationListSync: vi.fn(),
    resetConversationsState: vi.fn(),
    resetConversationStore: vi.fn(),
  };
});

vi.mock('../../../shared/events/index.js', () => ({
  subscribe: mocks.subscribe,
}));
vi.mock('../../../stores/conversation-list-state', () => ({
  startConversationListSync: mocks.startConversationListSync,
  stopConversationListSync: mocks.stopConversationListSync,
}));
vi.mock('../../../stores/conversations-client.js', () => ({
  resetConversationsState: mocks.resetConversationsState,
}));
vi.mock('../../../stores/selectedConversationStore', () => ({
  resetConversationStore: mocks.resetConversationStore,
}));

describe('conversations setup', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
  });

  it('stops activity and resets conversation state on logout', async () => {
    const { setup } = await import('../index');
    await setup();

    await mocks.handlers.get('evt:auth:session:logged-out')();

    expect(mocks.stopConversationListSync).toHaveBeenCalledOnce();
    expect(mocks.resetConversationStore).toHaveBeenCalledOnce();
    expect(mocks.resetConversationsState).toHaveBeenCalledOnce();
  });

  it('resets conversation state when activity teardown throws', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mocks.stopConversationListSync.mockImplementation(() => {
      throw new Error('stop failed');
    });

    try {
      const { setup } = await import('../index');
      await setup();

      await mocks.handlers.get('evt:auth:session:logged-out')();

      expect(mocks.stopConversationListSync).toHaveBeenCalledOnce();
      expect(mocks.resetConversationsState).toHaveBeenCalledOnce();
    } finally {
      warn.mockRestore();
    }
  });

  it('aborts the subscription on teardown', async () => {
    const { setup } = await import('../index');
    const teardown = await setup();

    expect(mocks.handlers.has('evt:auth:session:logged-out')).toBe(true);
    teardown();
    expect(mocks.handlers.has('evt:auth:session:logged-out')).toBe(false);
  });
});
