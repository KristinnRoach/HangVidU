// src/auth/tests/auth-state.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';

beforeEach(() => {
  vi.resetModules();
});

describe('waitForAuthReady', () => {
  it('resolves immediately when auth is already initialized', async () => {
    const { setState, waitForAuthReady } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'user-1', userName: 'Test' },
    });

    const snapshot = await waitForAuthReady();
    expect(snapshot.status).toBe('authenticated');
    expect(snapshot.isLoggedIn).toBe(true);
  });

  it('waits for a stable auth state, not loading', async () => {
    const { setState, waitForAuthReady } = await import('../auth-state.js');

    setState({ status: 'idle', isLoggedIn: false, user: null });

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

describe('onAuthStateChanged', () => {
  it('invokes the callback immediately with a snapshot', async () => {
    const { setState, onAuthStateChanged } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'user-2', userName: 'Tester' },
    });

    const calls = [];
    const unsubscribe = onAuthStateChanged((state) => calls.push(state));
    unsubscribe();

    expect(calls.length).toBe(1);
    expect(calls[0].isLoggedIn).toBe(true);
    expect(calls[0].user?.uid).toBe('user-2');
  });
});

describe('setState', () => {
  it('guards against resetting to idle after auth has initialized', async () => {
    const { setState, getAuthState } = await import('../auth-state.js');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      setState({ status: 'unauthenticated', isLoggedIn: false, user: null });
      setState({ status: 'loading' });
      setState({ status: 'idle' });

      expect(getAuthState()).toEqual({
        status: 'unauthenticated',
        isLoggedIn: false,
        user: null,
      });
      expect(warn).toHaveBeenCalledWith(
        '[auth-state] Ignoring reset to idle after auth initialization',
      );
    } finally {
      warn.mockRestore();
    }
  });
});
