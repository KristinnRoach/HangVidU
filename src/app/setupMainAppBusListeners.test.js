import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();

  return {
    handlers,
    appBus: {
      on: vi.fn((eventName, handler) => {
        handlers.set(eventName, handler);
      }),
    },
    messagingController: {
      selectConversation: vi.fn(() => Promise.resolve()),
    },
    contactsService: {
      getConversationId: vi.fn(),
    },
    callContact: vi.fn(),
    listenForIncomingOnRoom: vi.fn(),
    removeIncomingListenersForRoom: vi.fn(),
    isDev: vi.fn(() => false),
    tempWarn: vi.fn(),
  };
});

vi.mock('./app-bus.js', () => ({
  appBus: mocks.appBus,
}));

vi.mock('../messaging/messaging-controller.js', () => ({
  messagingController: mocks.messagingController,
}));

vi.mock('../contacts/index.js', () => ({
  contactsService: mocks.contactsService,
}));

vi.mock('../utils/dev/dev-utils.js', () => ({
  isDev: mocks.isDev,
  tempWarn: mocks.tempWarn,
}));

vi.mock('../call/WIP-start-call-refactor.js', () => ({
  callContact: mocks.callContact,
}));

vi.mock('../call/room-listeners.js', () => ({
  listenForIncomingOnRoom: mocks.listenForIncomingOnRoom,
  removeIncomingListenersForRoom: mocks.removeIncomingListenersForRoom,
}));

vi.mock('../utils/url.js', () => ({
  clearUrlParam: vi.fn(),
}));

vi.mock('../ui/core/call-lifecycle-ui.js', () => ({
  onCallDisconnected: vi.fn(),
}));

describe('setupMainAppBusListeners', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.handlers.clear();
  });

  it('does not attempt conversation selection when no contactId is provided', async () => {
    const { setupMainAppBusListeners } = await import('./setupMainAppBusListeners.js');

    setupMainAppBusListeners();
    const handler = mocks.handlers.get('call:outgoing:requested');

    handler?.({
      contactId: null,
      contactName: 'Unknown Caller',
      roomId: 'room-123',
    });

    expect(mocks.contactsService.getConversationId).not.toHaveBeenCalled();
    expect(mocks.messagingController.selectConversation).not.toHaveBeenCalled();
    expect(mocks.callContact).toHaveBeenCalledWith(null, 'Unknown Caller', 'room-123');
  });

  it('removes the previous room listener before listening on an updated room', async () => {
    const { setupMainAppBusListeners } = await import('./setupMainAppBusListeners.js');

    setupMainAppBusListeners();
    const handler = mocks.handlers.get('room:id:updated');

    handler?.({
      roomId: 'room-new',
      previousRoomId: 'room-old',
    });

    expect(mocks.removeIncomingListenersForRoom).toHaveBeenCalledWith('room-old');
    expect(mocks.listenForIncomingOnRoom).toHaveBeenCalledWith('room-new');
  });
});
