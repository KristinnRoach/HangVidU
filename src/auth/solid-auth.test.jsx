import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  authState: {
    status: 'unauthenticated',
    user: null,
    isLoggedIn: false,
  },
  listeners: new Map(),
}));

vi.mock('./auth-state.js', () => ({
  getAuthState: () => ({ ...mocks.authState }),
}));

// Event-name-aware mock so subscribing to the wrong channel fails the test.
vi.mock('../shared/events/index.js', () => ({
  subscribe: (eventName, listener) => {
    const bucket = mocks.listeners.get(eventName) ?? new Set();
    bucket.add(listener);
    mocks.listeners.set(eventName, bucket);
    return () => {
      bucket.delete(listener);
      if (bucket.size === 0) mocks.listeners.delete(eventName);
    };
  },
}));

// Drive the mocked `evt:auth:state:changed` channel.
function emitAuthState(state) {
  for (const listener of mocks.listeners.get('evt:auth:state:changed') ?? []) {
    listener({ state });
  }
}

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
      expect(auth.isAuthInitialized()).toBe(true);

      emitAuthState({
        status: 'authenticated',
        user: { uid: 'u1', email: 'user@example.com' },
        isLoggedIn: true,
      });

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

      emitAuthState({ status: 'loading', user: null, isLoggedIn: false });
      expect(auth.isAuthInitialized()).toBe(true);
      expect(auth.isLoggingIn()).toBe(true);
      expect(auth.isLoggingOut()).toBe(false);

      emitAuthState({
        status: 'loading',
        user: { uid: 'u1', email: null },
        isLoggedIn: true,
      });
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
