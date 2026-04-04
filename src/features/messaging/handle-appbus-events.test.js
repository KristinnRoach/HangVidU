import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();

  return {
    handlers,
    events: {
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
    contactsService: {
      getConversationId: vi.fn(),
    },
    tempWarn: vi.fn(),
  };
});

vi.mock('../../events/index.js', () => ({
  dispatchCommand: vi.fn(),
  handleCommand: mocks.events.handleCommand,
  subscribe: mocks.events.subscribe,
}));

vi.mock('../../utils/dev/dev-utils.js', () => ({
  tempWarn: mocks.tempWarn,
}));

vi.mock('../contacts/index.js', () => ({
  contactsService: mocks.contactsService,
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

    const { setupMessagingAppBusHandlers } = await import('./handle-appbus-events.js');

    setupMessagingAppBusHandlers({
      messagingController: mocks.messagingController,
    });

    const listenHandler = mocks.handlers.get(
      'messaging:conversation:unread-count:listen',
    );
    const unlistenHandler = mocks.handlers.get(
      'messaging:conversation:unread-count:unlisten',
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

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
