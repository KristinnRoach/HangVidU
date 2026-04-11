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
    },
    contactsService: {
      getConversationId: vi.fn(),
      getContact: vi.fn(async () => null),
    },
    callContact: vi.fn(),
    listenForIncomingOnRoom: vi.fn(),
    removeIncomingListenersForRoom: vi.fn(),
    setUserOffline: vi.fn(() => Promise.resolve()),
    isDev: vi.fn(() => false),
    tempWarn: vi.fn(),
  };
});

vi.mock('../../shared/events/index.js', () => ({
  handleCommand: mocks.events.handleCommand,
  subscribe: mocks.events.subscribe,
}));

vi.mock('../../features/messaging/messaging-controller.js', () => ({
  messagingController: mocks.messagingController,
}));

vi.mock('../../features/contacts/index.js', () => ({
  contactsService: mocks.contactsService,
}));

vi.mock('../../shared/utils/dev/dev-utils.js', () => ({
  isDev: mocks.isDev,
  tempWarn: mocks.tempWarn,
}));

vi.mock('../../features/call/WIP-start-call-refactor.js', () => ({
  callContact: mocks.callContact,
}));

vi.mock('../../features/call/room-listeners.js', () => ({
  listenForIncomingOnRoom: mocks.listenForIncomingOnRoom,
  removeIncomingListenersForRoom: mocks.removeIncomingListenersForRoom,
}));

vi.mock('../../features/presence/index.js', () => ({
  setUserOffline: mocks.setUserOffline,
}));

vi.mock('../../shared/utils/url.js', () => ({
  clearUrlParam: vi.fn(),
}));

vi.mock('../../shared/components/ui/core/call-lifecycle-ui.js', () => ({
  onCallDisconnected: vi.fn(),
}));

describe('setupMainAppBusListeners', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
  });

  it('does not attempt conversation selection when no contactId is provided', async () => {
    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('call:outgoing:initiate');

    handler?.({
      contactId: null,
      contactNickName: 'Unknown Caller',
      conversationId: null,
      roomId: 'room-123',
    });

    expect(mocks.contactsService.getConversationId).not.toHaveBeenCalled();
    expect(mocks.messagingController.selectConversation).not.toHaveBeenCalled();
    expect(mocks.callContact).toHaveBeenCalledWith(
      null,
      'Unknown Caller',
      'room-123',
    );
  });

  it('selects a conversation when the messaging selection command is emitted', async () => {
    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('messaging:conversation:select');

    await handler?.({
      conversationId: 'conv-123',
      remoteParticipantIds: ['contact-1'],
      displayUI: true,
    });

    expect(mocks.contactsService.getContact).toHaveBeenCalledWith('contact-1');
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
    const handler = mocks.handlers.get('messaging:conversation:select');

    await handler?.({
      conversationId: 'conv-123',
      remoteParticipantIds: ['contact-1'],
      displayUI: true,
      contactNickName: 'Provided Nick',
    });

    expect(mocks.contactsService.getContact).not.toHaveBeenCalled();
    expect(mocks.messagingController.selectConversation).toHaveBeenCalledWith(
      'conv-123',
      {
        remoteParticipantIds: ['contact-1'],
        displayUI: true,
        contactNickName: 'Provided Nick',
      },
    );
  });

  it('passes contactNickName to preselected outgoing-call conversation', async () => {
    mocks.contactsService.getConversationId.mockResolvedValue('conv-xyz');

    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('call:outgoing:initiate');

    await handler?.({
      contactId: 'contact-1',
      contactNickName: 'Dial Nick',
      conversationId: null,
      roomId: 'room-123',
    });

    expect(mocks.messagingController.selectConversation).toHaveBeenCalledWith(
      'conv-xyz',
      {
        remoteParticipantIds: ['contact-1'],
        displayUI: false,
        contactNickName: 'Dial Nick',
      },
    );
  });

  it('removes the previous room listener before listening on an updated room', async () => {
    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('room:id:updated');

    handler?.({
      roomId: 'room-new',
      previousRoomId: 'room-old',
    });

    expect(mocks.removeIncomingListenersForRoom).toHaveBeenCalledWith(
      'room-old',
    );
    expect(mocks.listenForIncomingOnRoom).toHaveBeenCalledWith('room-new');
  });

  it('handles the presence offline command through the app layer', async () => {
    const { setupMainAppBusListeners } =
      await import('../setupMainAppBusListeners.js');

    await setupMainAppBusListeners();
    const handler = mocks.handlers.get('user:presence:set-offline');

    await handler?.();

    expect(mocks.setUserOffline).toHaveBeenCalled();
  });
});
