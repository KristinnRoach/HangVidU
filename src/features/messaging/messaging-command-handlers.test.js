import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();

  return {
    handlers,
    events: {
      dispatchCommandAndAwait: vi.fn(),
      handleCommand: vi.fn((eventName, handler) => {
        handlers.set(eventName, handler);
        return () => handlers.delete(eventName);
      }),
      subscribe: vi.fn((eventName, handler) => {
        handlers.set(eventName, handler);
        return () => handlers.delete(eventName);
      }),
    },
    messagingController: {
      selectConversation: vi.fn(() => Promise.resolve()),
      sendEventMessage: vi.fn(() => Promise.resolve()),
      listenToUnreadCount: vi.fn(() => vi.fn()),
    },
    tempWarn: vi.fn(),
  };
});

vi.mock('../../shared/events/index.js', () => ({
  dispatchCommandAndAwait: mocks.events.dispatchCommandAndAwait,
  handleCommand: mocks.events.handleCommand,
  subscribe: mocks.events.subscribe,
}));

vi.mock('../../shared/utils/dev/dev-utils.js', () => ({
  tempWarn: mocks.tempWarn,
}));

describe('setupMessagingAppBusHandlers', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
  });

  it('registers and tears down unread-count subscriptions through messaging commands', async () => {
    const unsubscribe = vi.fn();
    mocks.messagingController.listenToUnreadCount.mockReturnValue(unsubscribe);

    const { setupMessagingAppBusHandlers } = await import(
      './messaging-command-handlers.js'
    );

    setupMessagingAppBusHandlers({
      messagingController: mocks.messagingController,
    });

    const listenHandler = mocks.handlers.get(
      'cmd:messaging:conversation:unread-count-listen',
    );
    const unlistenHandler = mocks.handlers.get(
      'cmd:messaging:conversation:unread-count-unlisten',
    );

    listenHandler?.({ conversationId: 'conv-123' });
    listenHandler?.({ conversationId: 'conv-123' });

    expect(mocks.messagingController.listenToUnreadCount).toHaveBeenCalledTimes(
      1,
    );
    expect(mocks.messagingController.listenToUnreadCount).toHaveBeenCalledWith(
      'conv-123',
    );

    unlistenHandler?.({ conversationId: 'conv-123' });
    expect(unsubscribe).not.toHaveBeenCalled();

    unlistenHandler?.({ conversationId: 'conv-123' });

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
