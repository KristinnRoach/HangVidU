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

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.resetModules();
    mocks.listeners.clear();
    mocks.authState = {
      status: 'unauthenticated',
      user: null,
      isLoggedIn: false,
    };
  });

  // Import createRoot from the same solid-js instance the SUT will load
  // (vi.resetModules() gives each test fresh module state).
  async function loadModules() {
    const [{ AuthProvider, useAuth }, { createRoot }] = await Promise.all([
      import('./solid-auth'),
      import('solid-js'),
    ]);
    return { AuthProvider, useAuth, createRoot };
  }

  it('syncs auth-state snapshots into Solid accessors', async () => {
    const { AuthProvider, useAuth, createRoot } = await loadModules();

    createRoot((dispose) => {
      let auth;
      AuthProvider({
        get children() {
          auth = useAuth();
          return null;
        },
      });

      expect(auth.isLoggedIn()).toBe(false);
      expect(auth.isAuthReady()).toBe(true);

      for (const listener of mocks.listeners) {
        listener({
          status: 'authenticated',
          user: { uid: 'u1', userName: 'User', email: 'user@example.com' },
          isLoggedIn: true,
        });
      }

      expect(auth.isLoggedIn()).toBe(true);
      expect(auth.user()?.uid).toBe('u1');
      expect(auth.isLoading()).toBe(false);

      dispose();
      expect(mocks.listeners.size).toBe(0);
    });
  });

  it('exposes isLoggingIn / isLoggingOut during transitions', async () => {
    const { AuthProvider, useAuth, createRoot } = await loadModules();

    createRoot((dispose) => {
      let auth;
      AuthProvider({
        get children() {
          auth = useAuth();
          return null;
        },
      });

      for (const listener of mocks.listeners) {
        listener({ status: 'loading', user: null, isLoggedIn: false });
      }
      expect(auth.isLoggingIn()).toBe(true);
      expect(auth.isLoggingOut()).toBe(false);

      for (const listener of mocks.listeners) {
        listener({
          status: 'loading',
          user: { uid: 'u1', userName: 'U', email: null, photoURL: null },
          isLoggedIn: true,
        });
      }
      expect(auth.isLoggingIn()).toBe(false);
      expect(auth.isLoggingOut()).toBe(true);

      dispose();
    });
  });

  it('throws when useAuth is called outside <AuthProvider>', async () => {
    const { useAuth, createRoot } = await loadModules();

    createRoot((dispose) => {
      expect(() => useAuth()).toThrow(/AuthProvider/);
      dispose();
    });
  });
});
