import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const authCallbacks = [];
  const unsubscribe = vi.fn();

  return {
    authCallbacks,
    unsubscribe,
    onAuthStateChanged: vi.fn((callback) => {
      authCallbacks.push(callback);
      return unsubscribe;
    }),
    saveUserProfile: vi.fn(() => Promise.resolve()),
  };
});

vi.mock('../../auth/index.js', () => ({
  onAuthStateChanged: mocks.onAuthStateChanged,
}));

vi.mock('../../shared/storage/user/index.js', () => ({
  saveUserProfile: mocks.saveUserProfile,
}));

describe('setupUserAccount', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.authCallbacks.length = 0;
    mocks.onAuthStateChanged.mockImplementation((callback) => {
      mocks.authCallbacks.push(callback);
      return mocks.unsubscribe;
    });
    mocks.saveUserProfile.mockResolvedValue(undefined);
  });

  it('registers one auth listener and is idempotent', async () => {
    const { setupUserAccount } = await import('../setupUserAccount.js');

    const teardownA = await setupUserAccount();
    const teardownB = await setupUserAccount();

    expect(mocks.onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(teardownA).toBeTypeOf('function');
    expect(teardownB).toBe(teardownA);

    teardownA();
  });

  it('saves profile only for logged-in users with user data', async () => {
    const { setupUserAccount } = await import('../setupUserAccount.js');
    const teardown = await setupUserAccount();

    const callback = mocks.authCallbacks[0];
    callback?.({ isLoggedIn: false, user: null });
    callback?.({ isLoggedIn: true, user: null });
    callback?.({
      isLoggedIn: true,
      user: { uid: 'u1', userName: 'Alice', photoURL: null },
    });

    expect(mocks.saveUserProfile).toHaveBeenCalledTimes(1);
    expect(mocks.saveUserProfile).toHaveBeenCalledWith({
      uid: 'u1',
      userName: 'Alice',
      photoURL: null,
    });

    teardown();
  });

  it('teardown unsubscribes and allows re-setup', async () => {
    const { setupUserAccount } = await import('../setupUserAccount.js');

    const teardownA = await setupUserAccount();
    teardownA();

    expect(mocks.unsubscribe).toHaveBeenCalledTimes(1);

    const teardownB = await setupUserAccount();
    expect(mocks.onAuthStateChanged).toHaveBeenCalledTimes(2);
    expect(teardownB).not.toBe(teardownA);
  });
});
