// src/auth/tests/auth-state.test.js
import { describe, it, expect, vi, beforeEach } from 'vite-plus/test';

beforeEach(() => {
  vi.resetModules();
});

describe('waitForAuthReady', () => {
  it('resolves immediately when auth is already initialized', async () => {
    const { setState, waitForAuthReady } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'user-1', email: null },
    });

    const snapshot = await waitForAuthReady();
    expect(snapshot.status).toBe('authenticated');
    expect(snapshot.isLoggedIn).toBe(true);
  });

  it('waits for a stable auth state, not loading', async () => {
    const { setState, waitForAuthReady } = await import('../auth-state.js');

    setState({ status: 'uninitialized', isLoggedIn: false, user: null });

    const ready = waitForAuthReady();
    const result = await Promise.race([
      ready.then(() => 'ready'),
      Promise.resolve('pending'),
    ]);
    expect(result).toBe('pending');

    // 'loading' should NOT resolve the promise
    setState({ status: 'loading', isLoggedIn: false, user: null });
    const stillPending = await Promise.race([
      ready.then(() => 'ready'),
      Promise.resolve('pending'),
    ]);
    expect(stillPending).toBe('pending');

    // Only a stable state resolves it
    setState({ status: 'unauthenticated', isLoggedIn: false, user: null });

    const snapshot = await ready;
    expect(snapshot.status).toBe('unauthenticated');
  });
});

describe('setState', () => {
  it('guards against resetting to uninitialized after auth has initialized', async () => {
    const { setState, getAuthState } = await import('../auth-state.js');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      setState({ status: 'unauthenticated', isLoggedIn: false, user: null });
      setState({ status: 'loading' });
      setState({ status: 'uninitialized' });

      expect(getAuthState()).toEqual({
        status: 'unauthenticated',
        isLoggedIn: false,
        user: null,
      });
      expect(warn).toHaveBeenCalledWith(
        '[auth-state] Ignoring reset to uninitialized after auth initialization',
      );
    } finally {
      warn.mockRestore();
    }
  });
});

describe('beginAuthTransition', () => {
  it('does not revert over a newer stable auth state', async () => {
    const { beginAuthTransition, getAuthState, setState } =
      await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'u1', email: null },
    });
    const revert = beginAuthTransition();

    setState({ status: 'unauthenticated', isLoggedIn: false, user: null });
    revert();

    expect(getAuthState()).toEqual({
      status: 'unauthenticated',
      isLoggedIn: false,
      user: null,
    });
  });
});
