import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const handlers = new Map();
  return {
    handlers,
    handleCommand: vi.fn((eventName, handler) => {
      handlers.set(eventName, handler);
      return () => handlers.delete(eventName);
    }),
    writeOnline: vi.fn(() => Promise.resolve()),
    writeOffline: vi.fn(() => Promise.resolve()),
    observePresence: vi.fn(() => () => {}),
    getLoggedInUserId: vi.fn(() => null),
    onAuthStateChanged: vi.fn(),
  };
});

vi.mock('../../../shared/events/index.js', () => ({
  handleCommand: mocks.handleCommand,
}));

vi.mock('../presence-rtdb.js', () => ({
  writeOnline: mocks.writeOnline,
  writeOffline: mocks.writeOffline,
  observePresence: mocks.observePresence,
}));

vi.mock('../../../auth/index.js', () => ({
  getLoggedInUserId: mocks.getLoggedInUserId,
  onAuthStateChanged: mocks.onAuthStateChanged,
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
});
