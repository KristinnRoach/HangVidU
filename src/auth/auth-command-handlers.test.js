import { afterEach, describe, expect, it, vi } from 'vitest';

import { dispatchCommandAndAwait } from '../shared/events/index.js';
import { AUTH_COMMANDS } from './auth-events-schema.js';

const mocks = vi.hoisted(() => ({
  callCloudFunction: vi.fn(),
  signInWithAccountSelection: vi.fn(),
  signOutUser: vi.fn(),
}));

vi.mock('./auth-commands.js', () => ({
  signInWithAccountSelection: mocks.signInWithAccountSelection,
  signOutUser: mocks.signOutUser,
}));

vi.mock('./cloud-functions.js', () => ({
  callCloudFunction: mocks.callCloudFunction,
}));

let cleanup = null;

afterEach(() => {
  cleanup?.();
  cleanup = null;
  vi.clearAllMocks();
});

describe('setupAuthCommandHandlers', () => {
  it('does not register duplicate logout handlers', async () => {
    const { setupAuthCommandHandlers } = await import(
      './auth-command-handlers.js'
    );

    cleanup = setupAuthCommandHandlers();
    expect(setupAuthCommandHandlers()).toBe(cleanup);

    await dispatchCommandAndAwait(AUTH_COMMANDS.LOGOUT_REQUESTED, {
      source: 'auth-ui',
    });

    expect(mocks.signOutUser).toHaveBeenCalledTimes(1);

    cleanup();
    cleanup = null;

    await expect(
      dispatchCommandAndAwait(AUTH_COMMANDS.LOGOUT_REQUESTED, {
        source: 'auth-ui',
      }),
    ).rejects.toThrow('has no registered handler');
  });
});
