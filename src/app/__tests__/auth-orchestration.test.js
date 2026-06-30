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
    setupInviteListener: vi.fn(),
    processReferral: vi.fn(() => Promise.resolve()),
    hydrateContacts: vi.fn(() => Promise.resolve()),
    resetContacts: vi.fn(),
    savePublicUserProfile: vi.fn(() => Promise.resolve()),
    getPublicUserProfile: vi.fn(() => Promise.resolve(null)),
    ensureHandle: vi.fn(() => Promise.resolve({ handle: null, assigned: false })),
    registerInUserDirectory: vi.fn(() => Promise.resolve()),
    devDebug: vi.fn(),
    stopConversationActivity: vi.fn(),
  };
});

vi.mock('../../shared/events/index.js', () => ({
  subscribe: mocks.events.subscribe,
}));

vi.mock('../../auth/index.js', () => ({
  initAuth: vi.fn(() => Promise.resolve()),
}));

vi.mock('../../stores/userDirectoryStore.js', () => ({
  savePublicUserProfile: mocks.savePublicUserProfile,
  getPublicUserProfile: mocks.getPublicUserProfile,
  ensureHandle: mocks.ensureHandle,
  registerInUserDirectory: mocks.registerInUserDirectory,
}));

vi.mock('../../shared/utils/dev/dev-utils.js', () => ({
  devDebug: mocks.devDebug,
}));

vi.mock('../../features/contacts/invites/invite-listener.js', () => ({
  setupInviteListener: mocks.setupInviteListener,
}));
vi.mock('../../features/contacts/referrals/referral-handler.js', () => ({
  processReferral: mocks.processReferral,
}));
vi.mock('../../stores/contactsStore.js', () => ({
  hydrateContacts: mocks.hydrateContacts,
  resetContacts: mocks.resetContacts,
}));
vi.mock('../../stores/conversation-activity', () => ({
  stopConversationActivity: mocks.stopConversationActivity,
}));

describe('wireAuthReactions', () => {
  let localStorageClearSpy;
  let localStorageRef;
  let localStorageData;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
    mocks.hydrateContacts.mockResolvedValue();
    mocks.setupInviteListener.mockReturnValue(undefined);
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
    const { wireAuthReactions } = await import('../auth-orchestration.js');
    const lobbyElement = { id: 'lobby' };

    const teardown = await wireAuthReactions({ lobbyElement });

    await mocks.handlers.get('evt:auth:session:ready')({});

    expect(mocks.hydrateContacts).toHaveBeenCalled();

    teardown();
  });

  it('runs the login flow through shared auth facts', async () => {
    const { wireAuthReactions } = await import('../auth-orchestration.js');
    const lobbyElement = { id: 'lobby' };
    const user = {
      uid: 'user-1',
      displayName: 'Ada',
      email: 'ada@example.com',
      photoURL: null,
    };
    mocks.getPublicUserProfile.mockResolvedValue({
      displayName: null,
      photoURL: null,
      username: null,
    });
    mocks.ensureHandle.mockResolvedValue({ handle: 'ada', assigned: false });

    const teardown = await wireAuthReactions({ lobbyElement });

    await mocks.handlers.get('evt:auth:session:logged-in')({
      state: { user },
    });
    await Promise.resolve();

    expect(mocks.processReferral).toHaveBeenCalled();
    expect(mocks.hydrateContacts).toHaveBeenCalled();
    expect(mocks.getPublicUserProfile).toHaveBeenCalledWith(user.uid);
    expect(mocks.savePublicUserProfile).toHaveBeenCalledWith(user);
    // Login guarantees a handle via ensureHandle, then indexes the email→account
    // entry with that handle (replaces the old getPublicUserProfile read).
    expect(mocks.ensureHandle).toHaveBeenCalledWith(user);
    expect(mocks.registerInUserDirectory).toHaveBeenCalledWith(user, {
      username: 'ada',
    });
    expect(mocks.setupInviteListener).toHaveBeenCalledWith();

    teardown();
  });

  it('does not overwrite an existing D1 profile with provider profile data on login', async () => {
    const { wireAuthReactions } = await import('../auth-orchestration.js');
    const user = {
      uid: 'user-1',
      displayName: 'Kristinn Roach',
      email: 'crystalquicksand@gmail.com',
      photoURL: 'https://example.test/google-photo.jpg',
    };
    mocks.getPublicUserProfile.mockResolvedValue({
      displayName: 'Crystal Quicksand',
      photoURL: null,
      username: 'crystal_quicksand',
    });
    mocks.ensureHandle.mockResolvedValue({
      handle: 'crystal_quicksand',
      assigned: false,
    });

    const teardown = await wireAuthReactions({ lobbyElement: { id: 'lobby' } });

    await mocks.handlers.get('evt:auth:session:logged-in')({
      state: { user },
    });

    expect(mocks.savePublicUserProfile).not.toHaveBeenCalled();
    expect(mocks.ensureHandle).toHaveBeenCalledWith(user);
    expect(mocks.registerInUserDirectory).toHaveBeenCalledWith(user, {
      username: 'crystal_quicksand',
    });

    teardown();
  });

  it('resets contacts and clears local storage on logout', async () => {
    const { wireAuthReactions } = await import('../auth-orchestration.js');
    const lobbyElement = { id: 'lobby' };

    const teardown = await wireAuthReactions({ lobbyElement });

    await mocks.handlers.get('evt:auth:session:logged-out')({});

    expect(mocks.resetContacts).toHaveBeenCalled();
    expect(mocks.stopConversationActivity).toHaveBeenCalledOnce();
    expect(localStorageClearSpy).toHaveBeenCalled();

    teardown();
  });

  it('preserves selected localStorage keys on logout', async () => {
    const { wireAuthReactions } = await import('../auth-orchestration.js');
    const lobbyElement = { id: 'lobby' };

    globalThis.localStorage.setItem('locale', 'is');
    globalThis.localStorage.setItem('volatileKey', 'drop-me');

    const teardown = await wireAuthReactions({ lobbyElement });

    await mocks.handlers.get('evt:auth:session:logged-out')({});

    expect(globalThis.localStorage.getItem('locale')).toBe('is');
    expect(globalThis.localStorage.getItem('volatileKey')).toBeNull();

    teardown();
  });
});
