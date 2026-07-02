import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  setupUpdateHandler: vi.fn(() => Promise.resolve()),
  stopUpdateChecks: vi.fn(),
}));

vi.mock('../update-handlers.js', () => ({
  setupUpdateHandler: mocks.setupUpdateHandler,
  stopUpdateChecks: mocks.stopUpdateChecks,
}));

describe('pwa setup', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('starts update checks once and stops them on teardown', async () => {
    const { setup } = await import('../index');
    const teardown = await setup();

    expect(mocks.setupUpdateHandler).toHaveBeenCalledOnce();
    expect(await setup()).toBe(teardown);

    teardown();
    expect(mocks.stopUpdateChecks).toHaveBeenCalledOnce();
  });
});
