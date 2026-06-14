import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();
  const register = (eventName, handler, options = {}) => {
    handlers.set(eventName, handler);
    const unsubscribe = () => handlers.delete(eventName);
    if (options.signal) {
      if (options.signal.aborted) unsubscribe();
      else options.signal.addEventListener('abort', unsubscribe, { once: true });
    }
    return unsubscribe;
  };
  return {
    handlers,
    handleCommand: vi.fn(register),
    subscribe: vi.fn(register),
    writeOnline: vi.fn(() => Promise.resolve()),
    writeOffline: vi.fn(() => Promise.resolve()),
    observePresence: vi.fn(() => () => {}),
    getLoggedInUserId: vi.fn(() => null),
  };
});

vi.mock('../../../shared/events/index.js', () => ({
  handleCommand: mocks.handleCommand,
  subscribe: mocks.subscribe,
}));

vi.mock('../presence-rtdb.js', () => ({
  writeOnline: mocks.writeOnline,
  writeOffline: mocks.writeOffline,
  observePresence: mocks.observePresence,
}));

vi.mock('../../../auth/index.js', () => ({
  getLoggedInUserId: mocks.getLoggedInUserId,
}));

describe('presence setup', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
  });

  it('registers cmd:user:presence:set-offline and delegates to writeOffline', async () => {
    const presence = await import('../index.js');

    await presence.setup();
    const handler = mocks.handlers.get('cmd:user:presence:set-offline');

    await handler?.({ userId: 'user-1' });

    expect(mocks.writeOffline).toHaveBeenCalledWith('user-1');
  });

  it('writes presence online on evt:auth:session:logged-in', async () => {
    mocks.getLoggedInUserId.mockReturnValue('user-1');
    const presence = await import('../index.js');

    await presence.setup();
    await mocks.handlers.get('evt:auth:session:logged-in')?.();
    // Flush the internal presence write chain.
    await Promise.resolve();

    expect(mocks.writeOnline).toHaveBeenCalledWith('user-1');
  });

  it('aborts registered handlers on cleanup', async () => {
    const presence = await import('../index.js');

    const cleanup = await presence.setup();
    expect(mocks.handlers.has('evt:auth:session:logged-in')).toBe(true);

    cleanup();

    expect(mocks.handlers.has('evt:auth:session:logged-in')).toBe(false);
    expect(mocks.handlers.has('evt:auth:session:logged-out')).toBe(false);
    expect(mocks.handlers.has('cmd:user:presence:set-offline')).toBe(false);
  });
});
