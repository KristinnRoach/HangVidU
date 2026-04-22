import { createRoot } from 'solid-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  authState: {
    status: 'unauthenticated',
    user: null,
    isLoggedIn: false,
  },
  listeners: new Set(),
}));

vi.mock('./auth-state.js', () => ({
  getAuthState: () => ({ ...mocks.authState }),
  onAuthStateChanged: (listener) => {
    mocks.listeners.add(listener);
    listener({ ...mocks.authState });
    return () => mocks.listeners.delete(listener);
  },
}));

describe('solid auth bridge', () => {
  beforeEach(() => {
    vi.resetModules();
    mocks.listeners.clear();
    mocks.authState = {
      status: 'unauthenticated',
      user: null,
      isLoggedIn: false,
    };
  });

  it('syncs auth-state snapshots into Solid accessors', async () => {
    const { setupSolidAuthState, useAuth } = await import('./solid-auth.js');

    createRoot((dispose) => {
      const teardown = setupSolidAuthState();
      const { isLoggedIn, user } = useAuth();

      expect(isLoggedIn()).toBe(false);

      const nextState = {
        status: 'authenticated',
        user: { uid: 'u1', userName: 'User', email: 'user@example.com' },
        isLoggedIn: true,
      };
      for (const listener of mocks.listeners) listener(nextState);

      expect(isLoggedIn()).toBe(true);
      expect(user()?.uid).toBe('u1');

      teardown();
      dispose();
    });
  });

  it('subscribes once while setup is already active', async () => {
    const { setupSolidAuthState } = await import('./solid-auth.js');

    const teardown = setupSolidAuthState();
    const duplicateTeardown = setupSolidAuthState();

    expect(mocks.listeners.size).toBe(1);

    duplicateTeardown();
    expect(mocks.listeners.size).toBe(1);

    teardown();
    expect(mocks.listeners.size).toBe(0);
  });
});
