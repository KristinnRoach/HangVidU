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
      user: { uid: 'user-1', displayName: 'Test' },
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

describe('subscribe', () => {
  it('invokes the callback immediately with a snapshot', async () => {
    const { setState, subscribe } = await import('../auth-state.js');

    setState({
      status: 'authenticated',
      isLoggedIn: true,
      user: { uid: 'user-2', displayName: 'Tester' },
    });

    const calls = [];
    const unsubscribe = subscribe((state) => calls.push(state));
    unsubscribe();

    expect(calls.length).toBe(1);
    expect(calls[0].isLoggedIn).toBe(true);
    expect(calls[0].user?.uid).toBe('user-2');
  });
});
