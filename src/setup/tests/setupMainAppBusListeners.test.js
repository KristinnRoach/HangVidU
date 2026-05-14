import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();

  return {
    handlers,
    events: {
      dispatchCommandAndAwait: vi.fn(() => Promise.resolve()),
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
    },
    getContactById: vi.fn(() => null),
    getContactByRoomId: vi.fn(() => null),
    getConversationId: vi.fn(() => null),
    setUserOffline: vi.fn(() => Promise.resolve()),
    isDev: vi.fn(() => false),
    tempWarn: vi.fn(),
  };
});

vi.mock('../../shared/events/index.js', () => ({
  dispatchCommandAndAwait: mocks.events.dispatchCommandAndAwait,
  handleCommand: mocks.events.handleCommand,
  subscribe: mocks.events.subscribe,
}));

vi.mock('../../features/messaging/messaging-controller.js', () => ({
  messagingController: mocks.messagingController,
}));

vi.mock('../../features/contacts/index.js', () => ({
  getContactById: mocks.getContactById,
  getContactByRoomId: mocks.getContactByRoomId,
  getConversationId: mocks.getConversationId,
}));

vi.mock('../../shared/utils/dev/dev-utils.js', () => ({
  isDev: mocks.isDev,
  tempWarn: mocks.tempWarn,
}));

vi.mock('../../features/presence/index.js', () => ({
  setUserOffline: mocks.setUserOffline,
}));

describe('setupMainAppBusListeners', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
  });

  it('selects a conversation when the messaging selection command is emitted', async () => {
    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('cmd:messaging:conversation:select');

    await handler?.({
      conversationId: 'conv-123',
      remoteParticipantIds: ['contact-1'],
      displayUI: true,
    });

    expect(mocks.getContactById).toHaveBeenCalledWith('contact-1');
    expect(mocks.messagingController.selectConversation).toHaveBeenCalledWith(
      'conv-123',
      {
        remoteParticipantIds: ['contact-1'],
        displayUI: true,
        contactNickName: null,
      },
    );
  });

  it('uses provided contactNickName without loading local contact record', async () => {
    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('cmd:messaging:conversation:select');

    await handler?.({
      conversationId: 'conv-123',
      remoteParticipantIds: ['contact-1'],
      displayUI: true,
      contactNickName: 'Provided Nick',
    });

    expect(mocks.getContactById).not.toHaveBeenCalled();
    expect(mocks.messagingController.selectConversation).toHaveBeenCalledWith(
      'conv-123',
      {
        remoteParticipantIds: ['contact-1'],
        displayUI: true,
        contactNickName: 'Provided Nick',
      },
    );
  });

  it('dispatches the conversation selection command when an incoming call is accepted', async () => {
    mocks.getConversationId.mockReturnValue('conv-xyz');
    mocks.getContactById.mockReturnValue({ contactNickName: 'Dial Nick' });

    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('evt:call:incoming:accepted');

    await handler?.({
      contactId: 'contact-1',
    });

    expect(mocks.events.dispatchCommandAndAwait).toHaveBeenCalledWith(
      'cmd:messaging:conversation:select',
      {
        conversationId: 'conv-xyz',
        remoteParticipantIds: ['contact-1'],
        displayUI: false,
        contactNickName: 'Dial Nick',
      },
    );
  });

  it('does not dispatch accepted-call conversation selection without a conversation id', async () => {
    mocks.getConversationId.mockReturnValue(null);

    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('evt:call:incoming:accepted');

    await handler?.({
      contactId: 'contact-1',
    });

    expect(mocks.events.dispatchCommandAndAwait).not.toHaveBeenCalled();
  });

  it('writes an unanswered-call event message to the contact conversation', async () => {
    mocks.getConversationId.mockReturnValue('conv-xyz');

    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('evt:call:session:unanswered');

    await handler?.({
      roomId: 'room-123',
      contactId: 'contact-1',
    });

    expect(mocks.messagingController.sendEventMessage).toHaveBeenCalledWith(
      'conv-xyz',
      'evt:call:session:unanswered',
      { callId: 'room-123' },
    );
  });

  it('handles the presence offline command through setup wiring', async () => {
    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('cmd:user:presence:set-offline');

    await handler?.();

    expect(mocks.setUserOffline).toHaveBeenCalled();
  });
});
