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
    subscribe: vi.fn(register),
    captureReferral: vi.fn(() => Promise.resolve()),
    processReferral: vi.fn(() => Promise.resolve()),
    setupInviteListener: vi.fn(() => undefined),
    hydrateContacts: vi.fn(() => Promise.resolve()),
    resetContacts: vi.fn(),
  };
});

vi.mock('../../../shared/events/index.js', () => ({
  subscribe: mocks.subscribe,
}));
vi.mock('../referrals/referral-handler.js', () => ({
  captureReferral: mocks.captureReferral,
  processReferral: mocks.processReferral,
}));
vi.mock('../invites/invite-listener.js', () => ({
  setupInviteListener: mocks.setupInviteListener,
}));
vi.mock('../../../stores/contactsStore.js', () => ({
  hydrateContacts: mocks.hydrateContacts,
  resetContacts: mocks.resetContacts,
}));

describe('contacts setup', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
    mocks.captureReferral.mockResolvedValue();
    mocks.hydrateContacts.mockResolvedValue();
    mocks.setupInviteListener.mockReturnValue(undefined);
  });

  it('captures referral and hydrates on boot', async () => {
    const { setup } = await import('../index');
    await setup();
    expect(mocks.captureReferral).toHaveBeenCalled();
    expect(mocks.hydrateContacts).toHaveBeenCalled();
  });

  it('hydrates contacts when auth becomes ready', async () => {
    const { setup } = await import('../index');
    await setup();
    mocks.hydrateContacts.mockClear();

    await mocks.handlers.get('evt:auth:session:ready')();

    expect(mocks.hydrateContacts).toHaveBeenCalled();
  });

  it('processes referral, hydrates and starts invite listener on login', async () => {
    const { setup } = await import('../index');
    await setup();
    mocks.hydrateContacts.mockClear();

    await mocks.handlers.get('evt:auth:session:logged-in')();

    expect(mocks.processReferral).toHaveBeenCalled();
    expect(mocks.hydrateContacts).toHaveBeenCalled();
    expect(mocks.setupInviteListener).toHaveBeenCalled();
  });

  it('tears down the invite listener and resets contacts on logout', async () => {
    const inviteCleanup = vi.fn();
    mocks.setupInviteListener.mockReturnValue(inviteCleanup);
    const { setup } = await import('../index');
    await setup();

    await mocks.handlers.get('evt:auth:session:logged-in')();
    await mocks.handlers.get('evt:auth:session:logged-out')();

    expect(inviteCleanup).toHaveBeenCalledTimes(1);
    expect(mocks.resetContacts).toHaveBeenCalled();
  });

  it('replaces the invite listener cleanup on each login', async () => {
    const firstCleanup = vi.fn();
    const secondCleanup = vi.fn();
    mocks.setupInviteListener
      .mockReturnValueOnce(firstCleanup)
      .mockReturnValueOnce(secondCleanup);
    const { setup } = await import('../index');
    await setup();

    await mocks.handlers.get('evt:auth:session:logged-in')();
    await mocks.handlers.get('evt:auth:session:logged-in')();

    // Second login tears down the first scope's listener, not the new one.
    expect(firstCleanup).toHaveBeenCalledTimes(1);
    expect(secondCleanup).not.toHaveBeenCalled();
  });

  it('aborts subscriptions on teardown', async () => {
    const { setup } = await import('../index');
    const teardown = await setup();

    expect(mocks.handlers.has('evt:auth:session:logged-in')).toBe(true);
    teardown();
    expect(mocks.handlers.has('evt:auth:session:logged-in')).toBe(false);
  });
});
