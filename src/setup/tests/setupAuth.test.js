import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
    closeAllConversations: vi.fn(),
    resetMessagesUI: vi.fn(),
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

vi.mock('../../shared/events/index.js', () => ({
  subscribe: mocks.events.subscribe,
}));

vi.mock('../../auth/index.js', () => ({
  initAuth: vi.fn(() => Promise.resolve()),
}));

vi.mock('../../shared/utils/dev/dev-utils.js', () => ({
  devDebug: mocks.devDebug,
}));

vi.mock('../../features/call/room-listeners.js', () => ({
  removeAllIncomingListeners: mocks.removeAllIncomingListeners,
  startListeningForSavedRooms: mocks.startListeningForSavedRooms,
}));

vi.mock('../../features/messaging/messaging-controller.js', () => ({
  messagingController: {
    closeAllConversations: mocks.closeAllConversations,
  },
}));

vi.mock('../../features/messaging/components/messages-ui.js', () => ({
  messagesUI: {
    reset: mocks.resetMessagesUI,
  },
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
  let localStorageClearSpy;
  let localStorageRef;
  let localStorageData;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
    localStorageData = new Map();
    localStorageRef = {
      get length() {
        return localStorageData.size;
      },
      key: (index) => Array.from(localStorageData.keys())[index] ?? null,
      getItem: (key) =>
        localStorageData.has(String(key))
          ? localStorageData.get(String(key))
          : null,
      setItem: (key, value) => localStorageData.set(String(key), String(value)),
      removeItem: (key) => localStorageData.delete(String(key)),
      clear: () => localStorageData.clear(),
    };

    vi.stubGlobal('localStorage', localStorageRef);
    localStorageClearSpy = vi.spyOn(globalThis.localStorage, 'clear');
  });

  afterEach(() => {
    localStorageClearSpy?.mockRestore();
    vi.unstubAllGlobals();
  });

  it('renders contacts when auth becomes ready', async () => {
    const { setupAuth } = await import('../setupAuth.js');
    const lobbyElement = { id: 'lobby' };

    const teardown = await setupAuth({ lobbyElement });

    await mocks.handlers.get('evt:auth:session:ready')({});

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

    await mocks.handlers.get('evt:auth:session:login')({
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

    await mocks.handlers.get('evt:auth:session:logout')({});

    expect(mocks.renderContactsList).toHaveBeenCalledWith(lobbyElement);
    expect(mocks.removeAllIncomingListeners).toHaveBeenCalled();
    expect(mocks.cleanupInviteListeners).toHaveBeenCalled();
    expect(mocks.closeAllConversations).toHaveBeenCalled();
    expect(mocks.resetMessagesUI).toHaveBeenCalled();
    expect(localStorageClearSpy).toHaveBeenCalled();

    teardown();
  });

  it('preserves selected localStorage keys on logout', async () => {
    const { setupAuth } = await import('../setupAuth.js');
    const lobbyElement = { id: 'lobby' };

    globalThis.localStorage.setItem('locale', 'is');
    globalThis.localStorage.setItem('volatileKey', 'drop-me');

    const teardown = await setupAuth({ lobbyElement });

    await mocks.handlers.get('evt:auth:session:logout')({});

    expect(globalThis.localStorage.getItem('locale')).toBe('is');
    expect(globalThis.localStorage.getItem('volatileKey')).toBeNull();

    teardown();
  });

  it('continues logout cleanup when conversation close throws', async () => {
    const { setupAuth } = await import('../setupAuth.js');
    const lobbyElement = { id: 'lobby' };

    mocks.closeAllConversations.mockImplementationOnce(() => {
      throw new Error('close failed');
    });

    const teardown = await setupAuth({ lobbyElement });

    await expect(
      mocks.handlers.get('evt:auth:session:logout')({}),
    ).resolves.toBeUndefined();

    expect(mocks.renderContactsList).toHaveBeenCalledWith(lobbyElement);
    expect(mocks.removeAllIncomingListeners).toHaveBeenCalled();
    expect(mocks.cleanupInviteListeners).toHaveBeenCalled();
    expect(mocks.closeAllConversations).toHaveBeenCalled();
    expect(mocks.resetMessagesUI).toHaveBeenCalled();
    expect(localStorageClearSpy).toHaveBeenCalled();

    teardown();
  });
});
