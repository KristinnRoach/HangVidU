import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();
  const register = (eventName, handler, options = {}) => {
    handlers.set(eventName, handler);
    const unsubscribe = () => handlers.delete(eventName);
    if (options.signal) {
      if (options.signal.aborted) unsubscribe();
      else options.signal.addEventListener('abort', unsubscribe, { once: true });
    }
    return unsubscribe;
  };
  return {
    handlers,
    subscribe: vi.fn(register),
    stopConversationActivity: vi.fn(),
    resetConversationsState: vi.fn(),
  };
});

vi.mock('../../../shared/events/index.js', () => ({
  subscribe: mocks.subscribe,
}));
vi.mock('../../../stores/conversation-activity', () => ({
  stopConversationActivity: mocks.stopConversationActivity,
}));
vi.mock('../../../stores/conversations-client.js', () => ({
  resetConversationsState: mocks.resetConversationsState,
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

    expect(mocks.stopConversationActivity).toHaveBeenCalledOnce();
    expect(mocks.resetConversationsState).toHaveBeenCalledOnce();
  });

  it('aborts the subscription on teardown', async () => {
    const { setup } = await import('../index');
    const teardown = await setup();

    expect(mocks.handlers.has('evt:auth:session:logged-out')).toBe(true);
    teardown();
    expect(mocks.handlers.has('evt:auth:session:logged-out')).toBe(false);
  });
});
