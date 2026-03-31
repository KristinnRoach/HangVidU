import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  let cleanupHandler = null;

  return {
    get cleanupHandler() {
      return cleanupHandler;
    },
    set cleanupHandler(handler) {
      cleanupHandler = handler;
    },
    CallController: {
      on: vi.fn((eventName, handler) => {
        if (eventName === 'cleanup') {
          cleanupHandler = handler;
        }
      }),
      setPartnerId: vi.fn(),
    },
    contactsService: {
      getContactByRoomId: vi.fn(),
      handleHangUp: vi.fn(),
    },
    auth: {
      getUserId: vi.fn(() => 'user-123'),
      getUser: vi.fn(() => ({ displayName: 'Caller Example' })),
    },
    pushController: {
      sendMissedCall: vi.fn(),
      isNotificationEnabled: vi.fn(() => false),
      dismissCallNotifications: vi.fn(),
    },
    cleanupRemoteStream: vi.fn(),
    clearUrlParam: vi.fn(),
    onCallAnswered: vi.fn(() => Promise.resolve()),
    renderContactsList: vi.fn(() => Promise.resolve()),
    promptAndRefreshContactSave: vi.fn(() => Promise.resolve()),
    devDebug: vi.fn(),
    appBus: {
      emit: vi.fn(),
    },
    listenForIncomingOnRoom: vi.fn(),
  };
});

vi.mock('./call-controller.js', () => ({
  default: mocks.CallController,
}));

vi.mock('../contacts/contacts-service.js', () => ({
  contactsService: mocks.contactsService,
}));

vi.mock('../auth/auth-state.js', () => ({
  getUserId: mocks.auth.getUserId,
  getUser: mocks.auth.getUser,
}));

vi.mock('../push-notifications/index.js', () => ({
  getPushNotifications: vi.fn(() => mocks.pushController),
}));

vi.mock('../media/state.js', () => ({
  cleanupRemoteStream: mocks.cleanupRemoteStream,
}));

vi.mock('../utils/url.js', () => ({
  clearUrlParam: mocks.clearUrlParam,
}));

vi.mock('../ui/components/calling/calling-ui.js', () => ({
  onCallAnswered: mocks.onCallAnswered,
}));

vi.mock('../contacts/components/contacts-list.js', () => ({
  renderContactsList: mocks.renderContactsList,
}));

vi.mock('../app/contact-save-flow.js', () => ({
  promptAndRefreshContactSave: mocks.promptAndRefreshContactSave,
}));

vi.mock('../utils/dev/dev-utils.js', () => ({
  devDebug: mocks.devDebug,
}));

vi.mock('../app/app-bus.js', () => ({
  appBus: mocks.appBus,
}));

vi.mock('./room-listeners.js', () => ({
  listenForIncomingOnRoom: mocks.listenForIncomingOnRoom,
}));

describe('setupCallControllerEventWiring', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.cleanupHandler = null;
    mocks.contactsService.getContactByRoomId.mockResolvedValue({
      contactId: 'contact-456',
      contactName: 'Saved Contact',
    });
    mocks.pushController.sendMissedCall.mockRejectedValue(
      new Error('push backend unavailable'),
    );
  });

  it('emits call:unanswered even when missed-call push delivery fails', async () => {
    const { setupCallControllerEventWiring } =
      await import('./call-event-wiring.js');

    setupCallControllerEventWiring({
      lobbyElement: document.createElement('div'),
    });

    await mocks.cleanupHandler?.({
      roomId: 'room-123',
      partnerId: null,
      reason: 'cleanup',
      role: 'initiator',
      wasConnected: false,
    });

    expect(mocks.appBus.emit).toHaveBeenCalledWith('call:unanswered', {
      roomId: 'room-123',
      contactId: 'contact-456',
    });
  });
});
