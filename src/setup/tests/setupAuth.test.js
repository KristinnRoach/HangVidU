import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();

  return {
    handlers,
    events: {
      subscribe: vi.fn((eventName, handler) => {
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

vi.mock('../../events/index.js', () => ({
  subscribe: mocks.events.subscribe,
}));

vi.mock('../../auth/index.js', () => ({
  initAuth: vi.fn(() => Promise.resolve()),
}));

vi.mock('../../utils/dev/dev-utils.js', () => ({
  devDebug: mocks.devDebug,
}));

vi.mock('../../features/call/room-listeners.js', () => ({
  removeAllIncomingListeners: mocks.removeAllIncomingListeners,
  startListeningForSavedRooms: mocks.startListeningForSavedRooms,
}));

vi.mock('../../features/contacts/index.js', () => ({
  cleanupInviteListeners: mocks.cleanupInviteListeners,
  setupInviteListener: mocks.setupInviteListener,
  processReferral: mocks.processReferral,
  renderContactsList: mocks.renderContactsList,
}));

vi.mock('../../features/push-notifications/index.js', () => ({
  getPushNotifications: mocks.getPushNotifications,
}));

vi.mock('../../features/notifications/index.js', () => ({
  showEnableNotificationsPrompt: mocks.showEnableNotificationsPrompt,
}));

describe('setupAuth', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
  });

  it('renders contacts when auth becomes ready', async () => {
    const { setupAuth } = await import('../setupAuth.js');
    const lobbyElement = { id: 'lobby' };

    const teardown = await setupAuth({ lobbyElement });

    await mocks.handlers.get('auth:ready')({});

    expect(mocks.renderContactsList).toHaveBeenCalledWith(lobbyElement);

    teardown();
  });

  it('handles login through shared auth facts without re-attaching saved room listeners on initial resolution', async () => {
    const { setupAuth } = await import('../setupAuth.js');
    const lobbyElement = { id: 'lobby' };

    mocks.getPushNotifications.mockReturnValue({
      ensureEnabledIfGranted: vi.fn(() =>
        Promise.resolve({ state: 'prompt-needed' }),
      ),
    });

    const teardown = await setupAuth({ lobbyElement });

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

  it('handles logout through shared auth facts', async () => {
    const { setupAuth } = await import('../setupAuth.js');
    const lobbyElement = { id: 'lobby' };

    const teardown = await setupAuth({ lobbyElement });

    await mocks.handlers.get('auth:logout')({});
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(mocks.renderContactsList).toHaveBeenCalledWith(lobbyElement);
    expect(mocks.removeAllIncomingListeners).toHaveBeenCalled();
    expect(mocks.cleanupInviteListeners).toHaveBeenCalled();

    teardown();
  });
});
