import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();

  return {
    handlers,
    appBus: {
      on: vi.fn((eventName, handler) => {
        handlers.set(eventName, handler);
        return () => handlers.delete(eventName);
      }),
    },
    renderContactsList: vi.fn(() => Promise.resolve()),
    removeAllIncomingListeners: vi.fn(),
    startListeningForSavedRooms: vi.fn(() => Promise.resolve()),
    cleanupInviteListeners: vi.fn(),
    setupInviteListener: vi.fn(),
    processReferral: vi.fn(() => Promise.resolve()),
    getPushNotifications: vi.fn(),
    showEnableNotificationsPrompt: vi.fn(),
    devDebug: vi.fn(),
  };
});

vi.mock('../events/app-bus.js', () => ({
  appBus: mocks.appBus,
}));

vi.mock('../utils/dev/dev-utils.js', () => ({
  devDebug: mocks.devDebug,
}));

vi.mock('../features/call/room-listeners.js', () => ({
  removeAllIncomingListeners: mocks.removeAllIncomingListeners,
  startListeningForSavedRooms: mocks.startListeningForSavedRooms,
}));

vi.mock('../features/contacts/index.js', () => ({
  cleanupInviteListeners: mocks.cleanupInviteListeners,
  setupInviteListener: mocks.setupInviteListener,
  processReferral: mocks.processReferral,
  renderContactsList: mocks.renderContactsList,
}));

vi.mock('../features/push-notifications/index.js', () => ({
  getPushNotifications: mocks.getPushNotifications,
}));

vi.mock('../features/notifications/index.js', () => ({
  showEnableNotificationsPrompt: mocks.showEnableNotificationsPrompt,
}));

describe('setupMainAuthAppBusListeners', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
  });

  it('renders contacts when auth becomes ready', async () => {
    const { setupMainAuthAppBusListeners } =
      await import('./setupMainAuthAppBusListeners.js');
    const lobbyElement = { id: 'lobby' };

    const teardown = setupMainAuthAppBusListeners({ lobbyElement });

    await mocks.handlers.get('auth:ready')({});

    expect(mocks.renderContactsList).toHaveBeenCalledWith(lobbyElement);

    teardown();
  });

  it('handles login through appBus without re-attaching saved room listeners on initial resolution', async () => {
    const { setupMainAuthAppBusListeners } =
      await import('./setupMainAuthAppBusListeners.js');
    const lobbyElement = { id: 'lobby' };

    mocks.getPushNotifications.mockReturnValue({
      ensureEnabledIfGranted: vi.fn(() =>
        Promise.resolve({ state: 'prompt-needed' }),
      ),
    });

    const teardown = setupMainAuthAppBusListeners({ lobbyElement });

    await mocks.handlers.get('auth:login')({
      isInitialResolution: true,
    });

    expect(mocks.processReferral).toHaveBeenCalled();
    expect(mocks.renderContactsList).toHaveBeenCalledWith(lobbyElement);
    expect(mocks.startListeningForSavedRooms).not.toHaveBeenCalled();
    expect(mocks.setupInviteListener).toHaveBeenCalledWith(lobbyElement);
    expect(mocks.showEnableNotificationsPrompt).toHaveBeenCalled();

    teardown();
  });

  it('handles logout through appBus', async () => {
    const { setupMainAuthAppBusListeners } =
      await import('./setupMainAuthAppBusListeners.js');
    const lobbyElement = { id: 'lobby' };

    const teardown = setupMainAuthAppBusListeners({ lobbyElement });

    await mocks.handlers.get('auth:logout')({});

    expect(mocks.renderContactsList).toHaveBeenCalledWith(lobbyElement);
    expect(mocks.removeAllIncomingListeners).toHaveBeenCalled();
    expect(mocks.cleanupInviteListeners).toHaveBeenCalled();

    teardown();
  });
});
